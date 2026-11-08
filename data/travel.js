// Life map: one entry per place, with photos in its own images/life/place/ folder.
// coordinates: [latitude, longitude]. Add photos as { "src", "alt", "caption" } objects.
// country: use "China" for mainland China, Hong Kong, Macao and Taiwan; all four light up together.
// Dates are optional. Omit date entirely for undated visits, as below.
// configData.travelMap.showDates controls date display (false by default).
const travelData = [
    {
        "id": "manila",
        "place": "Manila",
        "country": "Philippines",
        "coordinates": [14.5341, 120.9848],
        "title": "SM Mall of Asia",
        "description": "An evening view of SM Mall of Asia in Manila.",
        "photos": [
            {
                "src": "images/life/manila/sm-mall-of-asia.jpg",
                "alt": "An evening view of SM Mall of Asia in Manila.",
                "caption": "SM Mall of Asia, Manila."
            }
        ]
    },
    {
        "id": "shanghai",
        "place": "Shanghai",
        "country": "China",
        "coordinates": [31.2404, 121.4861],
        "title": "Lujiazui after dark",
        "description": "The Lujiazui skyline across the Huangpu River.",
        "photos": [
            {
                "src": "images/life/shanghai/lujiazui.jpg",
                "alt": "The Lujiazui skyline across the Huangpu River.",
                "caption": "Lujiazui, Shanghai."
            }
        ]
    },
    {
        "id": "kuala-lumpur",
        "place": "Kuala Lumpur",
        "country": "Malaysia",
        "coordinates": [3.1596, 101.7105],
        "title": "Petronas Twin Towers",
        "description": "Looking up at the Petronas Twin Towers in Kuala Lumpur.",
        "photos": [
            {
                "src": "images/life/kuala-lumpur/petronas-twin-towers.jpg",
                "alt": "Looking up at the Petronas Twin Towers in Kuala Lumpur.",
                "caption": "Petronas Twin Towers, Kuala Lumpur."
            }
        ]
    },
    {
        "id": "bangkok",
        "place": "Bangkok",
        "country": "Thailand",
        "coordinates": [13.7269, 100.5111],
        "title": "Along the Chao Phraya",
        "description": "A view along the Chao Phraya River in Bangkok.",
        "photos": [
            {
                "src": "images/life/bangkok/chao-phraya-river.jpg",
                "alt": "A view along the Chao Phraya River in Bangkok.",
                "caption": "Chao Phraya River, Bangkok."
            }
        ]
    },
    {
        "id": "harbin",
        "place": "Harbin",
        "country": "China",
        "coordinates": [45.7459, 126.6262],
        "title": "Harbin Institute of Technology",
        "description": "The main building of Harbin Institute of Technology in Harbin.",
        "photos": [
            {
                "src": "images/life/harbin/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Harbin.",
                "caption": "Main building, Harbin Institute of Technology, Harbin."
            }
        ]
    },
    {
        "id": "hong-kong",
        "place": "Hong Kong",
        "country": "China",
        "coordinates": [22.293, 114.169],
        "title": "Victoria Harbour",
        "description": "Hong Kong Island and Victoria Harbour, seen from the waterfront.",
        "photos": [
            {
                "src": "images/life/hong-kong/victoria-harbour.jpg",
                "alt": "Hong Kong Island and Victoria Harbour, seen from the waterfront.",
                "caption": "Victoria Harbour, Hong Kong."
            }
        ]
    },
    {
        "id": "hanoi",
        "place": "Hanoi",
        "country": "Vietnam",
        "coordinates": [21.0354, 105.8368],
        "title": "Ho Chi Minh Mausoleum",
        "description": "The Ho Chi Minh Mausoleum at Ba Dinh Square in Hanoi.",
        "photos": [
            {
                "src": "images/life/hanoi/ho-chi-minh-mausoleum.jpg",
                "alt": "The Ho Chi Minh Mausoleum at Ba Dinh Square in Hanoi.",
                "caption": "Ho Chi Minh Mausoleum, Hanoi."
            }
        ]
    },
    {
        "id": "weihai",
        "place": "Weihai",
        "country": "China",
        "coordinates": [37.529, 122.0778],
        "title": "Harbin Institute of Technology, Weihai",
        "description": "The main building of Harbin Institute of Technology in Weihai.",
        "photos": [
            {
                "src": "images/life/weihai/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Weihai.",
                "caption": "Main building, Harbin Institute of Technology, Weihai."
            }
        ]
    },
    {
        "id": "shenzhen",
        "place": "Shenzhen",
        "country": "China",
        "coordinates": [22.5884, 113.9691],
        "title": "Harbin Institute of Technology, Shenzhen",
        "description": "The main building of Harbin Institute of Technology in Shenzhen.",
        "photos": [
            {
                "src": "images/life/shenzhen/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Shenzhen.",
                "caption": "Main building, Harbin Institute of Technology, Shenzhen."
            }
        ]
    },
    {
        "id": "siem-reap",
        "place": "Siem Reap",
        "country": "Cambodia",
        "coordinates": [13.4119, 103.8642],
        "title": "Angkor Wat",
        "description": "The silhouette of Angkor Wat and its reflection in Siem Reap.",
        "photos": [
            {
                "src": "images/life/siem-reap/angkor-wat.jpg",
                "alt": "The silhouette of Angkor Wat and its reflection in Siem Reap.",
                "caption": "Angkor Wat, Siem Reap."
            }
        ]
    },
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
