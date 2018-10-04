var token = $.cookie('token');
var who = 10;
if (token == "" || token == undefined) {
	window.location.href = "login.html";
}
else{
    $.ajax({
        url: addr + "/search/user/bytoken/" + token,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.state == true) {
                $(".user-name").html(data.data.username);
            } else if (data.message == "没有找到该用户") {
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                layer.msg(' ' + data.message);
            }

        },
        error: function (error) {
            layer.msg("系统错误!");
            //window.location.href="login.html";
        }

    });
    get_menu_num();
    get_tou2();
}




function get_menu_num() {
	$.ajax({
		url: addr + "/overview/number",
		type: "GET",
		dataType: "json",
		async: false,
		data: {
			token: token
		},
		success: function (data) {
			console.log(data);
			if (data.state == true) {
				for (var i = 0; i < 3; i++) {
					if (data.data[i] == 0) {
					}
					else {
						$(".menu_number" + (i + 1)).css("display", "inline-block");
						$(".menu_number" + (i + 1)).text(data.data[i]);
					}
				}

				if (data.data[3] >= 2) {
					$('.menu_users').attr("onclick", "");
					$('.menu_users').css({ "color": "#5a5a5a", "cursor": "not-allowed" })
					$('.menu_car').attr("onclick", "");
					$('.menu_car').css({ "color": "#5a5a5a", "cursor": "not-allowed" })
					$('.menu_team').attr("onclick", "");
					$('.menu_team').css({ "color": "#5a5a5a", "cursor": "not-allowed" })
					$('.menu_push').attr("onclick", "");
					$('.menu_push').css({ "color": "#5a5a5a", "cursor": "not-allowed" })
				}
				who = data.data[3];

				// if(data.data[4]==1){
				//     $('#modify_init_pa').modal('show');
				// }
			} else {
				layer.msg(' ' + data.message);
			}
		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}



function get_tou2() {
	$.ajax({
		url: addr + "/register/get/url",
		type: "GET",
		data: {
			token: token
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				if (data.data != "") {
					$(".header-right .user-picture").attr("src", ".." + data.data);
				}
				else {
					$(".header-right .user-picture").attr("src", "./image/avatar.png");
				}
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}

function modify_init() {
	var old_password = 'Autobrain123';
	var new_password = $("input[name=mo_password]").val();
	var sure_password = $("input[name=mo_re_password]").val();
	if (old_password == "" || new_password == "" || sure_password == "") {
		layer.msg('完善表格');
		return;
	}
	if (sure_password != new_password) {
		layer.msg('确认密码错误');
		return;
	}
	$.ajax({
		url: addr + "/update/user/password/bytoken",
		type: "POST",
		data: {
			oldPassword: old_password,
			newPassword: new_password,
			token: token
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				$("input[name=mo_password]").val('');
				$("input[name=mo_re_password]").val('');
				layer.msg('修改初始密码成功');
				$('#modify_init_pa').modal('hide');
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}