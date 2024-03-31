$(function () {
    // 调用函数 查询评论
    queryRe();
    //提示框
    $(".tip").hover(function () {
        var tip = $(this).attr("content");
        $(this).children(".show_tip").html(tip).stop().fadeIn(500);
    }, function () {
        var tip = $(this).attr("content");
        $(this).children(".show_tip").html(tip).stop().fadeOut(500);
    });
    $(".pl").on("click", function () {
        $(".content,.subbtn").stop().toggle(500);
    })

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
    //播放功能
    $(".ys_con").on("click", "#bf_aa", function () { //视频被点击后执行
        // $('.videos').html("<video id='video' poster='/images/common/bsyq.jpg' style='width: 640px' src='/video/gmzr.mp4' preload='auto' controls='controls' autoplay='autoplay'></video> <span class='icon-x vclose' onclick='close1();'></span>");
        $('.videos').show();//视频窗口弹出
        $(".head_nav").slideToggle();
        $('.masklayer').show(); //遮罩层弹出
        $('body').css('overflow', 'hidden'); //禁止滚动
        winHeight = document.body.clientHeight;
        $(".masklayer").height(winHeight + 5000 + "px");
    });

    $(".vclose").click(function () {
        var v = document.getElementById('video');//获取视频节点
        $('.videos').hide();//点击关闭
        $('.masklayer').hide();//遮罩层隐藏
        v.pause();//停止
        $(".head_nav").slideToggle();
        $('.videos').html();
    });

    var text = $(".ys_jj .zk").text();
    var flag = true;
    $(".ys_jj .zk").click(function () {
        if (flag) {
            $(this).text("[收起]");
            flag = false;
        } else {
            $(this).text("[展开]");
            flag = true;
        }
        $(".ys_jj .jj_con").toggleClass("jj_current");
    });


    function queryRe() {
        var filmName = $(".nav_title").html().trim();
        var fun1 = $.ajax({
                async: true,
                cache: false,
                type: "POST",
                url: "/common/queryRe",
                data: {
                    filmName: filmName
                },
                dataType: "json",
            }),
            fun2 = $.ajax({
                async: true,
                cache: false,
                type: "POST",
                data: {
                    filmName: filmName
                },
                url: "/common/queryReNum",
                datatype: "json",
            });
        $.when(fun1, fun2).then(function (data1, data2) {
            if (data1) {
                console.log(data1);
                let html = "";
                for (let key in data1[0]) {
                    html = "<div class='content_1'>" +
                        "<span class='plid' style='display: none'>" + data1[0][key].id + "</span>" +
                        " <img class='name' src='" + data1[0][key].imgUrl + "'" +
                        "     alt='photo'>" +
                        "  <div class='mainInfo'>" +
                        "   <div class='userId'><a href='javascript:;'>" + data1[0][key].username + "</a></div>" +
                        "    <div class='conInfo'>" + data1[0][key].reviewCont + "</div>" +
                        "<div class='pl_btn'>" + "<a href='javascript:;' class='btn_one'>回复</a>" +
                        "<svg class='bi bi-chat-dots hf' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
                        "  <path fill-rule='evenodd' d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z'/>" +
                        "  <path d='M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\'/>" +
                        "</svg>"
                        + "<a href='Javascript:;' class='btn_two'>点赞(" + data1[0][key].likes + ")</a>" +
                        "<svg data-index='1' class='bi bi-hand-thumbs-up dz' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
                        "  <path fill-rule='evenodd' d='M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59'/>" +
                        "</svg>" +
                        "</div>" +
                        " <div class='time'>" + data1[0][key].createTime + "</div>" +
                        "</div>" +
                        "<textarea class='reply_content selected' placeholder='请输入评论信息'></textarea>" +
                        "<input type='button' name='submit' value='回复' class='reply_btn selected'>" +
                        "</div>";
                    $(".msgFrame").append(html);
                }
            }
            if (data2) {
                console.log(data2);
                $(".writePl .badge").html(Math.abs(data2[0].ReNum));
            }
        }, function () {
            layer.alert("数据请求失败", {icon: 4});
        });
    }
})