var token = geturlString("token");
var username = geturlString("username");
var email = geturlString("email");
var phone = geturlString("phone");
var bs64 = geturlString("bs64");

function alter1() {
    // var b = true;
    // if (b==true) {
    //     window.location.href = "su_er.html?txt=连接失效";
    // }
    $.ajax({
        url: addr + "/register/register/emailtoken",
        type: "POST",
        dataType: "json",
        data: {
            username: username,
            email: email,
            phone: phone,
            encrypt: bs64,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == false) {
                window.location.href="su_er.html?txt=链接失效";
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
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


