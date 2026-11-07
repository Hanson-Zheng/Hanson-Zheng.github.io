// Life map: one entry per place, with photos in its own images/life/place/ folder.
// coordinates: [latitude, longitude]. Add photos as { "src", "alt", "caption" } objects.
// country: use "China" for mainland China, Hong Kong, Macao and Taiwan; all four light up together.
// Dates are optional. Omit date entirely for undated visits, as below.
// configData.travelMap.showDates controls date display (false by default).
const travelData = [
    {
        "id": "ntu-eee",
        "place": "NTU EEE",
        "country": "Singapore",
        "coordinates": [1.3409, 103.6805],
        "title": "Nanyang Technological University",
        "description": "School of Electrical and Electronic Engineering, Singapore.",
        "photos": [
            {
                "src": "images/life/ntu-eee/ntu-eee.jpg",
                "alt": "The Electrical and Electronic Engineering building at NTU in Singapore",
                "caption": "School of Electrical and Electronic Engineering, NTU."
            }
        ]
    },
    {
        "id": "beijing",
        "place": "Beijing",
        "country": "China",
        "coordinates": [39.9075, 116.3972],
        "title": "Beijing after dark",
        "description": "A glimpse of Tiananmen at night.",
        "photos": [
            {
                "src": "images/life/beijing/beijing-night.jpg",
                "alt": "Tiananmen in Beijing at night, with a white ZYM signature strip underneath",
                "caption": "Tiananmen, Beijing."
            }
        ]
    }
];
