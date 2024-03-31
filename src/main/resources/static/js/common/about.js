$(function () {
    queryCom();
    //页面效果
    $(".nav_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".js_main").toggle(500);
        $(this).toggleClass("icon-x");
    });
    $(".wrap_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".js_main").toggle(500);
        $(this).toggleClass("icon-list");
        $(".nav_btn").addClass("icon-list").removeClass("icon-x");
    });
    $(".click_back").click(function () {
        window.location.href = "/common/index";
    });

    const type1 = "寄语";
    $.ajax({
        async: true,
        type: "POST",
        url: "/common/queryJs/" + type1,
        dataType: "json",    //传入的数据类型是：json
        success: function (data2) {
            console.log(data2);
            var html = data2.contents;
            var obj = {
                text: [html],
                color: "white",//字体和光标颜色
                speed: 80,//打字速度
                sleep: 2000,//回退停顿时间
                width: "75%",//宽度
                height: "300",//高度
                background: "#13151f",//背景颜色
                sign: true//启动或停止
            }
            var box = $('.info');
            box.lu_word(obj);
        }, error: function () {
            layer.alert("数据请求失败", {icon: 4});
        }
    });

    function queryCom() {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            data: {},
            url: "/common/queryCom",
            datatype: "json",    //传入的数据类型是：json
            success: function (data3) {
                console.log(data3);
                let html = "";
                for (let key in data3) {
                    html = "<div class='content_1'>" +
                        "<span class='plid' style='display: none'>" + data3[key].id + "</span>" +
                        " <img class='name' src='" + data3[key].imgUrl + "'" +
                        "     alt='photo'>" +
                        "  <div class='mainInfo'>" +
                        "   <div class='userId'><a href='javascript:;'>" + data3[key].username + "</a></div>" +
                        "    <div class='conInfo'>" + data3[key].com_content + "</div>" +
                        " <div class='time'>" + data3[key].created + "</div>" + "</div>" + "</div>";
                    $(".msgFrame").append(html);
                }
            }, error: function () {
                layer.alert("数据请求失败", {icon: 4});
            }
        });
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            data: {},
            url: "/common/queryComNum",
            datatype: "json",    //传入的数据类型是：json
            success: function (data4) {
                console.log(data4);
                var comNum = data4.comNum;
                $(".numofmessage").html("留言（" + comNum + ")");
            }, error: function () {
                layer.alert("数据请求失败", {icon: 4});
            }
        });
    }
})