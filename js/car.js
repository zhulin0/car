var on_car_searchText = "";
var off_car_searchText = "";
var off2_car_searchText = "";

if(who==1){
    $(".user-response-tonone").css("display","none");
}

if (geturlString("sou")) {
    $("input[name=on-car-search]").val(geturlString("sou"));
    on_car_searchText = geturlString("sou");
}
get_on_car(1);
get_off_car(1);
get_off2_car(1);

get_car_info();
get_all_user();


var select_menu;

//获得所有用户
function get_all_user() {
    $.ajax({
        url: addr + "/search/user/all/user/",
        type: "GET",
        dataType: "json",
        data: {
            token: token,
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                $(".selectpicker").html('');
                for (var i = 0; i < data.data.length; i++) {
                    $(".selectpicker").append('<option value="' + data.data[i].id + '">' + data.data[i].username + '</option>');
                }
                $('.selectpicker').selectpicker({
                    'selectedText': 'cat',
                    'noneSelectedText': '选择负责人'
                });
            } else {
                $('.selectpicker').selectpicker({
                    'selectedText': 'cat',
                    'noneSelectedText': '选择负责人'
                });
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}
// 获得车型
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
    for (var i = 0; i < car_model.length; i++) {
        $(".car-model").append('<option value="' + car_model[i] + '">' + car_model[i] + '</option>');
    }
    for (var i = 0; i < car_mark.length; i++) {
        $(".car-mark").append('<option value="' + car_mark[i] + '">' + car_mark[i] + '</option>');
    }
    for (var i = 0; i < car_type.length; i++) {
        $(".car-type").append('<option value="' + car_type[i]["tpId"] + '">' + car_type[i]["tpName"] + '</option>');
    }
}
// 改变三级联动的品牌函数
function get_mark() {
    $(".car-mark").html('');
    $(".car-type").html('');
    var car_model = $(".car-model").val();
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
    var car_model = $(".car-model").val();
    var car_mark = $(".car-mark").val();
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
// 获得服役车辆
function get_on_car(the_page) {
    $.ajax({
        url: addr + "/data/select/carinfo/byoff/" + ((on_car_searchText == "") ? "" : "keyword"),
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: PAGENUM,
            off: 1,
            keyword: on_car_searchText,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_on_data(data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-on-car", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_on_car);
                }else{
                    var pageNavObj = new PageNavCreate1("page-on-car", {
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

    function page_on_car(clickPage) {
        get_on_car(clickPage);
    }
}


// 将服役车辆放入页面中
function put_on_data(data) {
    $(".on-car").html('');
    $(".on-car").append('<div class="row table"><div>')
    $(".on-car .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-2">发动机号</div>' +
        '<div class="user-tr col-sm-2">车牌号</div>' +
        '<div class="user-tr col-sm-1">车型</div>' +
        '<div class="user-tr col-sm-1">品牌</div>' +
        '<div class="user-tr col-sm-1">型号</div>' +
        '<div class="user-tr col-sm-2">投放日期</div>' +
        '<div class="user-tr col-sm-3">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".on-car .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    if (who == 1) {
        for (var i = 0; i < data.length; i++) {
            $(".on-car .table").append('<div class="user-th">' +
                '<div class="user-td col-sm-2">' + data[i].c_id + '</div>' +
                '<div class="user-td col-sm-2">' + data[i].c_licence + '</div>' +
                '<div class="user-td col-sm-1"> ' + data[i].m_name + '</div>' +
                '<div class="user-td col-sm-1">' + data[i].cp_name + '</div>' +
                '<div class="user-td col-sm-1">' + data[i].tp_name + '</div>' +
                '<div class="user-td col-sm-2">' + timestampToTime(data[i].c_put_time) + '</div>' +
                '<div class="user-td col-sm-3">' +
                '<button onclick="get_car_file_list(\'' + data[i].c_id + '\',true)">详情</button>' +
                '<button style="color:#c5c5c5">负责人</button>' +
                '<button onclick="del_car(\'' + data[i].c_id + '\',0)">报废</button>' +
                '<button onclick="del_car(\'' + data[i].c_id + '\',2)">移交</button>' +
                '</div>' +
                '</div>');
        }
    }
    else {
        for (var i = 0; i < data.length; i++) {
            $(".on-car .table").append('<div class="user-th">' +
                '<div class="user-td col-sm-2">' + data[i].c_id + '</div>' +
                '<div class="user-td col-sm-2">' + data[i].c_licence + '</div>' +
                '<div class="user-td col-sm-1"> ' + data[i].m_name + '</div>' +
                '<div class="user-td col-sm-1">' + data[i].cp_name + '</div>' +
                '<div class="user-td col-sm-1">' + data[i].tp_name + '</div>' +
                '<div class="user-td col-sm-2">' + timestampToTime(data[i].c_put_time) + '</div>' +
                '<div class="user-td col-sm-3">' +
                '<button onclick="get_car_file_list(\'' + data[i].c_id + '\',true)">详情</button>' +
                '<button onclick="get_response_list(\'' + data[i].c_id + '\',\'' + data[i].uniqueId + '\',true)">负责人</button>' +
                '<button onclick="del_car(\'' + data[i].c_id + '\',0)">报废</button>' +
                '<button onclick="del_car(\'' + data[i].c_id + '\',2)">移交</button>' +
                '</div>' +
                '</div>');
        }
    }

}
// 将报废车辆信息放入页面中
function put_off_data(data) {
    $(".off-car").html('');
    $(".off-car").append('<div class="row table"><div>')
    $(".off-car .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-2">发动机号</div>' +
        '<div class="user-tr col-sm-2">车牌号</div>' +
        '<div class="user-tr col-sm-1">车型</div>' +
        '<div class="user-tr col-sm-1">品牌</div>' +
        '<div class="user-tr col-sm-1">型号</div>' +
        '<div class="user-tr col-sm-2">报废日期</div>' +
        '<div class="user-tr col-sm-3">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".off-car .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".off-car .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-2">' + data[i].c_id + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].c_licence + '</div>' +
            '<div class="user-td col-sm-1"> ' + data[i].m_name + '</div>' +
            '<div class="user-td col-sm-1">' + data[i].cp_name + '</div>' +
            '<div class="user-td col-sm-1">' + data[i].tp_name + '</div>' +
            '<div class="user-td col-sm-2">' + timestampToTime(data[i].c_put_time) + '</div>' +
            '<div class="user-td col-sm-3">' +
            '<button onclick="get_car_file_list(\'' + data[i].c_id + '\',true)">详情</button>' +
            '<button onclick="del_car(\'' + data[i].c_id + '\',1)">重新投放</button>' +
            '</div>' +
            '</div>');
    }
}

// 将移交车辆信息放入页面中
function put_off2_data(data) {
    $(".off2-car").html('');
    $(".off2-car").append('<div class="row table"><div>')
    $(".off2-car .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-2">发动机号</div>' +
        '<div class="user-tr col-sm-2">车牌号</div>' +
        '<div class="user-tr col-sm-1">车型</div>' +
        '<div class="user-tr col-sm-1">品牌</div>' +
        '<div class="user-tr col-sm-1">型号</div>' +
        '<div class="user-tr col-sm-2">移交日期</div>' +
        '<div class="user-tr col-sm-3">操作</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".off2-car .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".off2-car .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-2">' + data[i].c_id + '</div>' +
            '<div class="user-td col-sm-2">' + data[i].c_licence + '</div>' +
            '<div class="user-td col-sm-1"> ' + data[i].m_name + '</div>' +
            '<div class="user-td col-sm-1">' + data[i].cp_name + '</div>' +
            '<div class="user-td col-sm-1">' + data[i].tp_name + '</div>' +
            '<div class="user-td col-sm-2">' + timestampToTime(data[i].c_put_time) + '</div>' +
            '<div class="user-td col-sm-3">' +
            '<button onclick="get_car_file_list(\'' + data[i].c_id + '\',true)">详情</button>' +
            '<button onclick="del_car(\'' + data[i].c_id + '\',1)">重新投放</button>' +
            '</div>' +
            '</div>');
    }
}

//获得报废车辆 
function get_off_car(the_page) {
    $.ajax({
        url: addr + "/data/select/carinfo/byoff/" + ((off_car_searchText == "") ? "" : "keyword"),
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: PAGENUM,
            keyword: off_car_searchText,
            off: 0,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_off_data(data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-off-car", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_off_car);
                }else{
                    var pageNavObj = new PageNavCreate1("page-off-car", {
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
    function page_off_car(clickPage) {
        get_off_car(clickPage);
    }
}

//获得移交车辆 
function get_off2_car(the_page) {
    $.ajax({
        url: addr + "/data/select/carinfo/byoff/" + ((off2_car_searchText == "") ? "" : "keyword"),
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: PAGENUM,
            keyword: off2_car_searchText,
            off: 2,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_off2_data(data.data);
                if (data.message!="0"&&data.message!="1") {
                    var pageNavObj = new PageNavCreate("page-off2-car", {
                        pageCount: data.message,//总页数
                        currentPage: the_page,//当前页
                        perPageNum: 5,//每页按钮数
                    });
                    pageNavObj.afterClick(page_off2_car);
                }else{
                    var pageNavObj = new PageNavCreate1("page-off2-car", {
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
    function page_off2_car(clickPage) {
        get_off2_car(clickPage);
    }
}
// 添加车辆
function put_car() {
    var c_id = $(".c-id").val();
    var c_licence = $(".c-licence").val();
    var c_unique = $(".c-unique").val();
    var car_type = $(".car-type").val();
    var filesize = 0;
    var selectedValues = $('#selectpicker').val();
    var selectedValues2 = "";
    for (var i = 0; i < selectedValues.length; i++) {
        selectedValues2 = selectedValues2 + selectedValues[i] + ",";
    }
    if (selectedValues2 != "") {
        selectedValues2 = selectedValues2.substring(0, selectedValues2.length - 1);
    }

    if (c_id == "" || c_licence == "" || c_unique == "" || car_type == "") {
        layer.msg("请完善表格");
        return;
    }
    var formData = new FormData();
    formData.append("carId", c_id);
    formData.append("carLicence", c_licence);
    formData.append("uniqueId", c_unique);
    formData.append("typeId", car_type);
    formData.append("id", selectedValues2);
    formData.append("token", token);

    if (document.getElementById("c-info-file").files[0]) {
        for (var i = 0; i < document.getElementById("c-info-file").files.length; i++) { //文件数组
            filesize = filesize + document.getElementById("c-info-file").files[i].size;
        }
        if (filesize > 20000000) {
            layer.msg('上传一次文件不得超过20M');
            return;
        }
        for (var k in document.getElementById("c-info-file").files) { //文件数组
            formData.append('file', document.getElementById("c-info-file").files[k]);
        }
        layer.load(1);
        $.ajax({
            url: addr + "/data/insert/carinfo/withFile",
            type: "POST",
            data: formData,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            success: function (data) {
                console.log(data);
                if (data.state == true) {
                    get_on_car(1);
                    $(".c-id").val('');
                    $(".c-licence").val('');
                    $("#c-info-file").val('');
                    $(".c-unique").val('');
                    $('#selectpicker').selectpicker('val', []);
                    layer.msg('添加成功');
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
    else if (!document.getElementById("c-info-file").files[0]) {
        layer.load(1);
        $.ajax({
            url: addr + "/data/insert/carinfo",
            type: "POST",
            dataType: "json",
            data: {
                carId: c_id,
                carLicence: c_licence,
                uniqueId: c_unique,
                typeId: car_type,
                token: token,
                id: selectedValues2
            },
            success: function (data) {
                console.log(data);
                if (data.state == true) {
                    get_on_car(1);
                    $(".c-id").val('');
                    $(".c-licence").val('');
                    $(".c-unique").val('');
                    $('#selectpicker').selectpicker('val', []);
                    layer.msg('添加成功');
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

}
// 修改车辆状态车辆
function del_car(c_id, off) {
    var x = "";
    switch (off) {
        case 0:
            x = "报废";
            break;
        case 1:
            x = "重新投放";
            break;
        case 2:
            x = "移交";
            break;
        default:
            break;

    }
    layer.open({
        type: 1 //此处以iframe举例
        , title: ''
        , area: ['200px', '100px']
        , content: '确认' + x + '？'
        , btn: [x, '放弃'] //只是为了演示
        , yes: function (index) {
            $.ajax({
                url: addr + "/data/update/unable/car",
                type: "POST",
                data: {
                    carId: c_id,
                    token: token,
                    off: off
                },
                dataType: "json",
                success: function (data) {
                    if (data.state == true) {
                        get_on_car(1);
                        get_off_car(1);
                        get_off2_car(1);
                        layer.msg(x + '成功');
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

function get_response_list(c_id,uniqueId,show_modal) {
    $(".modal_push_response").attr('onclick', 'change_response(\'' + c_id + '\',\'' + uniqueId + '\')');
    $.ajax({
        url: addr + "/search/user/car/admin",
        type: "GET",
        data: {
            uniqueId: uniqueId,
            token: token
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                var data = data.data;
                var responeseVal = [];
                $(".response-list").html('');
                $(".response-list").append('<div class="file-tr">负责人</div><div class="file-tr">操作</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".response-list").append('<div>' +
                        '<div class="file-td">' + data[i].username + '</div>' +
                        '<div class="file-td"><a onclick="delete_response(\'' + data[i].id + '\',\'' + c_id + '\',\'' + uniqueId + '\')">删除</a></div>' +
                        '</div>');
                    responeseVal.push(data[i].id);
                }
                if (data.length == 0) {
                    $(".response-list").append('<div>' +
                        '<div class="file-td" style="width:100%">无负责人</div>' +
                        '</div>');
                }

                $('#selectpicker2').selectpicker('val', responeseVal);
                $('#selectpicker2').selectpicker('refresh');
                if (show_modal) {
                    $('#response_list').modal('show');
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


function get_car_file_list(c_id, show_modal) {
    var res = [];
    $.ajax({
        url: addr + "/document/carinfo/get",
        type: "POST",
        data: {
            carId: c_id,
            token: token
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.state == true) {

                $(".modal_push_file").attr('onclick', 'put_info(\'' + c_id + '\')');

                data = data.data;
                $(".file-list").html('');
                $(".file-list").append('<div class="file-tr">文件名</div><div class="file-tr">下载</div>');
                for (var i = 0; i < data.length; i++) {
                    $(".file-list").append('<div>' +
                        '<div class="file-td">' + data[i].document + '</div>' +
                        '<div class="file-td"><a href="../file/' + data[i].place + '" download="">下载</a></div>' +
                        '</div>');
                }
                if (data.length == 0) {
                    $(".file-list").append('<div>' +
                        '<div class="file-td" style="width:100%">无文件</div>' +
                        '</div>');
                }
                res = data;
                if (show_modal) {
                    $('#car_file_list').modal('show');
                }
            } else {
                layer.msg(' ' + data.message);
            }

        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
    return res;
}

// 在上传文件时记住发动机号
function put_info(c_id) {
    $(".c_id2").val(c_id);
}

// 获取时间并转换格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    return Y + M + D;
}

// 上传文件
function put_car_info() {
    if (!document.getElementById("c-info-file2").files[0]) {
        layer.msg("文件不能为空");
        return;
    }
    var c_id2 = $(".c_id2").val();
    var file_list = get_car_file_list(c_id2, false);
    //console.log(file_list);
    var filesize = 0;
    var formData = new FormData();
    formData.append("carId", c_id2);
    formData.append("token", token);
    for (var k in document.getElementById("c-info-file2").files) { //文件数组
        formData.append('file', document.getElementById("c-info-file2").files[k]);
    }
    var same_files = "";
    for (var i = 0; i < document.getElementById("c-info-file2").files.length; i++) { //文件数组
        filesize = filesize + document.getElementById("c-info-file2").files[i].size;
        for (var j = 0; j < file_list.length; j++) { //文件数组
            //console.log(document.getElementById("c-info-file2").files[i].name + '   ' + file_list[j].document)
            if (document.getElementById("c-info-file2").files[i].name == file_list[j].document) {
                same_files = same_files + file_list[j].document + "<br> ";
                break;
            }
        }
    }

    if (filesize > 20000000) {
        layer.msg('上传一次文件不得超过20M');
        return;
    }

    if (same_files != "") {

        layer.msg('已存在<br>' + same_files + '是否覆盖？', {
            time: 0 //不自动关闭
            , btn: ['覆盖', '放弃']
            , yes: function (index) {
                layer.closeAll();
                layer.load(1);
                $.ajax({
                    url: addr + "/document/carinfo/insert",
                    type: "POST",
                    data: formData,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    success: function (data) {
                        console.log(data);
                        if (data.state == true) {
                            $("#c-info-file2").val('');
                            get_car_file_list(c_id2, true);
                            layer.msg('上传成功');
                        } else {
                            layer.msg(' ' + data.message);
                        }
                        layer.closeAll("loading");
                    },
                    error: function (error) {
                        layer.msg("请上传文件或系统错误!");
                        layer.closeAll("loading");
                    }

                });
            }
            , btn2: function () {
                layer.closeAll();
            }
        });
    }
    else {
        layer.load(1);
        $.ajax({
            url: addr + "/document/carinfo/insert",
            type: "POST",
            data: formData,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            success: function (data) {
                console.log(data);
                if (data.state == true) {
                    $("#c-info-file2").val('');
                    get_car_file_list(c_id2, true);
                    layer.msg('上传成功');
                } else {
                    layer.msg(' ' + data.message);
                }
                layer.closeAll("loading");
            },
            error: function (error) {
                layer.msg("请上传文件或系统错误!");
                layer.closeAll("loading");
            }

        });
    }
}

function add_car_model() {
    var car_model1 = $(".car-modal1").val();
    var car_model2 = $(".car-modal2").val();
    var car_model3 = $(".car-modal3").val();
    console.log(car_model1);
    console.log(car_model2);
    console.log(car_model3);
    var isupdate = 0;
    for (var i = 3; i > 0; i--) {
        if ($(".car-modal" + i).val() == "" && isupdate == 1) {
            isupdate = 2;
        }
        if ($(".car-modal" + i).val() != "" && isupdate == 0) {
            isupdate = 1;
        }
    }

    if (isupdate == 2 || isupdate == 0) {
        layer.msg("请完善表格");
        return;
    }
    $.ajax({
        url: addr + "/data/insert/typeInfo",
        type: "POST",
        dataType: "json",
        data: {
            typename: car_model3,
            companyname: car_model2,
            modelname: car_model1,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                layer.msg("添加成功");
                $(".car-modal1").val('');
                $(".car-modal2").val('');
                $(".car-modal3").val('');
                get_car_info();
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function search(which) {
    switch (which) {
        case "on-car-search":
            on_car_searchText = $("input[name=" + which + "]").val();
            get_on_car(1);
            break;
        case "off-car-search":
            off_car_searchText = $("input[name=" + which + "]").val();
            get_off_car(1);
            break;
        case "off2-car-search":
            off2_car_searchText = $("input[name=" + which + "]").val();
            get_off2_car(1);
            break;
        default:
            break;
    }
}

function reset(which) {
    $("input[name=" + which + "]").val('');
    switch (which) {
        case "on-car-search":
            on_car_searchText = $("input[name=" + which + "]").val();
            get_on_car(1);
            break;
        case "off-car-search":
            off_car_searchText = $("input[name=" + which + "]").val();
            get_off_car(1);
            break;
        case "off2-car-search":
            off2_car_searchText = $("input[name=" + which + "]").val();
            get_off2_car(1);
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


function delete_response(userid, c_id,uniqueId) {
    layer.open({
        type: 1 //此处以iframe举例
        , title: ''
        , area: ['200px', '100px']
        , content: '确认删除？'
        , btn: ['删除', '放弃'] //只是为了演示
        , yes: function (index) {
            $.ajax({
                url: addr + "/search/user/delete/admin",
                type: "GET",
                dataType: "json",
                data: {
                    uniqueid: uniqueId,
                    token: token,
                    userid: userid
                },
                success: function (data) {
                    console.log(data);
                    if (data.state == true) {
                        get_response_list(c_id,uniqueId,true);
                        layer.msg('修改成功');
                    } else {
                        layer.msg(' ' + data.message);
                    }
                },
                error: function (error) {
                    layer.msg("系统错误!");
                }
            });
            layer.close(index);
        }, btn2: function () {
            layer.closeAll();
        }

        , zIndex: layer.zIndex //重点1
        , success: function (layero) {
            layer.setTop(layero); //重点2
        }
    });
}

function change_response(c_id,uniqueId) {
    layer.open({
        type: 1 //此处以iframe举例
        , title: ''
        , area: ['200px', '100px']
        , content: '确认修改？'
        , btn: ['修改', '放弃'] //只是为了演示
        , yes: function (index) {
            var selectedValues = $('#selectpicker2').val();
            var selectedValues2 = "";
            for (var i = 0; i < selectedValues.length; i++) {
                selectedValues2 = selectedValues2 + selectedValues[i] + ",";
            }
            if (selectedValues2 != "") {
                selectedValues2 = selectedValues2.substring(0, selectedValues2.length - 1);
            }
            $.ajax({
                url: addr + "/search/user/change/caradmin",
                type: "POST",
                dataType: "json",
                data: {
                    uniqueId: uniqueId,
                    token: token,
                    id: selectedValues2
                },
                success: function (data) {
                    console.log(data);
                    if (data.state == true) {
                        get_response_list(c_id,uniqueId,true);
                        layer.msg('修改成功');
                    } else {
                        layer.msg(' ' + data.message);
                    }
                },
                error: function (error) {
                    layer.msg("系统错误!");
                }
            });
            layer.close(index);
        }, btn2: function () {
            layer.closeAll();
        }

        , zIndex: layer.zIndex //重点1
        , success: function (layero) {
            layer.setTop(layero); //重点2
        }
    });
}

function geturlString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return decodeURI(r[2]);
    } else if (q != null) {
        return decodeURI(q[2]);
    } else {
        return null;
    }
}