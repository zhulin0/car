get_push();
get_response_car();

function get_push() {
    $.ajax({
        url: addr + "/search/user/mail/on/",
        type: "GET",
        data: {
            token: token
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                if (data.data == 1) {
                    $("#cmn-toggle-mail").prop("checked", true);
                }
                // else{
                //     $("#cmn-toggle-mail").prop("checked", false);
                // }
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
            // window.location.href="login.html";
        }

    });
}

function change_mail() {
    var on = $("#cmn-toggle-mail").prop("checked");
    on = on ? 0 : 1;
    $.ajax({
        url: addr + "/search/user/set/mail/",
        type: "GET",
        data: {
            token: token,
            on: on,
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                if (on == 1) {
                    $("#cmn-toggle-mail").prop("checked", true);
                }
                else {
                    $("#cmn-toggle-mail").prop("checked", false);
                }
            } else {
                if (on == 1) {
                    $("#cmn-toggle-mail").prop("checked", false);
                }
                else {
                    $("#cmn-toggle-mail").prop("checked", true);
                }
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
            // window.location.href="login.html";
        }

    });
}

function get_response_car(){
    $.ajax({
        url: addr + "/search/user/admin/car/",
        type: "GET",
        data: {
            token: token,
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_on_data(data.data);
                // if (data.message!="0"&&data.message!="1") {
                //     var pageNavObj = new PageNavCreate("page-on-team", {
                //         pageCount: data.message,//总页数
                //         currentPage: the_page,//当前页
                //         perPageNum: 5,//每页按钮数
                //     });
                //     pageNavObj.afterClick(page_on_team);
                // }
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
            // window.location.href="login.html";
        }

    });
}

function put_on_data(data) {
    $(".on-car").html('');
    $(".on-car").append('<div class="row table"><div>')
    $(".on-car .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-3">序号</div>' +
        '<div class="user-tr col-sm-3">发动机号</div>' +
        '<div class="user-tr col-sm-3">车牌号</div>' +
        '<div class="user-tr col-sm-3">投放日期</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".on-car .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".on-car .table").append('<div class="user-th">' +
            '<div class="user-td col-sm-3">' + (i+1) + '</div>' +
            '<div class="user-td col-sm-3">' + data[i].c_id + '</div>' +
            '<div class="user-td col-sm-3">' + data[i].c_licence + '</div>' +
            '<div class="user-td col-sm-3">' + timestampToTime(data[i].c_put_time) + '</div>' +
            '</div>');
    }
}

// 获取时间并转换格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    return Y + M + D;
}