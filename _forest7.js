var actIframe = top.frames["d_act"];
var chatIframe = top.frames["d_chatact"];
var persIframe = top.frames["d_pers"];

var actIframeDoc = actIframe.document;
var actIframeWin = actIframe.window;
var chatIframeWin = chatIframe.window;
var persIframeDoc = persIframe.document;
var jQueryPers = persIframe.jQuery;
var jQueryAct = actIframe.jQuery;
var sellTrav = [76, 78, 81, 87, 95]; // 80, 86, 90 - испортились; 76 - это сундуки

var resVar = [];
resVar[0] = [5, 8, 9, 27, 29, 30]; // все деревья
resVar[1] = [8, 29]; // только сосны
resVar[2] = [5, 9, 27, 30]; // только дубы (так же красное на островах)
resVar[3] = [70, 71, 72, 73, 74, 75, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113]; // все камни
resVar[4] = [74, 75, 104, 105, 106]; // только медь
resVar[5] = [70, 71, 72, 73, 107, 108, 109, 110, 111, 112, 113]; // только железо (так же золото на островах)
resVar[6] = [5, 8, 9, 27, 29, 30, 70, 71, 72, 73, 74, 75, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113]; // все ресурсы
resVar[7] = [5, 8, 9, 27, 29, 30, 74, 75, 104, 105, 106]; // Все деревья + медь

var resVarLeft = [];
resVarLeft[1] = [-1, -1];
resVarLeft[2] = [0, -1];
resVarLeft[3] = [1, -1];
resVarLeft[4] = [1, 0];
resVarLeft[5] = [1, 1];
resVarLeft[6] = [0, 1];
resVarLeft[7] = [-1, 1];
resVarLeft[8] = [-1, 0];

var resVarRight = [];
resVarRight[1] = [1, -1];
resVarRight[2] = [1, 0];
resVarRight[3] = [1, 1];
resVarRight[4] = [0, 1];
resVarRight[5] = [-1, 1];
resVarRight[6] = [-1, 0];
resVarRight[7] = [-1, -1];
resVarRight[8] = [0, -1];

var resVarFront = [];
resVarFront[1] = [0, -1];
resVarFront[2] = [1, -1];
resVarFront[3] = [1, 0];
resVarFront[4] = [1, 1];
resVarFront[5] = [0, 1];
resVarFront[6] = [-1, 1];
resVarFront[7] = [-1, 0];
resVarFront[8] = [-1, -1];

var resWhere = [];
resWhere[0] = resVarLeft;
resWhere[1] = resVarRight;
resWhere[2] = resVarFront;

var resInCl = [];
var resAutoGo = false;
var currentPosition = "";
var attemptsToChangePosition = 0;
var maxAttepmtsForNewPosition = 5;
var resGoTo = false;
var resNear = false;
var currResourceID = 0;
var search100 = false;
var onlyMify = false;

var naprToDo = [];
naprToDo[1] = ["000", "0000", "111", "00", null, "11", "0", "", "1"];
naprToDo[2] = ["0000", "111", "11", "000", null, "1", "00", "0", ""];
naprToDo[3] = ["111", "11", "1", "0000", null, "", "000", "00", "0"];
naprToDo[4] = ["11", "1", "", "111", null, "0", "0000", "000", "00"];
naprToDo[5] = ["1", "", "0", "11", null, "00", "111", "0000", "000"];
naprToDo[6] = ["", "0", "00", "1", null, "000", "11", "111", "0000"];
naprToDo[7] = ["0", "00", "000", "", null, "0000", "1", "11", "111"];
naprToDo[8] = ["00", "000", "0000", "0", null, "111", "", "1", "11"];

var resFiveCell = [
    270,271,272,273,274,275,276,277,278,279,280,
    299,300,301,302,303,304,305,306,307,308,309,
    328,329,330,331,332,333,334,335,336,337,338,
    357,358,359,360,361,362,363,364,365,366,367,
    386,387,388,389,390,391,392,393,394,395,396,
    415,416,417,418,419,420,421,422,423,424,425,
    444,445,446,447,448,449,450,451,452,453,454,
    473,474,475,476,477,478,479,480,481,482,483,
    502,503,504,505,506,507,508,509,510,511,512,
    531,532,533,534,535,536,537,538,539,540,541,
    560,561,562,563,564,565,566,567,568,569,570
];

var naprMap = {
    "1": "&uarr;",
    "2": "&nearr;",
    "3": "&rarr;",
    "4": "&searr;",
    "5": "&darr;",
    "6": "&swarr;",
    "7": "&larr;",
    "8": "&nwarr;"
};

var NeedChangeNapr = false;
var CanChangeNapr = false;
var CanSearch = false;
var CanJob = false;

var canvasEl = actIframeDoc.getElementById("canvas");
var clickEl = actIframeDoc.getElementById("click");
var pers_info = persIframeDoc.getElementById("BLC_stat");
var sumkaBtn = actIframeDoc.getElementById("sumka");

var popsearch = 0;
var totalsearch = 0;
var destGox = 0;
var destGoy = 0;
var travGox = 0;
var travGoy = 0;
var to4kaGoX = 0;
var to4kaGoY = 0;
var marshrut = [];
var marshTo4ka = [];
var signX = 0;
var signY = 0;

var coorsTrav = [];
var indexTrav = [];
var allTrav = [];
var goToTrav = false;
var ResEndText = "";
var TimeShiftTxt = "";
var TimeShiftShow = false;
var timeshift = 0;
var myPers = actIframeWin.global_data.my_group.sostav.leader;
var my_id = +myPers.id;

var cl = actIframeWin.Client;

var my_gr_id = +actIframeWin.global_data.my_group.sub_type;
var ChangeNapr = 0;
var dobytoRes = 0;
var ResEnd = 0;
var setkaHidden = true;
var showSearchResults = true;
var showWorkResults = true;
var showGrassLogs = true;
var locatorHistoryHidden = true;
var autoSearch = false;
var autoJob = false;
var autoGo = false;
var record = false;
var travnik = false;
var travMC = false;
var autoBot = false;
var sundOnly = false;

