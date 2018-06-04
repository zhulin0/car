get_on_car();
get_off_car();
get_car_info();

var select_menu;

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
                get_model(select_menu);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function get_model(menu){
    var car_model=get_key(menu);
    var car_mark=get_key(menu[car_model[0]]);
    var car_type=menu[car_model[0]][car_mark[0]];
    $(".car-model").html('');
    $(".car-mark").html('');
    $(".car-type").html('');
    for(var i=0;i<car_model.length;i++){
        $(".car-model").append('<option value="'+car_model[i]+'">'+car_model[i]+'</option>');
    }
    for(var i=0;i<car_mark.length;i++){
        $(".car-mark").append('<option value="'+car_mark[i]+'">'+car_mark[i]+'</option>');
    }
    for(var i=0;i<car_type.length;i++){
        $(".car-type").append('<option value="'+car_type[i]["tpId"]+'">'+car_type[i]["tpName"]+'</option>');
    }
}

function get_mark(){
    $(".car-mark").html('');
    $(".car-type").html('');
    var car_model= $(".car-model").val();
    var car_mark=get_key(select_menu[car_model]);
    var car_type=select_menu[car_model][car_mark[0]];
    for(var i=0;i<car_mark.length;i++){
        $(".car-mark").append('<option value="'+car_mark[i]+'">'+car_mark[i]+'</option>');
    }    
    for(var i=0;i<car_type.length;i++){
        $(".car-type").append('<option value="'+car_type[i]["tpId"]+'">'+car_type[i]["tpName"]+'</option>');
    }
}

function get_type(){
    $(".car-type").html('');
    var car_model= $(".car-model").val();
    var car_mark= $(".car-mark").val();
    var car_type=select_menu[car_model][car_mark];
    for(var i=0;i<car_type.length;i++){
        $(".car-type").append('<option value="'+car_type[i]["tpId"]+'">'+car_type[i]["tpName"]+'</option>');
    }
}


function get_key(the_array){
    var x=new Array();
    for(var key in the_array){
        x.push(key);
    }
    return x;
}

function get_on_car(){
    $.ajax({
        url:addr+"/data/select/carinfo/byoff",
        type:"GET",
        dataType:"json",
        data:{
            off:1,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                put_on_data(data.data);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function put_on_data(data){
    $(".on-car").html('');
    $(".on-car").append('<div style="border-bottom: 1px solid #eee;">'+
                '<div class="user-tr col-sm-2">发动机号</div>'+
                '<div class="user-tr col-sm-2">车牌号</div>'+
                '<div class="user-tr col-sm-2">车型</div>'+
                '<div class="user-tr col-sm-2">品牌</div>'+
                '<div class="user-tr col-sm-2">型号</div>'+
                '<div class="user-tr col-sm-2">投放日期</div>'+
                '<div class="clearfix"></div></div>');
    for(var i=0;i<data.length;i++){
        $(".on-car").append('<div>'+
            '<div class="user-td col-sm-2">'+data[i].c_id+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].c_licence+'</div>'+
            '<div class="user-td col-sm-2"> '+data[i].m_name+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].cp_name+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].tp_name+'</div>'+
            '<div class="user-td col-sm-2">'+timestampToTime(data[i].c_put_time)+'</div>'+
            '</div>');
    }
}

function put_off_data(data){
    $(".off-car").html('');
    $(".off-car").append('<div style="border-bottom: 1px solid #eee;">'+
                '<div class="user-tr col-sm-2">发动机号</div>'+
                '<div class="user-tr col-sm-2">车牌号</div>'+
                '<div class="user-tr col-sm-2">车型</div>'+
                '<div class="user-tr col-sm-2">品牌</div>'+
                '<div class="user-tr col-sm-2">型号</div>'+
                '<div class="user-tr col-sm-2">投放日期</div>'+
                '<div class="clearfix"></div></div>');
    for(var i=0;i<data.length;i++){
        $(".off-car").append('<div class="out-car">'+
            '<div class="user-td col-sm-2">'+data[i].c_id+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].c_licence+'</div>'+
            '<div class="user-td col-sm-2"> '+data[i].m_name+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].cp_name+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].tp_name+'</div>'+
            '<div class="user-td col-sm-2">'+timestampToTime(data[i].c_put_time)+'</div>'+
            '</div>');
    }
}

function get_off_car(){
    $.ajax({
        url:addr+"/data/select/carinfo/byoff",
        type:"GET",
        dataType:"json",
        data:{
            off:0,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                put_off_data(data.data);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function put_car(){
    var c_id=$(".c-id").val();
    var c_licence=$(".c-licence").val();
    var car_type=$(".car-type").val();
    $.ajax({
        url:addr+"/data/insert/carinfo",
        type:"POST",
        dataType:"json",
        data:{
            carId:c_id,
            carLicence:c_licence,
            typeId:car_type,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                get_on_car();
                $(".c-id").val('');
                $(".c-licence").val('');
                layer.msg('投放成功');
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate();
    return Y+M+D;
}