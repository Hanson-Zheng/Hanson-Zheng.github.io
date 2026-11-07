document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('project-directory-list');
    if (!list || !window.projectStore) return;
    const input = document.getElementById('project-search');
    const form = input.closest('form');
    const clearButton = document.getElementById('project-search-clear');
    const status = document.getElementById('project-search-status');
    const empty = document.getElementById('project-search-empty');
    const yearsNav = document.getElementById('project-directory-years');
    const yearLinks = document.getElementById('project-year-links');
    const error = document.getElementById('project-directory-error');
    const viewSwitch = document.getElementById('project-view-switch');
    const viewButtons = viewSwitch.querySelectorAll('[data-project-view]');
    const mobileView = matchMedia('(max-width: 768px)');
    const desktopViewMount = document.querySelector('.directory-page-heading');
    const mobileViewMount = document.getElementById('project-year-toolbar');
    function mountViewSwitch() {
        const mount = mobileView.matches ? mobileViewMount : desktopViewMount;
        if (viewSwitch.parentElement === mount) return;
        const focused = viewSwitch.contains(document.activeElement) ? document.activeElement : null;
        mount.append(viewSwitch);
        focused?.focus({ preventScroll: true });
    }
    mobileView.addEventListener('change', mountViewSwitch);
    mountViewSwitch();
    let view = 'cards';
    try { if (localStorage.getItem('projects-view') === 'list') view = 'list'; }
    catch { /* Keep both views usable when storage is unavailable. */ }
    list.dataset.view = view;
    const cardPublicationStyle = typeof configData !== 'undefined'
        && configData.projectDirectory?.cardPublicationStyle === 'badge' ? 'badge' : 'full';
    list.dataset.cardPublications = cardPublicationStyle;
    const element = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const yearOf = project => {
        const years = String(project.year ?? project.card.year ?? '').match(/\b(?:19|20)\d{2}\b/g);
        return years ? Number(years.at(-1)) : 0;
    };
    const yearLabel = year => year || 'Other projects';
    const icon = () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.6');
        svg.setAttribute('aria-hidden', 'true');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M8 12h8M8 16h6');
        svg.append(path);
        return svg;
    };
    document.getElementById('project-directory-retry').addEventListener('click', () => location.reload());

    try {
        const projects = await projectStore.loadAll();
        const expected = typeof projectDirectories === 'undefined' ? 0 : projectDirectories.length;
        error.hidden = projects.length === expected;
        projects.sort((a, b) => yearOf(b) - yearOf(a));
        list.replaceChildren();
        const groups = new Map();
        const records = projects.map(project => {
            const year = yearOf(project);
            if (!groups.has(year)) {
                const section = element('section', 'directory-year-group');
                section.id = `project-year-${year || 'other'}`;
                const heading = element('h2', 'directory-year-heading', yearLabel(year));
                heading.id = `${section.id}-title`;
                section.setAttribute('aria-labelledby', heading.id);
                section.append(heading);
                const cards = element('div', 'directory-year-cards');
                section.append(cards);
                groups.set(year, { section, cards, records: [] });
                list.append(section);
            }
            const card = element('article', 'directory-card');
            card.dataset.project = project.folder;
            const link = element('a', 'directory-project-link');
            link.href = project.pageUrl;
            const copy = element('div', 'directory-project-copy');
            const titleRow = element('div', 'directory-title-row');
            const title = element('h3', 'directory-project-title', project.card.title || project.title);
            title.id = `directory-title-${project.folder}`;
            link.setAttribute('aria-labelledby', title.id);
            const arrow = element('span', 'directory-project-arrow', '→');
            arrow.setAttribute('aria-hidden', 'true');
            titleRow.append(title, arrow);
            link.append(titleRow);
            if (project.summary) copy.append(element('p', 'directory-project-summary', project.summary));
            if (project.topics?.length) {
                const topics = element('ul', 'directory-topics');
                topics.setAttribute('aria-label', 'Topics');
                project.topics.forEach(topic => topics.append(element('li', 'directory-topic', topic)));
                copy.append(topics);
            }
            const excerpt = element('p', 'directory-search-excerpt');
            const excerptLabel = element('span', 'directory-excerpt-label');
            const excerptText = element('span');
            excerpt.append(excerptLabel, excerptText);
            excerpt.hidden = true;
            copy.append(excerpt);
            link.append(copy);
            let image;
            const prepareImage = () => {
                if (!image || image.hasAttribute('src')) return;
                applySiteCardImage(image, project.resolve(project.card.image),
                    '(max-width: 588px) calc(100vw - 108px), 480px');
            };
            if (project.card.image) {
                const media = element('div', 'directory-project-media');
                image = element('img');
                image.alt = project.card.imageAlt || '';
                image.width = 640;
                image.height = 360;
                image.loading = 'lazy';
                image.decoding = 'async';
                if (view === 'cards') prepareImage();
                media.append(image);
                link.append(media);
            } else {
                link.classList.add('directory-project-link--text-only');
            }
            card.append(link);
            const papers = projectStore.relatedPublications(project);
            const linkedPapers = papers.filter(paper => {
                try { return ['http:', 'https:'].includes(new URL(paper.links?.doi).protocol); }
                catch { return false; }
            });
            let relatedDetails;
            let relatedSummary;
            let relatedLabel;
            if (linkedPapers.length) {
                const related = element('footer', 'directory-related');
                if (linkedPapers.length > 1) related.classList.add('directory-related--multiple');
                const label = linkedPapers.length === 1 ? 'Related publication' : 'Related publications';
                relatedLabel = element('p', 'directory-related-label', label);
                relatedDetails = element('details', 'directory-publications');
                relatedSummary = element('summary', 'directory-publications-toggle');
                relatedSummary.append(element('span', '', `${label} (${linkedPapers.length})`));
                const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                chevron.setAttribute('viewBox', '0 0 20 20');
                chevron.setAttribute('fill', 'none');
                chevron.setAttribute('aria-hidden', 'true');
                const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                chevronPath.setAttribute('d', 'm6 8 4 4 4-4');
                chevron.append(chevronPath);
                relatedSummary.append(chevron);
                relatedSummary.hidden = view === 'cards';
                relatedLabel.hidden = view === 'list';
                relatedDetails.open = view === 'cards';
                const paperList = element('ul');
                linkedPapers.forEach(paper => {
                    const item = element('li', 'directory-paper-item');
                    const paperLink = element('a', 'directory-paper-link');
                    paperLink.href = paper.links.doi;
                    paperLink.target = '_blank';
                    paperLink.rel = 'noopener noreferrer';
                    paperLink.title = `${paper.title} (opens in a new tab)`;
                    paperLink.setAttribute('aria-label', `${paper.title} (opens in a new tab)`);
                    const external = element('span', 'directory-paper-arrow', '↗');
                    external.setAttribute('aria-hidden', 'true');
                    const paperCopy = element('span', 'directory-paper-copy');
                    const venue = [paper.venueShort || paper.venue || 'Publication', paper.year].filter(Boolean).join(' · ');
                    if (venue) {
                        const badge = element('span', 'directory-paper-venue', venue);
                        badge.title = paper.venue || '';
                        paperCopy.append(badge, document.createTextNode(' '));
                    }
                    paperCopy.append(element('span', 'directory-paper-title', paper.title));
                    paperLink.append(icon(), paperCopy, external);
                    item.append(paperLink);
                    paperList.append(item);
                });
                relatedDetails.append(relatedSummary, paperList);
                related.append(relatedLabel, relatedDetails);
                card.append(related);
            }
            const visibleText = [project.card.title, project.summary, ...(project.topics || []), ...linkedPapers.flatMap(p => [p.title, p.venueShort || p.venue, p.year])].filter(Boolean).join(' ').toLowerCase();
            const primaryText = [project.card.title, project.summary, ...(project.topics || [])].filter(Boolean).join(' ').toLowerCase();
            const paperText = linkedPapers.map(p => [p.title, p.venueShort || p.venue, p.year].filter(Boolean).join(' ').toLowerCase()).join(' ');
            const badgeText = linkedPapers.map(p => [p.venueShort || p.venue || 'Publication', p.year].filter(Boolean).join(' ').toLowerCase()).join(' ');
            const projectText = [project.title, project.card.category, ...(project.authors || []), ...(project.sections || []).flatMap(s => [s.heading, ...(s.paragraphs || []), ...(s.bullets || []), ...(s.steps || [])])].filter(Boolean).join(' ');
            const snippets = [{ label: 'From the project', text: projectText }, ...papers.map(p => ({ label: 'From a related publication', text: [p.title, ...(p.authors || []), p.venue, p.abstract].filter(Boolean).join(' · ') }))];
            const record = { project, card, visibleText, primaryText, paperText, badgeText, snippets, excerpt, excerptLabel, excerptText, prepareImage,
                relatedDetails, relatedSummary, relatedLabel, relatedExpanded: false, searchRevealsRelated: false,
                searchText: `${visibleText} ${snippets.map(s => s.text).join(' ').toLowerCase()}` };
            groups.get(year).cards.append(card);
            groups.get(year).records.push(record);
            return record;
        });
        list.removeAttribute('aria-busy');
        if (!records.length) {
            if (expected === 0) list.append(element('p', 'directory-loading', 'Projects are on their way.'));
            return;
        }
        let timer;
        let composing = false;
        let scrollPending = false;

        function rememberRelated(record) {
            if (view === 'list' && record.relatedDetails && !record.searchRevealsRelated) {
                record.relatedExpanded = record.relatedDetails.open;
            }
        }
        function syncRelated(record) {
            if (!record.relatedDetails) return;
            record.relatedSummary.hidden = view === 'cards';
            record.relatedLabel.hidden = view === 'list';
            record.relatedDetails.open = view === 'cards' || record.relatedExpanded || record.searchRevealsRelated;
        }
        function setView(next, persist = true) {
            records.forEach(rememberRelated);
            view = next === 'list' ? 'list' : 'cards';
            list.dataset.view = view;
            records.forEach(record => {
                syncRelated(record);
                if (view === 'cards') record.prepareImage();
            });
            viewButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.projectView === view)));
            if (persist) {
                try { localStorage.setItem('projects-view', view); } catch { /* The current view still works. */ }
            }
            if (input.value && cardPublicationStyle === 'badge') applySearch(false);
            requestAnimationFrame(updateActiveYear);
        }
        viewButtons.forEach(button => button.addEventListener('click', () => setView(button.dataset.projectView)));

        function updateActiveYear() {
            const visible = [...groups.values()].filter(group => !group.section.hidden);
            let active = visible[0]?.section.id;
            visible.forEach(group => { if (group.section.getBoundingClientRect().top <= 150) active = group.section.id; });
            if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) active = visible.at(-1)?.section.id;
            yearLinks.querySelectorAll('a').forEach(link => {
                if (link.getAttribute('href') === `#${active}`) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }
        function updateYearLinks() {
            const fragment = document.createDocumentFragment();
            groups.forEach((group, year) => {
                const count = group.records.filter(record => !record.card.hidden).length;
                group.section.hidden = !count;
                if (!count) return;
                const item = element('li');
                const link = element('a', '', yearLabel(year));
                link.href = `#${group.section.id}`;
                link.addEventListener('click', event => {
                    event.preventDefault();
                    window.scrollTo({ top: group.section.getBoundingClientRect().top + scrollY - 100, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                });
                item.append(link);
                fragment.append(item);
            });
            yearLinks.replaceChildren(fragment);
            yearsNav.hidden = yearLinks.children.length === 0;
            updateActiveYear();
        }
        function applySearch(scrollToResults = true) {
            const terms = [...new Set(input.value.trim().toLowerCase().split(/\s+/u).filter(Boolean))];
            let count = 0;
            records.forEach(record => {
                rememberRelated(record);
                record.searchRevealsRelated = terms.some(term => !record.primaryText.includes(term) && record.paperText.includes(term));
                syncRelated(record);
                record.card.querySelectorAll('mark.directory-search-match').forEach(mark => mark.replaceWith(document.createTextNode(mark.textContent)));
                record.card.normalize();
                const matched = terms.every(term => record.searchText.includes(term));
                record.card.hidden = !matched;
                record.excerpt.hidden = true;
                if (!matched) return;
                count += 1;
                if (!terms.length) return;
                record.card.querySelectorAll('.directory-project-title, .directory-project-summary, .directory-topics, .directory-paper-copy').forEach(node => highlight(node, terms));
                const visibleText = view === 'cards' && cardPublicationStyle === 'badge'
                    ? `${record.primaryText} ${record.badgeText}` : record.visibleText;
                if (!terms.every(term => visibleText.includes(term))) {
                    const snippet = [...record.snippets].sort((a, b) => terms.filter(t => b.text.toLowerCase().includes(t)).length - terms.filter(t => a.text.toLowerCase().includes(t)).length)[0];
                    const firstMatch = Math.min(...terms.map(t => snippet.text.toLowerCase().indexOf(t)).filter(index => index >= 0));
                    let start = Math.max(0, firstMatch - 48);
                    if (start) start = snippet.text.lastIndexOf(' ', start) + 1;
                    let end = Math.min(snippet.text.length, start + 220);
                    if (end < snippet.text.length && snippet.text.lastIndexOf(' ', end) > start) end = snippet.text.lastIndexOf(' ', end);
                    record.excerptText.textContent = `${start ? '…' : ''}${snippet.text.slice(start, end).trim()}${end < snippet.text.length ? '…' : ''}`;
                    record.excerptLabel.textContent = snippet.label;
                    record.excerpt.hidden = false;
                    highlight(record.excerptText, terms);
                }
            });
            status.textContent = terms.length ? `${count} of ${records.length} projects` : '';
            status.hidden = !terms.length;
            empty.hidden = !terms.length || count > 0;
            clearButton.hidden = !input.value;
            updateYearLinks();
            const content = document.querySelector('.project-directory-content');
            if (scrollToResults && matchMedia('(min-width: 769px)').matches && content.getBoundingClientRect().top < 80) {
                window.scrollTo({ top: Math.max(0, content.getBoundingClientRect().top + scrollY - 100), behavior: 'instant' });
            }
        }
        function clearSearch() {
            clearTimeout(timer);
            input.value = '';
            applySearch();
            input.focus({ preventScroll: true });
        }
        const schedule = () => { clearTimeout(timer); if (!composing) timer = setTimeout(applySearch, 120); };
        input.addEventListener('input', schedule);
        input.addEventListener('search', schedule);
        input.addEventListener('compositionstart', () => { composing = true; clearTimeout(timer); });
        input.addEventListener('compositionend', () => { composing = false; schedule(); });
        input.addEventListener('keydown', event => { if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); clearSearch(); } });
        form.addEventListener('submit', event => {
            event.preventDefault();
            clearTimeout(timer);
            if (!composing) { applySearch(); if (matchMedia('(max-width: 768px)').matches) input.blur(); }
        });
        clearButton.addEventListener('click', clearSearch);
        document.getElementById('project-search-reset').addEventListener('click', clearSearch);
        window.addEventListener('scroll', () => {
            if (scrollPending) return;
            scrollPending = true;
            requestAnimationFrame(() => { scrollPending = false; updateActiveYear(); });
        }, { passive: true });
        window.addEventListener('resize', updateActiveYear);
        form.hidden = false;
        setView(view, false);
        viewSwitch.hidden = false;
        updateYearLinks();
        if (input.value) applySearch();
    } catch (failure) {
        console.error(failure);
        list.replaceChildren();
        list.removeAttribute('aria-busy');
        error.hidden = false;
    }

    function highlight(container, terms) {
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
            const text = node.textContent;
            const lower = text.toLowerCase();
            const fragment = document.createDocumentFragment();
            let cursor = 0;
            while (cursor < text.length) {
                let next = text.length;
                let length = 0;
                terms.forEach(term => {
                    const index = lower.indexOf(term, cursor);
                    if (index >= 0 && (index < next || (index === next && term.length > length))) { next = index; length = term.length; }
                });
                if (!length) break;
                fragment.append(document.createTextNode(text.slice(cursor, next)));
                fragment.append(element('mark', 'directory-search-match', text.slice(next, next + length)));
                cursor = next + length;
            }
            if (cursor) { fragment.append(document.createTextNode(text.slice(cursor))); node.replaceWith(fragment); }
        });
    }
});
