$.ajax({
		url:addr+"/search/user/bytoken/"+token,
		type:"GET",
		dataType:"json",
		success:function(data){
			console.log(data);
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
			window.location.href="login.html";
		}

	});

function addInfo(data){
	$(".user-info-name").html(data.username+'<i class="user-info-role orange">'+data.role+'</i>');
	$("#home .user-info-value i").text(data.role);
	$("#home .user-info-active i").text(data.active);
	$("#home .user-info-phone .user-info-value").text(data.phone);
	$("#home .user-info-email .user-info-value").text(data.email);
	$("#ios .user-info-phone-input .user-info-value input").val(data.phone);
	$("#ios .user-info-email-input .user-info-value input").val(data.email);
}

function modify_info(){
	var new_phone=$(".user-info-phone-input input").val();
	var new_email=$(".user-info-email-input input").val();
	$.ajax({
		url:addr+"/update/user/info",
		type:"POST",
		data:{
			phone:new_phone,
			email:new_email,
			token:token
		},
		dataType:"json",
		success:function(data){
			if(data.state==true){
				var data=data.data;
				addInfo(data);
        		layer.msg('成功');
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
		}

	});
}

function modify_password(){
	var old_password=$(".old-password input").val();
	var new_password=$(".new-password input").val();
	var sure_password=$(".sure-password input").val();
	if(old_password==""||new_password==""||sure_password==""){
		layer.msg('完善表格');
		return;
	}
	if(sure_password!=new_password){
		layer.msg('确认密码错误');
		return;
	}
	$.ajax({
		url:addr+"/update/user/password/bytoken",
		type:"POST",
		data:{
			oldPassword: old_password,
			newPassword: new_password,
			token: token
		},
		dataType:"json",
		success:function(data){
			if(data.state==true){
				$("#home .user-info-active i").text('已激活');		
				$(".old-password input").val('');
				$(".new-password input").val('');
				$(".sure-password input").val('');
        		layer.msg('成功');
			}else{
        		layer.msg(' '+data.message);
			}

		},
		error:function(error){
        	layer.msg("系统错误!");
		}

	});
}

function logout(){
	$.cookie('token', '');
	window.location.href="login.html";
}