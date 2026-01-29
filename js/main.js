document.addEventListener('DOMContentLoaded', () => {

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
    const navLinksContainer = document.querySelector('.nav-links');
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
        if (nameEl) nameEl.innerHTML = `Hello, I'm <span class="highlight">${configData.name}</span>.`;
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

    if (pubListContainer && typeof publicationsData !== 'undefined') {
        initPublications(publicationsData);
    } else if (pubListContainer) {
         pubListContainer.innerHTML = '<p>Error: Could not load publications data.</p>';
    }

    function initPublications(data) {
        const sortedData = [...data].sort((a, b) => b.year - a.year);
        renderPublications(sortedData);
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
                
                let authorHtml = pub.authors.join(', ');
                const highlightNames = ["Hanson Zheng", "Zheng Yumin", "Yumin Zheng"];
                highlightNames.forEach(name => {
                    authorHtml = authorHtml.split(name).join(`<b>${name}</b>`);
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
                    <div class="pub-abstract" style="display:none; margin-top:10px; font-size: 0.9rem; color:#666;">${pub.abstract}</div>
                    <div class="pub-links">
                        ${linksHtml}
                        <a href="javascript:void(0)" class="pub-link toggle-abstract" onclick="this.parentElement.previousElementSibling.style.display = this.parentElement.previousElementSibling.style.display === 'none' ? 'block' : 'none'">Abstract</a>
                    </div>
                `;
                yearGroup.appendChild(pubItem);
            });

            pubListContainer.appendChild(yearGroup);
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
    }

    function setupScrollSpy() {
        const yearHeaders = document.querySelectorAll('.pub-year-group');
        const bookmarks = document.querySelectorAll('.bookmark-list li');
        
        window.addEventListener('scroll', () => {
            let current = '';
            yearHeaders.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id').replace('year-', '');
                }
            });
            bookmarks.forEach(li => {
                li.classList.remove('active');
                if (li.dataset.year === current) li.classList.add('active');
            });
        });
    }


    // --- 3. Highlights/News Rendering (highlights.html) ---
    const highlightsContainer = document.getElementById('highlights-list');
    if (highlightsContainer && typeof highlightsData !== 'undefined') {
        renderHighlights(highlightsData);
    } else if(highlightsContainer) {
        highlightsContainer.innerHTML = '<p>No highlights loaded.</p>';
    }

    function renderHighlights(newsItems) {
        highlightsContainer.innerHTML = '';
        if(newsItems.length === 0) {
            highlightsContainer.innerHTML = '<p>No news yet.</p>';
            return;
        }

        // Sort by date desc (assuming ISO date strings)
        // const sortedNews = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));
        // Use declared order or sort if needed. Let's rely on data order for now to keep it simple, or sort.
        const sortedNews = newsItems; // Keep order

        sortedNews.forEach(item => {
            const card = document.createElement('div');
            card.className = 'news-card';
            
            // Image handling
            let imageHtml = '';
            if(item.image && item.image.trim() !== "") {
                imageHtml = `<div class="news-image"><img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'"></div>`;
            }

            card.innerHTML = `
                ${imageHtml}
                <div class="news-content">
                    <div class="news-date">${item.date}</div>
                    <div class="news-title">${item.title}</div>
                    <div class="news-desc">${item.description}</div>
                </div>
            `;
            highlightsContainer.appendChild(card);
        });
    }

});
