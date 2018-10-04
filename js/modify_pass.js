var username = geturlString("username");
var email = geturlString("email");
var bs64 = geturlString("bs64");

init();

function init() {
    if (username == null || email == null||bs64 == null) {
        window.location.href = "about:blank";
        window.close();
    }
}

function modify_pass() {
    var password=$("input[name=password]").val();
    var re_password=$("input[name=re_password]").val();
    if (password == "" || re_password == "") {
		layer.msg('完善表格');
		return;
	}
	if (password != re_password) {
		layer.msg('确认密码错误');
		return;
	}
    $.ajax({
        url: addr + "/update/user/password/byemail",
        type: "POST",
        dataType: "json",
        data: {
            username: username,
            email: email,
            password:password,
            encrypt: bs64
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                window.location.href="su_er.html?txt=修改密码成功";
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

function keyup_submit(e) {
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		modify_pass();
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
