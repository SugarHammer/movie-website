$(function () {
    $(".nav-item").hover(function () {
        $(this).addClass("dropdown-hover");
        $(".nav-child").stop().fadeIn();
    }, function () {
        $(this).removeClass("dropdown-hover")
        $(".nav-child").stop().fadeOut();
    });
    $("dd a").hover(function () {
        $(this).toggleClass("current");
    });
    $(".menu-items").hover(function () {
        $(this).toggleClass("current");
    });
    //控制垂直导航栏子功能的隐藏和显示
    $(".menu-con").click(function () {
        var title = $(this).find(".items-cont").html();
        $(".text_info>span").html(title);
        $(this).addClass("li-current").parent().siblings().find(".menu-con").removeClass(
            "li-current");
        $(this).next().stop().slideToggle();
        $(this).parent().siblings().find(".funBackgroungColor").stop().slideUp();
    });
    //滚动到一定距离隐藏
    //绑定滚动条事件
    // 绑定滚动条事件
    $(window).on("scroll", function () {
        var sTop = $(window).scrollTop();
        var sTop = parseInt(sTop);
        if (sTop <= 25) {
            if (!$(".main > #div_home_title").is(":visible")) {
                try {
                    $(".main > #div_home_title").slideDown();
                } catch (e) {
                    $(".main > #div_home_title").show();
                }
            }
        } else {
            if ($(".main > #div_home_title").is(":visible")) {
                try {
                    $(".main > #div_home_title").slideUp();
                } catch (e) {
                    $(".main > #div_home_title").hide();
                }
            }
        }
    });
    var t = null;
    t = setTimeout(time, 1000); //開始运行
    function time() {
        clearTimeout(t); //清除定时器
        dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        $(".showTime").html(y + "." + mt + "." + day + "-" + h + ":" + m + ":" + s);
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }

})