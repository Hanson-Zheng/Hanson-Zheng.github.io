// One shared interface language, with explicit keys instead of replacing content strings.
(() => {
    const settings = typeof configData === 'undefined' ? {} : configData.language || {};
    const enabled = settings.enabled === true;
    const normalize = value => value === 'zh-CN' ? 'zh-CN' : 'en';
    const storageKey = 'site-language';
    let saved;
    try { saved = localStorage.getItem(storageKey); } catch { /* A session-only switch still works. */ }
    let language = enabled ? normalize(saved || settings.defaultLanguage) : 'en';
    document.documentElement.style.setProperty('--site-chinese-font',
        settings.chineseFont === 'lxgw-wenkai' ? '"Site CJK Kai"' : '"Site CJK Sans"');
    const dictionaries = { en: {}, 'zh-CN': {} };
    if (typeof siteTranslations !== 'undefined') {
        Object.entries(siteTranslations).forEach(([section, entries]) => {
            Object.entries(entries).forEach(([name, pair]) => {
                const key = `${section}.${name}`;
                dictionaries.en[key] = pair.en;
                dictionaries['zh-CN'][key] = pair['zh-CN'];
            });
        });
    }
    const attributes = ['aria-label', 'title', 'placeholder', 'aria-roledescription'];
    const selector = ['[data-i18n]', ...attributes.map(name => `[data-i18n-${name}]`)].join(',');

    function t(key, values = {}) {
        let message = dictionaries[language]?.[key] ?? dictionaries.en?.[key] ?? key;
        // Keep English singular forms accurate without affecting the Chinese dictionary.
        if (language === 'en') {
            if (key === 'publications.count' && values.count === 1) message = '{count} publication';
            if (key === 'life.placeAnnouncement' && values.count === 1) message = '{place}, {country}. {count} photograph.';
            if (key === 'life.summary') message = `{places} ${values.places === 1 ? 'place' : 'places'} · {countries} ${values.countries === 1 ? 'country' : 'countries'}`;
        }
        return message.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
    }
    function params(node) {
        try { return JSON.parse(node.getAttribute('data-i18n-params') || '{}'); } catch { return {}; }
    }
    function translateNode(node) {
        const values = params(node);
        if (node.hasAttribute('data-i18n')) {
            const value = t(node.getAttribute('data-i18n'), values);
            // Avoid observer loops and preserve DOM state when the text is unchanged.
            if (node.textContent !== value) node.textContent = value;
            node.lang = language;
        }
        attributes.forEach(name => {
            const key = node.getAttribute(`data-i18n-${name}`);
            if (key) node.setAttribute(name, t(key, values));
        });
    }
    function apply(root = document) {
        if (root.nodeType === Node.ELEMENT_NODE && root.matches(selector)) translateNode(root);
        root.querySelectorAll?.(selector).forEach(translateNode);
    }
    function text(node, key, values = {}) {
        node.setAttribute('data-i18n', key);
        node.setAttribute('data-i18n-params', JSON.stringify(values));
        translateNode(node);
        return node;
    }
    function attr(node, name, key, values = {}) {
        node.setAttribute(`data-i18n-${name}`, key);
        node.setAttribute('data-i18n-params', JSON.stringify(values));
        translateNode(node);
        return node;
    }
    function element(tag, className, key, values = {}) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        return text(node, key, values);
    }
    // Content stays beside its English source in project.json / travel.js: title + titleZh, etc.
    const contentBindings = new Set();
    const contentByNode = new WeakMap();
    function localized(source, field, index) {
        const item = value => index === undefined ? value : Array.isArray(value) ? value[index] : undefined;
        const chinese = item(source?.[`${field}Zh`]);
        if (language === 'zh-CN' && typeof chinese === 'string' && chinese.trim()) {
            return { value: chinese, language: 'zh-CN' };
        }
        const english = item(source?.[field]);
        return { value: english === undefined || english === null ? '' : String(english), language: 'en' };
    }
    function updateContent(binding) {
        const { node, source, field, options } = binding;
        const result = localized(source, field, options.index);
        if (options.attribute) node.setAttribute(options.attribute, result.value);
        else if (node.textContent !== result.value) node.textContent = result.value;
        node.lang = result.language;
        if (options.hideEmpty) node.hidden = !result.value;
    }
    function content(node, source, field, options = {}) {
        let bindings = contentByNode.get(node);
        if (!bindings) { bindings = new Map(); contentByNode.set(node, bindings); }
        const identity = `${field}:${options.index ?? ''}:${options.attribute || 'text'}`;
        let binding = bindings.get(identity);
        if (!binding) {
            binding = { node, source, field, options };
            bindings.set(identity, binding);
            contentBindings.add(binding);
        } else Object.assign(binding, { source, options });
        contentBindings.add(binding);
        updateContent(binding);
        return node;
    }
    let button;
    function updateButton() {
        if (!button) return;
        button.textContent = language === 'en' ? '中文' : 'EN';
        button.lang = language === 'en' ? 'zh-CN' : 'en';
        button.title = button.getAttribute('aria-label') || t('language.switch');
    }
    function setLanguage(value, persist = true) {
        language = enabled ? normalize(value) : 'en';
        document.documentElement.lang = language;
        if (persist && enabled) {
            try { localStorage.setItem(storageKey, language); } catch { /* Storage may be blocked. */ }
        }
        apply();
        contentBindings.forEach(binding => {
            if (!binding.node.isConnected && !binding.options.keepDetached) contentBindings.delete(binding);
            else updateContent(binding);
        });
        updateButton();
        window.dispatchEvent(new CustomEvent('site:languagechange', { detail: { language } }));
    }
    window.SiteI18n = { t, text, attr, element, content, apply, setLanguage,
        value: (source, field, index) => localized(source, field, index).value,
        get language() { return language; }, get enabled() { return enabled; } };
    document.documentElement.lang = language;
    document.addEventListener('DOMContentLoaded', () => {
        if (enabled) {
            const links = document.querySelector('.nav-links');
            if (links) {
                const item = document.createElement('li');
                item.className = 'language-toggle-item';
                button = document.createElement('button');
                button.type = 'button';
                button.className = 'language-toggle-btn';
                attr(button, 'aria-label', 'language.switch');
                attr(button, 'title', 'language.switch');
                button.addEventListener('click', () => setLanguage(language === 'en' ? 'zh-CN' : 'en'));
                item.append(button);
                links.append(item);
                const compact = matchMedia('(max-width: 768px)');
                const mount = () => {
                    const actions = document.querySelector('.nav-mobile-actions');
                    const focused = document.activeElement === button;
                    if (compact.matches && actions) actions.prepend(button);
                    else item.append(button);
                    item.hidden = compact.matches && !!actions;
                    if (focused) button.focus({ preventScroll: true });
                };
                compact.addEventListener('change', mount);
                // Run after every DOMContentLoaded handler: main.js creates the mobile row.
                // A microtask can run between those handlers, before that row exists.
                setTimeout(mount, 0);
            }
        }
        apply();
        updateButton();
        // Covers asynchronously loaded cards and map controls without rebuilding their state.
        new MutationObserver(records => {
            const roots = new Set();
            records.forEach(record => record.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) roots.add(node);
            }));
            roots.forEach(root => { if (root.isConnected) apply(root); });
        }).observe(document.body, { childList: true, subtree: true });
    });
    window.addEventListener('storage', event => {
        if (enabled && event.key === storageKey) setLanguage(event.newValue || settings.defaultLanguage, false);
    });
})();
