var map;
var map2 = new BMap.Map("allmap2");
var map3 = new BMap.Map("allmap3");
var map4 = new BMap.Map("allmap4");
var map5 = new BMap.Map("allmap5");
var map9 = new BMap.Map("allmap9");
//var map6 = new BMap.Map("allmap6");
var old_data_1 = [];
map2.enableScrollWheelZoom();
map3.enableScrollWheelZoom();
map4.enableScrollWheelZoom();
map5.enableScrollWheelZoom();
map9.enableScrollWheelZoom();
//map6.enableScrollWheelZoom();
var on_team_searchText = "";
var is_on_team_searchText = "";
var off_team_searchText = "";

var gengXin_flag2=true;
var lastRoutPara2={time:0,
    id:0,
    old_data:0
}

get_on_team(1);
get_off_team(1);
// get_on_car();
get_is_on_team(1);

// function get_on_car(){
//     $.ajax({
//         url:addr+"/data/select/carinfo/byoff",
//         type:"GET",
//         dataType:"json",
//         data:{
//             off:1,
//             token:token
//         },
//         success:function(data){
//             console.log(data);
//             if(data.state==true){
//                 put_car_data(data.data);
//             }else{
//                 layer.msg(' '+data.message);
//             }
//         },
//         error:function(error){
//             layer.msg("系统错误!");
//         }

//     });
// }



// function put_car_data(data){
//     for(var i=0;i<data.length;i++){
//         $(".add-car").append("<option lzw='"+data[i].c_id+"'>"+data[i].c_licence+"</option>");
//     }
// }
function gengXin(){
    if (gengXin_flag2)  //需要停止更新，并设置为“更新”
    {
        gengXin_flag2=false;
        $("#gengXin").html('更新');
    }
    else{
        gengXin_flag2=true;
        $("#gengXin").html('停止更新');
        if(lastRoutPara2.id) {
            update_route(lastRoutPara2.id, lastRoutPara2.old_data, lastRoutPara2.time);
        }
    }
}

