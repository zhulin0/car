var token=$.cookie('token');
if(token==""){
	window.location.href="login.html";
}
$.ajax({
	url:addr+"/search/user/bytoken/"+token,
	type:"GET",
	dataType:"json",
	success:function(data){
		if(data.state==true){
			$(".user-name").text(data.data.username);
		}else if(data.message=="没有找到该用户"){
			window.location.href="login.html";
		}else{
			layer.msg(' '+data.message);
		}

	},
	error:function(error){
		layer.msg("系统错误!");
		window.location.href="login.html";
	}

});