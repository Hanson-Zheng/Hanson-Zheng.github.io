// Chinese fields stay beside their English source: titleZh, descriptionZh, imageAltZh; links use labelZh.
// Optional date-row buttons: links: [{ label: "Project", url: "project/.../index.html" }].
// Optional link icon: icon: "fas fa-user". Omit links or use [] to hide the buttons.
// Images fill a 16:9 frame without distortion. Set imageFit: "contain" to show a full image.
// imagePosition: "center" (or e.g. "50% 30%") adjusts framing; imageAlt describes the image.
const highlightsData = [
    {
        "date": "2026-11-10",
        "title": "Celebrating a Successful Tape-Out",
        "titleZh": "庆祝流片成功",
        "image": "images/highlight/2026-11-10-chip-tapeout.jpg",
        "imageAlt": "Microscope image of the fabricated chip, showing circuit structures and NTU markings",
        "imageAltZh": "显微镜下的芯片，可见电路结构和南洋理工大学标记",
        "description": "Celebrating a successful chip tape-out. Grateful for the team's hard work and support along the way.",
        "descriptionZh": "流片成功，值得记录的一刻。感谢团队的共同努力与支持。"
    },
    {
        "date": "2026-10-01",
        "title": "2025 EEE Excellent Teaching Assistant Award",
        "titleZh": "获 2025 年度 EEE 优秀助教奖",
        "image": "images/highlight/2026-10-01-ntu-eee-teaching-award.jpg",
        "imageAltZh": "南洋理工大学 2025 年度 EEE 优秀助教奖证书",
        "links": [
            { "label": "Certificate", "labelZh": "获奖证书", "url": "images/highlight/2026-10-01-ntu-eee-teaching-award.jpg" }
        ],
        "description": "Grateful to receive the 2025 EEE Excellent Teaching Assistant Award at NTU. My sincere thanks to the course instructors and teaching team for their guidance and support, and to the students for making teaching such a rewarding learning experience.",
        "descriptionZh": "很荣幸获得南洋理工大学 2025 年度 EEE 优秀助教奖。感谢任课老师和教学团队的指导与支持，也感谢同学们，让助教工作成为一段充实的学习经历。"
    },
    {
        "date": "2026-06-01",
        "title": "ICRA 2026 in Vienna",
        "titleZh": "ICRA 2026 · 维也纳",
        "image": "images/highlight/2026-06-01-icra-vienna-opening.jpg",
        "imageAlt": "Opening ceremony at ICRA 2026 in Vienna, with the IEEE President speaking on stage",
        "imageAltZh": "维也纳 ICRA 2026 开幕式现场，IEEE 主席在台上发言",
        "links": [
            { "label": "Project", "labelZh": "项目详情", "url": "project/microdevice-injection/index.html" }
        ],
        "description": "I was excited to attend ICRA 2026 in Vienna and see the IEEE President in person for the first time. A snapshot from the opening ceremony.",
        "descriptionZh": "在维也纳参加 ICRA 2026，第一次在现场见到 IEEE 主席，很是激动。留一张开幕式的照片作纪念。"
    },
    {
        "date": "2026-05-07",
        "title": "Poster Presentation at ICASSP 2026",
        "titleZh": "在 ICASSP 2026 展示海报",
        "image": "images/highlight/2026-05-07-icassp-barcelona-poster.jpg",
        "imageAlt": "Research poster on display at ICASSP 2026 at the CCIB in Barcelona",
        "imageAltZh": "在巴塞罗那 CCIB 会议中心举办的 ICASSP 2026 上展示的研究海报",
        "links": [
            { "label": "Project", "labelZh": "项目详情", "url": "project/optical-ppm-decoding/index.html" }
        ],
        "description": "Presented our poster at the CCIB in Barcelona during ICASSP 2026.",
        "descriptionZh": "在巴塞罗那 CCIB 会议中心参加 ICASSP 2026，展示我们的海报。"
    },
    {
        "date": "2026-01-31",
        "title": "Paper Accepted in ICRA 2026",
        "titleZh": "论文获 ICRA 2026 录用",
        "image": "images/highlight/2026-01-31-icra-acceptance.jpg",
        "imageAlt": "ICRA 2026 Vienna conference banner featuring a robotic hand and the city skyline",
        "imageAltZh": "ICRA 2026 维也纳会议宣传图",
        "links": [
            { "label": "Project", "labelZh": "项目详情", "url": "project/microdevice-injection/index.html" }
        ],
        "description": "We proposed a vision-servoed micro-manipulation system that enables intuitive, one-step operation for the delivery of nanoscale implantable devices.",
        "descriptionZh": "我们提出了一套视觉伺服微操作系统，通过直观的一步操作完成可植入微小器件的递送。"
    },
    {
        "date": "2026-01-16",
        "title": "Paper Accepted in ICASSP 2026",
        "titleZh": "论文获 ICASSP 2026 录用",
        "image": "images/highlight/2026-01-16-icassp-acceptance.png",
        "imageAlt": "ICASSP 2026 Barcelona conference banner",
        "imageAltZh": "ICASSP 2026 巴塞罗那会议宣传图",
        "links": [
            { "label": "Project", "labelZh": "项目详情", "url": "project/optical-ppm-decoding/index.html" }
        ],
        "description": "We proposed a closed-loop, data-driven method for robust detection and decoding of pulse-position modulation (PPM) signals over an optical link in implanted devices.",
        "descriptionZh": "面向植入器件的光学链路，我们提出了一种闭环、数据驱动的方法，实现对脉冲位置调制（PPM）信号的稳健检测与解码。"
    },
    {
        "date": "2025-12-24",
        "title": "A milestone: MOTE on the cover of Nature Electronics.",
        "titleZh": "MOTE 登上《Nature Electronics》封面",
        "image": "images/highlight/2025-12-24-nature-electronics-cover.png",
        "imageAltZh": "《Nature Electronics》2025 年 12 月刊封面及 MOTE 神经记录工作介绍",
        "links": [
            { "label": "Article", "labelZh": "论文原文", "url": "https://doi.org/10.1038/s41928-025-01484-1" }
        ],
        "description": "Our recent publication was featured on the cover of Nature Electronics (Volume 8 Issue 12, December 2025), highlighting our latest advances in tetherless neural recording.",
        "descriptionZh": "我们的无系留神经记录工作登上《Nature Electronics》2025 年 12 月刊（第 8 卷第 12 期）封面，是 MOTE 研究中值得纪念的一步。"
    },
    {
        "date": "2025-07-10",
        "title": "Passed the Ph.D. Qualifying Examination",
        "titleZh": "通过博士资格考试（QE）",
        "image": "images/highlight/2025-07-10-ntu-phd-qe.jpg",
        "imageAlt": "Presentation room during the Ph.D. Qualifying Examination at NTU",
        "imageAltZh": "南洋理工大学博士资格考试报告时的会议室",
        "description": "Passed my Ph.D. Qualifying Examination (QE) at NTU. Grateful for the guidance and support along the way.",
        "descriptionZh": "通过南洋理工大学博士资格考试（Qualifying Examination，QE）。感谢一路以来的指导与支持。"
    },
    {
        "date": "2025-05-26",
        "title": "ISCAS 2025 in London",
        "titleZh": "ISCAS 2025 · 伦敦",
        "image": "images/highlight/2025-05-26-iscas-london-presentation.jpg",
        "imageAlt": "Presentation slide for our research at ISCAS 2025 in London",
        "imageAltZh": "伦敦 ISCAS 2025 会议上介绍我们研究工作的报告幻灯片",
        "links": [
            { "label": "Project", "labelZh": "项目详情", "url": "project/fb-mote/index.html" },
            { "label": "Rui's website", "labelZh": "Rui 的主页", "icon": "fas fa-user", "url": "https://rui-icd.github.io/index.html" }
        ],
        "description": "A pleasure to attend ISCAS 2025 in London and see Rui present our work. Congratulations to Rui on a great presentation!",
        "descriptionZh": "很高兴在伦敦参加 ISCAS 2025，并在现场听到 Rui 介绍我们的工作。祝贺 Rui 完成了一场精彩的报告！"
    },
    {
        "date": "2024-05-20",
        "title": "MOTE at ISCAS 2024",
        "titleZh": "在 ISCAS 2024 展示 MOTE",
        "image": "images/highlight/2024-05-20-iscas-ntu-booth.jpg",
        "imageAlt": "MOTE research poster displayed at the NTU booth during ISCAS 2024",
        "imageAltZh": "ISCAS 2024 期间，在南洋理工大学展位展出的 MOTE 研究海报",
        "description": "We showcased our MOTE research at the NTU booth during ISCAS 2024.",
        "descriptionZh": "在 ISCAS 2024 期间，我们在南洋理工大学展位展示了 MOTE 相关研究。"
    }
];