// var rez = false;
// checkAccess(my_nick);
// function loadscr() {
if (!actIframeDoc.getElementById("ShowCoord") && clickEl) {
    // рисуем рамку
    var setkaStyleEl = document.createElement('style');
    setkaStyleEl.type = 'text/css';
    var setkaCSS = '@keyframes blinkSide {0% {opacity: 0.2} 50% {opacity: 0.7} 100% {opacity: 0.2}}';
    setkaCSS += '@-webkit-keyframes blinkSide {0% {opacity: 0.2} 50% {opacity: 0.7} 100% {opacity: 0.2}}';
    setkaCSS += '@-moz-keyframes blinkSide {0% {opacity: 0.2} 50% {opacity: 0.7} 100% {opacity: 0.2}}';
    setkaCSS += '#setka {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 1px solid rgba(255, 255, 255, 0.7); width: 385px; height: 385px; display: none}';
    setkaCSS += '#setka .side {position: absolute; text-align: center; width: 50%; height: 50%; background-color: rgb(0, 0, 0); opacity: 0.05;}';
    setkaCSS += '#setka .side.info {width: 35px; height: 35px; line-height: 35px; background-color: transparent; opacity: 1; color: white; font-size: 26px; font-weight: bold;}';

    setkaCSS += '#newCoorsList {width: 300px; height: 200px; resize: vertical; margin: 5px 0;}';
    setkaCSS += '#myCoorsList {width: 300px; height: 200px; resize: vertical; overflow: auto; margin: 5px 0;}';

    // animation
    setkaCSS += '#setka .side.active {animation: blinkSide 3s linear infinite; -webkit-animation: blinkSide 3s linear infinite; -moz-animation: blinkSide 3s linear infinite;}';

    // important color
    setkaCSS += '#setka .side.active.normal {background-color: green;}';
    setkaCSS += '#setka .side.active.warning {background-color: yellow;}';
    setkaCSS += '#setka .side.active.alarm {background-color: red;}';

    // blocks positions - main
    setkaCSS += '#setka .left {width: 35px; line-height: 200px; left: -35px;}';
    setkaCSS += '#setka .right {width: 35px; line-height: 200px; left: 100%;}';
    setkaCSS += '#setka .top {height: 35px; line-height: 35px; top: -35px;}';
    setkaCSS += '#setka .bottom {height: 35px; line-height: 35px; top: 100%;}';

    // blocks positions - corners
    setkaCSS += '#setka .left.top {width: 35px; height: 35px;}';
    setkaCSS += '#setka .right.top {width: 35px; height: 35px;}';
    setkaCSS += '#setka .left.bottom {height: 35px; height: 35px;}';
    setkaCSS += '#setka .right.bottom {height: 35px; height: 35px;}';

    // blocks positions - info
    setkaCSS += '#topLeft {top: 0; left: 0;}';
    setkaCSS += '#topRight {top: 0; right: 0;}';
    setkaCSS += '#bottomRight {bottom: 0; right: 0;}';
    setkaCSS += '#bottomLeft {bottom: 0; left: 0;}';

    // blocks positions - conflicting
    setkaCSS += '#setka .topLeft.left:not(.top) {top: 0;}';
    setkaCSS += '#setka .topLeft.top:not(.left) {left: 0;}';
    setkaCSS += '#setka .topRight.top:not(.right) {left: 50%;}';
    setkaCSS += '#setka .topRight.right:not(.top) {top: 0;}';
    setkaCSS += '#setka .bottomRight.right:not(.bottom) {top: 50%;}';
    setkaCSS += '#setka .bottomRight.bottom:not(.right) {left: 50%;}';
    setkaCSS += '#setka .bottomLeft.bottom:not(.left) {left: 0;}';
    setkaCSS += '#setka .bottomLeft.left:not(.bottom) {top: 50%;}';

    if (setkaStyleEl.styleSheet) {
        setkaStyleEl.styleSheet.cssText = setkaCSS;
    } else {
        setkaStyleEl.appendChild(document.createTextNode(setkaCSS));
    }
    addBefore(canvasEl, setkaStyleEl);

    var setkaDiv = document.createElement('div');
    setkaDiv.id = "setka";
    setkaDiv.innerHTML  = '<div class="side topLeft left"></div>';
    setkaDiv.innerHTML += '<div class="side topLeft left top"></div>';
    setkaDiv.innerHTML += '<div class="side topLeft top"></div>';
    setkaDiv.innerHTML += '<div class="side info" id="topLeft"></div>';

    setkaDiv.innerHTML += '<div class="side topRight top"></div>';
    setkaDiv.innerHTML += '<div class="side topRight right top"></div>';
    setkaDiv.innerHTML += '<div class="side topRight right"></div>';
    setkaDiv.innerHTML += '<div class="side info" id="topRight"></div>';

    setkaDiv.innerHTML += '<div class="side bottomRight right"></div>';
    setkaDiv.innerHTML += '<div class="side bottomRight right bottom"></div>';
    setkaDiv.innerHTML += '<div class="side bottomRight bottom"></div>';
    setkaDiv.innerHTML += '<div class="side info" id="bottomRight"></div>';

    setkaDiv.innerHTML += '<div class="side bottomLeft bottom"></div>';
    setkaDiv.innerHTML += '<div class="side bottomLeft left bottom"></div>';
    setkaDiv.innerHTML += '<div class="side bottomLeft left"></div>';
    setkaDiv.innerHTML += '<div class="side info" id="bottomLeft"></div>';
    addBefore(canvasEl, setkaDiv);

    // Готовим место под наш скрипт
    var persInfoTable = persIframeDoc.querySelector("#BLC_stat > table");
    persInfoTable.style = "display: none";

    var scriptDiv = document.createElement('div');
    scriptDiv.id = "ourPlace";
    addBefore(pers_info.firstChild, scriptDiv);

    var styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    var css = '#ourPlace input {height:initial; font-family: Arial; padding: 0; font-size: 13px}';
    css += '#ourPlace .hide {display: none}';
    css += '#ourPlace input[type=button] {padding: 0 2px; background-color: #FAFAFA;}';
    css += '#ourPlace select {padding: 1px 1px 0; background-color: #FAFAFA;}';
    css += '#mypos, #selpos {width: 50%}';
    css += '#routePointsCount {height:20px; min-width: 26px; text-align: center; box-sizing: border-box; display: inline-block; cursor: pointer; border: solid 1px #285900; background-color: #E3F2C6;}';
    css += '#searchCount, #bigDelay, #toolUsageCount {width: 26px}';
    css += '#destinationXY {width: 75px}';
    css += '#BLC_stat {overflow-y: hidden !important}';
    if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = css;
    } else {
        styleEl.appendChild(document.createTextNode(css));
    }
    addBefore(pers_info.firstChild, styleEl);

    // готовим место под коры
    var coorsDiv = document.createElement('div');
    coorsDiv.id = "ShowCoord";
    coorsDiv.style = "text-align: center;";
    coorsDiv.innerHTML = '<table><tbody><tr><td id="dinjcell"></td></tr></tbody></table>';
    coorsDiv.innerHTML += '<input id="mypos" value="-">';
    coorsDiv.innerHTML += '<input id="selpos" value="-">';
    appendTo(scriptDiv, coorsDiv);

    // готовим кнопки с действиями
    var actionsDiv = document.createElement('div');
    actionsDiv.id = "activBlock";
    actionsDiv.innerHTML = '<label title="Показать/Скрыть рамку">Р:<input id="setkaBtn" type="checkbox" checked></label>';
    actionsDiv.innerHTML += '<label title="Включить/Выключить автопоиск">П:<input id="searchBtn" type="checkbox"></label><input id="searchLogsBtn" type="checkbox" title="Включить/Выключить логи поиска" disabled checked>';
    actionsDiv.innerHTML += '<label title="Включить/Выключить автодобычу">Д:<input id="jobBtn" type="checkbox"></label><input id="jobLogsBtn" type="checkbox" title="Включить/Выключить логи добычи" disabled checked>';
    actionsDiv.innerHTML += selector() + "<br>";
    actionsDiv.innerHTML += '<label title="Макс. кол-во поисков ресурса">КП: <input id="searchCount" placeholder="кол-во" value="1"></label> ';
    actionsDiv.innerHTML += '<label title="Вероятность длительной паузы между поисками и добычей">ВП: <input id="bigDelay" placeholder="%" value="1"></label> ';
    actionsDiv.innerHTML += '<label title="Остаток использования инструмента">ОИ: <input id="toolUsageCount" placeholder="кол-во" value="' + getToolUsageCount() + '"></label> ';
    actionsDiv.innerHTML += '<hr>';
    actionsDiv.innerHTML += '<label title="Собирать траву">Т:<input id="grassBtn" type="checkbox" checked></label><input id="grassLogsBtn" type="checkbox" title="Включить/Выключить логи сбора травы" checked> ';
    actionsDiv.innerHTML += '<label title="Брать только ценное">Ц:<input id="travMCBtn" type="checkbox" checked></label> ';
    actionsDiv.innerHTML += '<label title="Брать только сундуки">C:<input id="sundBtn" type="checkbox" checked></label>';
    actionsDiv.innerHTML += ' | ';
    actionsDiv.innerHTML += '<label title="Показать логи локатора">Л:<input id="locHistoryBtn" type="checkbox" checked></label>';
    actionsDiv.innerHTML += '<hr>';
    actionsDiv.innerHTML += '<input id="destinationXY" placeholder="X:Y" title="Куда X:Y" value="">';
    actionsDiv.innerHTML += '<span id="routePointsCount">0</span>';
    actionsDiv.innerHTML += '<input id="resetRouteBtn" value="Сброс" title="Сбросить все точки маршрута" type="button"><br>';
    actionsDiv.innerHTML += '<input id="destGoBtn" value="GO!" type="button">';
    actionsDiv.innerHTML += '<input id="recordBtn" value="Record!" type="button">';
    actionsDiv.innerHTML += '<input id="forceSaveBtn" value="forceSave" type="button">';
    actionsDiv.innerHTML += '<input id="addRoutePointsBtn" value="+ X.Y." title="Добавить точки для маршрута" type="button">';
    actionsDiv.innerHTML += ' | ';
    actionsDiv.innerHTML += '<input id="clearLCBtn" value="Сброс LS" title="Удалить данные из LocalStorage" type="button">';
    appendTo(scriptDiv, actionsDiv);

    // готовим блок под результаты поиска по карте
    var activCss = '#searchBlock {font-family: Arial; font-size: 16px; position: absolute; top: 340px; width: 300px}';
    activCss += '#searchBlock .block {width: 100%; background-color: white; border: 1px solid silver; resize: vertical; overflow: auto; display: none; margin: 5px 0;}';
    activCss += '#searchBlock .line {width: 100%; background-color: white; border: 1px solid silver; height: 20px; line-height: 20px; display: none}';
    activCss += '#searchBlock .show {display: block}';
    activCss += '#coorsGo {height: 90px}';

    activCss += '#activBlock label {display: inline-block;}';

    activCss += '#locatorLogs {position: relative; background-color: #333333; display: none;}';
    activCss += '#locatorLogs.show {display: block;}';
    activCss += '#locatorLogs input[type=checkbox] {height: auto;}';
    activCss += '#locatorLogs .groupItems {padding-left: 10px; display: none;}';
    activCss += '#locatorLogs .groupItems.show {display: block;}';
    activCss += '#locatorLogs .toggleGroupItems {color: white; font-size: 20px; pointer:cursor;}';
    activCss += '#locatorLogs .itemInside {color: white;}';

    // distance colors
    activCss += '#locatorLogs .normal {color: #00FF00;}';
    activCss += '#locatorLogs .warning {color: yellow;}';
    activCss += '#locatorLogs .alarm {color: #FF0000;}';

    var activEl = document.createElement('style');
    activEl.type = 'text/css';
    if (activEl.styleSheet) {
        activEl.styleSheet.cssText = activCss;
    } else {
        activEl.appendChild(document.createTextNode(activCss));
    }
    addAfter(clickEl, activEl);

    var activDiv = document.createElement('div');
    activDiv.id = "searchBlock"; // autoGoRes
    activDiv.innerHTML += '<div id="locatorLogs" title="Активность в локаторе"></div>';
    activDiv.innerHTML += '<div id="distansGo" class="line" title="Расстояние до координат"></div>';
    activDiv.innerHTML += '<div id="coorsGo" class="block" title="Логирование шагов, расчёт маршрута"></div>';
    addAfter(activEl, activDiv);

    // готовим место под лог поиска и добычи
    var logCss = '#searchResults, #workResults {position: relative; height: 100px; border: 1px solid silver; resize: vertical; overflow: auto; margin: 5px 0; display:none;}';
    logCss += '#searchResults.show, #workResults.show {display: block;}';
    logCss += '#slog {width: 100%; height: 100px; border: 1px solid silver; resize: vertical; overflow: auto; margin: 5px 0; display: none;}';
    logCss += '#slog.show {display: block;}';
    logCss += '#locatorHistory {width: 100%; height: 100px; border: 1px solid silver; resize: vertical; overflow: auto; margin: 5px 0; display: none;}';
    logCss += '#locatorHistory.show {display: block;}';
    logCss += '#locatorHistory .groupItems {padding-left: 20px;}';

    var logEl = document.createElement('style');
    logEl.type = 'text/css';
    if (logEl.styleSheet) {
        logEl.styleSheet.cssText = logCss;
    } else {
        logEl.appendChild(document.createTextNode(logCss));
    }
    addAfter(persIframeDoc.getElementsByTagName("table")[0], logEl);

    var grassLogEl = document.createElement('div');
    grassLogEl.id = "slog";
    grassLogEl.title = "Логи по сбору травы";
    grassLogEl.contentEditable = "true";
    addAfter(logEl, grassLogEl);

    var searchResultsEl = document.createElement('div');
    searchResultsEl.id = "searchResults";
    searchResultsEl.title = "Логи по поиску ресурсов";
    searchResultsEl.contentEditable = "true";
    addAfter(grassLogEl, searchResultsEl);

    var workResultsEl = document.createElement('div');
    workResultsEl.id = "workResults";
    workResultsEl.title = "Логи по добыче ресурсов";
    workResultsEl.contentEditable = "true";
    addAfter(searchResultsEl, workResultsEl);

    var locHistoryEl = document.createElement('div');
    locHistoryEl.id = "locatorHistory";
    locHistoryEl.title = "Логи локатора (история)";
    locHistoryEl.contentEditable = "true";
    addAfter(workResultsEl, locHistoryEl);

    jQueryPers("#setkaBtn").click(toggleSetka);
    jQueryPers("#grassBtn").click(toggleGrass);
    jQueryPers("#grassLogsBtn").click(toggleGrassLogs);
    jQueryPers("#searchBtn").click(toggleSearch);
    jQueryPers("#searchLogsBtn").click(toggleSearchLogs);
    jQueryPers("#jobBtn").click(toggleJob);
    jQueryPers("#jobLogsBtn").click(toggleJobLogs);
    jQueryPers("#destGoBtn").click(toggleDestGo);
    jQueryPers("#recordBtn").click(toggleRecord);
    jQueryPers("#forceSaveBtn").click(forceSave);
    jQueryPers("#sundBtn").click(toggleSundOnly);
    jQueryPers("#locHistoryBtn").click(toggleLocatorHistory);
    jQueryPers("#travMCBtn").click(toggleTravMC);
    jQueryPers("#addRoutePointsBtn").click(showModalToAddPoints);
    jQueryPers("#resetRouteBtn").click(resetRoute);
    jQueryPers("#autoBotBtn").click(autoBotGo);
    jQueryPers("#routePointsCount").click(showRoute);
    jQueryPers("#lozaChb").click(toggleLoza);
    jQueryPers("#mifyChb").click(toggleMify);
    jQueryPers("#clearLCBtn").click(clearLocalStorage);
    jQueryPers("#AutoResMode").change(filterCheckbox);
    jQueryPers("#toolUsageCount").change(changeToolUsageCount);

    var $locatorLogs = jQueryAct(actIframe.document).find("#locatorLogs");
    $locatorLogs.delegate(".toggleSpy", "click", toggleSkipLocator);
    $locatorLogs.delegate(".toggleGroupItems", "click", toggleGroupItems);

    // Forest code improvements
    jQueryAct("#modal_form").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    toggleSetka()
    toggleGrass()
    toggleSundOnly()
    toggleLocatorHistory()
    toggleTravMC()
}

