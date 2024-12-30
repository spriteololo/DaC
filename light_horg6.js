// dementia and courage v8
var hostname_oil = "https://cdn.jsdelivr.net/gh/spriteololo/DaC"
console.log(hostname_oil)

var buttons = 1;
var OnOffbuttons = 1;

var MyClan = 0;
var mbClon = 0;
var abilityPet = 0;

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

AddIFrame("channel_2");
var ready_mb = 0;
var yes_mbCast = 1;
var MyX = 0;
var MyY = 0;
// READYMB
var a_iframe = document.getElementsByTagName("iframe")["channel_2"];
a_iframe.onload = function () {
    top.frames["d_act"].ready_mb = 0;
};
// END-READYMB
function UseMagCast(a, b, id, mb_x, mb_y) { // Magic-Book-Cast
    if (a == 777) {
        return frames["channel_2"].location = "img/persmanas.gif";
    }
    try { // OpenMagBook
        if (location.host == "forest.apeha.ru") {
            var mb_code = "forest.apeha.ru";
        } else {
            var mb_code = frames["channel_2"].document.forms[0].code.value;
        }
    } catch (e) {
        mb_parm = new Array(a, b, id, mb_x, mb_y);
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
        if (UNBS[Window.ME.id] && UNBS[Window.ME.id].flg != 8) {
            return setTimeout("UseMagCast(mb_parm[0],mb_parm[1],mb_parm[2],mb_parm[3],mb_parm[4])", 1000);
        } else {
           return
        }
    }
    if (a == 1) { // на врага
        if (b == 0) { // клон
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
    }
    if (a == 2) {
        if (b == 1) { // пит
            frames["channel_2"].location = "ability.html?actBattle-UseCast=" + id + "&bid=" + BID + "&pettarget=1&tactic=1&code=" + mb_code + "";
        }
    }
    setTimeout("UseMagCast(777)", 1000);
    setTimeout("actReload()", 500);
    yes_mbCast = 0;
}

function HiLight(chng)
{
	if (!chng || !chng.unb) return 0;
	uid = chng.unb;
	if (REMAP[uid]) { uid = REMAP[uid].id; }
	if (uid == Window.ME.id || uid == 203784507) return 3;
	var unb = UNBS[uid];
	if (!unb) unb = DEAD[uid];
	if (!unb) return 0;
	if (unb.own && unb.own == Window.ME.id) return 2;
	if (unb.clr && unb.clr == Window.ME.id && unb.sd == Window.ME.sd) return 1;
	return 0;
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
    document.head.appendChild(ifchannel);
}

function AddJS(xfile) {
    var script = top.frames["d_act"].document.createElement("script");
    script.type = "text/javascript";
    script.src = hostname_oil + "/" + xfile;
    top.frames["d_act"].document.body.appendChild(script);
}

function MainSwitch(t) {
    if (t == 4) {
        OnOffbuttons = 0;
        document.getElementById("rbat").innerHTML = ""
            + "<img border=0 src=" + hostname_oil + "/img/arrow/checkbox.gif width=48 height=22 onclick=MainSwitch(5);>";
    }
    if (t == 5) {
        OnOffbuttons = 1;
        document.getElementById("rbat").innerHTML = ""
            + "<img border=0 src=" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(4);>";
    }
}

//< !----------------------------------------------------->
//< !------- BATTLEFIELD BUTTONS MAG-------->
//< !----------------------------------------------------->
var addscript = function () {
    const buttonWrapper = document.querySelector('#buttons > b.button');

    const lineBreak = document.createElement('br'); // Разрыв строки
    buttonWrapper.appendChild(lineBreak);
    buttonWrapper.appendChild(lineBreak);


    // Создаем новую кнопку
    const newButton2 = document.createElement('input');
    newButton2.type = 'button';
    newButton2.value = 'БлокН';
    newButton2.style.width = '65px';
    newButton2.style.marginLeft = '20px';
    newButton2.onclick = function() {
        ReloadReq = 0;
        yes_mbCast = 1;
        SwitchAttack(1);
        ubblock(0, 0);
        ubblock(1, 1);
        ubblock(0, 2);
        ubblock(1, 3);
        MakeTurn();
        return false;
    };

    buttonWrapper.appendChild(newButton2);

    // Создаем новую кнопку
    const newButton = document.createElement('input');
    newButton.type = 'button';
    newButton.value = 'Клон';
    newButton.style.width = '65px';
    newButton.onclick = function() {
        if (yes_mbCast != 0) {
           yes_mbCast=1;
           UseMagCast(1, 0, mbClon, MyX, MyY);
           this.value='Клон';
        }
        return false;
    };

    buttonWrapper.appendChild(newButton);



    // Создаем новую кнопку
    const newButton3 = document.createElement('input');
    newButton3.type = 'button';
    newButton3.value = 'Пит';
    newButton3.style.width = '65px';
    newButton3.onclick = function() {
        if (abilityPet != 0) {
            UseMagCast(2, 1, abilityPet);
            this.style.display = 'none';
        }
    };

    buttonWrapper.appendChild(newButton3);
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
var addact = function () {
    if (d.id == 200674992) { // gar
        MyClan = 146;
    }

    var ddmbox = "<div onmouseover=\"pname='panel';over=true;\" onmouseout=\"over=false;\" "
        + "style=\"width:100%;border-bottom:1px solid #8A492F;background-color:#A75738;color:#FFEEC0;"
        + "font-size:12px;font-family:Arial Black;text-align:center;cursor:move\">Drag&Drop Menu</div>"
        + "<div style=\"width:100%;background-color:#FFEEC0;font-size:13px;font-family:Vardana\">"
        + "<br>"
        + "<a href=\"javascript:void(0);\" onclick=\"top.frames['d_act'].location='castle_room_1_cid_'+MyClan+'.html';\" "
        + "oncontextmenu=\"top.frames['d_act'].location='medroom_cid_'+MyClan+'.html';return false;\">"
        + "<div style=\"margin-right:4px;width:60px;border:1px solid green;background-color:#FFEEC0;color:green;"
        + "font-size:12px;font-family:Arial;text-align:center;float:left;cursor:hand;\">К замку</div></a>"
        + "<a href=\"javascript:void(0);\" onclick=\"top.frames['d_act'].location='arena_room_8_bmode_3.html';\" >"
        + "<div style=\"margin-right:4px;width:60px;border:1px solid green;background-color:#FFEEC0;color:green;"
        + "font-size:12px;font-family:Arial;text-align:center;float:left;cursor:hand;\">Бойня</div></a>"
        + "<br><br>"
        + "<span style=\"display:block;width:48;height:22;"
        + "background:url(" + hostname_oil + "/img/arrow/battle.gif) no-repeat right center;\" id=\"rbat\">"
        + "<img border=0 src=" + hostname_oil + "/img/arrow/checkbox-a.gif width=48 height=22 onclick=MainSwitch(4);>"
        + "</span>"
        + "</div>"

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
    setTimeout(addObs, 10);
};

var addObs = function () {
    try {
        var nform = top.frames["d_act"].document.forms.length;
        var y = top.frames["d_act"].document.forms["f_ub"].ubl1.value;
    } catch (e) { y = 99; buttons = 1; }

    if (y == 0) { // fight
        if (OnOffbuttons == 1) {
            if (buttons == 1) { // активировать кнопки
                buttons = 0;
                AddJS("light_horg6.js");
            }
        }
    } // end-fight

    setTimeout(addObs, 8000 + Math.random() * 8000);
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
        parent.document.getElementsByTagName("frameset")[0].rows = "80%,*,31";
    }
    if (a > 0) {
        if (Window.ME.id == 200674992) {
            mbClon = 11895151;
            abilityPet = 921044;
        }
        frames["channel_2"].location = "img/persmanas.gif"; // OpenMagBook
        setTimeout(addscript, 100);
    }
}
setTimeout("Run()", 100);