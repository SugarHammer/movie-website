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
            title: '添加选项',
            content: $('#bidderDiv1')
        });
        $('#bidderDiv1 #id').val(Math.floor(Math.random() * 200));
        $('#bidderDiv1 #pname').val("");
        $('#bidderDiv1 #pid').val("");
        $("#bidderDiv1 #url").val("");
        $("#dilivery1").off("click").on("click", function () {
            var record = {
                id: $('#bidderDiv1 #id').val(),
                pname: $('#bidderDiv1 #pname').val(),
                pid: $('#bidderDiv1 #pid').val(),
                url: $('#bidderDiv1 #url').val(),
            }
            $.ajax({
                type: "POST",
                url: "/admin/insertMenu",
                datatype: "text",
                contentType: "application/json",
                //JavaScript 对象转换为 JSON 字符串
                data: JSON.stringify(record),
                async: true,
                success: function (result) {
                    console.log(result)
                    layer.alert('添加成功', {
                        icon: 6
                    });
                },
                error: function (result) {
                    layer.msg('选项id可能存在,添加失败', {
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
                title: '选项查询'
            }, function (val, index) {
                layer.close(index);
                $.ajax({
                    type: "POST",
                    datatype: "json",
                    url: "/admin/findMenuById",
                    data: "id=" + val,
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success: function (result) {
                        console.log(result);
                        var r = JSON.stringify(result);
                        layer.alert("id:" + result["id"] + ",选项名:"
                            + result["pname"] + ",选项id:"
                            + result["pid"] + ",跳转路径:"
                            + result["url"])
                    },
                    error: function (result) {
                        layer.msg('查找失败', {
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

            url: '/admin/showMenuTable',
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
                field: 'pname',
                title: '选项名'
            }, {
                field: 'pid',
                title: '选项id'
            }, {
                field: 'url',
                title: '跳转路径'
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
                    url: "/admin/deleteMenu",
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
                        layer.msg('删除失败', {
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
            title: '修改导航栏信息',
            content: $('#bidderDiv1')
        });
        $('#bidderDiv1 #id').val(row["id"]);
        $("#bidderDiv1 #pname").val(row["pname"]);
        $("#bidderDiv1 #pid").val(row["pid"]);
        $("#bidderDiv1 #url").val(row["url"]);

        $("#bidderDiv1 #dilivery1").off("click").on("click", function () {
            var record = {
                id: $('#bidderDiv1 #id').val(),
                pname: $('#bidderDiv1 #pname').val(),
                pid: $('#bidderDiv1 #pid').val(),
                url: $('#bidderDiv1 #url').val()
            }
            //Ajax调用处理
            $.ajax({
                type: "POST",
                url: "/admin/updateMenu",
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
                    layer.msg('修改失败', {
                        icon: 5
                    });
                }
            })
        });
    }
}

