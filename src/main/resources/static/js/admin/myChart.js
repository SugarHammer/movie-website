// 柱状图模块
(function () {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 指定配置和数据
    myChart.showLoading();
    var prov = [];
    var Num = [];
    $.ajax({
        type: "post",
        async: true,
        url: "/admin/showProvNum",
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (datas) {
            console.log(datas);
            if (datas) {
                for (let key in datas) {
                    prov.push(datas[key].province);
                    Num.push(datas[key].num);
                }
            }
            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({
                color: ["#2f89cf"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "0%",
                    top: "10px",
                    right: "0%",
                    bottom: "4%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: prov,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#666",
                                fontSize: "14"
                            }
                        },
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        minInterval: 1,//整数
                        axisLabel: {
                            textStyle: {
                                color: "#666",
                                fontSize: "14"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.5)"
                                // width: 1,
                                // type: "solid"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#666"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "直接访问",
                        type: "bar",
                        barWidth: "35%",
                        data: Num,
                        itemStyle: {
                            barBorderRadius: 5
                        }
                    }
                ]
            })
        },
        error: function () {
            alert("请求数据失败!");
            myChart.hideLoading();
            console.log('error');
        }
    })

    // 把配置给实例对象
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    // $(".bar h2 ").on("click", "a", function () {
    //     option.series[0].data = dataAll[$(this).index()].data;
    //     myChart.setOption(option);
    // });
})();

// 折线图模块制作
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line .chart"));
    // 2.指定配置
    //数据加载完之前先显示一段简单的loading动画
    myChart.showLoading();
    var time = [];    //横坐标数组（实际用来盛放X轴坐标值）
    var reg_num = [];    //纵坐标数组（实际用来盛放Y坐标值）
    var out_num = [];
    var userNum = [];
    var fun1 = $.ajax({
            type: "post",
            async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: "/admin/showBar",    //请求发送到dataActiont处
            data: {},
            dataType: "json",        //返回数据形式为json
        }),
        fun2 = $.ajax({
            type: "post",
            async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url: "/admin/showData",    //请求发送到dataActiont处
            data: {},
            dataType: "json",        //返回数据形式为json
        });
    $.when(fun1, fun2).then(function (result, count) {
        //成功回调，所有请求正确返回时调用
        console.log(result);
        console.log(count);
        //请求成功时执行该函数内容，result即为服务器返回的json对象
        if (result) {
            for (let key in result[0]) {
                time.push(result[0][key].regTime);
                reg_num.push(result[0][key].regNum);
                out_num.push(result[0][key].logout);
            }
            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({
                //加载数据图表
                color: ["#00f2f1", "#ed3f35"],
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    // 如果series 对象有name 值，则 legend可以不用写data
                    // 修改图例组件 文字颜色
                    textStyle: {
                        color: "#898989",
                        fontSize: 14
                    },
                    // 这个10% 必须加引号
                    right: "10%"
                },
                grid: {
                    top: "20%",
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    show: true, // 显示边框
                    borderColor: "#898989", // 边框颜色
                    containLabel: true // 包含刻度文字在内
                },

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: time,
                    nameTextStyle: {
                        fontSize: 14
                    },
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        color: "#898989" // 文本颜色
                    },
                    axisLine: {
                        show: false // 去除轴线
                    }
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false // 去除刻度线
                    },
                    axisLabel: {
                        color: "#898989" // 文本颜色
                    },
                    axisLine: {
                        show: false // 去除轴线
                    },
                    axisLabel: {
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#898989" // 分割线颜色
                        }
                    }
                },
                series: [{
                    name: "用户注册人数",
                    type: "line",
                    // true 可以让我们的折线显示带有弧度
                    smooth: true,
                    data: reg_num
                }, {
                    name: "用户注销人数",
                    type: "line",
                    smooth: true,
                    data: out_num
                }]
            });
        }
        if (count) {
            for (let key in count[0]) {
                console.log(count[0][key]);
                userNum.push(count[0][key]);
            }
            console.log(userNum)
            $(".zrs").html(Number(userNum[0] + userNum[1]).toString());
            $(".nsrs").html(userNum[0].toString());
            $(".nxrs").html(userNum[1].toString());
            $(".ly").html(userNum[2].toString());
        }

    }, function () {
        //失败回调，任意一个请求失败时返回
        alert("请求数据失败!");
        myChart.hideLoading();
        console.log('error');
    })

    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

})();
// 饼形图
(function () {
    // 1. 实例化对象
    const myChart = echarts.init(document.querySelector(".pie .chart"));
    // 2.指定配置
    myChart.showLoading();
    var test = [];
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "/admin/showAgeResult",    //请求发送到dataActiont处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            console.log(data)
            if (data) {
                for (let key in data) {
                    console.log(data[key]);
                    for (let k in data[key]) {
                        console.log(k);
                        if (k == "ageOne") {
                            sum1 = sum1 + data[key][k];
                        } else if (k == "ageTwo") {
                            // console.log(k)
                            sum2 = sum2 + data[key][k];
                        } else if (k == "ageThree") {
                            sum3 = sum3 + data[key][k];
                        } else if (k == "ageFour") {
                            sum4 = sum4 + data[key][k];
                        }
                    }
                }
                console.log(sum1);
                console.log(sum2);
                console.log(sum3);
                console.log(sum4);
                test = [
                    {value: sum1, name: "20岁以下"},
                    {value: sum2, name: "21-40岁"},
                    {value: sum3, name: "40-60岁"},
                    {value: sum4, name: "60岁以上"},
                ];
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({
                    color: ["#066eab", "#0682ab", "#0696ab", "#06a0ab"],
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c}人 ({d}%)"
                    },
                    legend: {
                        // bottom: "0%",
                        // 修改小图标的大小
                        orient: 'vertical',
                        itemGap: 16,
                        left: "left",
                        itemWidth: 14,
                        itemHeight: 14,
                        // 修改图例组件的文字为 14px
                        textStyle: {
                            color: "#666",
                            fontSize: "14"
                        }
                    },
                    series: [
                        {
                            name: "年龄分布",
                            type: "pie",
                            // 这个radius可以修改饼形图的大小
                            // radius 第一个值是内圆的半径 第二个值是外圆的半径
                            radius: ["40%", "60%"],
                            center: ["50%", "45%"],
                            // 图形的文字标签
                            label: {
                                fontSize: 13
                            },
                            avoidLabelOverlap: false,
                            data: test
                        }
                    ]
                })
                ;
            }
        },
        error: function () {
            alert("请求数据失败!");
            myChart.hideLoading();
            console.log('error');
        }

    });
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
