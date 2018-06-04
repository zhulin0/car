get_car_info();
var select_menu;

function add_car_model(){
    var car_model=$(".add-car-model input").val();
    if(car_model==""){
        layer.msg("请完善表格");
        return;
    }
    $.ajax({
        url:addr+"/data/insert/carmodel",
        type:"POST",
        dataType:"json",
        data:{
            modelname:car_model,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                layer.msg("添加成功");
                $(".add-car-model input").val('');
                get_car_info();
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function get_car_info(){
    $.ajax({
        url:addr+"/data/select/menu/"+token,
        type:"GET",
        dataType:"json",
        async:false,
        success:function(data){
            console.log(data);
            if(data.state==true){
                select_menu=data.data;
                get_mark(select_menu);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function get_mark(menu){
    var car_model=get_key(menu);
    $(".car-model2").html('');
    $(".car-model3").html('');
    $(".car-mark3").html('');
    for(var i=0;i<car_model.length;i++){
        $(".car-model2").append('<option value="'+car_model[i]+'">'+car_model[i]+'</option>');
        $(".car-model3").append('<option value="'+car_model[i]+'">'+car_model[i]+'</option>');
    }
    get_car_type();
}

function get_key(the_array){
    var x=new Array();
    for(var key in the_array){
        x.push(key);
    }
    return x;
}

function add_car_mark(){
    var car_model=$(".car-model2").val();
    var car_mark=$(".car-mark2").val();
    $.ajax({
        url:addr+"/data/insert/carcompany",
        type:"POST",
        dataType:"json",
        data:{
            modelname:car_model,
            companyname:car_mark,
            token:token
        },
        success:function(data){
            if(data.state==true){
                $(".car-mark2").val('');
                layer.msg("添加成功!");
                get_car_info();
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function get_car_type(){
    $(".car-mark3").html('');
    var car_model=$(".car-model3").val();
    var car_company=get_key(select_menu[car_model]);
    for(var i=0;i<car_company.length;i++){
       $(".car-mark3").append('<option value="'+car_company[i]+'">'+car_company[i]+'</option>');
    }
}

function add_car_type(){
    var car_mdoel=$(".car-model3").val();
    var car_mark=$(".car-mark3").val();
    var car_type=$(".car-type3").val();
    $.ajax({
        url:addr+"/data/insert/cartype",
        type:"POST",
        dataType:"json",
        data:{
            modelname:car_mdoel,
            companyname:car_mark,
            typename:car_type,
            token:token
        },
        success:function(data){
            if(data.state==true){
                $(".car-mark3").val('');
                $(".car-type3").val('');
                layer.msg("添加成功!");
                get_car_info();
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