function selector() {
    var txt = '<select id="AutoResMode" name="AutoResMode">';
    txt += '<option value="0">Рубим</option>';
    txt += '<option value="1">Сосна</option>';
    txt += '<option value="2">Дуб</option>';
    txt += '<option value="3">Копаем</option>';
    txt += '<option value="4">Медь</option>';
    txt += '<option value="5">Железо</option>';
    txt += '<option value="6">ВСЕ</option>';
    txt += '<option value="7">Деревья + медь</option>';
    txt += '</select>';
    txt += '<input id="autoBotBtn" value="Бот" type="button"> ';
    txt += '<label id="mifyCheckboxPlace" title="Только мифы" class="hide">М:<input id="mifyChb" type="checkbox"> </label>';
    txt += '<label title="Поиск 100% с лозой">Л:<input id="lozaChb" type="checkbox"></label>';
    return txt;
}

function toggleSetka() {
    var setkaEl = actIframeDoc.getElementById("setka");
    var setkaBtn = persIframeDoc.getElementById("setkaBtn");
    var locatorLogsEl = actIframeDoc.getElementById("locatorLogs");
    if (setkaHidden) {
        setkaEl.style.display = "block";
        setkaBtn.value = "Рамка -";
        locatorLogsEl.classList.add("show");
    } else {
        setkaEl.style.display = "none";
        setkaBtn.value = "Рамка +";
        locatorLogsEl.classList.remove("show");
    }
    setkaHidden = !setkaHidden;
}
function toggleSearch() {
    var searchLogsBtn = persIframeDoc.getElementById("searchLogsBtn");
    var searchResultsEl = persIframeDoc.getElementById("searchResults");
    if (autoSearch) {
        searchResultsEl.classList.remove("show");
        searchLogsBtn.disabled = true;
    } else {
        searchLogsBtn.disabled = false;
        if (showSearchResults) {
            searchResultsEl.classList.add("show");
        }
    }
    autoSearch = !autoSearch;
    persIframeDoc.getElementById("searchBtn").checked = autoSearch;
}
function toggleSearchLogs() {
    var searchResultsEl = persIframeDoc.getElementById("searchResults");
    if (showSearchResults) {
        searchResultsEl.classList.remove("show");
    } else {
        searchResultsEl.classList.add("show");
    }
    showSearchResults = !showSearchResults;
}
function toggleJob() {
    var jobLogsBtn = persIframeDoc.getElementById("jobLogsBtn");
    var workResultsEl = persIframeDoc.getElementById("workResults");
    if (autoJob) {
        workResultsEl.classList.remove("show");
        jobLogsBtn.disabled = true;
    } else {
        jobLogsBtn.disabled = false;
        if (showWorkResults) {
            workResultsEl.classList.add("show");
        }
    }
    autoJob = !autoJob;
    persIframeDoc.getElementById("jobBtn").checked = autoJob;
}
function toggleJobLogs() {
    var workResultsEl = persIframeDoc.getElementById("workResults");
    if (showWorkResults) {
        workResultsEl.classList.remove("show");
    } else {
        workResultsEl.classList.add("show");
    }
    showWorkResults = !showWorkResults;
}
function toggleLocatorHistory() {
    var locatorHistoryEl = persIframeDoc.getElementById("locatorHistory");
    if (locatorHistoryHidden) {
        locatorHistoryEl.classList.add("show");
    } else {
        locatorHistoryEl.classList.remove("show");
    }
    locatorHistoryHidden = !locatorHistoryHidden;
}
function toggleGrass() {
    var travLogEl = persIframeDoc.getElementById("slog");
    var grassLogsBtn = persIframeDoc.getElementById("grassLogsBtn");
    var sundBtn = persIframeDoc.getElementById("sundBtn");
    var travMCEl = persIframeDoc.getElementById("travMCBtn");

    if (travnik) {
        travLogEl.classList.remove("show");
        grassLogsBtn.disabled = true;
        sundBtn.disabled = true;
        sundBtn.checked = false;
        travMCEl.disabled = true;
        travMCEl.checked = false;

        goToTrav = false;
        coorsTrav = [];
        indexTrav = [];
        travGox = 0;
        travGoy = 0;
    } else {
        grassLogsBtn.disabled = false;
        if (showGrassLogs) {
            travLogEl.classList.add("show");
        }
        sundBtn.disabled = false;
        travMCEl.disabled = false;
        sundOnly = false;
        travMC = false;
    }
    travnik = !travnik;
}
function toggleGrassLogs() {
    var grassLogsEl = persIframeDoc.getElementById("slog");
    if (showGrassLogs) {
        grassLogsEl.classList.remove("show");
    } else {
        grassLogsEl.classList.add("show");
    }
    showGrassLogs = !showGrassLogs;
}
function toggleSundOnly() {
    sundOnly = !sundOnly;
}
function toggleTravMC() {
    travMC = !travMC;
}
function toggleLoza() {
    search100 = !search100;
}
function toggleMify() {
    onlyMify = !onlyMify;
}
function filterCheckbox() {
    var searchVar = +jQueryPers('#AutoResMode').val();
    if (searchVar === 2 || searchVar === 5 || searchVar === 6) {
        jQueryPers('#mifyCheckboxPlace').removeClass("hide");
    } else {
        jQueryPers('#mifyCheckboxPlace').addClass("hide");
    }
}
function changeToolUsageCount() {
    setToolUsageCount(jQueryPers('#toolUsageCount').val());
}
function autoBotGo() {
    var autoBotBtn = persIframeDoc.getElementById("autoBotBtn");
    if (resAutoGo) {
        autoBotBtn.value = "Бот";
        CanSearch = false;
        CanChangeNapr = false;
        CanJob = false;
        currResourceID = 0;
        resNear = false;
        resInCl = [];
        resGoTo = false;
    } else {
        autoBotBtn.value = "Сам";
    }
    resAutoGo = !resAutoGo;
}
function toggleDestGo() {
    var destGoBtn = persIframeDoc.getElementById("destGoBtn");
    var distansGoEl = actIframeDoc.getElementById("distansGo");
    var coorsGoEl = actIframeDoc.getElementById("coorsGo");
    if (autoGo) {
        destGoBtn.value = "GO!";
        to4kaGoX = 0;
        to4kaGoY = 0;
        distansGoEl.classList.remove("show");
        coorsGoEl.classList.remove("show");
        if(record) {
            toggleRecord()
        }
    } else {
        destGoBtn.value = "Stop";
        to4kaGoX = 0;
        to4kaGoY = 0;
        distansGoEl.classList.add("show");
        coorsGoEl.classList.add("show");
        if(!record) {
            toggleRecord()
        }
    }
    autoGo = !autoGo;
}

function toggleRecord() {
    var recordBtn = persIframeDoc.getElementById("recordBtn");
    if (record) {
        recordBtn.value = "Record!";
        stopRecord()
    } else {
        recordBtn.value = "Stop record";
        startRecord()
    }
    record = !record;
}

function resetRoute() {
    marshrut = [];
    marshTo4ka = [];
    persIframeDoc.getElementById("routePointsCount").innerHTML = "0";
}

//Profit!
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    locatorCheck();
    if (!persIframeDoc.getElementById("ShowCoord")) {
        clearInterval(myVar);
    }
    if (autoJob || autoSearch || autoBot) {
        if (TimeShiftShow) {
            showTimeShift();
        }
    }

    if (cl.selected > 0) {
        jQueryPers("#selpos").val(cl.posx + ":" + cl.posy);
    }
    var GD = actIframeWin.global_data;
    var myGroup = GD.my_group;
    if (1 === +myGroup.stay && autoGo) {
        attemptsToChangePosition++;
        var myPosX = +myGroup.posx,
            myPosY = +myGroup.posy;
        var newPosition = myPosX + ":" + myPosY;
        if (newPosition === currentPosition && attemptsToChangePosition >= maxAttepmtsForNewPosition) {
            // TODO: change new point and log error
            toggleDestGo(); // Just for now we stop autoBot
            var message = "<strong>Не смог сдвинуться с " + newPosition + "</strong>";
            sendTravMes(message, "coorsGo");
            sendLogMes(message, "slog");
            sendLogMes(message, "searchResults");
            sendLogMes(message, "workResults");
            if (resAutoGo) {
                autoBotGo();
            }
        } else {
            if (newPosition === currentPosition) {
                attemptsToChangePosition++;
            } else {
                currentPosition = newPosition;
                attemptsToChangePosition = 0;
            }
            if (to4kaGoY === 0 && to4kaGoX === 0) {
                var tmpNaprX = (Math.random() * 2 > 1) ? -1 : 1;
                var tmpNaprY = (Math.random() * 2 > 1) ? -1 : 1;

                var tmpShagX = Math.floor(Math.random() * (3)) + 1,
                    tmpShagY = Math.floor(Math.random() * (3)) + 1;
                var tmpPointX = myPosX + (tmpNaprX * tmpShagX),
                    tmpPointY = myPosY + (tmpNaprY * tmpShagY);
                var tmpPointId = tmpPointX + tmpPointY * 6000;
                setTimeout(function() {
                    sendWSMessage("actNewMaps-GotoKletka=" + tmpPointId, "myTimer::tmpto4ka  равна 0!!! GO TO: " + tmpPointX + ":" + tmpPointY);
                }, getRandomInt(300, 800, false));
            } else {
                var destinationPoints = getDestinationPoint();
                if (destinationPoints !== null) {
                    destGox = destinationPoints.x;
                    destGoy = destinationPoints.x;
                }

                if (myPosX === to4kaGoX && myPosY === to4kaGoY) {
                    // to4kaGoX = 0;
                    // to4kaGoY = 0;
                    autoGoFunc(destGox, destGoy);
                } else {
                    if (signX === 0 && signY === 0) {
                        signX = Math.sign(destGox - myPosX);
                        signY = Math.sign(destGoy - myPosY);
                    }
                    to4kaGoX = to4kaGoX + (signX * (-1));
                    to4kaGoY = to4kaGoY + (signY * (-1));

                    sendTravMes("След.т. " + to4kaGoX + "x" + to4kaGoY, "coorsGo");
                    var to4ka = to4kaGoX + (to4kaGoY - 1) * 6000;
                    setTimeout(function() {
                        sendWSMessage("actNewMaps-GotoKletka=" + to4ka, "myTimer::to4ka  равна 0!!! GO TO: " + to4kaGoX + ":" + to4kaGoY);
                    }, getRandomInt(300, 800, false));
                }
            }
        }
    } else {
        attemptsToChangePosition = 0;
    }
    if (resAutoGo) {
        if (currResourceID === 0) {
            resInCl = [];
            var searchVar = jQueryPers('#AutoResMode').val();
            var len = GD.abs_poses_index.length;
            var resourcesDone = getResourcesDone();
            for (var i = 0; i < len; i++) {
                var res = GD.abs_poses[GD.abs_poses_index[i]];
                if (resVar[Number(searchVar)].indexOf(+res.type) >= 0 && resourcesDone.indexOf("" + res.id) < 0) {
                    resInCl.push(Number(res.id));
                }
            }
            if (resInCl.length > 0) {
                // autoGo = true;
                // toggleDestGo();
                if (autoGo) {
                    autoGo = true;
                    toggleDestGo();
                }
                var resVyborObj = resVybor(resInCl);
                currResourceID = resVyborObj.currId;
                if (NeedChangeNapr) {
                    NeedChangeNapr = false;
                    ChangeAutoNapr(resVyborObj.resMinX, resVyborObj.resMinY);
                } else {
                    setTimeout(function() {
                        resGoTo = true;
                        sendWSMessage("actNewMaps-GotoKletka=" + currResourceID, "currResourceID  равна 0!!!");
                    }, getRandomInt(300, 900, true));
                }
            } else {
                if (!autoGo) {
                    autoGo = false;
                    toggleDestGo();
                }
            }
        }
        if (1 === +myGroup.stay && currResourceID > 0 && resGoTo) {
            var resProvObj = resProv(currResourceID);
            if (resNear) {
                if (NeedChangeNapr) {
                    NeedChangeNapr = false;
                    ChangeAutoNapr(resProvObj.resMinX, resProvObj.resMinY);
                } else {
                    CanSearch = true;
                }
                resGoTo = false;
            } else {
                pushResourceDone(currResourceID);
                currResourceID = 0;
            }
        }
        if (CanSearch && ChangeNapr === 0) {
            CanChangeNapr = false;
            CanSearch = false;
            autoSearch = false;
            toggleSearch();
            autoJob = false;
            toggleJob();
            startSearch();
        }
        if (CanJob && ChangeNapr === 1) {
            ChangeNapr = 0;
            CanChangeNapr = false;
            CanSearch = false;
            CanJob = false;
            autoSearch = false;
            toggleSearch();
            autoJob = false;
            toggleJob();
            startKraft1TimeoutId = setTimeout(startKraft1, getRandomInt(1000, 10000, true));
        }
    }
}
function getDestinationPoint() {
    var destinationPoints = persIframeDoc.getElementById("destinationXY").value.split(/[:x]/);
    if (destinationPoints.length !== 2) {
        return null;
    }
    if (!isNumeric(destinationPoints[0]) || !isNumeric(destinationPoints[1])) {
        return null;
    }
    return {
        x: +destinationPoints[0],
        y: +destinationPoints[1]
    };
}
function sendWSMessage(message, description) {
    console.log(description, message);
    cl.send(message);
}

