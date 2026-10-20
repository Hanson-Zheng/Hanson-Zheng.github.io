// Shared by Publications and independent project pages. Keep author data as plain names.
function renderSiteAuthors(container, data, highlightNames = [], { showNotes = true } = {}) {
    container.replaceChildren();
    const names = Array.isArray(data.authors) ? data.authors : data.authors ? [data.authors] : [];
    const coFirstAuthors = new Set(Array.isArray(data.coFirstAuthors) ? data.coFirstAuthors : []);
    const correspondingNames = Object.prototype.hasOwnProperty.call(data, 'correspondingAuthors')
        ? (Array.isArray(data.correspondingAuthors) ? data.correspondingAuthors : [])
        : names.slice(-1);
    const correspondingAuthors = new Set(correspondingNames);
    let hasCoFirstAuthor = false;
    let correspondingCount = 0;
    names.forEach((name, index) => {
        if (index) container.append(document.createTextNode(', '));
        const author = document.createElement('span');
        author.className = 'author-name';
        if (highlightNames.includes(name)) {
            const underline = document.createElement('u');
            const bold = document.createElement('b');
            bold.textContent = name;
            underline.append(bold);
            author.append(underline);
        } else {
            author.textContent = name;
        }
        if (coFirstAuthors.has(name)) {
            const marker = document.createElement('sup');
            marker.className = 'author-dagger';
            marker.textContent = '†';
            marker.title = 'Co-first author';
            marker.setAttribute('aria-label', 'Co-first author');
            author.append(marker);
            hasCoFirstAuthor = true;
        }
        if (correspondingAuthors.has(name)) {
            const marker = document.createElement('sup');
            marker.className = 'author-corresponding';
            marker.textContent = coFirstAuthors.has(name) ? ',*' : '*';
            marker.title = 'Corresponding author';
            marker.setAttribute('aria-label', 'Corresponding author');
            author.append(marker);
            correspondingCount += 1;
        }
        container.append(author);
    });
    if (showNotes && hasCoFirstAuthor) {
        const note = document.createElement('span');
        note.className = 'author-contribution-note';
        note.textContent = '† These authors contributed equally to this work.';
        container.append(note);
    }
    if (showNotes && correspondingCount) {
        const note = document.createElement('span');
        note.className = 'author-correspondence-note';
        note.textContent = correspondingCount === 1 ? '* Corresponding author.' : '* Corresponding authors.';
        container.append(note);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Shared site name; keep each page's existing Home URL.
    if (typeof configData !== 'undefined' && configData.siteName) {
        document.querySelectorAll('.navbar .logo').forEach(logo => {
            logo.textContent = configData.siteName;
        });
    }

    // --- 0.0 Theme Toggle (Light/Dark) ---
    const navLinksContainer = document.querySelector('.nav-links');
    const savedTheme = localStorage.getItem('site-theme') || 'light';

    function applyTheme(theme) {
        const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', normalizedTheme);
        localStorage.setItem('site-theme', normalizedTheme);
    }

    applyTheme(savedTheme);

    function setupThemeToggle() {
        if (!navLinksContainer) return;

        const themeToggleItem = document.createElement('li');
        themeToggleItem.className = 'theme-toggle-item';

        const themeToggleBtn = document.createElement('button');
        themeToggleBtn.type = 'button';
        themeToggleBtn.className = 'theme-toggle-btn';

        const updateToggleUi = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggleBtn.innerHTML = isDark
                ? '<i class="fas fa-sun"></i><span>Light</span>'
                : '<i class="fas fa-moon"></i><span>Dark</span>';
        };

        updateToggleUi();

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
            updateToggleUi();
        });

        themeToggleItem.appendChild(themeToggleBtn);
        navLinksContainer.appendChild(themeToggleItem);
    }

    setupThemeToggle();

    // --- 0. Shared Logic (Navbar Active State) ---
    const normalizePage = path => path.replace(/\/index\.html$/, '/');
    const currentPage = normalizePage(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Compare full paths so a project's index.html is not mistaken for Home.
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkUrl = new URL(href, window.location.href);
        const isCurrentPage = !linkUrl.hash && linkUrl.origin === window.location.origin
            && normalizePage(linkUrl.pathname) === currentPage;

        if (isCurrentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }

        // Close the mobile menu before following a page or section link.
        link.addEventListener('click', () => navLinksContainer.classList.remove('active'));
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
             navLinksContainer.classList.toggle('active');
        });
    }


    // --- 1. Home Profile & Shared Contact ---
    if (typeof configData !== 'undefined') {
        const nameEl = document.getElementById('profile-name');
        const titleEl = document.getElementById('profile-title');
        const introEl = document.getElementById('profile-intro');
        const linksEl = document.getElementById('social-links');
        const heroImgContainer = document.getElementById('hero-image-container');
        const contactEmailEl = document.getElementById('contact-email');
        const footerTextEl = document.getElementById('footer-text');
        const aboutEl = document.getElementById('profile-about');
        const educationEl = document.getElementById('profile-education');

        // Common Header Info
        if (nameEl) nameEl.innerHTML = `Hello,<br>this is <span class="hero-name"><span class="highlight">${configData.name}</span>.</span>`;
        if (titleEl) titleEl.textContent = configData.title;
        if (introEl) introEl.innerHTML = configData.introduction;
        
        // Biography below the welcome text
        if (aboutEl) {
            const paragraphs = Array.isArray(configData.aboutMe)
                ? configData.aboutMe
                : configData.aboutMe ? [configData.aboutMe] : [];
            aboutEl.innerHTML = paragraphs.map(para => `<p>${para}</p>`).join('');
        }

        // Compact education timeline on Home
        if (educationEl && Array.isArray(configData.education)) {
            educationEl.innerHTML = configData.education.map(item => `
                <li class="education-item">
                    <div class="education-year">${item.year}</div>
                    <div class="education-details">
                        <div class="education-degree">
                            ${item.degree}
                            ${item.thesis ? `<a href="${item.thesis}" target="_blank" rel="noopener noreferrer" class="education-thesis"><i class="fas fa-link"></i> Thesis</a>` : ''}
                        </div>
                        <div class="education-institution">${item.institution}</div>
                    </div>
                </li>
            `).join('');
        }
        
        // Contact
        if (contactEmailEl) {
            contactEmailEl.textContent = configData.email;
            contactEmailEl.href = `mailto:${configData.email}`;
        }
        
        // Footer
        if (footerTextEl) footerTextEl.innerHTML = `&copy; ${configData.copyrightYear} ${configData.name}. Hosted on GitHub Pages.`;

        // Social Links
        if (linksEl && configData.socialLinks) {
            linksEl.replaceChildren(...configData.socialLinks.map(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.title = link.label || link.url;
                anchor.setAttribute('aria-label', anchor.title);
                const icon = document.createElement('i');
                icon.className = link.icon;
                icon.setAttribute('aria-hidden', 'true');
                anchor.append(icon);
                return anchor;
            }));
        }

        // Avatar logic
        if (heroImgContainer) {
            if (configData.avatar && configData.avatar.trim() !== "") {
                heroImgContainer.innerHTML = `<img src="${configData.avatar}" alt="${configData.name}" class="hero-image-img" onerror="this.style.display='none'">`;
            } else {
                const initial = configData.name ? configData.name.charAt(0) : "H";
                heroImgContainer.innerHTML = `<div class="avatar-placeholder">${initial}</div>`;
            }
        }
    }


    // --- 2. Publications Rendering (publications.html) ---
    const pubListContainer = document.getElementById('pub-list');
    const yearFiltersContainer = document.getElementById('year-filters');
    let citationChartInstance = null;

    if (pubListContainer && typeof publicationsData !== 'undefined') {
        initPublications(publicationsData);
    } else if (pubListContainer) {
         pubListContainer.innerHTML = '<p>Error: Could not load publications data.</p>';
    }

    function initPublications(data) {
        const sortedData = [...data].sort((a, b) => {
            const dateDifference = getPublicationSortDate(b) - getPublicationSortDate(a);
            if (dateDifference) return dateDifference;
            const aTitle = String(a.title || '');
            const bTitle = String(b.title || '');
            return aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0;
        });
        renderPublications(sortedData);
        renderCitationChart(sortedData);
        if(yearFiltersContainer) { // Only if sidebar exists
            generateYearBookmarks(sortedData);
            setupScrollSpy();
        }
        setupPublicationSearch(sortedData);
    }

    function getPublicationSortDate(pub) {
        const value = String(pub.publicationDate ?? '').trim();
        if (/^[0-9]{8}$/.test(value)) {
            const year = Number(value.slice(0, 4));
            const month = Number(value.slice(4, 6));
            const day = Number(value.slice(6, 8));
            const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
            const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1]) {
                return Number(value);
            }
        }
        return (Number(pub.year) || 0) * 10000;
    }

    function getPublicationYear(pub) {
        // Use the date's year when provided, so year groups retain chronological order.
        return Math.floor(getPublicationSortDate(pub) / 10000);
    }

    function renderPublications(pubs) {
        pubListContainer.innerHTML = '';
        
        const pubsByYear = pubs.reduce((acc, pub) => {
            const year = getPublicationYear(pub);
            acc[year] = acc[year] || [];
            acc[year].push(pub);
            return acc;
        }, {});

        const years = Object.keys(pubsByYear).sort((a, b) => b - a);

        if (years.length === 0) {
            pubListContainer.innerHTML = '<p>No publications found.</p>';
            return;
        }

        years.forEach(year => {
            const yearGroup = document.createElement('div');
            yearGroup.className = 'pub-year-group';
            yearGroup.id = `year-${year}`;

            const yearHeader = document.createElement('h3');
            yearHeader.className = 'pub-year-header';
            yearHeader.textContent = year;
            yearGroup.appendChild(yearHeader);

            pubsByYear[year].forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.className = 'pub-item';
                pubItem.dataset.publicationId = pub.id || '';
                const hasCitation = Object.prototype.hasOwnProperty.call(pub, 'citations');
                const citationCount = Number.isFinite(Number(pub.citations)) ? Number(pub.citations) : 0;
                
                let linksHtml = '';
                if (pub.links) {
                    if (pub.links.code) linksHtml += `<a href="${pub.links.code}" target="_blank" class="pub-link"><i class="fab fa-github"></i> Code</a>`;
                    if (pub.links.doi) linksHtml += `<a href="${pub.links.doi}" target="_blank" rel="noopener noreferrer" class="pub-link pub-link--doi">DOI <span aria-hidden="true">↗</span></a>`;
                }
                const projectUrl = typeof pub.links?.project === 'string' ? pub.links.project.trim() : '';
                let projectLink = '';
                if (projectUrl) {
                    const link = document.createElement('a');
                    link.className = 'pub-link pub-link--project';
                    link.href = projectUrl;
                    link.textContent = 'Project page';
                    projectLink = link.outerHTML;
                }

                pubItem.innerHTML = `
                    <div class="pub-title">${pub.title} <span class="tag-badge">${pub.type}</span></div>
                    <div class="pub-authors"></div>
                    <div class="pub-venue">${pub.venue}, ${pub.year}</div>
                    <div class="pub-abstract" id="abstract-${pub.id}" hidden>${pub.abstract}</div>
                    <div class="pub-links">
                        <div class="pub-links-left">
                            ${linksHtml}
                            <button type="button" class="pub-link pub-link--abstract toggle-abstract" aria-expanded="false" aria-controls="abstract-${pub.id}">Abstract</button>
                            ${projectLink}
                        </div>
                        ${hasCitation ? `<span class="pub-citations"><i class="fas fa-quote-right"></i> Cited by ${citationCount}</span>` : ''}
                    </div>
                `;
                renderSiteAuthors(pubItem.querySelector('.pub-authors'), pub,
                    ["Hanson Zheng", "Zheng Yumin", "Yumin Zheng"], { showNotes: false });
                const abstractButton = pubItem.querySelector('.toggle-abstract');
                abstractButton.addEventListener('click', () => {
                    const abstract = pubItem.querySelector('.pub-abstract');
                    abstract.hidden = !abstract.hidden;
                    abstractButton.setAttribute('aria-expanded', String(!abstract.hidden));
                    const excerpt = pubItem.querySelector('.pub-search-excerpt');
                    if (excerpt) excerpt.hidden = !abstract.hidden || excerpt.dataset.match !== 'true';
                });
                yearGroup.appendChild(pubItem);
            });

            pubListContainer.appendChild(yearGroup);
        });

        const citationSection = document.createElement('section');
        citationSection.id = 'citation-metrics';
        citationSection.className = 'citation-card';
        citationSection.setAttribute('aria-label', 'Citation metrics');
        citationSection.innerHTML = `
            <div class="citation-card-header">
                <h3>Citation Metrics</h3>
                <p id="citation-summary">Add citation data to publication entries to visualize yearly citations.</p>
            </div>
            <div class="citation-chart-wrap">
                <canvas id="citation-chart" aria-label="Yearly citation bar chart" role="img"></canvas>
            </div>
            <div class="citation-card-footer">
                <span id="citation-updated-on">Updated on ${getCitationUpdateStamp()}</span>
            </div>
        `;
        pubListContainer.appendChild(citationSection);
    }

    function setupPublicationSearch(pubs) {
        const input = document.getElementById('publication-search');
        const form = input?.closest('form');
        if (!form) return;

        const clearButton = document.getElementById('publication-search-clear');
        const status = document.getElementById('publication-search-status');
        const emptyState = document.getElementById('publication-search-empty');
        const yearNavigation = document.getElementById('publication-years');
        const citationSection = document.getElementById('citation-metrics');
        const pubContent = pubListContainer.closest('.pub-content');
        const items = [...pubListContainer.querySelectorAll('.pub-item')];
        const entries = pubs.map((pub, index) => {
            const item = items[index];
            const abstract = item.querySelector('.pub-abstract');
            const excerpt = document.createElement('p');
            excerpt.className = 'pub-search-excerpt';
            excerpt.hidden = true;
            const label = document.createElement('span');
            label.className = 'pub-search-excerpt-label';
            label.textContent = 'Abstract';
            const text = document.createElement('span');
            excerpt.append(label, text);
            abstract.before(excerpt);
            const metadata = [pub.title, ...pub.authors, pub.venue].join(' ').toLowerCase();
            const abstractText = abstract.textContent;
            return { pub, item, abstract, abstractText, excerpt, excerptText: text,
                metadata, searchText: `${metadata} ${abstractText.toLowerCase()}` };
        });
        let timer;
        let composing = false;

        function applySearch() {
            const terms = [...new Set(input.value.trim().toLowerCase().split(/\s+/u).filter(Boolean))];
            const searching = terms.length > 0;
            const matches = [];
            entries.forEach(entry => {
                entry.item.querySelectorAll('mark.pub-search-match').forEach(mark => mark.replaceWith(document.createTextNode(mark.textContent)));
                entry.item.normalize();
                const matched = terms.every(term => entry.searchText.includes(term));
                entry.item.hidden = !matched;
                entry.excerpt.hidden = true;
                entry.excerpt.dataset.match = 'false';
                if (!matched) return;
                matches.push(entry.pub);
                if (!searching) return;

                // Reveal why an abstract-only match appears without expanding the full abstract.
                if (!terms.every(term => entry.metadata.includes(term))) {
                    const lowerAbstract = entry.abstractText.toLowerCase();
                    const firstMatch = Math.min(...terms.map(term => lowerAbstract.indexOf(term)).filter(index => index >= 0));
                    let start = Math.max(0, firstMatch - 48);
                    if (start > 0) start = entry.abstractText.lastIndexOf(' ', start) + 1;
                    let end = Math.min(entry.abstractText.length, start + 220);
                    if (end < entry.abstractText.length) {
                        const wordEnd = entry.abstractText.lastIndexOf(' ', end);
                        if (wordEnd > start) end = wordEnd;
                    }
                    entry.excerptText.textContent = `${start ? '…' : ''}${entry.abstractText.slice(start, end).trim()}${end < entry.abstractText.length ? '…' : ''}`;
                    entry.excerpt.dataset.match = 'true';
                    entry.excerpt.hidden = !entry.abstract.hidden;
                    highlightPublicationMatches(entry.excerptText, terms);
                }
                entry.item.querySelectorAll('.pub-title, .pub-authors, .pub-venue, .pub-abstract').forEach(element => highlightPublicationMatches(element, terms));
            });
            pubListContainer.querySelectorAll('.pub-year-group').forEach(group => {
                group.hidden = ![...group.querySelectorAll('.pub-item')].some(item => !item.hidden);
            });
            if (citationSection) citationSection.hidden = searching;
            clearButton.hidden = input.value.length === 0;
            status.hidden = !searching;
            status.textContent = searching ? `${matches.length} of ${pubs.length} publications` : '';
            emptyState.hidden = !searching || matches.length > 0;
            yearNavigation.hidden = matches.length === 0;
            generateYearBookmarks(matches, { includeCitation: !searching, showCounts: searching });

            // A sticky desktop search may be used far down the page. Bring results into view.
            // Mobile keeps the field in place while the on-screen keyboard is open.
            if (matchMedia('(min-width: 769px)').matches && pubContent.getBoundingClientRect().top < 80) {
                window.scrollTo({ top: Math.max(0, pubContent.getBoundingClientRect().top + window.scrollY - 100), behavior: 'instant' });
            }
        }

        function scheduleSearch() {
            clearTimeout(timer);
            if (!composing) timer = setTimeout(applySearch, 120);
        }
        function clearSearch() {
            clearTimeout(timer);
            input.value = '';
            applySearch();
            input.focus({ preventScroll: true });
        }
        input.addEventListener('input', scheduleSearch);
        input.addEventListener('search', scheduleSearch);
        input.addEventListener('compositionstart', () => { composing = true; clearTimeout(timer); });
        input.addEventListener('compositionend', () => { composing = false; scheduleSearch(); });
        input.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); clearSearch(); }
        });
        form.addEventListener('submit', event => {
            event.preventDefault();
            clearTimeout(timer);
            if (!composing) {
                applySearch();
                if (matchMedia('(max-width: 768px)').matches) input.blur();
            }
        });
        clearButton.addEventListener('click', clearSearch);
        emptyState.querySelector('button').addEventListener('click', clearSearch);
        form.hidden = false;
        if (input.value) applySearch();
    }

    function highlightPublicationMatches(element, terms) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
            const text = node.textContent;
            const lowerText = text.toLowerCase();
            const fragment = document.createDocumentFragment();
            let cursor = 0;
            while (cursor < text.length) {
                let next = text.length;
                let length = 0;
                terms.forEach(term => {
                    const index = lowerText.indexOf(term, cursor);
                    if (index >= 0 && (index < next || (index === next && term.length > length))) {
                        next = index;
                        length = term.length;
                    }
                });
                if (!length) break;
                fragment.append(document.createTextNode(text.slice(cursor, next)));
                const mark = document.createElement('mark');
                mark.className = 'pub-search-match';
                mark.textContent = text.slice(next, next + length);
                fragment.append(mark);
                cursor = next + length;
            }
            if (cursor > 0) {
                fragment.append(document.createTextNode(text.slice(cursor)));
                node.replaceWith(fragment);
            }
        });
    }

    function getCitationUpdateStamp() {
        if (typeof publicationsUpdatedOn !== 'undefined' && publicationsUpdatedOn) {
            return publicationsUpdatedOn;
        }

        return 'Unknown';
    }

    function renderCitationChart(pubs) {
        const citationChartCanvas = document.getElementById('citation-chart');
        const citationSummary = document.getElementById('citation-summary');
        if (!citationChartCanvas) return;

        const citationsByYear = {};
        let totalCitations = 0;

        pubs.forEach(pub => {
            if (pub.citationsByYear && typeof pub.citationsByYear === 'object') {
                Object.entries(pub.citationsByYear).forEach(([year, count]) => {
                    const y = String(year);
                    const c = Number(count) || 0;
                    citationsByYear[y] = (citationsByYear[y] || 0) + c;
                    totalCitations += c;
                });
            } else if (Number.isFinite(Number(pub.citations)) && pub.year) {
                const y = String(pub.year);
                const c = Number(pub.citations) || 0;
                citationsByYear[y] = (citationsByYear[y] || 0) + c;
                totalCitations += c;
            }
        });

        const years = Object.keys(citationsByYear).sort((a, b) => Number(a) - Number(b));
        const values = years.map(year => citationsByYear[year]);

        if (citationChartInstance) {
            citationChartInstance.destroy();
            citationChartInstance = null;
        }

        if (years.length === 0) {
            if (citationSummary) {
                citationSummary.textContent = 'No citation data yet. Add "citations" or "citationsByYear" in data/publications.js.';
            }
            return;
        }

        if (citationSummary) {
            citationSummary.textContent = `Total citations: ${totalCitations}`;
        }

        if (typeof Chart === 'undefined') {
            if (citationSummary) {
                citationSummary.textContent += ' (Chart.js failed to load)';
            }
            return;
        }

        citationChartInstance = new Chart(citationChartCanvas, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Citations',
                    data: values,
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 36
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                }
            }
        });
    }

    function generateYearBookmarks(pubs, { includeCitation = true, showCounts = false } = {}) {
        if (!yearFiltersContainer) return;
        yearFiltersContainer.innerHTML = '';
        const years = [...new Set(pubs.map(getPublicationYear))].sort((a, b) => b - a);

        function addBookmark(label, targetId, year, count) {
            const li = document.createElement('li');
            li.dataset.year = year;
            const link = document.createElement('a');
            link.href = `#${targetId}`;
            link.textContent = label;
            if (showCounts && count) {
                const countLabel = document.createElement('span');
                countLabel.className = 'pub-year-count';
                countLabel.textContent = count;
                countLabel.setAttribute('aria-label', `${count} ${count === 1 ? 'publication' : 'publications'}`);
                link.appendChild(countLabel);
            }
            link.addEventListener('click', event => {
                event.preventDefault();
                const target = document.getElementById(targetId);
                if (target) {
                    const offsetPosition = target.getBoundingClientRect().top + window.scrollY - 90;
                    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
                    window.scrollTo({ top: offsetPosition, behavior: reduceMotion ? 'instant' : 'smooth' });
                }
            });
            li.appendChild(link);
            yearFiltersContainer.appendChild(li);
        }
        years.forEach(year => addBookmark(String(year), `year-${year}`, year, pubs.filter(pub => getPublicationYear(pub) === year).length));
        if (includeCitation && document.getElementById('citation-metrics')) addBookmark('Citation Metrics', 'citation-metrics', 'citation-metrics');
        updatePublicationBookmarks();
    }

    function updatePublicationBookmarks() {
        if (!yearFiltersContainer) return;
        const sections = [...pubListContainer.querySelectorAll('.pub-year-group, #citation-metrics')].filter(section => !section.hidden);
        let current = sections[0]?.id || '';
        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= 150) current = section.id;
        });
        const currentYear = current.startsWith('year-') ? current.slice(5) : current;
        yearFiltersContainer.querySelectorAll('li').forEach(li => {
            const active = li.dataset.year === currentYear;
            li.classList.toggle('active', active);
            const link = li.querySelector('a');
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    function setupScrollSpy() {
        let pending = false;
        window.addEventListener('scroll', () => {
            if (pending) return;
            pending = true;
            requestAnimationFrame(() => { pending = false; updatePublicationBookmarks(); });
        }, { passive: true });
    }


    // --- 3. News/Highlights/Life Rendering (Generic System) ---
    
    // Initialize Highlights Section
    setupFilterableGrid('highlights-list', 'highlights-filter', (typeof highlightsData !== 'undefined' ? highlightsData : []));
    
    // Initialize Life Section
    setupFilterableGrid('life-list', 'life-filter', (typeof lifeData !== 'undefined' ? lifeData : []));

    function setupFilterableGrid(containerId, filterId, dataItems) {
        const container = document.getElementById(containerId);
        const filterContainer = document.getElementById(filterId);
        const isHighlightsPage = containerId === 'highlights-list';

        if (!container) return; // This page doesn't have this grid

        if (isHighlightsPage) {
            container.classList.remove('highlights-grid');
            container.classList.add('highlights-sections');
        }

        if (!dataItems || dataItems.length === 0) {
            const lifeEmpty = containerId === 'life-list' ? container.querySelector('[data-life-empty]') : null;
            if (lifeEmpty) {
                if (filterContainer) filterContainer.hidden = true;
                const motionToggle = lifeEmpty.querySelector('[data-life-motion]');
                if (motionToggle) {
                    motionToggle.addEventListener('click', () => {
                        const paused = motionToggle.getAttribute('aria-pressed') !== 'true';
                        lifeEmpty.dataset.paused = String(paused);
                        motionToggle.setAttribute('aria-pressed', String(paused));
                        const label = paused ? 'Resume animation' : 'Pause animation';
                        motionToggle.setAttribute('aria-label', label);
                        motionToggle.title = label;
                    });
                    motionToggle.hidden = false;
                    lifeEmpty.dataset.motionReady = '';
                }
            } else {
                container.innerHTML = '<p>No content loaded.</p>';
            }
            return;
        }

        // Initial Render
        if (isHighlightsPage) {
            renderHighlightsByYear(container, dataItems);
        } else {
            renderGridItems(container, dataItems);
        }

        // Generate Filters if filter container exists
        if (filterContainer) {
            filterContainer.innerHTML = '';
            // Extract years from YYYY-MM-DD
            const years = [...new Set(dataItems.map(item => item.date.substring(0, 4)))].sort().reverse();
            
            // "All" button
            const allBtn = document.createElement('button');
            allBtn.className = 'filter-btn active';
            allBtn.textContent = 'All';
            allBtn.onclick = () => {
                setActiveBtn(filterContainer, allBtn);
                if (isHighlightsPage) {
                    renderHighlightsByYear(container, dataItems);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    renderGridItems(container, dataItems);
                }
            };
            filterContainer.appendChild(allBtn);

            // Year buttons
            years.forEach(year => {
                const btn = document.createElement('button');
                btn.className = 'filter-btn';
                btn.textContent = year;
                btn.onclick = () => {
                    setActiveBtn(filterContainer, btn);
                    if (isHighlightsPage) {
                        // Keep all sections and jump to selected year section.
                        renderHighlightsByYear(container, dataItems);
                        const yearSection = document.getElementById(`highlights-year-${year}`);
                        if (yearSection) {
                            const headerOffset = 90;
                            const elementPosition = yearSection.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                    } else {
                        const filtered = dataItems.filter(item => item.date.startsWith(year));
                        renderGridItems(container, filtered);
                    }
                };
                filterContainer.appendChild(btn);
            });
        }
    }

    function setActiveBtn(container, targetBtn) {
        const btns = container.querySelectorAll('.filter-btn');
        btns.forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
    }

    function renderGridItems(container, items) {
        container.innerHTML = '';
        if(items.length === 0) {
            container.innerHTML = '<p>No items for this period.</p>';
            return;
        }

        items.forEach(item => {
            const card = createNewsCard(item);
            container.appendChild(card);
        });
    }

    function createNewsCard(item) {
        const card = document.createElement('div');
        card.className = 'news-card';

        let imageHtml = '';
        if(item.image && item.image.trim() !== '') {
            imageHtml = `<div class="news-image"><img class="news-image-img" src="${item.image}" alt="${item.title}"></div>`;
        }

        card.innerHTML = `
            ${imageHtml}
            <div class="news-content">
                <div class="news-date">${item.date}</div>
                <div class="news-title">${item.title}</div>
                <div class="news-desc">${item.description}</div>
            </div>
        `;

        const linkGroup = document.createElement('div');
        linkGroup.className = 'news-links';
        (Array.isArray(item.links) ? item.links : []).forEach(info => {
            if (!info || typeof info.url !== 'string' || !info.url.trim()) return;
            let destination;
            try {
                destination = new URL(info.url.trim(), document.baseURI);
            } catch {
                return;
            }
            const localFile = window.location.protocol === 'file:' && destination.protocol === 'file:';
            if (!['http:', 'https:', 'mailto:'].includes(destination.protocol) && !localFile) return;
            const link = document.createElement('a');
            link.className = 'pub-link pub-link--doi';
            link.textContent = typeof info.label === 'string' && info.label.trim() ? info.label.trim() : 'Read more';
            link.href = destination.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `${link.textContent}: ${item.title}`);
            linkGroup.appendChild(link);
        });
        if (linkGroup.childElementCount) {
            const date = card.querySelector('.news-date');
            const metadata = document.createElement('div');
            metadata.className = 'news-meta';
            date.replaceWith(metadata);
            metadata.append(date, linkGroup);
        }

        const imageEl = card.querySelector('.news-image-img');
        if (imageEl) {
            imageEl.addEventListener('load', () => {
                applySmartImageFit(imageEl);
            });
            imageEl.addEventListener('error', () => {
                const wrapper = imageEl.closest('.news-image');
                if (wrapper) wrapper.style.display = 'none';
            });
            if (imageEl.complete && imageEl.naturalWidth > 0) {
                applySmartImageFit(imageEl);
            }
        }

        return card;
    }

    function applySmartImageFit(imageEl) {
        imageEl.classList.remove('img-landscape', 'img-portrait', 'img-square');
        const ratio = imageEl.naturalWidth / imageEl.naturalHeight;

        if (ratio > 1.1) {
            imageEl.classList.add('img-landscape');
        } else if (ratio < 0.9) {
            imageEl.classList.add('img-portrait');
        } else {
            imageEl.classList.add('img-square');
        }
    }

    function renderHighlightsByYear(container, items) {
        container.innerHTML = '';
        if(items.length === 0) {
            container.innerHTML = '<p>No items for this period.</p>';
            return;
        }

        const itemsByYear = items.reduce((acc, item) => {
            const year = (item.date || '').substring(0, 4) || 'Unknown';
            acc[year] = acc[year] || [];
            acc[year].push(item);
            return acc;
        }, {});

        const years = Object.keys(itemsByYear).sort((a, b) => b.localeCompare(a));

        years.forEach(year => {
            const section = document.createElement('section');
            section.className = 'year-section';
            section.id = `highlights-year-${year}`;

            const divider = document.createElement('div');
            divider.className = 'year-divider';
            divider.innerHTML = `<span>${year}</span>`;
            section.appendChild(divider);

            const grid = document.createElement('div');
            grid.className = 'highlights-grid year-grid';

            itemsByYear[year].forEach(item => {
                const card = createNewsCard(item);
                grid.appendChild(card);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });
    }

});
