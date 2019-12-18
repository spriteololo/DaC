ab_fail_list=top.frames[1].ab_fail_list;

function export_fail_list(nk,dmgn) {
for(i in ab_fail_list) { // loop1
if(ab_fail_list[i].nk==nk) {
if(ab_fail_list[i].dmgn==0 && dmgn==0) return ab_fail_list[i].dmgn=dmgn;
if(ab_fail_list[i].dmgn>0 && dmgn>0) return ab_fail_list[i].dmgn=dmgn;
}
} // end-loop1
ab_fail_list[ab_fail_list.length]={nk:nk,dmgn:dmgn};
}

function AddData(changes,skipupd) { // При наличии данных о бое во фрейме выполняет изменения по логу
var uniq_nmb;
CurLog = '';
uniq_nmb = BID + LCID;
if(skipupd && ROFFSETS) uniq_nmb -= changes.length; 
for(var i in changes) {
var row=changes[i];
var dmgdsc = '';
var dmgn = '';
var rpl = '';
var tbl = '';
var neprobiv = '';
var tm = row.tm;
if(!ANIMATE && row.chng && ME) {
var hl1 = HiLight(row.chng[0]);
var hl2 = HiLight(row.chng[1]);
if(hl2 > hl1) hl1 = hl2;
if(hl1) { tm = '<font class="mytime'+hl1+'">' + tm + '</font>'; }
}
switch (row.act) { // Собираем лог
case 0: // Пустышка - зарезервирована
break;
case 1: // Переместился
AddLogRecord(tm,UserOut(row.chng[0]) + ' ' + MoveOut[uniq_nmb % MoveOut.length]);
break;
case 2: // Снял вещь;
AddLogRecord(tm,UserOut(row.chng[0]) + ' разделся');
break;
case 3: // Одел вещь;
AddLogRecord(tm,UserOut(row.chng[0]) + ' оделся');
break;
case 4: // Увернулся;
AddLogRecord(tm,Ast(row.chng[1].unb) + UserOut(row.chng[1]) + ' <font class="uvor">' + DodgeOut[uniq_nmb % DodgeOut.length] + '</font> от удара ' + UserOut(row.chng[0]) + ' ' + BodyParts[row.pt]);
try {
if(hl1==1 || hl1==3) { // LOG-TEST1
document.getElementById("ad_test").innerHTML=UserOut(row.chng[1]);
var ad_test_user=document.getElementById("ad_test").getElementsByTagName("font")[0].innerHTML;
ad_test_user=ad_test_user.replace(/клон (\d+)/gi, "");
ad_test_user=ad_test_user.replace(/(\s)/gi, "");
if(ad_test_user!=ME.nk) {
export_fail_list(ad_test_user,0);
console.log('AD1','=',ab_fail_list[ab_fail_list.length-1].nk);
}
} // END-LOG-TEST1
} catch (e) {document.getElementById("logb").innerHTML=e;}
break;
case 5: // Заблокировал;
if(row.crt) dmgdsc = '<font class="krit">критический</font> ';
if(row.rpl || row.rpl == 0) rpl = ' и ответил <font class="otv">ударом</font> на ' + row.rpl;
if(row.neprobiv) neprobiv = ' (действие перка)';
AddLogRecord(tm,Ast(row.chng[1].unb) + UserOut(row.chng[1]) + ' заблокировал ' + dmgdsc + 'удар ' + UserOut(row.chng[0]) + ' ' + BodyParts[row.pt] + rpl + neprobiv);
try {
if(hl1==1 || hl1==3) { // LOG-TEST2
document.getElementById("ad_test").innerHTML=UserOut(row.chng[1]);
var ad_test_user=document.getElementById("ad_test").getElementsByTagName("font")[0].innerHTML;
ad_test_user=ad_test_user.replace(/клон (\d+)/gi, "");
ad_test_user=ad_test_user.replace(/(\s)/gi, "");
if(ad_test_user!=ME.nk) {
export_fail_list(ad_test_user,1);
console.log('AD2','=',ab_fail_list[ab_fail_list.length-1].nk);
}
} // END-LOG-TEST2
} catch (e) {document.getElementById("logb").innerHTML=e;}
break;
case 6: // Удар прошел
if(row.lck) dmgdsc = '<font class="luck">'+ LuckOut[uniq_nmb % LuckOut.length] +'</font> ';
if(row.crt) {
dmgdsc = dmgdsc + '<font class="krit">'+ KritOut[uniq_nmb % KritOut.length] +'</font> ';
dmgn = '<b class="krit">' + row.dmg + '</b>';
} else { dmgn = '<b>' + row.dmg + '</b>'; }
if(row.tbl) tbl = ' пробив блок';
if(row.neuderzh) tbl += ' (действие перка)';
if(row.rpl || row.rpl == 0) rpl = ' но получил в <font class="otv">ответ</font> на ' + Rnd4Out[uniq_nmb % Rnd4Out.length] + ' удар на <b>' + row.rpl + '</b>';
AddLogRecord(tm,Ast(row.chng[1].unb) + Rnd1Out[uniq_nmb % Rnd1Out.length] + ' ' + UserOut(row.chng[0]) + ' ' + Rnd2Out[uniq_nmb % Rnd2Out.length] + ' ' + Rnd3Out[uniq_nmb % Rnd3Out.length] + ' ' + UserOut(row.chng[1]) +' ' + dmgdsc + HitOut[uniq_nmb % HitOut.length] + ' ' + BodyParts[row.pt] + ' на ' + dmgn + tbl + rpl);
try {
if(hl1==1 || hl1==3) { // LOG-TEST3
document.getElementById("ad_test").innerHTML=UserOut(row.chng[1])+dmgn;
var ad_test_user=document.getElementById("ad_test").getElementsByTagName("font")[0].innerHTML;
var ad_test_dmgn=parseInt(document.getElementById("ad_test").getElementsByTagName("b")[0].innerHTML,10);
var ad_test_reg1=/(.+) \((-\d+|\d+)\) <img/;
var ad_test_arr1=ad_test_reg1.exec(ad_test_user);
ad_test_arr1[1]=ad_test_arr1[1].replace(/клон (\d+)/gi, "");
ad_test_arr1[1]=ad_test_arr1[1].replace(/(\s)/gi, "");
if(ad_test_arr1[1]!=ME.nk) {
export_fail_list(ad_test_arr1[1],ad_test_dmgn);
console.log('AD3','=',ab_fail_list[ab_fail_list.length-1].nk,ad_test_dmgn);
}
} // END-LOG-TEST3
} catch (e) {document.getElementById("logb").innerHTML=e;}
break;
case 7: // Удар в спину
AddLogRecord(tm,Ast(row.chng[1].unb) + UserOut(row.chng[1]) + ' получил <font class="back">удар в спину</font> от ' + UserOut(row.chng[0]) + ' на <b>' + row.dmg + '</b>');
break;
case 8: // Пропускает ход
AddLogRecord(tm,UserOut(row.chng[0]) + ' ' + SkipOut[uniq_nmb % MoveOut.length]);
break;
case 9: // Использование заклинания
AddLogRecord(tm,UserOut(row.chng[0]) + ' прочитал заклинание <font class="uvor">' + row.wn + '</font>');
break;
case 10: // Использование абилки
AddLogRecord(tm,UserOut(row.chng[0]) + ' использовал абилку <font class="uvor">' + row.wn + '</font>');
break;
case 11: // Использование свитка
AddLogRecord(tm,UserOut(row.chng[0]) + ' использовал свиток <font class="uvor">' + row.wn + '</font>');
break;
case 12: // Урон от яда
AddLogRecord(tm,UserOut(row.chng[0]) + ' ощутил <font class="uvor">действие яда</font> на ' + row.dmg);
break;
case 13: // Изменение здоровья
AddLogRecord(tm,UserOut(row.chng[0]) + ' получил ' + row.dmg + ((row.dmg > 0)?' <font class="luck">здоровья</font>':' повреждений'));
break;
case 14: // Начало раунда
if(row.nmb == 1) { AddLogRecord(tm,"<b>Бой начался</b>"); } else { SwitchRound(skipupd,row.nmb); }
AddLogRecord(tm,"<b>Раунд № "+row.nmb+"</b>");
break;
case 15: // Перелом
AddLogRecord(tm,UserOut(row.chng[0]) + ' ' + PInjOut[row.pt] + ' и получил ' + row.dmg + ' повреждений');
break;
case 16: // Удар по площади
if(row.wn) dmgdsc =  ' из ' + row.wn;
AddLogRecord(tm,UserOut(row.chng[0]) + ' стреляет' + dmgdsc);
break;
case 17: // Заморозка
AddLogRecord(tm,UserOut(row.chng[0]) + ' заморожен' + (row.nmb==0?' до конца боя':''));
break;
case 18: // Завершение боя
AddLogRecord('',"<b>Бой завершен</b>");
break;
case 19: // Получение опыта
AddLogRecord('',UserOut(row.chng[0]) + ' получил ' + row.nmb + ' опыта');
break;
case 20: // Вмешательство или воскрешение
if(skipupd != 1) {
var uid=row.uid;
var aunb = row.unb[row.uid];
if(REMAP[uid]) {
var nunb = REMAP[uid].unb;
nunb.x = aunb.x; 
nunb.y = aunb.y; 
nunb.sd = aunb.sd; 
aunb = nunb;
uid = REMAP[uid].id;
}
if(DEAD[uid]) { delete DEAD[uid]; }
UNBS[uid] = aunb; 
}
AddLogRecord(tm,UserOut({unb:row.uid}) + ' вмешался в бой');
break;
case 21: // Получение травм
AddLogRecord('',UserOut(row.chng[0]) + ' получил ' + InjNames[row.nmb] + ' травму');
break;
case 22: // Использование предмета
AddLogRecord(tm,Ast(row.chng[0].unb) + 'Предмет <font class="dodge">' + row.wn + '</font> ' + UserOut(row.chng[0]) + ' вспыхнул волшебным светом');
break;
case 23: // Установка препятствия
if(skipupd == 0) OBSTACLES[row.ap] = row.obst;
break;
case 24: // Удаление препятствия
if(skipupd == 0) delete OBSTACLES[row.ap];
break;
case 25: // Удар магией
AddLogRecord(tm,Ast(row.chng[0].unb) + UserOut(row.chng[0]) + ' ' + MagHitOut[uniq_nmb % MagHitOut.length] + ' ' + UserOut(row.chng[1]) + ' на ' + row.dmg);
break;
case 26: // Переман
AddLogRecord(tm,Ast(row.chng[0].unb) + UserOut(row.chng[0]) + ' ' + Ent1Out[uniq_nmb % Ent1Out.length] + ' ' + UserOut(row.chng[1]) + ' ' + Ent2Out[uniq_nmb % Ent2Out.length]);
break;
case 27: // Антимагия
dmgdsc = 'Предмет <font class="dodge">' + row.wn + '</font> защитил ' + UserOut(row.chng[0]);
if(row.chng[1]) { dmgdsc = Ast(row.chng[1].unb) + dmgdsc + ' от магии ' + UserOut(row.chng[1]); }
AddLogRecord(tm,dmgdsc);
break;
case 29:
AddLogRecord(tm,Ast(row.chng[0].unb) + UserOut(row.chng[0]) + ' нанес ' + UserOut(row.chng[1]) + ' повреждение на <b>' + row.dmg + '</b>');
break;
case 30: // Тихо помер
if(skipupd != 1) {
var duid = row.chng[0].unb;
if(REMAP[duid]) { duid = REMAP[duid].id; }
var dunb = UNBS[duid];
if(dunb) {
DEAD[duid] = MakeDead(dunb);
delete UNBS[duid];
}}
break;
case 31: // Исчезновение невидимки
if(skipupd != 1) {
var duid = row.chng[0].unb;
if(REMAP[duid]) { duid = REMAP[duid].id; }
var dunb = UNBS[duid];
if(dunb) {
DEAD[duid] = MakeDead(dunb);
DEAD[duid].drm = 1;
delete UNBS[duid]; 
}
}
break;
case 32: // Исчезновение невидимки
if(skipupd != 1) {
var duid = row.chng[0].unb;
if(REMAP[duid]) { duid = REMAP[duid].id; }
var dunb = DEAD[duid];
if(dunb) { DEAD[duid].drm = 1; }
var nd = {nk:row.nk,lvl:row.lvl,rc:row.rc,sd:row.sd};
DEAD[row.uid] = nd;
}
break;
case 33: // Подбор предмета
if(skipupd == 0) delete ITEMS[row.ap];
break;
case 34: // Урон магией стихий
AddLogRecord(tm,Ast(row.chng[0].unb) + UserOut(row.chng[0]) + ' нанес ' + UserOut(row.chng[1]) + ' урон магией ' + SMagicSchools[row.nmb] + ' на <b>' + row.dmg + '</b>' );
break;
case 35: // Переместился/вышел из астрала
if (row.chng[0].astral_level > 0) {
AddLogRecord(tm,UserOut(row.chng[0],1) + ' перешел на '+ row.chng[0].astral_level + ' уровень астрала');
} else {
AddLogRecord(tm,UserOut(row.chng[0],1) + ' вышел из астрала');
}
if(UNBS[row.chng[0].unb]) {
UNBS[row.chng[0].unb].astral_level = row.chng[0].astral_level;
UNBS[row.chng[0].unb].last_calc_astr = row.chng[0].last_calc_astr;
UNBS[row.chng[0].unb].astral = row.chng[0].astral;
}
break;
case 61: // Отразил магию
AddLogRecord(tm,Ast(row.chng[1].unb) + UserOut(row.chng[1]) + ' отразил магию ' + UserOut(row.chng[0]) + ' (действие перка)');
break;
case 62: // Отразил магию Стихий
AddLogRecord(tm,Ast(row.chng[1].unb) + UserOut(row.chng[1]) + ' отразил магию стихий ' + UserOut(row.chng[0]) + ' (действие перка)');
break;
case 63: //Смертельно опасный
AddLogRecord(tm,Ast(row.chng[0].unb) + UserOut(row.chng[0]) + ' нанес смертельно опасный удар ' + UserOut(row.chng[1]) + ' на '+ row.dmg +' (действие перка)');
break;
default: // Действия без параметров
AddLogRecord(tm,UserOut(row.chng[0]) + ' ' + SimpleOut[row.act]);
if((row.act == 50 || row.act == 51 || row.act == 58 || row.act == 60) && skipupd != 1) { // Помер
var duid = row.chng[0].unb;
if(REMAP[duid]) { duid = REMAP[duid].id; }
var dunb = UNBS[duid];
if(dunb) {
if(skipupd == 0) {
if(!ANIMATE && row.act == 58 && ME && ME.id == duid) { 
ME = undefined;
FullReload(); 
}
}
DEAD[duid] = MakeDead(dunb);
delete UNBS[duid];
}
}
break;
}
if(skipupd == 0) {
for(var j in row.chng) { // Регистрируем изменения
var vals=row.chng[j];
if(vals.unb) {
var duid = vals.unb;
if(REMAP[duid]) { duid = REMAP[duid].id; }
if (UNBS[duid]) {
for(var k in uparams) { if (vals[uparams[k]] || vals[uparams[k]] == 0) UNBS[duid][uparams[k]] = vals[uparams[k]]; }
}
}
}
LCID ++;
}
uniq_nmb++;
}
ApplyLogChanges();
}