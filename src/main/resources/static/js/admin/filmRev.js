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
            title: '添加影片',
            content: $('#bidderDiv1')
        });
        $('#bidderDiv1 #id').val(Math.floor(Math.random() * 200));
        $('#bidderDiv1 #username').val("");
        $('#bidderDiv1 #filmName').val("");
        $('#bidderDiv1 #reviewCont').val("");
        $('#bidderDiv1 #createTime').val("");
        $('#bidderDiv1 #likes').val("");
        $("#dilivery1").off("click").on("click", function () {
            var record = {
                id: $('#bidderDiv1 #id').val(),
                username: $('#bidderDiv1 #username').val(),
                reviewCont: $('#bidderDiv1 #reviewCont').val(),
                filmName: $('#bidderDiv1 #filmName').val(),
                createTime: $('#bidderDiv1 #createTime').val(),
                likes: $('#bidderDiv1 #likes').val()
            }
            $.ajax({
                type: "POST",
                url: "/common/insertRe",
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
                title: '用户评论信息查询'
            }, function (val, index) {
                layer.close(index);
                $.ajax({
                    type: "POST",
                    datatype: "json",
                    url: "/admin/findReById",
                    data: "id=" + val,
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success: function (result) {
                        console.log(result);
                        var r = JSON.stringify(result);
                        layer.alert("ID: " + result["id"] + ",评论人: "
                            + result["username"] + ",评论影片: "
                            + result["filmName"] + ",评论内容: "
                            + result["reviewCont"] + ",创建时间: "
                            + result["createTime"] + ",点赞数: " +
                            result["likes"], {
                            area: ['600px', '160px'], //宽高)
                        })
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

            url: '/admin/showReTable',
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
                title: 'Id'
            }, {
                field: 'username',
                title: '评论人'
            }, {
                field: 'filmName',
                title: '评论影片'
            }, {
                field: 'reviewCont',
                title: '评论内容'
            }, {
                field: 'createTime',
                title: '创建时间'
            }, {
                field: 'likes',
                title: '点赞数'
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
                    url: "/admin/deleteRe",
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
            title: '修改评论信息',
            content: $('#bidderDiv1')
        });
        $('#bidderDiv1 #id').val(row["id"]);
        $("#bidderDiv1 #username").val(row["username"]);
        $("#bidderDiv1 #filmName").val(row["filmName"]);
        $("#bidderDiv1 #reviewCont").val(row["reviewCont"]);
        $("#bidderDiv1 #createTime").val(row["createTime"]);
        $("#bidderDiv1 #likes").val(row["likes"]);

        $("#bidderDiv1 #dilivery1").off("click").on("click", function () {
            var record = {
                id: $('#bidderDiv1 #id').val(),
                username: $('#bidderDiv1 #username').val(),
                filmName: $('#bidderDiv1 #filmName').val(),
                reviewCont: $('#bidderDiv1 #reviewCont').val(),
                createTime: $('#bidderDiv1 #createTime').val(),
                likes: $('#bidderDiv1 #likes').val()
            }
            //Ajax调用处理
            $.ajax({
                type: "POST",
                url: "/admin/updateRe",
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