/// ***************************** ///
/// Begin - Локатор игроков рядом ///
var forcedLocatorUpdate = false;
var locatorObjects = {};
var activeGroupsIds = [];
var skipLocatorIds = []; // To be moved to localStorage
var openedItems = [];
var lastMyGroupX = 0, lastMyGroupY = 0;
var maxCountToKeepItem = 14;

function createGroupHtmlForHistory(group, isActive, isNew) {
    var leader = group.sostav.leader,
        groupX = +group.posx,
        groupY = +group.posy,
        items = group.sostav.items,
        iLen = items.length;
    var diffX = groupX - lastMyGroupX,
        diffY = groupY - lastMyGroupY;

    var html = isNew ? 'IN: ' : 'OUT: ';
    html += (isNew ? '<strong>' : '') + getItemHtml(leader) + (isNew ? '</strong>' : '');
    html += isActive ? ' !!!' : '';
    html += +group.agres === 1 ? ' Агр' : '';
    html += ' (' + diffX + ':' + diffY + ', ' + naprMap[group.napr] + ')';
    html += ' [' + (iLen + 1) + ' чел.] ';
    if (group.nahodki) {
        html += ' [' + group.nahodki + ' н.]';
    }
    html += getPersLocationHtml();

    if (group.shipname !== undefined) {
        html += '<div class="shipInfo">' + group.shipname + ' (' + group.shiptp + ')</div>';
    }

    // рисуем состав группы, если она новая
    if (isNew && iLen > 0) {
        html += '<div class="groupItems">';
        for (var j = 0; j < iLen; j++) {
            html += '<div class="itemInside">';
            html += getItemHtml(items[j]);
            html += '</div>';
        }
        html += '</div>';
    }
    return html;
}

function logAppearedGroupForHistory(group, isActive) {
    sendLogMes(createGroupHtmlForHistory(group, isActive, true), "locatorHistory");
}
function logDeletedGroupForHistory(group, isActive) {
    sendLogMes(createGroupHtmlForHistory(group, isActive, false), "locatorHistory");
}
function needGroupsUpdate() {
    var isChanged = false;
    var leaderIds = Object.keys(locatorObjects);
    var leaderId, group, i, len;
    // Увеличиваем индекс обновления для всех объектов
    for (i = 0, len = leaderIds.length; i < len; i++) {
        locatorObjects[leaderIds[i]].updatesCount++;
    }

    // Пересобираем группы тех, кто в радиусе видимости
    var groupsIndexes = actIframeWin.global_data.groups_index,
        groups = actIframeWin.global_data.groups;
    for (i = 0, len = groupsIndexes.length; i < len; i++) {
        if (!isValidGroup(groups, groupsIndexes[i])) {
            // Это ошибочная группа, её не надо добавлять
            continue;
        }
        group = Object.assign({}, groups[groupsIndexes[i]]);
        leaderId = "" + group.sostav.leader.id;
        if (locatorObjects.hasOwnProperty(leaderId) && group.isActive) {
            // Данные о группе уже получены в "uzhas"
            continue;
        } else if (!locatorObjects.hasOwnProperty(leaderId)) {
            // Новая группа, необходимо отобразить
            isChanged = true;
            logAppearedGroupForHistory(group);
        }
        group.updatesCount = 0;
        locatorObjects[leaderId] = group;
    }

    // Обновляем айдишки объектов локатора
    leaderIds = Object.keys(locatorObjects);
    // Удаляем устаревшие записи
    for (i = 0, len = leaderIds.length; i < len; i++) {
        group = locatorObjects[leaderIds[i]];
        if (group.updatesCount > maxCountToKeepItem) {
            delete locatorObjects[leaderIds[i]];
            isChanged = true;

            var activeGroupIdIndex = activeGroupsIds.indexOf(leaderIds[i]);
            if (activeGroupIdIndex > -1) {
                activeGroupsIds.splice(activeGroupIdIndex, 1);
                logDeletedGroupForHistory(group, true);
            } else {
                logDeletedGroupForHistory(group, false);
            }
        }
    }

    // Перерисовка, если наш персонаж двигается
    var myGroupX = +actIframeWin.global_data.my_group.posx;
    var myGroupY = +actIframeWin.global_data.my_group.posy;
    if (lastMyGroupX !== myGroupX || lastMyGroupY !== myGroupY) {
        lastMyGroupX = myGroupX;
        lastMyGroupY = myGroupY;
        isChanged = true;
    }
    return isChanged;
}

function getDistanceClassName(distance) {
    var distanceClass = "normal";
    if (distance <= 24 && distance > 12) {
        distanceClass = "warning";
    } else if (distance <= 12) {
        distanceClass = "alarm";
    }
    return distanceClass;
}

function locatorCheck() {
    if (!forcedLocatorUpdate && !needGroupsUpdate()) {
        return;
    }
    forcedLocatorUpdate = false;

    jQueryAct("#setka .side")
        .removeClass("active")
        .removeClass("normal")
        .removeClass("warning")
        .removeClass("alarm");
    jQueryAct("#setka .side.info").text("");
    jQueryAct("#locatorLogs").text("");

    var leaderIds = Object.keys(locatorObjects);
    var len = leaderIds.length;
    if (len === 0) {
        // Нечего проверять
        return;
    }

    var i;
    var myGroupX = +actIframeWin.global_data.my_group.posx;
    var myGroupY = +actIframeWin.global_data.my_group.posy;
    var group, otherGroupX, otherGroupY, diffX, diffY, distance, className;
    var classes = {}, classObj, foundGroups = [];
    for (i = 0; i < len; i++) {
        group = locatorObjects[leaderIds[i]];
        otherGroupX = +group.posx;
        otherGroupY = +group.posy;

        diffX = otherGroupX - myGroupX;
        diffY = otherGroupY - myGroupY;

        distance = Math.max(Math.abs(diffX), Math.abs(diffY));

        if (distance > 30) {
            // Удаляем объект, который от нас далеко
            delete locatorObjects[leaderIds[i]];

            var activeGroupIdIndex = activeGroupsIds.indexOf(leaderIds[i]);
            if (activeGroupIdIndex > -1) {
                activeGroupsIds.splice(activeGroupIdIndex, 1);
                logDeletedGroupForHistory(group, true);
            } else {
                logDeletedGroupForHistory(group, false);
            }
            continue;
        }
        group.distance = distance;
        group.diffX = diffX;
        group.diffY = diffY;
        foundGroups.push(group);

        if (skipLocatorIds.indexOf(+leaderIds[i]) > -1) {
            // Нам не нужно следить за этим объектом. Просто пишем кооры
            continue;
        }

        className = diffY < 0 ? "top" : "bottom";
        className += diffX < 0 ? "Left" : "Right";

        classObj = classes[className];
        if (!classObj) {
            classes[className] = {
                distance: distance,
                count: 1
            };
        } else {
            classObj.distance = Math.min(distance, classObj.distance);
            classObj.count++;
        }
    }

    var classesIds = Object.keys(classes);
    len = classesIds.length;
    var sideElements, distanceClass;
    for (i = 0; i < len; i++) {
        className = classesIds[i];
        classObj = classes[className];
        distance = classObj.distance;

        sideElements = jQueryAct("." + className);
        sideElements.addClass("active");
        jQueryAct("#" + className).text(classObj.count);

        distanceClass = getDistanceClassName(distance);
        sideElements.addClass(distanceClass);
    }

    logFoundGroups(foundGroups);
}

function getItemHtml(itemObj) {
    var html = '<a href="#' + itemObj.id + '" onmouseup="top.frames[\'d_chatact\'].setPrivate(' + itemObj.id + ',\'' + itemObj.nick + '\');return false;" title="Приват">' +
        '<img src="img/smbprivat.gif" width="13" height="12" alt="" border="0">' +
        '</a> ';
    html += itemObj.nick + ' ' + itemObj.lvl;
    html += ' <a class="infoimg" href="/info.html?user=' + itemObj.id + '" target="_blank" title="Информация">' +
        '<img src="img/info.gif" width="16" height="16" alt="" border="0">' +
        '</a>';
    return html;
}

