// 每个机场一条记录；id / iata 使用三字码，coordinates 是机场经纬度，不是市中心。
// 中文紧邻英文维护：placeZh / airportZh / titleZh / descriptionZh，以及照片的 altZh / captionZh。
// photos 可放多张照片；机场名可留空；不需要填写旅行日期。
const aviationData = [
    {
        "id": "BKK",
        "iata": "BKK",
        "place": "Bangkok",
        "placeZh": "曼谷",
        "airport": "Suvarnabhumi Airport",
        "airportZh": "素万纳普国际机场",
        "country": "Thailand",
        "countryZh": "泰国",
        "coordinates": [
            13.69,
            100.7501
        ],
        "title": "A380 encounters at BKK",
        "titleZh": "素万纳普的 A380 们",
        "description": "An Emirates A380 before my first flight on the type, and a pair of Qatar Airways A380s sharing the apron.",
        "descriptionZh": "第一次乘坐 A380 的登机口，还有停机坪上两架同框的卡航 A380。",
        "photos": [
            {
                "src": "images/aviation/BKK/first-a380-flight.jpg",
                "alt": "An Emirates Airbus A380 parked at a gate, viewed through a terminal window in Bangkok",
                "altZh": "从曼谷机场航站楼窗前看到停靠登机口的阿联酋航空 A380",
                "caption": "My first A380 flight, departing from Bangkok.",
                "captionZh": "第一次坐 A380，从曼谷出发。"
            },
            {
                "src": "images/aviation/BKK/qatar-a380-pair.jpg",
                "alt": "Two Qatar Airways Airbus A380s on the apron at Bangkok Suvarnabhumi Airport, seen over an aircraft wing",
                "altZh": "越过机翼望向曼谷素万纳普机场停机坪，两架卡塔尔航空 A380 同时入镜",
                "caption": "Two Qatar Airways A380s sharing the apron at BKK. Quite a sight.",
                "captionZh": "素万纳普的停机坪上居然有两架卡航 A380，大场面。"
            }
        ],
        "airportShort": "Suvarnabhumi",
        "airportShortZh": "素万纳普"
    },
    {
        "id": "FRA",
        "iata": "FRA",
        "place": "Frankfurt",
        "placeZh": "法兰克福",
        "airport": "Frankfurt Airport",
        "airportZh": "法兰克福机场",
        "country": "Germany",
        "countryZh": "德国",
        "coordinates": [
            50.0267,
            8.5584
        ],
        "title": "Stripes and familiar tails",
        "titleZh": "条纹“毛毛虫”与熟悉的国航",
        "description": "A striped 'caterpillar' on the apron, with familiar Air China tails in the background.",
        "descriptionZh": "这架条纹“毛毛虫”实在抢眼，后面还有熟悉的国航。",
        "photos": [
            {
                "src": "images/aviation/FRA/striped-livery-and-air-china.jpg",
                "alt": "A yellow-and-white striped aircraft on the apron at Frankfurt Airport, with Air China aircraft in the background",
                "altZh": "法兰克福机场停机坪上的黄白条纹客机，后面还能看到国航飞机",
                "caption": "A striped 'caterpillar' at FRA, with some familiar Air China tails behind it.",
                "captionZh": "这架条纹“毛毛虫”实在抢眼，后面还有熟悉的国航。"
            }
        ],
        "airportShort": "Frankfurt",
        "airportShortZh": "法兰克福"
    },
    {
        "id": "DOH",
        "iata": "DOH",
        "place": "Doha",
        "placeZh": "多哈",
        "airport": "Hamad International Airport",
        "airportZh": "哈马德国际机场",
        "country": "Qatar",
        "countryZh": "卡塔尔",
        "coordinates": [
            25.2731,
            51.6081
        ],
        "title": "An A350 arriving at DOH",
        "titleZh": "A350 进近 DOH",
        "description": "Morning light at Hamad International Airport, with an A350 coming in to land.",
        "descriptionZh": "哈马德机场的清晨，一架 A350 正准备降落。",
        "photos": [
            {
                "src": "images/aviation/DOH/a350-on-final.jpg",
                "alt": "An Airbus A350 on final approach to Hamad International Airport in the early morning, beyond the airport roadway",
                "altZh": "清晨，一架空客 A350 飞过机场道路上方，准备降落多哈哈马德国际机场",
                "caption": "An A350 on final approach to DOH.",
                "captionZh": "清晨，一架 A350 准备降落 DOH。"
            }
        ],
        "airportShort": "Hamad",
        "airportShortZh": "哈马德"
    },
    {
        "id": "CAN",
        "iata": "CAN",
        "place": "Guangzhou",
        "placeZh": "广州",
        "airport": "Guangzhou Baiyun International Airport",
        "airportZh": "广州白云国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            23.3924,
            113.299
        ],
        "title": "An A380 and a 737",
        "titleZh": "A380 与 737 同框",
        "description": "An A380 and a 737 together at Guangzhou Baiyun Airport. Like father and son.",
        "descriptionZh": "A380 和 737 停在一起，像是爸爸带着儿子出门。",
        "photos": [
            {
                "src": "images/aviation/CAN/baiyun-a380-and-737.jpg",
                "alt": "A large Airbus A380 and a smaller Boeing 737 seen together from the terminal at Guangzhou Baiyun Airport",
                "altZh": "从广州白云机场航站楼望去，一架大型 A380 与一架较小的 737 同时出现在画面里",
                "caption": "An A380 and a 737 at Guangzhou Baiyun Airport. Like father and son.",
                "captionZh": "广州白云机场，A380 与 737 的“父子同框”。"
            }
        ],
        "airportShort": "Baiyun",
        "airportShortZh": "白云"
    },
    {
        "id": "MFM",
        "iata": "MFM",
        "place": "Macau",
        "placeZh": "澳门",
        "airport": "Macau International Airport",
        "airportZh": "澳门国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            22.1494,
            113.5914
        ],
        "title": "A special livery in Macau",
        "titleZh": "澳门机场的彩绘机",
        "description": "A colourful special-livery aircraft outside the terminal at Macau International Airport.",
        "descriptionZh": "澳门机场不大，停机坪上这架彩绘机倒是很抢眼。",
        "photos": [
            {
                "src": "images/aviation/MFM/airport-special-livery.jpg",
                "alt": "An aircraft with a colourful special livery parked outside the terminal at Macau International Airport",
                "altZh": "澳门国际机场航站楼前停着一架带有特色彩绘涂装的飞机",
                "caption": "A splash of colour at Macau International Airport.",
                "captionZh": "澳门国际机场，停机坪上的彩绘机。"
            }
        ],
        "airportShort": "Macau",
        "airportShortZh": "澳门"
    },
    {
        "id": "YNT",
        "iata": "YNT",
        "place": "Yantai",
        "placeZh": "烟台",
        "airport": "Yantai Penglai International Airport",
        "airportZh": "烟台蓬莱国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            37.6572,
            120.9872
        ],
        "title": "China Eastern's classic livery",
        "titleZh": "记忆里的东航旧涂装",
        "description": "China Eastern's classic livery on the apron at Yantai Penglai Airport at night.",
        "descriptionZh": "烟台蓬莱机场的夜里，留下了一张东航旧涂装的照片。",
        "photos": [
            {
                "src": "images/aviation/YNT/china-eastern-classic-livery.jpg",
                "alt": "An aircraft in China Eastern's classic livery on a floodlit airport apron at night, seen through a window",
                "altZh": "透过舷窗看到夜间停机坪上的东航旧涂装飞机和机场灯光",
                "caption": "China Eastern's classic livery at Yantai Penglai Airport.",
                "captionZh": "烟台蓬莱机场，东航旧涂装。"
            }
        ],
        "airportShort": "Penglai",
        "airportShortZh": "蓬莱"
    },
    {
        "id": "WNZ",
        "iata": "WNZ",
        "place": "Wenzhou",
        "placeZh": "温州",
        "airport": "Wenzhou Longwan International Airport",
        "airportZh": "温州龙湾国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            27.9106,
            120.8535
        ],
        "title": "Longwan after dark",
        "titleZh": "夜里的龙湾机场",
        "description": "The terminal and apron at Wenzhou Longwan Airport, illuminated by floodlights at night.",
        "descriptionZh": "停机坪的灯亮着，远处航站楼上的 WENZHOU 也很醒目。",
        "photos": [
            {
                "src": "images/aviation/WNZ/longwan-airport-at-night.jpg",
                "alt": "Wenzhou Longwan Airport terminal and apron illuminated by floodlights at night",
                "altZh": "夜间探照灯下的温州龙湾机场航站楼和停机坪",
                "caption": "Wenzhou Longwan Airport at night.",
                "captionZh": "温州，夜里的龙湾机场。"
            }
        ],
        "airportShort": "Longwan",
        "airportShortZh": "龙湾"
    },
    {
        "id": "XMN",
        "iata": "XMN",
        "place": "Xiamen",
        "placeZh": "厦门",
        "airport": "Xiamen Gaoqi International Airport",
        "airportZh": "厦门高崎国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            24.5439,
            118.1275
        ],
        "title": "Through the round windows",
        "titleZh": "高崎机场的圆窗",
        "description": "A XiamenAir aircraft seen through the distinctive round windows at Gaoqi Airport.",
        "descriptionZh": "从高崎机场的大圆窗望出去，正好框住一架厦航飞机。",
        "photos": [
            {
                "src": "images/aviation/XMN/gaoqi-round-windows.jpg",
                "alt": "A blue XiamenAir aircraft on the apron framed by the large circular windows of Gaoqi Airport's terminal",
                "altZh": "厦门高崎机场航站楼的大圆窗，窗外是停机坪上的蓝色厦航飞机",
                "caption": "XiamenAir's United Dream through the round windows at Gaoqi Airport.",
                "captionZh": "厦门高崎机场，圆窗里的厦航“联合梦想号”。"
            }
        ],
        "airportShort": "Gaoqi",
        "airportShortZh": "高崎"
    },
    {
        "id": "VIE",
        "iata": "VIE",
        "place": "Vienna",
        "placeZh": "维也纳",
        "airport": "Vienna International Airport",
        "airportZh": "维也纳国际机场",
        "country": "Austria",
        "countryZh": "奥地利",
        "coordinates": [
            48.1103,
            16.5697
        ],
        "title": "A familiar sight in Vienna",
        "titleZh": "维也纳机场的熟悉身影",
        "description": "An Air China A350 at Vienna Airport. A familiar livery, a long way from home.",
        "descriptionZh": "在维也纳机场看到国航的 A350，熟悉的涂装，格外亲切。",
        "photos": [
            {
                "src": "images/aviation/VIE/air-china-a350-vienna.jpg",
                "alt": "The apron at Vienna Airport seen through a terminal window, with an Air China A350 in the distance",
                "altZh": "透过维也纳机场航站楼玻璃看停机坪，远处停着一架国航 A350",
                "caption": "An Air China A350 at VIE. A familiar sight far from home.",
                "captionZh": "维也纳机场，远处的国航 A350 看着格外亲切。"
            }
        ],
        "airportShort": "Schwechat",
        "airportShortZh": "施韦夏特"
    },
    {
        "id": "PVG",
        "iata": "PVG",
        "place": "Shanghai",
        "placeZh": "上海",
        "airport": "Shanghai Pudong International Airport",
        "airportZh": "上海浦东国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.1434,
            121.805
        ],
        "title": "Thai Airways at Pudong",
        "titleZh": "浦东遇见泰航",
        "description": "A Thai Airways A350-900 at the gate at Shanghai Pudong, with a busy apron beyond.",
        "descriptionZh": "浦东的登机口旁，遇见一架泰航 A350-900。远处的停机坪也很热闹。",
        "photos": [
            {
                "src": "images/aviation/PVG/thai-a350-900-pudong.jpg",
                "alt": "A Thai Airways Airbus A350-900 at a gate at Shanghai Pudong Airport, with other aircraft on the apron",
                "altZh": "上海浦东机场登机口旁的泰国航空 A350-900，远处停机坪上还有其他客机",
                "caption": "A Thai Airways A350-900 at PVG.",
                "captionZh": "浦东机场，泰国航空的 A350-900。"
            }
        ],
        "airportShort": "Pudong",
        "airportShortZh": "浦东"
    },
    {
        "id": "SIN",
        "iata": "SIN",
        "place": "Singapore",
        "placeZh": "新加坡",
        "airport": "Singapore Changi Airport",
        "airportZh": "新加坡樟宜机场",
        "country": "Singapore",
        "countryZh": "新加坡",
        "coordinates": [
            1.3592,
            103.9893
        ],
        "title": "Changi and the airshow",
        "titleZh": "樟宜与航展",
        "description": "Singapore Airlines on the apron, Dreamscape inside Terminal 2, and an RSAF A330 MRTT at the Singapore Airshow.",
        "descriptionZh": "停机坪上的新航、T2 的 Dreamscape 花园，还有新加坡航展上的空军 A330 MRTT。",
        "photos": [
            {
                "src": "images/aviation/SIN/singapore-airlines-a380-and-a350.jpg",
                "alt": "A Singapore Airlines A380 at a gate at Changi Airport, with an A350-900 farther away, seen through terminal windows",
                "altZh": "透过樟宜机场航站楼玻璃看新航 A380，远处还能看到一架 A350-900",
                "caption": "Singapore Airlines' home base: an A380 up close and an A350-900 farther away.",
                "captionZh": "新航大本营，近处是 A380，远处还能看到一架 A350-900。"
            },
            {
                "src": "images/aviation/SIN/terminal-2-dreamscape-garden.jpg",
                "alt": "Dreamscape at Changi Terminal 2, with lush planting, curving walkways and a bright digital sky overhead",
                "altZh": "樟宜机场 T2 的 Dreamscape 花园，绿植、弯曲步道和头顶明亮的数字天幕",
                "caption": "Dreamscape at Changi Terminal 2. Even the sky feels dreamlike.",
                "captionZh": "樟宜 T2 的 Dreamscape，连天空都做得这么梦幻。"
            },
            {
                "src": "images/aviation/SIN/singapore-airshow-rsaf-a330-mrtt.jpg",
                "alt": "Republic of Singapore Air Force A330 MRTT number 765 on static display at the Singapore Airshow, with visitors and helicopters in the foreground",
                "altZh": "新加坡航展静态展示区的新加坡空军 A330 MRTT，机号 765，前方是参观者和直升机",
                "caption": "An RSAF A330 MRTT at the Singapore Airshow's static display, Changi Exhibition Centre.",
                "captionZh": "新加坡航展，近距离看看新加坡空军的 A330 MRTT 多用途加油运输机。"
            }
        ],
        "airportShort": "Changi",
        "airportShortZh": "樟宜"
    },
    {
        "id": "NGB",
        "iata": "NGB",
        "place": "Ningbo",
        "placeZh": "宁波",
        "airport": "Ningbo Lishe International Airport",
        "airportZh": "宁波栎社国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            29.8267,
            121.462
        ],
        "title": "The skyline beyond the apron",
        "titleZh": "停机坪外，就是市区",
        "description": "I rarely spot wide-bodies here, but Ningbo's high-rises are right there beyond the airfield.",
        "descriptionZh": "宽体机不常见，市区的高楼倒是隔着停机坪就能看见。",
        "photos": [
            {
                "src": "images/aviation/NGB/lishe-apron-and-city-skyline.jpg",
                "alt": "A China Eastern aircraft on the apron at Ningbo Lishe Airport, with the city's high-rises beyond the airfield",
                "altZh": "宁波栎社机场停机坪上的东航客机，远处是市区的高楼",
                "caption": "NGB: few wide-bodies in sight, but the city skyline is right there beyond the apron.",
                "captionZh": "栎社机场，宽体机不常见，市区的高楼倒是隔着停机坪就能看见。"
            }
        ],
        "airportShort": "Lishe",
        "airportShortZh": "栎社"
    },
    {
        "id": "HKG",
        "iata": "HKG",
        "place": "Hong Kong",
        "placeZh": "香港",
        "airport": "Hong Kong International Airport",
        "airportZh": "香港国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            22.3089,
            113.915
        ],
        "title": "Whose nose is that?",
        "titleZh": "这个机头是谁家的？",
        "description": "A Boeing 777 at a Hong Kong gate, with a nose cone that does not quite match. Borrowed one, perhaps?",
        "descriptionZh": "这架 777 的鼻子和机身不太搭，是从哪里借来的吗？哈哈。",
        "photos": [
            {
                "src": "images/aviation/HKG/777-with-a-different-nose.jpg",
                "alt": "A Boeing 777 at a Hong Kong Airport gate at night, with a purple-blue nose cone contrasting with its white fuselage",
                "altZh": "香港机场夜间登机口旁的一架波音 777，蓝紫色雷达罩与白色机身很不一样",
                "caption": "A 777 at HKG with a different-coloured nose. Borrowed one, perhaps?",
                "captionZh": "这架 777 的鼻子是从哪里借来的？哈哈。"
            }
        ],
        "airportShort": "Chek Lap Kok",
        "airportShortZh": "赤鱲角"
    },
    {
        "id": "SHA",
        "iata": "SHA",
        "place": "Shanghai",
        "placeZh": "上海",
        "airport": "Shanghai Hongqiao International Airport",
        "airportZh": "上海虹桥国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.1981,
            121.3343
        ],
        "title": "Hello again, C919",
        "titleZh": "C919，又见面了",
        "description": "Another encounter with China Eastern's first delivered C919, this time on the wet apron at Hongqiao.",
        "descriptionZh": "又在虹桥遇见东航的首架 C919，停机坪还是湿漉漉的。",
        "photos": [
            {
                "src": "images/aviation/SHA/china-eastern-first-c919.jpg",
                "alt": "China Eastern's first delivered C919 on the wet apron at Shanghai Hongqiao Airport",
                "altZh": "上海虹桥机场湿漉漉的停机坪上，东航的首架交付 C919",
                "caption": "Hello again, China Eastern's first C919, at SHA.",
                "captionZh": "又见面了，东航的首架 C919。"
            }
        ],
        "airportShort": "Hongqiao",
        "airportShortZh": "虹桥"
    },
    {
        "id": "PEK",
        "iata": "PEK",
        "place": "Beijing",
        "placeZh": "北京",
        "airport": "Beijing Capital International Airport",
        "airportZh": "北京首都国际机场",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            40.0801,
            116.585
        ],
        "title": "Air China at Capital",
        "titleZh": "首都机场的国航",
        "description": "Two big neighbours on the apron, and an A330-300 at a remote stand in the morning light.",
        "descriptionZh": "停机坪上两个大家伙同框，还有晨光里远机位的 A330-300。",
        "photos": [
            {
                "src": "images/aviation/PEK/air-china-a330-dawn.jpg",
                "alt": "Passengers boarding an Air China A330-300 by stairs at a remote stand at Beijing Capital Airport in the morning light",
                "altZh": "晨光中的北京首都机场远机位，旅客正沿舷梯登上一架国航 A330-300",
                "caption": "An Air China A330-300 at a remote stand at PEK. Spot anything different about this one?",
                "captionZh": "晨光、远机位，还有这架国航 A330-300。看看它有什么不一样？"
            },
            {
                "src": "images/aviation/PEK/two-big-air-china-neighbours.jpg",
                "alt": "Two large Air China aircraft parked side by side at Beijing Capital Airport, with apron vehicles in the foreground",
                "altZh": "北京首都机场，两架国航大型客机并排停着，前方是停机坪车辆",
                "caption": "Two big neighbours at PEK.",
                "captionZh": "首都机场，两个大家伙同框。"
            }
        ],
        "airportShort": "Capital",
        "airportShortZh": "首都"
    },
    {
        "id": "BCN",
        "iata": "BCN",
        "place": "Barcelona",
        "placeZh": "巴塞罗那",
        "airport": "Josep Tarradellas Barcelona-El Prat Airport",
        "airportZh": "巴塞罗那埃尔普拉特机场",
        "country": "Spain",
        "countryZh": "西班牙",
        "coordinates": [
            41.2971,
            2.0785
        ],
        "title": "An Air China A350 in Barcelona",
        "titleZh": "巴塞罗那的国航 A350",
        "description": "An Air China A350-900 at the jet bridge at Barcelona-El Prat.",
        "descriptionZh": "巴塞罗那的廊桥旁，又见国航的 A350-900。",
        "photos": [
            {
                "src": "images/aviation/BCN/air-china-a350-barcelona.jpg",
                "alt": "An Air China A350-900 connected to a jet bridge at Barcelona El Prat Airport",
                "altZh": "巴塞罗那埃尔普拉特机场廊桥旁的国航 A350-900",
                "caption": "An Air China A350-900 at BCN.",
                "captionZh": "巴塞罗那机场，国航的 A350-900。"
            }
        ],
        "airportShort": "El Prat",
        "airportShortZh": "埃尔普拉特"
    },
    {
        "id": "CDG",
        "iata": "CDG",
        "place": "Paris",
        "placeZh": "巴黎",
        "airport": "Paris Charles de Gaulle Airport",
        "airportZh": "巴黎戴高乐机场",
        "country": "France",
        "countryZh": "法国",
        "coordinates": [
            49.009,
            2.5541
        ],
        "title": "Concorde and a fortress-like terminal",
        "titleZh": "协和与“堡垒”航站楼",
        "description": "A retired Concorde on display, and the circular Terminal 1 looking almost like a fortress from the apron.",
        "descriptionZh": "一边是退役的协和，一边是像堡垒一样的 T1。戴高乐的两种画风。",
        "photos": [
            {
                "src": "images/aviation/CDG/concorde-on-display.jpg",
                "alt": "A retired Air France Concorde on display at Paris Charles de Gaulle Airport, seen below an aircraft wing",
                "altZh": "从机翼下方望见巴黎戴高乐机场展示的一架退役法航协和飞机",
                "caption": "A retired Concorde on display at CDG.",
                "captionZh": "戴高乐机场，退役的协和静静停在这里。"
            },
            {
                "src": "images/aviation/CDG/terminal-1-from-the-apron.jpg",
                "alt": "The round Terminal 1 building at Paris Charles de Gaulle Airport, seen from an aircraft on the apron",
                "altZh": "从停机坪上的飞机望向巴黎戴高乐机场圆形的 T1 航站楼",
                "caption": "CDG Terminal 1, looking rather like a fortress from the apron.",
                "captionZh": "从停机坪看过去，戴高乐的 T1 像座堡垒。"
            }
        ],
        "airportShort": "Charles de Gaulle",
        "airportShortZh": "戴高乐"
    },
    {
        "id": "MUC",
        "iata": "MUC",
        "place": "Munich",
        "placeZh": "慕尼黑",
        "airport": "Munich Airport (Franz Josef Strauss)",
        "airportZh": "慕尼黑弗朗茨·约瑟夫·施特劳斯机场",
        "country": "Germany",
        "countryZh": "德国",
        "coordinates": [
            48.3538,
            11.7861
        ],
        "title": "An A350 under the apron lights",
        "titleZh": "夜里的汉莎 A350-900",
        "description": "A Lufthansa A350-900 at the gate in Munich, under the apron lights.",
        "descriptionZh": "夜里的慕尼黑机场，登机口外停着汉莎的 A350-900。",
        "photos": [
            {
                "src": "images/aviation/MUC/lufthansa-a350-night.jpg",
                "alt": "A Lufthansa A350-900 at a gate at Munich Airport under apron floodlights at night",
                "altZh": "夜间停机坪灯光下，慕尼黑机场登机口旁的汉莎 A350-900",
                "caption": "A Lufthansa A350-900 at MUC, under the apron lights.",
                "captionZh": "慕尼黑机场，夜里的汉莎 A350-900。"
            }
        ],
        "airportShort": "Franz Josef Strauss",
        "airportShortZh": "弗朗茨·约瑟夫·施特劳斯"
    },
    {
        "id": "XIY",
        "iata": "XIY",
        "place": "Xi'an",
        "placeZh": "西安",
        "airport": "Xi'an Xianyang International Airport",
        "airportZh": "西安咸阳国际机场",
        "airportShort": "Xianyang",
        "airportShortZh": "咸阳",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            34.4471,
            108.7516
        ],
        "title": "An orderly row of China Eastern tails",
        "titleZh": "整整齐齐的东航机队",
        "description": "A neatly lined-up China Eastern fleet at Xi'an Xianyang, seen from the aircraft window.",
        "descriptionZh": "从舷窗望出去，咸阳机场的一排东航停得整整齐齐。",
        "photos": [
            {
                "src": "images/aviation/XIY/china-eastern-fleet-in-a-row.jpg",
                "alt": "A neat row of China Eastern aircraft on the apron at Xi'an Xianyang Airport, seen past the wing of another aircraft",
                "altZh": "越过机翼望向西安咸阳机场停机坪，一排东航客机停得整整齐齐",
                "caption": "An orderly row of China Eastern aircraft at XIY.",
                "captionZh": "西安咸阳，一排整整齐齐的东航。"
            }
        ]
    },
    {
        "id": "LHR",
        "iata": "LHR",
        "place": "London",
        "placeZh": "伦敦",
        "airport": "London Heathrow Airport",
        "airportZh": "伦敦希思罗机场",
        "airportShort": "Heathrow",
        "airportShortZh": "希思罗",
        "country": "United Kingdom",
        "countryZh": "英国",
        "coordinates": [
            51.4706,
            -0.4619
        ],
        "title": "Air China's corner at Heathrow",
        "titleZh": "希思罗的国航角落",
        "description": "A corner of Heathrow filled with familiar Air China aircraft. It almost feels like being back at a home airport.",
        "descriptionZh": "希思罗这一个角落，怎么望过去全是国航？有种回到国内机场的错觉。",
        "photos": [
            {
                "src": "images/aviation/LHR/air-china-corner-at-heathrow.jpg",
                "alt": "Air China aircraft gathered at gates at London Heathrow Airport, seen past an aircraft wing and engine",
                "altZh": "越过机翼和发动机望向伦敦希思罗机场登机口，几架国航飞机聚在一起",
                "caption": "This corner of LHR seems to be all Air China.",
                "captionZh": "希思罗这一个角落，怎么望过去全是国航？"
            }
        ]
    },
    {
        "id": "TFU",
        "iata": "TFU",
        "place": "Chengdu",
        "placeZh": "成都",
        "airport": "Chengdu Tianfu International Airport",
        "airportZh": "成都天府国际机场",
        "airportShort": "Tianfu",
        "airportShortZh": "天府",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.3125,
            104.4413
        ],
        "title": "A panda-covered A350",
        "titleZh": "把熊猫画上 A350",
        "description": "A colourful panda livery on an A350-900 at Tianfu. A very Chengdu welcome.",
        "descriptionZh": "天府机场的 A350-900，机身上画满了可爱的熊猫。很成都。",
        "photos": [
            {
                "src": "images/aviation/TFU/panda-livery-a350-900.jpg",
                "alt": "An A350-900 in a colourful panda livery at a gate at Chengdu Tianfu Airport",
                "altZh": "成都天府机场登机口旁，一架 A350-900 披着彩色熊猫涂装",
                "caption": "A panda-liveried A350-900 at TFU. Hard not to smile at this one.",
                "captionZh": "天府机场，这架 A350-900 的熊猫涂装也太可爱了。"
            }
        ]
    },
    {
        "id": "HGH",
        "iata": "HGH",
        "place": "Hangzhou",
        "placeZh": "杭州",
        "airport": "Hangzhou Xiaoshan International Airport",
        "airportZh": "杭州萧山国际机场",
        "airportShort": "Xiaoshan",
        "airportShortZh": "萧山",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.2295,
            120.434
        ],
        "title": "Shenzhen, spotted in Hangzhou",
        "titleZh": "在杭州遇见“深圳号”",
        "description": "Shenzhen Airlines' A330-300 'Shenzhen' on the apron at Xiaoshan.",
        "descriptionZh": "萧山机场的停机坪上，遇见了深航 A330-300“深圳号”。",
        "photos": [
            {
                "src": "images/aviation/HGH/shenzhen-airlines-a330-shenzhen.jpg",
                "alt": "Shenzhen Airlines' A330-300 named Shenzhen at Hangzhou Xiaoshan Airport, viewed through a terminal window",
                "altZh": "透过航站楼玻璃看杭州萧山机场停机坪，深航 A330-300“深圳号”就在眼前",
                "caption": "Shenzhen Airlines' A330-300 'Shenzhen' at HGH.",
                "captionZh": "在杭州遇见深航 A330-300“深圳号”。"
            }
        ]
    },
    {
        "id": "SZX",
        "iata": "SZX",
        "place": "Shenzhen",
        "placeZh": "深圳",
        "airport": "Shenzhen Bao'an International Airport",
        "airportZh": "深圳宝安国际机场",
        "airportShort": "Bao'an",
        "airportShortZh": "宝安",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            22.6395,
            113.8033
        ],
        "title": "A colourful 787 at Bao'an",
        "titleZh": "宝安机场的彩绘 787",
        "description": "A Hainan Airlines 787-9 in a special livery at Shenzhen Bao'an.",
        "descriptionZh": "宝安机场，遇见海南航空的彩绘 787-9。",
        "photos": [
            {
                "src": "images/aviation/SZX/hainan-special-livery-787-9.jpg",
                "alt": "A Hainan Airlines 787-9 in a special livery on the apron at Shenzhen Bao'an Airport",
                "altZh": "深圳宝安机场停机坪上，海南航空的一架彩绘 787-9",
                "caption": "A Hainan Airlines 787-9 in a special livery at SZX.",
                "captionZh": "宝安机场，海南航空的彩绘 787-9。"
            }
        ]
    },
    {
        "id": "CTU",
        "iata": "CTU",
        "place": "Chengdu",
        "placeZh": "成都",
        "airport": "Chengdu Shuangliu International Airport",
        "airportZh": "成都双流国际机场",
        "airportShort": "Shuangliu",
        "airportShortZh": "双流",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            30.5785,
            103.9471
        ],
        "title": "Air China through the rain",
        "titleZh": "雨中的双流，满眼国航",
        "description": "Raindrops on the window and Air China tails across the apron. Shuangliu feels very much like their home ground.",
        "descriptionZh": "窗上挂满雨滴，停机坪上是一排国航尾翼，双流的主场气氛很足。",
        "photos": [
            {
                "src": "images/aviation/CTU/air-china-tails-in-the-rain.jpg",
                "alt": "Air China aircraft on the apron at Chengdu Shuangliu Airport, seen through a rain-covered window",
                "altZh": "透过满是雨滴的窗户望向成都双流机场停机坪，远处是一排国航飞机",
                "caption": "A rainy day at CTU, with Air China tails all along the apron.",
                "captionZh": "雨中的双流，望出去一排国航，主场气氛很足。"
            }
        ]
    },
    {
        "id": "NKG",
        "iata": "NKG",
        "place": "Nanjing",
        "placeZh": "南京",
        "airport": "Nanjing Lukou International Airport",
        "airportZh": "南京禄口国际机场",
        "airportShort": "Lukou",
        "airportShortZh": "禄口",
        "country": "China",
        "countryZh": "中国",
        "coordinates": [
            31.742,
            118.862
        ],
        "title": "Lukou from above",
        "titleZh": "从空中看禄口",
        "description": "Runways, taxiways and terminals laid out below: Nanjing Lukou from the air.",
        "descriptionZh": "从空中望下去，禄口的跑道、滑行道和航站楼都看得很清楚。",
        "photos": [
            {
                "src": "images/aviation/NKG/lukou-airport-from-above.jpg",
                "alt": "An aerial view of Nanjing Lukou Airport, showing its runways, taxiways and terminal buildings",
                "altZh": "从空中俯瞰南京禄口机场，跑道、滑行道和航站楼尽收眼底",
                "caption": "Nanjing Lukou Airport from above.",
                "captionZh": "空中俯瞰南京禄口机场。"
            }
        ]
    },
    {
        "id": "MNL",
        "iata": "MNL",
        "place": "Manila",
        "placeZh": "马尼拉",
        "airport": "Ninoy Aquino International Airport",
        "airportZh": "马尼拉尼诺伊·阿基诺国际机场",
        "airportShort": "Ninoy Aquino",
        "airportShortZh": "尼诺伊·阿基诺",
        "country": "Philippines",
        "countryZh": "菲律宾",
        "coordinates": [
            14.5086,
            121.02
        ],
        "title": "A big tail outside Terminal 1",
        "titleZh": "T1 窗外的大尾翼",
        "description": "Terminal 1 could use a refresh. Even a 737's tail looks enormous through these windows.",
        "descriptionZh": "T1 确实该翻新一下了，窗外连 737 的尾翼都显得这么高大。",
        "photos": [
            {
                "src": "images/aviation/MNL/terminal-1-and-a-737-tail.jpg",
                "alt": "The interior of Manila Airport Terminal 1, with a large blue 737 tail visible just outside the windows",
                "altZh": "马尼拉机场 T1 内部，窗外蓝色的 737 尾翼显得格外高大",
                "caption": "MNL Terminal 1 could use a refresh. Even a 737's tail looks enormous through these windows.",
                "captionZh": "T1 确实该翻新一下了，窗外连 737 的尾翼都显得这么高大。"
            }
        ]
    },
    {
        "id": "REP",
        "iata": "REP",
        "place": "Siem Reap",
        "placeZh": "暹粒",
        "airport": "Siem Reap International Airport (former)",
        "airportZh": "暹粒国际机场（旧机场）",
        "airportShort": "Siem Reap (former)",
        "airportShortZh": "暹粒（旧）",
        "country": "Cambodia",
        "countryZh": "柬埔寨",
        "coordinates": [
            13.4107,
            103.8121
        ],
        "title": "No jet bridges here?",
        "titleZh": "这里居然没有廊桥？",
        "description": "The red-roofed terminal and open apron at Siem Reap's former airport. A much closer view of the aircraft than a jet bridge would offer.",
        "descriptionZh": "红顶航站楼前是敞开的停机坪。暹粒老机场没有廊桥，倒是能和飞机离得更近一些。",
        "photos": [
            {
                "src": "images/aviation/REP/old-airport-without-jet-bridges.jpg",
                "alt": "The apron and red-roofed terminal at Siem Reap's former airport, seen past an aircraft wing, with aircraft parked away from the building",
                "altZh": "越过机翼望向暹粒旧机场的停机坪和红顶航站楼，飞机停在楼外，没有连接廊桥",
                "caption": "Siem Reap's former airport, REP. No jet bridges here?",
                "captionZh": "暹粒老机场，这里居然没有廊桥？"
            }
        ]
    },
    {
        "id": "DPS",
        "iata": "DPS",
        "place": "Bali",
        "placeZh": "巴厘岛",
        "airport": "I Gusti Ngurah Rai International Airport",
        "airportZh": "巴厘岛伍拉·赖国际机场",
        "airportShort": "Ngurah Rai",
        "airportShortZh": "伍拉·赖",
        "country": "Indonesia",
        "countryZh": "印度尼西亚",
        "coordinates": [
            -8.7475,
            115.1692
        ],
        "title": "Journey to the Future in Bali",
        "titleZh": "在巴厘岛遇见“未来之旅”",
        "description": "An Emirates A380 wearing the Journey to the Future livery, parked at Ngurah Rai.",
        "descriptionZh": "伍拉·赖机场，遇见阿联酋航空“Journey to the Future”涂装的 A380。",
        "photos": [
            {
                "src": "images/aviation/DPS/emirates-a380-journey-to-the-future.jpg",
                "alt": "An Emirates A380 in the Journey to the Future livery at Bali's Ngurah Rai Airport, with the Museum of the Future design on its fuselage",
                "altZh": "巴厘岛伍拉·赖机场，阿联酋航空 A380 披着 Journey to the Future 涂装，机身上画着未来博物馆",
                "caption": "An Emirates A380 in 'Journey to the Future' colours at DPS.",
                "captionZh": "巴厘岛机场，阿联酋 A380 的“Journey to the Future”涂装。"
            }
        ]
    },
    {
        "id": "HAN",
        "iata": "HAN",
        "place": "Hanoi",
        "placeZh": "河内",
        "airport": "Noi Bai International Airport",
        "airportZh": "河内内排国际机场",
        "airportShort": "Noi Bai",
        "airportShortZh": "内排",
        "country": "Vietnam",
        "countryZh": "越南",
        "coordinates": [
            21.2217,
            105.8056
        ],
        "title": "Star Alliance colours and a little chase",
        "titleZh": "星盟涂装，还有一场“小追逐”",
        "description": "Asiana in Star Alliance colours at the gate, and a Singapore Airlines A350 with a Vietnam Airlines A321 nearby.",
        "descriptionZh": "先看到韩亚的星盟涂装，再遇上新航 A350 和越航 A321。看着像是在玩追逐。",
        "photos": [
            {
                "src": "images/aviation/HAN/asiana-star-alliance-at-noi-bai.jpg",
                "alt": "An Asiana Airlines aircraft in Star Alliance livery at a gate at Hanoi Noi Bai Airport, with ground-service equipment in front",
                "altZh": "河内内排机场登机口旁，韩亚航空的星空联盟涂装客机，前方停着地面保障车辆",
                "caption": "Asiana in Star Alliance colours at HAN.",
                "captionZh": "河内内排机场，遇见韩亚航空的星空联盟涂装。"
            },
            {
                "src": "images/aviation/HAN/singapore-a350-vietnam-a321.jpg",
                "alt": "A Vietnam Airlines A321 in the foreground and a Singapore Airlines A350 on a nearby taxiway at Hanoi Noi Bai Airport",
                "altZh": "河内内排机场，近处是越南航空 A321，旁边的滑行道上是一架新加坡航空 A350",
                "caption": "Stop chasing me! A Singapore Airlines A350 and a Vietnam Airlines A321 at HAN.",
                "captionZh": "别追啦！内排机场的新航 A350 和越南航空 A321。"
            }
        ]
    },
    {
        "id": "KUL",
        "iata": "KUL",
        "place": "Kuala Lumpur",
        "placeZh": "吉隆坡",
        "airport": "Kuala Lumpur International Airport",
        "airportZh": "吉隆坡国际机场",
        "airportShort": "KLIA",
        "airportShortZh": "KLIA",
        "country": "Malaysia",
        "countryZh": "马来西亚",
        "coordinates": [
            2.7456,
            101.71
        ],
        "title": "oneworld colours at KLIA",
        "titleZh": "吉隆坡遇见寰宇一家",
        "description": "A Malaysia Airlines aircraft in oneworld livery, parked at the gate at Kuala Lumpur International Airport.",
        "descriptionZh": "吉隆坡机场登机口旁，停着马航的寰宇一家涂装客机。",
        "photos": [
            {
                "src": "images/aviation/KUL/malaysia-airlines-oneworld.jpg",
                "alt": "A Malaysia Airlines aircraft in oneworld livery at a gate at Kuala Lumpur International Airport, seen through terminal windows",
                "altZh": "透过航站楼玻璃看吉隆坡国际机场登机口，一架马来西亚航空客机披着寰宇一家涂装",
                "caption": "Malaysia Airlines in oneworld colours at KUL.",
                "captionZh": "吉隆坡机场，马来西亚航空的寰宇一家涂装。"
            }
        ]
    },
    {
        "id": "PRG",
        "iata": "PRG",
        "place": "Prague",
        "placeZh": "布拉格",
        "airport": "Václav Havel Airport Prague",
        "airportZh": "布拉格瓦茨拉夫·哈维尔机场",
        "airportShort": "Václav Havel",
        "airportShortZh": "瓦茨拉夫·哈维尔",
        "country": "Czechia",
        "countryZh": "捷克",
        "coordinates": [
            50.1008,
            14.26
        ],
        "title": "An A319 without its engines",
        "titleZh": "没了发动机的 A319",
        "description": "A Finnair A319 parked outside a hangar at Prague Airport. The engines are off, but the familiar blue F is still on the tail.",
        "descriptionZh": "布拉格机场的机库外，停着一架发动机已拆下的芬航 A319。尾翼上的蓝色 F 还在。",
        "photos": [
            {
                "src": "images/aviation/PRG/finnair-a319-without-engines.jpg",
                "alt": "A Finnair Airbus A319 outside a hangar at Prague Airport, with its engines removed",
                "altZh": "布拉格机场机库外的一架芬兰航空空客 A319，发动机已拆下",
                "caption": "A Finnair A319 with its engines removed, outside a hangar at PRG.",
                "captionZh": "布拉格机场机库外，遇见一架拆下了发动机的芬航 A319。"
            }
        ]
    }
];
