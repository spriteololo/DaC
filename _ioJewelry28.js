function goOgran(id) {
// FORM-Ogran
    let myId = top.frames['d_pers'].d.id
    if(myId) {
        const chform = top.frames['d_act'].document.forms[2];
        console.log("submit")
        chform.onsubmit = function(event){
            event.preventDefault()
            const formData = new FormData(chform)
            const data = new URLSearchParams(formData);
            fetch(event.target.action, {
                method: 'POST',
                body: data
            })
                .then(response => response.text())
                .then(function(response){
                    console.log(typeof response)
                    const searchRegExp = /(https:\/\/kovcheg2\.apeha\.ru\/interface\/captcha\.fpl\/\d*)/gm;
                    const replaceWith = '';
                    const captcha = response.match(searchRegExp)[0];
                    console.log(captcha)
                    const result = response.replace(searchRegExp, replaceWith);

                    frames["channel_Jewelry"].document.write(result)
                })
        }
        chform.submit();
// END-FORM-Ogran
    }

}

function find_Stone() {
    console.log("find stone")
    for (i = 0; i < document.getElementsByTagName("input").length; i++) {
        if (document.getElementsByTagName("input")[i].value == "Огранить") {
            let stoneId = document.getElementsByTagName("input")[i - 1].value;
            top.frames["d_pers"].document.getElementById("t").innerHTML = "found" + stoneId;
            console.log("start go ogran")
            goOgran(stoneId);
            break;
        }
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
    let iframe = document.createElement("iframe");
    iframe.name = "channel_Jewelry";
    iframe.id = "channel_Jewelry";
    iframe.style.width = "200px";
    iframe.style.height = "100px";
    document.head.appendChild(iframe);
    find_Stone()
// END-READY-Ogran
}