function logFoundGroups(foundGroups) {
    var sortedGroups = foundGroups.sort(function (a, b) {
        return a.distance - b.distance;
    });
    var $locatorLogs = jQueryAct("#locatorLogs");
    var group, leader, items, distanceClass, isOpenedItems;
    for (var i = 0, len = sortedGroups.length; i < len; i++) {
        group = sortedGroups[i];
        leader = group.sostav.leader;
        items = group.sostav.items;
        var itemsHtml = '', iLen = items.length, itemObj;
        for (var j = 0; j < iLen; j++) {
            itemObj = items[j];
            itemsHtml += '<div class="itemInside" id="' + itemObj.id + '">';
            itemsHtml += getItemHtml(itemObj);
            itemsHtml += '</div>';
        }

        isOpenedItems = openedItems.indexOf(+leader.id) > -1;
        distanceClass = getDistanceClassName(group.distance);
        $locatorLogs.append('<div class="' + distanceClass + '" id="leader' + leader.id + '">' +
            getItemHtml(leader) +
            ' (' + group.diffX + ':' + group.diffY + ', ' + naprMap[group.napr] + ')' +
            ' [' + (iLen + 1) + ' чел.]' +
            (group.nahodki ? ' [' + group.nahodki + ' н.]' : '') +
            (itemsHtml !== "" ? ' <span class="toggleGroupItems" data-leader-id="' + leader.id + '">' + (isOpenedItems ? '-' : '+') + '</span> ' : '') +
            ' <input type="checkbox" class="toggleSpy" data-leader-id="' + leader.id + '" ' + (skipLocatorIds.indexOf(+leader.id) < 0 ? 'checked' : '') + ' title="Показывать в рамке" />' +
            (group.shipname !== undefined ? '<div class="shipInfo">' + group.shipname + ' (' + group.shiptp + ')</div>' : '') +
            (itemsHtml !== "" ? ' <div class="groupItems' + (isOpenedItems ? ' show' : '') + '" data-leader-id="' + leader.id + '">' + itemsHtml + '</div>' : '') +
            '</div>');
    }
}

function toggleGroupItems($event) {
    var leaderId = +jQueryAct($event.currentTarget).attr("data-leader-id");
    var $locatorLogs = jQueryAct("#locatorLogs");

    var $toggleGroupItems = $locatorLogs.find(".toggleGroupItems[data-leader-id=" + leaderId + "]");
    $toggleGroupItems.text($toggleGroupItems.text() === "+" ? "-" : "+");

    var $groupItems = $locatorLogs.find(".groupItems[data-leader-id=" + leaderId + "]");
    if ($groupItems.hasClass("show")) {
        $groupItems.removeClass("show");
        openedItems.splice(openedItems.indexOf(leaderId), 1);
    } else {
        $groupItems.addClass("show");
        openedItems.push(leaderId);
    }
}

function toggleSkipLocator($event) {
    var leaderId = +jQueryAct($event.currentTarget).attr("data-leader-id");
    var index = skipLocatorIds.indexOf(leaderId);
    if (index < 0) {
        skipLocatorIds.push(leaderId);
    } else {
        skipLocatorIds.splice(index, 1);
    }
    forcedLocatorUpdate = true;
    locatorCheck();
}

function isValidGroup(groups, groupIndex) {
    if (groupIndex === 0) {
        // Индекс группы не может быть 0. Скорее всего баг лесной
        return false;
    }
    var group = groups[groupIndex];
    if (myPers.id === group.sostav.leader.id) {
        // Это наша группа! Не нужно добавлять
        return false;
    }
    return true;
}

function uzhas(mgr) {
    var group = Object.assign({}, mgr);
    console.log("UZHAS", JSON.stringify(group.sostav));

    forcedLocatorUpdate = true;

    var leaderId = "" + group.sostav.leader.id;
    group.isActive = true;
    group.updatesCount = 0;
    locatorObjects[leaderId] = group;

    if (activeGroupsIds.indexOf(leaderId) === -1) {
        logAppearedGroupForHistory(group, true);
        activeGroupsIds.push(leaderId);
    }

    locatorCheck();
}
/// End - Локатор игроков рядом ///
/// *************************** ///

function getPersLocationHtml() {
    var mg = actIframeWin.global_data.my_group;
    return "(" + mg.posx +":" + mg.posy + ", " + naprMap[mg.napr] + ")";
}

function resVybor(resInCl) {
    var myGrPosX = actIframeWin.global_data.my_group.posx,
        myGrPosY = actIframeWin.global_data.my_group.posy;
    var curID = 0,
        resMinX = 15,
        resMinY = 15,
        deltaX = 0,
        deltaY = 0;
    for (var i = 0; i < resInCl.length; i++) {
        deltaX = resInCl[i] % 6000 - myGrPosX;
        deltaY = (parseInt((resInCl[i] + 6000) / 6000)) - myGrPosY;
        if (Math.abs(deltaX) + Math.abs(deltaY) < Math.abs(resMinX) + Math.abs(resMinY)) {
            resMinX = deltaX;
            resMinY = deltaY;
            curID = resInCl[i];
        }
    }
    if (Math.abs(resMinX) < 2 && Math.abs(resMinY) < 2) {
        NeedChangeNapr = true;
        resNear = true;
    } else {
        NeedChangeNapr = false;
        resNear = false;
    }
    return {
        currId: curID,
        resMinX: resMinX,
        resMinY: resMinY
    };
}
function resProv(IdRes) {
    var myGrPosX = actIframeWin.global_data.my_group.posx,
        myGrPosY = actIframeWin.global_data.my_group.posy;
    var resMinX = IdRes % 6000 - myGrPosX;
    var resMinY = (parseInt((IdRes + 6000) / 6000)) - myGrPosY;

    if (Math.abs(resMinX) < 2 && Math.abs(resMinY) < 2) {
        NeedChangeNapr = true;
        resNear = true;
    } else {
        resNear = false;
        NeedChangeNapr = false;
    }
    return {
        resMinX: resMinX,
        resMinY: resMinY
    }
}
var varToDoMatrix = {
    "1": {
        "1": 3,
        "0": 6,
        "-1": 9
    },
    "0": {
        "1": 2,
        "-1": 8
    },
    "-1": {
        "1": 1,
        "0": 4,
        "-1": 7
    }
};
function ChangeAutoNapr(resMinX, resMinY) {
    var resXStr = "" + resMinX;
    var resYStr = "" + resMinY;

    var varToDo = 0;
    if (varToDoMatrix.hasOwnProperty(resXStr)) {
        var varToDoX = varToDoMatrix[resXStr];
        if (varToDoX.hasOwnProperty(resYStr)) {
            varToDo = varToDoX[resYStr];
        }
    }
    if (varToDo === 0) {
        alert("Я таких значений не знаю: resminx: " + resXStr + ", resminy: " + resYStr);
    } else {
        var currDirection = +actIframeWin.global_data.my_group.napr;
        // if (currDirection > 1){
        //     var deltanapr = currDirection - 1;
        //     varToDo -= deltanapr;
        //     if (varToDo < 0) {
        //         varToDo += 8;
        //     }
        // }
        var tryToDo = naprToDo[currDirection][varToDo - 1];
        if (tryToDo !== null && tryToDo !== "") {
            CanChangeNapr = true;
            changeDirectionByList(tryToDo.split(""));
        } else {
            CanSearch = true;
        }
    }
}
function changeDirectionByList(dirList) {
    clearTimeout(changeDirectionTimeoutId);
    if (dirList.length > 0) {
        changeDirectionTimeoutId = setTimeout(function () {
            var direction = dirList.shift();
            changeDirection(direction);
            changeDirectionByList(dirList);
        }, getRandomInt(100, 500, false));
    } else {
        CanSearch = true;
    }
}
function SearchLog(obj) {
    // console.log(top.frames["d_act"].window.datta);
    // var obj = actIframeWin.datta.to_add_items;
    if (obj !== undefined) {
        var addItems = obj.to_add_items;
        var imgBT = actIframeWin.img_by_type;
        if (addItems !== undefined) {
            for (var j = 0; j < addItems.length; j++) {
                var item = addItems[j];
                var itemType = +item.type;
                if (itemType > 75 && itemType < 98) {
                    var itemTitle = imgBT[itemType].title;
                    if (travnik && sundOnly && itemType === 76) {
                        if (allTrav.indexOf(item.id) < 0) {
                            indexTrav.push(item.id);
                            allTrav.push(item.id);
                            coorsTrav[item.id] = [item.posx, item.posy, itemTitle];
                        }
                    } else if (travnik && !sundOnly && travMC && sellTrav.indexOf(itemType) >= 0) {
                        if (allTrav.indexOf(item.id) < 0) {
                            indexTrav.push(item.id);
                            allTrav.push(item.id);
                            coorsTrav[item.id] = [item.posx, item.posy, itemTitle];
                        }
                    } else if (travnik && !travMC && !sundOnly && (itemType !== 82 || isInTheSea())) {
                        if (allTrav.indexOf(item.id) < 0) {
                            indexTrav.push(item.id);
                            allTrav.push(item.id);
                            coorsTrav[item.id] = [item.posx, item.posy, itemTitle];
                        }
                    }
                    var toTake = allTrav.indexOf(item.id) > -1;
                    var msg = (toTake ? "" : " [МИМО] ") + itemTitle + " " + item.posx + "x" + item.posy;
                    sendLogMes(msg, "slog");
                }
            }
        }
        if (obj.my_gr !== undefined) {
            jQueryPers("#mypos").val(obj.my_gr.posx + ":" + obj.my_gr.posy);
            if (autoGo) {
                var destinationPoints = getDestinationPoint();
                if (destinationPoints !== null) {
                    destGox = destinationPoints.x;
                    destGoy = destinationPoints.y;

                    if (destGox > 0 && destGoy > 0) {
                        if (
                            (indexTrav.length > 0 && !goToTrav)
                            || (+obj.my_gr.stay === 1)
                            || (Math.abs(obj.my_gr.posx - to4kaGoX) < 2 && Math.abs(obj.my_gr.posy - to4kaGoY) < 2)
                            || (to4kaGoX === 0 && to4kaGoY === 0)
                        ) {
                            var autoGoResDiv = actIframeDoc.getElementById("distansGo");
                            autoGoResDiv.innerHTML = "--> O: по х:" + (destGox - obj.my_gr.posx) + ", по у:" + (destGoy - obj.my_gr.posy);
                            autoGoFunc(destGox, destGoy);
                        }
                    }
                } else {
                    toggleDestGo();
                }
            }
        }
    }
}

function isInTheSea() {
    var myPosY = actIframeWin.global_data.my_group.posy;
    if (myPosY > 3000) {
        return true;
    }
    var myPosX = actIframeWin.global_data.my_group.posx;
    return myPosY > 2250 && myPosX > 4500;
}

// фича с присасыванием к чату и его обработка
// var ws = chatIframeWin.Client;
chatIframeWin.Client.decode = function(e) {
    var str = JSON.parse(e);
    pars_log(str);
    return str;
};

var startKraft1TimeoutId = null,
    startKraft3TimeoutId = null,
    startSearchTimeoutId = null,
    gasimovTimeoutId = null,
    changeDirectionTimeoutId = null,
    setIntervalId = null,
    count = 0;

function startKraft1() {
    if (autoJob) {
        gasimov();
        sendWSMessage("actNewMaps-StartDobycha=1", "startKraft1");
        popsearch = 0;
        totalsearch = 0;
        ChangeNapr = 0;
        setIntervalId = setInterval(check_capcha_val, 3000);
        console.log("CHECK CAPCHA FROM KRAFT 1");
    }

    clearTimeout(startKraft1TimeoutId);
    startKraft1TimeoutId = null;

}

