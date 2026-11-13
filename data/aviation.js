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
        "title": "My first A380 flight",
        "titleZh": "第一次乘坐 A380",
        "description": "An Emirates A380 at a gate in Bangkok, before my first flight on the type.",
        "descriptionZh": "第一次坐 A380，登机前隔着航站楼玻璃，先看看这架大家伙。",
        "photos": [
            {
                "src": "images/aviation/BKK/first-a380-flight.jpg",
                "alt": "An Emirates Airbus A380 parked at a gate, viewed through a terminal window in Bangkok",
                "altZh": "从曼谷机场航站楼窗前看到停靠登机口的阿联酋航空 A380",
                "caption": "My first A380 flight, departing from Bangkok.",
                "captionZh": "第一次坐 A380，从曼谷出发。"
            }
        ]
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
        "title": "ICBC at the jet bridge",
        "titleZh": "廊桥上的 ICBC",
        "description": "A Lufthansa jet bridge at Frankfurt Airport, with a familiar ICBC sign.",
        "descriptionZh": "汉莎的廊桥上也能看见工行。ICBC，果然无处不在。",
        "photos": [
            {
                "src": "images/aviation/FRA/frankfurt-airport-icbc.jpg",
                "alt": "A jet bridge at Frankfurt Airport displaying ICBC branding beneath a Lufthansa sign",
                "altZh": "法兰克福机场廊桥上的工行标志，上方是汉莎航空标识",
                "caption": "Frankfurt Airport. ICBC really is everywhere.",
                "captionZh": "法兰克福机场。ICBC，果然无处不在。"
            }
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        "coordinates": [48.1103, 16.5697],
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
        ]
    }
];
