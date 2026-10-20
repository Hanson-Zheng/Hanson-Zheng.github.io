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
        if (typeof publicationsData === 'undefined' || !Array.isArray(publicationsData)) return null;
        // An explicit ID can select one paper when several share a project page.
        if (project.publicationId) return publicationsData.find(paper => paper.id === project.publicationId) || null;
        const siteRoot = project.resolve('../../');
        const pageKey = value => {
            try {
                const url = new URL(value, siteRoot);
                return url.origin + url.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            } catch {
                return null;
            }
        };
        const projectKey = pageKey(project.pageUrl);
        const matches = publicationsData.filter(paper => paper.links?.project && pageKey(paper.links.project) === projectKey);
        return matches.length === 1 ? matches[0] : null;
    }

    try {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const folder = segments[segments.length - (segments.at(-1) === 'index.html' ? 2 : 1)];
        const project = await projectStore.load(decodeURIComponent(folder));
        document.title = `${project.title} | Zheng Yumin`;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.content = project.summary || project.title;
        article.replaceChildren();

        const back = element('a', 'project-back', '← Back to selected projects');
        back.href = '../../index.html#selected-work';
        const header = element('header', 'project-page-header');
        const metadata = [project.venue, project.year].filter(Boolean).join(' / ');
        if (metadata) header.append(element('p', 'projects-eyebrow', metadata));
        header.append(element('h1', '', project.title));
        const authorData = findPublication(project) || project;
        const authors = Array.isArray(authorData.authors) ? authorData.authors.join(', ') : authorData.authors;
        if (authors) {
            const authorLine = element('p', 'project-authors');
            renderSiteAuthors(authorLine, authorData);
            header.append(authorLine);
        }
        const actions = element('div', 'project-actions');
        const labels = { doi: 'Read the paper ↗', code: 'Code ↗', video: 'Watch video ↗' };
        Object.entries(project.links || {}).forEach(([kind, url]) => {
            if (!url) return;
            const link = element('a', `btn ${kind === 'doi' ? 'btn-primary' : 'btn-secondary'}`, labels[kind] || kind);
            link.href = project.resolve(url);
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            actions.append(link);
        });
        const publications = element('a', 'btn btn-secondary', 'All publications');
        publications.href = '../../publications.html';
        actions.append(publications);
        header.append(actions);
        article.append(back, header);

        project.sections.forEach((section, index) => {
            const block = element('section', 'project-section');
            block.setAttribute('aria-labelledby', `project-section-${index}`);
            const copy = element('div', 'project-copy');
            const heading = element('h2', '', section.heading || `Section ${index + 1}`);
            heading.id = `project-section-${index}`;
            copy.append(heading);
            (section.paragraphs || []).forEach(paragraph => copy.append(element('p', '', paragraph)));
            if (section.steps?.length) {
                const steps = element('ol', 'project-steps');
                section.steps.forEach(text => steps.append(element('li', '', text)));
                copy.append(steps);
            }
            if (section.bullets?.length) {
                const list = element('ul', 'project-bullets');
                section.bullets.forEach(text => list.append(element('li', '', text)));
                copy.append(list);
            }
            if (index === 0 && project.topics?.length) {
                const topics = element('div', 'project-topics');
                project.topics.forEach(topic => topics.append(element('span', '', topic)));
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
                    image.alt = info.alt || '';
                    image.decoding = 'async';
                    if (index > 0) image.loading = 'lazy';
                    const imageLink = element('a', 'project-image-link');
                    imageLink.href = image.src;
                    imageLink.target = '_blank';
                    imageLink.rel = 'noopener noreferrer';
                    imageLink.setAttribute('aria-label', `Open full-size image${info.alt ? `: ${info.alt}` : ''}`);
                    imageLink.append(image);
                    figure.append(imageLink);
                    const caption = element('figcaption');
                    if (info.caption) caption.append(element('span', '', info.caption));
                    const fullSize = element('a', 'project-full-size', 'Full size ↗');
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
        article.replaceChildren(element('h1', '', 'Project unavailable'));
        article.append(element('p', 'project-error', window.location.protocol === 'file:'
            ? 'Please preview this site through a local web server to load project content.'
            : 'This project could not be loaded. Please refresh the page or try again later.'));
        const back = element('a', 'project-back', '← Back to Home');
        back.href = '../../index.html';
        article.append(back);
        article.removeAttribute('aria-busy');
    }
});
