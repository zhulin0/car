add_user(1);

if (who == '1') {
	$(".user-role-select").html("");
	$(".user-role-select").append('<option value="2">普通用户</option>' +
		'<option value="3">黑名单</option>')
	$(".guan").attr("disabled", true);
}

function add_user(the_page) {
	$.ajax({
		url: addr + "/search/user/all/" + token,
		type: "GET",
		data: {
			page: the_page,
			offset: PAGENUM,
		},
		dataType: "json",
		success: function (data) {
			console.log(data);
			if (data.state == true) {
				if (data.message!="0"&&data.message!="1") {
					var pageNavObj = new PageNavCreate("page-users", {
						pageCount: data.message,//总页数
						currentPage: the_page,//当前页
						perPageNum: 5,//每页按钮数
					});
					pageNavObj.afterClick(page_users);
				}else{
                    var pageNavObj = new PageNavCreate1("page-users", {
                        pageCount: 0,//总页数
                        currentPage: 0,//当前页
                        perPageNum: 0,//每页按钮数
                    })
                    // pageNavObj.afterClick(page_warning);
                }
				var data = data.data;
				addInfo(data);
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
			// window.location.href="login.html";
		}

	});
	function page_users(clickPage) {
		add_user(clickPage);
	}
}

function addInfo(data) {
	$(".users-list-ul").html("");
	$(".users-list-ul").append('<div class="row table"><div>')
	$(".users-list-ul .table").append('<div class="user-tH">' +
		'<div class="user-tr col-sm-2">ID</div>' +
		'<div class="user-tr col-sm-2">用户名</div>' +
		'<div class="user-tr col-sm-2">邮箱</div>' +
		'<div class="user-tr col-sm-2">电话号码</div>' +
		'<div class="user-tr col-sm-2">角色</div>' +
		'<div class="user-tr col-sm-2">操作</div>' +
		'<div class="clearfix"></div></div>');
	if (data.length == 0) {
		$(".users-list-ul .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
	}
	for (var i = 0; i < data.length; i++) {
		if (who < roleTonum2(data[i].role)) {
			$(".users-list-ul .table").append('<div class="user-th user-info-' + i + '" token="' + data[i].token + '">' +
				'<div class="user-td col-sm-2">' + (i + 1) + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].username + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].email + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].phone + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].role + '</div>' +
				'<div class="user-td col-sm-2">' +
				'<button data-toggle="modal" data-target="#myModal" onclick="mo_input(' + i + ')">更新</button>&nbsp;' +
				'<button onclick="del_user(' + i + ')">删除</button>' +
				'</div></div>');
		}
		else{
			$(".users-list-ul .table").append('<div class="user-th user-info-' + i + '" token="' + data[i].token + '">' +
				'<div class="user-td col-sm-2">' + (i + 1) + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].username + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].email + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].phone + '</div>' +
				'<div class="user-td col-sm-2">' + data[i].role + '</div>' +
				'<div class="user-td col-sm-2">' +
				'<button style="color:#c5c5c5">更新</button>&nbsp;' +
				'<button  style="color:#c5c5c5">删除</button>' +
				'</div></div>');
		}
	}

}

