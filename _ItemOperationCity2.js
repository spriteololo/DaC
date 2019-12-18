var txt=document.body.innerHTML;
var Reg=/actUnWear\((\d+)\)/;
var ioLocVar=0;

ioDressVeryLow=new Array(
35687558,79369822,21310071,71752664,79367080,66332392,84253401,71686802,54301630,7607625,71686776,61892361,97712491,79362376,71686778,97712493
);
ioDressLow=new Array(
35687558,79369822,21310071,71752664,84253401,66332392,83142586,71686802,54301630,13897614,71686776,83644145,97712491,83332494,71686778,97712493
);
ioDressMedium=new Array(
94943985,84379991,80526651,79369822,86736532,83875082,99103123,79441098,21310071,69251238,66332392,79367080,68215468,83644145,71686802,83332494,64254187,76679944,7607625,62429090,63311291,84253401,71686776,83142586,71686778,79362376,63460071,76670204
);
ioDressHigh=new Array(
106545050,84173325,46687642,99754448,80526651,79369822,106553179,99723048,106553203,107890476,21310071,106891250,47245651,79367080,68215468,108311788,106884621,79362376,40319286,108175782,46687638,99976929,106553048,107890683,46687644,106889295,46687501,106895687,106358887,98919567,106538890,76679944,39695219,106890172
);

// msg-log
var element=document.getElementsByTagName("b")[1];
var text=document.createElement("span");
text.id="control_msg";
text.style.background="white";
text.innerHTML="<br>";
element.parentNode.insertBefore(text, element);
// end-msg-log

function WarningLight(i,txt) {
var element=document.getElementById("control_msg");
var text=document.createElement("span");
text.id="status_"+i;
text.innerHTML="<img"
+" src=room.html?"+txt
+" width=10 height=10 border=0"
+" style=background-color:crimson;"
+" onError=ItemOperationCity("+i+");"
+"this.style.backgroundColor='lawngreen';"
+"this.src='img/d.gif';"
+">";
element.parentNode.insertBefore(text, element);
}

