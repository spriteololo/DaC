// msg-log
var element=document.getElementsByTagName("b")[1];
var text=document.createElement("span");
text.id="control_msg";
text.style.background="white";
text.innerHTML="<br>";
element.parentNode.insertBefore(text, element);
// end-msg-log

var iframe=document.createElement("iframe");
iframe.name="channel_Storage";
iframe.id="channel_Storage";
iframe.style.visibility="hidden";
iframe.style.width="1px";
iframe.style.height="1px";
document.body.appendChild(iframe);

function goStorage(id,cnt) {
// FORM-Storage
var addform=frames["channel_Storage"].document.createElement("span");
addform.innerHTML=""
+"<form name=storageform method=post action="+document.location.pathname+">"
+"<input name=actUser-WarehouseTrans type=hidden value="+id+">"
+"<input name=cnt type=hidden value="+cnt+">"
+"</form>";
frames["channel_Storage"].document.getElementsByTagName("head")[0].appendChild(addform);
var chform=frames["channel_Storage"].document.forms["storageform"];
chform.submit();
// END-FORM-Storage

document.getElementById("progress"+b_count).style.backgroundColor="lawngreen";
b_count++;
}

var a_count=0;
var b_count=0;
var c_size=10;
function progressBar_Storage() {
for(i=0; i<document.getElementsByTagName("input").length; i++) {
if(document.getElementsByTagName("input")[i].value=="На склад" &&
   document.getElementsByTagName("input")[i].alt=="" ||
   document.getElementsByTagName("input")[i].value=="В сумку" &&
   document.getElementsByTagName("input")[i].alt=="") {
document.getElementsByTagName("input")[i].style.backgroundColor="red";
document.getElementsByTagName("input")[i].alt=1;
var element=document.getElementById("control_msg");
var text=document.createElement("span");
text.id="status"+a_count;
text.innerHTML="<img src=img/d.gif width=10 height=10 border=0 "
+"style=\"background-color:red;\" "
+"onError=\"this.style.backgroundColor='lawngreen';\" "
+"id=progress"+a_count+">";
element.parentNode.insertBefore(text, element);
a_count++;
}}
if(a_count>50)  c_size=5;
if(a_count>100) c_size=3;
for(j=0; j<a_count; j++) {
document.getElementById("progress"+j).style.width=parseInt(c_size,10);
}
check_Storage();
}

function check_Storage() {
for(i=0; i<document.getElementsByTagName("input").length; i++) {
if(document.getElementsByTagName("input")[i].value=="На склад" ||
   document.getElementsByTagName("input")[i].value=="В сумку") {
document.getElementsByTagName("input")[i].style.backgroundColor="lawngreen";
document.getElementsByTagName("input")[i].value="check";
Storage_parm=new Array();
Storage_parm[0]=document.getElementsByTagName("input")[i-1].value;
Storage_parm[1]=document.getElementsByTagName("input")[i+1].value;
return goStorage(Storage_parm[0],Storage_parm[1]);
}}
top.frames["d_pers"].document.getElementById("t").innerHTML=""
+"<a href=\"#\" onclick=\"AddJS(1,'_ioStorage.js');byid('t').innerHTML=LoadImg;\" "
+"style=\"margin-left:55%;\">[Склад/Сумка]</a>";
document.location=document.location;
}

if(location.host=="forest.apeha.ru" || !top.frames["d_pers"].LocSite("value","INPUT","Сумка")) {
top.frames["d_pers"].document.getElementById("t").innerHTML="Error «Сумка» not found.";
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML=top.frames["d_pers"].LoadImg;
// READY-Storage
var a_iframe=document.getElementsByTagName("iframe")["channel_Storage"];
a_iframe.onload = function() {
top.frames["d_act"].check_Storage();
};
// END-READY-Storage
progressBar_Storage();
}