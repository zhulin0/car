$.ajax({
	url: addr + "/search/user/bytoken/" + token,
	type: "GET",
	dataType: "json",
	success: function (data) {
		console.log(data);
		if (data.state == true) {
			var data = data.data;
			console.log(data);
			addInfo(data);
		} else {
			layer.msg(' ' + data.message);
		}

	},
	error: function (error) {
		layer.msg("系统错误!");
		window.location.href = "login.html";
	}

});

function addInfo(data) {
	$(".user-info-name").html(data.username + '<i class="user-info-role orange">' + data.role + '</i>');
	$("#home .user-info-value i").text(data.role);
	// $("#home .user-info-active i").text(data.active);
	$("#home .user-info-phone .user-info-value").text(data.phone);
	$("#home .user-info-email .user-info-value").text(data.email);
	$("#ios .user-info-phone-input .user-info-value input").val(data.phone);
	$("#ios .user-info-email-input .user-info-value input").val(data.email);
}

function modify_info() {
	var new_phone = $(".user-info-phone-input input").val();
	var new_email = $(".user-info-email-input input").val();
	$.ajax({
		url: addr + "/update/user/info",
		type: "POST",
		data: {
			phone: new_phone,
			email: new_email,
			token: token
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				var data = data.data;
				addInfo(data);
				layer.msg('成功');
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}

function modify_password() {
	var old_password = $(".old-password input").val();
	var new_password = $(".new-password input").val();
	var sure_password = $(".sure-password input").val();
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
				$("#home .user-info-active i").text('已激活');
				$(".old-password input").val('');
				$(".new-password input").val('');
				$(".sure-password input").val('');
				layer.msg('成功');
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}


function viewmypic(mypic) {
	var upfile=document.getElementById("tou2");
	$("#"+mypic).css("display","block");
	//火狐下，直接设img属性
	//mypic.src = upfile.files[0].getAsDataURL();

	//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式  
	$("#"+mypic).attr('src' , window.URL.createObjectURL(upfile.files[0]));
}

function update_tou(){
	var formData = new FormData();
    formData.append("token", token);
	formData.append('picture', document.getElementById("tou2").files[0]);
	
    if (!document.getElementById("tou2").files[0]) {
		layer.msg("请选择图片");
		return;
	}
	layer.load(1);
	$.ajax({
		url: addr + "/register/add/headimg",
		type: "POSt",
		data: formData,
		// 告诉jQuery不要去处理发送的数据
		processData: false,
		// 告诉jQuery不要去设置Content-Type请求头
		contentType: false,
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				layer.msg('头像上传成功');
				get_tou();
				get_tou2();
			} else {
				layer.msg(' ' + data.message);
			}
			layer.closeAll("loading");

		},
		error: function (error) {
			layer.msg("系统错误!");
			layer.closeAll("loading");
		}

	});
}

get_tou();

function get_tou() {
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
					$(".user-info-content-top .user-picture").attr("src", ".." + data.data);
				}
				else{
					$(".user-info-content-top .user-picture").attr("src", "./image/avatar.png");
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