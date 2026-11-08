const travelData = [
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
    },
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
                "src": "images/life/singapore/ntu-eee.jpg",
                "alt": "The Electrical and Electronic Engineering building at NTU in Singapore",
                "caption": "School of Electrical and Electronic Engineering, NTU."
            }
        ]
    },
    {
        "id": "vienna",
        "place": "Vienna",
        "country": "Austria",
        "coordinates": [48.1952, 16.3801],
        "title": "Belvedere & Votivkirche",
        "description": "Belvedere Palace and Votivkirche, with Billi Thanner's Infinity of Light between its towers.",
        "photos": [
            {
                "src": "images/life/vienna/belvedere.jpg",
                "alt": "Belvedere Palace and its formal gardens in Vienna",
                "caption": "Belvedere Palace, Vienna."
            },
            {
                "src": "images/life/vienna/votivkirche.jpg",
                "alt": "Votivkirche in Vienna at night, with an illuminated infinity symbol connecting its twin towers",
                "caption": "Votivkirche, Vienna - Infinity of Light by Billi Thanner."
            }
        ]
    },
    {
        "id": "prague",
        "place": "Prague",
        "country": "Czechia",
        "coordinates": [50.0865, 14.4107],
        "title": "Prague Castle above the Vltava",
        "description": "Prague Castle and the city above the Vltava River.",
        "photos": [
            {
                "src": "images/life/prague/prague-castle-vltava.jpg",
                "alt": "Illuminated Prague Castle above the rooftops near the Vltava River",
                "caption": "Prague Castle and the Vltava, Prague."
            }
        ]
    },
    {
        "id": "frankfurt",
        "place": "Frankfurt",
        "country": "Germany",
        "coordinates": [50.0482, 8.581],
        "title": "ICBC, everywhere",
        "description": "At Frankfurt Airport, a familiar logo on the jet bridge. ICBC really is everywhere.",
        "photos": [
            {
                "src": "images/life/frankfurt/frankfurt-airport-icbc.jpg",
                "alt": "A jet bridge at Frankfurt Airport displaying ICBC branding beneath a Lufthansa sign",
                "caption": "Frankfurt Airport. ICBC really is everywhere."
            }
        ]
    },
    {
        "id": "paris",
        "place": "Paris",
        "country": "France",
        "coordinates": [48.8605, 2.3352],
        "title": "The Louvre",
        "description": "The Louvre Pyramid and the surrounding palace courtyard in Paris.",
        "photos": [
            {
                "src": "images/life/paris/louvre.jpg",
                "alt": "The glass pyramid in the courtyard of the Louvre in Paris",
                "caption": "The Louvre, Paris."
            }
        ]
    },
    {
        "id": "munich",
        "place": "Munich",
        "country": "Germany",
        "coordinates": [48.1769, 11.5571],
        "title": "BMW Museum",
        "description": "A view of the BMW Museum in Munich.",
        "photos": [
            {
                "src": "images/life/munich/bmw-museum.jpg",
                "alt": "The BMW Museum and neighbouring BMW building in Munich",
                "caption": "BMW Museum, Munich."
            }
        ]
    },
    {
        "id": "london",
        "place": "London",
        "country": "United Kingdom",
        "coordinates": [51.5081, -0.0742],
        "title": "Tower Bridge",
        "description": "Tower Bridge against a blue London sky.",
        "photos": [
            {
                "src": "images/life/london/tower-bridge.jpg",
                "alt": "One of the towers of Tower Bridge and its blue suspension structure in London",
                "caption": "Tower Bridge, London."
            }
        ]
    },
    {
        "id": "cambridge",
        "place": "Cambridge",
        "country": "United Kingdom",
        "coordinates": [52.2072, 0.118],
        "title": "Newton's apple tree",
        "description": "Newton's apple tree at Trinity College, a grafted descendant of the original tree at Woolsthorpe.",
        "photos": [
            {
                "src": "images/life/cambridge/newtons-apple-tree.jpg",
                "alt": "An apple tree on the lawn beside the historic buildings of Trinity College, Cambridge",
                "caption": "Newton's apple tree, Trinity College, Cambridge."
            }
        ]
    },
    {
        "id": "barcelona",
        "place": "Barcelona",
        "country": "Spain",
        "coordinates": [41.4193, 2.1619],
        "title": "Barcelona from above",
        "description": "A panorama of Barcelona from Turó de la Rovira, also known as Bunkers del Carmel.",
        "photos": [
            {
                "src": "images/life/barcelona/turo-de-la-rovira.jpg",
                "alt": "A panorama of Barcelona stretching towards the Mediterranean Sea from Turo de la Rovira",
                "caption": "Barcelona from Turó de la Rovira (Bunkers del Carmel)."
            }
        ]
    },
    {
        "id": "doha",
        "place": "Doha",
        "country": "Qatar",
        "coordinates": [25.2603, 51.6153],
        "title": "Dawn at Hamad Airport",
        "description": "The first light of morning at Hamad International Airport in Doha.",
        "photos": [
            {
                "src": "images/life/doha/hamad-airport-dawn.jpg",
                "alt": "Early morning light outside Hamad International Airport in Doha",
                "caption": "Dawn at Hamad International Airport, Doha."
            }
        ]
    },
    {
        "id": "bali",
        "place": "Bali",
        "country": "Indonesia",
        "coordinates": [
            -8.6182,
            115.0865
        ],
        "title": "Along the coast of Bali",
        "description": "Ocean waves and a coastal temple on a bright afternoon in Bali.",
        "photos": [
            {
                "src": "images/life/bali/bali.jpg",
                "alt": "A Balinese coastal temple above a natural rock arch, overlooking the ocean",
                "caption": "Bali, Indonesia."
            }
        ]
    }
];
