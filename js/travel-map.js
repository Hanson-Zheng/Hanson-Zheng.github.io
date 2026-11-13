// A local vector atlas: no API keys, online tiles, geocoding or third-party requests.
(() => {
    const root = new URL('../', document.currentScript.src);
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('travel-map');
        if (!canvas) return;
        // Theme-specific variables let palette changes follow the shared theme toggle.
        const atlas = canvas.closest('.travel-atlas');
        const palette = typeof configData !== 'undefined' ? configData.travelMap?.colors : null;
        const aviationPalette = typeof configData !== 'undefined' ? configData.travelMap?.aviationColors : null;
        for (const [scope, colors] of [['', palette], ['aviation-', aviationPalette]]) {
            for (const theme of ['light', 'dark']) {
                for (const key of ['ocean', 'land', 'border', 'visited', 'selected', 'selectedBorder', 'provinceBorder', 'pin', 'selectedPin']) {
                    const color = colors?.[theme]?.[key];
                    if (atlas && typeof color === 'string' && CSS.supports('color', color)) {
                        const variable = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
                        atlas.style.setProperty(`--travel-${scope}${theme}-${variable}`, color);
                    }
                }
            }
        }
        const story = document.getElementById('travel-story');
        const message = document.getElementById('travel-map-message');
        const retry = document.getElementById('travel-map-retry');
        const worldButton = document.getElementById('travel-world');
        const announcement = document.getElementById('travel-announcement');
        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        const pacificLayout = typeof configData !== 'undefined' && configData.travelMap?.worldLayout === 'pacific';
        const horizontalWrap = typeof configData === 'undefined' || configData.travelMap?.horizontalWrap !== false;
        // Stored coordinates stay conventional; only their display position wraps.
        const displayCoordinates = ([latitude, longitude]) => [latitude, !horizontalWrap && pacificLayout && longitude < -30 ? longitude + 360 : longitude];
        const worldBounds = pacificLayout ? [[-55, -30], [82, 330]] : [[-55, -175], [80, 180]];
        const showDates = typeof configData !== 'undefined' && configData.travelMap?.showDates === true;
        const wheelConfig = typeof configData !== 'undefined' ? configData.travelMap?.wheelZoom : null;
        const wheelOption = (key, fallback, min, max) => Number.isFinite(wheelConfig?.[key])
            ? Math.max(min, Math.min(max, wheelConfig[key])) : fallback;
        const wheelPixelsPerLevel = wheelOption('pixelsPerLevel', 240, 200, 3000);
        const wheelDuration = wheelOption('durationMs', 0, 0, 600);
        const wheelRespectsReducedMotion = wheelConfig?.respectReducedMotion === true;
        const wheelMaxStep = wheelOption('maxStep', 0.5, 0.05, 0.5);
        const wheelQuietMs = wheelOption('settleMs', 140, 60, 400);
        const placeTransition = typeof configData !== 'undefined' ? configData.travelMap?.placeTransition : null;
        const placeDuration = Number.isFinite(placeTransition?.durationMs)
            ? Math.max(0, Math.min(1200, placeTransition.durationMs)) : 320;
        const placeRespectsReducedMotion = placeTransition?.respectReducedMotion === true;
        const keepSelectedVisible = placeTransition?.focus !== 'center';
        const markerConfig = typeof configData !== 'undefined' ? configData.travelMap?.markers : null;
        const markerOption = (key, fallback, min, max) => Number.isFinite(markerConfig?.[key])
            ? Math.max(min, Math.min(max, markerConfig[key])) : fallback;
        const markerResponsive = markerConfig?.responsive !== false;
        const markerCompactBelow = markerOption('compactBelow', 600, 240, 1200);
        const detailConfig = typeof configData !== 'undefined' ? configData.travelMap?.detail : null;
        const detailEnabled = detailConfig?.enabled !== false;
        const detailMinZoom = Number.isFinite(detailConfig?.minZoom)
            ? Math.max(1, Math.min(7, detailConfig.minZoom)) : 4.5;
        const provinceConfig = typeof configData !== 'undefined' ? configData.travelMap?.provinceBorders : null;
        const provinceBordersEnabled = provinceConfig?.enabled !== false;
        const provinceMinZoom = Number.isFinite(provinceConfig?.minZoom)
            ? Math.max(0, Math.min(7, provinceConfig.minZoom)) : 4;
        const photoLayout = typeof configData !== 'undefined' ? configData.travelMap?.photoLayout : null;
        const adaptivePhotoLayout = photoLayout?.adaptive !== false;
        const photoLayoutOption = (key, fallback, min, max) => Number.isFinite(photoLayout?.[key])
            ? Math.max(min, Math.min(max, photoLayout[key])) : fallback;
        const photoTargetHeight = photoLayoutOption('targetHeight', 420, 200, 600);
        const minStoryWidth = photoLayoutOption('minStoryWidth', 300, 280, 600);
        const maxStoryShare = photoLayoutOption('maxStoryShare', 0.46, 0.35, 0.6);
        const photoColumnDuration = photoLayoutOption('transitionMs', 180, 0, 400);
        const photoFadeDuration = photoLayoutOption('imageFadeMs', 140, 0, 300);
        const mobilePhotoHeight = photoLayoutOption('mobilePhotoHeight', 300, 220, 480);
        const mobilePortraitMaxHeight = photoLayoutOption('mobilePortraitMaxHeight', 520, 300, 800);
        atlas.style.setProperty('--travel-atlas-height', `${photoLayoutOption('height', 680, 560, 1000)}px`);
        atlas.style.setProperty('--travel-mobile-photo-height', `${mobilePhotoHeight}px`);
        atlas.style.setProperty('--travel-column-duration', `${photoColumnDuration}ms`);
        const labelConfig = typeof configData !== 'undefined' ? configData.travelMap?.labels : null;
        const labelOption = (key, fallback, min, max) => Number.isFinite(labelConfig?.[key])
            ? Math.max(min, Math.min(max, labelConfig[key])) : fallback;
        const countryMinZoom = labelOption('countryMinZoom', 3, 0, 22);
        const labelMotionSettleMs = labelOption('motionSettleMs', 40, 16, 300);
        const cityMinZoom = labelOption('cityMinZoom', 4, 0, 22);
        const cityFontSize = labelOption('cityFontSize', 15, 11, 20);
        const cityLineHeight = Math.ceil(cityFontSize * 1.6);
        canvas.style.setProperty('--travel-city-font-size', `${cityFontSize}px`);
        canvas.style.setProperty('--travel-city-line-height', `${cityLineHeight}px`);
        const countryOpacity = labelOption('countryOpacity', 0.28, 0, 1);
        const countryMaxFontSize = labelOption('countryMaxFontSize', 64, 18, 120);
        const validEntries = source => (Array.isArray(source) ? source : [])
            .filter(entry => entry && typeof entry.place === 'string' && entry.place.trim()
                && typeof entry.country === 'string' && Array.isArray(entry.coordinates)
                && entry.coordinates.length === 2 && entry.coordinates.every(Number.isFinite)
                && Math.abs(entry.coordinates[0]) <= 85 && Math.abs(entry.coordinates[1]) <= 180)
            .slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        const datasets = {
            places: validEntries(typeof travelData === 'undefined' ? [] : travelData),
            aviation: validEntries(typeof aviationData === 'undefined' ? [] : aviationData)
                .filter(entry => /^[A-Z]{3}$/.test(entry.iata) && entry.id === entry.iata)
        };
        const aviationEnabled = (typeof configData === 'undefined' || configData.travelMap?.aviationEnabled !== false)
            && datasets.aviation.length > 0;
        let currentMode = typeof configData !== 'undefined' && configData.travelMap?.defaultMode === 'aviation' ? 'aviation' : 'places';
        try {
            const stored = localStorage.getItem('siteLifeMapMode');
            if (stored === 'aviation' || stored === 'places') currentMode = stored;
        } catch { /* A blocked preference store does not affect the map. */ }
        if (!aviationEnabled) currentMode = 'places';
        let entries = datasets[currentMode];
        const selectionByMode = new Map();
        const modeSwitch = document.getElementById('travel-mode-switch');
        const airportCity = entry => `${SiteI18n.value(entry, 'place')} ${entry.iata}`;
        // Keep the official name in data/tooltips; use a compact name on the map.
        const airportLabel = entry => {
            const custom = SiteI18n.value(entry, 'airportShort');
            if (custom) return custom.trim();
            return SiteI18n.value(entry, 'airport')
                .replace(/\s*(?:International\s+)?Airport\s*$/i, '')
                .replace(/(?:国际)?机场\s*$/, '').trim();
        };
        const entryName = entry => currentMode === 'aviation'
            ? [airportCity(entry), SiteI18n.value(entry, 'airport')].filter(Boolean).join(' · ')
            : SiteI18n.value(entry, 'place');
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
        let provinceBorders = null;
        let provinceRenderer = null;
        let provinceFeatures = null;
        let provinceRequest = null;
        const provinceWorldOffsets = new Set();
        let markerLayer = null;
        let pinIcon = null;
        let countryFeatures = null;
        let baseCountryFeatures = null;
        let baseCountryLabels = {};
        let detailedCountryFeatures = null;
        let detailRequest = null;
        let detailRetryAfter = 0;
        let currentResolution = '50m';
        let detailRenderBounds = null;
        let detailViewFrame = 0;
        const worldOffsets = new Set();
        const countryRenderRecords = [];
        const countryLabelRecords = [];
        const countryLabelNodes = new Map();
        const cityLabelNodes = new Map();
        const countryTooltipNodes = new Map();
        const labelMeasure = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const cityInkCache = new Map();
        let countryLabelData = {};
        let countryLabelPane;
        let cityLabelPane;
        let labelFrame = 0;
        let photoIndex = 0;
        let photos = [];
        let currentPhotoRatio = null;
        let photoLayoutFrame = 0;
        let photoRequest = 0;
        let activePhoto = null;
        let expandedCluster = null;
        let focusAfterLayout = null;
        let layoutFinishTimer = 0;
        let loading = false;
        let worldView = true;
        let wheelActive = false;
        let wheelQuietUntil = 0;
        const indexedCountryDatasets = new WeakSet();
        let finishWheelZoom = () => {};
        let placeFlight = null;
        let labelsMoving = false;
        let labelSettleTimer = 0;
        let markerSizeKey = '';
        let clusterIconSize = 32;
        const labelAnchors = new Map();

        function followMovingLabels(view) {
            if (!map || !labelsMoving || (wheelActive && wheelDuration > 0)) return;
            const zoom = view?.zoom ?? map.getZoom();
            // Leaflet 1.9.4's native +/- animation supplies its destination view;
            // flyTo and dragging supply ordinary move frames instead.
            const origin = view?.center ? map._getNewPixelOrigin(view.center, zoom) : map.getPixelOrigin();
            const paneOffset = map.containerPointToLayerPoint([0, 0]).multiplyBy(-1);
            const cityBoxes = [];
            const countryLabels = [];
            const canvasBox = canvas.getBoundingClientRect();
            const pinBoxes = [...canvas.querySelectorAll('.travel-pin, .travel-cluster')].flatMap(pin => {
                const style = getComputedStyle(pin);
                if (Number(style.opacity) === 0 || style.visibility === 'hidden') return [];
                const box = (pin.querySelector('svg') || pin).getBoundingClientRect();
                return [{ pin, rectangle: { left: box.left - canvasBox.left, top: box.top - canvasBox.top,
                    right: box.right - canvasBox.left, bottom: box.bottom - canvasBox.top } }];
            });
            // Freeze placement decisions, not screen coordinates. This small pass
            // projects existing anchors without measuring text or searching polygons.
            const anchors = [...labelAnchors].sort(([, a], [, b]) =>
                Number(b.marker?.options.travelEntry === selected) - Number(a.marker?.options.travelEntry === selected));
            for (const [node, anchor] of anchors) {
                const point = map.project(anchor.coordinates, zoom).subtract(origin).add(anchor.offset);
                L.DomUtil.setPosition(node, point);
                const screenPoint = point.add(paneOffset);
                if (!anchor.marker) {
                    const scale = map.getZoomScale(zoom, anchor.zoom);
                    node.style.setProperty('--travel-label-motion-scale', scale);
                    countryLabels.push({ node, rectangle: {
                        left: screenPoint.x - anchor.width * scale / 2, right: screenPoint.x + anchor.width * scale / 2,
                        top: screenPoint.y - anchor.height * scale / 2, bottom: screenPoint.y + anchor.height * scale / 2
                    } });
                    continue;
                }
                const marker = anchor.marker;
                const rectangle = { left: screenPoint.x, top: screenPoint.y,
                    right: screenPoint.x + anchor.width, bottom: screenPoint.y + anchor.height };
                const clustered = !marker.getElement()?.isConnected
                    || (markerLayer.getVisibleParent && markerLayer.getVisibleParent(marker) !== marker);
                node.hidden = !!clustered || cityBoxes.some(other => intersects(rectangle, other, 4))
                    || pinBoxes.some(other => other.pin !== marker.getElement() && intersects(rectangle, other.rectangle, 1));
                if (!node.hidden) cityBoxes.push(rectangle);
            }
            const placed = [...cityBoxes, ...pinBoxes.map(other => other.rectangle)];
            for (const { node, rectangle } of countryLabels) {
                node.hidden = placed.some(other => intersects(rectangle, other, 4));
                if (!node.hidden) placed.push(rectangle);
            }
        }

        function pauseMovingLabels() {
            labelsMoving = true;
            canvas.classList.add('is-map-moving');
            if (labelFrame) cancelAnimationFrame(labelFrame);
            labelFrame = 0;
            clearTimeout(labelSettleTimer);
        }

        function settleMapLabels() {
            clearTimeout(labelSettleTimer);
            // Sidebar resizing can emit moveend during a flight. Wait for a short
            // quiet interval instead of rebuilding labels at those intermediate views.
            labelSettleTimer = setTimeout(() => {
                if (wheelActive || placeFlight || performance.now() < wheelQuietUntil) {
                    settleMapLabels();
                    return;
                }
                updateMapResolution();
                updateProvinceBorders();
                labelsMoving = false;
                if (labelFrame) cancelAnimationFrame(labelFrame);
                layoutMapLabels();
                canvas.classList.remove('is-map-moving');
            }, Math.max(labelMotionSettleMs, wheelQuietUntil - performance.now()));
        }

        function stopPlaceFlight() {
            if (!placeFlight) return;
            placeFlight = null;
            map.off('moveend', completePlaceFlight);
            map.stop();
        }

        function completePlaceFlight() {
            placeFlight = null;
            map.off('moveend', completePlaceFlight);
        }

        function resumePlaceFlight() {
            if (!placeFlight) return;
            const remaining = placeFlight.until - performance.now();
            if (remaining <= 0) {
                const { coordinates, zoom } = placeFlight;
                completePlaceFlight();
                map.setView(coordinates, zoom, { animate: false });
                return;
            }
            map.flyTo(placeFlight.coordinates, placeFlight.zoom, { duration: remaining / 1000, animate: true });
        }

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

        function updatePhotoLayout() {
            photoLayoutFrame = 0;
            if (!atlas) return;
            const padding = getComputedStyle(story);
            const horizontalPadding = parseFloat(padding.paddingLeft) + parseFloat(padding.paddingRight);
            if (matchMedia('(max-width: 900px)').matches) {
                atlas.style.removeProperty('--travel-story-width');
                const width = Math.max(1, story.clientWidth - horizontalPadding);
                const limit = Math.max(mobilePhotoHeight, Math.min(mobilePortraitMaxHeight, innerHeight * 0.75));
                const height = currentPhotoRatio && currentPhotoRatio < 1
                    ? Math.max(mobilePhotoHeight, Math.min(width / currentPhotoRatio, limit)) : mobilePhotoHeight;
                const value = `${Math.round(height)}px`;
                if (atlas.style.getPropertyValue('--travel-mobile-stage-height') !== value) {
                    atlas.style.setProperty('--travel-mobile-stage-height', value);
                }
                return;
            }
            atlas.style.removeProperty('--travel-mobile-stage-height');
            if (!adaptivePhotoLayout || !currentPhotoRatio) {
                atlas.style.removeProperty('--travel-story-width');
                return;
            }
            // Derive the sidebar from the image, not from its current column width,
            // so resizing the grid cannot feed back into another width calculation.
            const photoHeight = Math.min(photoTargetHeight, story.querySelector('.travel-photo-button')?.clientHeight || photoTargetHeight);
            const desiredWidth = currentPhotoRatio * photoHeight + horizontalPadding;
            const storyWidth = Math.min(atlas.clientWidth * maxStoryShare, Math.max(minStoryWidth, desiredWidth));
            atlas.style.setProperty('--travel-story-width', `${Math.round(storyWidth)}px`);
            const image = activePhoto || story.querySelector('.travel-photo');
            if (image?.hasAttribute('srcset')) {
                image.sizes = `(max-width: 900px) calc(100vw - 60px), ${Math.ceil(storyWidth - horizontalPadding)}px`;
            }
        }

        function schedulePhotoLayout() {
            if (!photoLayoutFrame) photoLayoutFrame = requestAnimationFrame(updatePhotoLayout);
        }

        if (atlas && adaptivePhotoLayout) {
            new ResizeObserver(schedulePhotoLayout).observe(atlas);
            window.addEventListener('resize', schedulePhotoLayout);
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
            const request = ++photoRequest;
            activePhoto?.getAnimations().forEach(animation => animation.cancel());
            photoIndex = (index + photos.length) % photos.length;
            const photo = photos[photoIndex];
            const frame = story.querySelector('.travel-photo-button');
            const caption = story.querySelector('.travel-photo-caption');
            const error = story.querySelector('.travel-photo-error');
            const loading = story.querySelector('.travel-photo-loading');
            frame.querySelectorAll('.travel-photo').forEach(node => {
                if (node !== activePhoto) node.remove();
            });
            const image = element('img', 'travel-photo is-pending');
            image.decoding = 'async';
            frame.insertBefore(image, error);
            error.hidden = true;
            loading.hidden = false;
            frame.disabled = true;
            frame.setAttribute('aria-busy', 'true');
            SiteI18n.content(image, photo, 'alt', { attribute: 'alt' });
            image.addEventListener('load', async () => {
                try { await image.decode(); } catch { /* Responsive sources can change during decode. */ }
                if (request !== photoRequest || !image.isConnected || !image.naturalWidth) return;
                const previous = activePhoto;
                activePhoto = image;
                image.classList.remove('is-pending');
                image.classList.add('is-current');
                frame.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
                currentPhotoRatio = image.naturalWidth / image.naturalHeight;
                schedulePhotoLayout();
                loading.hidden = true;
                frame.disabled = false;
                frame.setAttribute('aria-busy', 'false');
                const duration = reducedMotion.matches ? 0 : photoFadeDuration;
                if (previous && previous !== image) {
                    previous.classList.remove('is-current');
                    previous.classList.add('is-retiring');
                    if (duration) {
                        previous.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: 'ease-out' });
                    }
                }
                if (duration) {
                    const fade = image.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: 'ease-out' });
                    fade.finished.catch(() => {}).finally(() => {
                        if (previous && previous !== activePhoto) previous.remove();
                    });
                } else if (previous && previous !== image) previous.remove();
            }, { once: true });
            const width = Math.max(220, frame.clientWidth);
            applySiteCardImage(image, photo.src, `(max-width: 900px) calc(100vw - 60px), ${Math.ceil(width)}px`);
            image.addEventListener('error', () => requestAnimationFrame(() => {
                if (request !== photoRequest || !image.isConnected || !image.complete || image.naturalWidth
                    || image.hasAttribute('srcset') || image.src !== photo.src) return;
                frame.querySelectorAll('.travel-photo').forEach(node => node.remove());
                activePhoto = null;
                error.hidden = false;
                loading.hidden = true;
                frame.setAttribute('aria-busy', 'false');
                frame.disabled = true;
                SiteI18n.text(error, 'life.photoSlow');
            }));
            SiteI18n.content(caption, photo, 'caption', { hideEmpty: true });
            story.querySelector('.travel-photo-count').textContent = `${photoIndex + 1} / ${photos.length}`;
            SiteI18n.attr(frame, 'aria-label', 'life.enlarge', { title: SiteI18n.value(photo, 'alt') });
            if (announce) SiteI18n.text(announcement, 'life.photoAnnouncement', { place: SiteI18n.value(selected, 'place'), number: photoIndex + 1, total: photos.length });
        }

        function ensureStoryShell() {
            if (story.querySelector('.travel-figure')) return;
            const heading = element('div', 'travel-story-heading');
            const location = element('div');
            location.append(element('p', 'travel-country-name'), element('h4', ''));
            const airportHeading = element('div', 'travel-airport-heading');
            const plane = element('i', 'fas fa-plane');
            plane.setAttribute('aria-hidden', 'true');
            const airportCopy = element('div');
            airportCopy.append(element('h4', 'travel-airport-city'), element('p', 'travel-airport-name'));
            airportHeading.append(plane, airportCopy);
            airportHeading.hidden = true;
            location.append(airportHeading);
            const time = element('time');
            time.hidden = true;
            heading.append(location, time);
            const figure = element('div', 'travel-figure');
            const media = element('div', 'travel-media');
            const frame = element('button', 'travel-photo-button');
            frame.type = 'button';
            const error = SiteI18n.element('span', 'travel-photo-error', 'life.photoSlow');
            const loading = SiteI18n.element('span', 'travel-photo-loading', 'life.loadingPhoto');
            error.hidden = loading.hidden = true;
            frame.append(error, loading, element('span', 'travel-photo-enlarge', '\u2197'));
            frame.addEventListener('click', showLargePhoto);
            media.append(frame);
            const navigation = element('div', 'travel-photo-navigation');
            const previous = element('button', '', '\u2190');
            const next = element('button', '', '\u2192');
            previous.type = next.type = 'button';
            SiteI18n.attr(previous, 'aria-label', 'life.previous');
            SiteI18n.attr(next, 'aria-label', 'life.next');
            previous.addEventListener('click', () => showPhoto(photoIndex - 1));
            next.addEventListener('click', () => showPhoto(photoIndex + 1));
            navigation.append(previous, element('span', 'travel-photo-count'), next);
            figure.append(media, navigation, element('p', 'travel-photo-caption'));
            const copy = element('div', 'travel-copy');
            copy.append(element('h5', 'travel-story-title'), element('p', 'travel-description'));
            story.replaceChildren(heading, figure, copy);
        }

        function showStory(entry) {
            ensureStoryShell();
            photos = preparePhotos(entry);
            photoIndex = 0;
            SiteI18n.content(story.querySelector('.travel-country-name'), entry, 'country');
            const isAirport = currentMode === 'aviation';
            story.classList.toggle('is-aviation', isAirport);
            const placeHeading = story.querySelector('.travel-story-heading > div > h4');
            SiteI18n.content(placeHeading, entry, 'place');
            placeHeading.hidden = isAirport;
            story.querySelector('.travel-airport-heading').hidden = !isAirport;
            updateAirportHeading();
            SiteI18n.content(story.querySelector('.travel-story-title'), entry, 'title', { hideEmpty: true });
            SiteI18n.content(story.querySelector('.travel-description'), entry, 'description', { hideEmpty: true });
            story.querySelector('.travel-copy').scrollTop = 0;
            const time = story.querySelector('.travel-story-heading time');
            const date = new Date(`${entry.date}T12:00:00Z`);
            time.hidden = !(showDates && /^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') && Number.isFinite(date.getTime()));
            if (!time.hidden) {
                time.textContent = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
                time.dateTime = entry.date;
            }
            story.querySelectorAll('.travel-photo-navigation button').forEach(button => { button.disabled = photos.length < 2; });
            story.querySelector('.travel-photo-navigation').hidden = photos.length < 2;
            story.querySelector('.travel-figure').classList.toggle('is-single-photo', photos.length < 2);
            story.classList.toggle('is-single-photo', photos.length < 2);
            if (photos.length) showPhoto(0, false);
            else {
                photoRequest++;
                currentPhotoRatio = null;
                schedulePhotoLayout();
                story.querySelectorAll('.travel-photo').forEach(node => node.remove());
                activePhoto = null;
                const frame = story.querySelector('.travel-photo-button');
                frame.disabled = true;
                frame.setAttribute('aria-busy', 'false');
                frame.classList.remove('is-portrait');
                const error = story.querySelector('.travel-photo-error');
                SiteI18n.text(error, 'life.photosSoon');
                error.hidden = false;
                story.querySelector('.travel-photo-loading').hidden = true;
                story.querySelector('.travel-photo-count').textContent = '0 / 0';
                SiteI18n.content(story.querySelector('.travel-photo-caption'), { caption: '', captionZh: '' }, 'caption', { hideEmpty: true });
            }
        }

        function labelPin(marker, entry) {
            const pin = marker.getElement();
            if (!pin) return;
            SiteI18n.attr(pin, 'aria-label', 'life.showPhotos', { place: entryName(entry), country: SiteI18n.value(entry, 'country') });
            SiteI18n.content(pin, {
                label: currentMode === 'aviation' ? `${entry.place} ${entry.iata} · ${entry.airport || entry.country}` : `${entry.place}, ${entry.country}`,
                labelZh: currentMode === 'aviation' ? `${entry.placeZh || entry.place} ${entry.iata} · ${entry.airportZh || entry.airport || entry.countryZh || entry.country}`
                    : entry.placeZh || entry.countryZh ? `${entry.placeZh || entry.place}, ${entry.countryZh || entry.country}` : undefined
            }, 'label', { attribute: 'title' });
        }
        function pinTooltip(entry) {
            const node = element('span');
            if (currentMode === 'aviation') {
                node.className = 'travel-airport-label';
                node.append(element('span', 'airport-city', airportCity(entry)));
                const name = airportLabel(entry);
                if (name) node.append(element('span', 'airport-name', name));
            } else node.textContent = SiteI18n.value(entry, 'place');
            return node;
        }
        function updateAirportHeading() {
            if (!selected || currentMode !== 'aviation') return;
            const heading = story.querySelector('.travel-airport-city');
            if (!heading) return;
            heading.textContent = airportCity(selected);
            heading.lang = SiteI18n.language;
            const name = story.querySelector('.travel-airport-name');
            const city = SiteI18n.value(selected, 'place');
            let label = airportLabel(selected);
            // Do not repeat the city immediately after its own IATA code.
            if (label.toLowerCase() === city.toLowerCase()) label = '';
            else if (label.toLowerCase().startsWith(`${city.toLowerCase()} `)) label = label.slice(city.length).trim();
            else if (SiteI18n.language === 'zh-CN' && label.startsWith(city)) label = label.slice(city.length).trim();
            name.textContent = label;
            name.hidden = !label;
            name.lang = SiteI18n.language;
            name.title = SiteI18n.value(selected, 'airport');
        }
        window.addEventListener('site:languagechange', () => {
            forEachPin((marker, entry) => {
                labelPin(marker, entry);
                marker.setTooltipContent(pinTooltip(entry));
            });
            updateAirportHeading();
            updateModeInterface();
            scheduleMapLabels();
            if (!selected) return;
            SiteI18n.text(announcement, 'life.placeAnnouncement', { place: SiteI18n.value(selected, 'place'), country: SiteI18n.value(selected, 'country'), count: photos.length });
            const frame = story.querySelector('.travel-photo-button');
            if (frame && photos[photoIndex]) SiteI18n.attr(frame, 'aria-label', 'life.enlarge', { title: SiteI18n.value(photos[photoIndex], 'alt') });
        });

        // Labels are decorative overlays; the original pins keep all interaction.
        function intersects(a, b, padding = 0) {
            return a.left < b.right + padding && a.right > b.left - padding
                && a.top < b.bottom + padding && a.bottom > b.top - padding;
        }

        function pointInRing(x, y, ring) {
            let inside = false;
            for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                const a = ring[i], b = ring[j];
                if ((a[1] > y) !== (b[1] > y)
                    && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
            }
            return inside;
        }

        function countryPolygons(record) {
            return record.feature.geometry.type === 'Polygon'
                ? [record.feature.geometry.coordinates] : record.feature.geometry.coordinates;
        }

        function containsCountryPoint(record, point) {
            const coordinates = map.containerPointToLatLng(point);
            const x = coordinates.lng - record.offset, y = coordinates.lat;
            return countryPolygons(record).some(polygon => pointInRing(x, y, polygon[0])
                && !polygon.slice(1).some(ring => pointInRing(x, y, ring)));
        }

        function countryRectangle(record, rectangle, padding = 0) {
            const nw = map.containerPointToLatLng([rectangle.left - padding, rectangle.top - padding]);
            const se = map.containerPointToLatLng([rectangle.right + padding, rectangle.bottom + padding]);
            const left = nw.lng - record.offset, right = se.lng - record.offset;
            const bottom = se.lat, top = nw.lat;
            return { left, right, bottom, top, corners: [[left, bottom], [left, top], [right, top], [right, bottom]] };
        }

        function segmentIntersectsRectangle(a, b, rectangle) {
            const { left, right, bottom, top } = rectangle;
            if (Math.max(a[0], b[0]) < left || Math.min(a[0], b[0]) > right
                || Math.max(a[1], b[1]) < bottom || Math.min(a[1], b[1]) > top) return false;
            let lower = 0, upper = 1;
            const dx = b[0] - a[0], dy = b[1] - a[1];
            for (const [p, q] of [[-dx, a[0] - left], [dx, right - a[0]], [-dy, a[1] - bottom], [dy, top - a[1]]]) {
                if (p === 0) { if (q < 0) return false; }
                else {
                    const ratio = q / p;
                    if (p < 0) lower = Math.max(lower, ratio);
                    else upper = Math.min(upper, ratio);
                    if (lower > upper) return false;
                }
            }
            return true;
        }

        function containsCountryRectangle(record, rectangle) {
            // Keep the complete label 3px inside a single land polygon.
            const region = countryRectangle(record, rectangle, 3);
            return countryPolygons(record).some(polygon => {
                if (!region.corners.every(([x, y]) => pointInRing(x, y, polygon[0])
                    && !polygon.slice(1).some(ring => pointInRing(x, y, ring)))) return false;
                return polygon.every(ring => !ring.some((point, index) => index > 0
                    && segmentIntersectsRectangle(ring[index - 1], point, region)));
            });
        }

        function intersectsCountryRectangle(record, rectangle) {
            const region = countryRectangle(record, rectangle, 1);
            return countryPolygons(record).some(polygon =>
                region.corners.some(([x, y]) => pointInRing(x, y, polygon[0])
                    && !polygon.slice(1).some(ring => pointInRing(x, y, ring)))
                || polygon.some(ring => ring.some((point, index) => index > 0
                    && segmentIntersectsRectangle(ring[index - 1], point, region))));
        }

        function cityInkForSurfaces(colors, ocean) {
            let darkContrast = Infinity, lightContrast = Infinity;
            for (const color of new Set(colors)) {
                const key = `${ocean}|${color}`;
                if (!cityInkCache.has(key)) {
                    labelMeasure.clearRect(0, 0, 1, 1);
                    labelMeasure.fillStyle = ocean;
                    labelMeasure.fillRect(0, 0, 1, 1);
                    labelMeasure.fillStyle = color;
                    labelMeasure.fillRect(0, 0, 1, 1);
                    const pixel = labelMeasure.getImageData(0, 0, 1, 1).data;
                    const luminance = rgb => [...rgb].slice(0, 3).reduce((sum, value, index) => {
                        const c = value / 255;
                        return sum + [0.2126, 0.7152, 0.0722][index] * (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
                    }, 0);
                    const background = luminance(pixel);
                    cityInkCache.set(key, {
                        dark: (background + 0.05) / (luminance([11, 18, 32]) + 0.05),
                        light: (luminance([248, 250, 252]) + 0.05) / (background + 0.05)
                    });
                }
                const scores = cityInkCache.get(key);
                darkContrast = Math.min(darkContrast, scores.dark);
                lightContrast = Math.min(lightContrast, scores.light);
            }
            return { color: darkContrast >= lightContrast ? '#0b1220' : '#f8fafc',
                contrast: Math.max(darkContrast, lightContrast) };
        }

        function labelNode(cache, key, pane, className) {
            if (!cache.has(key)) {
                const node = element('div', `${className} leaflet-zoom-hide`);
                node.setAttribute('aria-hidden', 'true');
                node.append(element('span'));
                pane.append(node);
                cache.set(key, node);
            }
            return cache.get(key);
        }

        function layoutMapLabels() {
            labelFrame = 0;
            if (!map || wheelActive || labelsMoving) return;
            labelAnchors.clear();
            countryLabelNodes.forEach(node => { node.hidden = true; });
            cityLabelNodes.forEach(node => { node.hidden = true; });
            const size = map.getSize();
            const zoom = map.getZoom();
            const family = getComputedStyle(canvas).fontFamily;
            const countryFamily = SiteI18n.language === 'en' ? `"Inter Display", ${family}` : family;
            const visibleCountries = countryRenderRecords.filter(record => record.layer.getBounds().intersects(map.getBounds()));
            const surfaceStyle = getComputedStyle(atlas);
            const surfaceColors = Object.fromEntries(['ocean', 'land', 'visited', 'selected']
                .map(key => [key, surfaceStyle.getPropertyValue(`--travel-${key}`).trim()]));
            const countryWeight = fontSize => fontSize < 28 ? 400 : 300;
            const textWidth = (text, fontSize, weight, spacing = 0, fontFamily = family) => {
                labelMeasure.font = `${weight} ${fontSize}px ${fontFamily}`;
                return labelMeasure.measureText(text).width + [...text].length * spacing;
            };
            const screen = { left: 8, top: 8, right: size.x - 8, bottom: size.y - 8 };
            const canvasRect = canvas.getBoundingClientRect();
            const visible = node => {
                const style = getComputedStyle(node);
                return node.isConnected && !node.hidden && style.display !== 'none'
                    && style.visibility !== 'hidden' && Number(style.opacity) > 0;
            };
            const rectangleOf = node => {
                const r = node.getBoundingClientRect();
                return { left: r.left - canvasRect.left, top: r.top - canvasRect.top,
                    right: r.right - canvasRect.left, bottom: r.bottom - canvasRect.top };
            };
            const pinBoxes = [...canvas.querySelectorAll('.travel-pin, .travel-cluster')]
                .filter(visible).map(node => ({ node, rectangle: rectangleOf(node.querySelector('svg') || node) }));
            const obstacles = [
                ...pinBoxes.map(item => item.rectangle),
                ...[...canvas.querySelectorAll('.leaflet-control')].filter(visible).map(rectangleOf)
            ];
            // Buttons/legend sit beside the map container rather than inside it.
            canvas.parentElement.querySelectorAll('.travel-world-button, .travel-map-note').forEach(node => {
                if (node.hidden) return;
                const r = node.getBoundingClientRect();
                obstacles.push({ left: r.left - canvasRect.left, top: r.top - canvasRect.top,
                    right: r.right - canvasRect.left, bottom: r.bottom - canvasRect.top });
            });
            const pins = [];
            forEachPin((marker, entry) => {
                if (zoom < cityMinZoom) return;
                const pin = marker.getElement();
                if (!pin || !visible(pin) || (markerLayer.getVisibleParent && markerLayer.getVisibleParent(marker) !== marker)) return;
                const box = pinBoxes.find(item => item.node === pin);
                if (!box) return;
                const point = map.latLngToContainerPoint(marker.getLatLng());
                if (point.x < 0 || point.y < 0 || point.x > size.x || point.y > size.y) return;
                pins.push({ marker, entry, point, pin, pinRectangle: box.rectangle });
            });
            pins.sort((a, b) => Number(b.entry === selected) - Number(a.entry === selected)
                || a.point.distanceTo(size.divideBy(2)) - b.point.distanceTo(size.divideBy(2)));
            for (const { marker, entry, pin, pinRectangle } of pins) {
                const isAirport = currentMode === 'aviation';
                const name = isAirport ? entry.iata : SiteI18n.value(entry, 'place');
                const width = isAirport ? Math.ceil(textWidth(name, 14, 600, 14 * 0.045)) + 2
                    : Math.ceil(textWidth(name, cityFontSize, entry === selected ? 600 : 500));
                const height = isAirport ? 24 : cityLineHeight;
                // Measure the visible icon, including its selected scale. Each
                // candidate stays 5px from it; never send a city name diagonally away.
                const centreX = (pinRectangle.left + pinRectangle.right) / 2;
                const centreY = pinRectangle.top + (pinRectangle.bottom - pinRectangle.top) * (isAirport ? 0.5 : 0.4);
                const positions = [
                    { side: 'right', x: pinRectangle.right + 5, y: centreY - height / 2 },
                    { side: 'left', x: pinRectangle.left - 5 - width, y: centreY - height / 2 },
                    { side: 'above', x: centreX - width / 2, y: pinRectangle.top - 5 - height },
                    { side: 'below', x: centreX - width / 2, y: pinRectangle.bottom + 5 }
                ];
                const previousSide = cityLabelNodes.get(marker)?.dataset.side;
                positions.sort((a, b) => Number(b.side === previousSide) - Number(a.side === previousSide));
                const distance = (a, b) => Math.hypot(Math.max(b.left - a.right, a.left - b.right, 0),
                    Math.max(b.top - a.bottom, a.top - b.bottom, 0));
                for (const { x, y, side } of positions) {
                    const rectangle = { left: x, top: y, right: x + width, bottom: y + height };
                    if (rectangle.left < screen.left || rectangle.right > screen.right
                        || rectangle.top < screen.top || rectangle.bottom > screen.bottom
                        || obstacles.some(other => intersects(rectangle, other, 4))) continue;
                    // A nearby cluster or another pin must not look like the label's owner.
                    const ownDistance = distance(rectangle, pinRectangle);
                    if (pinBoxes.some(other => other.node !== pin && distance(rectangle, other.rectangle) < ownDistance + 2)) continue;
                    const nw = map.containerPointToLatLng([rectangle.left - 1, rectangle.top - 1]);
                    const se = map.containerPointToLatLng([rectangle.right + 1, rectangle.bottom + 1]);
                    const nearby = visibleCountries.filter(record => record.layer.getBounds().intersects(L.latLngBounds(nw, se)));
                    const backgroundFor = record => {
                        const key = countryKey(record.feature.properties.name);
                        return selected && key === countryKey(selected.country) ? surfaceColors.selected
                            : visited.has(key) ? surfaceColors.visited : surfaceColors.land;
                    };
                    const containing = nearby.find(record => containsCountryRectangle(record, rectangle));
                    // If no single land polygon contains the complete word, include
                    // every intersecting land surface and the ocean conservatively.
                    const backgrounds = containing ? [backgroundFor(containing)] : [surfaceColors.ocean,
                        ...nearby.filter(record => intersectsCountryRectangle(record, rectangle)).map(backgroundFor)];
                    const ink = cityInkForSurfaces(backgrounds, surfaceColors.ocean);
                    if (ink.contrast < 4) continue;
                    const node = labelNode(cityLabelNodes, marker, cityLabelPane, 'travel-city-label');
                    node.classList.toggle('is-airport', isAirport);
                    const copy = node.firstElementChild;
                    if (isAirport) {
                        copy.className = 'travel-airport-code';
                        copy.textContent = name;
                        node.style.width = `${width}px`;
                    } else {
                        copy.className = '';
                        copy.textContent = name;
                        node.style.removeProperty('width');
                    }
                    node.lang = SiteI18n.language;
                    node.dataset.placeId = entry.id;
                    node.dataset.side = side;
                    node.classList.toggle('is-selected', entry === selected);
                    node.style.color = ink.color;
                    L.DomUtil.setPosition(node, map.containerPointToLayerPoint(L.point(x, y)));
                    labelAnchors.set(node, { coordinates: marker.getLatLng(),
                        offset: L.point(x, y).subtract(map.latLngToContainerPoint(marker.getLatLng())),
                        width, height, zoom, marker });
                    node.hidden = false;
                    if (marker.isTooltipOpen()) marker.closeTooltip();
                    obstacles.push(rectangle);
                    break;
                }
            }
            if (zoom >= countryMinZoom && countryOpacity > 0) {
                const bounds = map.getBounds();
                const candidates = countryLabelRecords.filter(record => record.layer.getBounds().intersects(bounds))
                    .map(record => {
                        const b = record.layer.getBounds();
                        const nw = map.latLngToContainerPoint(b.getNorthWest());
                        const se = map.latLngToContainerPoint(b.getSouthEast());
                        const box = { left: Math.max(screen.left, nw.x), top: Math.max(screen.top, nw.y),
                            right: Math.min(screen.right, se.x), bottom: Math.min(screen.bottom, se.y) };
                        return { record, box, area: (box.right - box.left) * (box.bottom - box.top),
                            selected: selected && countryKey(record.feature.properties.name) === countryKey(selected.country) };
                    }).sort((a, b) => Number(b.selected) - Number(a.selected) || b.area - a.area);
                const placed = obstacles.slice();
                for (const { record, box } of candidates) {
                    const width = box.right - box.left, height = box.bottom - box.top;
                    if (width < 86 || height < 46) continue;
                    const metadata = countryLabelData[record.feature.properties.name];
                    const source = metadata || { name: record.feature.properties.name,
                        nameZh: entries.find(entry => countryKey(entry.country) === countryKey(record.feature.properties.name))?.countryZh };
                    const name = SiteI18n.value(source, 'name');
                    const shown = name;
                    const spacing = SiteI18n.language === 'zh-CN' ? 0.12 : 0.015;
                    let fontSize = Math.min(countryMaxFontSize, size.x < 600 ? 42 : countryMaxFontSize, Math.max(22, height * 0.22));
                    const naturalWidth = textWidth(shown, fontSize, countryWeight(fontSize), fontSize * spacing, countryFamily);
                    fontSize = Math.min(fontSize, fontSize * Math.min(width * 0.88, 480) / naturalWidth);
                    if (fontSize < 18) continue;
                    const initialFontSize = fontSize;
                    let placedLabel = false;
                    const fontSizes = [];
                    for (let value = initialFontSize; value > 18; value *= 0.84) fontSizes.push(value);
                    fontSizes.push(18);
                    for (fontSize of fontSizes) {
                        const labelWidth = textWidth(shown, fontSize, countryWeight(fontSize), fontSize * spacing, countryFamily);
                        const labelHeight = fontSize * 1.3;
                        const points = [];
                        if (metadata?.coordinates) {
                            const anchor = displayCoordinates(metadata.coordinates);
                            anchor[1] += record.offset;
                            points.push(map.latLngToContainerPoint(anchor));
                        }
                        for (const [x, y] of [[0.5, 0.2], [0.65, 0.2], [0.35, 0.2], [0.5, 0.34], [0.5, 0.5], [0.3, 0.34], [0.7, 0.34], [0.3, 0.6], [0.7, 0.6], [0.5, 0.72]]) {
                            points.push(L.point(box.left + width * x, box.top + height * y));
                        }
                        for (const point of points) {
                            if (point.x < screen.left + labelWidth / 2 || point.x > screen.right - labelWidth / 2
                                || point.y < screen.top + labelHeight / 2 || point.y > screen.bottom - labelHeight / 2
                                || !containsCountryPoint(record, point)) continue;
                            const rectangle = { left: point.x - labelWidth / 2, top: point.y - labelHeight / 2,
                                right: point.x + labelWidth / 2, bottom: point.y + labelHeight / 2 };
                            if (placed.some(other => intersects(rectangle, other, 12))
                                || !containsCountryRectangle(record, rectangle)) continue;
                            const node = labelNode(countryLabelNodes, record.key, countryLabelPane, 'travel-country-label');
                            node.firstElementChild.textContent = name;
                            node.lang = SiteI18n.language;
                            node.classList.toggle('is-visited', visited.has(countryKey(record.feature.properties.name)));
                            node.style.fontSize = `${fontSize}px`;
                            node.style.fontWeight = countryWeight(fontSize);
                            node.style.opacity = countryOpacity;
                            node.style.removeProperty('--travel-label-motion-scale');
                            L.DomUtil.setPosition(node, map.containerPointToLayerPoint(point));
                            labelAnchors.set(node, { coordinates: map.containerPointToLatLng(point),
                                offset: L.point(0, 0), width: labelWidth, height: labelHeight, zoom });
                            node.hidden = false;
                            placed.push(rectangle);
                            placedLabel = true;
                            break;
                        }
                        if (placedLabel) break;
                    }
                }
            }
        }

        function scheduleMapLabels() {
            if (!map || labelFrame || labelsMoving) return;
            labelFrame = requestAnimationFrame(layoutMapLabels);
        }


        function updateMarkerSizes() {
            const compact = markerResponsive && canvas.clientWidth < markerCompactBelow;
            const width = compact ? markerOption('compactPinWidth', 20, 16, 48) : markerOption('pinWidth', 24, 16, 48);
            const isAirport = currentMode === 'aviation';
            const height = isAirport ? width : width * 36 / 28;
            const clusterSize = compact ? markerOption('compactClusterSize', 28, 24, 56) : markerOption('clusterSize', 32, 24, 56);
            const key = `${currentMode}:${width}:${clusterSize}`;
            if (key === markerSizeKey) return;
            markerSizeKey = key;
            clusterIconSize = clusterSize;
            canvas.style.setProperty('--travel-pin-width', `${width}px`);
            canvas.style.setProperty('--travel-pin-height', `${height}px`);
            canvas.style.setProperty('--travel-cluster-font-size', `${Math.max(11, Math.min(14, clusterSize * 0.4))}px`);
            pinIcon = L.divIcon({
                className: `travel-pin${isAirport ? ' is-airport' : ''}`, iconSize: [width, height],
                iconAnchor: [width / 2, isAirport ? height / 2 : height * 35 / 36], tooltipAnchor: [0, -height * 30 / 36],
                html: isAirport ? '<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="13"/><path d="M13 5h2l1 7 7 4v2l-7-2v5l2 1v1l-4-1-4 1v-1l2-1v-5l-7 2v-2l7-4Z"/></svg>'
                    : '<svg viewBox="0 0 28 36" aria-hidden="true"><path d="M14 34S2 23 2 14a12 12 0 1 1 24 0c0 9-12 20-12 20Z"/><circle cx="14" cy="14" r="4"/></svg>'
            });
            forEachPin((marker, entry) => {
                marker.setIcon(pinIcon);
                labelPin(marker, entry);
                const pin = marker.getElement();
                pin?.classList.toggle('is-selected', selected === entry);
                pin?.setAttribute('aria-pressed', String(selected === entry));
            });
            markerLayer?.refreshClusters?.();
            scheduleMapLabels();
        }

        function forEachPin(callback) {
            markers.forEach((copies, entry) => copies.forEach(marker => callback(marker, entry)));
        }

        function addCountryWorld(offset) {
            if (!countryFeatures) return;
            L.geoJSON(countryFeatures, {
                filter: feature => {
                    if (feature.properties.name === 'Antarctica') return false;
                    if (!detailRenderBounds) return true;
                    const [west, south, east, north] = feature.bbox;
                    return east + offset >= detailRenderBounds.getWest() && west + offset <= detailRenderBounds.getEast()
                        && north >= detailRenderBounds.getSouth() && south <= detailRenderBounds.getNorth();
                },
                coordsToLatLng: coordinates => L.latLng(coordinates[1], coordinates[0] + offset),
                style: feature => ({
                    className: `travel-country${visited.has(countryKey(feature.properties.name)) ? ' is-visited' : ''}`,
                    weight: 0.7, fillOpacity: 1
                }),
                onEachFeature(feature, layer) {
                    const record = { feature, layer, offset, key: `${offset}:${feature.properties.name}` };
                    countryRenderRecords.push(record);
                    // Keep this region in the shared China highlight without a separate map name.
                    const showName = String(feature.id) !== '158' && feature.properties.name !== 'Taiwan';
                    if (showName) {
                        countryLabelRecords.push(record);
                    }
                    const label = !showName ? 'China' : ['344', '446'].includes(String(feature.id))
                        ? `${feature.properties.name}, China` : feature.properties.name;
                    const regionZh = { '158': '中国', '344': '中国香港', '446': '中国澳门' };
                    const nameZh = !showName ? '中国' : regionZh[String(feature.id)]
                        || countryLabelData[feature.properties.name]?.nameZh
                        || entries.find(entry => countryKey(entry.country) === countryKey(feature.properties.name))?.countryZh;
                    // Reuse detached tooltip bindings across resolution changes and pans.
                    if (!countryTooltipNodes.has(record.key)) {
                        countryTooltipNodes.set(record.key, SiteI18n.content(element('span', ''), { name: label, nameZh }, 'name', { keepDetached: true }));
                    }
                    layer.bindTooltip(countryTooltipNodes.get(record.key), { sticky: true });
                    layer.on('click', event => {
                        const entry = entries.find(candidate => countryKey(candidate.country) === countryKey(feature.properties.name));
                        if (entry) selectPlace(entry, true, event.latlng?.lng);
                    });
                }
            }).addTo(countries);
        }

        function renderCountryDataset(features, resolution) {
            if (!indexedCountryDatasets.has(features)) {
                features.features.forEach(feature => {
                    if (Array.isArray(feature.bbox)) return;
                    const box = [Infinity, Infinity, -Infinity, -Infinity];
                    const visit = coordinates => {
                        if (typeof coordinates[0] === 'number') {
                            box[0] = Math.min(box[0], coordinates[0]);
                            box[1] = Math.min(box[1], coordinates[1]);
                            box[2] = Math.max(box[2], coordinates[0]);
                            box[3] = Math.max(box[3], coordinates[1]);
                        } else coordinates.forEach(visit);
                    };
                    visit(feature.geometry.coordinates);
                    feature.bbox = box;
                });
                indexedCountryDatasets.add(features);
            }
            countryFeatures = features;
            currentResolution = resolution;
            countryLabelData = resolution === '10m' ? features.labels : baseCountryLabels;
            // Cull BOTH resolutions and repeated worlds. The complete data stays
            // cached; offscreen shapes should not be projected at every wheel tick.
            detailRenderBounds = map.getBounds().pad(0.8);
            if (!labelsMoving) countryLabelNodes.forEach(node => { node.hidden = true; });
            countries.clearLayers();
            countryLabelRecords.length = 0;
            countryRenderRecords.length = 0;
            worldOffsets.forEach(addCountryWorld);
            canvas.dataset.resolution = resolution;
            updateCountries();
        }

        function updateMapResolution() {
            if (!map || !baseCountryFeatures || wheelActive) return;
            const viewport = map.getBounds();
            const outsideBuffer = !detailRenderBounds?.contains(viewport.pad(0.1));
            if (performance.now() < wheelQuietUntil) {
                // A large zoom-out still needs fresh land beyond the old buffer;
                // use the inexpensive atlas rather than exposing an empty edge.
                if (outsideBuffer) renderCountryDataset(baseCountryFeatures, '50m');
                return;
            }
            const oversizedBuffer = detailRenderBounds
                && detailRenderBounds.getEast() - detailRenderBounds.getWest()
                    > (viewport.getEast() - viewport.getWest()) * 6;
            const threshold = currentResolution === '10m' ? detailMinZoom - 0.5 : detailMinZoom;
            const wantsDetail = detailEnabled && (currentResolution === '10m' ? map.getZoom() > threshold : map.getZoom() >= threshold);
            if (!wantsDetail) {
                if (currentResolution !== '50m' || outsideBuffer || oversizedBuffer) renderCountryDataset(baseCountryFeatures, '50m');
                return;
            }
            if (detailedCountryFeatures) {
                if (currentResolution !== '10m' || outsideBuffer || oversizedBuffer) {
                    renderCountryDataset(detailedCountryFeatures, '10m');
                }
                return;
            }
            if (detailRequest || Date.now() < detailRetryAfter) return;
            canvas.dataset.detailState = 'loading';
            detailRequest = (async () => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 20000);
                try {
                    const suffix = horizontalWrap ? '-wrapped' : pacificLayout ? '-pacific' : '';
                    const response = await fetch(new URL(`assets/maps/countries-10m${suffix}.geo.json`, root), { signal: controller.signal });
                    if (!response.ok) throw new Error(`Detailed map data: ${response.status}`);
                    const features = await response.json();
                    if (!Array.isArray(features.features) || !features.labels
                        || features.features.some(feature => !Array.isArray(feature.bbox) || feature.bbox.length !== 4)) {
                        throw new Error('Invalid detailed map data');
                    }
                    // Keep the editable country-name file authoritative for text;
                    // only the inland anchors need to follow the finer coastline.
                    Object.entries(features.labels).forEach(([name, metadata]) => {
                        features.labels[name] = { ...metadata, ...baseCountryLabels[name], coordinates: metadata.coordinates };
                    });
                    detailedCountryFeatures = features;
                    canvas.dataset.detailState = 'ready';
                    // The user may already have zoomed out while the request ran.
                    updateMapResolution();
                } catch (error) {
                    canvas.dataset.detailState = 'error';
                    detailRetryAfter = Date.now() + 30000;
                    console.warn('Detailed travel map could not load; retaining 50m:', error.message);
                } finally {
                    clearTimeout(timeout);
                    detailRequest = null;
                }
            })();
        }

        function scheduleMapResolution() {
            if (!detailViewFrame) detailViewFrame = requestAnimationFrame(() => {
                detailViewFrame = 0;
                updateMapResolution();
            });
        }

        function addProvinceWorld(offset) {
            if (!provinceFeatures || provinceWorldOffsets.has(offset)) return;
            L.geoJSON(provinceFeatures, {
                pane: 'travelProvinceBorders', renderer: provinceRenderer, interactive: false,
                coordsToLatLng: coordinates => L.latLng(coordinates[1], coordinates[0] + offset),
                style: { className: 'travel-province-border', weight: 0.9, opacity: 0.7, dashArray: '3 3', fill: false }
            }).addTo(provinceBorders);
            provinceWorldOffsets.add(offset);
        }

        function updateProvinceBorders() {
            if (!map || !provinceBorders || !provinceBordersEnabled || wheelActive || performance.now() < wheelQuietUntil) return;
            if (map.getZoom() < provinceMinZoom) {
                if (map.hasLayer(provinceBorders)) map.removeLayer(provinceBorders);
                return;
            }
            if (!map.hasLayer(provinceBorders)) provinceBorders.addTo(map);
            if (provinceFeatures) worldOffsets.forEach(addProvinceWorld);
            if (provinceRequest) return;
            // An optional, local overlay: its failure must never hide the atlas or pins.
            provinceRequest = (async () => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 8000);
                try {
                    const response = await fetch(new URL('assets/maps/china-province-borders.geo.json', root), { signal: controller.signal });
                    if (!response.ok) throw new Error(`Province borders: ${response.status}`);
                    provinceFeatures = await response.json();
                    if (!wheelActive) worldOffsets.forEach(addProvinceWorld);
                } catch (error) {
                    console.warn('Travel province borders could not load:', error.message);
                } finally { clearTimeout(timeout); }
            })();
        }

        function addPinsForWorld(offset) {
            entries.forEach(entry => {
                    const coordinates = displayCoordinates(entry.coordinates);
                    coordinates[1] += offset;
                    const marker = L.marker(coordinates, { icon: pinIcon, title: `${entry.place}, ${entry.country}`, keyboard: true, autoPanOnFocus: true, travelEntry: entry });
                    marker.bindTooltip(pinTooltip(entry), { direction: 'top' });
                    marker.on('add remove move', scheduleMapLabels);
                    marker.on('tooltipopen', () => {
                        const cityLabel = cityLabelNodes.get(marker);
                        if (cityLabel && !cityLabel.hidden) marker.closeTooltip();
                    });
                    marker.on('click', () => selectPlace(entry, true, marker.getLatLng().lng));
                    marker.on('add', () => {
                        const pin = marker.getElement();
                        labelPin(marker, entry);
                        pin.setAttribute('aria-pressed', String(selected === entry));
                        pin.classList.toggle('is-selected', selected === entry);
                        pin.onkeydown = event => {
                            if (event.key !== ' ') return;
                            event.preventDefault();
                            selectPlace(entry, true, marker.getLatLng().lng);
                        };
                    });
                    if (!markers.has(entry)) markers.set(entry, new Set());
                    markers.get(entry).add(marker);
                    markerLayer.addLayer(marker);
            });
        }

        function ensureWorldCopies() {
            // Reuse a bounded pool of copies; resizing never duplicates an existing world.
            const radius = horizontalWrap ? Math.max(2, Math.ceil(map.getSize().x / 512)) : 0;
            for (let world = -radius; world <= radius; world += 1) {
                const offset = world * 360;
                if (worldOffsets.has(offset)) continue;
                worldOffsets.add(offset);
                addPinsForWorld(offset);
                addCountryWorld(offset);
                addProvinceWorld(offset);
            }
            updateCountries();
        }

        function updateCountries() {
            countries?.eachLayer(group => group.eachLayer(layer => {
                const key = countryKey(layer.feature.properties.name);
                const isSelected = !!selected && key === countryKey(selected.country);
                layer.getElement()?.classList.toggle('is-visited', visited.has(key));
                layer.getElement()?.classList.toggle('is-selected', isSelected);
                if (isSelected) layer.bringToFront();
            }));
            scheduleMapLabels();
        }

        function selectPlace(entry, pan = true, anchorLongitude = map?.getCenter().lng) {
            if (!entry) return;
            finishWheelZoom();
            stopPlaceFlight();
            selected = entry;
            selectionByMode.set(currentMode, entry.id);
            forEachPin((marker, candidate) => {
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
                const coordinates = displayCoordinates(entry.coordinates);
                if (horizontalWrap && Number.isFinite(anchorLongitude)) {
                    coordinates[1] += 360 * Math.round((anchorLongitude - coordinates[1]) / 360);
                }
                if (keepSelectedVisible) {
                    focusAfterLayout = coordinates;
                    keepPlaceInView();
                    return;
                }
                const zoom = Math.max(map.getZoom(), 3.5);
                if (placeDuration > 0 && !(placeRespectsReducedMotion && reducedMotion.matches)) {
                    placeFlight = { coordinates, zoom, until: performance.now() + placeDuration };
                    map.on('moveend', completePlaceFlight);
                    resumePlaceFlight();
                } else map.setView(coordinates, zoom, { animate: false });
            }
        }

        function keepPlaceInView() {
            if (!map || !focusAfterLayout) return;
            const coordinates = focusAfterLayout;
            const size = map.getSize();
            const point = map.latLngToContainerPoint(coordinates);
            const padding = Math.min(64, size.x * 0.15, size.y * 0.15);
            if (point.x >= padding && point.x <= size.x - padding
                && point.y >= padding && point.y <= size.y - padding) return;
            const animate = placeDuration > 0 && !(placeRespectsReducedMotion && reducedMotion.matches);
            map.panInside(coordinates, { padding: [padding, padding], animate, duration: placeDuration / 1000 });
        }

        const summary = document.getElementById('travel-summary');
        function updateModeInterface() {
            atlas.dataset.mode = currentMode;
            if (modeSwitch) {
                modeSwitch.hidden = !aviationEnabled;
                modeSwitch.querySelectorAll('button').forEach(button => {
                    button.setAttribute('aria-pressed', String(button.dataset.mapMode === currentMode));
                });
            }
            SiteI18n.attr(canvas, 'aria-label', currentMode === 'aviation' ? 'life.aviationMap' : 'life.map');
            SiteI18n.attr(story, 'aria-label', currentMode === 'aviation' ? 'life.airportSelected' : 'life.selected');
            const legend = document.querySelector('.travel-map-legend [data-i18n]');
            if (legend) SiteI18n.text(legend, currentMode === 'aviation' ? 'life.airportLegend' : 'life.legend');
            if (summary) {
                SiteI18n.text(summary, currentMode === 'aviation' ? 'life.airportSummary' : 'life.summary', { places: entries.length, countries: visited.size });
                summary.hidden = !(typeof configData !== 'undefined' && configData.travelMap?.showSummary === true);
            }
        }
        function switchMode(mode) {
            if (mode === currentMode || !datasets[mode] || (mode === 'aviation' && !aviationEnabled)) return;
            finishWheelZoom();
            stopPlaceFlight();
            focusAfterLayout = null;
            clearTimeout(layoutFinishTimer);
            const previous = selected;
            const saved = selectionByMode.get(mode);
            currentMode = mode;
            entries = datasets[mode];
            selected = null;
            visited.clear();
            entries.forEach(entry => visited.add(countryKey(entry.country)));
            // Reuse geographic layers and the map. Only its pin dataset changes.
            markerLayer?._processQueue?.();
            markerLayer?._noanimationUnspiderfy?.();
            expandedCluster = null;
            markerLayer?.clearLayers();
            markers.clear();
            cityLabelNodes.forEach(node => node.remove());
            cityLabelNodes.clear();
            labelAnchors.clear();
            if (map) {
                worldView = false;
                updateMarkerSizes();
                worldOffsets.forEach(addPinsForWorld);
            }
            updateModeInterface();
            const next = entries.find(entry => entry.id === saved)
                || entries.find(entry => entry.place === previous?.place)
                || entries[0];
            if (next) selectPlace(next, false);
            else {
                photoRequest++;
                photos = [];
                selected = activePhoto = null;
                story.replaceChildren(SiteI18n.element('p', 'travel-no-places', 'life.soon'));
                updateCountries();
            }
            try { localStorage.setItem('siteLifeMapMode', currentMode); } catch { /* Optional preference. */ }
        }
        modeSwitch?.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => switchMode(button.dataset.mapMode));
        });
        updateModeInterface();
        if (entries.length) selectPlace(entries[0], false);

        function fitWorld() {
            if (!map) return;
            focusAfterLayout = null;
            finishWheelZoom();
            stopPlaceFlight();
            worldView = true;
            map.fitBounds(worldBounds, { padding: [14, 14], animate: false });
        }

        function createMap() {
            if (!window.L) throw new Error('Map library unavailable');
            map = L.map(canvas, {
                minZoom: 0, maxZoom: 7, zoomSnap: 0, zoomDelta: 0.5,
                renderer: L.svg({ padding: 0.5 }),
                scrollWheelZoom: false, zoomAnimation: !reducedMotion.matches,
                fadeAnimation: !reducedMotion.matches, markerZoomAnimation: !reducedMotion.matches,
                worldCopyJump: horizontalWrap,
                attributionControl: true, maxBounds: horizontalWrap ? null : (pacificLayout ? [[-85, -70], [85, 370]] : [[-85, -220], [85, 220]]), maxBoundsViscosity: 0.7
            });
            countryLabelPane = map.createPane('travelCountryLabels');
            countryLabelPane.style.zIndex = '410';
            countryLabelPane.style.pointerEvents = 'none';
            cityLabelPane = map.createPane('travelCityLabels');
            cityLabelPane.style.zIndex = '610';
            cityLabelPane.style.pointerEvents = 'none';
            const provincePane = map.createPane('travelProvinceBorders');
            provincePane.style.zIndex = '405';
            provincePane.style.pointerEvents = 'none';
            provinceRenderer = L.svg({ pane: 'travelProvinceBorders', padding: 0.5 });
            provinceBorders = L.featureGroup();
            map.on('zoomend', updateProvinceBorders);
            map.on('move zoomend resize', scheduleMapResolution);
            map.on('movestart zoomstart', pauseMovingLabels);
            map.on('zoomanim', followMovingLabels);
            map.on('move resize', () => {
                pauseMovingLabels();
                followMovingLabels();
                settleMapLabels();
            });
            map.on('moveend zoomend', settleMapLabels);
            new MutationObserver(scheduleMapLabels).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
            document.fonts?.ready.then(scheduleMapLabels);
            document.fonts?.addEventListener('loadingdone', scheduleMapLabels);
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
            // Leaflet is pinned to 1.9.4. Its movement hooks (also used by flyTo)
            // transform the SVG each frame and reproject paths once at the end,
            // instead of doing a full setView/reset for every fraction of a level.
            let wheelTarget = null;
            let wheelPoint;
            let wheelAnchor;
            let wheelFrom = 0;
            let wheelStarted = 0;
            let wheelLastFrame = 0;
            let wheelSegmentZoom = 0;
            let wheelFrame = 0;
            let wheelCommitTimer = 0;
            let queuedWheelStep = 0;
            let queuedWheelPoint = null;
            let waitingForZoom = false;
            const clampZoom = value => Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), value));
            finishWheelZoom = () => {
                clearTimeout(wheelCommitTimer);
                if (wheelFrame) cancelAnimationFrame(wheelFrame);
                wheelFrame = 0;
                wheelTarget = null;
                queuedWheelStep = 0;
                queuedWheelPoint = null;
                if (!wheelActive) return;
                wheelActive = false;
                map._moveEnd(true);
                updateProvinceBorders();
                updateMapResolution();
                if (labelFrame) cancelAnimationFrame(labelFrame);
                layoutMapLabels();
                canvas.classList.remove('is-wheel-zooming');
            };
            const animateWheel = now => {
                wheelFrame = 0;
                if (!wheelActive || wheelTarget === null) return;
                const progress = Math.min(1, (now - wheelStarted) / wheelDuration);
                const desired = wheelFrom + (wheelTarget - wheelFrom) * (1 - (1 - progress) ** 3);
                const maxChange = Math.min(40, Math.max(1, now - wheelLastFrame)) * 0.004;
                const current = map.getZoom();
                const next = clampZoom(Math.max(current - maxChange, Math.min(current + maxChange, desired)));
                wheelLastFrame = now;
                const centre = map.unproject(map.project(wheelAnchor, next).subtract(wheelPoint.subtract(map.getSize().divideBy(2))), next);
                map._move(map._limitCenter(centre, next, map.options.maxBounds), next);
                if (Math.abs(next - wheelSegmentZoom) >= 0.4
                    || (currentResolution === '10m' && !detailRenderBounds.contains(map.getBounds()))) {
                    // Keep SVG clipping margins covered during a long gesture;
                    // reproject in segments rather than on every animation frame.
                    map._moveEnd(true);
                    if (currentResolution === '10m' && !detailRenderBounds.contains(map.getBounds().pad(0.1))) {
                        renderCountryDataset(detailedCountryFeatures, '10m');
                    }
                    wheelAnchor = map.containerPointToLatLng(wheelPoint);
                    wheelSegmentZoom = map.getZoom();
                    map._moveStart(true);
                }
                if (progress === 1 && Math.abs(next - wheelTarget) < 0.00001) finishWheelZoom();
                else wheelFrame = requestAnimationFrame(animateWheel);
            };
            const applyWheelStep = (step, point) => {
                worldView = false;
                if (!wheelActive && clampZoom(map.getZoom() + step) === map.getZoom()) return;
                if ((wheelRespectsReducedMotion && reducedMotion.matches) || wheelDuration === 0) {
                    // Apply the exact new scale NOW, without easing or a trailing
                    // camera animation. Reuse SVG transforms between bounded commits
                    // instead of setView's full viewreset/reprojection on every tick.
                    if (!wheelActive) {
                        map._stop();
                        // Finish any previous cluster transition before direct input.
                        // Cluster splitting/merging for this gesture runs once at its
                        // final zoomend, retaining the animation without dragging pins.
                        markerLayer?._processQueue?.();
                        markerLayer?._noanimationUnspiderfy?.();
                        wheelActive = true;
                        wheelSegmentZoom = map.getZoom();
                        map._moveStart(true);
                    }
                    const next = clampZoom(map.getZoom() + step);
                    const anchor = map.containerPointToLatLng(point);
                    const centre = map.unproject(map.project(anchor, next).subtract(point.subtract(map.getSize().divideBy(2))), next);
                    map._move(map._limitCenter(centre, next, map.options.maxBounds), next);
                    const frame = map.options.renderer._container?.getBoundingClientRect();
                    const viewport = canvas.getBoundingClientRect();
                    const exposedEdge = frame && (frame.left > viewport.left + 1 || frame.right < viewport.right - 1
                        || frame.top > viewport.top + 1 || frame.bottom < viewport.bottom - 1);
                    const bounds = map.getBounds();
                    const outsideBuffer = detailRenderBounds && !detailRenderBounds.contains(bounds);
                    const oversizedBuffer = detailRenderBounds && detailRenderBounds.getEast() - detailRenderBounds.getWest()
                        > (bounds.getEast() - bounds.getWest()) * 6;
                    if (Math.abs(next - wheelSegmentZoom) >= 1 || exposedEdge || outsideBuffer || oversizedBuffer) {
                        if (outsideBuffer || oversizedBuffer) {
                            const detailed = currentResolution === '10m' && next >= detailMinZoom && detailedCountryFeatures;
                            // Reset an empty renderer before adding the new viewport.
                            // Otherwise every newly added polygon is projected twice.
                            countries.clearLayers();
                            map.options.renderer._reset();
                            renderCountryDataset(detailed || baseCountryFeatures, detailed ? '10m' : '50m');
                        } else map.options.renderer._reset();
                        // Only refresh SVG geometry here. A global moveEnd would
                        // restart the cluster animation at every intermediate level.
                        if (provinceRenderer?._map && map.hasLayer(provinceBorders)) provinceRenderer._reset();
                        wheelSegmentZoom = next;
                    }
                    clearTimeout(wheelCommitTimer);
                    wheelCommitTimer = setTimeout(finishWheelZoom, wheelQuietMs);
                    return;
                }
                if (!wheelActive) {
                    map._stop();
                    wheelTarget = map.getZoom();
                    wheelActive = true;
                    canvas.classList.add('is-wheel-zooming');
                    map._moveStart(true);
                    wheelLastFrame = performance.now();
                    wheelSegmentZoom = map.getZoom();
                }
                wheelTarget = clampZoom(wheelTarget + step);
                wheelPoint = point;
                wheelAnchor = map.containerPointToLatLng(point);
                wheelFrom = map.getZoom();
                wheelStarted = performance.now();
                if (!wheelFrame) wheelFrame = requestAnimationFrame(animateWheel);
            };
            canvas.addEventListener('wheel', event => {
                focusAfterLayout = null;
                clearTimeout(layoutFinishTimer);
                stopPlaceFlight();
                if (event.ctrlKey || event.metaKey) { finishWheelZoom(); return; }
                if (!event.deltaY) return;
                event.preventDefault();
                wheelQuietUntil = performance.now() + wheelQuietMs;
                const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? canvas.clientHeight : 1;
                const step = Math.max(-wheelMaxStep, Math.min(wheelMaxStep, -event.deltaY * unit / wheelPixelsPerLevel));
                const point = map.mouseEventToContainerPoint(event);
                if (map._animatingZoom) {
                    queuedWheelStep += step;
                    queuedWheelPoint = point;
                    if (!waitingForZoom) {
                        waitingForZoom = true;
                        map.once('zoomend', () => {
                            waitingForZoom = false;
                            const pending = queuedWheelStep, pendingPoint = queuedWheelPoint;
                            queuedWheelStep = 0;
                            queuedWheelPoint = null;
                            if (pendingPoint) applyWheelStep(pending, pendingPoint);
                        });
                    }
                } else applyWheelStep(step, point);
            }, { passive: false });
            ['pointerdown', 'keydown', 'click'].forEach(type => canvas.addEventListener(type, () => {
                focusAfterLayout = null;
                clearTimeout(layoutFinishTimer);
                finishWheelZoom();
                stopPlaceFlight();
            }, { capture: true }));
            reducedMotion.addEventListener('change', () => { if (wheelRespectsReducedMotion) finishWheelZoom(); });
            fitWorld();
            updateMarkerSizes();
            markerLayer = typeof L.markerClusterGroup === 'function' ? L.markerClusterGroup({
                maxClusterRadius: 36, showCoverageOnHover: false,
                animate: !reducedMotion.matches, spiderfyDistanceMultiplier: 1.5,
                spiderLegPolylineOptions: { color: 'var(--travel-pin)', weight: 1.2, opacity: 0.65 },
                iconCreateFunction(cluster) {
                    const count = cluster.getChildCount();
                    cluster.options.title = SiteI18n.t(currentMode === 'aviation' ? 'life.nearbyAirports' : 'life.nearby', { count });
                    const current = selected && cluster.getAllChildMarkers().some(marker => marker.options.travelEntry === selected);
                    return L.divIcon({
                        className: `travel-cluster${current ? ' is-selected' : ''}${expandedCluster === cluster ? ' is-expanded' : ''}`,
                        html: String(count), iconSize: [clusterIconSize, clusterIconSize], iconAnchor: [clusterIconSize / 2, clusterIconSize / 2]
                    });
                }
            }) : L.featureGroup();
            markerLayer.addTo(map);
            markerLayer.on('spiderfied', event => {
                expandedCluster = event.cluster;
                expandedCluster.getElement()?.classList.add('is-expanded');
            });
            markerLayer.on('unspiderfied', () => {
                expandedCluster?.getElement()?.classList.remove('is-expanded');
                expandedCluster = null;
            });
            markerLayer.on('animationend spiderfied unspiderfied', scheduleMapLabels);
            countries = L.featureGroup().addTo(map);
            ensureWorldCopies();
            map.on('moveend', () => {
                if (!horizontalWrap) return;
                const center = map.getCenter();
                const longitude = L.Util.wrapNum(center.lng, [-180, 180], true);
                const latitude = Math.max(-85, Math.min(85, center.lat));
                if (Math.abs(longitude - center.lng) > 1e-7 || Math.abs(latitude - center.lat) > 1e-7) {
                    // All copies share the same content, so recentering is visually continuous.
                    map.setView([latitude, longitude], map.getZoom(), { animate: false });
                    updateMapResolution();
                }
            });
            map.on('dragstart zoomstart', event => { if (event.type === 'dragstart' || event.originalEvent) worldView = false; });
            // A real user zoom should stay at their chosen scale when the viewport resizes.
            map.on('zoomend', () => { if (!fitting) worldView = false; });
            let fitting = false;
            const resize = () => {
                finishWheelZoom();
                // Sidebar resizing changes the pixel frame and emits moveend.
                // Keep the destination alive and resume with the same deadline.
                if (placeFlight) map.off('moveend', completePlaceFlight);
                fitting = true;
                map.invalidateSize({ pan: true, animate: false, debounceMoveend: false });
                updateMarkerSizes();
                ensureWorldCopies();
                clearTimeout(layoutFinishTimer);
                layoutFinishTimer = setTimeout(() => {
                    if (worldView) fitWorld();
                    else keepPlaceInView();
                }, reducedMotion.matches ? 0 : photoColumnDuration + 40);
                fitting = false;
                if (placeFlight) {
                    map.on('moveend', completePlaceFlight);
                    resumePlaceFlight();
                }
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
                const atlasFile = horizontalWrap ? 'countries-50m-wrapped.geo.json' : (pacificLayout ? 'countries-50m-pacific.geo.json' : 'countries-50m.geo.json');
                const labelDataRequest = fetch(new URL('assets/maps/country-labels.json', root), { signal: controller.signal })
                    .then(response => response.ok ? response.json() : {}).catch(() => ({}));
                const response = await fetch(new URL(`assets/maps/${atlasFile}`, root), { signal: controller.signal });
                if (!response.ok) throw new Error(`Map data: ${response.status}`);
                const features = await response.json();
                baseCountryFeatures = features;
                baseCountryLabels = await labelDataRequest;
                renderCountryDataset(features, '50m');
                message.hidden = true;
                canvas.dataset.state = 'ready';
                updateMapResolution();
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
