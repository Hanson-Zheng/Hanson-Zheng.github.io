// A local vector atlas: no API keys, online tiles, geocoding or third-party requests.
(() => {
    const root = new URL('../', document.currentScript.src);
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('travel-map');
        if (!canvas) return;
        const story = document.getElementById('travel-story');
        const message = document.getElementById('travel-map-message');
        const retry = document.getElementById('travel-map-retry');
        const worldButton = document.getElementById('travel-world');
        const announcement = document.getElementById('travel-announcement');
        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        const showDates = typeof configData !== 'undefined' && configData.travelMap?.showDates === true;
        const entries = (typeof travelData === 'undefined' || !Array.isArray(travelData) ? [] : travelData)
            .filter(entry => entry && typeof entry.place === 'string' && entry.place.trim()
                && typeof entry.country === 'string' && Array.isArray(entry.coordinates)
                && entry.coordinates.length === 2 && entry.coordinates.every(Number.isFinite)
                && Math.abs(entry.coordinates[0]) <= 85 && Math.abs(entry.coordinates[1]) <= 180)
            .slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        // One highlight group for mainland China, Hong Kong, Macao and Taiwan.
        const chinaRegions = new Set([
            'china', 'mainland china', 'hong kong', 'hong kong, china', 'hong kong sar',
            'macao', 'macau', 'macao, china', 'macau, china', 'macao sar', 'macau sar',
            'taiwan', 'taiwan, china', '中国', '中国大陆', '香港', '澳门', '台湾'
        ]);
        const countryKey = value => {
            const key = String(value || '').trim().toLowerCase();
            return chinaRegions.has(key) ? 'china' : key;
        };
        const visited = new Set(entries.map(entry => countryKey(entry.country)));
        const markers = new Map();
        let selected = null;
        let map = null;
        let countries = null;
        let markerLayer = null;
        let photoIndex = 0;
        let photos = [];
        let loading = false;
        let worldView = true;

        function element(tag, className, text) {
            const node = document.createElement(tag);
            if (className) node.className = className;
            if (text !== undefined) node.textContent = text;
            return node;
        }

        function photoUrl(value) {
            if (typeof value !== 'string' || !value.trim()) return null;
            try {
                const url = new URL(value.trim(), root);
                // Local/file and editor previews use the same asset protocol as this script.
                const localAsset = !['http:', 'https:'].includes(root.protocol)
                    && url.protocol === root.protocol && url.origin === root.origin;
                return ['http:', 'https:'].includes(url.protocol) || localAsset ? url.href : null;
            } catch { return null; }
        }

        function preparePhotos(entry) {
            return (Array.isArray(entry.photos) ? entry.photos : []).flatMap(photo => {
                if (typeof photo === 'string') photo = { src: photo };
                const src = photoUrl(photo?.src);
                return src ? [{ src, alt: photo.alt || entry.title || entry.place, altZh: photo.altZh || entry.titleZh || entry.placeZh, caption: photo.caption || '', captionZh: photo.captionZh }] : [];
            });
        }

        // The full-size photograph is loaded only when the viewer is opened.
        const dialog = element('dialog', 'travel-lightbox');
        SiteI18n.attr(dialog, 'aria-label', 'life.viewer');
        const close = element('button', 'travel-lightbox-close', '×');
        close.type = 'button';
        SiteI18n.attr(close, 'aria-label', 'life.close');
        const largeImage = element('img');
        const largeCaption = element('p');
        dialog.append(close, largeImage, largeCaption);
        document.body.append(dialog);
        close.addEventListener('click', () => dialog.close());
        dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
        dialog.addEventListener('close', () => {
            document.body.classList.remove('travel-lightbox-open');
            largeImage.removeAttribute('src');
        });

        function showLargePhoto() {
            const photo = photos[photoIndex];
            if (!photo) return;
            SiteI18n.content(largeImage, photo, 'alt', { attribute: 'alt' });
            largeImage.src = photo.src;
            SiteI18n.content(largeCaption, photo, 'caption', { hideEmpty: true });
            dialog.showModal();
            document.body.classList.add('travel-lightbox-open');
        }

        function showPhoto(index, announce = true) {
            photoIndex = (index + photos.length) % photos.length;
            const photo = photos[photoIndex];
            const image = element('img', 'travel-photo');
            image.decoding = 'async';
            story.querySelector('.travel-photo').replaceWith(image);
            const frame = story.querySelector('.travel-photo-button');
            const caption = story.querySelector('.travel-photo-caption');
            const error = story.querySelector('.travel-photo-error');
            image.hidden = false;
            error.hidden = true;
            frame.disabled = false;
            frame.style.removeProperty('aspect-ratio');
            frame.style.removeProperty('--travel-photo-ratio');
            frame.classList.remove('is-portrait');
            SiteI18n.content(image, photo, 'alt', { attribute: 'alt' });
            image.addEventListener('load', () => {
                frame.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
                frame.style.setProperty('--travel-photo-ratio', image.naturalWidth / image.naturalHeight);
                frame.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
            }, { once: true });
            applySiteCardImage(image, photo.src, '(max-width: 900px) calc(100vw - 60px), 440px');
            image.addEventListener('error', () => requestAnimationFrame(() => {
                // Give the shared WebP fallback time to start its original-image request.
                if (!image.isConnected || !image.complete || image.naturalWidth || image.hasAttribute('srcset') || image.src !== photo.src) return;
                image.hidden = true;
                error.hidden = false;
                frame.disabled = true;
            }));
            SiteI18n.content(caption, photo, 'caption', { hideEmpty: true });
            story.querySelector('.travel-photo-count').textContent = `${photoIndex + 1} / ${photos.length}`;
            SiteI18n.attr(frame, 'aria-label', 'life.enlarge', { title: SiteI18n.value(photo, 'alt') });
            if (announce) SiteI18n.text(announcement, 'life.photoAnnouncement', { place: SiteI18n.value(selected, 'place'), number: photoIndex + 1, total: photos.length });
        }

        function showStory(entry) {
            photos = preparePhotos(entry);
            photoIndex = 0;
            story.replaceChildren();
            const heading = element('div', 'travel-story-heading');
            const location = element('div');
            location.append(SiteI18n.content(element('p', 'travel-country-name'), entry, 'country'), SiteI18n.content(element('h4', ''), entry, 'place'));
            heading.append(location);
            const date = new Date(`${entry.date}T12:00:00Z`);
            if (showDates && /^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') && Number.isFinite(date.getTime())) {
                const time = element('time', '', new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date));
                time.dateTime = entry.date;
                heading.append(time);
            }
            story.append(heading);
            if (photos.length) {
                const media = element('div', 'travel-media');
                const frame = element('button', 'travel-photo-button');
                frame.type = 'button';
                const image = element('img', 'travel-photo');
                image.decoding = 'async';
                const error = SiteI18n.element('span', 'travel-photo-error', 'life.photoSlow');
                error.hidden = true;
                frame.append(image, error, element('span', 'travel-photo-enlarge', '↗'));
                frame.addEventListener('click', showLargePhoto);
                const navigation = element('div', 'travel-photo-navigation');
                const previous = element('button', '', '←');
                const next = element('button', '', '→');
                previous.type = next.type = 'button';
                SiteI18n.attr(previous, 'aria-label', 'life.previous');
                SiteI18n.attr(next, 'aria-label', 'life.next');
                previous.addEventListener('click', () => showPhoto(photoIndex - 1));
                next.addEventListener('click', () => showPhoto(photoIndex + 1));
                navigation.append(previous, element('span', 'travel-photo-count'), next);
                navigation.hidden = photos.length < 2;
                media.append(frame, navigation);
                story.append(media, element('p', 'travel-photo-caption'));
            } else {
                story.append(SiteI18n.element('p', 'travel-no-photos', 'life.photosSoon'));
            }
            if (entry.title) story.append(SiteI18n.content(element('h5', 'travel-story-title'), entry, 'title'));
            if (entry.description) story.append(SiteI18n.content(element('p', 'travel-description'), entry, 'description'));
            if (photos.length) showPhoto(0, false);
        }

        function labelPin(marker, entry) {
            const pin = marker.getElement();
            if (!pin) return;
            SiteI18n.attr(pin, 'aria-label', 'life.showPhotos', { place: SiteI18n.value(entry, 'place'), country: SiteI18n.value(entry, 'country') });
            SiteI18n.content(pin, {
                label: `${entry.place}, ${entry.country}`,
                labelZh: entry.placeZh || entry.countryZh ? `${entry.placeZh || entry.place}, ${entry.countryZh || entry.country}` : undefined
            }, 'label', { attribute: 'title' });
        }
        window.addEventListener('site:languagechange', () => {
            markers.forEach((marker, entry) => labelPin(marker, entry));
            if (!selected) return;
            SiteI18n.text(announcement, 'life.placeAnnouncement', { place: SiteI18n.value(selected, 'place'), country: SiteI18n.value(selected, 'country'), count: photos.length });
            const frame = story.querySelector('.travel-photo-button');
            if (frame && photos[photoIndex]) SiteI18n.attr(frame, 'aria-label', 'life.enlarge', { title: SiteI18n.value(photos[photoIndex], 'alt') });
        });

        function updateCountries() {
            countries?.eachLayer(layer => {
                const key = countryKey(layer.feature.properties.name);
                layer.getElement()?.classList.toggle('is-selected', !!selected && key === countryKey(selected.country));
            });
        }

        function selectPlace(entry, pan = true) {
            selected = entry;
            markers.forEach((marker, candidate) => {
                const pin = marker.getElement();
                pin?.classList.toggle('is-selected', candidate === entry);
                pin?.setAttribute('aria-pressed', String(candidate === entry));
                marker.setZIndexOffset(candidate === entry ? 1000 : 0);
            });
            updateCountries();
            markerLayer?.refreshClusters?.();
            showStory(entry);
            SiteI18n.text(announcement, 'life.placeAnnouncement', { place: SiteI18n.value(entry, 'place'), country: SiteI18n.value(entry, 'country'), count: photos.length });
            if (pan && map) {
                worldView = false;
                map.setView(entry.coordinates, Math.max(map.getZoom(), 3.5), { animate: !reducedMotion.matches });
            }
        }

        if (entries.length) SiteI18n.text(document.getElementById('travel-summary'), 'life.summary', { places: entries.length, countries: visited.size });
        if (entries.length) selectPlace(entries[0], false);

        function fitWorld() {
            if (!map) return;
            worldView = true;
            map.fitBounds([[-55, -175], [80, 180]], { padding: [14, 14], animate: false });
        }

        function createMap() {
            if (!window.L) throw new Error('Map library unavailable');
            map = L.map(canvas, {
                minZoom: 0, maxZoom: 7, zoomSnap: 0.25, zoomDelta: 0.5,
                scrollWheelZoom: false, zoomAnimation: !reducedMotion.matches,
                fadeAnimation: !reducedMotion.matches, markerZoomAnimation: !reducedMotion.matches,
                attributionControl: true, maxBounds: [[-85, -220], [85, 220]], maxBoundsViscosity: 0.7
            });
            map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
            map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com/">Natural Earth</a>');
            map.zoomControl.setPosition('topright');
            const zoomLabels = () => {
                const controls = canvas.querySelectorAll('.leaflet-control-zoom a');
                controls.forEach((control, index) => {
                    SiteI18n.attr(control, 'aria-label', index ? 'life.zoomOut' : 'life.zoomIn');
                    SiteI18n.attr(control, 'title', index ? 'life.zoomOut' : 'life.zoomIn');
                });
                markerLayer?.refreshClusters?.();
            };
            zoomLabels();
            window.addEventListener('site:languagechange', zoomLabels);
            // Keep regular scrolling for the page; Alt+wheel zooms only this map.
            let wheelTarget = null;
            let wheelPoint;
            let wheelTime = 0;
            let wheelFrame = 0;
            canvas.addEventListener('wheel', event => {
                if (!event.altKey || event.ctrlKey || event.metaKey || !event.deltaY) return;
                event.preventDefault();
                const now = performance.now();
                if (wheelTarget === null || now - wheelTime > 180) wheelTarget = map.getZoom();
                const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? canvas.clientHeight : 1;
                wheelTarget = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), wheelTarget - event.deltaY * unit * 0.005));
                wheelPoint = map.mouseEventToContainerPoint(event);
                wheelTime = now;
                if (!wheelFrame) wheelFrame = requestAnimationFrame(() => {
                    wheelFrame = 0;
                    worldView = false;
                    map.setZoomAround(wheelPoint, Math.round(wheelTarget * 4) / 4, { animate: false });
                });
            }, { passive: false });
            fitWorld();
            const icon = L.divIcon({
                className: 'travel-pin', iconSize: [28, 36], iconAnchor: [14, 35], tooltipAnchor: [0, -30],
                html: '<svg viewBox="0 0 28 36" aria-hidden="true"><path d="M14 34S2 23 2 14a12 12 0 1 1 24 0c0 9-12 20-12 20Z"/><circle cx="14" cy="14" r="4"/></svg>'
            });
            markerLayer = typeof L.markerClusterGroup === 'function' ? L.markerClusterGroup({
                maxClusterRadius: 36, showCoverageOnHover: false,
                animate: !reducedMotion.matches, spiderfyDistanceMultiplier: 1.5,
                spiderLegPolylineOptions: { color: 'var(--travel-pin)', weight: 1.2, opacity: 0.65 },
                iconCreateFunction(cluster) {
                    const count = cluster.getChildCount();
                    cluster.options.title = SiteI18n.t('life.nearby', { count });
                    const current = selected && cluster.getAllChildMarkers().includes(markers.get(selected));
                    return L.divIcon({
                        className: `travel-cluster${current ? ' is-selected' : ''}`,
                        html: String(count), iconSize: [36, 36], iconAnchor: [18, 18]
                    });
                }
            }) : L.featureGroup();
            markerLayer.addTo(map);
            entries.forEach(entry => {
                const marker = L.marker(entry.coordinates, { icon, title: `${entry.place}, ${entry.country}`, keyboard: true, autoPanOnFocus: true });
                marker.bindTooltip(SiteI18n.content(element('span', ''), entry, 'place', { keepDetached: true }), { direction: 'top' });
                marker.on('click', () => selectPlace(entry));
                marker.on('add', () => {
                    const pin = marker.getElement();
                    labelPin(marker, entry);
                    pin.setAttribute('aria-pressed', String(selected === entry));
                    pin.classList.toggle('is-selected', selected === entry);
                    pin.onkeydown = event => {
                        if (event.key !== ' ') return;
                        event.preventDefault();
                        selectPlace(entry);
                    };
                });
                markers.set(entry, marker);
                markerLayer.addLayer(marker);
            });
            map.on('dragstart zoomstart', event => { if (event.type === 'dragstart' || event.originalEvent) worldView = false; });
            // A real user zoom should stay at their chosen scale when the viewport resizes.
            map.on('zoomend', () => { if (!fitting) worldView = false; });
            let fitting = false;
            const resize = () => {
                fitting = true;
                map.invalidateSize({ pan: false });
                if (worldView) fitWorld();
                fitting = false;
            };
            new ResizeObserver(resize).observe(canvas);
            fitting = true;
            fitWorld();
            fitting = false;
            worldButton.hidden = false;
            worldButton.addEventListener('click', () => {
                fitting = true;
                fitWorld();
                fitting = false;
            });
            if (selected) selectPlace(selected, false);
        }

        async function loadCountries() {
            if (loading) return;
            loading = true;
            canvas.setAttribute('aria-busy', 'true');
            message.hidden = false;
            SiteI18n.text(message.firstElementChild, 'life.unfolding');
            retry.hidden = true;
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 12000);
            try {
                if (!map) createMap();
                const response = await fetch(new URL('assets/maps/countries-50m.geo.json', root), { signal: controller.signal });
                if (!response.ok) throw new Error(`Map data: ${response.status}`);
                const features = await response.json();
                countries = L.geoJSON(features, {
                    filter: feature => feature.properties.name !== 'Antarctica',
                    style: feature => ({
                        className: `travel-country${visited.has(countryKey(feature.properties.name)) ? ' is-visited' : ''}`,
                        weight: 0.7, fillOpacity: 1
                    }),
                    onEachFeature(feature, layer) {
                        const label = ['344', '446', '158'].includes(String(feature.id))
                            ? `${feature.properties.name}, China` : feature.properties.name;
                        const regionZh = { '344': '中国香港', '446': '中国澳门', '158': '中国台湾' };
                        const nameZh = regionZh[String(feature.id)] || entries.find(entry => countryKey(entry.country) === countryKey(feature.properties.name))?.countryZh;
                        layer.bindTooltip(SiteI18n.content(element('span', ''), { name: label, nameZh }, 'name', { keepDetached: true }), { sticky: true });
                        if (visited.has(countryKey(feature.properties.name))) {
                            layer.on('click', () => selectPlace(entries.find(entry => countryKey(entry.country) === countryKey(feature.properties.name))));
                        }
                    }
                }).addTo(map);
                updateCountries();
                message.hidden = true;
                canvas.dataset.state = 'ready';
            } catch (error) {
                canvas.dataset.state = 'error';
                SiteI18n.text(message.firstElementChild, 'life.mapError');
                retry.hidden = false;
                console.warn('Travel map could not load:', error.message);
            } finally {
                clearTimeout(timeout);
                loading = false;
                canvas.setAttribute('aria-busy', 'false');
            }
        }
        retry.addEventListener('click', loadCountries);
        loadCountries();
    });
})();
