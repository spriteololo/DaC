// ==UserScript==
// @name Add Script
// @namespace https://apeha.ru/
// @version 68
// @source https://apeha.ru/
// @description example script to insert
// @include https://*.apeha.ru/pers.htm*
// @include https://*.apeha.ru/persold.htm*
// @exclude https://www.arenovci.ru/*
// ==/UserScript==

var script=document.createElement('script');
script.type='text/javascript';
script.src='https://cdn.jsdelivr.net/gh/spriteololo/DaC/export_hopg68.js';
document.body.insertBefore(script, document.body.firstChild);