function check_capcha_val() {
    count++
    console.log("COUNT: " + count);
    if  (getComputedStyle(actIframeDoc.getElementById('modal_form'), null).display === "none") {
        clearInterval(setIntervalId);
        count = 0;
    } else {
        if (actIframeDoc.getElementById('capchacode').value.length == 4){
            sendLogMes("Введен код: " + actIframeDoc.getElementById('capchacode').value, "workResults");
            fireClick(actIframeDoc.querySelectorAll('input[value=Отправить]')[0]);
            count = 0;
        }
        if (count > 30) {
            sendLogMes('Код не введен, обновляю', "workResults");
            fireClick(actIframeDoc.querySelectorAll('input[value=Отправить]')[0]);
            count = 0;
        }
    }
}

function fireClick(node){
    if (document.CreateEvent) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);
    } else if (document.createEventObject) {
        node.fireEvent('onclick');
    } else if (typeof node.onclick == 'function' ) {
        node.onclick('click');
    }
}

function startKraft3() {
    if (autoJob) {
        gasimov();
        sendWSMessage("actNewMaps-StartDobycha=1", "startKraft3");
        setIntervalId = setInterval(check_capcha_val, 3000);
        console.log("CHECK CAPCHA FROM KRAFT 3")
    }

    clearTimeout(startKraft3TimeoutId);
    startKraft3TimeoutId = null;
}

function startSearch() {
    if (autoSearch || CanSearch) {
        popsearch++;
        gasimov();
        sendWSMessage("actNewMaps-StartSearch=1", "startSearch");
    }

    clearTimeout(startSearchTimeoutId);
    startSearchTimeoutId = null;
}

function changeDirection(direction) {
    if (autoSearch || autoJob || CanChangeNapr) {
        sendWSMessage("actNewMaps-ChangeNapr=" + direction, "changeDirection");
        ChangeNapr = 1;
    }

    clearTimeout(changeDirectionTimeoutId);
    changeDirectionTimeoutId = null;
}

function pars_log(str) {
    var t = "";
    var mgr = str.my_gr;
    var imgBT = actIframeWin.img_by_type;
    var group_id = +str.group_id,
        flags = +str.flags,
        wait_event = + str.wait_event,
        to_cut = str.to_cut;

    if (flags === 11 && wait_event === 0 && group_id === my_gr_id) {
        t = str.txt;
    }

    if (flags === 9) { // && 1 === +str.item.__destroyed
        var resPosX = +str.item.posx;
        var resPosY = +str.item.posy;
        var type = +str.item.type;
        var myGrPosX = actIframeWin.global_data.my_group.posx;
        var myGrPosY = actIframeWin.global_data.my_group.posy;
        var deltaX = Math.abs(resPosX - myGrPosX);
        var deltaY = Math.abs(resPosY - myGrPosY);
        if (deltaX < 2 && deltaY < 2 && (type <= 75 || type >= 98)) {
            ResEndText = "<strong>Ресурс " + imgBT[type].title + " закончился</strong> " + getPersLocationHtml();
            ResEnd = 1;
            if (resAutoGo) {
                setTimeout(function() {
                    pushResourceDone(currResourceID);
                    currResourceID = 0;
                    CanSearch = false;
                    CanChangeNapr = false;
                    CanJob = false;
                    resNear = false;
                    resGoTo = false;
                    gasimov();
                }, getRandomInt(1000, 5000, true));
            }
        }
        if (deltaX < 3 && deltaY < 3 && type > 75 && type < 98) {
            ResEndText = "<strong>" + imgBT[type].title + " забрал </strong>" + getPersLocationHtml();
            sendLogMes(ResEndText, "slog");
            goToTrav = false;
            var itemIndex = indexTrav.indexOf(str.item.id);
            if (itemIndex > -1) {
                indexTrav.splice(itemIndex, 1);
            }
        }
    }

    if (to_cut === null && ChangeNapr === 1 && startKraft1TimeoutId === null && !resAutoGo) {
        startKraft1TimeoutId = setTimeout(startKraft1, getRandomInt(1000, 5000, false));
    }
    if (to_cut === null && ChangeNapr === 1 && CanChangeNapr) {
        ChangeNapr = 0;
    }

    if ((t !== "" && t !== undefined) && group_id === my_gr_id) {
        if ((t === "Ничего не найдено" || t.indexOf("в радиусе 5 шагов от Вас") > 0) && startSearchTimeoutId === null) {
            totalsearch++
            resNotFound(t + " " + getPersLocationHtml());
        } else if (t.indexOf("а также") > 0 && startSearchTimeoutId === null) {
            totalsearch++
            resNotFound(t + " " + getPersLocationHtml());
        } else if (t.indexOf("прямо перед Вами") > 0 && startKraft1TimeoutId === null) {
            sendLogMes(t + " " + getPersLocationHtml(), "searchResults");
            sendLogMes(t + " " + getPersLocationHtml(), "workResults");
            //resGoTo = false;
            //toggleJob();
            //autoJob = true;
            //takeTool(getCurrResourceType());
            resCheckFront(t);
        } else if (t.indexOf("слева от Вас") > 0 && changeDirectionTimeoutId === null) {
            if (resAutoGo) {
                resCheckSide(0, t + " " + getPersLocationHtml());
            } else {
                sendLogMes(t + " " + getPersLocationHtml(), "searchResults");
                sendLogMes(t + " " + getPersLocationHtml(), "workResults");
                changeDirectionTimeoutId = setTimeout(function () {
                    changeDirection(0);
                }, getRandomInt(300, 2000, false));
            }
        } else if (t.indexOf("справа от Вас") > 0 && changeDirectionTimeoutId === null) {
            if (resAutoGo) {
                resCheckSide(1, t + " " + getPersLocationHtml());
            } else {
                sendLogMes(t + " " + getPersLocationHtml(), "searchResults");
                sendLogMes(t + " " + getPersLocationHtml(), "workResults");
                changeDirectionTimeoutId = setTimeout(function() {
                    changeDirection(1);
                }, getRandomInt(300, 2000, false));
            }
        } else if (t.indexOf("Введите код") > 0 && autoJob ) {
            setIntervalId = setInterval(check_capcha_val, 3000);
        } else if (t.indexOf("вывихнули") > 0 && autoJob) {
            sendLogMes(t, "workResults");
            autoJob = true;
            toggleJob();
            resGoTo = false;
            setTimeout(function() {
                autoJob = false;
                toggleJob();
                if (currResourceID > 0) {
                    resGoTo = true;
                }
                sendWSMessage("actNewMaps-StartDobycha=1", "Вывих");
            }, getRandomInt(300000, 350000, true));
        } else if (t.indexOf("Топор лесоруба") > 0 && autoJob) {
            autoJob = true;
            toggleJob();
            resGoTo = false;
            sendLogMes(t + " " + getPersLocationHtml(), "workResults");
            takeTool("topor");
        } else if (t.indexOf("Кирка рудокопа") > 0 && autoJob) {
            autoJob = true;
            toggleJob();
            resGoTo = false;
            sendLogMes(t + " " + getPersLocationHtml(), "workResults");
            takeTool("kirka");
        } else {
            popsearch = 0;
            sendLogMes(t, "workResults");
        }
    }

    if (mgr !== undefined) {
        var sostav = mgr.sostav;
        if (sostav === undefined && flags === 11 && startKraft3TimeoutId === null && group_id === my_gr_id) {
            dobytoRes++;
            sendLogMes("Сруб-" + dobytoRes + "/Всего-" + mgr.nahodki, "workResults");
            var toolUsageCount = decreaseToolUsageCount();
            if (ResEnd === 1) {
                sendLogMes(ResEndText, "workResults");
                dobytoRes = 0;
                ResEnd = 0;
            } else if (autoJob) {
                if (toolUsageCount > 0) {
                    startKraft3TimeoutId = setTimeout(startKraft3, getRandomInt(1000, 10000, true));
                    actIframeWin.OpenModal(TimeShiftTxt, 0);
                } else {
                    var resourceType = getCurrResourceType();
                    if (resourceType !== null) {
                        autoJob = true;
                        toggleJob();
                        resGoTo = false;
                        sendLogMes("Закончился инструмент " + getPersLocationHtml(), "workResults");
                        takeTool(resourceType);
                    }
                }

            }
        } else if (sostav !== undefined) {
            var leader_id = +mgr.sostav.leader.id;
            if (leader_id !== undefined) {
                if (leader_id === my_id) {
                    SearchLog(str);
                } else {
                    uzhas(mgr);
                }
            }
        }
    }
}
function decreaseToolUsageCount() {
    var toolUsageCount = getToolUsageCount() - 1;
    if (toolUsageCount < 0) {
        toolUsageCount = 100;
    }
    jQueryPers("#toolUsageCount").val(toolUsageCount).change();
    return toolUsageCount;
}

/// ************************************** ///
/// Begin - Проверка, правильный ли ресурс ///
function isMifRes(msg) {
    return msg.indexOf("красное дерево") > -1 || msg.indexOf("золото") > -1;
}

function getCurrResourceType() {
    var GD = actIframeWin.global_data;
    var myPosX = +GD.my_group.posx;
    var myPosY = +GD.my_group.posy;
    var myDirection = +GD.my_group.napr;
    var len = GD.abs_poses_index.length;

    //  ресурс от нас находится по корам
    var tmpResX = myPosX + resWhere[2][myDirection][0];
    var tmpResY = myPosY + resWhere[2][myDirection][1];

    // Координаты ресурса перед нами
    var tmpIDRes = tmpResX + (tmpResY - 1) * 6000;

    var resource = null;
    for (var i = 0; i < len; i++) {
        var res = GD.abs_poses[GD.abs_poses_index[i]];
        if (+res.id === tmpIDRes) {
            if (resVar[0].indexOf(+res.type) > -1 || resVar[3].indexOf(+res.type) > -1) {
                resource = res;
            }
            break;
        }
    }
    if (resource === null) {
        return null;
    }
    return resVar[0].indexOf(+res.type) > -1 ? "topor" : "kirka";
}

function resCheckFront(msg) {
    if (!onlyMify || !resAutoGo || resAutoGo && onlyMify && isMifRes(msg)) {
        startKraft1TimeoutId = setTimeout(startKraft1, getRandomInt(1000, 10000, true));
    } else {
        // Если ищем мифы, а выпал не миф - идём искать дальше
        resNotFound(msg);
    }
}

