$(function () {
    $(".public a").hover(function () {
        $(this).toggleClass("top_current");
    });
    $(".one").show().siblings(".two").hide();
    $(".public").each(function (index) {
        $(this).attr("data-index", index);
    });
    $(".con_top .public").click(function () {
        //切换电影与动漫排行tab栏
        const index = $(this).attr("data-index");
        $(".ph_list").eq(index).fadeIn().siblings(".ph_list").fadeOut();
    });
    //页面效果
    $(".nav_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".con_area").toggle(500);
        $(this).toggleClass("icon-x");
    });
    $(".wrap_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".con_area").toggle(500);
        $(this).toggleClass("icon-list");
        $(".nav_btn").addClass("icon-list").removeClass("icon-x");
    });
    $(".click_back").click(function () {
        window.location.href = "/common/index";
    });
    var html = '';
    var classify1 = "电影";
    var classify2 = "动漫";
    var classify3 = "推荐";
    var fun1 = $.ajax({
        async: true,
        cache: false,
        type: "POST",
        url: "/common/queryFilm/" + classify1,
        dataType: "json",
    }), fun2 = $.ajax({
        async: true,
        cache: false,
        type: "POST",
        url: "/common/queryFilm/" + classify2,
        dataType: "json",
    }), fun3 = $.ajax({
        async: true,
        cache: false,
        type: "POST",
        url: "/common/queryFilm/" + classify3,
        dataType: "json",
    });
    $.when(fun1, fun2, fun3).then(function (data1, data2, data3) {
            if (data1) {
                console.log(data1);
                for (let key in data1[0]) {
                    html = '<li class="media wow bounceInLeft">' +
                        '  <div class="pm">' +
                        '   <h2><span>NO.</span>' + (parseInt(key) + 1) + '</h2>' +
                        '    <h1>' + data1[0][key].tyear + '</h1>' + '</div>' +
                        '       <div class="art-img">' +
                        '          <a href="/common/content/' + data1[0][key].tname + '">' +
                        '<img class="mr-3 scrollLoading" alt="" src="/images/common/' + data1[0][key].imgurl + '"></a>' +
                        '         </div>' +
                        '             <div class="media-body art-content">' +
                        '               <h5><a class="m_title" href="javascript:;">' + data1[0][key].tname + '</a></h5>' +
                        '                    <span>简介:</span>' +
                        '                    <p>' + data1[0][key].about +
                        '                    </p>' +
                        '                    <span class="m_xq"><a href="/common/content/' + data1[0][key].tname + '">[详情]</a></span>' +
                        '                    <span class="m_pj"></span>' +
                        '                </div>' +
                        '            </li>'
                    $(".one").append(html);
                }
            }
            if (data2) {
                console.log(data2);
                for (let key in data2[0]) {
                    html = '<li class="media wow bounceInLeft">' +
                        '  <div class="pm">' +
                        '   <h2><span>NO.</span>' + (parseInt(key) + 1) + '</h2>' +
                        '    <h1>' + data2[0][key].tyear + '</h1>' + '</div>' +
                        '       <div class="art-img">' +
                        '          <a href="/common/content/' + data2[0][key].tname + '">' +
                        '<img class="mr-3 scrollLoading" alt="" src="/images/common/' + data2[0][key].imgurl + '"></a>' +
                        '         </div>' +
                        '             <div class="media-body art-content">' +
                        '               <h5><a class="m_title" href="javascript:;">' + data2[0][key].tname + '</a></h5>' +
                        '                    <span>简介:</span>' +
                        '                    <p>' + data2[0][key].about +
                        '                    </p>' +
                        '                    <span class="m_xq"><a href="/common/content/' + data2[0][key].tname + '">[详情]</a></span>' +
                        '                    <span class="m_pj"></span>' +
                        '                </div>' +
                        '            </li>';
                    $(".two").append(html);
                }
            }
            if (data3) {
                console.log(data3);
                var remUl = $(".tj");
                for (let key in data3[0]) {
                    html = '<li>' +
                        '<a href="/common/content/' + data3[0][key].tname + '">' +
                        '<img class="scrollLoading" alt="" src="/images/common/' + data3[0][key].imgurl + '"></a>' +
                        '     <span>' + data3[0][key].tname + '</span>' +
                        '</li>';
                    remUl.append(html);
                }
            }
        }, function () {
            layer.alert("数据请求失败", {icon: 4});
        }
    );
    //动态创建的元素鼠标经过变透明
    $(".ph_list").on('mouseenter mouseleave', '.art-img', function () {
        $(this).siblings(".pm").toggleClass("pm_current")
    });

    //资讯tab栏
    var html = '';
    $(".tab_title").each(function (i) {
        const $ul = $("<ul class='list'></ul>");
        $(".wrapLi").eq(i).append($ul);
    });
    $.ajax({
        async: true,
        cache: false,
        type: "POST",
        url: "/common/queryYsTab",
        dataType: "json",
        success: function (data4) {
            console.log(data4);
            $(".tab_title").mouseenter(function () {
                $(this).addClass("on").siblings().removeClass("on");
                const index = $(this).index();
                $(".wrapLi").eq(index).stop().slideDown(500).siblings().stop().slideUp(500);
            });
            $(".wrapLi").each(function (i) {
                for (let k in data4) {
                    if (data4[k].type == i) {
                        html = "<li><p><a href='javascript:void(0)'>" + data4[k].title + "</a></p><span>"
                            + data4[k].created + "</span></li>";
                        $(".wrapLi .list").eq(i).append(html);
                    }
                }
            });

        }, error: function () {
            layer.alert("数据请求失败", {icon: 4});
        }
    });

});
