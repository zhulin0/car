get_car_info();
var select_menu;

function add_car_model() {
    var car_model = $(".add-car-model input").val();
    if (car_model == "") {
        layer.msg("请完善表格");
        return;
    }
    $.ajax({
        url: addr + "/data/insert/carmodel",
        type: "POST",
        dataType: "json",
        data: {
            modelname: car_model,
            token: token
        },
        success: function (data) {
            console.log(data);
            if (data.state == true) {
                layer.msg("添加成功");
                $(".add-car-model input").val('');
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
                get_mark(select_menu);
                get_zNodes();
            } else {
                layer.msg(' ' + data.message);
            }
        },
        error: function (error) {
            layer.msg("系统错误!");
        }

    });
}

function get_mark(menu) {
    var car_model = get_key(menu);
    $(".car-model2").html('');
    $(".car-model3").html('');
    $(".car-mark3").html('');
    for (var i = 0; i < car_model.length; i++) {
        $(".car-model2").append('<option value="' + car_model[i] + '">' + car_model[i] + '</option>');
        $(".car-model3").append('<option value="' + car_model[i] + '">' + car_model[i] + '</option>');
    }
    get_car_type();
}

function get_key(the_array) {
    var x = new Array();
    for (var key in the_array) {
        x.push(key);
    }
    return x;
}

function add_car_mark() {
    var car_model = $(".car-model2").val();
    var car_mark = $(".car-mark2").val();
    $.ajax({
        url: addr + "/data/insert/carcompany",
        type: "POST",
        dataType: "json",
        data: {
            modelname: car_model,
            companyname: car_mark,
            token: token
        },
        success: function (data) {
            if (data.state == true) {
                $(".car-mark2").val('');
                layer.msg("添加成功!");
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

function get_car_type() {
    $(".car-mark3").html('');
    var car_model = $(".car-model3").val();
    var car_company = get_key(select_menu[car_model]);
    for (var i = 0; i < car_company.length; i++) {
        $(".car-mark3").append('<option value="' + car_company[i] + '">' + car_company[i] + '</option>');
    }
}

function add_car_type() {
    var car_mdoel = $(".car-model3").val();
    var car_mark = $(".car-mark3").val();
    var car_type = $(".car-type3").val();
    $.ajax({
        url: addr + "/data/insert/cartype",
        type: "POST",
        dataType: "json",
        data: {
            modelname: car_mdoel,
            companyname: car_mark,
            typename: car_type,
            token: token
        },
        success: function (data) {
            if (data.state == true) {
                $(".car-mark3").val('');
                $(".car-type3").val('');
                layer.msg("添加成功!");
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

var setting = {
    view: {
        selectedMulti: false
    },
    data: {
        simpleData: {
            enable: true,
        }
    },
    edit: {
        enable: false
    }
};

function get_zNodes() {
    var nodes = [];
    var mark1_array = get_key(select_menu);
    for (var i = 0; i < mark1_array.length; i++) {
        var node1 = {};
        var mark1 = mark1_array[i];
        var child2 = select_menu[mark1];
        var mark2_array = get_key(child2);
        node1.id = i;
        node1.name = mark1;
        node1.iconOpen = "./image/mark1_open.png";
        node1.iconClose = "./image/mark1_close.png";
        if (mark2_array.length != 0) {
            node1.children = [];
            for (var j = 0; j < mark2_array.length; j++) {
                var mark2 = mark2_array[j];
                var child3 = child2[mark2];
                var node2 = {};
                node2.id = i + "-" + j;
                node2.name = mark2;
                node2.iconOpen = "./image/mark2_open.png";
                node2.iconClose = "./image/mark2_close.png";
                var mark3_array = get_key(child3);
                if (mark3_array.length != 0) {
                    node2.children = [];
                    for (var k = 0; k < mark3_array.length; k++) {
                        var node3 = {};
                        node3.id = i + "-" + j + "-" + k;
                        node3.name = child3[k].tpName;
                        node3.icon = "./image/mark3.png";
                        node2.children.push(node3);
                    }
                }
                else {
                    node2.children = [{
                        id: -1, name: "无", icon: "./image/mark3.png"
                    }
                    ]
                }
                node1.children.push(node2);
            }
        }
        else {
            node1.children = [{
                id: -1, name: "无", iconOpen: "./image/mark2_open.png", iconClose: "./image/mark2_close.png", children: [
                    { id: -1, name: "无", icon: "./image/mark3.png" }
                ]
            }
            ]
        }
        nodes.push(node1);
    };

    console.log(nodes);
    $.fn.zTree.init($("#tree"), setting, nodes);
}


