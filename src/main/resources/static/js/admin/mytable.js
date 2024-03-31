$(function () {
    var oTable = new TableInit();
    oTable.Init();
    //首页
    $('#home').on('click', function () {
        location.reload();
    });

    //添加
    $('#add').on('click', function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-lan',
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            title: '添加用户',
            content: $('#bidderDiv2')
        });

        $('#bidderDiv2 #id').val("");
        $('#bidderDiv2 #username').val("");
        $('#bidderDiv2 #password').val("");
        $("#bidderDiv2 #age").val("");
        $("#bidderDiv2 #sex").val("");
        $("#bidderDiv2 #authority").val("");
        $("#dilivery2").off("click").on("click", function () {
            var authority = $("#bidderDiv2 #authority").val().trim();
            if (authority == "") {
                authority = "普通用户";
            } else {
                authority = $("#bidderDiv2 #authority").val();
            }
            var record = {
                id: $('#bidderDiv2 #id').val(),
                username: $('#bidderDiv2 #username').val(),
                password: $('#bidderDiv2 #password').val(),
                age: $('#bidderDiv2 #age').val(),
                sex: $('#bidderDiv2 #sex').val(),
                authority: authority
            }
            $.ajax({
                type: "POST",
                url: "/admin/insertUser",
                datatype: "text",
                contentType: "application/json",
                //JavaScript 对象转换为 JSON 字符串
                data: JSON.stringify(record),
                async: true,
                success: function (result) {
                    console.log(result);
                    layer.alert('添加成功', {
                        icon: 6
                    });
                },
                error: function (result) {
                    layer.alert('用户id可能存在,添加失败', {
                        icon: 5
                    });
                }
            })
        });
    });

    //查询
    $('#searchByid').on(
        'click',
        function (message) {
            layer.prompt({
                title: '用户查询'
            }, function (val, index) {
                layer.close(index);
                $.ajax({
                    type: "POST",
                    datatype: "json",
                    url: "/admin/findUserById",
                    data: "id=" + val,
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success: function (result) {
                        console.log(result);
                        var r = JSON.stringify(result);
                        layer.alert("id:" + result["id"] + ",用户名:"
                            + result["username"] + ",年龄:"
                            + result["age"] + ",性别:"
                            + result["sex"] + ",省份:"
                            + result["province"])
                    },
                    error: function (result) {
                        layer.alert('查找失败', {
                            icon: 5
                        });
                    }
                });
            });
        })
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        $('#ArbetTable').bootstrapTable('destroy');
        $('#ArbetTable').bootstrapTable({

            url: '/admin/showTable',
            method: 'post',
            //toolbar: '#toolbar',
            striped: true,
            cache: false,
            pagination: true,
            sortable: false,
            queryParams: oTableInit.queryParams,
            showToggle: true,
            sidePagination: "server",
            pageList: [4, 10],
            pageNumber: 1,
            pageSize: 4,
            showColunms: true,
            clickToSelect: true,
            showRefresh: true,
            search: false,
            uniqueId: "id",
            contentType: "application/x-www-form-urlencoded",
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'username',
                title: '姓名'
            }, {
                field: 'age',
                title: '年龄'
            }, {
                field: 'sex',
                title: '性别'
            }, {
                field: 'authority',
                title: '权限'
            }, {
                field: 'operate',
                title: '操作',
                events: operateEvents,
                formatter: operateFormatter
            }]
        });
    };
    oTableInit.queryParams = function (params) {
        var temp = {
            limit: params.limit,
            offset: params.offset
        };
        return temp;
    };
    return oTableInit;
};

function operateFormatter(value, row, index) {
    return ['<button class="btn btn-warning" id="edit">编辑</button>',
        '<button class="btn btn-danger" id="delete">删除</button>']
        .join(" ");
}

window.operateEvents = {
    "click #delete": function (e, value, row, index) {
        layer.msg("确认删除?", {
            time: 0,
            icon: 7,
            btn: ["是", "否"],
            yes: function (index) {
                layer.close(index);
                $.ajax({
                    type: "POST",
                    url: "/admin/deleteUser",
                    data: "id=" + row["id"],
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success: function (result) {
                        //自动刷新
                        layer.alert('删除成功',
                            function () {
                                location.reload();
                            });
                    },
                    error: function (result) {
                        layer.alert('删除失败', {
                            icon: 5
                        });
                    }
                })
            }
        })
    },
    "click #edit": function (e, value, row, index) {
        layer.open({
            type: 1,
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            title: '修改用户信息',
            content: $('#bidderDiv1')
        });
        $("#bidderDiv1 #id").val(row["id"]);
        $("#bidderDiv1 #username").val(row["username"]);
        $("#bidderDiv1 #sex").val(row["sex"]);
        $("#bidderDiv1 #age").val(row["age"]);
        $("#bidderDiv1 #authority").val(row["authority"]);
        $("#bidderDiv1 #dilivery1").off("click").on("click", function () {
            var authority = $.trim($("#bidderDiv1 #authority").val());
            if (authority == "") {
                authority = "普通用户";
            } else {
                authority = $("#bidderDiv1 #authority").val();
            }
            var record = {
                oldid: row["id"],
                id: $('#id').val(),
                username: $('#bidderDiv1 #username').val(),
                sex: $('#bidderDiv1 #sex').val(),
                age: $('#bidderDiv1 #age').val(),
                authority: authority
            }
            //Ajax调用处理
            $.ajax({
                type: "POST",
                url: "/admin/updateUser",
                datatype: "text",
                contentType: "application/json",
                data: JSON.stringify(record),
                async: true,
                success: function (result) {
                    layer.alert('修改成功', {
                        icon: 6
                    });
                },
                error: function (result) {
                    layer.alert('修改失败', {
                        icon: 5
                    });
                }
            })
        });
    }
}