function get_on_team(the_page) {
    $.ajax({
        url: addr + "/team/created/" + ((on_team_searchText == "") ? "" : "uniqueid"),
        type: "POST",
        dataType: "json",
        data: {
            uniqueId: on_team_searchText,
            page: the_page,
            offset: PAGENUM,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_on_data(data.data);
                 if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-on-team", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_on_team);
                 }else{
                     var pageNavObj = new PageNavCreate1("page-on-team", {
                         pageCount: 0,//总页数
                         currentPage: 0,//当前页
                         perPageNum: 0,//每页按钮数
                     })
                     // pageNavObj.afterClick(page_warning);
                 }
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
    function page_on_team(clickPage) {
        get_on_team(clickPage);
    }
}



function get_is_on_team(the_page) {
    $.ajax({
        url: addr + "/team/creating/" + ((is_on_team_searchText == "") ? "" : "uniqueid"),
        type: "POST",
        dataType: "json",
        data: {
            uniqueId: is_on_team_searchText,
            page: the_page,
            offset: PAGENUM,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_is_on_data(data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-is-on-team", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_is_on_team);
                }else{
                    var pageNavObj = new PageNavCreate1("page-is-on-team", {
                        pageCount: 0,//总页数
                        currentPage: 0,//当前页
                        perPageNum: 0,//每页按钮数
                    })
                    // pageNavObj.afterClick(page_warning);
                }
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
    function page_is_on_team(clickPage) {
        get_is_on_team(clickPage);
    }
}

function get_off_team(the_page) {
    $.ajax({
        url: addr + "/team/dissolved/" + ((off_team_searchText == "") ? "" : "uniqueid"),
        type: "POST",
        dataType: "json",
        data: {
            uniqueId: off_team_searchText,
            page: the_page,
            offset: PAGENUM,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_off_data(data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-off-team", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_off_team);
                }else{
                    var pageNavObj = new PageNavCreate1("page-off-team", {
                        pageCount: 0,//总页数
                        currentPage: 0,//当前页
                        perPageNum: 0,//每页按钮数
                    })
                    // pageNavObj.afterClick(page_warning);
                }
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
    function page_off_team(clickPage) {
        get_off_team(clickPage);
    }
}

function put_is_on_data(data) {
    $(".is-on-team").html('');
    $(".is-on-team").append('<div class="row table"><div>')
    $(".is-on-team .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-3">vid</div>' +
        // '<div class="user-tr col-sm-3">名称</div>'+
        '<div class="user-tr col-sm-3">头车ID</div>' +
        '<div class="user-tr col-sm-2">车数</div>' +
        '<div class="user-tr col-sm-2">创建时间</div>' +
        '<div class="user-tr col-sm-2">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".is-on-team .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".is-on-team .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-3">' + data[i].vid + '</div>' +
            // '<div class="user-td col-sm-3">'+data[i].tName+'</div>'+
            '<div class="user-td col-sm-3"> ' + data[i].uniqueId + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].vehicleCount + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].timestamp + '</div>' +
            '<div class="user-td col-sm-2"><button onclick="get_detail(\'' + data[i].tid + '\',\'' + data[i].uniqueId + '\',1,)">详情</button></div>' +
            '</div>');
    }
}

function put_on_data(data) {
    $(".on-team").html('');
    $(".on-team").append('<div class="row table"><div>')
    $(".on-team .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-3">车队ID</div>' +
        // '<div class="user-tr col-sm-2">名称</div>'+
        '<div class="user-tr col-sm-3">头车ID</div>' +
        '<div class="user-tr col-sm-2">车数</div>' +
        '<div class="user-tr col-sm-2">创建时间</div>' +
        '<div class="user-tr col-sm-2">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".on-team .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".on-team .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-3">' + data[i].tid + '</div>' +
            // '<div class="user-td col-sm-2">'+data[i].tName+'</div>'+
            '<div class="user-td col-sm-3"> ' + data[i].uniqueId + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].vehicleCount + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].timestamp + '</div>' +
            '<div class="user-td col-sm-2"><button onclick="get_detail(\'' + data[i].tid + '\',\'' + data[i].uniqueId + '\',2)">详情</button></div>' +
            '</div>');
    }
}

function put_off_data(data, number) {
    $(".off-team").html('');
    $(".off-team").append('<div class="row table"><div>')
    $(".off-team .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-2">车队ID</div>' +
        // '<div class="user-tr col-sm-2">名称</div>'+
        '<div class="user-tr col-sm-3">头车ID</div>' +
        '<div class="user-tr col-sm-1">车数</div>' +
        '<div class="user-tr col-sm-2">创建时间</div>' +
        '<div class="user-tr col-sm-2">解散时间</div>' +
        '<div class="user-tr col-sm-2">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".off-team .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".off-team .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-2">' + data[i].tid + '</div>' +
            // '<div class="user-td col-sm-2">'+data[i].tName+'</div>'+
            '<div class="user-td col-sm-3">' + data[i].uniqueId + '</div>' +
            '<div class="user-td col-sm-1">' + data[i].vehicleCount + '</div>' +
            //'<div class="user-td col-sm-2">' + data[i].timestamp + '</div>' +
            '<div class="user-td col-sm-2">' + timestampToTime(data[i].create_time.substring(0, data[i].endtime.length - 3)) + '</div>' +
            '<div class="user-td col-sm-2">' + timestampToTime(data[i].endtime.substring(0, data[i].endtime.length - 3)) + '</div>' +
            // '<div class="user-td col-sm-2"><button onclick="get_his(\'" + data[i].tid + "\',\'" + data[i].uniqueId + "\',"+3+",\'"+data[i].create_time.substring(0, data[i].endtime.length - 3)+"\',\'"+data[i].endtime.substring(0, data[i].endtime.length - 3)+"\')">详情</button></div>' +
            '<div class="user-td col-sm-2">' +
            '<button onclick="'+
            'get_his(\''+data[i].tid+'\',\''+data[i].uniqueId+'\','+3+',\''+timestampToTime(data[i].create_time.substring(0, data[i].endtime.length - 3))+'\',\''+timestampToTime(data[i].endtime.substring(0, data[i].endtime.length - 3))+'\''+')'+
            '">详情</button>' +
            '</div>' +
            '</div>');
    }
}

function create_team() {
    var teamName = $(".teamName").val();
    var leader = $(".choose_leader").val();
    var number = "";
    $(".the-car").children("div").each(function () {
        number = number + "," + $(this).attr("lzw");
    });
    number = number.substring(1);
    $.ajax({
        url: addr + "/data/insert/teamInfo",
        type: "POST",
        dataType: "json",
        data: {
            teamName: teamName,
            teamLeader: leader,
            members: number,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                layer.msg('创建成功');
                $(".teamName").val('');
                $(".choose_leader").val('');
                get_on_team();
                $(".the-car").html("");
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return new Date(Y + M + D + h + m + s).Format("yyyy-MM-dd hh:mm:ss");
}

function disaband(id) {
    layer.open({
        type: 1 //此处以iframe举例
        , title: ''
        , area: ['200px', '100px']
        , content: '确认删除？'
        , btn: ['删除', '放弃'] //只是为了演示
        , yes: function (index) {
            $.ajax({
                url: addr + "/data/update/off/team",
                type: "POST",
                dataType: "json",
                data: {
                    teamId: id,
                    token: token,
                },
                success: function (data) {
                    if (data.state == true) {
                        layer.msg('解散成功');
                        get_on_team();
                        get_off_team();
                    } else {
                        layer.msg(' ' + data.message);
                    }
                },
                error: function (error) {
                    layer.msg("系统错误!");
                }

            });
            layer.close(index);
        }
        , btn2: function () {
            layer.closeAll();
        }

        , zIndex: layer.zIndex //重点1
        , success: function (layero) {
            layer.setTop(layero); //重点2
        }
    });

}


// var map = new BMap.Map("allmap");
// map.enableScrollWheelZoom();

// function get_position(id) {
//     $.ajax({
//         url: addr + "/car/position",
//         type: "GET",
//         dataType: "json",
//         data: {
//             uniqueId: id,
//             token: token,
//         },
//         success: function (data) {
//             console.log(data);
//             if (data.state == true) {
//                 data = data.data;
//                 setTimeout(function () {
//                     map.clearOverlays();
//                     var point = new BMap.Point(data.longitude, data.latitude);
//                     map.centerAndZoom(point, 15);
//                     var marker = new BMap.Marker(point);  // 创建标注
//                     map.addOverlay(marker);               // 将标注添加到地图中
//                     marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//                     map.panTo(point);
//                 }, 1000 * 0.5);
//             } else {
//                 layer.msg(' ' + data.message);
//             }
//         },
//         error: function (error) {
//             layer.msg("系统错误!");
//         }

//     });
// }

function get_detail(tid, uniqueid, wh) {
    var type = get_type(wh);
    $.ajax({
        url: addr + "/team/carlist",
        type: "GET",
        dataType: "json",
        data: {
            teamId: tid,
            token: token,
            type: type
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                var data = data.data;
                $(".modal_team_position").attr('onclick', 'team_position(\'' + tid + '\')', wh);
                $(".modal_team_route").attr('onclick', 'team_route(\'' + tid + '\')', wh);
                $(".modal_old_team_route").attr('onclick', 'old_team_route(\'' + uniqueid+','+ tid + '\')');
                //$(".modal_old_team_route").attr('onclick', 'old_team_route(\'' + uniqueid + '\')');


                $(".team-list").html('');
                $(".team-list").append('<div class="file-tr">车牌号</div><div class="file-tr">车辆详情</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".team-list").append('<div>' +
                        '<div class="file-td">' + data[i].c_licence + '</div>' +
                        '<div class="file-td"><a data-toggle="modal" data-target="#myModal" onclick="car_detail(\'' + data[i].uniqueid + '\')">查看</a></div>' +
                        '</div>');
                }
                if (data.length == 0) {
                    $(".team-list").append('<div>' +
                        '<div class="file-td" style="width:100%">无数据</div>' +
                        '</div>');
                }
                $("#team_detail" + wh).modal("show");
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function get_his(tid, uniqueid, wh,start,end) {
    var type = get_type(wh);
    $.ajax({
        url: addr + "/team/carlist",
        type: "GET",
        dataType: "json",
        data: {
            teamId: tid,
            token: token,
            type: type
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                var data = data.data;
                $(".modal_team_position").attr('onclick', 'team_position(\'' + tid + '\')', wh);
                $(".modal_team_route").attr('onclick', 'team_route(\'' + tid + '\')', wh);
                $(".modal_old_team_route").attr('onclick', 'old_team_route_his(\'' + uniqueid+'\',\''+ tid + '\',\''+start+'\',\''+end+'\')');
                //$(".modal_old_team_route").attr('onclick', 'old_team_route(\'' + uniqueid + '\')');


                $(".team-list").html('');
                $(".team-list").append('<div class="file-tr">车牌号</div><div class="file-tr">车辆详情</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".team-list").append('<div>' +
                        '<div class="file-td">' + data[i].c_licence + '</div>' +
                        '<div class="file-td"><a data-toggle="modal" data-target="#myModal" onclick="car_detail(\'' + data[i].uniqueid + '\')">查看</a></div>' +
                        '</div>');
                }
                if (data.length == 0) {
                    $(".team-list").append('<div>' +
                        '<div class="file-td" style="width:100%">无数据</div>' +
                        '</div>');
                }
                $("#team_detail" + wh).modal("show");
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function get_type(wh) {
    var type = "";
    switch (wh) {
        case 1:
            type = "creating";
            break;
        case 2:
            type = "created";
            break;
        case 3:
            type = "dissolved";
            break;
        default:
            type = "creating";
            break;
    }
    return type;
}

function team_position(tid, wh) {
    var type = get_type(wh);
    $.ajax({
        url: addr + "/team/allPosition",
        type: "GET",
        dataType: "json",
        data: {
            teamId: tid,
            token: token,
            type: type
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                var data2 = toBaidupix(data.data);
                setTimeout(function () {
                    map4.clearOverlays();
                    for (var i = 0; i < data.data.length; i++) {
                        var point = data2[i];
                        var marker = new BMap.Marker(point);  // 创建标注
                        map4.addOverlay(marker);               // 将标注添加到地图中
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        map4.panTo(point);
                    }
                    setZoom(map4, data2);
                }, 1000 * 0.5);
                $('#team_position').modal('show');
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

//随机生成颜色
function bg() {
    // return "#00ff00";
    return '#' + Math.floor(Math.random() * 0xccffff).toString(16);
}

var end_point;
var start_point;
var team_route_color1=['#FF0000','#008000','#00FFFF','#000080','#FF00FF','#FFB6C1','#1E90FF','#000000','#FFFF00','#A0522D','#87CEEB','#FF00FF'];
var team_route_color=[];
function team_route(tid, wh) {
    var type = get_type(wh);
    $.ajax({
        url: addr + "/team/position/list",
        type: "GET",
        dataType: "json",
        data: {
            teamId: tid,
            token: token,
            type: type
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                end_point = [];

                var data2 = [];
                var lzw = [];
                setTimeout(function () {
                    for (var i = 0; i < data.data.length; i++) {
                        data2[i] = toBaidupix(data.data[i]);
                        map5.clearOverlays();
                        // if(team_route_color[i]==undefined||team_route_color[i]==null) {
                        //     team_route_color[i] = bg();
                        // }
                        team_route_color[i]=team_route_color1[i];
                        var route_go_line = new BMap.Polyline(data2[i], { strokeColor: team_route_color[i], strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                        map5.addOverlay(route_go_line);   //增加折线

                        // var icon = new BMap.Icon('image/qi.png', new BMap.Size(40, 52));
                        // start_point[i] = new BMap.Marker(data2[i][0], { icon: icon });
                        // end_point[i] = new BMap.Marker(data2[i][data2[i].length - 1]);
                        // //map9.addOverlay(end_point[i]);
                        // end_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        // start_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        // map5.addOverlay(end_point[i]);
                        // map5.addOverlay(start_point[i]);

                        end_point[i] = new BMap.Marker(data2[i][data2[i].length - 1]);
                        map5.addOverlay(end_point[i]);
                        end_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        // map5.addOverlay(end_point);
                    }
                    setZoom(map5, data2[0]);
                }, 1000 * 0.5);
                $('#team_route').modal('show');
                setTimeout(function () {
                    if ($('#team_route').hasClass("in")) {
                        update_team_route(tid, data2, data.message, type);
                    }
                }, 5000);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function update_team_route(tid, old_data, time, type) {
    $.ajax({
        url: addr + "/team/position/list/after",
        type: "GET",
        dataType: "json",
        data: {
            teamId: tid,
            token: token,
            create_time: time,
            type: type
        },
        success: function (data) {
            console.log(data);
            var data2 = [];
            if (data.state == true) {

                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].length != 0) {
                        var new_data = toBaidupix(data.data[i]);
                        data2[i] = old_data[i].concat(new_data);
                        team_route_color[i]=team_route_color1[i];
                        var route_go_line = new BMap.Polyline(data2[i], {
                            strokeColor: team_route_color[i],
                            strokeWeight: 4,
                            strokeOpacity: 1
                        });   //创建折线
                        map5.addOverlay(route_go_line);   //增加折线
                        end_point[i].setPosition(data2[i][0]);
                        map5.panTo(data2[i][0]);
                    }
                    else {
                        data2[i] = old_data[i];
                    }
                }
                    setTimeout(function () {
                        if ($('#team_route').hasClass("in")) {
                            //update_route(tid, data2[i], data.message);
                            update_team_route(tid, data2, data.message, type)
                        }
                    }, 5000);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}
// function old_team_route(id,tid) {
//     $(".time_search").attr('onclick', 'old_toute_search(\'' + id+','+tid + '\')');
//     //$(".time_search").attr('onclick', 'old_toute_search(\'' + id + '\')');
//     var date = new Date();
//     date.setDate(date.getDate() - 1)
//     date.setHours(00);
//     date.setMinutes(00);
//     date.setSeconds(00);
//     var date1 = date.Format("yyyy-MM-dd hh:mm:ss");
//     var date1_1 = date.Format("yyyy-MM-dd");
//     var data0 = new Date();
//     data0.setHours(00);
//     data0.setMinutes(00);
//     data0.setSeconds(00);
//     var date2 = data0.Format("yyyy-MM-dd hh:mm:ss");
//     var date2_1 = data0.Format("yyyy-MM-dd");
//     $("input[name=time1]").val(date1_1);
//     $("input[name=time2]").val(date2_1);
//     var date222 = new Date(Date.parse(date2)+24*3600*1000);
//     var date2222 = date222.Format("yyyy-MM-dd hh:mm:ss");
//     layer.load(1);
//     $.ajax({
//         url: addr + "/search/team/history",
//         type: "GET",
//         dataType: "json",
//         data: {
//             // start: "2018-07-22 00:00:00",
//             // end: "2018-07-23 00:00:00",
//             start: date1,
//             end: date2222,
//             // uniqueid: id.split(",")[0],
//             teamid: id.split(",")[1],
//             token: token,
//             type: "dissolved"
//         },
//         success: function (data) {
//             console.log(data);
//              if (data.state == true) {
//                 end_point = [];
//                 team_route_color = [];
//
//                 var lzw = [];
//                  $('#team_old_route').modal('show');
//
//                  var data2 = [];
//                  data2[0]=toBaidupix(data.data[0]);
//                  console.log(data2);
//
//
//                  setTimeout(function () {
//
//
//                     // var icon = new BMap.Icon('image/qi.png', new BMap.Size(40, 52));
//                     // var end_point1 = new BMap.Marker(data2[0][0], { icon: icon });
//                    //  var end_point2 = new BMap.Marker(data2[0][data2[0].length - 1]);
//                     // map3.addOverlay(end_point1);
//                    //  map3.addOverlay(end_point2);
//                      map9.clearOverlays();
//
//                      var route_go_line2 = new BMap.Polyline(data2[0], { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
//                      map9.addOverlay(route_go_line2);   //增加折线
//
//                      //setZoom(map9, data2[0]);
//                      map9.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
//                  }, 1000 * 0.5);
//                  //setZoom(map9, data2[0]);
//                  map9.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
//
//             } else {
//                 layer.msg(' ' + data.message);
//             }
//         },
//         error: function (error) {
//             layer.msg("系统错误!");
//         }
//
//     });
// }
function old_team_route(id,tid,start,end) {
    // $(".time_search").attr('onclick', 'old_toute_search(\'' + id+','+tid + '\')');
    //$(".time_search").attr('onclick', 'old_toute_search(\'' + id + '\')');
    // var date = new Date();
    // // date.setDate(date.getDate() - 1)
    // // date.setHours(00);
    // // date.setMinutes(00);
    // // date.setSeconds(00);
    // // var date1 = date.Format("yyyy-MM-dd hh:mm:ss");
    // // var date1_1 = date.Format("yyyy-MM-dd");
    // var data0 = new Date();
    // data0.setHours(00);
    // data0.setMinutes(00);
    // data0.setSeconds(00);
    // var date2 = data0.Format("yyyy-MM-dd hh:mm:ss");
    // var date2_1 = data0.Format("yyyy-MM-dd");
    // $("input[name=time1]").val(date1_1);
    // // $("input[name=time2]").val(date2_1);
    // var date222 = new Date(Date.parse(date2)+24*3600*1000);
    // var date2222 = date222.Format("yyyy-MM-dd hh:mm:ss");
    layer.load(1);
    $.ajax({
        url: addr + "/search/team/history",
        type: "GET",
        dataType: "json",
        data: {
            // start: "2018-07-22 00:00:00",
            // end: "2018-07-23 00:00:00",
            start: start,
            end: end,
            // uniqueid: id.split(",")[0],
            teamid: id.split("_")[1],
            token: token,
            type: "dissolved"
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                end_point = [];
                //team_route_color = [];
                var data2 = [];

                setTimeout(function () {
                    map9.clearOverlays();
                    for (var i = 0; i < data.data.length; i++) {
                        data2[i] = toBaidupix(data.data[i]);

                        //team_route_color[i] = bg();
                        var route_go_line = new BMap.Polyline(data2[i], { strokeColor: team_route_color[i], strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                        map9.addOverlay(route_go_line);   //增加折线
                        end_point[i] = new BMap.Marker(data2[i][data2[i].length - 1]);
                        map9.addOverlay(end_point[i]);
                        end_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        map9.addOverlay(end_point[i]);
                    }
                   // map9.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
                     setZoom(map9, data2[0]);
                }, 1000 * 0.5);
                $('#team_old_route').modal('show');
                layer.closeAll("loading");
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}


function old_team_route_his(id,tid,start,end) {
    console.log(id);
    console.log(tid);
    console.log(start);
    console.log(end);
    layer.load(1);
    $.ajax({
        url: addr + "/search/team/history",
        type: "GET",
        dataType: "json",
        data: {
            // start: "2018-07-22 00:00:00",
            // end: "2018-07-23 00:00:00",
            start: start,
            end: end,
            // uniqueid: id.split(",")[0],
            teamid: tid.split("_")[1],
            token: token,
            type: "dissolved"
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                end_point = [];
                start_point=[];
                //team_route_color = [];
                var data2 = [];

                setTimeout(function () {
                    map9.clearOverlays();
                    for (var i = 0; i < data.data.length; i++) {
                        data2[i] = toBaidupix(data.data[i]);

                        //team_route_color[i] = bg();
                        team_route_color[i] = team_route_color1[i];
                        //team_route_color=['#FFF8DC','#008000','#00FFFF','#000080','#FF00FF','#FFB6C1','#1E90FF','#000000','#FFFF00','#A0522D'];
                        var route_go_line = new BMap.Polyline(data2[i], { strokeColor: team_route_color[i], strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                        map9.addOverlay(route_go_line);   //增加折线
                        //         map3.clearOverlays();
                        var icon = new BMap.Icon('image/qi.png', new BMap.Size(40, 52));
                        start_point[i] = new BMap.Marker(data2[i][0], { icon: icon });
                        end_point[i] = new BMap.Marker(data2[i][data2[i].length - 1]);
                        //map9.addOverlay(end_point[i]);
                        end_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        start_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        map9.addOverlay(end_point[i]);
                        map9.addOverlay(start_point[i]);
                    }
                    // map9.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
                    setZoom(map9, data2[0]);
                }, 1000 * 0.5);
                $('#team_old_route').modal('show');
                layer.closeAll("loading");
            } else {
                layer.msg(' ' + data.message);
                layer.closeAll("loading");
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

// function old_route(id) {
//     var old_data = old_data_1[id];
//     console.log(old_data);
//     var data3 = toBaidupix(old_data);
//     console.log(data3);
//     $('#oldroute').modal('show');
//     setTimeout(function () {
//         map3.clearOverlays();
//         var icon = new BMap.Icon('image/qi.png', new BMap.Size(40, 52));
//         var end_point1 = new BMap.Marker(data3[0], { icon: icon });
//         var end_point2 = new BMap.Marker(data3[data3.length - 1]);
//         map3.addOverlay(end_point1);
//         map3.addOverlay(end_point2);
//         setZoom(map3, data3);
//         var route_go_line2 = new BMap.Polyline(data3, { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
//         map3.addOverlay(route_go_line2);   //增加折线
//     }, 1000 * 0.5);
// }

// function team_route1(tid, wh, end, start) {
//     var type = get_type(wh);
//     $.ajax({
//         url: addr + "/search/team/history",
//         type: "GET",
//         dataType: "json",
//         data: {
//             teamid: tid,
//             token: token,
//             type: type,
//             end: new Date(end).Format("yyyy-MM-dd hh:mm:ss"),
//             start: new Date(start).Format("yyyy-MM-dd hh:mm:ss")
//         },
//         success: function (data) {
//             console.log(data);
//             if (data.state == true) {
//                 end_point = [];
//                 team_route_color = [];
//                 var data2 = [];
//                 var lzw = [];
//                 setTimeout(function () {
//                     for (var i = 0; i < data.data.length; i++) {
//                         data2[i] = toBaidupix(data.data[i]);
//                         map3.clearOverlays();
//                         team_route_color[i] = bg();
//                         var route_go_line = new BMap.Polyline(data2[i], { strokeColor: team_route_color[i], strokeWeight: 4, strokeOpacity: 1 });   //创建折线
//                         map3.addOverlay(route_go_line);   //增加折线
//                         end_point[i] = new BMap.Marker(data2[i][data2[i].length - 1]);
//                         map3.addOverlay(end_point[i]);
//                         end_point[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//                         // map5.addOverlay(end_point);
//                     }
//                     //setZoom(map3, data2[0]);
//                 }, 1000 * 0.5);
//                 $('#team_route').modal('show');
//             } else {
//                 layer.msg(' ' + data.message);
//             }
//         },
//         error: function (error) {
//             layer.msg("系统错误!");
//         }
//
//     });
// }

function car_detail(car_id) {
    $.ajax({
        url: addr + "/car/overview",
        type: "GET",
        dataType: "json",
        data: {
            uniqueId: car_id,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                update_car_detail(data.data);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function returnColor(val) {
    if (val == "inactive") {
        return "color-gray";
    }
    else if (val == "active") {
        return "color-green";
    }
    return "color-green";
}

function update_car_detail(data) {
    // 车灯
    $("#car-light").html("");
    $("#car-light").append('<i class="fa fa-circle ' + returnColor(data.light.brakelightleftactive) + '"></i><span title="brakelightleftactive">左侧刹车灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.telltalefrontfoglight) + '"></i> <span title="telltalefrontfoglight">前雾灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.highbeamindiato) + '"></i> <span title="highbeamindiato">远光指示灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.exexteriorlampswitch) + '"></i> <span title="exexteriorlampswitch">外挂灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.foglampswitch) + '"></i> <span title="foglampswitch">雾灯</span> <br />' +
        '<i class="fa fa-circle ' + returnColor(data.light.brakelightright) + '" ></i> <span title="brakelightright">右侧刹车灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.telltalerearfoglight) + '"></i> <span title="telltalerearfoglight">后雾灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.lowbeamingicator) + '"></i> <span title="lowbeamingicator">近光指示灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.parklightonwarning) + '"></i> <span title="parklightonwarning">停车警示灯</span>' +
        '<i class="fa fa-circle ' + returnColor(data.light.turninglampswitch) + '"></i> <span title="turninglampswitch">转向灯</span>');

    //安全状态表
    $(".car-brake").html("");
    $(".car-brake").append('<div>' +
        '<i class="fa fa-circle ' + returnColor(data.safety.tcsoperating) + '"></i>汽车防滑<br/>' +
        '<i class="fa fa-circle ' + returnColor(data.safety.absoperating) + '"></i>防锁死刹车<br/>' +
        '<i class="fa fa-circle ' + returnColor(data.safety.espoperating) + '"></i>车身电子稳定<br/>' +
        '</div>');

    //其他数据
    $(".car-information").html("");
    $(".car-information").append('<span class="car-information-item">车辆速度:</span>' +
        '<span class="car-information-value">' + data.recongnizeObject.speedx + '&nbsp;M/S&nbsp;&nbsp;' + data.recongnizeObject.speedy + '&nbsp;M/S</span>' +
        '<br/>' +
        '<span class="car-information-item">车辆大小:</span>' +
        '<span class="car-information-value">' + parseFloat(data.recongnizeObject.length).toFixed(1) + 'M&nbsp;' + parseFloat(data.recongnizeObject.width).toFixed(1) + 'M&nbsp;' + parseFloat(data.recongnizeObject.heigth).toFixed(1) + 'M</span>' +
        '<br/>' +
        // '<span class="car-information-item">四轴加速度:</span>' +
        // '<span class="car-information-value">3&nbsp;M/S' +
        // '    <span style="vertical-align: 6px;font-size: 0.4em;">2</span>' +
        // '</span>' +
        // '<span class="car-information-value">3&nbsp;M/S' +
        // '    <span style="vertical-align: 6px;font-size: 0.4em;">2</span>' +
        // '</span>' +
        // '<span class="car-information-value">3&nbsp;M/S' +
        // '    <span style="vertical-align: 6px;font-size: 0.4em;">2</span>' +
        // '</span>' +
        // '<span class="car-information-value">3&nbsp;M/S' +
        // '    <span style="vertical-align: 6px;font-size: 0.4em;">2</span>' +
        // '</span>' +
        // '<br/>' +
        // '<span class="car-information-item">方向盘转角:</span>' +
        // '<span class="car-information-value">45</span>度' +
        // '<br/>' +
        '<span class="car-information-item">俯仰角:</span>' +
        '<span class="car-information-value">' + data.recongnizeObject.longAngle + '</span>°' +
        '<br/>' +
        '<span class="car-information-item">横摆角:</span>' +
        '<span class="car-information-value">' + data.recongnizeObject.latAngle + '</span>°' +
        '<br/>' +
        '<span class="car-information-item">横滚角:</span>' +
        '<span class="car-information-value">' + data.recongnizeObject.yawAngle + '</span>°' +
        '<br/>');

    //按钮
    $(".car-button").html("");
    if (who >= 2) {
        $(".car-button").append('<button style="background-color:gray">详细信息</button>' +
            '<button onclick="get_old_data(\'' + data.light.uniqueId + '\')">历史轨迹</button>' +
            '<button onclick="get_position(\'' + data.light.uniqueId + '\')">当前位置</button>' +
            '<button onclick="get_route(\'' + data.light.uniqueId + '\')">轨迹追踪</button>');
    }
    else {
        $(".car-button").append('<button onclick="javascript:window.location.href=\'car.html?sou=' + data.light.uniqueId + '\'">详细信息</button>' +
            '<button onclick="get_old_data(\'' + data.light.uniqueId + '\')">历史轨迹</button>' +
            '<button onclick="get_position(\'' + data.light.uniqueId + '\')">当前位置</button>' +
            '<button onclick="get_route(\'' + data.light.uniqueId + '\')">轨迹追踪</button>');
    }
}



function get_position(id) {
    $.ajax({
        url: addr + "/car/position",
        type: "GET",
        dataType: "json",
        data: {
            uniqueId: id,
            token: token,
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                data = data.data;
                setTimeout(function () {
                    map = new BMap.Map("allmap");
                    map.enableScrollWheelZoom();
                    map.clearOverlays();
                    var point = new BMap.Point(data.longitude, data.latitude);
                    map.centerAndZoom(point, 15);
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);               // 将标注添加到地图中
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    map.panTo(point);
                }, 1000 * 0.5);
                $('#Position').modal('show');
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

// var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
//     scale: 0.1,//图标缩放大小
//     strokeColor:'#fff',//设置矢量图标的线填充颜色
//     strokeWeight: '1',//设置线宽
// });
// var icons_route = new BMap.IconSequence(sy, '10', '30');
// // 创建polyline对象

var end_point;
function get_route(id) {
    $.ajax({
        url: addr + "/car/positionList",
        type: "GET",
        dataType: "json",
        data: {
            uniqueId: id,
            token: token,
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                var data2 = toBaidupix(data.data);
                setTimeout(function () {
                    map2.clearOverlays();
                    setZoom(map2, data2);
                    var route_go_line = new BMap.Polyline(data2, { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                    map2.addOverlay(route_go_line);   //增加折线
                    end_point = new BMap.Marker(data2[data2.length - 1]);
                    end_point.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    map2.addOverlay(end_point);
                }, 1000 * 0.5);
                $('#route').modal('show');
                setTimeout(function () {
                    if ($('#route').hasClass("in")) {
                        update_route(id, data2, data.message);
                    }
                }, 5000);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function update_route(id, old_data, time) {

    lastRoutPara2.id=id;
    lastRoutPara2.old_data=old_data;
    lastRoutPara2.time=time;
    if(gengXin_flag2==false) //停止更新
    {
        return;
    }

    $.ajax({
        url: addr + "/car/positionList/after",
        type: "GET",
        dataType: "json",
        data: {
            uniqueId: id,
            token: token,
            create_time: time,
        },
        success: function (data) {
            console.log(data);
            var data2;
            if (data.state == true) {
                if (data.data.length != 0) {
                    var new_data = toBaidupix(data.data);
                    data2 = new_data.concat(old_data);
                    var route_go_line = new BMap.Polyline(data2, { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                    map2.addOverlay(route_go_line);   //增加折线
                    end_point.setPosition(data2[0]);
                }
                else {
                    data2 = old_data;
                }
                setTimeout(function () {
                    if ($('#route').hasClass("in")) {
                        update_route(id, data2, data.message);
                    }
                }, 5000);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function get_old_data(id) {
    $(".time_search").attr('onclick', 'old_toute_search(\'' + id + '\')');
    var date = new Date();
    date.setDate(date.getDate() - 1)
    date.setHours(00);
    date.setMinutes(00);
    date.setSeconds(00);
    var date1 = date.Format("yyyy-MM-dd hh:mm:ss");
    var date1_1 = date.Format("yyyy-MM-dd");
    var data0 = new Date();
    data0.setHours(00);
    data0.setMinutes(00);
    data0.setSeconds(00);
    // var date2 = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
    // var date2_1 = (new Date()).Format("yyyy-MM-dd");
    var date2 = data0.Format("yyyy-MM-dd hh:mm:ss");
    var date2_1 = data0.Format("yyyy-MM-dd");
    date.setDate(date.getDate() - 89);
    var min_date = date.Format("yyyy-MM-dd");
    var max_date = (new Date()).Format("yyyy-MM-dd");
    $("input[name=time1]").attr("min", min_date);
    $("input[name=time1]").attr("max", max_date);
    $("input[name=time2]").attr("min", min_date);
    $("input[name=time2]").attr("max", max_date);
    $("input[name=time1]").val(date1_1);
    $("input[name=time2]").val(date2_1);
    var date222 = new Date(Date.parse(date2)+24*3600*1000);
    var date2222 = date222.Format("yyyy-MM-dd hh:mm:ss");
    layer.load(1);
    $.ajax({
        url: addr + "/search/car/history", //"/search/car/history"
        type: "GET",
        dataType: "json",
        data: {
            // start: "2018-07-22 00:00:00",
            // end: "2018-07-23 00:00:00",
            start: date1,
            // end: date2,
            end: date2222,
            uniqueid: id,
            token: token,
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                data = data.data;
                old_data_1 = data;
                $(".time-list").html('');
                $(".time-list").append('<div class="time-tr">序号</div><div class="time-tr">上线时间</div><div class="time-tr">离线时间</div><div class="time-tr">查看</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".time-list").append('<div class="time-tr2" onclick=old_route(' + i + ')>' +
                        '<div class="time-td">' + (i + 1) + '</div>' +
                        '<div class="time-td">' + data[i][data[i].length - 1].createTime.split(".")[0] + '</div>' +
                        '<div class="time-td">' + data[i][0].createTime.split(".")[0] + '</div>' +
                        '<div class="time-td"><a onclick=old_route(' + i + ')>查看</a></div>' +
                        '</div>');
                }
                if (data.length == 0) {
                    $(".time-list").append('<div>' +
                        '<div class="time-td" style="width:100%">无数据</div>' +
                        '</div>');
                }
                $('#olddata').modal('show');
            } else {
                layer.msg(' ' + data.message);
            }
            layer.closeAll("loading");
        },
        error: function (error) {
            layer.msg("系统错误!");
            layer.closeAll("loading");
        }

    });
}

function old_route(id) {
    var old_data = old_data_1[id];
    console.log(old_data);
    var data3 = toBaidupix(old_data);
    console.log(data3);
    $('#oldroute').modal('show');
    setTimeout(function () {
        map3.clearOverlays();
        var icon = new BMap.Icon('image/qi.png', new BMap.Size(40, 52));
        var end_point1 = new BMap.Marker(data3[0], { icon: icon });
        var end_point2 = new BMap.Marker(data3[data3.length - 1]);
        map3.addOverlay(end_point1);
        map3.addOverlay(end_point2);
        setZoom(map3, data3);
        var route_go_line2 = new BMap.Polyline(data3, { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
        map3.addOverlay(route_go_line2);   //增加折线
    }, 1000 * 0.5);
}

function old_toute_search(id) {
    var date1 = $("input[name=time1]").val() + " 00:00:00";
    var date2 = $("input[name=time2]").val() + " 00:00:00";
    var date2221 = new Date(Date.parse(date2)+24*3600*1000);
    var date22221 = date2221.Format("yyyy-MM-dd hh:mm:ss");
    // console.log(date1);
    // console.log(date2);
    layer.load(1);
    $.ajax({
        url: addr + "/search/car/history",
        type: "GET",
        dataType: "json",
        data: {
            start: date1,
            end: date22221,
            uniqueid: id,
            token: token,
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                data = data.data;
                old_data_1 = data;
                $(".time-list").html('');
                $(".time-list").append('<div class="time-tr">序号</div><div class="time-tr">上线时间</div><div class="time-tr">离线时间</div><div class="time-tr">查看</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".time-list").append('<div class="time-tr2" onclick=old_route(' + i + ')>' +
                        '<div class="time-td">' + (i + 1) + '</div>' +
                        '<div class="time-td">' + data[i][data[i].length - 1].createTime.split(".")[0] + '</div>' +
                        '<div class="time-td">' + data[i][0].createTime.split(".")[0] + '</div>' +
                        '<div class="time-td"><a onclick=old_route(' + i + ')>查看</a></div>' +
                        '</div>');
                }
                if (data.length == 0) {
                    $(".time-list").append('<div>' +
                        '<div class="time-td" style="width:100%">无数据</div>' +
                        '</div>');
                }
                $('#olddata').modal('show');
            } else {
                layer.msg(' ' + data.message);
            }
            layer.closeAll("loading");
        },
        error: function (error) {
            layer.msg("系统错误!");
            layer.closeAll("loading");
        }

    });
}

//根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
function setZoom(lzw, points) {
    if (points.length > 0) {
        var maxLng = points[0].lng;
        var minLng = points[0].lng;
        var maxLat = points[0].lat;
        var minLat = points[0].lat;
        var res;
        for (var i = points.length - 1; i >= 0; i--) {
            res = points[i];
            if (res.lng > maxLng) maxLng = res.lng;
            if (res.lng < minLng) minLng = res.lng;
            if (res.lat > maxLat) maxLat = res.lat;
            if (res.lat < minLat) minLat = res.lat;
        };
        var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        var zoom = getZoom(lzw, maxLng, minLng, maxLat, minLat);
        lzw.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom);
    } else {
        //没有坐标，显示全中国
        lzw.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
    }
}

//根据经纬极值计算绽放级别。
function getZoom(lzw, maxLng, minLng, maxLat, minLat) {
    var zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"]//级别18到3。
    var pointA = new BMap.Point(maxLng, maxLat);  // 创建点坐标A
    var pointB = new BMap.Point(minLng, minLat);  // 创建点坐标B
    var distance = lzw.getDistance(pointA, pointB).toFixed(1);  //获取两点距离,保留小数点后两位
    for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
            return 18 - i + 3;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
    };
}

function toBaidupix(data) {
    var length = data.length;
    var data2 = new Array(length);
    for (var i = 0; i < length; i++) {
        data2[i] = new BMap.Point(data[i].longitude, data[i].latitude);
    }
    return data2;
}


function search(which) {
    switch (which) {
        case "on-team-search":
            on_team_searchText = $("input[name=" + which + "]").val();
            get_on_team(1);
            break;
        case "is-on-team-search":
            is_on_team_searchText = $("input[name=" + which + "]").val();
            get_is_on_team(1);
            break;
        case "off-team-search":
            off_team_searchText = $("input[name=" + which + "]").val();
            get_off_team(1);
            break;
        default:
            break;
    }
}

function reset(which) {
    $("input[name=" + which + "]").val('');
    switch (which) {
        case "on-team-search":
            on_team_searchText = $("input[name=" + which + "]").val();
            get_on_team(1);
            break;
        case "is-on-team-search":
            is_on_team_searchText = $("input[name=" + which + "]").val();
            get_is_on_team(1);
            break;
        case "off-team-search":
            off_team_searchText = $("input[name=" + which + "]").val();
            get_off_team(1);
            break;
        default:
            break;
    }
}

function keyup_submit(e, which) {
    var evt = window.event || e;
    if (evt.keyCode == 13) {
        search(which);
    }
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}