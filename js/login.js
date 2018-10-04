// var VERIFY_ERROR="验证码错误";

var token2 = "";
function login() {
	var username = $("input[name='name']").val();
	var password = $("input[name='password']").val();
	// var verify=$("input[name='verify']").val();
	var method = $("input[name='method']:checked").val();
	if (username == "" || password == "") {
		layer.msg('请完善表格！');
		return;
	}
	$("input[type='button']").css('display', 'none');
	$(".load").css('display', 'block');
	$.ajax({
		url: addr + "/login/username/",
		type: "POST",
		dataType: "json",
		data: {
			username: username,
			password: password
		},
		success: function (data) {
			console.log(data);
			if (data.state == true) {
				token2 = data.data.token;
				if(data.data.active=="未激活"){
					$('#modify_init_pa').modal('show');
				}
				else{
					$.cookie('token', data.data.token);
					window.location.href = "map.html";
				}
			}
			// else if(data.message==VERIFY_ERROR){
			// 	getVerify();
			// layer.msg(data.message);
			// $("input[type='button']").css('display','block');
			// $(".load").css('display','none');
			// }
			else {
				// getVerify();
				layer.msg(data.message);
				$("input[type='button']").css('display', 'block');
				$(".load").css('display', 'none');
			}
		},
		error: function (error) {
			$("input[type='button']").css('display', 'block');
			$(".load").css('display', 'none');
		}

	})
}

// getVerify();

// function getVerify(){
// 	var date=new Date();
// 	var imgsrc=addr+"/login/"+date+"/create";
// 	$(".img").attr('src',imgsrc);
// }

function keyup_submit(e) {
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		login();
	}
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
	if(new_password==old_password){
		layer.msg('修改密码为系统默认初始密码，为安全起见，请修改为其他密码');
		return;
	}
	$.ajax({
		url: addr + "/update/user/password/bytoken",
		type: "POST",
		data: {
			oldPassword: old_password,
			newPassword: new_password,
			token: token2
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				$("input[name=mo_password]").val('');
				$("input[name=mo_re_password]").val('');
				layer.msg('修改初始密码成功');
				$('#modify_init_pa').modal('hide');
				$.cookie('token', token2);
				setTimeout(function() {
					window.location.href = "map.html";
				}, 1000);
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}

function keyup_modify_init(e) {
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		modify_init();
	}
}