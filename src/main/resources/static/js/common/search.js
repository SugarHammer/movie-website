$(function () {
    searchPh();
    $(".public a").hover(function () {
        $(this).toggleClass("top_current");
    });
    //页面效果
    $(".nav_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".aui-flexView").toggle(500);
        $(this).toggleClass("icon-x");
    });
    $(".wrap_btn").click(function () {
        $(".site-wrapper").slideToggle();
        $(".aui-flexView").toggle(500);
        $(this).toggleClass("icon-list");
        $(".nav_btn").addClass("icon-list").removeClass("icon-x");
    });
    $(".click_back").click(function () {
        window.location.href = "/common/index";
    });
    $(".search_btn").on("click", function () {
        //清空上一次查询结果
        $(".ph_list").html("");
        let i = 0;
        const tname = $(".aui-search-result-box .tname").val().trim();
        if (tname == "") {
            layer.msg("请输入内容！", {
                icon: 5
            })
            return false;
        }
        console.log(tname);
        $(".aui-scrollView").hide();
        $(".con_area").show();
        $.ajax({
            async: true,
            cache: false,
            type: "POST",
            url: "/common/searchFilm/" + tname,
            dataType: "json",
            success: function (data1) {
                console.log(data1);
                for (let key in data1) {
                    i++;
                    const html = '<li class="media wow bounceInLeft">' +
                        '  <div class="pm">' +
                        '    <h1>' + data1[key].tyear + '</h1>' + '</div>' +
                        '       <div class="art-img">' +
                        '          <a href="/common/content/' + data1[key].tname + '">' +
                        '<img class="mr-3 scrollLoading" alt="" src="/images/common/' + data1[key].imgurl + '"></a>' +
                        '         </div>' +
                        '             <div class="media-body art-content">' +
                        '               <h5><a class="m_title" href="javascript:;">' + data1[key].tname + '</a></h5>' +
                        '                    <span>简介:</span>' +
                        '                    <p>' + data1[key].about +
                        '                    </p>' +
                        '                    <span class="m_xq"><a href="/common/content/' + data1[key].tname + '">[详情]</a></span>' +
                        '                    <span class="m_pj"></span>' +
                        '                </div>' +
                        '         </li>';
                    $(".ph_list").append(html);
                    $(".aui-search-result-box .tname").val("");
                }
                $(".resultSize").html("共查到" + i + "条记录");
            },
            error: function () {
                layer.alert("数据请求失败", {icon: 4});
            }
        });

    })

    function searchPh() {
        $.ajax({
            async: true,
            cache: false,
            type: "POST",
            url: "/common/searchPh",
            dataType: "json",
            success: function (data2) {
                console.log(data2);
                for (let k in data2) {
                    if (k < 10) {
                        const html = '<a href="/common/content/' + data2[k].tname + '" class="aui-flex b-line">' +
                            '                <div class="aui-flex-head red">' + (parseInt(k) + 1) + '</div>' +
                            '               <div class="aui-flex-box">' +
                            '                  <h2>' + data2[k].tname + '<em>观看xxx次</em></h2>' +
                            '                </div>' +
                            '     </a>';
                        $(".aui-search-list").append(html);
                    }
                }
            },
            error: function () {
                layer.alert("数据请求失败", {icon: 4});
            }
        });
    }
});