var txt = geturlString("txt");
console.log(txt);

init();

function init(){
    if (txt == null) {
        window.location.href = "about:blank";
        window.close();
    }
    else {
        $(".content").text(txt);
    }
}

function geturlString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return decodeURI(r[2]);
    } else if (q != null) {
        return decodeURI(q[2]);
    } else {
        return null;
    }
}