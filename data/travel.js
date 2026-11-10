const travelData = [
    {
        "id": "beijing",
        "place": "Beijing",
        "placeZh": "北京",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [39.9075, 116.3972],
        "title": "Beijing after dark",
        "titleZh": "北京夜色",
        "description": "A glimpse of Tiananmen at night.",
        "descriptionZh": "夜幕下的天安门。",
        "photos": [
            {
                "src": "images/life/beijing/beijing-night.jpg",
                "alt": "Tiananmen in Beijing at night, with a white ZYM signature strip underneath",
                "altZh": "夜色中的北京天安门，下方附有白色 ZYM 签名栏",
                "caption": "Tiananmen, Beijing.",
                "captionZh": "北京，天安门。"
            }
        ]
    },
    {
        "id": "manila",
        "place": "Manila",
        "placeZh": "马尼拉",
        "country": "Philippines",
        "countryZh": "菲律宾",
        "coordinates": [14.5341, 120.9848],
        "title": "SM Mall of Asia",
        "titleZh": "SM 亚洲购物中心",
        "description": "An evening view of SM Mall of Asia in Manila.",
        "descriptionZh": "傍晚时分的马尼拉，SM 亚洲购物中心一隅。",
        "photos": [
            {
                "src": "images/life/manila/sm-mall-of-asia.jpg",
                "alt": "An evening view of SM Mall of Asia in Manila.",
                "altZh": "傍晚的马尼拉 SM 亚洲购物中心",
                "caption": "SM Mall of Asia, Manila.",
                "captionZh": "马尼拉，SM Mall of Asia。"
            }
        ]
    },
    {
        "id": "shanghai",
        "place": "Shanghai",
        "placeZh": "上海",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [31.2404, 121.4861],
        "title": "Lujiazui after dark",
        "titleZh": "陆家嘴的夜",
        "description": "The Lujiazui skyline across the Huangpu River.",
        "descriptionZh": "隔着黄浦江，看陆家嘴的灯火与天际线。",
        "photos": [
            {
                "src": "images/life/shanghai/lujiazui.jpg",
                "alt": "The Lujiazui skyline across the Huangpu River.",
                "altZh": "隔黄浦江望向上海陆家嘴的夜景与天际线",
                "caption": "Lujiazui, Shanghai.",
                "captionZh": "上海，陆家嘴。"
            }
        ]
    },
    {
        "id": "kuala-lumpur",
        "place": "Kuala Lumpur",
        "placeZh": "吉隆坡",
        "country": "Malaysia",
        "countryZh": "马来西亚",
        "coordinates": [3.1596, 101.7105],
        "title": "Petronas Twin Towers",
        "titleZh": "仰望双子塔",
        "description": "Looking up at the Petronas Twin Towers in Kuala Lumpur.",
        "descriptionZh": "在吉隆坡，抬头望向双子塔。",
        "photos": [
            {
                "src": "images/life/kuala-lumpur/petronas-twin-towers.jpg",
                "alt": "Looking up at the Petronas Twin Towers in Kuala Lumpur.",
                "altZh": "从下方向上仰望吉隆坡双子塔",
                "caption": "Petronas Twin Towers, Kuala Lumpur.",
                "captionZh": "吉隆坡，双子塔。"
            }
        ]
    },
    {
        "id": "bangkok",
        "place": "Bangkok",
        "placeZh": "曼谷",
        "country": "Thailand",
        "countryZh": "泰国",
        "coordinates": [
            13.7269,
            100.5111
        ],
        "title": "Bangkok",
        "titleZh": "曼谷",
        "description": "An A380 at the airport, the Grand Palace, and views along the Chao Phraya River.",
        "descriptionZh": "机场的 A380、大皇宫，还有湄南河边的风景。",
        "photos": [
            {
                "src": "images/life/bangkok/chao-phraya-river.jpg",
                "alt": "A view along the Chao Phraya River in Bangkok.",
                "altZh": "曼谷湄南河沿岸的景色",
                "caption": "Chao Phraya River, Bangkok.",
                "captionZh": "曼谷，湄南河。"
            },
            {
                "src": "images/life/bangkok/first-a380-flight.jpg",
                "alt": "An Emirates Airbus A380 parked at a gate, viewed through a terminal window in Bangkok",
                "altZh": "从曼谷机场航站楼窗前看到停靠登机口的阿联酋航空 A380",
                "caption": "My first A380 flight, departing from Bangkok.",
                "captionZh": "第一次坐 A380，从曼谷出发。"
            },
            {
                "src": "images/life/bangkok/grand-palace.jpg",
                "alt": "Ornate golden roofs and spires above trees in the Grand Palace complex in Bangkok",
                "altZh": "曼谷大皇宫内，金色屋顶和尖塔掩映在绿树之间",
                "caption": "Golden roofs and green gardens at the Grand Palace, Bangkok.",
                "captionZh": "曼谷大皇宫，金色屋顶下是满眼的绿。"
            }
        ]
    },
    {
        "id": "harbin",
        "place": "Harbin",
        "placeZh": "哈尔滨",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [45.7459, 126.6262],
        "title": "Harbin Institute of Technology",
        "titleZh": "哈尔滨工业大学",
        "description": "The main building of Harbin Institute of Technology in Harbin.",
        "descriptionZh": "哈尔滨工业大学主楼，哈尔滨校区。",
        "photos": [
            {
                "src": "images/life/harbin/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Harbin.",
                "altZh": "哈尔滨工业大学哈尔滨校区主楼",
                "caption": "Main building, Harbin Institute of Technology, Harbin.",
                "captionZh": "哈尔滨，哈尔滨工业大学主楼。"
            }
        ]
    },
    {
        "id": "hong-kong",
        "place": "Hong Kong",
        "placeZh": "香港",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [22.293, 114.169],
        "title": "Victoria Harbour",
        "titleZh": "维港一瞥",
        "description": "Hong Kong Island and Victoria Harbour, seen from the waterfront.",
        "descriptionZh": "从海滨望向香港岛与维多利亚港。",
        "photos": [
            {
                "src": "images/life/hong-kong/victoria-harbour.jpg",
                "alt": "Hong Kong Island and Victoria Harbour, seen from the waterfront.",
                "altZh": "从海滨望向香港岛和维多利亚港",
                "caption": "Victoria Harbour, Hong Kong.",
                "captionZh": "香港，维多利亚港。"
            }
        ]
    },
    {
        "id": "hanoi",
        "place": "Hanoi",
        "placeZh": "河内",
        "country": "Vietnam",
        "countryZh": "越南",
        "coordinates": [21.0354, 105.8368],
        "title": "Ho Chi Minh Mausoleum",
        "titleZh": "巴亭广场一隅",
        "description": "The Ho Chi Minh Mausoleum at Ba Dinh Square in Hanoi.",
        "descriptionZh": "河内巴亭广场上的胡志明陵。",
        "photos": [
            {
                "src": "images/life/hanoi/ho-chi-minh-mausoleum.jpg",
                "alt": "The Ho Chi Minh Mausoleum at Ba Dinh Square in Hanoi.",
                "altZh": "越南河内巴亭广场上的胡志明陵",
                "caption": "Ho Chi Minh Mausoleum, Hanoi.",
                "captionZh": "河内，胡志明陵。"
            }
        ]
    },
    {
        "id": "weihai",
        "place": "Weihai",
        "placeZh": "威海",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            37.529,
            122.0778
        ],
        "title": "Harbin Institute of Technology, Weihai",
        "titleZh": "哈尔滨工业大学（威海）",
        "description": "The main building of Harbin Institute of Technology, Weihai, by day and after dark.",
        "descriptionZh": "同一座主楼，从白天看到灯火亮起。",
        "photos": [
            {
                "src": "images/life/weihai/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Weihai.",
                "altZh": "哈尔滨工业大学威海校区主楼",
                "caption": "Main building, Harbin Institute of Technology, Weihai.",
                "captionZh": "威海，哈尔滨工业大学主楼。"
            },
            {
                "src": "images/life/weihai/hit-main-building-at-night.jpg",
                "alt": "The illuminated main building of Harbin Institute of Technology, Weihai, surrounded by campus buildings at night",
                "altZh": "夜色中的哈尔滨工业大学威海校区，亮灯的主楼和周围校园建筑",
                "caption": "The main building of Harbin Institute of Technology, Weihai, after dark.",
                "captionZh": "威海，亮灯后的哈工大主楼。"
            }
        ]
    },
    {
        "id": "shenzhen",
        "place": "Shenzhen",
        "placeZh": "深圳",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [22.5884, 113.9691],
        "title": "Harbin Institute of Technology, Shenzhen",
        "titleZh": "哈尔滨工业大学（深圳）",
        "description": "The main building of Harbin Institute of Technology in Shenzhen.",
        "descriptionZh": "哈尔滨工业大学深圳校区的主楼。",
        "photos": [
            {
                "src": "images/life/shenzhen/hit-main-building.jpg",
                "alt": "The main building of Harbin Institute of Technology in Shenzhen.",
                "altZh": "哈尔滨工业大学深圳校区主楼",
                "caption": "Main building, Harbin Institute of Technology, Shenzhen.",
                "captionZh": "深圳，哈尔滨工业大学主楼。"
            }
        ]
    },
    {
        "id": "siem-reap",
        "place": "Siem Reap",
        "placeZh": "暹粒",
        "country": "Cambodia",
        "countryZh": "柬埔寨",
        "coordinates": [13.4119, 103.8642],
        "title": "Angkor Wat",
        "titleZh": "吴哥的倒影",
        "description": "The silhouette of Angkor Wat and its reflection in Siem Reap.",
        "descriptionZh": "吴哥窟的轮廓，与水中静静相映的倒影。",
        "photos": [
            {
                "src": "images/life/siem-reap/angkor-wat.jpg",
                "alt": "The silhouette of Angkor Wat and its reflection in Siem Reap.",
                "altZh": "暹粒吴哥窟的建筑轮廓及其水中倒影",
                "caption": "Angkor Wat, Siem Reap.",
                "captionZh": "暹粒，吴哥窟。"
            }
        ]
    },
    {
        "id": "ntu-eee",
        "place": "NTU EEE",
        "placeZh": "南洋理工大学",
        "country": "Singapore",
        "countryZh": "新加坡",
        "coordinates": [1.3409, 103.6805],
        "title": "Nanyang Technological University",
        "titleZh": "南洋理工大学 EEE 学院",
        "description": "School of Electrical and Electronic Engineering, Singapore.",
        "descriptionZh": "新加坡，南洋理工大学电气与电子工程学院。",
        "photos": [
            {
                "src": "images/life/singapore/ntu-eee.jpg",
                "alt": "The Electrical and Electronic Engineering building at NTU in Singapore",
                "altZh": "新加坡南洋理工大学电气与电子工程学院的建筑",
                "caption": "School of Electrical and Electronic Engineering, NTU.",
                "captionZh": "南洋理工大学，电气与电子工程学院。"
            }
        ]
    },
    {
        "id": "vienna",
        "place": "Vienna",
        "placeZh": "维也纳",
        "country": "Austria",
        "countryZh": "奥地利",
        "coordinates": [48.1952, 16.3801],
        "title": "Belvedere & Votivkirche",
        "titleZh": "宫苑与灯火",
        "description": "Belvedere Palace and Votivkirche, with Billi Thanner's Infinity of Light between its towers.",
        "descriptionZh": "美景宫的庭园，沃蒂夫教堂的双塔。塔间亮起的无限符号，是 Billi Thanner 的灯光装置《Infinity of Light》。",
        "photos": [
            {
                "src": "images/life/vienna/belvedere.jpg",
                "alt": "Belvedere Palace and its formal gardens in Vienna",
                "altZh": "维也纳美景宫及其庭园",
                "caption": "Belvedere Palace, Vienna.",
                "captionZh": "维也纳，美景宫。"
            },
            {
                "src": "images/life/vienna/votivkirche.jpg",
                "alt": "Votivkirche in Vienna at night, with an illuminated infinity symbol connecting its twin towers",
                "altZh": "夜晚的维也纳沃蒂夫教堂，双塔之间亮着无限符号形状的灯光装置",
                "caption": "Votivkirche, Vienna - Infinity of Light by Billi Thanner.",
                "captionZh": "维也纳，沃蒂夫教堂与 Billi Thanner 的灯光装置《Infinity of Light》。"
            }
        ]
    },
    {
        "id": "prague",
        "place": "Prague",
        "placeZh": "布拉格",
        "country": "Czechia",
        "countryZh": "捷克",
        "coordinates": [50.0865, 14.4107],
        "title": "Prague Castle above the Vltava",
        "titleZh": "河畔城堡",
        "description": "Prague Castle and the city above the Vltava River.",
        "descriptionZh": "伏尔塔瓦河畔，布拉格城堡与城市的灯火。",
        "photos": [
            {
                "src": "images/life/prague/prague-castle-vltava.jpg",
                "alt": "Illuminated Prague Castle above the rooftops near the Vltava River",
                "altZh": "伏尔塔瓦河附近的屋顶上方，灯光映照着布拉格城堡",
                "caption": "Prague Castle and the Vltava, Prague.",
                "captionZh": "布拉格城堡与伏尔塔瓦河。"
            }
        ]
    },
    {
        "id": "frankfurt",
        "place": "Frankfurt",
        "placeZh": "法兰克福",
        "country": "Germany",
        "countryZh": "德国",
        "coordinates": [50.0482, 8.581],
        "title": "ICBC, everywhere",
        "titleZh": "ICBC，果然无处不在",
        "description": "At Frankfurt Airport, a familiar logo on the jet bridge. ICBC really is everywhere.",
        "descriptionZh": "在法兰克福机场的廊桥上，又看到了熟悉的工行标志。ICBC，果然无处不在。",
        "photos": [
            {
                "src": "images/life/frankfurt/frankfurt-airport-icbc.jpg",
                "alt": "A jet bridge at Frankfurt Airport displaying ICBC branding beneath a Lufthansa sign",
                "altZh": "法兰克福机场廊桥上的工行标志，上方是汉莎航空标识",
                "caption": "Frankfurt Airport. ICBC really is everywhere.",
                "captionZh": "法兰克福机场。ICBC，果然无处不在。"
            }
        ]
    },
    {
        "id": "paris",
        "place": "Paris",
        "placeZh": "巴黎",
        "country": "France",
        "countryZh": "法国",
        "coordinates": [48.8605, 2.3352],
        "title": "The Louvre",
        "titleZh": "卢浮宫一隅",
        "description": "The Louvre Pyramid and the surrounding palace courtyard in Paris.",
        "descriptionZh": "卢浮宫的玻璃金字塔与四周的宫殿庭院。",
        "photos": [
            {
                "src": "images/life/paris/louvre.jpg",
                "alt": "The glass pyramid in the courtyard of the Louvre in Paris",
                "altZh": "巴黎卢浮宫庭院中的玻璃金字塔",
                "caption": "The Louvre, Paris.",
                "captionZh": "巴黎，卢浮宫。"
            }
        ]
    },
    {
        "id": "munich",
        "place": "Munich",
        "placeZh": "慕尼黑",
        "country": "Germany",
        "countryZh": "德国",
        "coordinates": [48.1769, 11.5571],
        "title": "BMW Museum",
        "titleZh": "宝马博物馆",
        "description": "A view of the BMW Museum in Munich.",
        "descriptionZh": "慕尼黑，宝马博物馆一瞥。",
        "photos": [
            {
                "src": "images/life/munich/bmw-museum.jpg",
                "alt": "The BMW Museum and neighbouring BMW building in Munich",
                "altZh": "慕尼黑的宝马博物馆及邻近的宝马大楼",
                "caption": "BMW Museum, Munich.",
                "captionZh": "慕尼黑，宝马博物馆。"
            }
        ]
    },
    {
        "id": "london",
        "place": "London",
        "placeZh": "伦敦",
        "country": "United Kingdom",
        "countryZh": "英国",
        "coordinates": [51.5081, -0.0742],
        "title": "Tower Bridge",
        "titleZh": "蓝天下的塔桥",
        "description": "Tower Bridge against a blue London sky.",
        "descriptionZh": "伦敦塔桥，映着一片晴空。",
        "photos": [
            {
                "src": "images/life/london/tower-bridge.jpg",
                "alt": "One of the towers of Tower Bridge and its blue suspension structure in London",
                "altZh": "伦敦塔桥的一座桥塔与蓝色悬索结构",
                "caption": "Tower Bridge, London.",
                "captionZh": "伦敦，塔桥。"
            }
        ]
    },
    {
        "id": "cambridge",
        "place": "Cambridge",
        "placeZh": "剑桥",
        "country": "United Kingdom",
        "countryZh": "英国",
        "coordinates": [52.2072, 0.118],
        "title": "Newton's apple tree",
        "titleZh": "牛顿的苹果树",
        "description": "Newton's apple tree at Trinity College, a grafted descendant of the original tree at Woolsthorpe.",
        "descriptionZh": "三一学院的“牛顿苹果树”，由伍尔索普庄园的原树嫁接繁育而来。",
        "photos": [
            {
                "src": "images/life/cambridge/newtons-apple-tree.jpg",
                "alt": "An apple tree on the lawn beside the historic buildings of Trinity College, Cambridge",
                "altZh": "剑桥三一学院历史建筑旁草坪上的苹果树",
                "caption": "Newton's apple tree, Trinity College, Cambridge.",
                "captionZh": "剑桥三一学院，牛顿的苹果树。"
            }
        ]
    },
    {
        "id": "barcelona",
        "place": "Barcelona",
        "placeZh": "巴塞罗那",
        "country": "Spain",
        "countryZh": "西班牙",
        "coordinates": [41.4193, 2.1619],
        "title": "Barcelona from above",
        "titleZh": "俯瞰巴塞罗那",
        "description": "A panorama of Barcelona from Turó de la Rovira, also known as Bunkers del Carmel.",
        "descriptionZh": "从焦糖山望向城市，一直望到地中海。",
        "photos": [
            {
                "src": "images/life/barcelona/turo-de-la-rovira.jpg",
                "alt": "A panorama of Barcelona stretching towards the Mediterranean Sea from Turo de la Rovira",
                "altZh": "从 焦糖山望向巴塞罗那城区与地中海的全景",
                "caption": "Barcelona from Turó de la Rovira (Bunkers del Carmel).",
                "captionZh": "从焦糖山俯瞰巴塞罗那。"
            }
        ]
    },
    {
        "id": "doha",
        "place": "Doha",
        "placeZh": "多哈",
        "country": "Qatar",
        "countryZh": "卡塔尔",
        "coordinates": [25.2603, 51.6153],
        "title": "Dawn at Hamad Airport",
        "titleZh": "哈马德机场的清晨",
        "description": "The first light of morning at Hamad International Airport in Doha.",
        "descriptionZh": "多哈哈马德国际机场，天光初亮。",
        "photos": [
            {
                "src": "images/life/doha/hamad-airport-dawn.jpg",
                "alt": "Early morning light outside Hamad International Airport in Doha",
                "altZh": "清晨光线中的多哈哈马德国际机场外景",
                "caption": "Dawn at Hamad International Airport, Doha.",
                "captionZh": "多哈，哈马德国际机场的清晨。"
            }
        ]
    },
    {
        "id": "bali",
        "place": "Bali",
        "placeZh": "巴厘岛",
        "country": "Indonesia",
        "countryZh": "印度尼西亚",
        "coordinates": [
            -8.6182,
            115.0865
        ],
        "title": "Along the coast of Bali",
        "titleZh": "巴厘岛的海风",
        "description": "Ocean waves and a coastal temple on a bright afternoon in Bali.",
        "descriptionZh": "海浪拍向岩岸，一座海边寺庙立在晴空下。",
        "photos": [
            {
                "src": "images/life/bali/bali.jpg",
                "alt": "A Balinese coastal temple above a natural rock arch, overlooking the ocean",
                "altZh": "巴厘岛海边一座建在天然岩拱上方的寺庙，四周是海浪与绿植",
                "caption": "Bali, Indonesia.",
                "captionZh": "印度尼西亚，巴厘岛。"
            }
        ]
    },
    {
        "id": "ningbo",
        "place": "Ningbo",
        "placeZh": "宁波",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.8746,
            121.526
        ],
        "title": "Xiaoshi High School",
        "titleZh": "效实中学",
        "description": "At the gates of Xiaoshi High School in Ningbo.",
        "descriptionZh": "宁波效实中学的校门与校园一角。",
        "photos": [
            {
                "src": "images/life/ningbo/xiaoshi-high-school.jpg",
                "alt": "The entrance and school buildings of Xiaoshi High School in Ningbo",
                "altZh": "宁波效实中学的校门和教学楼",
                "caption": "Xiaoshi High School, Ningbo.",
                "captionZh": "宁波，效实中学。"
            }
        ]
    },
    {
        "id": "cebu",
        "place": "Cebu",
        "placeZh": "宿务",
        "country": "Philippines",
        "countryZh": "菲律宾",
        "coordinates": [
            10.2925,
            123.9081
        ],
        "title": "By the ferry terminal",
        "titleZh": "轮渡码头的晴天",
        "description": "Ferries, blue water and a bright sky at the port in Cebu.",
        "descriptionZh": "宿务港里，轮渡停泊，海水湛蓝，白云正好。",
        "photos": [
            {
                "src": "images/life/cebu/ferry-terminal.jpg",
                "alt": "Ferries moored at the port in Cebu under a blue sky with white clouds",
                "altZh": "蓝天白云下，轮渡停泊在菲律宾宿务的港口",
                "caption": "Ferry terminal, Cebu, Philippines.",
                "captionZh": "菲律宾宿务，轮渡码头。"
            }
        ]
    },
    {
        "id": "guangzhou",
        "place": "Guangzhou",
        "placeZh": "广州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            23.3924,
            113.299
        ],
        "title": "A380 & 737: father and son",
        "titleZh": "A380 和 737：像父子俩",
        "description": "An Airbus A380 and a Boeing 737 in the same frame at Guangzhou Baiyun Airport - a little father-and-son moment on the apron.",
        "descriptionZh": "白云机场里，A380 和 737 同框，体型差仿佛父与子。",
        "photos": [
            {
                "src": "images/life/guangzhou/baiyun-a380-and-737.jpg",
                "alt": "A large Airbus A380 and a smaller Boeing 737 seen together from the terminal at Guangzhou Baiyun Airport",
                "altZh": "从广州白云机场航站楼望去，一架大型 A380 与一架较小的 737 同时出现在画面里",
                "caption": "An A380 and a 737 at Guangzhou Baiyun Airport. Like father and son.",
                "captionZh": "广州白云机场，A380 与 737 的“父子同框”。"
            }
        ]
    },
    {
        "id": "macau",
        "place": "Macau",
        "placeZh": "澳门",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            22.158,
            113.5767
        ],
        "title": "A colourful airport encounter",
        "titleZh": "停机坪上的一抹彩色",
        "description": "A distinctive aircraft livery at Macau International Airport.",
        "descriptionZh": "澳门国际机场，遇见一架颇有特色的彩绘飞机。",
        "photos": [
            {
                "src": "images/life/macau/airport-special-livery.jpg",
                "alt": "An aircraft with a colourful special livery parked outside the terminal at Macau International Airport",
                "altZh": "澳门国际机场航站楼前停着一架带有特色彩绘涂装的飞机",
                "caption": "A splash of colour at Macau International Airport.",
                "captionZh": "澳门国际机场，彩绘机一瞥。"
            }
        ]
    },
    {
        "id": "bohol",
        "place": "Bohol",
        "placeZh": "薄荷岛",
        "country": "Philippines",
        "countryZh": "菲律宾",
        "coordinates": [
            9.6405,
            123.8565
        ],
        "title": "Sunset in Bohol",
        "titleZh": "薄荷岛的日落",
        "description": "Trees silhouetted against the sunset, with the evening colours reflected in the water.",
        "descriptionZh": "水面映着晚霞，岸边的树渐渐成了剪影。",
        "photos": [
            {
                "src": "images/life/bohol/sunset-by-the-water.jpg",
                "alt": "Trees silhouetted against an orange sunset beside a pool overlooking the water in Bohol",
                "altZh": "薄荷岛日落时，树木在橙色天空下形成剪影，泳池水面映着晚霞",
                "caption": "Sunset by the water, Bohol, Philippines.",
                "captionZh": "菲律宾薄荷岛，日落时分。"
            }
        ]
    },
    {
        "id": "chongqing",
        "place": "Chongqing",
        "placeZh": "重庆",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.5568,
            106.5346
        ],
        "title": "The railway at Liziba",
        "titleZh": "李子坝的轨道",
        "description": "The elevated railway runs alongside the hillside buildings at Liziba, Chongqing.",
        "descriptionZh": "楼房、山坡和轻轨挤在同一幅画面里，这很重庆。",
        "photos": [
            {
                "src": "images/life/chongqing/liziba-railway.jpg",
                "alt": "An elevated railway beside hillside buildings and a colourful mural at Liziba in Chongqing",
                "altZh": "重庆李子坝的高架轨道、依山而建的楼房和路边彩色壁画",
                "caption": "Liziba, Chongqing.",
                "captionZh": "重庆，李子坝。"
            }
        ]
    },
    {
        "id": "phuket",
        "place": "Phuket",
        "placeZh": "普吉岛",
        "country": "Thailand",
        "countryZh": "泰国",
        "coordinates": [
            7.895,
            98.295
        ],
        "title": "Patong Beach",
        "titleZh": "巴东海滩",
        "description": "Colourful PHUKET letters on the sand, with the sea and a blue sky behind them.",
        "descriptionZh": "蓝天、海风，还有沙滩上彩色的 PHUKET 字母。",
        "photos": [
            {
                "src": "images/life/phuket/patong-beach.jpg",
                "alt": "Large colourful PHUKET letters on the sand at Patong Beach beneath a blue sky",
                "altZh": "巴东海滩上彩色的 PHUKET 大字，身后是海面和蓝天",
                "caption": "Patong Beach, Phuket, Thailand.",
                "captionZh": "泰国普吉岛，巴东海滩。"
            }
        ]
    },
    {
        "id": "krabi",
        "place": "Krabi",
        "placeZh": "甲米",
        "country": "Thailand",
        "countryZh": "泰国",
        "coordinates": [
            8.0108,
            98.8378
        ],
        "title": "Cliffs by the sea",
        "titleZh": "甲米的山与海",
        "description": "Limestone cliffs rising beside the beach in Krabi, with small waves breaking on the sand.",
        "descriptionZh": "石灰岩山壁从海边拔起，浪一阵阵推上沙滩。",
        "photos": [
            {
                "src": "images/life/krabi/limestone-cliffs-and-sea.jpg",
                "alt": "Tree-covered limestone cliffs beside a sandy beach and turquoise water in Krabi",
                "altZh": "甲米海边覆盖绿树的石灰岩山壁、沙滩和蓝绿色海水",
                "caption": "Along the coast of Krabi, Thailand.",
                "captionZh": "泰国甲米，海边的山。"
            }
        ]
    },
    {
        "id": "qingdao",
        "place": "Qingdao",
        "placeZh": "青岛",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            36.0609,
            120.3807
        ],
        "title": "May Fourth Square",
        "titleZh": "五四广场",
        "description": "The red sculpture at May Fourth Square, framed by Qingdao's city skyline.",
        "descriptionZh": "五四广场的红色雕塑，身后是青岛的高楼。",
        "photos": [
            {
                "src": "images/life/qingdao/may-fourth-square.jpg",
                "alt": "The red spiral sculpture at May Fourth Square with modern buildings behind it in Qingdao",
                "altZh": "青岛五四广场上的红色螺旋雕塑，背后是城市高楼",
                "caption": "May Fourth Square, Qingdao.",
                "captionZh": "青岛，五四广场。"
            }
        ]
    },
    {
        "id": "chengdu",
        "place": "Chengdu",
        "placeZh": "成都",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.6568,
            104.0773
        ],
        "title": "The panda at Chengdu IFS",
        "titleZh": "IFS 的大熊猫",
        "description": "Looking up at the giant climbing panda on the facade of Chengdu IFS.",
        "descriptionZh": "走到 IFS 楼下，抬头就能看见那只爬楼的大熊猫。",
        "photos": [
            {
                "src": "images/life/chengdu/ifs-climbing-panda.jpg",
                "alt": "The giant panda sculpture on the facade of Chengdu IFS, viewed from street level",
                "altZh": "从街边仰望成都 IFS 外墙上的巨型熊猫雕塑",
                "caption": "The climbing panda at Chengdu IFS.",
                "captionZh": "成都 IFS，爬楼的大熊猫。"
            }
        ]
    },
    {
        "id": "xian",
        "place": "Xi'an",
        "placeZh": "西安",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            34.2515,
            108.9413
        ],
        "title": "Xi'an, an ancient capital",
        "titleZh": "古都长安",
        "description": "One of China's oldest cities and a former imperial capital, known historically as Chang'an.",
        "descriptionZh": "中国历史最悠久的城市之一，古称长安。",
        "photos": [
            {
                "src": "images/life/xian/city-wall-at-dusk.jpg",
                "alt": "Xi'an city wall and a traditional gate tower above street traffic under an evening sky",
                "altZh": "傍晚天空下的西安城墙和城楼，墙下是街道与车流",
                "caption": "By the city wall, Xi'an.",
                "captionZh": "西安，城墙边的傍晚。"
            },
            {
                "src": "images/life/xian/terracotta-warriors.jpg",
                "alt": "Rows of terracotta warriors in an excavation pit beneath a large exhibition hall roof",
                "altZh": "兵马俑展厅内，成排的陶俑立在巨大的考古坑中",
                "caption": "Terracotta Warriors, Xi'an.",
                "captionZh": "西安，兵马俑。"
            }
        ]
    },
    {
        "id": "ordos",
        "place": "Ordos",
        "placeZh": "鄂尔多斯",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            39.1552,
            109.2967
        ],
        "title": "Sunset on the grassland",
        "titleZh": "草原日落",
        "description": "The last orange light over the grassland in Ordos, with a wooden path leading into the distance.",
        "descriptionZh": "太阳快落下去了，草地上的木栈道一直伸向远处。",
        "photos": [
            {
                "src": "images/life/ordos/grassland-sunset.jpg",
                "alt": "An orange sunset above the grassland in Ordos with a wooden boardwalk in the foreground",
                "altZh": "鄂尔多斯草原上的橙色晚霞，前景是一条木栈道",
                "caption": "Sunset over the grassland, Ordos.",
                "captionZh": "鄂尔多斯草原，日落时分。"
            }
        ]
    },
    {
        "id": "wuhan",
        "place": "Wuhan",
        "placeZh": "武汉",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.548,
            114.2931
        ],
        "title": "Yellow Crane Tower at night",
        "titleZh": "黄鹤楼的夜",
        "description": "Yellow Crane Tower in Wuhan, one of China's Four Great Towers, illuminated against the night sky.",
        "descriptionZh": "昔人已乘黄鹤去，此地空余黄鹤楼。——崔颢《黄鹤楼》",
        "photos": [
            {
                "src": "images/life/wuhan/yellow-crane-tower-at-night.jpg",
                "alt": "Yellow Crane Tower illuminated in gold and red against a dark night sky in Wuhan",
                "altZh": "武汉黄鹤楼在夜空下亮起金色和红色灯光",
                "caption": "Yellow Crane Tower, Wuhan.",
                "captionZh": "武汉，黄鹤楼。"
            }
        ]
    },
    {
        "id": "changsha",
        "place": "Changsha",
        "placeZh": "长沙",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            28.2419,
            112.9723
        ],
        "title": "An evening by the Xiang River",
        "titleZh": "湘江边的傍晚",
        "description": "A quiet riverside stop in Changsha, looking across the Xiang River towards the skyline.",
        "descriptionZh": "在湘江边歇一会儿，隔着水看对岸的天际线。",
        "photos": [
            {
                "src": "images/life/changsha/xiang-river-evening.jpg",
                "alt": "A riverside terrace overlooking the Xiang River and the opposite skyline beneath an evening sky in Changsha",
                "altZh": "长沙湘江边的露台，隔着江面可以看到傍晚的天空和对岸天际线",
                "caption": "By the Xiang River, Changsha.",
                "captionZh": "长沙，湘江边。"
            }
        ]
    },
    {
        "id": "yuncheng",
        "place": "Yuncheng",
        "placeZh": "运城",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            34.8396,
            110.2652
        ],
        "title": "Guanque Tower",
        "titleZh": "鹳雀楼",
        "description": "Guanque Tower in Yongji, Yuncheng, one of China's Four Great Towers and the subject of Wang Zhihuan's poem On the Stork Tower.",
        "descriptionZh": "欲穷千里目，更上一层楼。——王之涣《登鹳雀楼》",
        "photos": [
            {
                "src": "images/life/yuncheng/guanque-tower.jpg",
                "alt": "Guanque Tower rising above a broad stone plaza beneath a cloudy sky in Yongji, Yuncheng",
                "altZh": "运城永济的鹳雀楼，楼前是宽阔的石铺广场，天空布满云层",
                "caption": "Guanque Tower, Yongji, Yuncheng.",
                "captionZh": "运城永济，鹳雀楼。"
            }
        ]
    },
    {
        "id": "yueyang",
        "place": "Yueyang",
        "placeZh": "岳阳",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.3847,
            113.0883
        ],
        "title": "Yueyang Tower",
        "titleZh": "岳阳楼",
        "description": "Yueyang Tower beside Dongting Lake, one of China's Four Great Towers, celebrated in Fan Zhongyan's Memorial to Yueyang Tower.",
        "descriptionZh": "衔远山，吞长江，浩浩汤汤，横无际涯。——范仲淹《岳阳楼记》",
        "photos": [
            {
                "src": "images/life/yueyang/yueyang-tower.jpg",
                "alt": "The golden curved roofs and dark wooden facade of Yueyang Tower with visitors in the foreground",
                "altZh": "岳阳楼金色的弯曲屋顶和深色木构立面，楼前有参观的游客",
                "caption": "Yueyang Tower, Yueyang.",
                "captionZh": "岳阳，岳阳楼。"
            }
        ]
    }
];