function ItemOperationCity(a) {
if(a==0) { // снять
if(Reg.test(txt)) {
var RegArray=Reg.exec(txt);
txt=txt.replace(RegArray[1], "false");
top.frames["d_pers"].iTempData[top.frames["d_pers"].ioVar]=RegArray[1];
top.frames["d_pers"].ioVar+=1;
ioLocVar++;
WarningLight(0,"actUser-Unwear="+RegArray[1]); // step_0
} else {
top.frames["d_pers"].ioVar=0;
if(top.frames["d_pers"].d.nk=="RetRieveR") {
top.frames["d_pers"].document.getElementById("t").innerHTML=""
+"<a href=\"javascript:byid('t').innerHTML=LoadImg;void(0);\" "
+"onclick=\"ioTitle=2;AddJS(1,'_ItemOperationCity2.js');\" "
+"style=margin-left:15%;>[High]</a>"
+"<a href=\"javascript:byid('t').innerHTML=LoadImg;void(0);\" "
+"onclick=\"ioTitle=3;AddJS(1,'_ItemOperationCity2.js');\">[Medium]</a>"
+"<a href=\"javascript:byid('t').innerHTML=LoadImg;void(0);\" "
+"onclick=\"ioTitle=1;AddJS(1,'_ItemOperationCity2.js');\" "
+"oncontextmenu=\"ioTitle=4;AddJS(1,'_ItemOperationCity2.js');"
+"byid('t').innerHTML=LoadImg;return false;\">[Low&#189;]</a>";
return document.location="room.html";
}
top.frames["d_pers"].document.getElementById("t").innerHTML=""
+"<a href=\"javascript:byid('t').innerHTML=LoadImg;void(0);\" "
+"onclick=\"top.frames['d_pers'].ioTitle=0;AddJS(1,'_ItemOperationCity2.js');\" "
+"style=margin-left:70%;>[ОДЕТЬ]</a>";
document.location="room.html";
}
}
if(a==1) { // одеть
if(!Reg.test(txt)) {
if(ioLocVar<top.frames["d_pers"].iTempData.length) {
WarningLight(1,"actUser-Wear="+top.frames['d_pers'].iTempData[ioLocVar]); // step_1
ioLocVar++;
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML="<a href=\"#\" onclick=\"AddJS(1,'_ItemOperationCity2.js');\" style=margin-left:70%; title="+a+">[Раздеть]</a>";
document.location="room_mode_0_type_7.chtml";
}}
}
if(a==2) { // Low
if(!Reg.test(txt)) {
if(ioLocVar<ioDressLow.length) {
if(ioDressLow[ioLocVar]==7607625 ||
   ioDressLow[ioLocVar]==63081349 ||
   ioDressLow[ioLocVar]==13897614) {
WarningLight(2,"actUser-WearLeft="+ioDressLow[ioLocVar]); // actUser-WearLeft
} else {
WarningLight(2,"actUser-Wear="+ioDressLow[ioLocVar]); // step_2
}
ioLocVar++;
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML=""
+"<a href=\"#\" onclick=\"AddJS(1,'_ItemOperationCity2.js');\" style=margin-left:70%; title="+a+">[Раздеть]</a>";
document.location="room_mode_0_type_7.chtml";
}}
} // end-Low
if(a==3) { // одеть комплект #2
if(!Reg.test(txt)) {
if(ioLocVar<ioDressHigh.length) {
if(ioDressHigh[ioLocVar]==46687644 ||
   ioDressHigh[ioLocVar]==106566905) {
WarningLight(3,"actUser-WearLeft="+ioDressHigh[ioLocVar]); // actUser-WearLeft
} else {
WarningLight(3,"actUser-Wear="+ioDressHigh[ioLocVar]); // step_3
}
ioLocVar++;
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML="<a href=\"#\" onclick=\"AddJS(1,'_ItemOperationCity2.js');\" style=margin-left:70%; title="+a+">[Раздеть]</a>";
document.location="room_mode_0_type_7.chtml";
}}
}
if(a==4) { // одеть комплект #3
if(!Reg.test(txt)) {
if(ioLocVar<ioDressMedium.length) {
if(ioDressMedium[ioLocVar]==7607625 ||
   ioDressMedium[ioLocVar]==63081349) {
WarningLight(4,"actUser-WearLeft="+ioDressMedium[ioLocVar]); // actUser-WearLeft
} else {
WarningLight(4,"actUser-Wear="+ioDressMedium[ioLocVar]); // step_4
}
ioLocVar++;
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML="<a href=\"#\" onclick=\"AddJS(1,'_ItemOperationCity2.js');\" style=margin-left:70%; title="+a+">[Раздеть]</a>";
document.location="room_mode_0_type_7.chtml";
}}
}
if(a==5) { // VeryLow
if(!Reg.test(txt)) {
if(ioLocVar<ioDressVeryLow.length) {
if(ioDressVeryLow[ioLocVar]==7607625 || ioDressVeryLow[ioLocVar]==63081349) {
WarningLight(5,"actUser-WearLeft="+ioDressVeryLow[ioLocVar]); // actUser-WearLeft
} else {
WarningLight(5,"actUser-Wear="+ioDressVeryLow[ioLocVar]); // step_5
}
ioLocVar++;
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML=""
+"<a href=\"#\" onclick=\"AddJS(1,'_ItemOperationCity2.js');\" style=margin-left:70%; title="+a+">[Раздеть]</a>";
document.location="room_mode_0_type_7.chtml";
}}
} // end-VeryLow
}
if(location.host=="forest.apeha.ru" || !top.frames["d_pers"].LocSite("value","INPUT","Сумка")) {
top.frames["d_pers"].document.getElementById("t").innerHTML="Error «Сумка» not found.";
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML=top.frames["d_pers"].LoadImg;
if(Reg.test(txt) && top.frames["d_pers"].ioTitle==0) {
ItemOperationCity(0);
} else if(top.frames["d_pers"].ioTitle==0) {
ItemOperationCity(1);
}
if(Reg.test(txt) && top.frames["d_pers"].ioTitle==1) { //High
ItemOperationCity(0);
} else if(top.frames["d_pers"].ioTitle==1) {
ItemOperationCity(2);
}
if(Reg.test(txt) && top.frames["d_pers"].ioTitle==2) { //Medium
ItemOperationCity(0);
} else if(top.frames["d_pers"].ioTitle==2) {
ItemOperationCity(3);
}
if(Reg.test(txt) && top.frames["d_pers"].ioTitle==3) { //Low
ItemOperationCity(0);
} else if(top.frames["d_pers"].ioTitle==3) {
ItemOperationCity(4);
}
if(Reg.test(txt) && top.frames["d_pers"].ioTitle==4) { //VeryLow
ItemOperationCity(0);
} else if(top.frames["d_pers"].ioTitle==4) {
ItemOperationCity(5);
}
}