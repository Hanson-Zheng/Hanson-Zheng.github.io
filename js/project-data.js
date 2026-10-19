(() => {
    const siteRoot = new URL('../', document.currentScript.src);
    const cache = new Map();

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
        return cache.get(url.href);
    }

    async function loadAll() {
        const folders = typeof projectDirectories === 'undefined' ? [] : projectDirectories;
        const results = await Promise.allSettled(folders.map(load));
        results.filter(result => result.status === 'rejected').forEach(result => console.error(result.reason));
        return results.filter(result => result.status === 'fulfilled').map(result => result.value);
    }

    window.projectStore = { load, loadAll };
})();
