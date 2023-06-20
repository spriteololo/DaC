var persIframe = top.frames[1];
var actIframe = top.frames[2];

var mypers = {
    0: {nk: "NaN"},
    1: {nk: "BlonduHka"},
    2: {nk: "Стор06"},
    3: {nk: "Хачик"},
    4: {nk: "Нездержаный"},
    5: {nk: "ремон"},
    6: {nk: "~Squall~"},
    7: {nk: "Graf28"},
    8: {nk: "swallow-34"},
    9: {nk: "Звероубийца"},
    10: {nk: "D0m1naT1nG"},
    11: {nk: "sh_wars"},
    12: {nk: "Бомбасик"},
    13: {nk: "Дагестан1"},
    14: {nk: "Zicon"},
    15: {nk: "!!!HalaMadrid!!!"},
    16: {nk: "strong_hold"},
    17: {nk: "Всемирный Катаклизм"},
    18: {nk: "Kinsvater"},
    19: {nk: "злой - призлой"},
    20: {nk: "666swaz666"},
    21: {nk: "-Голодный Скелет-"},
    22: {nk: "Палко"},
    23: {nk: "Triplex"},
    24: {nk: "~Фалкон~"},
    25: {nk: "~ZabaN~"},
    26: {nk: "Гоблин72"},
    27: {nk: "Arimla"},
    28: {nk: "-TheBoss-"},
    29: {nk: "Шикарная стерва"},
    30: {nk: "Пушкин.."},
    31: {nk: "Смертельный_урон"},
    32: {nk: "60pw4"},
};
var nform = document.forms.length - 1;
var melvl = document.getElementsByTagName("select")["lvl"].selectedIndex;

FINDDEM = new Array();
FINDDEM[0] = "(.+)/6(.+)Ур.:0-1 оруж. (.+)станд. x станд.";
FINDDEM[1] = "(.+)/6(.+)Ур.:1-2 оруж. (.+)станд. x станд.";
FINDDEM[2] = "(.+)/6(.+)Ур.:2-3 оруж. (.+)станд. x станд.";
FINDDEM[3] = "(.+)/6(.+)Ур.:2-3 оруж. (.+)станд. x станд.";
FINDDEM[4] = "(.+)/6(.+)Ур.:4-(4|5|6) оруж. (.+)Катакомбы(.+)катакомбы x катакомбы";
FINDDEM[5] = "(.+)/6(.+)Ур.:(4|5)-(5|6|7) оруж. (.+)Катакомбы(.+)катакомбы x катакомбы";
FINDDEM[6] = "(.+)/6(.+)Ур.:(5|6)-(6|7) оруж. (.+)Катакомбы(.+)катакомбы x катакомбы";
FINDDEM[7] = "(.+)/6(.+)Ур.:(5|6)-7 оруж. (.+)Катакомбы(.+)катакомбы x катакомбы";
FINDDEM[8] = "(.+)/10(.+)Ур.:8-(8|9|10) оруж.";
FINDDEM[9] = "(.+)/(8|10|12|14|16)(.+)Ур.:(8|9)-(9|10|11|12|13) оруж.";
FINDDEM[10] = "(.+)/(8|10|12|14|16)(.+)Ур.:(8|9|10)-(10|11|12|13) оруж. (.+)станд. x станд.";
FINDDEM[11] = "(.+)/(8|10|12|14|16)(.+)Ур.:(8|9|10|11)-(11|12|13|14) оруж. (.+)станд. x станд.";
FINDDEM[12] = "(.+)/(10|12|14|16)(.+)Ур.:(8|9|10|11|12|13|14)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[13] = "(.+)/(10|12|14|16)(.+)Ур.:(8|9|10|11|12|13|14)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[14] = "(.+)/(10|12|14|16)(.+)Ур.:(8|9|10|11|12|13|14)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[15] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[16] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[17] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[18] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[19] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[20] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[21] = "(.+)/(10|12|14|16)(.+)Ур.:(12|13|14|15)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[22] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[23] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[24] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[25] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[26] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[27] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[28] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[29] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";
FINDDEM[30] = "(.+)/(10|12|14|16)(.+)Ур.:(10|11|12|13|14|15|16)-(\\d+) оруж.(.+)На ход 1:00";

function CheckPers(d) {
    var breq = document.getElementById("breq" + d).innerHTML;
    for (j in mypers) {
        var reg = new RegExp(mypers[j].nk, "g");
        if (reg.test(breq)) return true;
    }
    return false;
}

function AddDemand() {
    for (j = 0; j < document.getElementsByTagName("input").length; j++) {
        if (document.getElementsByTagName("input")[j].value == "Бой с тенью") {
            return document.getElementsByTagName("input")[j].click();
        }
    }
    maxp = new Array(10, 12, 14, 16);
    minLvl = new Array(9, 10, 11, 12);
    var rnd = Math.round(Math.random() * 3);
    if (nform >= 1) {

        for (i = 1; i <= nform; i++) {
            var breq = document.getElementById("breq" + i).innerHTML;
            var reg = new RegExp(FINDDEM[melvl], "g");
            if (reg.test(breq) && document.getElementById("breq" + i).getElementsByTagName("a").length >= 4) {
                if (!CheckPers(i)) {
                    var control_text = ""
                        + "<span style=background-color:yellowgreen;color:black;>ПРИНЯТЬ_ЗАЯВКУ_4</span>";
                    actIframe.document.getElementById("control_msg").innerHTML = control_text + "<br>";
                    persIframe.document.getElementById("t").innerHTML = control_text;
                    return document.forms[i].submit();
                }
            }
        }

        for (i = 1; i <= nform; i++) {
            var breq = document.getElementById("breq" + i).innerHTML;
            var reg = new RegExp(FINDDEM[melvl], "g");
            if (reg.test(breq)) {
                if (!CheckPers(i)) {
                    var control_text = ""
                        + "<span style=background-color:yellowgreen;color:black;>ПРИНЯТЬ_ЗАЯВКУ</span>";
                    actIframe.document.getElementById("control_msg").innerHTML = control_text + "<br>";
                    persIframe.document.getElementById("t").innerHTML = control_text;
                    return document.forms[i].submit();
                }
            }
        }
    }

    if (melvl >= 19 && melvl <= 30) persIframe.CreateDemand(0, minLvl[rnd], 35, maxp[rnd]);
}

AddDemand();

// if (persIframe.soclanList.length > 1) { // в лечебницу
//     persIframe.setTimeout("top.frames[1].frames['channel_3'].location.href=top.frames[1].med_room;", 1500);
// }