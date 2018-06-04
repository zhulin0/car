get_on_team();
get_off_team();
get_on_car();


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
                put_car_data(data.data);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function put_car_data(data){
    for(var i=0;i<data.length;i++){
        $(".add-car").append("<option lzw='"+data[i].c_id+"'>"+data[i].c_licence+"</option>");
    }
}


function get_on_team(){
    $.ajax({
        url:addr+"/data/select/teaminfo/bystatus",
        type:"GET",
        dataType:"json",
        data:{
            status:1,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                var number=data.message;
                number=number.substring(1,number.length-1);
                number=number.split(",");
                put_on_data(data.data,number);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function get_off_team(){
    $.ajax({
        url:addr+"/data/select/teaminfo/bystatus",
        type:"GET",
        dataType:"json",
        data:{
            status:0,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                var number=data.message;
                number=number.substring(1,number.length-1);
                number=number.split(",");
                put_off_data(data.data,number);
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}

function put_on_data(data,number){
    $(".on-team").html('');
    $(".on-team").append('<div style="border-bottom: 1px solid #eee;">'+
                '<div class="user-tr col-sm-2">车队ID</div>'+
                '<div class="user-tr col-sm-2">名称</div>'+
                '<div class="user-tr col-sm-2">头车ID</div>'+
                '<div class="user-tr col-sm-2">车数</div>'+
                '<div class="user-tr col-sm-2">创建时间</div>'+
                '<div class="user-tr col-sm-2">操作</div>'+
                '<div class="clearfix"></div></div>');
    for(var i=0;i<data.length;i++){
        $(".on-team").append('<div>'+
            '<div class="user-td col-sm-2">'+data[i].tId+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].tName+'</div>'+
            '<div class="user-td col-sm-2"> '+data[i].tLeader+'</div>'+
            '<div class="user-td col-sm-2">'+number[i]+'</div>'+
            '<div class="user-td col-sm-2">'+timestampToTime(data[i].tStart)+'</div>'+
            '<div class="user-td col-sm-2"><button onclick="disaband('+data[i].tId+')">解散</button></div>'+
            '</div>');
    }
}

function put_off_data(data,number){
    $(".off-team").html('');
    $(".off-team").append('<div style="border-bottom: 1px solid #eee;">'+
                '<div class="user-tr col-sm-2">车队ID</div>'+
                '<div class="user-tr col-sm-2">名称</div>'+
                '<div class="user-tr col-sm-2">头车ID</div>'+
                '<div class="user-tr col-sm-2">车数</div>'+
                '<div class="user-tr col-sm-2">创建时间</div>'+
                '<div class="user-tr col-sm-2">解散时间</div>'+
                '<div class="clearfix"></div></div>');
    for(var i=0;i<data.length;i++){
        $(".off-team").append('<div>'+
            '<div class="user-td col-sm-2">'+data[i].tId+'</div>'+
            '<div class="user-td col-sm-2">'+data[i].tName+'</div>'+
            '<div class="user-td col-sm-2"> '+data[i].tLeader+'</div>'+
            '<div class="user-td col-sm-2">'+number[i]+'</div>'+
            '<div class="user-td col-sm-2">'+timestampToTime(data[i].tStart)+'</div>'+
            '<div class="user-td col-sm-2">'+timestampToTime(data[i].modifiedTime)+'</div>'+
            '</div>');
    }
}

function create_team(){
    var teamName=$(".teamName").val();
    var leader=$(".choose_leader").val();
    var number="";
    $(".the-car").children("div").each(function(){
        number=number+","+$(this).attr("lzw");
    });
    number=number.substring(1);
    $.ajax({
        url:addr+"/data/insert/teamInfo",
        type:"POST",
        dataType:"json",
        data:{
            teamName:teamName,
            teamLeader:leader,
            members:number,
            token:token
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                layer.msg('创建成功');
                $(".teamName").val('');
                $(".choose_leader").val('');
                get_on_team();
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

function disaband(id){
    $.ajax({
        url:addr+"/data/update/off/team",
        type:"POST",
        dataType:"json",
        data:{
            teamId:id,
            token:token,
        },
        success:function(data){
            console.log(data);
            if(data.state==true){
                layer.msg('解散成功');
                get_on_team();
                get_off_team();
            }else{
                layer.msg(' '+data.message);
            }
        },
        error:function(error){
            layer.msg("系统错误!");
        }
    
    });
}