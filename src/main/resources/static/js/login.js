$(function () {
    var yzPw = /^[a-zA-Z0-9]{4,6}$/;
    var yzUn = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,6}$/;
    // 错误信息提示
    $("#username,#password").blur(function () {
        $("#tip2").show();
        login();
    });
    $("#username,#password").focus(function () {
        $("#tip2").hide();
    });
    $("#uname,#pwd,#repeat_pwd").blur(function () {
        $("#tip1").show();
        register();
    });
    $("#uname,#pwd,#repeat_pwd").focus(function () {
        $("#tip1").hide();
    });
    $("#signUp").click(function () {
        $("#container").addClass("right-panel-active");
        $("#tip2").hide();
        $(".sign-in-container #username").val("");
        $(".sign-in-container #password").val("");
    });
    $("#signIn").click(function () {
        $("#container").removeClass("right-panel-active");
        $("#tip1").hide();
        $(".sign-up-container #uname").val("");
        $(".sign-up-container #pwd").val("");
        $(".sign-up-container #repeat_pwd").val("");
    });
    //登录ajax
    $("#login_sub").click(function () {
        login_ajax();
    });
    //注册ajax
    $("#reg_sub").click(function () {
        register_ajax();
    });

    function login_ajax() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (username == "" || password == "") {
            $("#tip2").show();
            $("#tip2").html("用户名或者密码为空！");
            return false;
        } else if (!yzUn.test(username)) {
            $("#tip2").show();
            $("#tip2").html("请输入3-6位含有中文字母数字的用户名！");
            return false;
        } else if (!yzPw.test(password)) {
            $("#tip2").show();
            $("#tip2").html("请输入4-6位含有字母数字的密码！");
            return false;
        }
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            dataType: "json",
            data: {
                "username": username,
                "password": password,
            },
            beforeSend: function () {
                $("#tip2").html("登录中，请稍候");
            },
            success: function (result1) {
                console.log(result1);
                if ("superAdmin" === result1.flag) {
                    window.location.href = "/admin/index";
                    console.log("超级管理员登录成功");
                } else if ("common" === result1.flag || "admin" === result1.flag) {
                    window.location.href = "/common/index";
                    console.log("成功");
                } else if ("noPwd" === result1.flag) {
                    $("#tip2").html("密码错误!");
                } else if ("false" === result1.flag) {
                    $("#tip2").html("用户不存在!");
                }
            },
            async: true,
            error: function () {
                console.log("请求失败")
                window.location.href = "/tologin";
            }
        })
    }

    function register_ajax() {
        let uname = $("#uname").val().trim();
        let pwd = $("#pwd").val().trim();
        let repwd = $("#repeat_pwd").val().trim();
        let age = $("#age").val().trim();
        let sex = $('input[name="sex"]:checked').val();
        let id = Math.ceil(Math.random() * 300);
        let pro = $("#distpicker select option:checked").text();
        console.log(pro);
        let authority = "普通用户";
        if (uname == "" || pwd == "" || repwd == "" || age == "") {
            $("#tip1").show();
            $("#tip1").html("用户信息填写不完全");
            return false;
        } else if (!yzPw.test(pwd)) {
            $("#tip1").show();
            $("#tip1").html("请输入4-6位含有字母数字的密码！");
            return false;
        } else if (pwd !== repwd) {
            $("#tip1").show();
            $("#tip1").html("两次密码不一致");
            return false;
        } else if (!yzUn.test(uname)) {
            $("#tip1").show();
            $("#tip1").html("请输入3-6位含有中文字母数字的用户名！");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "/admin/register",
            dataType: "json",
            data: {
                id: id,
                username: uname,
                password: pwd,
                age: age,
                sex: sex,
                authority: authority,
                province: pro,
                imgUrl: "/images/logins.png"
            },
            success: function (result) {
                console.log(result);
                if ("true" == result.userExist) {
                    $("#tip1").html("注册成功,2s返回登录!");
                    setTimeout(function () {
                        location.href = "/tologin";
                    }, 2000);
                    // console.log("成功");
                } else if ("false" == result.userExist) {
                    $("#tip1").html("用户已存在!");
                } else {
                    $("#tip1").html("注册失败!");
                }
            },
            async: true,
            error: function () {
                console.log("请求失败")
                location.href = "/tologin";
            }
        });
    }

    function register() {
        let uname = $("#uname").val().trim();
        let pwd = $("#pwd").val().trim();
        let repwd = $("#repeat_pwd").val().trim();
        if (uname.length == 0 || pwd.length == 0) {
            $("#tip1").html("用户名或密码不能为空!");
            return false;
        } else if (repwd.length == 0) {
            $("#tip1").html("请再次输入密码!");
            return false;
        } else if (repwd !== pwd) {
            $("#tip1").html("两次密码不一致!");
            return false;
        } else {
            $("#tip1").html("");
        }
    }

    function login() {
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();
        if (username.length == 0 || password.length == 0) {
            $("#tip2").html("用户名或密码不能为空!");
            return false;
        } else {
            $("#tip2").html("");
        }
    }

})
