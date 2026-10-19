document.addEventListener('DOMContentLoaded', async () => {
    const article = document.getElementById('project-content');
    if (!article || !window.projectStore) return;

    const element = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };

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
        const authors = Array.isArray(project.authors) ? project.authors.join(', ') : project.authors;
        if (authors) header.append(element('p', 'project-authors', authors));
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
                const gallery = element('div', 'project-section-images');
                if (section.imageColumns === 2) gallery.dataset.columns = '2';
                section.images.forEach(info => {
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
                    gallery.append(figure);
                });
                block.classList.add('has-images');
                block.dataset.imagePosition = ['left', 'right', 'top', 'bottom'].includes(section.imagePosition)
                    ? section.imagePosition : 'left';
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
