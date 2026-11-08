document.addEventListener('DOMContentLoaded', async () => {
    const article = document.getElementById('project-content');
    if (!article || !window.projectStore) return;

    const element = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };

    function findPublication(project) {
        const matches = projectStore.relatedPublications(project);
        if (project.publicationId) return matches.find(paper => paper.id === project.publicationId) || null;
        return matches.length === 1 ? matches[0] : null;
    }

    try {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const folder = segments[segments.length - (segments.at(-1) === 'index.html' ? 2 : 1)];
        const project = await projectStore.load(decodeURIComponent(folder));
        const updateMetadata = () => {
            document.title = `${SiteI18n.value(project, 'title')} | Zheng Yumin`;
            const description = document.querySelector('meta[name="description"]');
            if (description) description.content = SiteI18n.value(project, 'summary') || SiteI18n.value(project, 'title');
        };
        updateMetadata();
        window.addEventListener('site:languagechange', updateMetadata);
        article.replaceChildren();

        const back = SiteI18n.element('a', 'project-back', 'projects.all');
        back.href = '../../projects.html';
        const header = element('header', 'project-page-header');
        const metadata = element('p', 'projects-eyebrow');
        const updateVenue = () => { metadata.textContent = [SiteI18n.value(project, 'venue'), project.date || project.year].filter(Boolean).join(' / '); metadata.lang = SiteI18n.language === 'zh-CN' && project.venueZh ? 'zh-CN' : 'en'; };
        updateVenue();
        if (metadata.textContent) header.append(metadata);
        window.addEventListener('site:languagechange', updateVenue);
        header.append(SiteI18n.content(element('h1', ''), project, 'title'));
        const authorData = findPublication(project) || project;
        const authors = Array.isArray(authorData.authors) ? authorData.authors.join(', ') : authorData.authors;
        if (authors) {
            const authorLine = element('p', 'project-authors');
            renderSiteAuthors(authorLine, authorData);
            header.append(authorLine);
        }
        const actions = element('div', 'project-actions');
        const labels = { doi: 'projects.paper', code: 'projects.code', video: 'projects.video' };
        Object.entries(project.links || {}).forEach(([kind, url]) => {
            if (!url) return;
            const link = labels[kind]
                ? SiteI18n.element('a', `btn ${kind === 'doi' ? 'btn-primary' : 'btn-secondary'}`, labels[kind])
                : element('a', 'btn btn-secondary', kind);
            link.href = project.resolve(url);
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            actions.append(link);
        });
        const publications = SiteI18n.element('a', 'btn btn-secondary', 'projects.allPapers');
        publications.href = '../../publications.html';
        actions.append(publications);
        header.append(actions);
        article.append(back, header);

        project.sections.forEach((section, index) => {
            const block = element('section', 'project-section');
            block.setAttribute('aria-labelledby', `project-section-${index}`);
            const copy = element('div', 'project-copy');
            const heading = section.heading ? SiteI18n.content(element('h2', ''), section, 'heading')
                : SiteI18n.element('h2', '', 'projects.section', { number: index + 1 });
            heading.id = `project-section-${index}`;
            copy.append(heading);
            (section.paragraphs || []).forEach((paragraph, index) => copy.append(SiteI18n.content(element('p', ''), section, 'paragraphs', { index })));
            if (section.steps?.length) {
                const steps = element('ol', 'project-steps');
                section.steps.forEach((text, index) => steps.append(SiteI18n.content(element('li', ''), section, 'steps', { index })));
                copy.append(steps);
            }
            if (section.bullets?.length) {
                const list = element('ul', 'project-bullets');
                section.bullets.forEach((text, index) => list.append(SiteI18n.content(element('li', ''), section, 'bullets', { index })));
                copy.append(list);
            }
            if (index === 0 && project.topics?.length) {
                const topics = element('div', 'project-topics');
                project.topics.forEach((topic, index) => topics.append(SiteI18n.content(element('span', ''), project, 'topics', { index })));
                copy.append(topics);
            }
            block.append(copy);
            if (section.images?.length) {
                const imagePosition = ['left', 'right', 'top', 'bottom'].includes(section.imagePosition)
                    ? section.imagePosition : 'left';
                const gallery = element('div', 'project-section-images');
                if (section.imageColumns === 2) gallery.dataset.columns = '2';
                let row;
                section.images.forEach((info, imageIndex) => {
                    const figure = element('figure', 'project-art');
                    const image = element('img');
                    image.src = project.resolve(info.src);
                    SiteI18n.content(image, info, 'alt', { attribute: 'alt' });
                    image.decoding = 'async';
                    if (index > 0) image.loading = 'lazy';
                    const imageLink = element('a', 'project-image-link');
                    imageLink.href = image.src;
                    imageLink.target = '_blank';
                    imageLink.rel = 'noopener noreferrer';
                    SiteI18n.attr(imageLink, 'aria-label', 'projects.openImage', { title: info.alt || project.title });
                    imageLink.append(image);
                    figure.append(imageLink);
                    const caption = element('figcaption');
                    if (info.caption || info.captionZh) caption.append(SiteI18n.content(element('span', ''), info, 'caption', { hideEmpty: true }));
                    const fullSize = SiteI18n.element('a', 'project-full-size', 'projects.fullSize');
                    fullSize.href = image.src;
                    fullSize.target = '_blank';
                    fullSize.rel = 'noopener noreferrer';
                    caption.append(fullSize);
                    figure.append(caption);
                    if (section.imageColumns === 2) {
                        if (imageIndex % 2 === 0) {
                            row = element('div', 'project-image-row');
                            gallery.append(row);
                        }
                        row.append(figure);
                        row.dataset.imageCount = row.children.length;
                    } else {
                        gallery.append(figure);
                    }
                });
                if (imagePosition === 'top' || imagePosition === 'bottom') {
                    gallery.querySelectorAll('.project-image-row').forEach(imageRow => {
                        const images = [...imageRow.querySelectorAll('img')];
                        const sizeRow = () => {
                            if (!images.every(image => image.naturalWidth > 0 && image.naturalHeight > 0)) return;
                            // Proportional column widths give the actual images the same height.
                            // CSS handles resizing and stacks them at the mobile breakpoint.
                            const columns = images.map(image => `minmax(0, ${image.naturalWidth / image.naturalHeight}fr)`);
                            imageRow.style.setProperty('--project-image-columns', columns.join(' '));
                        };
                        images.forEach(image => image.addEventListener('load', sizeRow, { once: true }));
                        sizeRow();
                    });
                }
                block.classList.add('has-images');
                block.dataset.imagePosition = imagePosition;
                block.dataset.verticalAlign = section.verticalAlign === 'center' ? 'center' : 'top';
                block.append(gallery);
            }
            article.append(block);
        });
        article.removeAttribute('aria-busy');
    } catch (error) {
        console.error(error);
        article.replaceChildren(SiteI18n.element('h1', '', 'projects.unavailable'));
        article.append(SiteI18n.element('p', 'project-error', window.location.protocol === 'file:'
            ? 'projects.localServer' : 'projects.loadError'));
        const back = SiteI18n.element('a', 'project-back', 'projects.backHome');
        back.href = '../../index.html';
        article.append(back);
        article.removeAttribute('aria-busy');
    }
});
