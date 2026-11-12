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
        "coordinates": [
            3.1596,
            101.7105
        ],
        "title": "KLCC from a rooftop bar",
        "titleZh": "屋顶酒吧看 KLCC",
        "description": "Looking towards the illuminated Petronas Twin Towers and KLCC skyline from a hotel's rooftop bar after dark.",
        "descriptionZh": "夜幕下，在酒店屋顶酒吧远望 KLCC，双子塔亮起了灯。",
        "photos": [
            {
                "src": "images/life/kuala-lumpur/klcc-rooftop-bar-at-night.jpg",
                "alt": "An open-air rooftop bar at night, with tables, balloons and a view of the illuminated Petronas Twin Towers and Kuala Lumpur skyline.",
                "altZh": "夜晚的露天屋顶酒吧，桌椅与气球前方是亮灯的双子塔和吉隆坡天际线。",
                "caption": "KLCC at night, seen from a hotel's rooftop bar in Kuala Lumpur.",
                "captionZh": "吉隆坡，从酒店屋顶酒吧远望夜幕下的 KLCC。"
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
        "place": "Singapore",
        "placeZh": "新加坡",
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
        "title": "Changsha",
        "titleZh": "山水长沙",
        "description": "Views of the city from Mount Yuelu, the Mao Zedong statue on Orange Isle, and an evening by the Xiang River.",
        "descriptionZh": "岳麓山上望城区，橘子洲头走一走，再到湘江边歇歇脚。",
        "photos": [
            {
                "src": "images/life/changsha/xiang-river-evening.jpg",
                "alt": "A riverside terrace overlooking the Xiang River and the opposite skyline beneath an evening sky in Changsha",
                "altZh": "长沙湘江边的露台，隔着江面可以看到傍晚的天空和对岸天际线",
                "caption": "By the Xiang River, Changsha.",
                "captionZh": "长沙，湘江边。"
            },
            {
                "src": "images/life/changsha/yuelu-city-view.jpg",
                "alt": "Changsha's skyline, the Xiang River and Orange Isle seen from the green slopes of Mount Yuelu.",
                "altZh": "从岳麓山的绿树间望向长沙城区、湘江与橘子洲。",
                "caption": "The Xiang River, Orange Isle and Changsha seen from Mount Yuelu.",
                "captionZh": "从岳麓山望向湘江、橘子洲和长沙城区。"
            },
            {
                "src": "images/life/changsha/orange-isle-mao-statue.jpg",
                "alt": "The large stone sculpture of a young Mao Zedong on Orange Isle, with green shrubs beneath a cloudy sky.",
                "altZh": "橘子洲头的青年毛泽东雕像，前方是绿植，天空云层低垂。",
                "caption": "The statue of a young Mao Zedong on Orange Isle, Changsha.",
                "captionZh": "长沙，橘子洲头的青年毛泽东雕像。"
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
    },
    {
        "id": "huaian",
        "place": "Huai'an",
        "placeZh": "淮安",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            33.5084,
            119.1369
        ],
        "title": "Zhou Enlai's former residence",
        "titleZh": "周恩来故居",
        "description": "A visit to Zhou Enlai's former residence in Huai'an, with its simple rooms and old courtyard architecture.",
        "descriptionZh": "在淮安走进周总理故居，屋里的陈设朴素而安静。",
        "photos": [
            {
                "src": "images/life/huaian/zhou-enlai-former-residence.jpg",
                "alt": "Traditional interior of Zhou Enlai's former residence, with wooden furniture, porcelain and a display plaque",
                "altZh": "周恩来故居内的传统房间，摆放着木制家具、瓷器和介绍牌",
                "caption": "Zhou Enlai's former residence, Huai'an.",
                "captionZh": "淮安，周恩来故居。"
            }
        ]
    },
    {
        "id": "qufu",
        "place": "Qufu",
        "placeZh": "曲阜",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            35.6186,
            116.9864
        ],
        "title": "Kong Lin in Qufu",
        "titleZh": "曲阜孔林",
        "description": "The old gateway to Kong Lin, the Cemetery of Confucius, among the trees in Qufu, Jining.",
        "descriptionZh": "济宁曲阜，穿过古树间的门楼，走进孔林。",
        "photos": [
            {
                "src": "images/life/qufu/cemetery-of-confucius.jpg",
                "alt": "Visitors approaching a red-walled traditional gateway at Kong Lin in Qufu beneath tall trees",
                "altZh": "曲阜孔林的红墙门楼，游客从高大的树木间走过",
                "caption": "Kong Lin, Qufu, Jining.",
                "captionZh": "济宁曲阜，孔林。"
            }
        ]
    },
    {
        "id": "taian",
        "place": "Tai'an",
        "placeZh": "泰安",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            36.21,
            117.11
        ],
        "title": "At the foot of Mount Tai",
        "titleZh": "泰山脚下",
        "description": "Stone columns lead the eye towards Mount Tai, rising beyond the square beneath a blue autumn sky.",
        "descriptionZh": "石柱之间望见泰山，山就在眼前，路还要一步步走。",
        "photos": [
            {
                "src": "images/life/taian/mount-tai.jpg",
                "alt": "Stone columns and visitors along a broad plaza with Mount Tai rising in the background beneath a blue sky",
                "altZh": "广场两旁立着石柱，游客走在其间，远处是蓝天下的泰山",
                "caption": "At the foot of Mount Tai, Tai'an.",
                "captionZh": "泰安，泰山脚下。"
            }
        ]
    },
    {
        "id": "jinan",
        "place": "Jinan",
        "placeZh": "济南",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            36.6607,
            117.0094
        ],
        "title": "Baotu Spring",
        "titleZh": "趵突泉",
        "description": "Clear spring water, willow branches and a pavilion beside Baotu Spring in Jinan.",
        "descriptionZh": "泉水清亮，柳枝垂在岸边。到了济南，总要来趵突泉走走。",
        "photos": [
            {
                "src": "images/life/jinan/baotu-spring.jpg",
                "alt": "A traditional pavilion beside the clear water of Baotu Spring, with willow trees and visitors along the bank",
                "altZh": "趵突泉清澈的水面、岸边亭子和垂柳，游客在池边游览",
                "caption": "Baotu Spring, Jinan.",
                "captionZh": "济南，趵突泉。"
            }
        ]
    },
    {
        "id": "yantai",
        "place": "Yantai",
        "placeZh": "烟台",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            37.6572,
            120.9872
        ],
        "title": "A classic livery after dark",
        "titleZh": "东航旧涂装，留个纪念",
        "description": "China Eastern's classic livery on the apron at Yantai Penglai Airport. A night-time keepsake for the aviation enthusiast in me.",
        "descriptionZh": "烟台蓬莱机场，隔着舷窗拍下东航旧涂装。飞友的纪念，有时就是这样一张不太清楚的夜景。",
        "photos": [
            {
                "src": "images/life/yantai/china-eastern-classic-livery.jpg",
                "alt": "An aircraft in China Eastern's classic livery on a floodlit airport apron at night, seen through a window",
                "altZh": "透过舷窗看到夜间停机坪上的东航旧涂装飞机和机场灯光",
                "caption": "China Eastern's classic livery at Yantai Penglai Airport.",
                "captionZh": "烟台蓬莱机场，东航旧涂装。"
            }
        ]
    },
    {
        "id": "el-nido",
        "place": "El Nido",
        "placeZh": "爱妮岛",
        "country": "Philippines",
        "countryZh": "菲律宾",
        "coordinates": [
            11.18,
            119.3905
        ],
        "title": "By the water in El Nido",
        "titleZh": "爱妮岛的海边",
        "description": "Low tide, a long jetty and the limestone hills of El Nido across a quiet stretch of blue water.",
        "descriptionZh": "退潮后的浅滩、伸向海里的栈桥，远处是爱妮岛的山。",
        "photos": [
            {
                "src": "images/life/el-nido/el-nido-shore.jpg",
                "alt": "Shallow clear water and a long jetty with limestone hills beyond the bay in El Nido under a blue sky",
                "altZh": "爱妮岛清浅的海水和长栈桥，海湾对面是蓝天下的石灰岩山峰",
                "caption": "Along the shore in El Nido, Palawan, Philippines.",
                "captionZh": "菲律宾巴拉望，爱妮岛海边。"
            }
        ]
    },
    {
        "id": "weifang",
        "place": "Weifang",
        "placeZh": "潍坊",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            36.671,
            119.0076
        ],
        "title": "TOEFL test day",
        "titleZh": "去潍坊考托福",
        "description": "An admission slip in hand outside the TOEFL test centre in Weifang. A small memory from the road to studying abroad.",
        "descriptionZh": "去潍坊考托福，进考场前留张照片。那时的紧张，现在也成了回忆。",
        "photos": [
            {
                "src": "images/life/weifang/toefl-test-day.jpg",
                "alt": "A test admission slip held outside the entrance to the TOEFL test centre in Weifang",
                "altZh": "潍坊托福考场门口，手中拿着准考证",
                "caption": "Outside the TOEFL test centre, Weifang.",
                "captionZh": "潍坊，托福考场外。"
            }
        ]
    },
    {
        "id": "nanjing",
        "place": "Nanjing",
        "placeZh": "南京",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            32.0221,
            118.7843
        ],
        "title": "An evening by the Qinhuai",
        "titleZh": "秦淮夜色",
        "description": "The illuminated gateway at Nanjing's Confucius Temple, beside the Qinhuai River, with the evening crowds passing beneath it.",
        "descriptionZh": "夫子庙灯火亮起，秦淮河边正热闹。",
        "photos": [
            {
                "src": "images/life/nanjing/confucius-temple-qinhuai.jpg",
                "alt": "A golden-lit traditional gateway in Nanjing's Confucius Temple area with an evening crowd beneath it",
                "altZh": "南京夫子庙夜间亮灯的传统牌坊，下面是来往的人群",
                "caption": "Confucius Temple and the Qinhuai River area, Nanjing.",
                "captionZh": "南京，夫子庙秦淮河畔。"
            }
        ]
    },
    {
        "id": "changzhou",
        "place": "Changzhou",
        "placeZh": "常州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.7157,
            119.9439
        ],
        "title": "Wujin Radio and Television Tower",
        "titleZh": "武进广播电视塔",
        "description": "The colourful lights of Wujin Radio and Television Tower above the streets of Changzhou after dark.",
        "descriptionZh": "走在常州武进的街头，抬头是亮着彩灯的广播电视塔。",
        "photos": [
            {
                "src": "images/life/changzhou/wujin-radio-tv-tower.jpg",
                "alt": "Wujin Radio and Television Tower illuminated in several colours above street-level buildings at night",
                "altZh": "夜间亮着彩色灯光的武进广播电视塔，前景是街边楼房",
                "caption": "Wujin Radio and Television Tower, Changzhou.",
                "captionZh": "常州，武进广播电视塔。"
            }
        ]
    },
    {
        "id": "wenzhou",
        "place": "Wenzhou",
        "placeZh": "温州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            27.9127,
            120.8515
        ],
        "title": "Longwan Airport after dark",
        "titleZh": "龙湾机场的夜晚",
        "description": "Apron lights and the terminal at Wenzhou Longwan Airport, seen from the aircraft window at night.",
        "descriptionZh": "舷窗外是龙湾机场的灯光，又一段旅程从这里接上。",
        "photos": [
            {
                "src": "images/life/wenzhou/longwan-airport-at-night.jpg",
                "alt": "Wenzhou Longwan Airport terminal and apron illuminated by floodlights at night",
                "altZh": "夜间探照灯下的温州龙湾机场航站楼和停机坪",
                "caption": "Wenzhou Longwan Airport at night.",
                "captionZh": "温州，夜里的龙湾机场。"
            }
        ]
    },
    {
        "id": "xiamen",
        "place": "Xiamen",
        "placeZh": "厦门",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            24.5396,
            118.1289
        ],
        "title": "Through Gaoqi's round windows",
        "titleZh": "高崎的圆窗",
        "description": "XiamenAir's United Dream aircraft, framed by Gaoqi Airport's familiar round windows. A little aviation memory from an old terminal worth remembering.",
        "descriptionZh": "高崎熟悉的圆窗，把厦航“联合梦想号”框进了画面。飞机想拍，老航站楼也想多留几张。",
        "photos": [
            {
                "src": "images/life/xiamen/gaoqi-round-windows.jpg",
                "alt": "A blue XiamenAir aircraft on the apron framed by the large circular windows of Gaoqi Airport's terminal",
                "altZh": "厦门高崎机场航站楼的大圆窗，窗外是停机坪上的蓝色厦航飞机",
                "caption": "XiamenAir's United Dream through the round windows at Gaoqi Airport.",
                "captionZh": "厦门高崎机场，圆窗里的厦航“联合梦想号”。"
            }
        ]
    },
    {
        "id": "hangzhou",
        "place": "Hangzhou",
        "placeZh": "杭州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.2421,
            120.2109
        ],
        "title": "A night by the Qiantang River",
        "titleZh": "钱塘江边的夜晚",
        "description": "City lights across the Qiantang River, with their reflections stretching over the dark water in Hangzhou.",
        "descriptionZh": "钱塘江边吹吹风，看对岸的灯光落在水上。",
        "photos": [
            {
                "src": "images/life/hangzhou/qiantang-river-at-night.jpg",
                "alt": "The illuminated Hangzhou skyline across the Qiantang River with reflections on dark water under a cloudy night sky",
                "altZh": "夜色中钱塘江对岸亮灯的杭州楼群，灯光倒映在江面上",
                "caption": "By the Qiantang River, Hangzhou.",
                "captionZh": "杭州，钱塘江边。"
            }
        ]
    },
    {
        "id": "huzhou",
        "place": "Huzhou",
        "placeZh": "湖州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.0466,
            119.9849
        ],
        "title": "Along the shore of Lake Tai",
        "titleZh": "太湖岸边",
        "description": "Colourful bicycle sculptures beside Lake Tai in Huzhou, with a wide grey sky above the water.",
        "descriptionZh": "太湖岸边，一排彩色自行车对着湖面。天阴着，走走也舒服。",
        "photos": [
            {
                "src": "images/life/huzhou/taihu-lakeside.jpg",
                "alt": "Colourful bicycle sculptures on a lakeside promenade in Huzhou with Lake Tai and a cloudy sky behind them",
                "altZh": "湖州太湖岸边的彩色自行车雕塑，背后是湖面和阴云密布的天空",
                "caption": "The shore of Lake Tai, Huzhou.",
                "captionZh": "湖州，太湖沿岸。"
            }
        ]
    },
    {
        "id": "quzhou",
        "place": "Quzhou",
        "placeZh": "衢州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            28.5297,
            118.5653
        ],
        "title": "Mount Jianglang",
        "titleZh": "江郎山",
        "description": "Three distinctive rock peaks beyond a quiet pond at Mount Jianglang in Jiangshan, Quzhou, Zhejiang.",
        "descriptionZh": "到了江郎山，不会就江郎才尽了吧？",
        "photos": [
            {
                "src": "images/life/quzhou/jianglang-mountain.jpg",
                "alt": "Three steep peaks of Mount Jianglang beyond a pond, trees and a large stone marker beneath a hazy sky",
                "altZh": "江郎山的三座陡峭山峰，前景是池塘、树木和大石景观牌",
                "caption": "Mount Jianglang, Jiangshan, Quzhou, Zhejiang.",
                "captionZh": "浙江衢州江山，江郎山。"
            }
        ]
    },
    {
        "id": "taizhou",
        "place": "Taizhou",
        "placeZh": "台州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            28.688,
            120.6062
        ],
        "title": "Shenxianju",
        "titleZh": "神仙居",
        "description": "Rocky peaks and green slopes above the tiled-roof buildings at Shenxianju in Xianju, Taizhou.",
        "descriptionZh": "神仙居，真的有神仙住在这里吗？",
        "photos": [
            {
                "src": "images/life/taizhou/shenxianju.jpg",
                "alt": "Jagged rocky peaks rising above green slopes and traditional tiled-roof buildings at Shenxianju under a blue sky",
                "altZh": "蓝天下的神仙居，奇峰立在绿色山坡上，前景是传统瓦顶建筑",
                "caption": "Shenxianju, Xianju, Taizhou, Zhejiang.",
                "captionZh": "浙江台州仙居，神仙居。"
            }
        ]
    },
    {
        "id": "hanzhong",
        "place": "Hanzhong",
        "placeZh": "汉中",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            33.68,
            106.73
        ],
        "title": "The meadows of Mount Zibai",
        "titleZh": "紫柏山的草甸",
        "description": "Yellow wildflowers among the grasses of Mount Zibai's subalpine meadows in Liuba, Hanzhong.",
        "descriptionZh": "紫柏山的亚高山草甸，绿草间开着一片黄花。",
        "photos": [
            {
                "src": "images/life/hanzhong/zibai-subalpine-meadow.jpg",
                "alt": "Yellow wildflowers in a lush green meadow on Mount Zibai, with wooded slopes and white clouds behind",
                "altZh": "紫柏山绿草间盛开的黄色野花，远处是林木覆盖的山坡和白云",
                "caption": "Subalpine meadow on Mount Zibai, Liuba, Hanzhong.",
                "captionZh": "汉中留坝，紫柏山亚高山草甸。"
            }
        ]
    },
    {
        "id": "luan",
        "place": "Lu'an",
        "placeZh": "六安",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.7484,
            116.5004
        ],
        "title": "A morning in Lu'an",
        "titleZh": "六安的清晨",
        "description": "The morning sun above Lu'an, with trees and quiet streets in the foreground.",
        "descriptionZh": "太阳从楼群旁升起，路上的车还不多。",
        "photos": [
            {
                "src": "images/life/luan/city-at-dawn.jpg",
                "alt": "A low morning sun above the Lu'an skyline, with trees, a road and a few cars in the foreground",
                "altZh": "清晨的太阳升在六安楼群旁，前景是树木、道路和不多的车辆",
                "caption": "Morning light over Lu'an, Anhui.",
                "captionZh": "安徽六安，城市清晨。"
            }
        ]
    },
    {
        "id": "nanyang",
        "place": "Nanyang",
        "placeZh": "南阳",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            32.9943,
            112.554
        ],
        "title": "Colonel Sanders meets Zhuge Liang",
        "titleZh": "拿起羽扇的肯德基爷爷",
        "description": "In Nanyang, Colonel Sanders wears Zhuge Liang-inspired robes and carries a feather fan outside a KFC restaurant.",
        "descriptionZh": "到了南阳，肯德基爷爷也入乡随俗，拿起了诸葛亮的羽扇。",
        "photos": [
            {
                "src": "images/life/nanyang/kfc-zhuge-liang.jpg",
                "alt": "A Colonel Sanders figure in blue traditional robes holding a feather fan outside a KFC restaurant in Nanyang",
                "altZh": "南阳一家肯德基门外，肯德基爷爷穿着蓝色古装，手持羽扇",
                "caption": "A Zhuge Liang-inspired Colonel Sanders in Nanyang.",
                "captionZh": "南阳，诸葛亮造型的肯德基爷爷。"
            }
        ]
    },
    {
        "id": "shiyan",
        "place": "Shiyan",
        "placeZh": "十堰",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            32.5095,
            111.0905
        ],
        "title": "A welcome to Wudang Mountain",
        "titleZh": "武当山脚下",
        "description": "At the foot of Wudang Mountain in Shiyan, a street-side gateway celebrates its Tai Chi tradition.",
        "descriptionZh": "武当山脚下，抬头就是“天下太极出武当”。",
        "photos": [
            {
                "src": "images/life/shiyan/wudang-mountain-gateway.jpg",
                "alt": "A red gateway displaying Chinese words about Wudang's Tai Chi tradition beside a street with scooters and traditional-style buildings",
                "altZh": "武当山脚下写着“天下太极出武当”的红色门楼，街上有电动车和行人",
                "caption": "At the foot of Wudang Mountain, Shiyan, Hubei.",
                "captionZh": "湖北十堰，武当山脚下。"
            }
        ]
    },
    {
        "id": "xiangyang",
        "place": "Xiangyang",
        "placeZh": "襄阳",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            32.0919,
            112.0799
        ],
        "title": "The Flying Horse emblem",
        "titleZh": "马踏飞燕",
        "description": "The Flying Horse tourism emblem on its tall pedestal in Xiangyang, with trees behind it.",
        "descriptionZh": "马踏飞燕立在街头，给襄阳留一张到此一游。",
        "photos": [
            {
                "src": "images/life/xiangyang/flying-horse-emblem.jpg",
                "alt": "A Flying Horse sculpture atop a globe and a tall stone pedestal in Xiangyang, with trees in the background",
                "altZh": "襄阳的马踏飞燕雕塑，立在球形底座和高石台上，背后是树木",
                "caption": "The Flying Horse emblem in Xiangyang, Hubei.",
                "captionZh": "湖北襄阳，马踏飞燕标志。"
            }
        ]
    },
    {
        "id": "hefei",
        "place": "Hefei",
        "placeZh": "合肥",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.8542,
            117.2525
        ],
        "title": "Hefei after dark",
        "titleZh": "合肥街头",
        "description": "Illuminated shop signs, evening traffic and rows of parked scooters on a street in Hefei.",
        "descriptionZh": "合肥街头的夜色，招牌亮着，路边停满了车。",
        "photos": [
            {
                "src": "images/life/hefei/street-at-night.jpg",
                "alt": "Illuminated shops, cars and parked scooters on a Hefei street at night.",
                "altZh": "合肥夜晚的街道，沿街招牌、汽车和停靠的电动车。",
                "caption": "A street in Hefei after dark.",
                "captionZh": "夜晚的合肥街头。"
            }
        ]
    },
    {
        "id": "desaru",
        "place": "Desaru",
        "placeZh": "迪沙鲁",
        "country": "Malaysia",
        "countryZh": "马来西亚",
        "coordinates": [
            1.5506,
            104.2609
        ],
        "title": "By the sea in Desaru",
        "titleZh": "迪沙鲁海边",
        "description": "A Desaru sign hangs between the trees beside the sea on Johor's east coast. A quiet spot by the water, even under grey skies.",
        "descriptionZh": "树下挂着 DESARU 的牌子，往前就是海。阴天也适合在岸边坐一会儿。",
        "photos": [
            {
                "src": "images/life/desaru/desaru-seafront.jpg",
                "alt": "A Desaru Malaysia sign among trees beside a calm sea under cloudy skies.",
                "altZh": "树间挂着迪沙鲁的标牌，前方是阴天下平静的海面。",
                "caption": "The seafront at Desaru, Johor, Malaysia.",
                "captionZh": "马来西亚柔佛，迪沙鲁海边。"
            }
        ]
    },
    {
        "id": "mersing",
        "place": "Mersing",
        "placeZh": "丰盛港",
        "country": "Malaysia",
        "countryZh": "马来西亚",
        "coordinates": [
            2.4299,
            103.8355
        ],
        "title": "Along the coast of Mersing",
        "titleZh": "丰盛港的海边",
        "description": "Clear, shallow water around the rocks along the coast of Mersing, beneath a bright blue sky.",
        "descriptionZh": "礁石间的海水很清，阳光照下来，连水底的石头都看得清楚。",
        "photos": [
            {
                "src": "images/life/mersing/rocky-shore.jpg",
                "alt": "Rocks and clear turquoise water along the Mersing coast beneath a blue sky.",
                "altZh": "丰盛港海边的礁石、清澈的浅水和蓝天。",
                "caption": "The rocky coast of Mersing, Johor, Malaysia.",
                "captionZh": "马来西亚柔佛，丰盛港海边。"
            }
        ]
    },
    {
        "id": "johor-bahru",
        "place": "Johor Bahru",
        "placeZh": "新山",
        "country": "Malaysia",
        "countryZh": "马来西亚",
        "coordinates": [
            1.4668,
            103.7651
        ],
        "title": "Looking towards Singapore",
        "titleZh": "隔着长堤看新加坡",
        "description": "Looking towards Singapore from Johor Bahru, across the Johor–Singapore Causeway.",
        "descriptionZh": "从新山望向新加坡，新柔长堤把两岸接在一起。",
        "photos": [
            {
                "src": "images/life/johor-bahru/view-towards-singapore.jpg",
                "alt": "An elevated view of Johor Bahru's transport buildings and the Causeway towards Singapore.",
                "altZh": "从高处望向新山的交通设施，以及通往新加坡的新柔长堤。",
                "caption": "A view towards Singapore from Johor Bahru.",
                "captionZh": "从新山隔着新柔长堤眺望新加坡。"
            }
        ]
    },
    {
        "id": "xiangtan",
        "place": "Xiangtan",
        "placeZh": "湘潭",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            27.9121,
            112.4898
        ],
        "title": "Mao Zedong's former residence",
        "titleZh": "韶山毛主席故居",
        "description": "Mao Zedong's former residence in Shaoshan, Xiangtan, seen across a pond covered with lotus leaves.",
        "descriptionZh": "故居前的池塘里满是荷叶，黄墙青瓦就在绿意后面。",
        "photos": [
            {
                "src": "images/life/xiangtan/mao-former-residence.jpg",
                "alt": "Mao Zedong's former residence behind a pond filled with green lotus leaves in Shaoshan.",
                "altZh": "韶山毛主席故居，屋前的池塘里长满荷叶。",
                "caption": "Mao Zedong's former residence, Shaoshan, Xiangtan, Hunan.",
                "captionZh": "湖南湘潭韶山，毛主席故居。"
            }
        ]
    },
    {
        "id": "jiujiang",
        "place": "Jiujiang",
        "placeZh": "九江",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.4156,
            115.8835
        ],
        "title": "A quiet street near Mount Lu",
        "titleZh": "年后的庐山街头",
        "description": "A quiet commercial street in the Mount Lu scenic area after Lunar New Year, with shop lights reflected on the wet paving.",
        "descriptionZh": "刚过完年，街上还比较冷清，招牌的灯光映在湿漉漉的石板路上。",
        "photos": [
            {
                "src": "images/life/jiujiang/lushan-rainy-street.jpg",
                "alt": "A quiet rainy commercial street with traditional-style shopfronts, a red bridge and reflections on wet paving near Mount Lu.",
                "altZh": "庐山景区雨天的商业街，沿街店铺、红色小桥与湿石板路上的灯光。",
                "caption": "A rainy day in the Mount Lu scenic area, Jiujiang.",
                "captionZh": "九江庐山，雨天的商业街。"
            }
        ]
    },
    {
        "id": "huangshan",
        "place": "Huangshan",
        "placeZh": "黄山",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.1246,
            118.1704
        ],
        "title": "The Welcoming Pine",
        "titleZh": "黄山迎客松",
        "description": "The Welcoming Pine beside Huangshan's granite cliffs, with cloud-covered peaks in the distance.",
        "descriptionZh": "到了黄山，总要来和迎客松见个面。",
        "photos": [
            {
                "src": "images/life/huangshan/welcoming-pine.jpg",
                "alt": "Huangshan's Welcoming Pine growing beside a granite cliff with misty mountains behind it.",
                "altZh": "花岗岩山崖边的黄山迎客松，远处山峰笼着云雾。",
                "caption": "The Welcoming Pine, Huangshan.",
                "captionZh": "黄山迎客松。"
            }
        ]
    },
    {
        "id": "chizhou",
        "place": "Chizhou",
        "placeZh": "池州",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.4678,
            117.8177
        ],
        "title": "Jiuhua Mountain",
        "titleZh": "九华山",
        "description": "A yellow pavilion above the valleys of Jiuhua Mountain, with layers of distant ridges beneath a cloudy sky.",
        "descriptionZh": "亭阁立在山间，远处的山一层层淡下去。",
        "photos": [
            {
                "src": "images/life/chizhou/jiuhua-mountain.jpg",
                "alt": "A yellow pavilion on Jiuhua Mountain with valleys and distant mountain ridges under cloudy skies.",
                "altZh": "九华山上的黄色亭阁，背后是山谷和层层远山。",
                "caption": "Jiuhua Mountain, Chizhou, Anhui.",
                "captionZh": "安徽池州，九华山。"
            }
        ]
    },
    {
        "id": "hengdian",
        "place": "Jinhua",
        "placeZh": "金华",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.1351,
            120.3114
        ],
        "title": "Hengdian World Studios",
        "titleZh": "横店影视城",
        "description": "Visitors gather beneath the palace gate at Hengdian World Studios, with towers and two large bronze-coloured sculptures framing the entrance.",
        "descriptionZh": "宫门前人来人往，走进横店，像是进了电视剧里的场景。",
        "photos": [
            {
                "src": "images/life/hengdian/film-studio-palace-gate.jpg",
                "alt": "Visitors outside a palace gate at Hengdian World Studios, with stone walls, towers and two large bronze-coloured sculptures under a cloudy sky.",
                "altZh": "阴天下的横店影视城宫门，城墙与楼阁前立着两座青铜色雕塑，游客往来其间。",
                "caption": "A palace gate at Hengdian World Studios.",
                "captionZh": "横店影视城，宫门前。"
            }
        ]
    },
    {
        "id": "shaoxing",
        "place": "Shaoxing",
        "placeZh": "绍兴",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.9948,
            120.5819
        ],
        "title": "Lu Xun's former residence",
        "titleZh": "鲁迅故居",
        "description": "Inside Lu Xun's family home in Shaoxing, with dark timber beams, calligraphy and traditional wooden furniture.",
        "descriptionZh": "走进鲁迅故里，看看课本之外的老屋。",
        "photos": [
            {
                "src": "images/life/shaoxing/lu-xun-family-home.jpg",
                "alt": "A traditional hall at Lu Xun's family home in Shaoxing, with a calligraphy plaque, hanging scrolls and dark wooden furniture.",
                "altZh": "绍兴鲁迅故居的厅堂，匾额与书画下方摆着深色木制桌椅。",
                "caption": "Inside Lu Xun's family home, Shaoxing.",
                "captionZh": "绍兴，鲁迅故居的厅堂。"
            }
        ]
    }
];
