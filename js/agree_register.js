var username = geturlString("username");
var email = geturlString("email");
var phone = geturlString("phone");
var bs64 = geturlString("bs64");

init();

function init() {
    if (username == null || email == null || phone == null || bs64 == null) {
        window.location.href = "about:blank";
        window.close();
    }
    else {
        $("input[name=username]").val(username);
        $("input[name=email]").val(email);
        $("input[name=phone]").val(phone);
    }

}

function agree() {
    $.ajax({
        url: addr + "/register/register/accessed",
        type: "POST",
        dataType: "json",
        data: {
            username: username,
            email: email,
            phone: phone,
            encrypt: bs64
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                window.location.href="su_er.html?txt=同意注册成功";
            } else {
                window.location.href="su_er.html?txt="+data.message;
                //layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function refuse() {
    $.ajax({
        url: addr + "/register/register/dined",
        type: "POST",
        dataType: "json",
        data: {
            username: username,
            email: email,
            phone: phone
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                window.location.href="su_er.html?txt=拒绝注册";
            } else {
                window.location.href="su_er.html?txt="+data.message;
                //layer.msg(' ' + data.message);
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