function resCheckSide(where, t) {
    var searchVar = jQueryPers('#AutoResMode').val();
    var GD = actIframeWin.global_data;
    var myGrPosX = GD.my_group.posx;
    var myGrPosY = GD.my_group.posy;
    var myDirection = Number(GD.my_group.napr);

    //  ресурс от нас находится по корам
    var tmpResX = myGrPosX + resWhere[where][myDirection][0];
    var tmpResY = myGrPosY + resWhere[where][myDirection][1];

    var tmpIDRes = tmpResX + (tmpResY - 1) * 6000;
    var rez = false;
    var len = GD.abs_poses_index.length;
    for (var i = 0; i < len; i++) {
        var res = GD.abs_poses[GD.abs_poses_index[i]];
        if (+res.id === tmpIDRes) {
            if (resVar[Number(searchVar)].indexOf(Number(res.type)) >= 0) {
                if (!onlyMify || onlyMify && isMifRes(t)) {
                    currResourceID = tmpIDRes;
                    rez = true;
                    sendLogMes(t, "searchResults");
                    sendLogMes(t, "workResults");
                    CanJob = true;
                    changeDirectionTimeoutId = setTimeout(function() {
                        changeDirection(where);
                    }, getRandomInt(300, 2000, false));
                }
            }
        }
    }
    if (!rez) {
        totalsearch++
        resNotFound(t);
    }
}
function resNotFound(t) {
    if (resAutoGo) {
        sendLogMes("(" + totalsearch + ") " + (popsearch) + " " + t, "searchResults");
    } else {
        sendLogMes("(" + totalsearch + ") " + (popsearch + 1) + " " + t, "searchResults");
    }
    var searchCount = + persIframeDoc.getElementById("searchCount").value;
    if (popsearch < searchCount) {
        var isLong = true;
        if (searchCount < 2) {
            isLong = false;
        }
        startSearchTimeoutId = setTimeout(startSearch, getRandomInt(1000, 10000, isLong));
    } else {
        if (resAutoGo) {
            setTimeout(function() {
                if (t === "Ничего не найдено" && search100) {
                    var searchVar = jQueryPers('#AutoResMode').val();
                    var GD = actIframeWin.global_data;
                    var len = resFiveCell.length;
                    for (var i = 0; i < len; i++) {
                        var res = GD.abs_poses[resFiveCell[i]];
                        if (res !== undefined) {
                            if (resVar[+searchVar].indexOf(+res.type) >= 0) {
                                pushResourceDone(res.id);
                            }
                        }
                    }
                }
                pushResourceDone(currResourceID);
                currResourceID = 0;

                CanSearch = false;
                CanChangeNapr = false;
                CanJob = false;
                resNear = false;
                resGoTo = false;
                gasimov();
            }, getRandomInt(300, 3000, true));
        }
        popsearch = 0;
    }
}
/// End - Проверка, правильный ли ресурс ///
/// ************************************ ///

/// **************************** ///
/// Begin - Одевание инструмента ///
var newWin, reloadAttempts = 3;
function takeTool(toolName) {
    reloadAttempts = 3;
    tryToOpenABag(toolName);
}

function tryToOpenABag(toolName) {
    var bagUrl = sumkaBtn.getAttribute("onClick")
        .replace("newWin2('", "")
        .replace("','sumka',500,500);return false;", "");

    newWin = myNewWin(bagUrl, 'sumka', 500, 500);
    newWin.onload = function () {
        attemptsToTakeATool(toolName);
    }
}

function myNewWin(goL,id,ww,wh) {
    ww=ww||screen.width*.9;
    wh=wh||screen.height*.9;
    var wbx=Math.round((screen.width-ww)/2)*.45;
    var wby=Math.round((screen.height-wh)/2)*.45;
    var pos=(document.all)?'left='+wbx+',top='+wby+',':'screenX='+wbx+',screenY='+wby+',';
    var nw=window.open(goL,'Win'+id,'width='+ww+',height='+wh+','+pos+'toolbar=0,scrollbars=1,resizable=1,status=0');
    nw.moveTo(wbx,wby);
    return nw;
}

function getToolTitle(toolName) {
    switch (toolName) {
        case "kirka":
            return "Кирка рудокопа";
        case "topor":
            return "Топор лесоруба";
        default:
            return "";
    }
}

function attemptsToTakeATool(toolName) {
    var $winDoc = jQueryAct(newWin.document);
    var toolsBtn = $winDoc.find("input[value=Инструменты]");
    var rightHend = $winDoc.find('div[style="position: absolute; top: 175px; left: 3px;"] img');
    var leftHend = $winDoc.find('div[style="position: absolute; top: 175px; left: 144px;"] img');
    if  (leftHend.length > 0) {
        leftHend.click();
        sendLogMes("Освобождаем левую руку", "workResults");
        setTimeout(function () {
            attemptsToTakeATool(toolName);
        }, getRandomInt(2000, 5000, false));
    }
    if  (rightHend.length > 0) {
        rightHend.click();
        sendLogMes("Освобождаем правую руку", "workResults");
        setTimeout(function () {
            attemptsToTakeATool(toolName);
        }, getRandomInt(2000, 5000, false));
    }
    if (toolsBtn.length === 0 && reloadAttempts > 0 ) {
        reloadAttempts--;
        setTimeout(function () {
            tryToOpenABag(toolName);
        }, getRandomInt(300, 1000, false));
    } else if (reloadAttempts < 1) {
        sendLogMes("Не шмог перезагрузить страницу!!!", "workResults");
    } else if (rightHend.length === 0 && leftHend.length === 0){
        setTimeout(function () {
            toolsBtn.click();
            setTimeout(function () {
                // Страница обновилась, нужно и документ обновить
                $winDoc = jQueryAct(newWin.document);
                var title = getToolTitle(toolName);
                // ищем картинку инструмента
                var toolImg = $winDoc.find("img[title='" + title + "']");

                if (toolImg.length === 0) {
                    sendLogMes("Закончился инструмент: " + title, "workResults");
                } else {
                    // ищем кнопку - одеть инструмент
                    var $trParent = jQueryAct(toolImg.parent().parent()[0]);
                    var takeToolBtn = $trParent.find("input[value=Надеть]");
                    if (takeToolBtn.length === 0) {
                        sendLogMes("Нет кнопки, чтобы одеть: " + title, "workResults");
                    } else {
                        var trItemData = $trParent.next().find("td").text();
                        jQueryPers("#toolUsageCount").val(parseToolUsageInfo(trItemData)).change();

                        takeToolBtn.click();
                        setTimeout(function () {
                            autoJob = false;
                            toggleJob();
                            autoSearch = false;
                            toggleSearch();
                            resCheckFront();
                        }, getRandomInt(2000, 5000, false));
                        setTimeout(function () {
                            newWin.close();
                        }, getRandomInt(5300, 6000, false));
                    }
                }
            }, getRandomInt(3000, 5000, false));
        }, getRandomInt(500, 2000, false));
    }
}
function parseToolUsageInfo(text) {
    text = text.replace(/\s/g,'');
    var rightIndex = text.indexOf('из');
    if (rightIndex < 0) {
        return 100;
    }
    var leftIndex = text.indexOf('Использований');
    return +text.substring(leftIndex, rightIndex).replace('Использований', '');
}
/// End - Одевание инструмента ///
/// ************************** ///

