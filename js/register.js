function register(){
	var username=$("input[name='name']").val();
	var email=$("input[name='email']").val();
	var phone=$("input[name='phone']").val();
	// var verify=$("input[name='verify']").val();
	//var method=$("input[name='method']:checked").val();
	if(username==""||email==""||phone==""){
        layer.msg('请完善表格！');
        return;
	}
	$("input[type='button']").css('display','none');
	$(".load").css('display','block');
	$.ajax({
		url:addr+"/register/register/email",
		type:"POST",
		dataType:"json",
		data:{
			username:username,
            email:email,
            phone:phone
		},
		success:function(data){
            console.log(data);
			if(data.state==true){
                layer.msg("注册申请提交成功，请等待管理员审核");
                $("input[name='name']").val('');
                $("input[name='email']").val('');
				$("input[name='phone']").val('');
				setTimeout(function () {
					window.location.href="login.html"
				}, 2000);
			}
			else{
        		layer.msg(data.message);
			}
            $("input[type='button']").css('display','block');
            $(".load").css('display','none');
		},
		error:function(error){
			$("input[type='button']").css('display','block');
			$(".load").css('display','none');
		}

	})
}


function keyup_submit(e) {
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		register();
	}
}