function register() {
	var user_id = $(".user-id input").val();
	var user_email = $(".user-email input").val();
	var user_phone = $(".user-phone input").val();
	var user_role = $(".user-role select option:selected").val();
	// var user_password = $(".user-password input").val();
	// var user_sure_password = $(".user-sure-password input").val();
	var user_password = "Autobrain123";
	var user_sure_password = "Autobrain123";
	if (user_id == "" || user_email == "" || user_phone == "" || user_role == "" || user_password == "" || user_sure_password == "") {
		layer.msg('完善表格');
		return;
	}
	if (user_password != user_sure_password) {
		layer.msg('确认密码错误');
		return;
	}
	$.ajax({
		url: addr + "/register/register",
		type: "POST",
		data: {
			username: user_id,
			email: user_email,
			phone: user_phone,
			role: user_role,
			password: user_password
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				var data = data.data;
				console.log(data);
				$(".user-id input").val('');
				$(".user-email input").val('');
				$(".user-phone input").val('');
				$(".user-role select option:selected").val('');
				$(".user-password input").val('');
				$(".user-sure-password input").val('');
				layer.msg('添加成功');
				add_user(1)
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}


function del_user(num) {
	layer.open({
		type: 1 //此处以iframe举例
		, title: ''
		, area: ['200px', '100px']
		, content: '确认删除？'
		, btn: ['删除', '放弃'] //只是为了演示
		, yes: function (index) {
			var username = $('.user-info-' + num + ' .user-td:eq(1)').text();
			$.ajax({
				url: addr + "/delete/admin",
				type: "GET",
				data: {
					username: username,
					token: token
				},
				dataType: "json",
				success: function (data) {
					if (data.state == true) {
						var data = data.data;
						console.log(data);
						layer.msg('删除成功');
						add_user(1)
					} else {
						layer.msg(' ' + data.message);
					}

				},
				error: function (error) {
					layer.msg("系统错误!");
				}

			});
			layer.close(index);
		}
		, btn2: function () {
			layer.closeAll();
		}

		, zIndex: layer.zIndex //重点1
		, success: function (layero) {
			layer.setTop(layero); //重点2
		}
	});

}

function mo_input(num) {
	$(".user-mo").attr('num', num);
	$(".user-mo .user-id input").val($('.user-info-' + num + ' .user-td:eq(1)').text());
	$(".user-mo .user-email input").val($('.user-info-' + num + ' .user-td:eq(2)').text());
	$(".user-mo .user-phone input").val($('.user-info-' + num + ' .user-td:eq(3)').text());
	var role_num = roleTonum($('.user-info-' + num + ' .user-td:eq(4)').text());
	console.log(role_num);
	$(".user-mo .user-role select option:eq(" + (role_num - 1) + ")").attr("selected", true);
}

function mo() {
	var mo_user_id = $(".user-mo .user-id input").val();
	var mo_user_email = $(".user-mo .user-email input").val();
	var mo_user_phone = $(".user-mo .user-phone input").val();
	var mo_user_role = $(".user-mo .user-role select").val();
	var num = $(".user-mo").attr("num");
	var mo_user_token = $('.user-info-' + num).attr('token');
	if (mo_user_token == token) {
		return;
	}
	$.ajax({
		url: addr + "/update/user/info/byadmin",
		type: "POST",
		data: {
			username: mo_user_id,
			email: mo_user_email,
			phone: mo_user_phone,
			role: mo_user_role,
			userToken: mo_user_token,
			adminToken: token
		},
		dataType: "json",
		success: function (data) {
			if (data.state == true) {
				var data = data.data;
				console.log(data);
				layer.msg('修改成功');
				add_user(1)
				$('#myModal').modal('hide');
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
		}

	});
}


function roleTonum(text) {
	switch (text) {
		case "管理员":
			return 1;
		case "最高级管理员":
			return 1;
		case "普通用户":
			return 2;
		case "黑名单":
			return 3;
		default:
			return 0;
	}
}

function roleTonum2(text) {
	switch (text) {
		case "管理员":
			return 1;
		case "最高级管理员":
			return 0;
		case "普通用户":
			return 2;
		case "黑名单":
			return 3;
		default:
			return 0;
	}
}


function search(which) {
	if ($("input[name=" + which + "]").val() == "") {
		add_user(1);
	}
	else {
		users_list_searchText = $("input[name=" + which + "]").val();
		add_user_search(1);
	}
}

function reset(which) {
	$("input[name=" + which + "]").val('');
	users_list_searchText = $("input[name=" + which + "]").val();
	add_user(1);
}

function keyup_submit(e, which) {
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		search(which);
	}
}

function add_user_search(the_page) {
	$.ajax({
		url: addr + "/user/keyword",
		type: "GET",
		data: {
			token: token,
			keyword: users_list_searchText,
			page: the_page,
			offset: PAGENUM,
		},
		dataType: "json",
		success: function (data) {
			console.log(data);
			if (data.state == true) {
				if (data.message!="0"&&data.message!="1") {
					var pageNavObj = new PageNavCreate("page-users", {
						pageCount: data.message,//总页数
						currentPage: the_page,//当前页
						perPageNum: 5,//每页按钮数
					});
					pageNavObj.afterClick(page_users);
				}else{
                    var pageNavObj = new PageNavCreate1("page-users", {
                        pageCount: 0,//总页数
                        currentPage: 0,//当前页
                        perPageNum: 0,//每页按钮数
                    })
                    // pageNavObj.afterClick(page_warning);
                }
				var data = data.data;
				addInfo(data);
			} else {
				layer.msg(' ' + data.message);
			}

		},
		error: function (error) {
			layer.msg("系统错误!");
			// window.location.href="login.html";
		}

	});
	function page_users(clickPage) {
		add_user_search(clickPage);
	}
}