function gasimov() {
    if (autoJob || autoSearch || autoGo || marshrut.length > 0) {
        var modalFormEl = actIframeDoc.getElementById("modal_form");
        modalFormEl.style.display = "none";
        modalFormEl.style.height = "200px";
        modalFormEl.innerHTML = "";
        var overlayEl = actIframeDoc.getElementById("overlay");
        overlayEl.style.display = "none";
    }
    TimeShiftShow = false;
    clearTimeout(gasimovTimeoutId);
    gasimovTimeoutId = null;
}
function getRandomInt(min, max, isLong) {
    if (isLong) {
        var randomNumber = Math.random() * 100;
        var bigDelay = +persIframeDoc.getElementById("bigDelay").value;
        bigDelay = isNaN(bigDelay) ? 3 : bigDelay;
        if (randomNumber > 100 - bigDelay) {
            timeshift = Math.floor(Math.random() * (300000 + 1)) + 300000;
            var message = "Перекур - " + getReadableTime(timeshift) + " (" + randomNumber.toFixed(2) + "%)";
            sendLogMes(message, "searchResults");
            sendLogMes(message, "workResults");
        } else {
            timeshift = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    } else {
        timeshift = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    console.log("Задержка - " + getReadableTime(timeshift));
    TimeShiftShow = true;
    return timeshift;
}

function addAfter(targetEl, newEl) {
    if (targetEl.after) {
        targetEl.after(newEl);
    } else {
        targetEl.parentNode.appendChild(newEl);
    }
}
function addBefore(targetEl, newEl) {
    if (targetEl.before) {
        targetEl.before(newEl);
    } else {
        targetEl.parentNode.insertBefore(newEl, targetEl);
    }
}
function appendTo(targetEl, newEl) {
    if (targetEl.appendChild) {
        targetEl.appendChild(newEl);
    } else {
        targetEl.parentNode.appendChild(newEl);
    }
}
function curDT() {
    var d = new Date();
    return d.toLocaleTimeString();
}
function sendLogMes(htmlTxt, elemId) {
    var ta = persIframeDoc.getElementById(elemId);
    ta.innerHTML = "[" + curDT() + "] " + htmlTxt + "<br>" + ta.innerHTML;
}
function sendTravMes(htmlTxt, elemId) {
    var ta = actIframeDoc.getElementById(elemId);
    ta.innerHTML = "[" + curDT() + "] " + htmlTxt + "<br>" + ta.innerHTML;
}
function autoGoFunc(destinationX, destinationY) {
    if (travnik) {
        if (!goToTrav) {
            var tmpIndexGrass = indexTrav.shift();
            if (tmpIndexGrass !== undefined) {
                var grassObj = coorsTrav[tmpIndexGrass];
                travGox = grassObj[0];
                travGoy = grassObj[1];
                var grassTitle = grassObj[2];
                goToTrav = true;
                sendTravMes("<strong>" + grassTitle + ": " + travGox + ":" + travGoy + "</strong>", "coorsGo");
            }
        }
        if (goToTrav) {
            destinationX = travGox;
            destinationY = travGoy;
        }
    }
    var shag = [[6, 6], [12, 6], [12, 12]];
    var size = jQueryAct('#viewmode').val();
    var shagX = shag[size][0];
    var shagY = shag[size][1];
    var myGroupX = +actIframeWin.global_data.my_group.posx;
    var myGroupY = +actIframeWin.global_data.my_group.posy;

    var shagovX = Math.abs(destinationX - myGroupX) / shagX;
    var shagovY = Math.abs(destinationY - myGroupY) / shagY;
    signX = Math.sign(destinationX - myGroupX);
    signY = Math.sign(destinationY - myGroupY);

    var shagDelta = shagovX / shagovY;

    if (shagDelta > 1) {
        shagY = Math.round(shagY / shagDelta);
    } else {
        shagX = Math.round(shagX * shagDelta);
    }

    if (Math.abs(destinationX - myGroupX) < shag[size][0]) {
        shagX = Math.abs(destinationX - myGroupX);
    } else {
        shagX = Math.floor(Math.random() * (shagX - 2 + 1)) + 2;
    }
    if (Math.abs(destinationY - myGroupY) < shag[size][1]) {
        shagY = Math.abs(destinationY - myGroupY);
    } else {
        shagY = Math.floor(Math.random() * (shagY - 2 + 1)) + 2;
    }
    to4kaGoX = myGroupX + (signX * shagX);
    to4kaGoY = myGroupY + (signY * shagY);
    sendTravMes("След.т. " + to4kaGoX + ":" + to4kaGoY, "coorsGo");

    //    console.log(shagX + " " + shagY + " " + shagDelta);
    var to4ka = to4kaGoX + (to4kaGoY - 1) * 6000;
    if (to4kaGoX === destinationX && to4kaGoY === destinationY && goToTrav === false) {
        var tmpMarshT = marshrut.shift();
        if (tmpMarshT === undefined) {
            sendTravMes("<b>СТОП ходилка!</b>", "coorsGo");
            toggleDestGo();
        } else {
            var routePointsCountEl = persIframeDoc.getElementById("routePointsCount");
            var dd = +routePointsCountEl.innerHTML;

            routePointsCountEl.innerHTML = "" + (dd - 1);
            persIframeDoc.getElementById("destinationXY").value = tmpMarshT[0] + ":" + tmpMarshT[1];
        }
    }
    //else if (to4kaGoX === destinationX && to4kaGoY === destinationY && goToTrav === true) {
    //    goToTrav = false;
    //}
    //    else if (to4kaGoX == destGox && to4kaGoY == destGoy && tmpIndexGrass != undefined) {
    //        travGox = coorsTrav[tmpIndexGrass][0];
    //        travGoy = coorsTrav[tmpIndexGrass][1];
    //        goToTrav = true;
    //        //                console.log("Идем к траве по x:" + travGox + "по y:" + travGoy)
    //        sendTravMes("<strong>К траве: " + travGox + "x" + travGoy + "</strong>", "coorsGo");
    //    }
    //    var tmpCoorsTrav = coorsTrav.shift();

    setTimeout(function() {
        sendWSMessage("actNewMaps-GotoKletka=" + to4ka, "autoGoFunc::А вот тут у нас точка 0");
    }, getRandomInt(300, 800, false));
}
function getReadableTime(ms) {
    var minutes = Math.floor(ms / 60 / 1000);
    var seconds = Math.floor(ms / 1000) - minutes * 60;
    return minutes + " мин. " + seconds + " сек.";
}
function showTimeShift() {
    var modalForm = actIframeDoc.getElementById("modal_form");
    modalForm.style.height = "200px";
    if (modalForm.innerHTML.indexOf('Задержка') === 0) {
        modalForm.innerHTML = "";
    }

    // готовим блок под timeshift
    var tsDiv = actIframeDoc.getElementById("tsDiv");
    if (!tsDiv) {
        tsDiv = document.createElement('div');
        tsDiv.id = "tsDiv";
        appendTo(modalForm, tsDiv);
    }
    tsDiv.innerText = "Задержка - " + getReadableTime(timeshift);

    timeshift -= 1000;
    if (timeshift < 0) {
        TimeShiftShow = false;
        modalForm.innerHTML = "";
    }
}
function showModalToAddPoints() {
    var modalForm = actIframeDoc.getElementById("modal_form");
    modalForm.style.height = "initial";
    modalForm.innerHTML = 'Список координат ("x:y x:y ..."):<br>';
    modalForm.innerHTML += '<textarea id="newCoorsList" title="x:y x:y ..."></textarea><br>';
    modalForm.innerHTML += '<input id="addPointsBtn" value="Добавить точки" type="button"><br><br>';

    jQueryAct("#addPointsBtn").click(addPoints);

    actIframeWin.OpenModal();
}
function showRoute() {
    var txt = 'Маршрут движения<br>';
    txt += '<textarea id="myCoorsList">';
    for (var i = 0, len = marshrut.length; i < len; i++) {
        txt += marshrut[i][0] + ':' + marshrut[i][1] + '\r\n';
    }
    txt += '</textarea><br>';
    txt += '<input id="updatePointsBtn" value="Обновить точки" type="button"><br><br>';

    var modalForm = actIframeDoc.getElementById("modal_form");
    modalForm.style.height = 'initial';
    modalForm.innerHTML = txt;

    jQueryAct("#updatePointsBtn").click(updatePoints);

    actIframeWin.OpenModal();
}
function addPoints() {
    parsePoints(actIframeDoc.getElementById("newCoorsList").value);
}
function updatePoints() {
    marshrut = [];
    persIframeDoc.getElementById("routePointsCount").innerHTML = "0";
    parsePoints(actIframeDoc.getElementById("myCoorsList").value);
}
function parsePoints(pointsStr) {
    var pointsList = pointsStr.split(/\s+/);
    var routePointsCountEl = persIframeDoc.getElementById("routePointsCount");
    for (var i = 0, len = pointsList.length, points, dd; i < len; i++) {
        points = pointsList[i].split(/[:x]/);
        if (points.length !== 2) {
            continue;
        }
        if (isNumeric(points[0]) && isNumeric(points[1])) {
            marshrut.push([points[0], points[1]]);

            dd = +routePointsCountEl.innerHTML;
            routePointsCountEl.innerHTML = "" + (dd + 1);
        }
    }

    gasimov();
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/// ***************************** ///
/// Begin - Работа с localStorage ///
function getResourcesDone() {
    var resourcesDone = localStorage.getItem("resourcesDone");
    if (!resourcesDone) {
        return [];
    }
    return JSON.parse(resourcesDone);
}
function pushResourceDone(resourceId) {
    var resourcesDone = getResourcesDone();
    resourcesDone.push("" + resourceId);
    localStorage.setItem("resourcesDone", JSON.stringify(resourcesDone));
}
function getToolUsageCount() {
    var toolUsageCount = +localStorage.getItem("toolUsageCount");
    if (!toolUsageCount) {
        return 100;
    }
    return toolUsageCount;
}
function setToolUsageCount(toolUsageCount) {
    localStorage.setItem("toolUsageCount", toolUsageCount);
}
function clearLocalStorage() {
    localStorage.setItem("resourcesDone", JSON.stringify([]));
    localStorage.setItem("toolUsageCount", 100);
}
/// End - Работа с localStorage ///
/// *************************** ///

//}

const SQUARE_WIDTH = 75
const SQUARE_HEIGHT = 25
const FULL_LOC_WIDTH = 1500
const FULL_LOC_HEIGHT = 750
let squares = [] //locId: Array(Math.ceil(FULL_LOC_WIDTH/SQUARE_WIDTH) * Math.ceil(FULL_LOC_HEIGHT/SQUARE_HEIGHT) )

function saveCell(loc_id, x, y, baseItemsType, baseItemsSubType, absPosesType, fortId) {
    if (squares[loc_id] === undefined) {
        squares[loc_id] = new Array(Math.ceil(FULL_LOC_WIDTH / SQUARE_WIDTH) * Math.ceil(FULL_LOC_HEIGHT / SQUARE_HEIGHT))
    }
    const currSquare = getSquareNumByCoord(x, y)

    if (squares[loc_id][currSquare] !== undefined && squares[loc_id][currSquare].length == 0) {
        return
    }
    if (squares[loc_id][currSquare] === undefined) {
        const tempHeight = (currSquare >= (Math.floor(FULL_LOC_HEIGHT / SQUARE_HEIGHT) * Math.ceil(FULL_LOC_WIDTH / SQUARE_WIDTH))) ? FULL_LOC_HEIGHT % SQUARE_HEIGHT : SQUARE_HEIGHT
        squares[loc_id][currSquare] = new Array(tempHeight)
    }

    const tempY = (y % FULL_LOC_HEIGHT) % SQUARE_HEIGHT
    if (squares[loc_id][currSquare][tempY] === undefined) {
        const tempWidth = ((currSquare+1) % Math.ceil(FULL_LOC_WIDTH / SQUARE_WIDTH)) == 0 ? FULL_LOC_WIDTH % SQUARE_WIDTH : SQUARE_WIDTH
        squares[loc_id][currSquare][tempY] = new Array(tempWidth)
    }

    const tempX = (x % FULL_LOC_WIDTH) % SQUARE_WIDTH
    if (squares[loc_id][currSquare][tempY][tempX] === undefined) {
        squares[loc_id][currSquare][tempY][tempX] = {x, y, baseItemsType, baseItemsSubType, absPosesType, fortId}
    }
}

function getIndexByCoord(x, y) {
    return Math.ceil(FULL_LOC_WIDTH / SQUARE_WIDTH) * Math.floor(y/SQUARE_HEIGHT) + Math.floor(x/SQUARE_WIDTH)
}

function getSquareNumByCoord(x, y) {
    return Math.ceil(FULL_LOC_WIDTH / SQUARE_WIDTH) * Math.floor((y%FULL_LOC_HEIGHT)/SQUARE_HEIGHT) + Math.floor((x%FULL_LOC_WIDTH)/SQUARE_WIDTH)
}

function downloadSquares(loc_id, squareNum, textToSave) {
    var blob = new Blob([textToSave], { type: "application/json" });

    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = loc_id + "_" + squareNum + ".json"; // Укажите желаемое имя файла
    document.body.appendChild(a);
    a.click();

// Очищаем ссылку и URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function findAndDownloadFullSquares(force) {
    squares.forEach((location, locationIndex) => {
        location.forEach((square, squareIndex) => {
            if((isSquareFull(square) || force) && square.length != 0) {
                const textToSave = JSON.stringify(square)
                downloadSquares(locationIndex, squareIndex, textToSave)

                location[squareIndex] = []
            }
        })
    })
}

function isSquareFull(square) {
    for(let y = 0; y < square.length; y++){
        if(square[y] === undefined) return false
        for(let x = 0; x < square[y].length; x++) {
            if(square[y][x] == undefined) return false
        }
    }
    return true
}

function squaresLeft() {
    let indiciesLeft = []
    squares.forEach((location) => {
        location.forEach((square, squareIndex) => {
            if (square.length != 0) indiciesLeft.push(squareIndex)
        })
    })
    return indiciesLeft
}

function cellSaver() {
    if (actIframeWin.global_data &&
        actIframeWin.global_data.base_items &&
        actIframeWin.global_data.abs_poses &&
        actIframeWin.global_data.my_group) {
        const persLoc = getPersLocId()
        actIframeWin.global_data.base_items.forEach((item, itemIndex) => {
            if (persLoc == item.loc_id) {
                let absPos = actIframeWin.global_data.abs_poses[itemIndex]
                let absPosType = (absPos && absPos.posx == item.posx && absPos.posy == item.posy) ? absPos.type : ""
                saveCell(item.loc_id,
                    item.posx,
                    item.posy,
                    item.type,
                    item.sub_type,
                    absPosType,
                    item.fort_id)
            }
        })
    } else {
        findAndDownloadFullSquares(false)
    }
}

function getPersLocId(){
    const persX = actIframeWin.global_data.my_group.posx
    const persY = actIframeWin.global_data.my_group.posy
    const elem = actIframeWin.global_data.base_items.find((element) => element.posx == persX && element.posy == persY)
    if(elem && elem.loc_id) {
        return elem.loc_id
    } else {
        return -1
    }
}

let cellSaverIntervalId = 0
let downloaderIntervalId = 0
function startRecord() {
    if (cellSaverIntervalId != 0) {
        clearInterval(cellSaverIntervalId)
    }
    cellSaverIntervalId = setInterval("cellSaver()", 1333)

    if (downloaderIntervalId != 0) {
        clearInterval(downloaderIntervalId)
    }
    downloaderIntervalId = setInterval("findAndDownloadFullSquares(false)", 1333*25)
}
function stopRecord() {
    clearInterval(cellSaverIntervalId)
    clearInterval(downloaderIntervalId)
    findAndDownloadFullSquares(false)

    console.log(squaresLeft())
}

function forceSave() {
    findAndDownloadFullSquares(true)
}