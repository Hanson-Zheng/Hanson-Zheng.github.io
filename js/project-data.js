(() => {
    const siteRoot = new URL('../', document.currentScript.src);
    const cache = new Map();

    // Preserve the supplied precision; a year-only value never invents a month or day.
    function parseProjectDate(value) {
        let text = String(value ?? '').trim();
        if (/^\d{8}$/.test(text)) text = `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6)}`;
        const match = /^(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?$/.exec(text);
        if (!match) return null;
        const year = Number(match[1]);
        const month = Number(match[2] || 0);
        const day = Number(match[3] || 0);
        const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        const days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (!year || (match[2] && (month < 1 || month > 12))
            || (match[3] && (day < 1 || day > days[month - 1]))) return null;
        const date = match[1] + (match[2] ? `-${String(month).padStart(2, '0')}` : '')
            + (match[3] ? `-${String(day).padStart(2, '0')}` : '');
        return { date, year, sortDate: year * 10000 + month * 100 + day };
    }

    function applyRegistration(project) {
        const entries = typeof projectDirectories === 'undefined' ? [] : projectDirectories;
        const entry = entries.find(item => item?.folder === project.folder) || {};
        const time = parseProjectDate(entry.date) || parseProjectDate(project.date)
            || parseProjectDate(project.year ?? project.card.year);
        return {
            ...project,
            date: time?.date || '',
            year: time?.year || 0,
            sortDate: time?.sortDate || 0,
            card: { ...project.card, year: time ? String(time.year) : '' },
            order: Number.isFinite(entry.order) && entry.order >= 0 ? entry.order : Infinity,
            featured: entry.featured === true
        };
    }

    function load(folder) {
        const url = new URL(`project/${folder}/project.json`, siteRoot);
        if (!cache.has(url.href)) {
            cache.set(url.href, fetch(url).then(response => {
                if (!response.ok) throw new Error(`Could not load ${url.pathname}: ${response.status}`);
                return response.json();
            }).then(data => {
                if (!data.title || !data.card || !Array.isArray(data.sections)) {
                    throw new Error(`Project needs title, card, and sections: ${url.pathname}`);
                }
                return {
                    ...data,
                    folder,
                    pageUrl: new URL('index.html', url).href,
                    resolve: path => new URL(path, url).href
                };
            }));
        }
        return cache.get(url.href).then(applyRegistration);
    }

    async function loadAll() {
        const entries = typeof projectDirectories === 'undefined' ? [] : projectDirectories;
        const results = await Promise.allSettled(entries.map(async entry => {
            if (!entry || typeof entry.folder !== 'string' || !entry.folder.trim()) {
                throw new Error('Each project entry needs a folder in data/projects.js.');
            }
            return load(entry.folder);
        }));
        results.filter(result => result.status === 'rejected').forEach(result => console.error(result.reason));
        return results.filter(result => result.status === 'fulfilled').map(result => result.value);
    }

    function relatedPublications(project) {
        const papers = typeof publicationsData === 'undefined' ? [] : publicationsData;
        if (!Array.isArray(papers)) return [];
        const pageKey = path => {
            try {
                const url = new URL(path, siteRoot);
                return url.origin + url.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            } catch {
                return null;
            }
        };
        const projectKey = pageKey(project.pageUrl);
        return papers.filter(paper => (project.publicationId && paper.id === project.publicationId)
            || (paper.links?.project && pageKey(paper.links.project) === projectKey));
    }

    window.projectStore = { load, loadAll, relatedPublications };
})();
