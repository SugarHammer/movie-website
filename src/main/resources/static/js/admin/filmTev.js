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
        $('#bidderDiv1 #tid').val(Math.floor(Math.random() * 200));
        $('#bidderDiv1 #tname').val("");
        $('#bidderDiv1 #tgrade').val("");
        $('#bidderDiv1 #about').val("");
        $('#bidderDiv1 #imgurl').val("");
        $('#bidderDiv1 #tyear').val("");
        $("#bidderDiv1 #classify").val("");
        $("#dilivery1").off("click").on("click", function () {
            var record = {
                Tid: $('#bidderDiv1 #tid').val(),
                Tname: $('#bidderDiv1 #tname').val(),
                imgurl: $('#bidderDiv1 #imgurl').val(),
                Tgrade: $('#bidderDiv1 #tgrade').val(),
                about: $('#bidderDiv1 #about').val(),
                Tyear: $('#bidderDiv1 #tyear').val(),
                classify: $('#bidderDiv1 #classify').val(),
            }
            $.ajax({
                type: "POST",
                url: "/admin/insertFilm",
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
                title: '影片查询'
            }, function (val, index) {
                layer.close(index);
                $.ajax({
                    type: "POST",
                    datatype: "json",
                    url: "/admin/findFilmById",
                    data: "tid=" + val,
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    success: function (result) {
                        console.log(result);
                        var r = JSON.stringify(result);
                        layer.alert("Tid: " + result["tid"] + ",影片名称: "
                            + result["tname"] + ",影片评分: "
                            + result["tgrade"] + ",上映年份: "
                            + result["tyear"] + ",封面url: "
                            + result["imgurl"] + ",影片分类: " +
                            result["classify"], {
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

            url: '/admin/showFilmTable',
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
                field: 'tid',
                title: 'Tid'
            }, {
                field: 'tname',
                title: '影片名称'
            }, {
                field: 'tgrade',
                title: '影评'
            }, {
                field: 'tyear',
                title: '上映年份'
            }, {
                field: 'imgurl',
                title: '影片封面url'
            }, {
                field: 'about',
                title: '影片介绍'
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
                    url: "/admin/deleteFilm",
                    data: "tid=" + row["tid"],
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
            title: '修改影视信息',
            content: $('#bidderDiv1')
        });
        $('#bidderDiv1 #tid').val(row["tid"]);
        $("#bidderDiv1 #tname").val(row["tname"]);
        $("#bidderDiv1 #tyear").val(row["tyear"]);
        $("#bidderDiv1 #tgrade").val(row["tgrade"]);
        $("#bidderDiv1 #imgurl").val(row["imgurl"]);
        $("#bidderDiv1 #about").val(row["about"]);
        $("#bidderDiv1 #classify").val(row["classify"]);

        $("#bidderDiv1 #dilivery1").off("click").on("click", function () {
            var record = {
                tid: $('#bidderDiv1 #tid').val(),
                tname: $('#bidderDiv1 #tname').val(),
                tgrade: $('#bidderDiv1 #tgrade').val(),
                tyear: $('#bidderDiv1 #tyear').val(),
                about: $('#bidderDiv1 #about').val(),
                imgurl: $('#bidderDiv1 #imgurl').val(),
                classify: $('#bidderDiv1 #classify').val(),
            }
            //Ajax调用处理
            $.ajax({
                type: "POST",
                url: "/admin/updateFilm",
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

