const Data = new Date(),
    Year = Data.getFullYear(),
    Month = Data.getMonth(),
    UTCMonth = Data.getUTCMonth(),
    date = document.querySelector('.date'),
    UTCList = document.querySelectorAll('li.UTCitem'),
    UTCListbox = document.querySelector('ul.UTCListBox'),
    UTCBtn = document.getElementById('UTC'),
    language = document.getElementById('lang'),
    tmFormat = document.getElementById('timeformat'),
    ampm = document.getElementById('ampm');

getMonth(Month);

const Day = Data.getDate() < 10 ? "0" + Data.getDate() : Data.getDate(),
    UTCDay = Data.getUTCDate() < 10 ? "0" + Data.getUTCDate() : Data.getUTCDate();

let UTCNum = 0;
let btnCheck = true;
let tmCheck = false;
let UTCCheck = false;

//Country UTC on English
const UTCNameEu = ["Pacific Standard Time UTC -8",
    "Mountain Standard Time UTC -7",
    "Central Standard Time UTC -6",
    "Eastern Standard Time UTC -5",
    "Greenwich Mean Time UTC +0",
    "Poland Standard Time UTC +1",
    "Mosckow Standard Time UTC +3",
    "China standard time UTC +8",
    "Japan standard time UTC +9",
    "Australian eastern standard time UTC +10"
];

//Country UTC on Russian 
const UTCNameRu = ["Стандартное тихоокеанское время UTC-8",
    "Горное стандартное время UTC -7",
    "Центральное стандартное время UTC-6",
    "Восточное стандартное время UTC -5",
    "Среднее время по Гринвичу UTC +0",
    "Стандартное время Польши UTC +1",
    "Московское стандартное время UTC +3",
    "Стандартное время Китая UTC +8",
    "Японское стандартное время UTC +9",
    "Австралийское восточное стандартное время UTC +10"
];

function getMonth(Month) {
    // Month on ru
    switch (Month) {
        case 0: ruMonth = "Января"; break;
        case 1: ruMonth = "Февраля"; break;
        case 2: ruMonth = "Марта"; break;
        case 3: ruMonth = "Апреля"; break;
        case 4: ruMonth = "Мае"; break;
        case 5: ruMonth = "Июня"; break;
        case 6: ruMonth = "Июля"; break;
        case 7: ruMonth = "Августа"; break;
        case 8: ruMonth = "Сентября"; break;
        case 9: ruMonth = "Октября"; break;
        case 10: ruMonth = "Ноября"; break;
        case 11: ruMonth = "Декабря"; break;
    }
    // Month on en
    switch (Month) {
        case 0: euMonth = "January"; break;
        case 1: euMonth = "February"; break;
        case 2: euMonth = "March"; break;
        case 3: euMonth = "April"; break;
        case 4: euMonth = "May"; break;
        case 5: euMonth = "June"; break;
        case 6: euMonth = "July"; break;
        case 7: euMonth = "August"; break;
        case 8: euMonth = "September "; break;
        case 9: euMonth = "October"; break;
        case 10: euMonth = "November"; break;
        case 11: euMonth = "December"; break;
    }
}

//Choiсe contry UTC time
UTCList.forEach((key, i) => {
    key.addEventListener('click', () => {
        UTCList.forEach(key => {
            key.classList.remove('active');
        });
        key.classList.add('active');
        switch (i) {
            case 0: UTCNum = -8; break;
            case 1: UTCNum = -7; break;
            case 2: UTCNum = -6; break;
            case 3: UTCNum = -5; break;
            case 4: UTCNum = 0; break;
            case 5: UTCNum = 1; break;
            case 6: UTCNum = 3; break;
            case 7: UTCNum = 8; break;
            case 8: UTCNum = 9; break;
            case 9: UTCNum = 10; break;
        }
    })
});

UTCList.forEach((element, id) => {
    element.innerText = UTCNameEu[id];
});

function returnOpacity() {
    date.classList.remove('action');
    if (!tmCheck)
        ampm.classList.remove('hide');
    UTCList.forEach((element) => {
        element.classList.remove('action');
    });
}

// Switch local time to UTC time
UTCBtn.addEventListener('click', () => {
    UTCCheck = !UTCCheck;
    if (!UTCCheck) {
        getMonth(Month);
        UTCBtn.classList.remove("active")
        UTCListbox.classList.add('hide')
    } else {
        getMonth(UTCMonth);
        setTimeout(UTCListbox.classList.remove('hide'), 1000);
        UTCBtn.classList.add("active")
    };
    ampm.classList.add('hide');
    setTimeout(returnOpacity(), 1000);
});

