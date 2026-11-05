document.addEventListener('DOMContentLoaded', async () => {
    const showcase = document.getElementById('selected-work');
    const controls = document.querySelector('[data-project-controls]');
    if (!showcase || !controls || !window.projectStore) return;
    const projects = (await projectStore.loadAll()).filter(project => project.featured);
    if (!projects.length) return;

    const viewport = showcase.querySelector('.project-viewport');
    const track = showcase.querySelector('.project-track');
    const pagination = showcase.querySelector('.project-pagination');
    const status = showcase.querySelector('.project-status');
    const playback = controls.querySelector('[data-project-playback]');
    const previous = controls.querySelector('[data-project-prev]');
    const next = controls.querySelector('[data-project-next]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const layout = typeof configData === 'undefined' ? {} : configData.homeLayout ?? {};
    const minWidth = Number.isFinite(layout.verticalMinWidth) && layout.verticalMinWidth > 0 ? layout.verticalMinWidth : 1500;
    const minAspectRatio = Number.isFinite(layout.verticalMinAspectRatio) && layout.verticalMinAspectRatio >= 0 ? layout.verticalMinAspectRatio : 1.4;
    const ratioQuery = minAspectRatio > 0 ? ` and (min-aspect-ratio: ${Math.round(minAspectRatio * 1000)}/1000)` : '';
    const wideLayout = window.matchMedia(`(min-width: ${minWidth}px)${ratioQuery}`);
    const horizontalControls = controls.parentElement;
    const verticalControls = showcase.querySelector('.project-rail-toolbar');
    let vertical = wideLayout.matches;
    const settings = typeof projectCarouselSettings === 'undefined' ? {} : projectCarouselSettings;
    const speed = Math.max(0, settings.autoScrollSpeed ?? 22);
    const preferredCardWidth = Number.isFinite(settings.cardWidth) && settings.cardWidth > 0 ? settings.cardWidth : 300;
    const interactionDelay = settings.pauseAfterInteraction ?? 4000;
    const pauses = new Set(['offscreen']);
    const gap = 18;
    let userPaused = false;
    let cardSize = 0;
    let cardStep = 0;
    let cycleSize = 0;
    let viewSize = 0;
    let offset = 0;
    let leadingIndex = -1;
    let frame = 0;
    let lastTime = 0;
    let snap = null;
    let interactionTimer;
    let pointerStart;
    let suppressClick = false;
    const cards = [];

    function cardFor(project, index, ordinal) {
        const item = document.createElement('li');
        item.className = 'project-frame';
        item.dataset.projectIndex = index;
        const link = document.createElement('a');
        link.className = 'project-card';
        link.href = project.pageUrl;
        link.draggable = false;
        const cover = document.createElement('div');
        cover.className = 'project-cover';
        const image = document.createElement('img');
        image.src = project.resolve(project.card.image);
        image.alt = project.card.imageAlt || project.card.title || project.title;
        image.width = 640;
        image.height = 360;
        image.decoding = 'async';
        image.draggable = false;
        const number = document.createElement('span');
        number.className = 'project-frame-number';
        number.textContent = String(index + 1).padStart(2, '0');
        number.setAttribute('aria-hidden', 'true');
        cover.append(image, number);

        const caption = document.createElement('div');
        caption.className = 'project-card-caption';
        const meta = document.createElement('p');
        meta.className = 'project-meta';
        meta.textContent = [project.card.category, project.card.year].filter(Boolean).join(' / ');
        const title = document.createElement('h3');
        title.textContent = project.card.title || project.title;
        const arrow = document.createElement('span');
        arrow.className = 'project-card-arrow';
        arrow.textContent = '↗';
        arrow.setAttribute('aria-hidden', 'true');
        caption.append(meta, title, arrow);
        link.append(cover, caption);
        item.append(link);
        cards.push({ item, link, ordinal });
        return item;
    }

    function appendStrip(copy) {
        const group = document.createElement('ul');
        group.className = 'project-group';
        projects.forEach((project, index) => group.append(cardFor(project, index, copy * projects.length + index)));
        track.append(group);
    }
    // Extra copies keep both ends filled during continuous motion.
    for (let copy = 0; copy < (projects.length > 1 ? 3 : 1); copy++) appendStrip(copy);
    pagination.replaceChildren(...projects.map((project, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'project-page-dot';
        button.setAttribute('aria-label', `Show project: ${project.card.title || project.title}`);
        button.addEventListener('click', () => {
            if (!snap) snapTo(cycleSize + index * cardStep);
        });
        return button;
    }));
    pagination.hidden = projects.length < 2;
    previous.disabled = next.disabled = projects.length < 2;

    const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
    const normalize = () => { offset = projects.length > 1 ? cycleSize + modulo(offset - cycleSize, cycleSize) : 0; };

    function canAutoScroll() {
        return !userPaused && !reducedMotion.matches && !pauses.size && speed > 0 && projects.length > 1 && cycleSize > 0;
    }

    function render() {
        track.style.transform = vertical ? `translateY(${-offset}px)` : `translateX(${-offset}px)`;
        const index = modulo(Math.floor((offset + 0.01) / cardStep), projects.length);
        if (index !== leadingIndex) {
            leadingIndex = index;
            showcase.dataset.projectIndex = index;
            pagination.querySelectorAll('button').forEach((button, i) => {
                if (i === index) button.setAttribute('aria-current', 'true');
                else button.removeAttribute('aria-current');
            });
            if (vertical && pagination.scrollHeight > pagination.clientHeight) {
                const button = pagination.querySelector('[aria-current]');
                const top = button.offsetTop;
                const bottom = top + button.offsetHeight;
                if (top < pagination.scrollTop) pagination.scrollTop = Math.max(0, top - 4);
                else if (bottom > pagination.scrollTop + pagination.clientHeight) pagination.scrollTop = bottom - pagination.clientHeight + 4;
            }
        }
        // Keep offscreen copies out of keyboard navigation, while every visible card is clickable.
        cards.forEach(({ item, link, ordinal }) => {
            const start = ordinal * cardStep;
            const visible = start + cardSize > offset + 0.5 && start < offset + viewSize - 0.5;
            if (item.inert === visible) {
                item.inert = !visible;
                item.setAttribute('aria-hidden', String(!visible));
                link.tabIndex = visible ? 0 : -1;
            }
        });
    }

    function tick(time) {
        frame = 0;
        const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
        lastTime = time;
        if (snap) {
            const progress = Math.min(1, (time - snap.started) / 420);
            const eased = 1 - Math.pow(1 - progress, 3);
            offset = snap.from + (snap.to - snap.from) * eased;
            if (progress === 1) {
                offset = snap.to;
                const preserveFocus = snap.preserveFocus;
                snap = null;
                if (!preserveFocus) normalize();
                previous.removeAttribute('aria-disabled');
                next.removeAttribute('aria-disabled');
                lastTime = 0;
            }
        } else if (canAutoScroll()) {
            offset += speed * elapsed / 1000;
            normalize();
        }
        render();
        if (snap || canAutoScroll()) frame = requestAnimationFrame(tick);
        else lastTime = 0;
    }

    function schedule() {
        cancelAnimationFrame(frame);
        lastTime = 0;
        if (snap || canAutoScroll()) frame = requestAnimationFrame(tick);
    }

    function updatePlayback() {
        const paused = userPaused || reducedMotion.matches;
        playback.disabled = reducedMotion.matches || projects.length < 2 || speed === 0;
        playback.setAttribute('aria-pressed', String(paused));
        playback.setAttribute('aria-label', reducedMotion.matches
            ? 'Automatic scrolling disabled by reduced motion preference'
            : paused ? 'Play automatic scrolling' : 'Pause automatic scrolling');
        playback.title = playback.getAttribute('aria-label');
        playback.firstElementChild.textContent = paused ? '▶' : '❚❚';
        schedule();
    }

    function setPause(reason, paused) {
        if (paused) pauses.add(reason);
        else pauses.delete(reason);
        schedule();
    }

    function pauseForInteraction() {
        clearTimeout(interactionTimer);
        setPause('interaction', true);
        interactionTimer = setTimeout(() => setPause('interaction', false), interactionDelay);
    }

    function snapTo(target, preserveFocus = false) {
        pauseForInteraction();
        if (reducedMotion.matches) {
            offset = target;
            if (!preserveFocus) normalize();
            render();
        } else {
            snap = { from: offset, to: target, started: performance.now(), preserveFocus };
            previous.setAttribute('aria-disabled', 'true');
            next.setAttribute('aria-disabled', 'true');
            schedule();
        }
        const index = modulo(Math.round(target / cardStep), projects.length);
        status.textContent = `Showing ${projects[index].card.title || projects[index].title}`;
    }

    function move(direction) {
        if (snap || projects.length < 2) return;
        if (viewport.contains(document.activeElement)) {
            (direction > 0 ? next : previous).focus({ preventScroll: true });
        }
        normalize();
        // From a drifting position, use the next boundary in the requested direction.
        const boundary = direction > 0
            ? Math.floor(offset / cardStep + 0.0001) + 1
            : Math.ceil(offset / cardStep - 0.0001) - 1;
        snapTo(boundary * cardStep);
    }

    function measure() {
        const progress = cardStep ? offset / cardStep : projects.length;
        const changedAxis = vertical !== wideLayout.matches;
        vertical = wideLayout.matches;
        document.body.classList.toggle('home-projects-vertical', vertical);
        const controlsMount = vertical ? verticalControls : horizontalControls;
        if (controls.parentElement !== controlsMount) {
            const focused = controls.contains(document.activeElement) ? document.activeElement : null;
            controlsMount.append(controls);
            focused?.focus({ preventScroll: true });
        }
        previous.textContent = vertical ? '\u2191' : '\u2190';
        next.textContent = vertical ? '\u2193' : '\u2192';
        showcase.dataset.orientation = vertical ? 'vertical' : 'horizontal';
        if (!viewport.clientWidth || (vertical && !viewport.clientHeight)) return;
        const style = getComputedStyle(viewport);
        const availableWidth = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        let count;
        if (vertical) {
            viewSize = viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            track.style.setProperty('--project-card-width', `${availableWidth}px`);
            track.style.removeProperty('--project-card-height');
            cardSize = Math.max(...cards.slice(0, projects.length).map(({ item }) => item.getBoundingClientRect().height));
            track.style.setProperty('--project-card-height', `${cardSize}px`);
            count = Math.min(projects.length, Math.max(1, Math.floor((viewSize + gap) / (cardSize + gap))));
        } else {
            viewSize = availableWidth;
            cardSize = Math.min(viewSize, preferredCardWidth);
            count = Math.min(projects.length, Math.max(1, Math.floor((viewSize + gap) / (cardSize + gap))));
            track.style.removeProperty('--project-card-height');
            track.style.setProperty('--project-card-width', `${cardSize}px`);
        }
        cardStep = cardSize + gap;
        cycleSize = cardStep * projects.length;
        if (projects.length > 1) {
            const copies = Math.max(3, Math.ceil(viewSize / cycleSize) + 2);
            while (track.children.length < copies) appendStrip(track.children.length);
        }
        offset = progress * cardStep;
        normalize();
        snap = null;
        previous.removeAttribute('aria-disabled');
        next.removeAttribute('aria-disabled');
        if (changedAxis) {
            leadingIndex = -1;
            pointerStart = null;
            suppressClick = false;
            pauses.delete('pointer');
        }
        showcase.dataset.perPage = count;
        render();
        schedule();
    }

    playback.addEventListener('click', () => {
        userPaused = !userPaused;
        if (!userPaused) {
            clearTimeout(interactionTimer);
            pauses.delete('interaction');
        }
        updatePlayback();
    });
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    [showcase, controls].forEach((region, index) => {
        region.addEventListener('pointerenter', event => {
            if (event.pointerType === 'mouse') setPause(`hover-${index}`, true);
        });
        region.addEventListener('pointerleave', () => setPause(`hover-${index}`, false));
    });
    viewport.addEventListener('focusin', event => {
        setPause('focus', true);
        if (!event.target.matches(':focus-visible')) return;
        const card = cards.find(entry => entry.link === event.target);
        if (!card) return;
        const start = card.ordinal * cardStep;
        if (start < offset) snapTo(start, true);
        else if (start + cardSize > offset + viewSize) snapTo(start + cardSize - viewSize, true);
    });
    viewport.addEventListener('focusout', () => {
        requestAnimationFrame(() => setPause('focus', viewport.contains(document.activeElement)));
    });
    viewport.addEventListener('pointerdown', event => {
        if (event.button !== 0 || snap) return;
        pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
        suppressClick = false;
        setPause('pointer', true);
    });
    viewport.addEventListener('pointermove', event => {
        if (!pointerStart || event.pointerId !== pointerStart.id) return;
        const distance = vertical ? event.clientY - pointerStart.y : event.clientX - pointerStart.x;
        if (Math.abs(distance) > 12) suppressClick = true;
    }, { passive: true });
    window.addEventListener('pointerup', event => {
        if (!pointerStart || event.pointerId !== pointerStart.id) return;
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        pointerStart = null;
        setPause('pointer', false);
        const distance = vertical ? dy : dx;
        const across = vertical ? dx : dy;
        if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(across)) {
            suppressClick = true;
            move(distance < 0 ? 1 : -1);
        }
    });
    window.addEventListener('pointercancel', () => {
        pointerStart = null;
        setPause('pointer', false);
    });
    viewport.addEventListener('click', event => {
        if (!suppressClick) return;
        event.preventDefault();
        suppressClick = false;
    }, true);
    [showcase, controls].forEach(region => {
        region.addEventListener('keydown', event => {
            const backward = vertical ? 'ArrowUp' : 'ArrowLeft';
            const forward = vertical ? 'ArrowDown' : 'ArrowRight';
            if (event.key !== backward && event.key !== forward) return;
            event.preventDefault();
            event.stopPropagation();
            move(event.key === forward ? 1 : -1);
        });
    });
    document.addEventListener('visibilitychange', () => setPause('hidden', document.hidden));
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches && snap) {
            offset = snap.to;
            if (!snap.preserveFocus) normalize();
            snap = null;
            previous.removeAttribute('aria-disabled');
            next.removeAttribute('aria-disabled');
            render();
        }
        updatePlayback();
    });
    new IntersectionObserver(entries => setPause('offscreen', !entries[0].isIntersecting)).observe(showcase);
    new ResizeObserver(measure).observe(viewport);
    wideLayout.addEventListener('change', measure);
    setPause('hidden', document.hidden);
    showcase.hidden = false;
    controls.hidden = false;
    measure();
    updatePlayback();
});
