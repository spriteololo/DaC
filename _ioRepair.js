// msg-log
var element=document.getElementsByTagName("b")[1];
var text=document.createElement("span");
text.id="control_msg";
text.style.background="white";
text.innerHTML="<br>";
element.parentNode.insertBefore(text, element);
// end-msg-log

var iframe=document.createElement("iframe");
iframe.name="channel_Repair";
iframe.id="channel_Repair";
iframe.style.visibility="hidden";
iframe.style.width="1px";
iframe.style.height="1px";
document.body.appendChild(iframe);

function goRepair(id,once) {
// FORM-Repair
var addform=frames["channel_Repair"].document.createElement("span");
addform.innerHTML=""
+"<form name=repairform method=post action="+document.location.pathname+">"
+"<input name=actUser-RepairItem type=hidden value="+id+">"
+"<input name=once type=hidden value="+once+">"
+"</form>";
frames["channel_Repair"].document.getElementsByTagName("head")[0].appendChild(addform);
var chform=frames["channel_Repair"].document.forms["repairform"];
chform.submit();
// END-FORM-Repair

document.getElementById("progress"+b_count).style.backgroundColor="lawngreen";
b_count++;
}

var a_count=0;
var b_count=0;
function progressBar_Repair() {
for(i=0; i<document.getElementsByTagName("input").length; i++) {
if(document.getElementsByTagName("input")[i].value=="Чинить" &&
   document.getElementsByTagName("input")[i].alt=="") {
document.getElementsByTagName("input")[i].style.backgroundColor="red";
document.getElementsByTagName("input")[i].alt=1;
var element=document.getElementById("control_msg");
var text=document.createElement("span");
text.id="status"+a_count;
text.innerHTML="<img"
+" src=img/d.gif"
+" width=10"
+" height=10"
+" border=0"
+" style=background-color:red;"
+" onError=this.style.backgroundColor='lawngreen';"
+" id=progress"+a_count
+">";
element.parentNode.insertBefore(text, element);
a_count++;
}}
check_Repair();
}

function check_Repair() {
for(i=0; i<document.getElementsByTagName("input").length; i++) {
if(document.getElementsByTagName("input")[i].value=="Чинить") {
document.getElementsByTagName("input")[i].style.backgroundColor="lawngreen";
document.getElementsByTagName("input")[i].value="check";
Repair_parm=new Array();
Repair_parm[0]=document.getElementsByTagName("input")[i-2].value;
Repair_parm[1]=document.getElementsByTagName("input")[i-1].value;
return goRepair(Repair_parm[0],Repair_parm[1]);
}}
top.frames["d_pers"].document.getElementById("t").innerHTML="Repair.done";
document.location=document.location;
}
if(location.host=="forest.apeha.ru" || !top.frames["d_pers"].LocSite("value","INPUT","Кузница")) {
top.frames["d_pers"].document.getElementById("t").innerHTML="Error «Кузница» not found.";
} else {
top.frames["d_pers"].document.getElementById("t").innerHTML=top.frames["d_pers"].LoadImg;
// READY-Repair
var a_iframe=document.getElementsByTagName("iframe")["channel_Repair"];
a_iframe.onload = function() {
top.frames["d_act"].check_Repair();
};
// END-READY-Repair
progressBar_Repair();
}