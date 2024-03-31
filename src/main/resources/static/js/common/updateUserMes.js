$(function () {
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
})