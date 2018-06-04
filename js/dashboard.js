// $.ajax({
// 		url:addr+"/login/email/"+username+"/"+password+"/"+verify,
// 		type:"GET",
// 		dataType:"json",
// 		success:function(data){
// 			if(data.state==true){
// 				window.location.href="dashboard.html";
// 			}
// 			// else if(data.message==VERIFY_ERROR){
// 			// 	getVerify();
//    			//layer.msg(data.message);
// 			// 	$("input[type='button']").css('display','block');
// 			// 	$(".load").css('display','none');
// 			// }
// 			else{
// 				getVerify();
//         		layer.msg(data.message);
// 				$("input[type='button']").css('display','block');
// 				$(".load").css('display','none');
// 			}
// 		},
// 		error:function(error){
// 			$("input[type='button']").css('display','block');
// 			$(".load").css('display','none');
// 		}

// 	})