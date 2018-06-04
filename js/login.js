// var VERIFY_ERROR="验证码错误";


function login(){
	var username=$("input[name='name']").val();
	var password=$("input[name='password']").val();
	// var verify=$("input[name='verify']").val();
	var method=$("input[name='method']:checked").val();
	if(username==""||password==""){
        layer.msg('请完善表格！');
        return;
	}
	$("input[type='button']").css('display','none');
	$(".load").css('display','block');
	$.ajax({
		url:addr+"/login/username/",
		type:"POST",
		dataType:"json",
		data:{
			username:username,
			password:password
		},
		success:function(data){
			if(data.state==true){
				$.cookie('token', data.data.token);
				window.location.href="dashboard.html";
			}
			// else if(data.message==VERIFY_ERROR){
			// 	getVerify();
   			// layer.msg(data.message);
			// $("input[type='button']").css('display','block');
			// $(".load").css('display','none');
			// }
			else{
				// getVerify();
        		layer.msg(data.message);
				$("input[type='button']").css('display','block');
				$(".load").css('display','none');
			}
		},
		error:function(error){
			$("input[type='button']").css('display','block');
			$(".load").css('display','none');
		}

	})
}

getVerify();

function getVerify(){
	var date=new Date();
	var imgsrc=addr+"/login/"+date+"/create";
	$(".img").attr('src',imgsrc);
}