function forget_pa(){
	var username=$("input[name='name']").val();
	var email=$("input[name='email']").val();
	// var verify=$("input[name='verify']").val();
	//var method=$("input[name='method']:checked").val();
	if(username==""&&email==""){
        layer.msg('请完善表格！');
        return;
	}
	$("input[type='button']").css('display','none');
	$(".load").css('display','block');
	$.ajax({
		url:addr+"/search/user/password/mail",
		type:"GET",
		dataType:"json",
		data:{
			username:username,
            email:email
		},
		success:function(data){
            console.log(data);
			if(data.state==true){
                layer.msg("请前往邮箱查看");
                $("input[name='name']").val('');
                $("input[name='email']").val('');
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