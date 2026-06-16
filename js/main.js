document.addEventListener('DOMContentLoaded', () => {

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
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Simple active state logic based on filename
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('#')[0]; 
        const isCurrentIndex = (currentPage === "index.html" || currentPage === "");
        const isLinkIndex = (linkPath === "index.html" || linkPath === "");

        if (linkPath === currentPage || (isCurrentIndex && isLinkIndex)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
             navLinksContainer.classList.toggle('active');
        });
    }


    // --- 1. Profile Rendering (Index & About Pages) ---
    if (typeof configData !== 'undefined') {
        const nameEl = document.getElementById('profile-name');
        const titleEl = document.getElementById('profile-title');
        const introEl = document.getElementById('profile-intro');
        const linksEl = document.getElementById('social-links');
        const heroImgContainer = document.getElementById('hero-image-container');
        const contactEmailEl = document.getElementById('contact-email');
        const footerTextEl = document.getElementById('footer-text');
        const aboutEl = document.getElementById('profile-about');

        // Common Header Info
        if (nameEl) nameEl.innerHTML = `Hello,<br>this is <span class="highlight">${configData.name}</span>.`;
        if (titleEl) titleEl.textContent = configData.title;
        if (introEl) introEl.innerHTML = configData.introduction;
        
        // About & Education (Rendered on about.html or index.html if present)
        if (aboutEl) {
            let contentHtml = '';
            
            // Render About Me Text
            if (configData.aboutMe) {
                if (Array.isArray(configData.aboutMe)) {
                    contentHtml += configData.aboutMe.map(para => `<p style="margin-bottom: 1em;">${para}</p>`).join('');
                } else {
                    contentHtml += `<p style="margin-bottom: 1em;">${configData.aboutMe}</p>`;
                }
            }

            // Render Education List
            if (configData.education && Array.isArray(configData.education)) {
                contentHtml += `<h3 style="font-size: 1.2rem; margin-top: 30px; margin-bottom: 15px; color: var(--primary-color);">Education</h3>`;
                contentHtml += configData.education.map(item => `
                    <div style="display: flex; gap: 20px; margin-bottom: 15px; align-items: baseline;">
                        <div style="flex: 0 0 140px; font-weight: 600; color: #64748B; font-size: 0.95rem;">${item.year}</div>
                        <div>
                            <div style="font-weight: 600; color: var(--primary-color); font-size: 1.05rem;">
                                ${item.degree} 
                                ${item.thesis ? `<a href="${item.thesis}" target="_blank" style="margin-left:5px; font-size:0.9rem; font-weight:400; color:var(--accent-color);"><i class="fas fa-link"></i> Thesis</a>` : ''}
                            </div>
                            <div style="color: #64748B; font-size: 0.95rem;">${item.institution}</div>
                        </div>
                    </div>
                `).join('');
            }
            aboutEl.innerHTML = contentHtml;
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
            linksEl.innerHTML = configData.socialLinks.map(link => 
                `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i></a>`
            ).join('');
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
        const sortedData = [...data].sort((a, b) => b.year - a.year);
        renderPublications(sortedData);
        renderCitationChart(sortedData);
        if(yearFiltersContainer) { // Only if sidebar exists
            generateYearBookmarks(sortedData);
            setupScrollSpy();
        }
    }

    function renderPublications(pubs) {
        pubListContainer.innerHTML = '';
        
        const pubsByYear = pubs.reduce((acc, pub) => {
            acc[pub.year] = acc[pub.year] || [];
            acc[pub.year].push(pub);
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
                const hasCitation = Object.prototype.hasOwnProperty.call(pub, 'citations');
                const citationCount = Number.isFinite(Number(pub.citations)) ? Number(pub.citations) : 0;
                
                let authorHtml = pub.authors.join(', ');
                const highlightNames = ["Hanson Zheng", "Zheng Yumin", "Yumin Zheng"];
                highlightNames.forEach(name => {
                    authorHtml = authorHtml.split(name).join(`<u><b>${name}</b></u>`);
                });
                let linksHtml = '';
                if (pub.links) {
                    if (pub.links.pdf) linksHtml += `<a href="${pub.links.pdf}" target="_blank" class="pub-link"><i class="far fa-file-pdf"></i> PDF</a>`;
                    if (pub.links.code) linksHtml += `<a href="${pub.links.code}" target="_blank" class="pub-link"><i class="fab fa-github"></i> Code</a>`;
                    if (pub.links.doi) linksHtml += `<a href="${pub.links.doi}" target="_blank" class="pub-link"><i class="fas fa-external-link-alt"></i> DOI</a>`;
                }

                pubItem.innerHTML = `
                    <div class="pub-title">${pub.title} <span class="tag-badge">${pub.type}</span></div>
                    <div class="pub-authors">${authorHtml}</div>
                    <div class="pub-venue">${pub.venue}, ${pub.year}</div>
                    <div class="pub-abstract" style="display:none;">${pub.abstract}</div>
                    <div class="pub-links">
                        <div class="pub-links-left">
                            ${linksHtml}
                            <a href="javascript:void(0)" class="pub-link toggle-abstract" onclick="this.parentElement.parentElement.previousElementSibling.style.display = this.parentElement.parentElement.previousElementSibling.style.display === 'none' ? 'block' : 'none'">Abstract</a>
                        </div>
                        ${hasCitation ? `<span class="pub-citations"><i class="fas fa-quote-right"></i> Cited by ${citationCount}</span>` : ''}
                    </div>
                `;
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
        `;
        pubListContainer.appendChild(citationSection);
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

    function generateYearBookmarks(pubs) {
        if (!yearFiltersContainer) return;
        yearFiltersContainer.innerHTML = ''; 
        const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a);
        
        years.forEach((year, index) => {
            const li = document.createElement('li');
            li.textContent = year;
            li.dataset.year = year;
            if (index === 0) li.classList.add('active'); 
            
            li.addEventListener('click', () => {
                const target = document.getElementById(`year-${year}`);
                if (target) {
                    const headerOffset = 80; 
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            });
            yearFiltersContainer.appendChild(li);
        });

        const citationLi = document.createElement('li');
        citationLi.textContent = 'Citation Metrics';
        citationLi.dataset.year = 'citation-metrics';
        citationLi.addEventListener('click', () => {
            const target = document.getElementById('citation-metrics');
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
        yearFiltersContainer.appendChild(citationLi);
    }

    function setupScrollSpy() {
        const yearHeaders = document.querySelectorAll('.pub-year-group, #citation-metrics');
        const bookmarks = document.querySelectorAll('.bookmark-list li');
        
        window.addEventListener('scroll', () => {
            let current = '';
            yearHeaders.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 150)) {
                    const sectionId = section.getAttribute('id');
                    current = sectionId.startsWith('year-') ? sectionId.replace('year-', '') : sectionId;
                }
            });
            bookmarks.forEach(li => {
                li.classList.remove('active');
                if (li.dataset.year === current) li.classList.add('active');
            });
        });
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

        if (isHighlightsPage) {
            container.classList.remove('highlights-grid');
            container.classList.add('highlights-sections');
        }

        if (!container) return; // This page doesn't have this grid

        if (!dataItems || dataItems.length === 0) {
            container.innerHTML = '<p>No content loaded.</p>';
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
