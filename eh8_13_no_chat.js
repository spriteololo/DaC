// dementia and courage v8
var hostname_oil = "cdn.jsdelivr.net/gh/spriteololo/DaC"
console.log(hostname_oil)

var ab_limit_hp = 2;
soclanList = new Array();
soclanList[0] = { nk: "NaN" };
chatRowArray = new Array();
var guard_act = 0;
var guard = 1;
var buttons = 1;
var demand = 0;
var OnOffguard = 0;
var OnOffbuttons = 1;
var LoadImg = "<img src=https://cdn.jsdelivr.net/gh/spriteololo/DaC/img/arrow/loading.gif width=16 height=16 border=0>";
var element_limit_hp = ""
    + "<span style=\"margin-left:4px;padding-left:12px;"
    + "background:#D4D0C8 url(https://" + hostname_oil + "/img/arrow/ico_lifeup.png) no-repeat;"
    + "color:#D4D0C8;border:1px solid black;\" title=\"Лимит HP\">"
    + "<span onclick=\""
    + "this.style.color='red';"
    + "document.getElementById('limitHP50').style.color='black';"
    + "ab_limit_hp=4;"
    + "\" style=\"font-size:8pt;color:black;cursor:pointer;\" id=\"limitHP25\">25%</span>"
    + "<span onclick=\""
    + "this.style.color='red';"
    + "document.getElementById('limitHP25').style.color='black';"
    + "ab_limit_hp=2;"
    + "\" style=\"font-size:8pt;color:black;cursor:pointer;\" id=\"limitHP50\">50%</span>"
    + "</span>";

var MyHome = 0;
var MyClan = 0;
var mbClon = 0;
var mbHP = 0;
var mbStone = 0;
var mbFireBall = 0;
var mbArmor = 0;

var castle_room = "castle_room_1_cid_" + MyClan + ".html?xdac="+Math.random();
var med_room = "medroom_cid_" + MyClan + ".html?xdac="+Math.random();

RoomReg = new Array();
RoomReg[0] = new RegExp("castle_room_1_cid_" + MyClan);
RoomReg[1] = new RegExp("medroom_cid_" + MyClan);

function sendError(msg) {
    var xhr = (window.XMLHttpRequest && !window.ActiveXObject) ? function () {
        return new window.XMLHttpRequest();
    } : function () {
        try { return new window.ActiveXObject('Microsoft.XMLHTTP'); } catch (e) { return null }
    };
    xhr = xhr();
    if (!xhr) return null;
    console.log('err=' + encodeURIComponent(msg));
}

var astral_tm;
var astral_id = 0;
function ChangeAstralLevel(a) { // ASTRAL
    if (astral_id == 0 && a == 0) { // loading
        byid("astral1").style.visibility = "hidden";
        if (ready_mb == 1) return setTimeout("ChangeAstralLevel(0)", 500);
        try {
            var script = frames['channel_2'].document.createElement('script');
            script.type = 'text/javascript';
            script.text = 'function getAstralLevel() {'
                + 'if(document.forms.length!=0) {'
                + 'for(var i= 0; i< document.forms.length; i++) {'
                + 'if(document.forms[i].elements[0].name=="actBattle-ChangeAstralLevel") {'
                + 'parent.astral_id=document.forms[i].elements[0].value;'
                + 'parent.byid("status").innerHTML=document.forms[i].elements[0].value;'
                + 'parent.ChangeAstralLevel(0);'
                + '}}'
                + '} else {'
                + 'parent.ready_mb=1;'
                + 'parent.setTimeout("ChangeAstralLevel(0)",500);'
                + 'parent.byid("status").innerHTML="<i>OpenAstral</i>";'
                + 'document.location="/ability.chtml";'
                + '}'
                + '}'
                + 'getAstralLevel();';
            frames["channel_2"].document.getElementsByTagName("head")[0].appendChild(script);
        } catch (e) {
            ready_mb = 1;
            byid("status").innerHTML = "OpenAstral";
            frames["channel_2"].location = "ability.chtml";
            return setTimeout("ChangeAstralLevel(0)", 500);
        }
    } // end-loading
    if (ready_mb == 0 && astral_id != 0 && a == 0) { // start
        if (UNBS[ME.id]) {
            if (ME.astral_level < 3 && ME.astral > 5 && UNBS[ME.id].flg != 8) {
                ready_mb = 1;
                clearTimeout(astral_tm);
                byid("astral1").style.visibility = "hidden";
                frames["channel_4"].location = "ability.chtml?actBattle-ChangeAstralLevel=" + astral_id + "&level="
                    + (ME.astral_level + 1);
                setTimeout(""
                    + "byid('astral1').style.visibility='visible';"
                    + "byid('astral1').innerHTML='astral '+(ME.astral_level+1);", 188000);
                astral_tm = setTimeout("ChangeAstralLevel(1)", 188000);
            }
        }
        if (OnOffguard == 0) setTimeout("actReload()", 1500);
    }
    if (a == 1) { // a-stop
        if (ME.astral_level != 0 && DEAD[ME.id] && FLDX + FLDY != 27) {
            frames["channel_4"].location.href = ""
                + "ability_type_common.chtml?actBattle-ChangeAstralLevel=" + astral_id + "&level="
                + (ME.astral_level - 1);
            byid("status").style.backgroundColor = "lime";
            byid("status").innerHTML = "Astral:" + (ME.astral_level - 1);
            byid("astral1").style.visibility = "hidden";
            return astral_tm = setTimeout("ChangeAstralLevel(1)", 188000);
        }
        astral_tm = setTimeout("ChangeAstralLevel(1)", 60000);
    } // end-a-stop
    if (a == 2) { // hover
        if (byid("astral1").style.borderStyle == "dashed") {
            byid("astral1").style.borderStyle = "solid";
        } else {
            byid("astral1").style.borderStyle = "dashed";
        }
        setTimeout("ChangeAstralLevel(2)", 777);
    } // end-hover
}

function MyTime(a) { // Чат
    if (a == 0) {
        var breq = top.frames["d_chat"].document.getElementById("messages").innerHTML;
        var reg = new RegExp("(mytime|Голос)", "g");
        var regg = new RegExp("(Длительность Вашей травмы|Читайте новости|присоединение к захвату)", "g");
        if (regg.test(breq)) {
            top.frames["d_chatact"].chclear();
            top.frames["d_chatact"].chclear();
        }
        if (reg.test(breq)) {
            return true;
        }
    }
    if (a == 1) {
        var breq = top.frames["d_chat"].document.getElementById("messages").innerHTML;
        var reg = new RegExp("На форпост", "g");
        if (reg.test(breq)) {
            return true;
        }
    }
    if (a == 3 && top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span").length != 0) {
        for (var i = 0; i < top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span").length; i++) {
            var chat_msg = top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span")[i].id;
            var chatReg = /row(\d+)/;
            var chatRowArray = chatReg.exec(chat_msg);
            // check-messages
            var breq = top.frames["d_chat"].document.getElementById("row" + chatRowArray[1]).innerHTML;
            var reg = new RegExp("(" + ME.nk + "|На форпост)", "g");
            if (reg.test(breq) && !top.frames["d_pers"].chatRowArray[chatRowArray[1]] && false) {
                document.getElementById("logb").innerHTML = ""
                    + "<a href=\"#\" onclick=\""
                    + "MyTime(4);"
                    + "this.innerHTML='Готов';"
                    + "return false;\">"
                    + "<b>[Принять чат]</b></a>";
                return false;
            }
        }
        return false;
    }
    if (a == 4 && top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span").length != 0) {
        for (var i = 0; i < top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span").length; i++) {
            var chat_msg = top.frames["d_chat"].document.getElementById("messages").getElementsByTagName("span")[i].id;
            var chatReg = /row(\d+)/;
            var chatRowArray = chatReg.exec(chat_msg);
            // clear-messages
            var breq = top.frames["d_chat"].document.getElementById("row" + chatRowArray[1]).innerHTML;
            var reg = new RegExp("(" + ME.nk + "|На форпост)", "g");
            if (reg.test(breq) && !top.frames["d_pers"].chatRowArray[chatRowArray[1]]) {
                top.frames["d_pers"].chatRowArray[chatRowArray[1]] = 1;
            }
        }
    }
}

function NewButton(a, width, color, brColor, bgColor, hovColor, txt, click, title, id) {
    if (a == 0) {
        return "<a href=javascript:void(0); onclick=\"" + click + "\" title=\"" + title + "\">"
            + "<div style=\"margin-right:4px;width:" + width + ";"
            + "border:1px solid " + brColor + ";background-color:" + bgColor + ";color:" + color + ";"
            + "font-size:12px;font-family:Arial;text-align:center;"
            + "float:left;cursor:hand;\" "
            + "id=" + id + ">" + txt + "</div></a>";
    }
}