// Преобразование языка в дате + блока UTC
language.addEventListener('click', () => {
    date.classList.add('action');
    let lang = true;
    setTimeout(() => {
        btnCheck = !btnCheck;
    }, 500);
    if (btnCheck) {
        language.classList.add('active');
    } else {
        lang = false;
        language.classList.remove('active');
    }
    setTimeout(returnOpacity, 1000);
    UTCList.forEach((element, id) => {
        element.classList.add('action');
        setTimeout(() => {
            element.innerText = lang ? UTCNameRu[id] : element.innerText = UTCNameEu[id];;
        }, 1000);
    });
});

//Switch format time
tmFormat.addEventListener('click', () => {
    if (!tmCheck) {
        ampm.classList.add('hide');
        tmFormat.classList.add('active');
    } else {
        ampm.classList.remove('hide');
        tmFormat.classList.remove('active');
    }
    tmCheck = !tmCheck;
});

setInterval(() => {
    //UTC time
    let UTCH = Data.getUTCHours() + UTCNum;
    let UTCDayEQ = (UTCH >= 24) ? 1 : 0;

    //Geting classes for part "Clock lines".
    const hh = document.getElementById('hh');
    const ss = document.getElementById('ss');
    const mm = document.getElementById('mm');

    //Geting classes for part "Display time".
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    // 12h local time
    let h = (new Date().getHours() > 12) ? new Date().getHours() - 12 : new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    // 24h local time
    let h24 = new Date().getHours();

    //Geting classes for part "dots".
    let sd = document.querySelector('.sec_dot');
    let md = document.querySelector('.min_dot');
    let hd = document.querySelector('.hour_dot');

    let am = h > 12 ? "PM" : "AM";

    //dot seconds 
    sd.style.transform = `rotateZ(${s * 6}deg)`;
    //dot minutes
    md.style.transform = `rotateZ(${m * 6}deg)`;

    //minutes
    mm.style.strokeDashoffset = 1285 - (1285 * m) / 60;
    //seconds
    ss.style.strokeDashoffset = 1535 - (1535 * s) / 60;


    minutes.innerHTML = (m < 10) ? "0" + m : m;
    seconds.innerHTML = (s < 10) ? "0" + s : s;

    // local time
    if (!UTCCheck) {
        if (!tmCheck) {
            // 12h
            hh.style.strokeDashoffset = 1035 - (1035 * h) / 12
            hd.style.transform = `rotateZ(${h * 30}deg)`;
            hours.innerHTML = h < 10 ? "0" + h : h;
        } else {
            // 24h
            hh.style.strokeDashoffset = 1035 - (1035 * h24) / 24
            hd.style.transform = `rotateZ(${h24 * 15}deg)`;
            hours.innerHTML = h24 < 10 ? "0" + h24 : h24;
        }
        (btnCheck) ?
            //English language
            date.innerHTML = Day + " " + euMonth + " " + Year
            :
            //Russian language
            date.innerHTML = Day + " " + ruMonth + " " + Year
    }
    // UTC Time
    if (UTCCheck) {
        if (!tmCheck) {
            // 12h
            (UTCH > 12 && UTCH < 24) ? UTCH = UTCH - 12 : UTCH;
            hh.style.strokeDashoffset = 1035 - (1035 * UTCH) / 12;
            hd.style.transform = `rotateZ(${((UTCH * 30) > 360 ? (UTCH * 30) - 360 : (UTCH * 30))}deg)`;
            hours.innerHTML = (UTCH < 10) ? "0" + UTCH : UTCH;
        } else {
            // 24h
            (UTCH >= 24) ? UTCH = UTCH - 24 : UTCH;
            hh.style.strokeDashoffset = ((1035 - (1035 * UTCH) / 24));
            hd.style.transform = `rotateZ(${UTCH * 15}deg)`;
            hours.innerHTML = (UTCH < 10) ? "0" + UTCH : UTCH;
        }
        (btnCheck) ?
            //English language
            date.innerHTML = (UTCDay + UTCDayEQ) + " " + euMonth + " " + Year
            :
            //Russian language
            date.innerHTML = (UTCDay + UTCDayEQ) + " " + ruMonth + " " + Year
    }

    //Timeout for animation
    setTimeout(() => {
        ampm.innerHTML = am;
    }, 500);

})
