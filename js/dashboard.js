var map;
var map2 = new BMap.Map("allmap2");
var map3 = new BMap.Map("allmap3");
var old_data_1 = [];
map2.enableScrollWheelZoom();
map3.enableScrollWheelZoom();
var gengXin_flag1=true;
var lastRoutPara1={time:0,
    id:0,
    old_data:0
}
var searchText = "";
var select_menu;
var data1;
get_online_car_info(1);
get_offline_car_info(1);
get_car_info();
function gengXin(){
    if (gengXin_flag1)  //需要停止更新，并设置为“更新”
    {
        gengXin_flag1=false;
        $("#gengXin").html('更新');
    }
    else{
        gengXin_flag1=true;
        $("#gengXin").html('停止更新');
        if(lastRoutPara1.id) {
            update_route(lastRoutPara1.id, lastRoutPara1.old_data, lastRoutPara1.time);
        }
    }
}
//获得车型三级联动
function get_car_info() {
    $.ajax({
        url: addr + "/data/select/menu/" + token,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                select_menu = data.data;
                console.log(select_menu)
                data1=data;
                console.log(data1)
                get_model(select_menu);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

// 改变三级联动的车型函数
function get_model(menu) {
    var car_model = get_key(menu);
    var car_mark = get_key(menu[car_model[0]]);
    var car_type = menu[car_model[0]][car_mark[0]];
    $(".car-model").html('');
    $(".car-mark").html('');
    $(".car-type").html('');
    $(".car-model").append('<option value="0">车型</option>');
    $(".car-mark").append('<option value="0">品牌</option>');
    $(".car-type").append('<option value="0">型号</option>');
    for (var i = 0; i < car_model.length; i++) {
        $(".car-model").append('<option value="' + car_model[i] + '">' + car_model[i] + '</option>');
    }
    // for (var i = 0; i < car_mark.length; i++) {
    //     $(".car-mark").append('<option value="' + car_mark[i] + '">' + car_mark[i] + '</option>');
    // }
    // for (var i = 0; i < car_type.length; i++) {
    //     $(".car-type").append('<option value="' + car_type[i]["tpId"] + '">' + car_type[i]["tpName"] + '</option>');
    // }
}
// 改变三级联动的品牌函数
function get_mark() {
    $(".car-mark").html('');
    $(".car-type").html('');
    $(".car-mark").append('<option value="0">品牌</option>');
    $(".car-type").append('<option value="0">型号</option>');
    var car_model = $(".car-model").val();
    if (car_model == "0") {
        return;
    }
    var car_mark = get_key(select_menu[car_model]);
    var car_type = select_menu[car_model][car_mark[0]];
    for (var i = 0; i < car_mark.length; i++) {
        $(".car-mark").append('<option value="' + car_mark[i] + '">' + car_mark[i] + '</option>');
    }
    for (var i = 0; i < car_type.length; i++) {
        $(".car-type").append('<option value="' + car_type[i]["tpId"] + '">' + car_type[i]["tpName"] + '</option>');
    }
}
// 改变三级联动的型号函数
function get_type() {
    $(".car-type").html('');
    $(".car-type").append('<option value="0">型号</option>');
    var car_model = $(".car-model").val();
    var car_mark = $(".car-mark").val();
    if (car_model == "0" || car_mark == "0") {
        return;
    }
    var car_type = select_menu[car_model][car_mark];
    for (var i = 0; i < car_type.length; i++) {
        $(".car-type").append('<option value="' + car_type[i]["tpId"] + '">' + car_type[i]["tpName"] + '</option>');
    }
}

// 将车型的一级转化为数组
function get_key(the_array) {
    var x = new Array();
    for (var key in the_array) {
        x.push(key);
    }
    return x;
}

function get_online_car_info(the_page) {
    $.ajax({
        url: addr + "/car/online/" + ((searchText == "") ? "" : "search"),
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: 20,
            token: token,
            keyword: searchText
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                update_car_list("online-list", data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-online", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_online);
                 }else{
                    var pageNavObj = new PageNavCreate1("page-online", {
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
    function page_online(clickPage) {
        get_online_car_info(clickPage);
    }
}

function get_offline_car_info(the_page) {
    $.ajax({
        url: addr + "/car/offline/" + ((searchText == "") ? "" : "search"),
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: 20,
            token: token,
            keyword: searchText
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                update_car_list("offline-list", data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-offline", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_offline);
                }
                else{
                    var pageNavObj = new PageNavCreate1("page-offline", {
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
    function page_offline(clickPage) {
        get_offline_car_info(clickPage);
    }
}

function update_car_list(list, data) {
    $("." + list).html("");
    if (data[0].length == 0 && data[1].length == 0) {
        $("." + list).append('<div style="margin-top:50px;width:100%;text-align:center;font-size:18px;color:#a7a7a7;">无数据</div>');
    }
    else {
        if (list == "online-list") {
            //异常
            // for (var i = 0; i < data[0].length; i++) {
            //     $("." + list).append('<div class="car-thumb-father">' +
            //         '<div class="car-thumb" data-toggle="modal" data-target="#myModal" style = "border-left: 30px solid red;"' +
            //         'onclick="car_detail(\'' + data[0][i].uniqueid + '\',\'' + data[0][i].c_licence + '\',0)">' + data[0][i].c_licence +
            //         '</div>' +
            //         '</div>');
            // }

            //正常
            for (var i = 0; i < data[0].length; i++) {
                $("." + list).append('<div class="car-thumb-father">' +
                    '<div class="car-thumb" data-toggle="modal" data-target="#myModal" style = "border-left: 30px solid green;"' +
                    'onclick="car_detail(\'' + data[0][i].uniqueid + '\',\'' + data[0][i].c_licence + '\',0)">' + data[0][i].c_licence +
                    '</div>' +
                    '</div>');
            }
        }
        else if(list=="offline-list"){
            // //异常
            // for (var i = 0; i < data[0].length; i++) {
            //     $("." + list).append('<div class="car-thumb-father">' +
            //         '<div class="car-thumb" data-toggle="modal" data-target="#myModal" style = "border-left: 30px solid red;"' +
            //         'onclick="car_detail(\'' + data[0][i].uniqueid + '\',\'' + data[0][i].c_licence + '\',1)">' + data[0][i].c_licence +
            //         '</div>' +
            //         '</div>');
            // }

            //正常
            for (var i = 0; i < data[1].length; i++) {
                $("." + list).append('<div class="car-thumb-father">' +
                    '<div class="car-thumb" data-toggle="modal" data-target="#myModal" style = "border-left: 30px solid green;"' +
                    'onclick="car_detail(\'' + data[1][i].uniqueid + '\',\'' + data[1][i].c_licence + '\',1)">' + data[1][i].c_licence +
                    '</div>' +
                    '</div>');
            }
        }
    }
}

function car_detail(car_id, license, wh) {
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
                update_car_detail(data.data, license, wh);
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

function update_car_detail(data, license, wh) {
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
    if (wh == 0) {
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
    if (wh == 1) {
        if (who >= 2) {
            $(".car-button").append('<button style="background-color:gray">详细信息</button>' +
                '<button onclick="get_old_data(\'' + data.light.uniqueId + '\')">历史轨迹</button>');
        }
        else {
            $(".car-button").append('<button onclick="javascript:window.location.href=\'car.html?sou=' + data.light.uniqueId + '\'">详细信息</button>' +
                '<button onclick="get_old_data(\'' + data.light.uniqueId + '\')">历史轨迹</button>');
        }
    }

    $(".license").html("");
    $(".license").text('车牌号：' + license);
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
                console.log("1data"+data2);
                setTimeout(function () {
                    map2.clearOverlays();
                    setZoom(map2, data2);
                    for(var i=0;i<data2.length-1;i++){
                        var array1 = [data2[i],data2[i+1]];
                        console.log(array1);
                        if(((new Date(data.data[i].createTime)).getTime()-(new Date(data.data[i+1].createTime)).getTime())<30*1000){
                            var route_go_line = new BMap.Polyline(array1, {strokeColor: "red", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                            map2.addOverlay(route_go_line);   //增加折线
                            array1.splice(0,2);
                        }else {
                            var route_go_line01 = new BMap.Polyline(array1, {strokeColor: "green", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                            map2.addOverlay(route_go_line01);   //增加折线
                            array1.splice(0,2);
                        }
                        //array1.splice(0,2);
                    }
                    //var route_go_line = new BMap.Polyline(data2, { strokeColor: "red", strokeWeight: 4, strokeOpacity: 1 });   //创建折线
                    //map2.addOverlay(route_go_line);   //增加折线
                    end_point = new BMap.Marker(data2[0]);
                    end_point.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    map2.addOverlay(end_point);
                }, 1000 * 0.5);
                $('#route').modal('show');
                setTimeout(function () {
                    if ($('#route').hasClass("in")) {
                        //update_route(id, data2, data.message);
                        update_route(id, data.data, data.message);
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

    lastRoutPara1.id=id;
    lastRoutPara1.old_data=toBaidupix(old_data);
    lastRoutPara1.time=time;
    if(gengXin_flag1==false) //停止更新
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
            var data21;
            if (data.state == true) {
                if (data.data.length != 0) {
                    var new_data = toBaidupix(data.data);
                    console.log(new_data);
                    data2 = new_data.concat(toBaidupix(old_data));
                    data21 = data.data.concat(old_data);
                    console.log("data21"+data21);
                    for(var i=0;i<data2.length-1;i++){
                        var array2 = [data2[i],data2[i+1]];
                        console.log(array2);
                        if((new Date((data21[i].createTime)).getTime()-(new Date(data21[i+1].createTime)).getTime())<30*1000){
                            var route_go_line1 = new BMap.Polyline(array2, {strokeColor: "red", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                            map2.addOverlay(route_go_line1);   //增加折线
                            array2.splice(0,2);
                        }else {
                            var route_go_line11 = new BMap.Polyline(array2, {strokeColor: "green", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                            map2.addOverlay(route_go_line11);   //增加折线
                            array2.splice(0,2);
                        }
                    }
                    // if(new Date(new_data.create_time)-nwe.Date(old_data.create_time)<20*60*1000) {
                    //     var route_go_line = new BMap.Polyline(data2, {
                    //         strokeColor: "red",
                    //         strokeWeight: 4,
                    //         strokeOpacity: 1
                    //     });   //创建折线
                    //     map2.addOverlay(route_go_line);   //增加折线
                    // }else {
                    //     var route_go_line1 = new BMap.Polyline(data2, {
                    //         strokeColor: "green",
                    //         strokeWeight: 4,
                    //         strokeOpacity: 1
                    //     });   //创建折线
                    //     map2.addOverlay(route_go_line1);   //增加折线
                    // }
                    end_point.setPosition(data2[0]);
                    map2.panTo(data2[0]);
                }
                else {
                    data21 = old_data;
                }
                setTimeout(function () {
                    if ($('#route').hasClass("in")) {
                        update_route(id, data21, data.message);
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
    date.setDate(date.getDate() - 1);
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
    var min_date=date.Format("yyyy-MM-dd");
    var max_date=(new Date()).Format("yyyy-MM-dd");
    $("input[name=time1]").attr("min",min_date);
    $("input[name=time1]").attr("max",max_date);
    $("input[name=time2]").attr("min",min_date);
    $("input[name=time2]").attr("max",max_date);
    $("input[name=time1]").val(date1_1);
    $("input[name=time2]").val(date2_1);
    var date222 = new Date(Date.parse(date2)+24*3600*1000);
    var date2222 = date222.Format("yyyy-MM-dd hh:mm:ss");
    layer.load(1);
    $.ajax({
        url: addr + "/search/car/history",
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
        for(var i=0;i<data3.length-1;i++) {
            var array = [data3[i],data3[i+1]]
            //array[0]=data3[i];
            //array[1]=data3[i+1];
            //if(true){
            if(((new Date(old_data[i].createTime)).getTime()-(new Date(old_data[i+1].createTime)).getTime())<30*1000){
                var route_go_line2 = new BMap.Polyline(array, {strokeColor: "red", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                map3.addOverlay(route_go_line2);   //增加折线

            }else {
                var route_go_line21 = new BMap.Polyline(array, {strokeColor: "green", strokeWeight: 4, strokeOpacity: 1});   //创建折线
                map3.addOverlay(route_go_line21);   //增加折线
            }
            array.splice(0,2);
        }
    }, 1000 * 0.5);
}

function old_toute_search(id) {
    // var date1 = $("input[name=time1]").val();
    // var date2 = $("input[name=time2]").val();
    // var date = new Date();
    // date.setDate(date.getDate() - 90);
    // var min_date=date.Format("yyyy-MM-dd");
    // var max_date=(new Date()).Format("yyyy-MM-dd");

    
    date1 = $("input[name=time1]").val() + " 00:00:00";
    date2 = $("input[name=time2]").val() + " 00:00:00";
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
            // end: date2,
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


function search() {
    searchText = $("input[name=search]").val();
    get_online_car_info(1);
    get_offline_car_info(1);
}

function keyup_submit(e) {
    var evt = window.event || e;
    if (evt.keyCode == 13) {
        search();
    }
}

function filter3() {
    $("input[name=search]").val('');
    search();
}

function filter2() {
    _init_area();
    $("input[name=exception]").val('');
    $(".car-model").html('');
    get_model(select_menu);
    get_online_car_info(1);
    get_offline_car_info(1);
}

function filter() {
    var tab = $(".tab-active").attr("id");
    var s_province = $("#s_province").val();
    var s_city = $("#s_city").val();
    var s_county = $("#s_county").val();
    var speed = ((s_province == "省份") ? "" : s_province + ",") + ((s_city == "地级市") ? "" : s_city + ",") + ((s_county == "市、县级市") ? "" : s_county + ",");
    var modelid = (($(".car-model").val() == "0") ? "" : $(".car-model").val())
    var companyid = (($(".car-mark").val() == "0") ? "" : $(".car-mark").val())
    var typeId = (($(".car-type").val() == "0") ? "" : $(".car-type").val())
    //var exception = $("input[name=exception]").val();
    if (tab == "tab1") {
        filter2(1);
        function filter2(the_page) {
            $.ajax({
                url: addr + "/search/online/info/keywords",
                type: "GET",
                dataType: "json",
                data: {
                    location: speed,
                    typeid: typeId,
                    modelname: modelid,
                    companyname: companyid,
                    //fault: exception,
                    page: 1,
                    offset: 20,
                    token: token,
                },
                success: function (data) {
                    console.log("c"+companyid)
                    console.log("m"+modelid)
                    console.log("t"+typeId)
                    console.log(data);
                    if (data.state == true) {
                        update_car_list("online-list", data.data);
                        if(data.message!="0"&&data.message!="1") {
                            var pageNavObj = new PageNavCreate("page-online", {
                                pageCount: data.message,//总页数
                                currentPage: the_page,//当前页
                                perPageNum: 5,//每页按钮数
                            });
                            pageNavObj.afterClick(filter_page_online);
                        }
                        else{
                            var pageNavObj = new PageNavCreate1("page-online", {
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
        }
        function filter_page_online(clickPage) {
            filter2(clickPage);
        }
    }
    else if (tab == "tab2") {
        console.log(speed);
        console.log(modelid);
        console.log(companyid);
        console.log(typeId);
        // console.log(exception);
        filter3(1);
        function filter3(the_page) {

            $.ajax({
                url: addr + "/search/offline/info/keywords",
                type: "GET",
                dataType: "json",
                data: {
                    location: speed,
                    modelname: modelid,
                    companyname: companyid,
                    typeid: typeId,
                    page: 1,
                    offset: 20,
                    token: token,
                },
                success: function (data) {
                    console.log(data);
                    if (data.state == true) {
                        update_car_list("offline-list", data.data);
                        if(data.message!="0"&&data.message!="1") {
                            var pageNavObj = new PageNavCreate("page-offline", {
                                pageCount: data.message,//总页数
                                currentPage: the_page,//当前页
                                perPageNum: 5,//每页按钮数
                            });
                            pageNavObj.afterClick(page_offline);
                        }
                        else{
                            var pageNavObj = new PageNavCreate1("page-offline", {
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
        }
        function page_offline(clickPage) {
            filter3(clickPage);
        }
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