AddIFrame("channel_2");
var cast_load_count = 0;
var ready_mb = 0;
var f5_mbCast = 0;
var yes_mbCast = 1;
var move_round = 0;
var MyX = 0;
var MyY = 0;
// READYMB
var a_iframe = document.getElementsByTagName("iframe")["channel_2"];
a_iframe.onload = function () {
    top.frames["d_act"].ready_mb = 0;
    top.frames["d_act"].cast_load_count++;
};
// END-READYMB
function UseMagCast(a, b, id, mb_x, mb_y) { // Magic-Book-Cast
    if (a == 777) {
        cast_load_count = -1;
        return frames["channel_2"].location = "img/persmanas.gif";
    }
    try { // OpenMagBook
        if (location.host != "forest.apeha.ru") {
            var mb_code = frames["channel_2"].document.forms[0].code.value;
            byid("status").innerHTML = mb_code;
            byid("MyClon").style.visibility = "visible";
        } else { var mb_code = "forest.apeha.ru"; }
    } catch (e) {
        mb_parm = new Array(a, b, id, mb_x, mb_y);
        byid("status").style.backgroundColor = "skyblue";
        byid("status").innerHTML = "OpenMagBook";
        byid("buttons").style.visibility = "hidden";
        byid("MyClon").style.visibility = "hidden";
        if (a == 2) {
            if (ready_mb == 0) {
                ready_mb = 1;
                frames["channel_2"].location = "ability.chtml";
            }
        } else {
            if (ready_mb == 0) {
                ready_mb = 1;
                frames["channel_2"].location = "magbook.chtml";
            }
        }
        if (UNBS[ME.id] && UNBS[ME.id].flg != 8) {
            var speed_cast = (f5_mbCast) ? 1000 : 500;
            document.getElementById("status").innerHTML = "OpenMagBook:" + cast_load_count;
            return setTimeout("UseMagCast(mb_parm[0],mb_parm[1],mb_parm[2],mb_parm[3],mb_parm[4])", speed_cast);
        } else { return byid("status").innerHTML = "CloseMagBook"; }
    }
    if (a == 0) { // на себя
        if (b == 0) { // хп, панцирь
            // FORM-CAST
            var addform = frames["channel_2"].document.createElement("span");
            addform.innerHTML = ""
                + "<form name=castform method=post action=magbook.chtml>"
                + "<input name=actBattle-UseCast type=hidden value=" + id + ">"
                + "<input name=code type=hidden value=" + mb_code + ">"
                + "<input name=bid type=hidden value=" + BID + ">"
                + "</form>";
            frames["channel_2"].document.getElementsByTagName("head")[0].appendChild(addform);
            var chform = frames["channel_2"].document.forms["castform"];
            chform.submit();
            // END-FORM-CAST
        }
        if (b == 1) { // проклятие
            frames["channel_2"].location = "magbook.html?actBattle-UseCast=" + id + "&bid=" + BID + "&fl=1&code=" + mb_code + "";
        }
    }
    if (a == 1) { // на врага
        if (b == 0) { // клон
            if (f5_mbCast == 1) { // F5-wait
                f5_mbCast = 0;
                mb_parm = new Array(a, b, id, mb_x, mb_y);
                byid("status").style.backgroundColor = "orange";
                byid("status").innerHTML = "F5";
                byid("buttons").style.visibility = "hidden";
                byid("MyClon").style.visibility = "hidden";
                return setTimeout("UseMagCast(mb_parm[0],mb_parm[1],mb_parm[2],mb_parm[3],mb_parm[4])", 777);
            }
            byid("status").style.backgroundColor = "skyblue";
            byid("status").innerHTML = mb_code;
            // FORM-CAST-CLONE
            var addform = frames["channel_2"].document.createElement("span");
            addform.innerHTML = ""
                + "<form name=castform method=post action=magbook_actBattle-FieldCast_" + id + ".chtml?code=" + mb_code + ">"
                + "<input name=bid type=hidden value=" + BID + ">"
                + "<input name=ex type=hidden value=" + mb_x + ">"
                + "<input name=ey type=hidden value=" + mb_y + ">"
                + "</form>";
            frames["channel_2"].document.getElementsByTagName("head")[0].appendChild(addform);
            var chform = frames["channel_2"].document.forms["castform"];
            chform.submit();
            // END-FORM-CAST-CLONE
        }
        if (b == 1) { // магудар
            frames["channel_2"].location = "magbook_actBattle-UseCast_" + id + ".html?bid=" + BID + "&uid=" + ENEMY + "&code=" + mb_code + "";
        }
    }
    if (a == 2) {
        if (b == 0) { // испепеление, выкинуть
            frames["channel_2"].location = "ability_actBattle-UseCast_" + id + ".html?bid=" + BID + "&uid=" + ENEMY + "&code=" + mb_code + "";
        }
        if (b == 1) { // пит
            frames["channel_2"].location = "ability.html?actBattle-UseCast=" + id + "&bid=" + BID + "&pettarget=1&tactic=3&code=" + mb_code + "";
        }
    }
    byid("buttons").style.visibility = "hidden";
    setTimeout("UseMagCast(777)", 1000);
    setTimeout("actReload()", 500);
    yes_mbCast = 0;
    cast_load_count = 0;
}

function MapClick(ev) { // js-game
    ev = ev || event;
    var x = (ev.x || ev.clientX) + document.body.scrollLeft;
    var y = (ev.y || ev.clientY) + document.body.scrollTop;
    var el = byid('map');
    while (el) {
        x -= el.offsetLeft;
        y -= el.offsetTop;
        el = el.offsetParent;
    }
    var row = Math.floor(y / 30);
    var col = Math.floor((x - ((row % 2 == 0) ? 0 : 17)) / 34);

    if ((col >= 0) && (row >= 0) && (col < FLDX) && (row < FLDY)) {
        var mrkr = byid('mrkr');
        mrkr.style.top = (50 + 30 * row);
        mrkr.style.left = (25 + 34 * col + (row % 2) * 17);
    }
    ENEMY = 0;
    OBST = -1;
    EX = col;
    EY = row;
    byid("mrkr").style.visibility = "visible";
    MyX = EX;
    MyY = EY;
    // move-click
    if (yes_mbCast == 0) move_round++;
    if (move_round > 0 && UNBS[ME.id] && UNBS[ME.id].flg != 8 &&
        top.frames["d_pers"].document.CrDemand.abMoveClick.value == 1) {
        byid("status").style.backgroundColor = "yellow";
        byid("status").innerHTML = "move";
        PrepareReq("bid=" + BID + "&x=" + EX + "&y=" + EY + "&actBattle-Move=1");
        move_round = 0; yes_mbCast = 1;
    }
    // end-move-click
}
function UBClick() {
    var nb = this.id;
    SelectUB(nb.substring(3));
    MyX = UNBS[nb.substring(3)].x;
    MyY = UNBS[nb.substring(3)].y;
}
function OBClick() {
    var nb = this.id;
    SelectOB(nb.substring(3));
    MyX = OBSTACLES[nb.substring(3)].x;
    MyY = OBSTACLES[nb.substring(3)].y;
}

function AddIFrame(name) {
    var ifchannel = document.createElement("iframe");
    ifchannel.name = name;
    ifchannel.id = name;
    ifchannel.style.visibility = "hidden";
    ifchannel.style.width = "1px";
    ifchannel.style.height = "1px";
    document.body.appendChild(ifchannel);
}
AddIFrame("channel_3");

function AddJS(xfile) {
    var script = top.frames["d_act"].document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/gh/spriteololo/DaC/" + xfile + "?xdac=" + Math.random();
    top.frames["d_act"].document.body.appendChild(script);
}

function CreateDemand(map, minlvl, maxlvl, maxp) {
    var game = "arena_room_1_bmode_3.html";
    if (map == 9) { game = "arena_room_1_bmode_7.html"; }
    if (!top.frames["d_act"].document.getElementById("control_msg")) {
        // msg-log
        var element = top.frames["d_act"].document.getElementsByTagName("b")[1];
        var text = top.frames["d_act"].document.createElement("span");
        text.id = "control_msg";
        text.style.background = "yellow";
        text.innerHTML = "msg";
        element.parentNode.insertBefore(text, element);
        // end-msg-log
    }
    var control_text = ""
        + "<span style=background-color:yellow;color:black;>СОЗДАТЬ_ЗАЯВКУ</span>"
        + "<form name=cd action=" + game + " method=post>"
        + "<input type=hidden name=Battle{fist} value=0>"
        + "<input type=hidden name=Battle{blood} value=1>"
        + "<input type=hidden name=Battle{minlvl} value=" + minlvl + ">"
        + "<input type=hidden name=Battle{maxlvl} value=" + maxlvl + ">"
        + "<input type=hidden name=Battle{maxp} value=" + maxp + ">"
        + "<input type=hidden name=Battle{tm} value=60>"
        + "<input type=hidden name=Battle{mapid} value=" + map + ">"
        + "<input type=hidden name=Battle{bpos1} value=0>"
        + "<input type=hidden name=Battle{bpos2} value=0>"
        + "<input type=hidden name=Battle{obst} value=0>"
        + "<input type=hidden name=Battle{vall} value=0>"
        + "<input type=hidden name=actBattle-CreateHeader value=1>"
        + "</form><br>";
    document.getElementById("t").innerHTML = ""
        + "<span style=background-color:yellow;color:black;>СОЗДАТЬ_ЗАЯВКУ</span>";
    top.frames["d_act"].document.getElementById("control_msg").innerHTML = control_text;
    var chform = top.frames["d_act"].document.forms["cd"];
    chform.submit();
    top.frames["d_act"].document.body.appendChild(chform);
}

function MainSwitch(t) {
    if (t == 0) {
        document.getElementById("rjob").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(1);>";
    }
    if (t == 1) {
        document.getElementById("rjob").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(0);>";
    }
    if (t == 2) {
        OnOffguard = 0;
        document.getElementById("rgua").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(3);MainSwitch(4);>";
    }
    if (t == 3) {
        OnOffguard = 1;
        document.getElementById("rgua").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(2);>";
    }
    if (t == 4) {
        OnOffbuttons = 0;
        document.getElementById("rbat").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(5);>";
    }
    if (t == 5) {
        OnOffbuttons = 1;
        document.getElementById("rbat").innerHTML = ""
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(4);>";
    }
}

