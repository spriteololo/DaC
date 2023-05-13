function goOgran(id) {
// FORM-Ogran
    let myId = top.frames['d_pers'].d.id
    if(myId) {
        let jewelryPath = "jewelry_uid_" + myId + ".html"
        let addform = frames["channel_Jewelry"].document.createElement("span");
        addform.innerHTML = ""
            + "<form method=post action=" + jewelryPath + ">"
            + "<input type=hidden name=item value=" + id + ">"
            + "</form>";
        frames["channel_Jewelry"].document.getElementsByTagName("head")[0].appendChild(addform);
        var chform = frames["channel_Jewelry"].document.forms[0];
        console.log("submit")
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
    iframe.style.visibility = "hidden";
    iframe.style.width = "100px";
    iframe.style.height = "100px";
    iframe.onload = function () {
        let result;
        let document = (iframe.contentDocument || iframe.document)
        for (i = 0; i < document.getElementsByTagName("img").length; i++) {
            let item = document.getElementsByTagName("img")[i]
            if (/captcha/.test(item.src)) {
                result = item.src;
                item.src = ""
                break;
            }
        }
        if(result) {
            console.log("onload second")
            console.log(result)
        } else {
            console.log("first onLoad")
            top.frames["d_act"].find_Stone();
        }

    };
    document.body.appendChild(iframe);
// END-READY-Ogran
}
