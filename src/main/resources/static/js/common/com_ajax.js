$(function () {
    //ajax
    var classify1 = "热播";
    var classify2 = "综艺";
    var fun1 = $.ajax({
            //查看导航
            async: true,
            cache: false,
            type: "POST",
            url: "/common/queryMenu",
            dataType: "json",    //传入的数据类型是：json
        }),
        fun2 = $.ajax({
            //查看轮播图
            async: true,
            cache: false,
            type: "post",
            data: {},
            url: "/common/queryImg",
            datatype: "json",    //传入的数据类型是：json
        }), fun3 = $.ajax({
            //查看热播
            async: true,
            cache: false,
            type: "post",
            data: {},
            url: "/common/queryFilm/" + classify1,
            datatype: "json",    //传入的数据类型是：json
        }), fun4 = $.ajax({
            //查看综艺
            async: true,
            cache: false,
            type: "post",
            data: {},
            url: "/common/queryFilm/" + classify2,
            datatype: "json",    //传入的数据类型是：json
        });
    $.when(fun1, fun2, fun3, fun4).then(function (data1, data2, data3, data4) {
        let html = '';
        if (data1) {
            const ul = $("<ul class='cl-effect-1'></ul>");
            for (let key in data1[0]) {
                html = '<li class="sandy-one animated-button victoria-three"><a href="' + data1[0][key].url + '">' + data1[0][key].pname + '</a></li>';
                ul.append(html);
            }
            $(".left_tab").append(ul);
        }
        if (data2) {
            const list_img = $(".list li img");
            //遍历li下的图片
            $.each(list_img, function (index) {
                $(this).attr("src", "/images/common/" + data2[0][index].img);
            })
        }
        if (data3) {
            // console.log(data3);
            for (let k in data3[0]) {
                html = "<li>" +
                    "    <img class='img' src='/images/common/" + data3[0][k].imgurl + "'>" +
                    "<a href='/common/content/" + data3[0][k].tname + "'>" +
                    "     <p>" +
                    "  <span>" + data3[0][k].about + "</span>" +
                    "   <i></i>" +
                    "     </p></a>" +
                    "     </li>";
                $("#main_bz").append(html);
            }
        }
        if (data4) {
            // console.log(data4);
            for (let k in data4[0]) {
                console.log(k);
                if (k <= 3) {
                    html = "<li class='zy_list'>" +
                        "   <a href='/common/content/" + data4[0][k].tname + "'>" +
                        "<img class='zy_img' alt='' src='/images/common/" + data4[0][k].imgurl + "'></a>" +
                        "</li>";
                    $("#variety .zy_ul").append(html);
                }
            }
        }
    }, function () {
        //失败回调，任意一个请求失败时返回
        layer.alert('error!请求数据失败!');
    });
    //页面效果
    $(".nav_btn").click(function () {
        $(".head_nav").stop().hide();
        $(".site-wrapper").slideToggle();
        $(".main").toggle();
        $(this).toggleClass("icon-x");
    });
    $(".wrap_btn").click(function () {
        $(".head_nav").stop().hide();
        $(".site-wrapper").slideToggle();
        $(".main").toggle();
        $(this).toggleClass("icon-list");
        $(".nav_btn").addClass("icon-list").removeClass("icon-x");
    });
    $("#head_icon").hover(function () {
        $(this).toggleClass("head_current");
    });
    //判断页面滚动距离实现头部显示与隐藏
    $(document).scroll(function () {
        var win = $(window);
        // console.log(win.scrollTop());
        if (win.scrollTop() >= 700) {
            $(".head_nav").slideDown().css({
                display: "block"
            })
        } else {
            $(".head_nav").slideUp().css({
                display: "none"
            })
        }
    });
    $(".click_back").click(function () {
        window.location.href = "/common/index";
    });
})