function foundry(tm) {
    var span = document.createElement("span");
    document.body.appendChild(span);
    if (tm == 10) {
        document.getElementById("melt").innerHTML = ""
            + "<table border=0>"
            + "<tr>"
            + "<td>"
            + "<span style=\"display:block;width:48;height:22;"
            + "background:url(https://" + hostname_oil + "/img/arrow/radar.gif) no-repeat right center;\" id=\"rjob\">"
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(1);>"
            + "</span>"
            + "</td>"
            + "<td>"
            + "<span style=\"display:block;width:48;height:22;"
            + "background:url(https://" + hostname_oil + "/img/arrow/fight.gif) no-repeat right center;\" id=\"rgua\">"
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(3);MainSwitch(4);>"
            + "</span>"
            + "</td>"
            + "<td>"
            + "<span style=\"display:block;width:48;height:22;"
            + "background:url(https://" + hostname_oil + "/img/arrow/battle.gif) no-repeat right center;\" id=\"rbat\">"
            + "<img border=0 src=https://" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(4);>"
            + "</span>"
            + "</td>"
            + "<td>"
            + "<div style=\"margin-top:0px;margin-left:40px;width:7px;height:20px;"
            + "background-color:skyblue;border-color:black;border-style:solid;"
            + "border-width:1px 1px 1px 0px;position:absolute;\" id=\"auto_sys\">"
            + "<div style=\"width:7px;height:6px;background-color:skyblue;border-width:0px;\"></div>"
            + "<div style=\"width:7px;height:7px;background-color:gold;border-width:0px;\"></div>"
            + "<div style=\"width:7px;height:7px;background-color:white;border-width:0px;\"></div>"
            + "</div>"
            + "<input name=\"act_castle\" type=\"button\" value=\"0\" "
            + "onclick=\"if(this.value==0){"
            + "this.style.background='gold url(http://apeha.ru/img/smode-3.gif) no-repeat';"
            + "this.value=1;this.blur();"
            + "}else{"
            + "this.blur();"
            + "byid('auto_sys').style.borderColor='black';"
            + "this.style.background='#D4D0C8 url(http://apeha.ru/img/smode-3.gif) no-repeat';"
            + "this.value=0;this.style.borderColor='black';};\" "
            + "style=\"width:48px;height:22px;background:url(http://apeha.ru/img/smode-3.gif) no-repeat;"
            + "border:1px solid black;color:#0000FF;padding-left:24px;cursor:help\" "
            + "id=\"act_castle\" title=\"из Замка в бой\">"
            + "</td>"
            + "</tr>"
            + "<td>"
            + "<input type=\"text\" name=\"abround\" value=\"10\" onmouseover=\"this.focus();this.select()\" "
            + "style=\"margin-top:4px;margin-left:4px;width:18px;height:15px;font-size:8pt;"
            + "background-color:#D4D0C8;border:1px solid black;position:absolute;\">"
            + "<div style=\"width:48px;height:22px;"
            + "background:url(https://" + hostname_oil + "/img/arrow/fight.gif) no-repeat;\" title=\"Лимит раундов\">"
            + "</div>"
            + "</td>"
            + "<td>"
            + "<div onclick=\"document.CrDemand.clonsum.click();\" "
            + "style=\"margin-top:2px;margin-left:0px;width:15px;height:12px;"
            + "background:url(https://" + hostname_oil + "/img/arrow/ico_unis.png) no-repeat;"
            + "border-width:0px 0px 0px 0px;position:absolute;\" title=\"Лимит врагов\"></div>"
            + "<div onclick=\"document.CrDemand.abHP.click();\" "
            + "oncontextmenu=\"byid('t').innerHTML=element_limit_hp;"
            + "if(ab_limit_hp==2){byid('limitHP50').style.color='red';}"
            + "if(ab_limit_hp==4){byid('limitHP25').style.color='red';}"
            + "return false;\" "
            + "style=\"margin-top:2px;margin-left:18px;width:15px;height:12px;"
            + "background:url(https://" + hostname_oil + "/img/arrow/ico_lifeup.png) no-repeat;"
            + "border-width:0px 0px 0px 0px;position:absolute;\" title=\"Лимит HP\"></div>"
            + "<input name=\"clonsum\" type=\"button\" value=1 onclick=\""
            + "if(this.value==0){"
            + "this.value=1;"
            + "this.style.color='gold';"
            + "this.style.backgroundColor='gold';"
            + "}else{"
            + "this.value=0;"
            + "this.style.color='#D4D0C8';"
            + "this.style.backgroundColor='#D4D0C8';};\" "
            + "style=\"padding:0px;width:15px;height:22px;"
            + "color:gold;background-color:gold;border:1px solid black;\" title=\"Лимит врагов\">"
            + "<input name=\"abHP\" type=\"button\" value=0 onclick=\""
            + "if(this.value==0){"
            + "this.value=1;"
            + "this.style.color='gold';"
            + "this.style.backgroundColor='gold';"
            + "}else{"
            + "this.value=0;"
            + "this.style.color='#D4D0C8';"
            + "this.style.backgroundColor='#D4D0C8';};\" "
            + "oncontextmenu=\"byid('t').innerHTML=element_limit_hp;"
            + "if(ab_limit_hp==2){byid('limitHP50').style.color='red';}"
            + "if(ab_limit_hp==4){byid('limitHP25').style.color='red';}"
            + "return false;\" "
            + "style=\"margin-left:2px;padding:0px;width:15px;height:22px;"
            + "color:#D4D0C8;background-color:#D4D0C8;border:1px solid black;\" title=\"Лимит HP\">"
            + "</td>"
            + "<td>"
            + "<div onclick=\"document.CrDemand.abMoveClick.click();\" "
            + "style=\"margin-top:1px;margin-left:1px;width:12px;height:13px;"
            + "background:url(https://" + hostname_oil + "/img/arrow/ico_move_to.png) no-repeat;"
            + "border-width:0px 0px 0px 0px;position:absolute;\" title=\"Ходить в один клик\"></div>"
            + "<input name=\"abMoveСlick\" type=\"button\" value=0 onclick=\""
            + "if(this.value==0){"
            + "this.value=1;"
            + "this.style.color='gold';"
            + "this.style.backgroundColor='gold';"
            + "}else{"
            + "this.value=0;"
            + "this.style.color='#D4D0C8';"
            + "this.style.backgroundColor='#D4D0C8';};\" "
            + "style=\"margin-left:0px;padding:0px;width:14px;height:22px;"
            + "color:#D4D0C8;background-color:#D4D0C8;border:1px solid black;\" title=\"Ходить в один клик\">"
            + "</td>"
            + "<td>&nbsp;</td>"
            + "</tr>"
            + "</table>";
        setTimeout(addObs, 10);
    }
}

function Indicator(c, txt) {
    var div = top.frames["d_act"].document.createElement("div");
    div.id = "status";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.width = "25px";
    div.style.height = "20px";
    div.style.background = c;
    div.style.position = "absolute";
    div.style.zIndex = "1";
    div.innerHTML = txt;
    top.frames["d_act"].document.body.appendChild(div);
}

function LocSite(elem, tag, txt) {
    if (elem == "title") {
        for (i = 0; i < top.frames["d_act"].document.getElementsByTagName(tag).length; i++) {
            if (top.frames["d_act"].document.getElementsByTagName(tag)[i].title == txt) {
                return true;
            }
        }
    }
    if (elem == "value") {
        for (i = 0; i < top.frames["d_act"].document.getElementsByTagName(tag).length; i++) {
            if (top.frames["d_act"].document.getElementsByTagName(tag)[i].value == txt) {
                return true;
            }
        }
    }
    if (elem == "name") {
        for (i = 0; i < top.frames["d_act"].document.getElementsByTagName(tag).length; i++) {
            if (top.frames["d_act"].document.getElementsByTagName(tag)[i].name == txt) {
                return true;
            }
        }
    }
}

function sl_Data() {
    if (frames["channel_2"].document.getElementsByTagName("a")[0]) {
        for (var i = 0; i < frames["channel_2"].document.body.getElementsByTagName("a").length; i++) {
            if (frames["channel_2"].document.body.getElementsByTagName("a")[i].title == "Приват") {
                frames["channel_2"].document.body.getElementsByTagName("a")[i].title = 0;
                var sl_str = "" + frames["channel_2"].document.body.getElementsByTagName("a")[i].onclick;
                var sl_reg = /setPrivate\((\d+),"(.+)"\)/;
                var sl_arr = sl_reg.exec(sl_str);
                sl_arr[2] = sl_arr[2].replace(/(\s)/gi, "");
                soclanList[soclanList.length] = { nk: sl_arr[2] };
            }
        }
    }
    byid("info_soclan").innerHTML = "K" + soclanList.length;
}
//< !----------------------------------------------------->
//< !------- AUTOBATTLEFIELD-------->
//< !----------------------------------------------------->
var cn0 = 0;
var cn1 = 0;
var tl_min = 0;
var tl_sec = 0;
var amountfriend = 0;
var amountenemy = 0;
var amountFriendClon = 0;
var amountEnemyClon = 0;
var amountFriendTN = 0;
var amountEnemyTN = 0;
var amountFaceToFace = 0;
var amountAll = 0;
var startAmountFriend = 0;
var startAmountEnemy = 0;
var saf_ready = 0;
var sae_ready = 0;
var ab_hide = 0;
var ab_move = 0;
var at_stock = 0;
var begin_round = 1;
var list_white_count = 0;
var list_black_count = 0;
var tmID = Array();
ddx = new Array();
ddy = new Array();
ab_fail_list = new Array();
ab_fail_list[0] = { nk: "NaN", dmgn: 0 };
EFOBJ = { 0: { x: 0, y: 0, id: 0, clr: 0, nxy: -1, rnd: -1 }, 1: { x: 0, y: 0 } };

function autobat(a) {
    var canmove1 = byid("buttons").style.visibility;
    if (a == 0) { // MAKE
        if (canmove1 == "hidden") { // watch-hide
            ab_hide++
            if (ab_hide > 14 && !DEAD[ME.id] && UNBS[ME.id].flg != 8) {
                ab_hide = 0; actReload();
            }
            byid("status").innerHTML = "AB" + ab_hide;
            return tmID[0] = setTimeout("autobat(0)", 1000);
        } // end-watch-hide
        if (logLastRoundID != begin_round) {
            begin_round = logLastRoundID;
        }
        ENEMY = 0; Redraw(); at_stock = 0;
        if (canmove1 == "visible" && ENEMY != 0) {
            if (UNBS[ENEMY].sd != UNBS[ME.id].sd) {
                var even1 = UNBS[ME.id].y / 2;
                var even2 = Math.ceil(even1);
                if (even1 == even2) {
                    ddx[0] = UNBS[ME.id].x - 1; ddy[0] = UNBS[ME.id].y - 1;
                    ddx[1] = UNBS[ME.id].x; ddy[1] = UNBS[ME.id].y - 1;
                    ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
                    ddx[3] = UNBS[ME.id].x; ddy[3] = UNBS[ME.id].y + 1;
                    ddx[4] = UNBS[ME.id].x - 1; ddy[4] = UNBS[ME.id].y + 1;
                    ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
                } else {
                    ddx[0] = UNBS[ME.id].x; ddy[0] = UNBS[ME.id].y - 1;
                    ddx[1] = UNBS[ME.id].x + 1; ddy[1] = UNBS[ME.id].y - 1;
                    ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
                    ddx[3] = UNBS[ME.id].x + 1; ddy[3] = UNBS[ME.id].y + 1;
                    ddx[4] = UNBS[ME.id].x; ddy[4] = UNBS[ME.id].y + 1;
                    ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
                }
                for (var i = 0; i < 6; i++) { // loop
                    var xobjstr0 = "x:" + UNBS[ENEMY].x + ",y:" + UNBS[ENEMY].y;
                    var xobjstr1 = "x:" + ddx[i] + ",y:" + ddy[i];
                    if (xobjstr0 == xobjstr1 && EnemyFind(0)) {
                        ReloadReq = 0;
                        cn0 = 1; yes_mbCast = 1; ab_move = 0;
                        if (EFOBJ[0].id != -1) ENEMY = EFOBJ[0].id;
                        if (!EnemyFind(1, UNBS[ENEMY].nk)) { cn0 = 0; break; } //fail
                        console.log('K0', '=', EFOBJ[0].nxy, EFOBJ[0].rnd, EFOBJ[0].id);
                        byid("status").innerHTML = "K";
                        byid("status").style.backgroundColor = "yellow";
                        byid("logc").innerHTML = "&#936; <b>БЛОК</b>";
                        var rnd = Math.round(Math.random() * 2);
                        switch (rnd) { // удар-блок
                            case 0: SwitchAttack(1); ubblock(0, 1); ubblock(1, 2); ubblock(0, 3); ubblock(1, 4); MakeTurn();
                                byid("status").innerHTML = "блок не голова";
                                break; // блок не голова
                            case 1: SwitchAttack(1); ubblock(0, 0); ubblock(1, 1); ubblock(0, 3); ubblock(1, 4); MakeTurn();
                                byid("status").innerHTML = "блок не левая рука";
                                break; // блок не левая рука
                            case 2: SwitchAttack(1); ubblock(0, 0); ubblock(1, 1); ubblock(0, 2); ubblock(1, 3); MakeTurn();
                                byid("status").innerHTML = "блок не ноги";
                                break; // блок не ноги
                        }
                    }
                } // end-loop
                console.log('K1', '=', EFOBJ[0].nxy, EFOBJ[0].rnd, ENEMY);
            }
        }
        if (canmove1 == "visible" && cn0 == 0) {
            ReloadReq = 0; yes_mbCast = 1; ab_move = 0;
            if (!EnemyFind(0) && UNBS[ENEMY].rc != 7) { MoveRandom(0); } else { autobat(2); } // move
        }
        if (cn0 == 1) autobat(2);
    } // END-MAKE
    if (a == 1) { // BEGIN
        if (canmove1 == "hidden") { // watch-hide
            ab_hide++
            if (ab_hide > 14 && !DEAD[ME.id] && UNBS[ME.id].flg != 8) {
                ab_hide = 0; actReload();
            }
            byid("status").innerHTML = "AB" + ab_hide;
            return tmID[0] = setTimeout("autobat(1)", 1000);
        } // end-watch-hide
        if (ab_move == 0) {
            console.log(ab_move, 'M1', UNBS[ME.id].x, UNBS[ME.id].y, '=', EFOBJ[1].x, EFOBJ[1].y);
            begin_round++; cn0 = 0;
            setTimeout("actReload()", 4000);
            return tmID[0] = setTimeout("autotest()", 5000);
        }
        console.log(ab_move, 'M2', UNBS[ME.id].x, UNBS[ME.id].y, '=', EFOBJ[1].x, EFOBJ[1].y);
        if (UNBS[ME.id].x == EFOBJ[1].x &&
            UNBS[ME.id].y == EFOBJ[1].y) {
            begin_round++; ab_move = 0; cn0 = 0;
            setTimeout("actReload()", 4000);
            tmID[0] = setTimeout("autotest()", 5000);
        } else { autobat(0) }
    } // END-BEGIN
    if (a == 2) { // BLOCK
        if (cn0 == 0 && ab_move == 0) {
            byid("status").innerHTML = "B";
            byid("status").style.backgroundColor = "yellow";
            byid("logc").innerHTML = "&#936; <b>БЛОК a=2</b>";
            SwitchAttack(1); ubblock(0, 0); ubblock(1, 1); ubblock(0, 2); ubblock(1, 3); MakeTurn(); //end-block-style
        }
        ab_hide = 0;
        var speed_autobat = (ab_move) ? 3000 : 5555;
        console.log('M', '=', ab_move, 'SA', '=', speed_autobat);
        tmID[0] = setTimeout("autobat(1)", speed_autobat);
    } // END-BLOCK
}

