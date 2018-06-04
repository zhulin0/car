add_user();


function add_user(){
	$.ajax({
		url:addr+"/search/user/all/"+token,
		type:"GET",
		dataType:"json",
		success:function(data){
			if(data.state==true){
				var data=data.data;
				console.log(data);
				addInfo(data);
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
			// window.location.href="login.html";
		}

	});
}

function addInfo(data){
	$(".users-list-ul").html('<div style="border-bottom: 1px solid #eee;">'+
									'<div class="user-tr col-sm-2">ID</div>'+
									'<div class="user-tr col-sm-2">用户名</div>'+
									'<div class="user-tr col-sm-2">邮箱</div>'+
									'<div class="user-tr col-sm-2">电话号码</div>'+
									'<div class="user-tr col-sm-2">角色</div>'+
									'<div class="user-tr col-sm-2">操作</div>'+
									'<div class="clearfix"></div></div>');
	for(var i=0;i<data.length;i++){
		$(".users-list-ul").append('<div class="user-info-'+i+'" token="'+data[i].token+'">'+
									'<div class="user-td col-sm-2">'+(i+1)+'</div>'+
									'<div class="user-td col-sm-2">'+data[i].username+'</div>'+
									'<div class="user-td col-sm-2">'+data[i].email+'</div>'+
									'<div class="user-td col-sm-2">'+data[i].phone+'</div>'+
									'<div class="user-td col-sm-2">'+data[i].role+'</div>'+
									'<div class="user-td col-sm-2">'+
									'<button data-toggle="modal" data-target="#myModal" onclick="mo_input('+i+')">更新</button>&nbsp;'+
									'<button onclick="del_user('+i+')">删除</button>'+
									'</div></div>');
	}
	
}

function register(){
	var user_id=$(".user-id input").val();
	var user_email=$(".user-email input").val();
	var user_phone=$(".user-phone input").val();
	var user_role=$(".user-role select option:selected").val();
	var user_password=$(".user-password input").val();
	var user_sure_password=$(".user-sure-password input").val();
	if(user_id==""||user_email==""||user_phone==""||user_role==""||user_password==""||user_sure_password==""){
		layer.msg('完善表格');
		return;
	}
	if(user_password!=user_sure_password){
		layer.msg('确认密码错误');
		return;
	}
	$.ajax({
		url:addr+"/register/register",
		type:"POST",
		data:{
			username: user_id,
			email: user_email,
			phone: user_phone,
			role: user_role,
			password: user_password
		},
		dataType:"json",
		success:function(data){
			if(data.state==true){
				var data=data.data;
				console.log(data);
				$(".user-id input").val('');
				$(".user-email input").val('');
				$(".user-phone input").val('');
				$(".user-role select option:selected").val('');
				$(".user-password input").val('');
				$(".user-sure-password input").val('');
				layer.msg('添加成功');
				add_user()
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
		}

	});
}


function del_user(num){
	var username=$('.user-info-'+num+' .user-td:eq(1)').text();
	$.ajax({
		url:addr+"/delete/admin",
		type:"GET",
		data:{
			username: username,
			token:token
		},
		dataType:"json",
		success:function(data){
			if(data.state==true){
				var data=data.data;
				console.log(data);
				layer.msg('删除成功');
				add_user()
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
		}

	});
}

function mo_input(num){
	$(".user-mo").attr('num',num);
	$(".user-mo .user-id input").val($('.user-info-'+num+' .user-td:eq(1)').text());
	$(".user-mo .user-email input").val($('.user-info-'+num+' .user-td:eq(2)').text());
	$(".user-mo .user-phone input").val($('.user-info-'+num+' .user-td:eq(3)').text());
	var role_num=roleTonum($('.user-info-'+num+' .user-td:eq(4)').text());
	$(".user-mo .user-role select option:eq("+(role_num-1)+")").attr("selected",true);
}

function mo(){
	var mo_user_id=$(".user-mo .user-id input").val();
	var mo_user_email=$(".user-mo .user-email input").val();
	var mo_user_phone=$(".user-mo .user-phone input").val();
	var mo_user_role=$(".user-mo .user-role select").val();
	var num=$(".user-mo").attr("num");
	var mo_user_token=$('.user-info-'+num).attr('token');
	if(mo_user_token==token){
		return;
	}
	$.ajax({
		url:addr+"/update/user/info/byadmin",
		type:"POST",
		data:{
			username:mo_user_id,
			email:mo_user_email,
			phone:mo_user_phone,
			role:mo_user_role,
			userToken:mo_user_token,
			adminToken:token
		},
		dataType:"json",
		success:function(data){
			if(data.state==true){
				var data=data.data;
				console.log(data);
				layer.msg('修改成功');
				add_user()
				$('#myModal').modal('hide');
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
		}

	});
}


function roleTonum(text){
	switch(text){
		case "管理员":
			return 1;
		case "游客":
			return 2;
		case "黑名单":
			return 3;
		default:
			return 0;
	}
}