get_warning_list(1);

function get_warning_list(the_page) {
    $.ajax({
        url: addr + "/car/fault",
        type: "POST",
        dataType: "json",
        data: {
            page: the_page,
            offset: 12,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                put_warning_data(data.data);
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

function put_warning_data(data) {
    $(".car-content").html('');
    if(data.length==0){
        $(".car-content").append('<div style="width:100%;text-align:center;font-size:18px;color:#a7a7a7;">无数据</div>');
    }
    for (var i = 0; i < data.length; i++) {
        $(".car-content").append('<div class="debug-log col-sm-6">'+
            '<div class="log" >'+
            '<i class="fa fa-warning color-red"></i>'+
            '<div class="log-title">'+
            '<h5>'+data[i].licence+'</h5>'+
            '<p>故障类型：'+data[i].ftype+'</p>'+
            // '<p>故障编码：'+data[i].fcode+'</p>'+
            // '<p>故障内部编号：'+data[i].ino+'</p>'+
            '</div>'+
            '<p class="time">'+data[i].timestamp+'</p>'+
        '</div >'+
    '</div > ');
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