function HandAttention() {
    var ha_r = top.frames["d_pers"].byid("INJ_r").title;
    var ha_l = top.frames["d_pers"].byid("INJ_l").title;
    if (ha_r == "Часть тела легко повреждена") return true;
    if (ha_l == "Часть тела легко повреждена") return true;
    if (ha_r == "Часть тела тяжело повреждена") return true;
    if (ha_l == "Часть тела тяжело повреждена") return true;
    return false;
}

function MoveRandom(a, b) {
    if (a == 0) { // A0
        var UNISstr = "";
        UNIS = new Array();
        var mr_move_z = 1;

        for (i in UNBS) {
            UNIS[i] = {
                x: UNBS[i].x,
                y: UNBS[i].y,
                sd: UNBS[i].sd,
                flg: UNBS[i].flg
            }
        }
        for (i in OBSTACLES) {
            UNIS[i] = {
                x: OBSTACLES[i].x,
                y: OBSTACLES[i].y,
                sd: UNBS[ME.id].sd,
                flg: 0
            }
        }
        for (i in UNIS) {
            UNISstr += "x:" + UNIS[i].x + ",y:" + UNIS[i].y + ";";
        }
        var even1 = UNBS[ME.id].y / 2;
        var even2 = Math.ceil(even1);
        if (even1 == even2) {
            ddx[0] = UNBS[ME.id].x - 1; ddy[0] = UNBS[ME.id].y - 1;
            ddx[1] = UNBS[ME.id].x; ddy[1] = UNBS[ME.id].y - 1;
            ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
            ddx[3] = UNBS[ME.id].x; ddy[3] = UNBS[ME.id].y + 1;
            ddx[4] = UNBS[ME.id].x - 1; ddy[4] = UNBS[ME.id].y + 1;
            ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
        } else {
            ddx[0] = UNBS[ME.id].x; ddy[0] = UNBS[ME.id].y - 1;
            ddx[1] = UNBS[ME.id].x + 1; ddy[1] = UNBS[ME.id].y - 1;
            ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
            ddx[3] = UNBS[ME.id].x + 1; ddy[3] = UNBS[ME.id].y + 1;
            ddx[4] = UNBS[ME.id].x; ddy[4] = UNBS[ME.id].y + 1;
            ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
        }
        for (var i = 0; i < 6; i++) { // loop
            var xobjstr = "x:" + ddx[i] + ",y:" + ddy[i];
            var reg = new RegExp(xobjstr, "g");
            if (!reg.test(UNISstr)) {
                if (ddx[i] < FLDX && ddy[i] < FLDY && ddx[i] != -1 && ddy[i] != -1) {
                    EFOBJ[0].x = ddx[i];
                    EFOBJ[0].y = ddy[i];
                    MyX = ddx[i]; MyY = ddy[i]; ab_move = 1;

                    if (UNBS[ME.id].y == 0) mr_move_z = 0;
                    if (UNBS[ME.id].y == FLDY - 1) mr_move_z = 1;
                    if (UNBS[ME.id].y == UNBS[ENEMY].y) mr_move_z = 1;
                    if (mr_move_z == 1) {
                        // LINE-X
                        if (UNBS[ME.id].x > UNBS[ENEMY].x) {
                            if (ddx[i] == UNBS[ME.id].x - 1 && ddy[i] == UNBS[ME.id].y && UNBS[ME.id].y == UNBS[ENEMY].y) {
                                return MoveRandom(1, "M2");
                            }
                            if (ddx[i] == UNBS[ME.id].x - 1 && ddy[i] != UNBS[ME.id].y && UNBS[ME.id].y != UNBS[ENEMY].y) {
                                return MoveRandom(1, "M2");
                            }
                        }
                        if (UNBS[ME.id].x < UNBS[ENEMY].x) {
                            if (ddx[i] == UNBS[ME.id].x + 1 && ddy[i] == UNBS[ME.id].y && UNBS[ME.id].y == UNBS[ENEMY].y) {
                                return MoveRandom(1, "M2");
                            }
                            if (ddx[i] == UNBS[ME.id].x + 1 && ddy[i] != UNBS[ME.id].y && UNBS[ME.id].y != UNBS[ENEMY].y) {
                                return MoveRandom(1, "M2");
                            }
                        }
                        // END-LINE-X
                        // LINE-Y
                        if (UNBS[ME.id].y > UNBS[ENEMY].y) {
                            if (ddy[i] == UNBS[ME.id].y - 1 && ddx[i] == UNBS[ME.id].x && UNBS[ME.id].x == UNBS[ENEMY].x) {
                                return MoveRandom(1, "M2");
                            }
                            if (ddy[i] == UNBS[ME.id].y - 1 && ddx[i] == UNBS[ME.id].x && UNBS[ME.id].x != UNBS[ENEMY].x) {
                                return MoveRandom(1, "M2");
                            }
                        }
                        if (UNBS[ME.id].y < UNBS[ENEMY].y) {
                            if (ddy[i] == UNBS[ME.id].y + 1 && ddx[i] == UNBS[ME.id].x && UNBS[ME.id].x == UNBS[ENEMY].x) {
                                return MoveRandom(1, "M2");
                            }
                            if (ddy[i] == UNBS[ME.id].y + 1 && ddx[i] == UNBS[ME.id].x && UNBS[ME.id].x != UNBS[ENEMY].x) {
                                return MoveRandom(1, "M2");
                            }
                        }// END-LINE-Y
                    }
                }
            }
        } // end-loop
        return MoveRandom(1, "M1");
    } // END-A0
    if (a == 1) { // A1
        if (ab_move == 0) autobat(2);
        if (ab_move == 1) {
            EFOBJ[1].x = MyX;
            EFOBJ[1].y = MyY;
            byid("status").innerHTML = b;
            byid("status").style.backgroundColor = "yellow";
            byid("logc").innerHTML = "&#936; <b>Иду на врага!</b>";
            PrepareReq("bid=" + BID + "&x=" + MyX + "&y=" + MyY + "&actBattle-Move=1");
            tmID[0] = setTimeout("autobat(2)", 500);
        }
    } // END-A1
}

function EnemyTN() {
    for (i in UNBS) {
        if (!UNBS[i].clr && UNBS[i].tn == 1 &&
            UNBS[i].sd != UNBS[ME.id].sd && UNBS[i].flg != 8) {
            return true;
        }
    }
}

function EnemyFind(a, b) {
    if (a == 0) { // face-to-face
        amountFaceToFace = 0;
        var nxy = -1;
        EFOBJ[0].id = -1;
        rndarr = new Array();
        ENEMY = 0; Redraw();
        var even1 = UNBS[ME.id].y / 2;
        var even2 = Math.ceil(even1);
        if (even1 == even2) {
            ddx[0] = UNBS[ME.id].x - 1; ddy[0] = UNBS[ME.id].y - 1;
            ddx[1] = UNBS[ME.id].x; ddy[1] = UNBS[ME.id].y - 1;
            ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
            ddx[3] = UNBS[ME.id].x; ddy[3] = UNBS[ME.id].y + 1;
            ddx[4] = UNBS[ME.id].x - 1; ddy[4] = UNBS[ME.id].y + 1;
            ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
        } else {
            ddx[0] = UNBS[ME.id].x; ddy[0] = UNBS[ME.id].y - 1;
            ddx[1] = UNBS[ME.id].x + 1; ddy[1] = UNBS[ME.id].y - 1;
            ddx[2] = UNBS[ME.id].x + 1; ddy[2] = UNBS[ME.id].y;
            ddx[3] = UNBS[ME.id].x + 1; ddy[3] = UNBS[ME.id].y + 1;
            ddx[4] = UNBS[ME.id].x; ddy[4] = UNBS[ME.id].y + 1;
            ddx[5] = UNBS[ME.id].x - 1; ddy[5] = UNBS[ME.id].y;
        }
        for (i in UNBS) { // loop-rnd
            for (var j = 0; j < 6; j++) {
                if (UNBS[i].x == ddx[j] && UNBS[i].y == ddy[j] &&
                    UNBS[i].sd != UNBS[ME.id].sd && EnemyFind(1, UNBS[i].nk)) {
                    nxy++;
                    rndarr[nxy] = { x: ddx[j], y: ddy[j], id: i, clr: UNBS[i].clr };
                    amountFaceToFace++;
                }
            }
        } // end-loop-rnd
        if (nxy != -1) {
            var rnd = Math.round(Math.random() * nxy);
            EFOBJ[0].x = rndarr[rnd].x;
            EFOBJ[0].y = rndarr[rnd].y;
            EFOBJ[0].id = rndarr[rnd].id;
            EFOBJ[0].clr = rndarr[rnd].clr;
            EFOBJ[0].nxy = nxy;
            EFOBJ[0].rnd = rnd;
        }
        for (var i = 0; i < 6; i++) {
            var xobjstr0 = "x:" + UNBS[ENEMY].x + ",y:" + UNBS[ENEMY].y;
            var xobjstr1 = "x:" + ddx[i] + ",y:" + ddy[i];
            if (xobjstr0 == xobjstr1 && UNBS[ENEMY].flg != 8 && UNBS[ENEMY].rc != 7) {
                return true;
            }
        }
        return false;
    } // end-face-to-face
    if (a == 1) { // fail-list
        var list_white = 0;
        var list_black = 0;
        var cut_nk = b;
        cut_nk = cut_nk.replace(/клон (\d+)/gi, "");
        cut_nk = cut_nk.replace(/(\s)/gi, "");
        for (s in soclanList) { // loop0
            if (soclanList[s].nk == cut_nk) {
                list_black_count++;
                return false;
            }
        } // end-loop0
        for (i in ab_fail_list) { // loop1
            if (ab_fail_list[i].nk == cut_nk) {
                if (ab_fail_list[i].dmgn == 0) list_black = 1;
                if (ab_fail_list[i].dmgn > 0) list_white = 1;
            }
        } // end-loop1
        if (list_black == 1 && list_white == 0) {
            list_black_count++;
            return false;
        } else {
            list_white_count++;
            return true;
        }
    } // end-fail-list
}

