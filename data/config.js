const configData = {
    "language": {
        "enabled": true, // false: English only, hide the language switch (ignores saved Chinese).
        "translateHomeIntro": false, // 首页个人介绍暂用英文；教育经历仍随全站语言切换。
        "defaultLanguage": "en", // "en" or "zh-CN"; a visitor's saved choice takes priority when enabled.
        "chineseFont": "source-han-sans" // "source-han-sans" (思源黑体) or "lxgw-wenkai" (霞鹜文楷).
    },
    "siteName": "Yumin's Site",
    "greeting": "Hello,|this is", // A pipe keeps the desktop line break; mobile joins the greeting.
    "greetingZh": "嗨，",
    "name": "Zheng Yumin",
    "nameZh": "郑煜旻", // 暂用的中文姓名，可在这里修改。
    "title": "Ph.D. Candidate | Nanyang Technological University",
    "titleZh": "博士研究生 | 南洋理工大学",
    "introduction": "Welcome to my homepage!",
    "introductionZh": "欢迎来到我的个人主页。",
    "email": "yumin004@e.ntu.edu.sg",
    "copyrightYear": 2026,
    "siteLayout": {
        "containerMinWidth": 900, // Fluid sizing starts from this preferred width.
        "containerMaxWidth": 1500, // Maximum container width, including inner padding.
        "fluidSideMargin": 80, // Preferred margin on each side while resizing.
        "contentPadding": 20, // Inner padding on each side of desktop content.
        "mobileContentPadding": 30 // Inner padding on each side on mobile.
    },
    "homeLayout": {
        "verticalMinWidth": 1440, // Browser viewport width in CSS pixels.
        "verticalMinAspectRatio": 1.6, // Viewport width / height; 0 ignores the ratio.
        "verticalContainerMaxWidth": 1320, // Home, navbar and Contact width in vertical mode.
        "columnGap": 48, // Space between the introduction and vertical filmstrip.
        "railMinWidth": 320,
        "railMaxWidth": 360,
        "paddingTop": 72,
        "paddingBottom": 96,
        "mobilePaddingTop": 40,
        "mobilePaddingBottom": 40,
        "mobileFilmGap": 28, // Space before the horizontal filmstrip on mobile.
        "nameGapZh": 40, // 中文欢迎语到姓名之间的留白；不影响头衔与研究方向。
        "mobileNameGapZh": 28,
        "educationGap": 56 // Space from the introduction/buttons to Education.
    },
    "projectDirectory": {
        "cardPublicationStyle": "badge" // "badge": venue/year DOI links only; "full": include paper titles. Cards only.
    },
    "travelMap": {
        "horizontalWrap": true, // Repeat the world horizontally, including countries and photo pins.
        "worldLayout": "pacific", // "pacific": Eurasia left, Americas right; "atlantic": previous layout.
        "showSummary": false, // true: show the place/country counts above the map.
        "showDates": false, // Keep visits undated; set true to display an optional entry date.
        "wheelZoom": {
            "pixelsPerLevel": 300, // 越小越快；常见一格滚轮 120 单位，约缩放 0.4 级。200 接近最初速度。
            "durationMs": 120, // 短暂缓动，兼顾速度与柔和；0 为直接缩放。
            "respectReducedMotion": false, // 地图滚轮保留跟手过渡；设 true 可遵循系统减少动态效果。
            "maxStep": 0.5 // 单个滚轮事件的最大缩放幅度，防止设备上报大数值时突然跳远。
        },
        "placeTransition": {
            "durationMs": 320, // 点击图钉后的平移/缩放缓动；0 为立即定位。
            "respectReducedMotion": false // true：遵循系统减少动态效果；false：保留短暂的位置过渡。
        },
        "markers": { // 图钉与数字聚合圆点，单位 CSS px；不随屏幕 DPI 放大。
            "responsive": true, // false：始终使用 pinWidth / clusterSize。
            "compactBelow": 600, // 地图区域窄于此宽度时使用 compact 尺寸。
            "pinWidth": 24, // 图钉宽度，高度保持原比例；原先是 28。
            "compactPinWidth": 20,
            "clusterSize": 32, // 数字圆点直径；原先是 36。
            "compactClusterSize": 28
        },
        "detail": { // 分级底图：全景用 50m，放大后按需加载 10m。
            "enabled": true, // false: 始终使用 50m。
            "minZoom": 4.5 // 切换到 10m 的缩放级别；缩小半级后恢复 50m，避免反复切换。
        },
        "provinceBorders": { // 中国省界：放大到指定级别才加载和显示。
            "enabled": true,
            "minZoom": 4
        },
        "photoLayout": { // 电脑端按当前照片比例调整地图与相册的分栏；手机仍上下排列。
            "adaptive": true, // false: 恢复固定分栏。
            "targetHeight": 420, // 计算照片理想宽度时的高度上限，CSS px；矮屏会适当缩小。
            "minStoryWidth": 300, // 相册及介绍栏的理想最小宽度，CSS px。
            "maxStoryShare": 0.46 // 横图最多占整个地图/相册区域的比例。
        },
        "labels": { // Zoom levels: larger numbers reveal labels later.
            "motionSettleMs": 40, // 地图停稳后重新避让文字的等待时间，毫秒；移动时文字持续跟随。
            "countryMinZoom": 3,
            "cityMinZoom": 4,
            "cityFontSize": 15,
            "countryOpacity": 0.28,
            "countryMaxFontSize": 64
        },
        "colors": { // 地图配色：海洋、未到访陆地、国界、已到访、选中/悬停、普通及选中图钉。
            "light": {
                "ocean": "#e4eff9",
                "land": "#faf8f3",
                "border": "#b7c5d0",
                "visited": "#a9cabc",
                "selected": "#629987",
                "selectedBorder": "#2e6d5b",
                "provinceBorder": "#496e62",
                "pin": "#285cc4",
                "selectedPin": "#f3c178"
            },
            "dark": {
                "ocean": "#111d30",
                "land": "#293b54",
                "border": "#17263c",
                "visited": "#a96c51",
                "selected": "#e39b79",
                "selectedBorder": "#f7caa6",
                "provinceBorder": "#eed0bc",
                "pin": "#96b8ff",
                "selectedPin": "#f3c178"
            }
        }
    },
    "socialLinks": [
        // { "icon": "fab fa-twitter", "url": "#", "label": "Twitter" },
        // { "icon": "fab fa-github", "url": "#", "label": "GitHub" },
        // { "icon": "fab fa-linkedin", "url": "#", "label": "LinkedIn" },
        { "icon": "fas fa-envelope", "url": "mailto:yumin004@e.ntu.edu.sg", "label": "Email", "labelZh": "电子邮箱" },
        { "icon": "fab fa-orcid", "url": "https://orcid.org/0000-0002-2341-1967", "label": "ORCID", "labelZh": "ORCID" },
        { "icon": "fas fa-people-group", "url": "https://blogs.ntu.edu.sg/sunwoo/", "label": "Lee's group @ NTU", "labelZh": "Lee 课题组 · 南洋理工大学" },
        { "icon": "fas fa-graduation-cap", "url": "https://scholar.google.com/citations?user=Oi2eZTwAAAAJ&hl=en", "label": "Google Scholar", "labelZh": "谷歌学术" }
    ],
    "aboutMe": [
        "Passionate about Robotics, Signal Processing, and Microelectronics.",
        // "Currently pursuing a Ph.D. at Nanyang Technological University (NTU), Singapore."
    ],
    "aboutMeZh": [
        "机器人 | 信号处理 | 微电子与植入式系统"
    ],
    "education": [
        {
            "year": "2023 - Present",
            "yearZh": "2023 — 至今",
            "degree": "Ph.D. in Electrical and Electronic Engineering",
            "degreeZh": "博士研究生（电气与电子工程）",
            "institution": "Nanyang Technological University (NTU)",
            "institutionZh": "南洋理工大学（NTU）"
        },
        {
            "year": "2021 - 2022",
            "yearZh": "2021 — 2022",
            "degree": "M.Sc. in Computer Control and Automation",
            "degreeZh": "理学硕士（计算机控制与自动化）",
            "institution": "Nanyang Technological University (NTU)",
            "institutionZh": "南洋理工大学（NTU）"
        },
        {
            "year": "2017 - 2021",
            "yearZh": "2017 — 2021",
            "degree": "B.M. in Financial Management",
            "degreeZh": "管理学学士（财务管理）",
            "institution": "Harbin Institute of Technology (HIT)",
            "institutionZh": "哈尔滨工业大学（HIT）"
        },
        {
            "year": "2017 - 2021",
            "yearZh": "2017 — 2021",
            "degree": "B.E. in Measurement and Control Technology and Instruments",
            "degreeZh": "工学学士（测控技术与仪器）",
            "institution": "Harbin Institute of Technology (HIT)",
            "institutionZh": "哈尔滨工业大学（HIT）"
        }
    ],
    // "avatar": ""
};
