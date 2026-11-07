// Project folders, in display order. All content lives in each folder's project.json.
// Set "featured": true in a project's JSON to include it on Home.
// Set "featured": false (or omit it) to show it only in the Projects listing.
const projectDirectories = [
    'tetherless-neural-recording',
    'microdevice-injection',
    'optical-ppm-decoding',
    'fb-mote',
    'algaas-micro-pvleds',
    'coaxial-drone'
];

// Continuous autoplay speed in pixels per second; manual navigation snaps one card.
const projectCarouselSettings = {
    autoScrollSpeed: 15,
    cardWidth: 300, // Horizontal card width; extra space reveals more projects.
    pauseAfterInteraction: 4000
};