function EnemyNum() {
    amountfriend = 0;
    amountenemy = 0;
    amountFriendClon = 0;
    amountEnemyClon = 0;
    amountFriendTN = 0;
    amountEnemyTN = 0;
    for (i in UNBS) {
        if (!UNBS[i].clr && UNBS[i].sd == UNBS[ME.id].sd && UNBS[i].tn == 0 &&
            UNBS[i].flg != 8) amountFriendTN++;
        if (!UNBS[i].clr && UNBS[i].sd != UNBS[ME.id].sd && UNBS[i].tn == 0 &&
            UNBS[i].flg != 8) amountEnemyTN++;
        if (!UNBS[i].clr && UNBS[i].sd == UNBS[ME.id].sd &&
            UNBS[i].flg != 8) amountfriend++;
        if (!UNBS[i].clr && UNBS[i].sd != UNBS[ME.id].sd &&
            UNBS[i].flg != 8) amountenemy++;
        if (UNBS[i].clr && UNBS[i].sd == UNBS[ME.id].sd &&
            UNBS[i].flg != 8) amountFriendClon++;
        if (UNBS[i].clr && UNBS[i].sd != UNBS[ME.id].sd &&
            UNBS[i].flg != 8) amountEnemyClon++;
    }
    amountAll = amountfriend + amountenemy + amountFriendClon + amountEnemyClon;
    if (saf_ready == 0) startAmountFriend = amountfriend;
    if (sae_ready == 0) startAmountEnemy = amountenemy;
    saf_ready = 1;
    sae_ready = 1;
}

function BattleTime() {
    if (document.getElementById("time_left")) {
        var batime = document.getElementById("time_left").innerHTML;
        if (batime.length == 0) { batime = "99:99" }
        var cutime = /(\d+):(\d+)/.exec(batime);
        tl_min = parseInt(cutime[1], 10);
        tl_sec = parseInt(cutime[2], 10);
    }
}

