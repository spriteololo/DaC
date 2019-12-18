for(i=0; i < 4; i++) {
var myImage=document.createElement('img');
myImage.name='i'+i;
myImage.id='i'+i;
myImage.src='http://resources.apeha.ru/upload/1_569.gif';
document.body.appendChild(myImage);
}
var R=0;
var a=300;
var m=7/3;
var x=250;
var DI=document.images;
var DIL=DI.length;

function A() {
for(i=0; i < 4; i++) {
 var DIS=DI['i'+i].style;
 DIS.position='absolute';
 var rad1=Math.sin(((R + x*i)*m)*Math.PI/180);
 var rar2=Math.PI*(R + x*i)/180;
 DIS.left=a*rad1*Math.sin(rar2)+a;
 DIS.top=a*rad1*Math.cos(rar2)+a;
}
R++
}
function S() {
R=0;
a=350;
m=2/3;
x=50;
DI=document.images;
DIL=DI.length;
setInterval('A()', 45);
}
setTimeout('S()',100);