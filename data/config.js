const configData = {
    "language": {
        "enabled": true, // false: English only, hide the language switch (ignores saved Chinese).
        "defaultLanguage": "en", // "en" or "zh-CN"; a visitor's saved choice takes priority when enabled.
        "chineseFont": "source-han-sans" // "source-han-sans" (思源黑体) or "lxgw-wenkai" (霞鹜文楷).
    },
    "siteName": "Yumin's Site",
    "name": "Zheng Yumin",
    "title": "Ph.D. Candidate | Nanyang Technological University",
    "introduction": "Welcome to my homepage!",
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
        "educationGap": 56 // Space from the introduction/buttons to Education.
    },
    "projectDirectory": {
        "cardPublicationStyle": "badge" // "badge": venue/year DOI links only; "full": include paper titles. Cards only.
    },
    "travelMap": {
        "showDates": false // Keep visits undated; set true to display an optional entry date.
    },
    "socialLinks": [
        // { "icon": "fab fa-twitter", "url": "#", "label": "Twitter" },
        // { "icon": "fab fa-github", "url": "#", "label": "GitHub" },
        // { "icon": "fab fa-linkedin", "url": "#", "label": "LinkedIn" },
        { "icon": "fas fa-envelope", "url": "mailto:yumin004@e.ntu.edu.sg", "label": "Email" },
        { "icon": "fab fa-orcid", "url": "https://orcid.org/0000-0002-2341-1967", "label": "ORCID" },
        { "icon": "fas fa-people-group", "url": "https://blogs.ntu.edu.sg/sunwoo/", "label": "Lee's group @ NTU" },
        { "icon": "fas fa-graduation-cap", "url": "https://scholar.google.com/citations?user=Oi2eZTwAAAAJ&hl=en", "label": "Google Scholar" }
    ],
    "aboutMe": [
        "Passionate about Robotics, Signal Processing, and Microelectronics.",
        // "Currently pursuing a Ph.D. at Nanyang Technological University (NTU), Singapore."
    ],
    "education": [
        {
            "year": "2023 - Present",
            "degree": "Ph.D. in Electrical and Electronic Engineering",
            "institution": "Nanyang Technological University (NTU)"
        },
        {
            "year": "2021 - 2022",
            "degree": "M.Sc. in Computer Control and Automation",
            "institution": "Nanyang Technological University (NTU)"
        },
        {
            "year": "2017 - 2021",
            "degree": "B.M. in Financial Management",
            "institution": "Harbin Institute of Technology (HIT)"
        },
        {
            "year": "2017 - 2021",
            "degree": "B.E. in Measurement and Control Technology and Instruments",
            "institution": "Harbin Institute of Technology (HIT)"
        }
    ],
    // "avatar": ""
};