function autotest() {
    if (!document.getElementById("control_panel")) { // control
        var div = document.createElement("div");
        div.id = "control_panel";
        div.style.position = "absolute";
        div.style.top = "10px";
        div.style.left = "145px";
        div.style.width = "500px";
        div.style.height = "20px";
        div.style.background = "palegreen";
        div.style.zIndex = "1";
        div.style.overflow = "hidden";
        div.innerHTML = ""
            + "<input type=button value=OFF onclick=\""
            + "if(this.value=='OFF') {"
            + "clearTimeout(tmID[0]);"
            + "clearTimeout(tmID[1]);"
            + "byid('status').innerHTML=this.value;"
            + "this.value='ON';"
            + "} else {"
            + "autotest();"
            + "byid('status').innerHTML=this.value;"
            + "this.value='OFF';"
            + "}\" id=\"ctrl_btn\">"
            + "<span id=\"logb\">&#153;Слабоумие и отвага</span>";
        div.innerHTML += "&nbsp;";
        div.innerHTML += "<sapn id=\"logc\"></span>";
        div.innerHTML += "<sapn id=\"audio\"></span>";
        div.innerHTML += "<sapn id=\"ad_test\" style=\"display:none\"></span>";
        div.innerHTML += "&nbsp;";
        div.innerHTML += "<sapn id=\"logBW\"></span>";
        document.body.appendChild(div);
        EnemyNum();
        if (FLDX + FLDY == 27 && amountenemy == 1) {
            top.frames["d_pers"].document.CrDemand.act_castle.click();
            return;
        }
        if (FLDY > 3 && FLDX + FLDY != 27 && amountenemy > 2 &&
            amountfriend <= amountenemy) { // astral-up
            ChangeAstralLevel(0);
        } // end-astral-up
        if (amountenemy == 1) { // limit
            byid("logb").innerHTML = "<span style=\"color:red;\">&#9674;Лимит врагов</span>";
            if (top.frames["d_pers"].document.CrDemand.act_castle.value == 1 && amountfriend == 1) {
                top.frames["d_pers"].document.CrDemand.act_castle.click();
                top.frames["d_pers"].document.getElementById("t").innerHTML = "НЕТ ИГРОКОВ. СТОП.";
            }
        } // end-limit
        top.frames["d_chatact"].chclear();
        top.frames["d_chatact"].chclear();
        if (!DEAD[ME.id] && UNBS[ME.id].flg != 8) AddJS("_jsgame_AddData3.js");
        return tmID[0] = setTimeout("autotest()", 5555);
    } // end-control

    ab_limit_hp = top.frames["d_pers"].ab_limit_hp;
    var canmove1 = byid("buttons").style.visibility;
    var rxy = -1;
    var nxy = -1;
    var onlyclon = 0;
    var UNISstr = "";
    UNIS = new Array();
    xobj = new Array();
    rndarr = new Array();
    BattleTime();
    EnemyNum();

    // ============
    byid("logBW").innerHTML = ""
        + "<span style=\"background-color:black;color:white;font-size:7pt;\">" + list_black_count + "</span>"
        + "<sapn style=\"background-color:white;color:black;font-size:7pt;\">" + list_white_count + "</span>"
        + "<sapn style=\"background-color:#D4D0C8;color:black;font-size:7pt;\">" + ab_fail_list.length + "</span>";
    if (top.frames["d_pers"].document.CrDemand.clonsum.value == 1 &&
        amountenemy < startAmountEnemy / 2 && amountEnemyClon < 2) { // limit
        byid("logb").innerHTML = ""
            + "<span style=\"color:red;\">"
            + "&#9674;Лимит врагов"
            + "</span>";
        return document.getElementById("ctrl_btn").value = "ON";
    } // end-limit
    if (logLastRoundID >= top.frames["d_pers"].document.CrDemand.abround.value) { // limit-raund
        byid("logb").innerHTML = ""
            + "<span style=\"color:red;\">"
            + "&#215;Лимит " + top.frames["d_pers"].document.CrDemand.abround.value + " раунд"
            + "</span>";
        return document.getElementById("ctrl_btn").value = "ON";
    } // end-limit-raund
    if (MyTime(3)) { // chat-control
        byid("status").innerHTML = "Chat";
        byid("status").style.backgroundColor = "red";
        return tmID[0] = setTimeout("autotest()", 7000);
    } // end-chat-control
    if (tl_sec > 55 || canmove1 == "hidden") { // wait-timeleft
        actReload();
        byid("status").innerHTML = "AT0";
        byid("status").style.backgroundColor = "yellowgreen";
        return tmID[0] = setTimeout("autotest()", 3000);
    } // end-wait-timeleft
    if (tl_sec > 44 && UNBS[ME.id].hp < ME.mhp / ab_limit_hp) { // hp-bad
        byid("status").innerHTML = "HP";
        byid("status").style.backgroundColor = "red";
        return tmID[0] = setTimeout("autotest()", 7000);
    } // end-hp-bad
    if (tl_sec < 55 && canmove1 == "visible" && UNBS[ME.id].hp < ME.mhp / ab_limit_hp && yes_mbCast == 1) { // hp-up
        if (top.frames["d_pers"].document.CrDemand.abHP.value == 1) {
            byid("logb").innerHTML = ""
                + "<span style=\"color:red;\">"
                + "&#215;Лимит HP"
                + "</span>";
            byid("status").innerHTML = "HP";
            return document.getElementById("ctrl_btn").value = "ON";
        } else {
            byid("status").innerHTML = "HP";
            byid("status").style.backgroundColor = "red";
            document.getElementById("logb").innerHTML = "<b>Восстановить HP</b>";
            UseMagCast(0, 0, mbHP);
            cn0 = 0; cn1 = 0;
            return tmID[0] = setTimeout("autotest()", 7000);
        }
    } // end-hp-up
    if (tl_sec > 14 && amountfriend > 1 && amountenemy > 1 && amountEnemyTN == 0 && !EnemyFind(0)) { // wait-turn
        byid("status").innerHTML = "AT1";
        byid("status").style.backgroundColor = "yellowgreen";
        document.getElementById("logb").innerHTML = "&#9674;"
            + "Враг:<b>" + amountenemy + "</b>,Союз:" + amountfriend;
        byid("logc").innerHTML = "&#937; ЖДУН";
        actReload();
        return tmID[0] = setTimeout("autotest()", 5000);
    }
    if (tl_sec > 21 && EnemyFind(0) && amountFriendTN < amountfriend / 2 &&
        amountEnemyTN < amountenemy / 2 && amountFaceToFace < 2 && amountAll < FLDX * FLDY / 2) {
        byid("status").innerHTML = "AT2";
        byid("status").style.backgroundColor = "yellowgreen";
        document.getElementById("logb").innerHTML = "&#9674;"
            + "Враг:<b>" + amountenemy + "</b>,Союз:" + amountfriend;
        byid("logc").innerHTML = "&#937; Ж&#916;УН";
        actReload();
        return tmID[0] = setTimeout("autotest()", 3000);
    }
    if (amountEnemyClon < 4) {
        if (tl_min != 0 && EnemyTN() && !EnemyFind(0) && amountenemy > 2 && UNBS[ME.id].mp >= 75) {
            byid("status").innerHTML = "S";
            byid("status").style.backgroundColor = "white";
            return tmID[0] = setTimeout("autotest()", 7000);
        }
    } // end-wait-turn
    // ============

    for (i in UNBS) {
        UNIS[i] = {
            nk: UNBS[i].nk,
            x: UNBS[i].x,
            y: UNBS[i].y,
            sd: UNBS[i].sd,
            flg: UNBS[i].flg,
            rc: UNBS[i].rc,
            clr: UNBS[i].clr
        }
    }
    for (i in OBSTACLES) {
        UNIS[i] = {
            nk: "NaN",
            x: OBSTACLES[i].x,
            y: OBSTACLES[i].y,
            sd: UNBS[ME.id].sd,
            flg: 0,
            rc: 0,
            clr: 0
        }
    }
    for (i in UNIS) { // mass
        if (UNIS[i].flg != 8 && UNIS[i].rc != 7) { // only-clon
            if (UNIS[i].sd != UNBS[ME.id].sd && UNIS[i].clr && !at_stock) {
                onlyclon++;
            }
        } // end-only-clon
        UNISstr += "x:" + UNIS[i].x + ",y:" + UNIS[i].y + ";";
    } // end-mass
    for (i in UNIS) { // target-all
        if (UNIS[i].flg != 8 && UNIS[i].rc != 7 && EnemyFind(1, UNIS[i].nk)) {
            if (UNIS[i].sd != UNBS[ME.id].sd && onlyclon == 0) {
                rxy++;
                xobj[rxy] = { x: UNIS[i].x, y: UNIS[i].y, clr: UNIS[i].clr }; //all
            }
        }
    } // end-target-all
    for (i in UNIS) { // target-clon
        if (UNIS[i].flg != 8 && UNIS[i].rc != 7 && EnemyFind(1, UNIS[i].nk)) {
            if (UNIS[i].sd != UNBS[ME.id].sd && UNIS[i].clr && onlyclon > 0) {
                rxy++;
                xobj[rxy] = { x: UNIS[i].x, y: UNIS[i].y, clr: UNIS[i].clr }; //clon
            }
        }
    } // end-target-clon
    if (rxy != -1) { // main-cast
        var rnd = Math.round(Math.random() * rxy);
        var even1 = xobj[rnd].y / 2;
        var even2 = Math.ceil(even1);
        if (even1 == even2) {
            ddx[0] = xobj[rnd].x - 1; ddy[0] = xobj[rnd].y - 1;
            ddx[1] = xobj[rnd].x; ddy[1] = xobj[rnd].y - 1;
            ddx[2] = xobj[rnd].x + 1; ddy[2] = xobj[rnd].y;
            ddx[3] = xobj[rnd].x; ddy[3] = xobj[rnd].y + 1;
            ddx[4] = xobj[rnd].x - 1; ddy[4] = xobj[rnd].y + 1;
            ddx[5] = xobj[rnd].x - 1; ddy[5] = xobj[rnd].y;
        } else {
            ddx[0] = xobj[rnd].x; ddy[0] = xobj[rnd].y - 1;
            ddx[1] = xobj[rnd].x + 1; ddy[1] = xobj[rnd].y - 1;
            ddx[2] = xobj[rnd].x + 1; ddy[2] = xobj[rnd].y;
            ddx[3] = xobj[rnd].x + 1; ddy[3] = xobj[rnd].y + 1;
            ddx[4] = xobj[rnd].x; ddy[4] = xobj[rnd].y + 1;
            ddx[5] = xobj[rnd].x - 1; ddy[5] = xobj[rnd].y;
        }
        for (var i = 0; i < 6; i++) {
            var xobjstr = "x:" + ddx[i] + ",y:" + ddy[i];
            var reg = new RegExp(xobjstr, "g");
            if (!reg.test(UNISstr)) {
                if (ddx[i] < FLDX && ddy[i] < FLDY && ddx[i] != -1 && ddy[i] != -1) {
                    EFOBJ[0].x = xobj[rnd].x;
                    EFOBJ[0].y = xobj[rnd].y;
                    EFOBJ[0].clr = xobj[rnd].clr;
                    MyX = ddx[i]; MyY = ddy[i]; cn0 = 1;
                }
            }
        }
        if (cn0 == 1) { console.log("main-cast", MyX, MyY); }
    } // end-main-cast
    if (EnemyFind(0)) { // face-cast
        var even1 = EFOBJ[0].y / 2;
        var even2 = Math.ceil(even1);
        if (even1 == even2) {
            ddx[0] = EFOBJ[0].x - 1; ddy[0] = EFOBJ[0].y - 1;
            ddx[1] = EFOBJ[0].x; ddy[1] = EFOBJ[0].y - 1;
            ddx[2] = EFOBJ[0].x + 1; ddy[2] = EFOBJ[0].y;
            ddx[3] = EFOBJ[0].x; ddy[3] = EFOBJ[0].y + 1;
            ddx[4] = EFOBJ[0].x - 1; ddy[4] = EFOBJ[0].y + 1;
            ddx[5] = EFOBJ[0].x - 1; ddy[5] = EFOBJ[0].y;
        } else {
            ddx[0] = EFOBJ[0].x; ddy[0] = EFOBJ[0].y - 1;
            ddx[1] = EFOBJ[0].x + 1; ddy[1] = EFOBJ[0].y - 1;
            ddx[2] = EFOBJ[0].x + 1; ddy[2] = EFOBJ[0].y;
            ddx[3] = EFOBJ[0].x + 1; ddy[3] = EFOBJ[0].y + 1;
            ddx[4] = EFOBJ[0].x; ddy[4] = EFOBJ[0].y + 1;
            ddx[5] = EFOBJ[0].x - 1; ddy[5] = EFOBJ[0].y;
        }
        for (var i = 0; i < 6; i++) {
            var xobjstr0 = "x:" + EFOBJ[0].x + ",y:" + EFOBJ[0].y;
            var xobjstr1 = "x:" + ddx[i] + ",y:" + ddy[i];
            var reg = new RegExp(xobjstr1, "g");
            if (!reg.test(UNISstr)) {
                if (ddx[i] < FLDX && ddy[i] < FLDY && ddx[i] != -1 && ddy[i] != -1 && xobjstr1 != xobjstr0) {
                    nxy++;
                    rndarr[nxy] = { x: ddx[i], y: ddy[i] };
                    cn0 = 1;
                }
            }
        }
        if (nxy != -1) {
            var rnd = Math.round(Math.random() * nxy);
            MyX = rndarr[rnd].x; MyY = rndarr[rnd].y;
            console.log("face-cast", MyX, MyY);
        }
    } // end-face-cast
    if (cn0 == 1 && UNBS[ME.id].mp > 75 && canmove1 == "visible" &&
        yes_mbCast == 1 && logLastRoundID == begin_round) { // clon
        var at_cast = true;
        if (top.frames["d_pers"].document.CrDemand.clonsum.value == 1 &&
            amountenemy <= startAmountEnemy / 2 && amountFriendClon > amountEnemyClon) { //limit
            if (at_stock) at_cast = false;
        } //end-limit
        if (at_cast) { //cast
            UseMagCast(1, 0, mbClon, MyX, MyY);
            byid("logb").innerHTML = (EFOBJ[0].clr ? "&#8226;" : "&#164;")
                + "Цель:" + EFOBJ[0].x + "," + EFOBJ[0].y + " <u>Клон</u>:<b>" + MyX + "," + MyY + "</b>";
        } else {
            yes_mbCast = 0;
            byid("logb").innerHTML = "&#9674;Лимит целей";
        } //end-cast
    } else { // end-clon
        byid("status").innerHTML = begin_round + "|<b>" + logLastRoundID + "</b>";
        byid("status").style.backgroundColor = "white";
    }
    if (tl_sec > 8 || tl_min > 0) { // STOCK
        if (cn0 == 0 && cn1 <= rxy && !at_stock) { // stock0
            cn1++;
            byid("status").innerHTML = "CN" + cn1;
            byid("logb").innerHTML = "&#9674;Поиск цели..";
            return tmID[0] = setTimeout("autotest()", 500);
        } // end-stock0
        if (!at_stock && yes_mbCast) cn1 = 0;
        at_stock = 1;
        if (cn0 == 0 && cn1 <= rxy && yes_mbCast) { // stock1
            cn1++;
            byid("status").innerHTML = "CN" + cn1;
            byid("logb").innerHTML = "&#9674;Поиск цели..";
            return tmID[0] = setTimeout("autotest()", 500);
        } // end-stock1
    } // END-STOCK
    cn0 = 0;
    cn1 = 0;
    byid("logc").innerHTML = ""
        + "&#937; Ж&#916;УН <b>" + amountEnemyTN + "/" + (amountenemy / 2) + "</b>";
    if (canmove1 == "visible" && amountEnemyTN >= amountenemy / 2 ||
        canmove1 == "visible" && tl_sec <= 21 ||
        canmove1 == "visible" && EnemyFind(0)) {
        var speed_autobat = (tl_sec < 8) ? 1500 : 5555;
        if (EnemyFind(0)) speed_autobat = 3000;
        if (!EnemyFind(0)) speed_autobat = tl_sec / 2 * 1000;
        if (amountEnemyTN >= amountenemy / 2 && tl_sec > 5) speed_autobat = 2000;
        byid("logc").innerHTML = "&#937; <b>Переход " + (speed_autobat / 1000) + " сек.</b>";
        tmID[1] = setTimeout(""
            + "UseMagCast(777);"
            + "ab_hide=0;"
            + "autobat(0);", speed_autobat);
    } else {
        tmID[0] = setTimeout("autotest()", 7000);
    }
}
//< !----------------------------------------------------->
//< !------- BATTLEFIELD BUTTONS MAG-------->
//< !----------------------------------------------------->
var usoff = "user-select:none;";
var obj_hover_0 = "onmouseover=\"this.style.backgroundColor='gold';\" onmouseout=\"this.style.backgroundColor='#FFEEC0';\"";
var obj_hover_1 = "onmouseover=\"this.style.backgroundColor='tomato';\" onmouseout=\"this.style.backgroundColor='khaki';\"";
var obj_hover_2 = "onmouseover=\"this.style.backgroundColor='gold';\" onmouseout=\"this.style.backgroundColor='yellowgreen';\"";
var obj_hover_3 = "onmouseover=\"this.style.backgroundColor='skyblue';\" onmouseout=\"this.style.backgroundColor='#E8EEEC';\"";

