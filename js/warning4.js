get_warning_list(1);
find(1);
//put_offline_warning_data(data)
//put_online_warning_data(1)
function get_warning_list(the_page) {
    $.ajax({
        url: addr + "/search/online/fault",
        type: "GET",
        dataType: "json",
        data: {
            page: the_page,
            offset: 12,
            //token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_online_warning_data(data.data);
                var pageNavObj = new PageNavCreate("page-warning", {
                    pageCount: data.message,//总页数
                    currentPage: the_page,//当前页
                    perPageNum: 5,//每页按钮数
                });
                pageNavObj.afterClick(page_warning);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }
    });
    function page_warning(clickPage) {
        get_warning_list(clickPage);
    }
}

function put_online_warning_data(data) {
    $(".user-list-ul1").html("");
    $(".user-list-ul1").append('<div class="row table"><div>')
    $(".user-list-ul1 .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-3">车牌号</div>' +
        '<div class="user-tr col-sm-3">异常名</div>' +
        '<div class="user-tr col-sm-3">开始时间</div>' +
        '<div class="user-tr col-sm-3">结束时间</div>' +
        '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".user-list-ul1 .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".user-list-ul1 .table").append('<div class="user-th user-info-' + i + '" token="' + data[i].token + '">' +
            '<div class="user-td col-sm-3">' + data[i].cfLicence + '</div>' +
            '<div class="user-td col-sm-3">' + data[i].fType + '</div>' +
            '<div class="user-td col-sm-3">' + data[i].create_time + '</div>' +
            '<div class="user-td col-sm-3">' + data[i].end_time+ '</div></div>');
    }
}

function put_offline_warning_data(data) {
    $(".user-list-ul").html("");
    $(".user-list-ul").append('<div class="row table"><div>')
    $(".user-list-ul .table").append('<div class="user-tH">' +
        '<div class="user-tr col-sm-3">车牌号</div>' +
        '<div class="user-tr col-sm-3">异常名</div>' +
        '<div class="user-tr col-sm-3">开始时间</div>' +
        '<div class="user-tr col-sm-3">结束时间</div>' +
         '<div class="clearfix"></div></div>');
    if (data.length == 0) {
        $(".user-list-ul .table").append('<div class="user-th"><div class="user-td col-sm-12">无数据</div></div>');
    }
    for (var i = 0; i < data.length; i++) {
            $(".user-list-ul .table").append('<div class="user-th user-info-' + i + '" token="' + data[i].token + '">' +
                '<div class="user-td col-sm-3">' + data[i].cfLicence + '</div>' +
                '<div class="user-td col-sm-3">' + data[i].fType + '</div>' +
                '<div class="user-td col-sm-3">' + data[i].create_time + '</div>' +
                '<div class="user-td col-sm-3">' + data[i].end_time+ '</div></div>');
    }
}

function find(the_page) {
    var warning_name = $(".user-id input").val();
    var warning_time = $(".user-role select option:selected").val();
    // var user_password = $(".user-password input").val();
    // var user_sure_password = $(".user-sure-password input").val();
    $.ajax({
        url: addr + "/search/history/fault",
        type: "GET",
        data: {
            ftype: warning_name,
            time: warning_time,
            page: the_page,
            offset: 12,
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_offline_warning_data(data.data);
                var pageNavObj = new PageNavCreate("page-warning1", {
                    pageCount: data.message,//总页数
                    currentPage: the_page,//当前页
                    perPageNum: 5,//每页按钮数
                });
                pageNavObj.afterClick(page_warning);
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }
    });
    function page_warning(clickPage) {
        find(clickPage);
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