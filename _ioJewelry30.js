function goOgran(btn) {
// FORM-Ogran
    let myId = top.frames['d_pers'].d.id
    if(myId) {
        // const chform = btn.form;
        // console.log("submit")
        // chform.onsubmit = function(event){
        //     event.preventDefault()
        //     const formData = new FormData(chform)
        //     const data = new URLSearchParams(formData);
        //     fetch(event.target.action, {
        //         method: 'POST',
        //         body: data
        //     })
        //         .then(response => response.text())
        //         .then(function(response){
        //             console.log(typeof response)
        //             const searchRegExp = /(https:\/\/kovcheg2\.apeha\.ru\/interface\/captcha\.fpl\/\d*)/gm;
        //             const replaceWith = '';
        //             const captcha = response.match(searchRegExp)[0];
        //             console.log(captcha)
        //             const result = response.replace(searchRegExp, replaceWith);
        //
        //             frames["channel_Jewelry"].document.write(result)
        //         })
        // }
        btn.click();
// END-FORM-Ogran
    }

}

function find_Stone() {
    console.log("find stone")
    let btn = findBy(top.frames['d_act'], "tag", "input", "value", "Огранить")
    if(btn) {
        goOgran(btn);
    }
}

let title = document.getElementsByClassName("title")[0].innerText.trim()
if (location.host == "forest.apeha.ru" || !/Ваши/.test(title) || !/камни/.test(title)) {
    top.frames["d_pers"].document.getElementById("t").innerHTML = "Error «Кузница» not found.";
} else {
    // msg-log
    var element = document.getElementsByTagName("b")[1];
    var text = document.createElement("span");
    text.id = "control_msg";
    text.style.background = "white";
    text.innerHTML = "<br>";
    element.parentNode.insertBefore(text, element);
// end-msg-log
// READY-Ogran
//     let iframe = document.createElement("iframe");
//     iframe.name = "channel_Jewelry";
//     iframe.id = "channel_Jewelry";
//     iframe.style.width = "200px";
//     iframe.style.height = "100px";
//     document.head.appendChild(iframe);
    find_Stone()
// END-READY-Ogran
}

function findBy(frame, byType, typeName, byAttribute, attributeName){
    let elements;
    switch(byType){
        case("tag"):
            elements = frame.document.getElementsByTagName(typeName);
            break;

        case("class"):
            elements = frame.document.getElementsByClassName(typeName);
            break;

        case("id"):
            return  frame.document.getElementById(typeName);
        default: return;
    }
    // console.log(elements)
    for(let i = 0; i < elements.length; i++) {
        let element = elements[i];
        switch(byAttribute){
            case "innerText":
                if(element.innerText.includes(attributeName)) {
                    return element
                }
                break;
            case "value":
                if(element.value.includes(attributeName)) {
                    return element
                }
                break;
            default: return ;
        }
    }
}

function workChecker(){
    const _nextWorkTs = nextWorkTimeStamp()
    if(_nextWorkTs){
        top.frames['d_pers'].nextWorkTs = _nextWorkTs
        console.log(_nextWorkTs)
    }
}

function workType() {
    const element = findBy(top.frames["d_pers"], "id", "IMG_rarm")
    if (element && element.title) {
        if (element.title.includes("огранщика")) {
            return [2, 33, 0]
        }
        if (element.title.includes("кузнеца")) {
            return [1, 34, 0]
        }
    }
    return [0, 0, 0]
}

function nextWorkTimeStamp(){
    const workElement = findBy(top.frames["d_act"], "tag", "td", "innerText", "Осталось от текущей")
    let element;
    let timeShifts;
    if (workElement) {
        element = workElement

        const workTimeShifts = workType()
        timeShifts = parseTime(element.innerText.trim()).map(function (value, index, array) {
            return value + workTimeShifts[index]
        })
    } else {
        const restElement = findBy(top.frames["d_act"], "tag", "td", "innerText", "Вы устали")
        if (restElement) {
            element = restElement
            timeShifts = parseTime(element.innerText.trim())
        } else {
            //TODO...
        }
    }
    if (timeShifts) {
        const timeStamp = createTimeStampWhenReady(timeShifts)
        console.log(timeStamp)
        return timeStamp
    }
}

function parseTime(timeLeft) {
    const hourExp = /(\d*)ч/
    const minExp = /(\d*)мин/
    const secExp = /(\d*) сек/
    let hourLeft = 0;
    let minLeft = 0;
    let secLeft = 0;

    let hourArr = timeLeft.match(hourExp)
    if (hourArr) {
        hourLeft = hourArr.length != 0 ? parseInt(hourArr[hourArr.length - 1]) : 0
    }

    let minArr = timeLeft.match(minExp)
    if (minArr) {
        minLeft = minArr.length != 0 ? parseInt(minArr[minArr.length - 1]) : 0
    }

    let secArr = timeLeft.match(secExp)
    if (secArr) {
        secLeft = secArr.length != 0 ? parseInt(secArr[secArr.length - 1]) : 0
    }

    console.log("hour = " + hourLeft)
    console.log("min = " + minLeft)
    console.log("sec = " + secLeft)
    return [hourLeft, minLeft, secLeft]
}

function createTimeStampWhenReady(timeShifts){
    const stamp = new Date()
    stamp.setHours(stamp.getHours() + timeShifts[0], stamp.getMinutes() + timeShifts[1], stamp.getSeconds() + timeShifts[2])
    return stamp
}