var addscript = function () {
    if (ME.id == 200674992) {
        var btn_name_0 = "МагУдар";
        var btn_name_3 = "HP";
        var btn_name_4 = "Панцирь";
        var btn_name_5 = "Препа";
        var btn_cast_0 = "UseMagCast(1,1,mbFireBall);";
        var btn_cast_3 = "UseMagCast(0,0,mbHP);";
        var btn_cast_4 = "UseMagCast(0,0,mbArmor);";
        var btn_cast_5 = "UseMagCast(1,0,mbStone,MyX,MyY);";
    }
    document.getElementById("buttons").style.height = "75px";
    document.getElementById("buttons").style.width = "420px";
    document.getElementById("buttons").innerHTML = ""
        + "<span id=\"areahit\" style=\"visibility:hidden;\"></span>"
        + "<div style=\"margin-left:1px;margin-top:0px;width:65px;height:15px;font-size:11px;font-weight:bold;text-align:center;"
        + "color:black;background-color:#FFEEC0;border:solid 1px black;padding-top:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"open('/bag.html?xdac='+Math.random(),'BAG','width=850,height=650,scrollbars=1,resizable=1');\" "
        + obj_hover_0 + ">Рюкзак</div>"

        + "<div style=\"margin-left:71px;margin-top:0px;width:65px;height:15px;font-size:9px;font-weight:bold;text-align:center;"
        + "color:black;background-color:#FFEEC0;border:solid 1px black;padding-top:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"move_round=0;yes_mbCast=1;SwitchAttack(1);\" "
        + obj_hover_0 + ">Удар/Блок</div>"

        + "<div style=\"margin-left:141px;margin-top:0px;width:65px;height:15px;font-size:11px;font-weight:bold;text-align:center;"
        + "color:black;background-color:#FFEEC0;border:solid 1px black;padding-top:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"open('/mbag.html?xdac='+Math.random(),'MAGIC','width=850,height=650,scrollbars=1,resizable=1');\" "
        + obj_hover_0 + ">Магия</div>"

        + "<div style=\"margin-left:211px;margin-top:0px;width:65px;height:15px;font-size:11px;font-weight:bold;text-align:center;"
        + "color:black;background-color:#FFEEC0;border:solid 1px black;padding-top:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"move_round=0;yes_mbCast=1;MakeMove();\" "
        + obj_hover_0 + ">Ходить</div>"

        + "<div id=\"astral1\" style=\"margin-left:281px;margin-top:0px;width:65px;height:15px;font-size:11px;font-weight:bold;text-align:center;"
        + "color:mediumpurple;background-color:#FFEEC0;border:solid 1px mediumpurple;padding-top:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"ChangeAstralLevel(0);\" "
        + obj_hover_0 + ">Астрал 1</div>"

        + "<div style=\"margin-left:1px;margin-top:20px;width:80px;height:15px;font-size:12px;text-align:center;" + usoff
        + "color:black;background-color:khaki;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "oncontextmenu=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);ubkick(0,0);ubkick(1,0);MakeTurn();return false;\" "
        + "onclick=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);"
        + "ubblock(0,4);ubblock(0,2);ubblock(1,3);ubblock(1,1);"
        + "MakeTurn();\" "
        + obj_hover_1 + ">ГОЛОВА</div>"

        + "<div style=\"margin-left:1px;margin-top:38px;width:25px;height:15px;font-size:12px;text-align:center;" + usoff
        + "color:black;background-color:khaki;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "oncontextmenu=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);ubkick(0,2);ubkick(1,2);MakeTurn();return false;\" "
        + "onclick=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);"
        + "ubblock(0,4);ubblock(1,3);ubblock(0,1);ubblock(1,0);"
        + "MakeTurn();\" "
        + obj_hover_1 + ">П</div>"

        + "<div style=\"margin-left:29px;margin-top:38px;width:26px;height:15px;font-size:12px;text-align:center;" + usoff
        + "color:black;background-color:khaki;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "oncontextmenu=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);ubkick(0,1);ubkick(1,1);MakeTurn();return false;\" "
        + "onclick=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);"
        + "ubblock(0,4);ubblock(1,3);ubblock(0,2);ubblock(1,0);"
        + "MakeTurn();\" "
        + obj_hover_1 + ">К</div>"

        + "<div style=\"margin-left:56px;margin-top:38px;width:25px;height:15px;font-size:12px;text-align:center;" + usoff
        + "color:black;background-color:khaki;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "oncontextmenu=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);ubkick(0,3);ubkick(1,3);MakeTurn();return false;\" "
        + "onclick=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);"
        + "ubblock(0,4);ubblock(1,2);ubblock(0,1);ubblock(1,0);"
        + "MakeTurn();\" "
        + obj_hover_1 + ">Л</div>"

        + "<div style=\"margin-left:1px;margin-top:56px;width:80px;height:15px;font-size:12px;text-align:center;" + usoff
        + "color:black;background-color:khaki;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "oncontextmenu=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);ubkick(0,4);ubkick(1,4);MakeTurn();return false;\" "
        + "onclick=\"ReloadReq=0;move_round=0;yes_mbCast=1;SwitchAttack(1);"
        + "ubblock(0,0);ubblock(1,1);ubblock(0,2);ubblock(1,3);"
        + "MakeTurn();\" "
        + obj_hover_1 + ">НОГА</div>"

        + "<div style=\"margin-left:87px;margin-top:20px;width:65px;height:25px;font-size:12px;text-align:center;"
        + "color:black;background-color:yellowgreen;border:solid 1px black;border-style:dashed;"
        + "padding-top:10px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){move_round=0;yes_mbCast=1;"
        + "UseMagCast(1,0,mbClon,MyX,MyY);this.value='Клон';}else{this.value='Нет';}\" "
        + obj_hover_2 + ">Клон</div>"

        + "<div style=\"margin-left:156px;margin-top:20px;width:65px;height:15px;font-size:11px;text-align:center;"
        + "color:red;background-color:#E8EEEC;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){move_round=0;yes_mbCast=1;" + btn_cast_0 + "}\" "
        + obj_hover_3 + ">" + btn_name_0 + "</div>"

        + "<div id=\"MyClon\" style=\"margin-left:364px;margin-top:20px;width:65px;height:15px;font-size:12px;text-align:center;"
        + "color:black;background-color:yellowgreen;border:solid 1px black;border-style:dashed;"
        + "padding:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){f5_mbCast=1;move_round=0;yes_mbCast=1;UseMagCast(1,0,mbClon,MyX,MyY);this.innerHTML='F5.Клон';}\" "
        + "oncontextmenu=\"if(yes_mbCast!=0){f5_mbCast=1;move_round=0;yes_mbCast=1;this.innerHTML='F5.Препа';" + btn_cast_5 + "}return false;\" "
        + obj_hover_2 + ">F5.Клон</div>"

        + "<div style=\"margin-left:156px;margin-top:38px;width:35px;height:15px;font-size:12px;font-weight:bold;text-align:center;"
        + "color:#BC2EEA;background-color:#E8EEEC;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){move_round=0;yes_mbCast=1;" + btn_cast_3 + "}\" "
        + obj_hover_3 + ">" + btn_name_3 + "</div>"

        + "<div style=\"margin-left:194px;margin-top:38px;width:80px;height:15px;font-size:12px;font-weight:bold;text-align:center;"
        + "color:#0573C0;background-color:#E8EEEC;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){move_round=0;yes_mbCast=1;" + btn_cast_4 + "}\" "
        + obj_hover_3 + ">" + btn_name_4 + "</div>"

        + "<div style=\"margin-left:156px;margin-top:56px;width:68px;height:15px;font-size:11px;font-weight:bold;text-align:center;"
        + "color:black;background-color:#E8EEEC;border:solid 1px black;padding:1px;cursor:pointer;position:absolute;\" "
        + "onclick=\"if(yes_mbCast!=0){move_round=0;yes_mbCast=1;" + btn_cast_5 + "}\" "
        + obj_hover_3 + ">" + btn_name_5 + "</div>"
};
//< !----------------------------------------------------->
//< !-------      * END * BATTLEFIELD BUTTONS-------->
//< !----------------------------------------------------->
N = (document.all) ? 0 : 1;
var ob;
var over = false;
var pname;

function MD(e) {
    if (over) {
        if (N) {
            ob = document.getElementById(pname);
            X = e.layerX;
            Y = e.layerY;
            return false;
        }
        else {
            ob = document.getElementById(pname);
            ob = ob.style;
            X = event.offsetX;
            Y = event.offsetY;
        }
    }
}

function MM(e) {
    if (ob) {
        if (N) {
            ob.style.top = e.pageY - Y + 'px';
            ob.style.left = e.pageX - X + 'px';
        }
        else {
            ob.pixelLeft = event.clientX - X + document.body.scrollLeft;
            ob.pixelTop = event.clientY - Y + document.body.scrollTop;
            return false;
        }
    }
}

function MU() {
    ob = null;
}
if (N) {
    document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP);
}
document.onmousedown = MD;
document.onmousemove = MM;
document.onmouseup = MU;

//< !----------------------------------------------------->
//< !------- GAME BUTTONS-------->
//< !----------------------------------------------------->
var user_home = "";
var addact = function () {
    // SOCLAN-READY
    var a_iframe = document.getElementsByTagName("iframe")["channel_2"];
    a_iframe.onload = function () {
        sl_Data();
    };
    frames["channel_2"].location = "soclan.html";
    // END-SOCLAN-READY

    if (d.id == 200674992) {
        MyHome = 333;
        MyClan = 146;
        mbHP = 111731;

        user_home = "<a href=\"#\" onclick=\"top.frames['d_act'].location='homeenter_hid_" + MyHome + ".html';\" "
                    + "style=\"font-size:8pt;margin-left:45%;\">[Дом]</a>";
    }

    var ddmbox = "<form name=CrDemand style=\"padding-right:0px;padding-left:0px;padding-bottom:0px;margin:0px;padding-top:0px\">"
        + "<div onmouseover=\"pname='panel';over=true;\" onmouseout=\"over=false;\" "
        + "style=\"width:100%;border-bottom:1px solid #8A492F;background-color:#A75738;color:#FFEEC0;"
        + "font-size:12px;font-family:Arial Black;text-align:center;cursor:move\">&#8226;Drag&Drop Menu&#8226;</div>"
        + "<div style=\"width:100%;background-color:#FFEEC0;font-size:13px;font-family:Vardana\">"
        + "&nbsp;<a href=\"#\" onclick=\"location.reload();\" title=\"Reload\">R</a>"
        + user_home
        + "<br>"
        + "<table border=0 width=100%>"

        + "<tr>"
        + "<td><span id=\"melt\"></span></td>"
        + "</tr>"
        + "<tr>"
        + "<td><span id=\"t\">"
        + NewButton(0, "65px", "black", "black", "#FFEEC0", "gold", "Add&nbsp;Host", ""
            + "frames['channel_3'].location='newrating_actUser-GoToClanSite_'+MyClan+'.shtml';"
            + "byid('t').innerHTML='&nbsp;';", "", "")
        + " <font size=1>&#189;-левый/правый клик</font>"
        + "</span></td>"
        + "</tr>"
        + "</table></div>"
        + "<div style=\"margin-top:0px;margin-left:220px;padding-left:2px;width:25px;height:16px;"
        + "background-color:#FCE1A3;border-color:#8A492F;border-style:solid;"
        + "border-width:1px 0px 1px 1px;position:absolute;\" id=\"info_soclan\">K</div>"
        + "<div style=\"width:100%;height:16px;background-color:#FCE1A3;border-top:1px solid #8A492F;"
        + "font-color:#33CCAA;font-size:13px;font-family:vardana;\" id=\"infob\">&#182;&nbsp;</span></div>"
        + "</form>";

    var divDDM = document.createElement("div");
    divDDM.id = "panel";
    divDDM.style.left = "1px";
    divDDM.style.top = "350px";
    divDDM.style.width = "255px";
    divDDM.style.border = "2px solid #8A492F";
    divDDM.style.fontSize = "12px";
    divDDM.style.fontFamily = "Vardana";
    divDDM.style.position = "absolute";
    divDDM.style.zIndex = "7";
    divDDM.innerHTML = ddmbox;
    document.body.appendChild(divDDM);
    foundry(10);
};

var addObs = function () {
    try {
        var nform = top.frames["d_act"].document.forms.length;
        var y = top.frames["d_act"].document.forms["f_ub"].ubl1.value;
    } catch (e) { y = 99; guard = 1; buttons = 1; }
    // move-parm
    castle_room = "castle_room_1_cid_" + MyClan + ".html?xdac="+Math.random();
    med_room = "medroom_cid_" + MyClan + ".html?xdac="+Math.random();
    if (soclanList.length == 1) {
        castle_room = "arena_room_1_bmode_1.html?xdac="+Math.random();
        med_room = "arena_room_1_bmode_1.html?xdac="+Math.random();
    }
    // end-move-parm

    if (!top.frames["d_act"].document.getElementsByTagName("META")[0] &&
        !LocSite("value", "INPUT", "html") && document.CrDemand.act_castle.value == 1) { // meta
        byid("t").innerHTML = "html.META";
        if (top.frames["d_act"].document &&
            top.frames["d_act"].document.getElementsByTagName &&
            top.frames["d_act"].document.getElementById && top.frames["d_act"].document.body) {
            Indicator("red", "<input type=button value=html>", 25);
        }
        top.frames["d_act"].location = med_room;
    } // end-meta
    var health = "осталось";
    var e1 = document.all("VAL_hp").innerHTML;
    var e2 = document.all("VAL_mana").innerHTML;
    var e3 = document.all("dinjcell").innerHTML;
    var xhp = /(\d+)\/(\d+)/.exec(e1);
    var xmp = /(\d+)\/(\d+)/.exec(e2);
    var xhl = new RegExp(health, "g");
    var minhp = Math.ceil(xhp[2] / 100 * 75) + 1;
    var minmp = Math.ceil(xmp[2] / 100 * 85) + 1;
    if (xhp[1] >= minhp) { demand += 1; }
    if (xmp[1] >= minmp) { demand += 1; }
    if (!xhl.test(e3) || d.lvl < 8) { demand += 1; }
    if (demand == 0) { byid("act_castle").style.background = "white url(http://apeha.ru/img/smode-3.gif) no-repeat"; }
    if (demand == 1) { byid("act_castle").style.background = "white url(http://apeha.ru/img/smode-3.gif) no-repeat"; }
    if (demand == 2) { byid("act_castle").style.background = "gold url(http://apeha.ru/img/smode-3.gif) no-repeat"; }
    if (demand == 3) { // active-demand
        byid("act_castle").style.background = "skyblue url(http://apeha.ru/img/smode-3.gif) no-repeat";
        if (y == 99 && document.CrDemand.act_castle.value == 1) { // move-demand
            if (LocSite("name", "INPUT", "Battle{vall}") && nform != 0) {
                // msg-log
                var element = top.frames["d_act"].document.getElementsByTagName("b")[1];
                var text = top.frames["d_act"].document.createElement("span");
                text.id = "control_msg";
                text.style.background = "white";
                text.innerHTML = "msg";
                element.parentNode.insertBefore(text, element);
                // end-msg-log
                AddJS("auto_demand4.js");
            }
            if (!LocSite("name", "INPUT", "Battle{vall}") && nform != 0) { // в лечебницу (от бандита)
                top.frames["d_act"].location = "arena_room_1_bmode_3.html?xdac="+Math.random();
                top.frames["d_pers"].setTimeout("top.frames['d_pers'].frames['channel_3'].location=med_room", 1500);
            }
            if (!LocSite("name", "INPUT", "Battle{vall}") && LocSite("title", "BUTTON", "Просмотр повтора")) { // в лечебниц? (от бандита)
                top.frames["d_act"].location = "arena_room_1_bmode_3.html?xdac="+Math.random();
                top.frames["d_pers"].setTimeout("top.frames['d_pers'].frames['channel_3'].location=med_room", 1500);
            }
            if (!LocSite("name", "INPUT", "Battle{vall}") && LocSite("value", "INPUT", "Присесть")) { // в лечебниц? (от бандита)
                top.frames["d_act"].location = "arena_room_1_bmode_3.html?xdac="+Math.random();
                top.frames["d_pers"].setTimeout("top.frames['d_pers'].frames['channel_3'].location=med_room", 1500);
            }
        } // end-move-demand
    } // end-active-demand
    if (y == 99 && document.CrDemand.act_castle.value == 1 &&
        LocSite("value", "INPUT", "Подать заявку")) { // wait-fight
        var e3 = document.all("dinjcell").innerHTML;
        var xhl = new RegExp(health, "g");
        var bad_loc = RoomReg[1].test(top.frames["d_act"].location);
        if (soclanList.length == 1) bad_loc = /arena_room_1_bmode_1/.test(top.frames["d_act"].location);
        if (xhl.test(e3) && !bad_loc) { // в лечебниц?
            top.frames["d_act"].location = med_room;
        }
        var e3 = document.all("dinjcell").innerHTML;
        var xhl = new RegExp(health, "g");
        var bad_loc = RoomReg[0].test(top.frames["d_act"].location);
        if (soclanList.length == 1) bad_loc = /arena_room_1_bmode_1/.test(top.frames["d_act"].location);
        if (demand != 3 && !xhl.test(e3) && !bad_loc) { // к замк?
            top.frames["d_act"].location = castle_room;
        }
    } // end-wait-fight
    if (document.CrDemand.act_castle.value == 1) { // hand-off
        var rhandd = document.getElementById("IMG_rarm").title;
        var lhandd = document.getElementById("IMG_larm").title;
        if (rhandd == "кулаки" || lhandd == "кулаки") {
            //document.CrDemand.act_castle.click();
            setTimeout("byid('t').innerHTML='РАЗОРУЖЕН';", 1400);
        }
    } // end-hand-off
    if (y == 0) { // fight
        if (OnOffbuttons == 1) {
            if (buttons == 1) { // активировать кнопки
                buttons = 0;
                Indicator("lawngreen", "B5");
                AddJS("eh8_13_no_chat.js");
            }
        }
        if (OnOffguard == 1) {
            if (guard == 1) { // активировать охрану
                guard = 0;
                guard_act = 1;
                Indicator("lawngreen", "G");
                AddJS(1, "eh8_13_no_chat.js");
            }
        }
    } // end-fight
    if (LocSite("title", "BUTTON", "Просмотр повтора") &&
        !LocSite("value", "INPUT", "Log") &&
        document.CrDemand.act_castle.value == 1) { // log-back
        // msg-log
        var element = top.frames["d_act"].document.getElementsByTagName("b")[1];
        var text = top.frames["d_act"].document.createElement("span");
        text.id = "control_msg";
        text.style.background = "white";
        text.innerHTML = "msg";
        element.parentNode.insertBefore(text, element);
        // end-msg-log
        var e3 = document.all("dinjcell").innerHTML;
        var xhl = new RegExp(health, "g");
        if (xhl.test(e3)) { // в лечебницу
            // msg-fun-log
            var script = top.frames["d_act"].document.createElement("script");
            script.type = "text/javascript";
            script.text = "function msgBadEvent() {"
                + "var bad_event=/осталось/.test(top.frames['d_pers'].document.getElementById('dinjcell').innerHTML);"
                + "if(bad_event) {"
                + "document.getElementById('dinjcell2').innerHTML="
                + "top.frames['d_pers'].document.getElementById('dinjcell').getElementsByTagName('td')[2].innerHTML;"
                + "setTimeout('msgBadEvent()',1500);"
                + "} else {"
                + "document.getElementById('dinjcell2').innerHTML='<span style=background-color:red;color:white;>CASTLE</span>';"
                + "frames[0].location='" + castle_room + "';"
                + "}"
                + "}"
                + "setTimeout('msgBadEvent()',1500);";
            top.frames["d_act"].document.getElementsByTagName("head")[0].appendChild(script);
            // end-msg-fun-log
            var control_text = ""
                + "MOVE-<span style=background-color:green;color:white;>MEDROOM</span>"
                + ":<span style=color:green;>WAIT:<span style=background-color:black;color:white; id=dinjcell2>NaN</span>"
                + "<input type=hidden value=Log><br>";
            top.frames["d_act"].document.getElementById("control_msg").innerHTML = control_text;
            frames[0].location = med_room;
        } else { // к замку
            // msg-fun-log
            var script = top.frames["d_act"].document.createElement("script");
            script.type = "text/javascript";
            script.text = "function msgBadEvent() {"
                + "var bad_event=/осталось/.test(top.frames['d_pers'].document.getElementById('dinjcell').innerHTML);"
                + "if(bad_event) {"
                + "document.location.reload();"
                + "}"
                + "}"
                + "setTimeout('msgBadEvent()',7000);";
            top.frames["d_act"].document.getElementsByTagName("head")[0].appendChild(script);
            // end-msg-fun-log
            var control_text = ""
                + "MOVE-"
                + (d.mp >= 50 ? "<span style=color:red;>HP</span>-" : "HP-")
                + "<span style=background-color:red;color:white;>CASTLE</span>"
                + "-<span style=color:blue;>MMP:85%:</span><span style=background-color:blue;color:white;>" + minmp + "</span>"
                + "-<span style=color:#BC2EEA;>MHP:75%:</span><span style=background-color:#BC2EEA;color:white;>" + minhp + "</span>"
                + "<input type=hidden value=Log>"
                + "<img src=magbook.html" + (d.mp >= 50 ? "?actUser-UseCast=" + mbHP : "") + " "
                + "onError=\"frames[0].location='" + castle_room + "';\" width=1 height=1><br>";
            top.frames["d_act"].document.getElementById("control_msg").innerHTML = control_text;
        }
    } // end-log-back
    if (document.CrDemand.act_castle.value == 0) { // look-castle
        byid("act_castle").style.background = "#D4D0C8 url(http://apeha.ru/img/smode-3.gif) no-repeat";
    } // end-look-castle
    demand = 0;
    setTimeout(addObs, 10000);
}

function Run() {
    if (document.getElementById("VAL_nick")) {
        var game_interface = document.getElementById("VAL_nick").innerHTML;
        if (game_interface.length == 0) {
            return setTimeout("Run()", 3000);
        }
    }

    try {
        var a = BID;
    } catch (e) { a = 0; }
    try {
        var b = loaded;
    } catch (e) { b = 2; }

    if (b != 2 && b || !b) {
        setTimeout(addact, 100);
        if (location.host != "newforest.apeha.ru") { // chat
            parent.document.getElementsByTagName("frameset")[0].rows = "80%,*,31";
            var itm = top.frames["d_chatact"].document.forms["chat"].elements["filter"];
            itm.value = 253; // Сообщения комнаты
            top.frames["d_chatact"].rChat(3); // Сообщения комнаты
        } // end-chat
    }
    if (a > 0) {

        if (ME.id == 200674992) {
            mbClon = 11895151;
            mbHP = 111731;
            mbStone = 11895152;
            mbFireBall = 11895153;
            mbArmor = 11895149;
        }

        if (top.frames["d_pers"].guard_act == 1) {
            OnOffguard = 1;
            top.frames["d_pers"].guard_act = 0;
            setTimeout("autotest()", 3333);
        }
        AddIFrame("channel_4");
        frames["channel_2"].location = "img/persmanas.gif"; // OpenMagBook
        byid("buttons").style.visibility = "visible";
        setTimeout(addscript, 100);
        setTimeout("ChangeAstralLevel(2)", 1000);
        soclanList = top.frames["d_pers"].soclanList;
    }
}
setTimeout("Run()", 100);