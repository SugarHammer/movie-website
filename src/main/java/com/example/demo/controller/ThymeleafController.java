package com.example.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
public class ThymeleafController {


    @RequestMapping("/")//请求地址映射
    public String tologin1() {

        return "login/login";
    }
    //跳转到登录界面
    @RequestMapping("/tologin")//请求地址映射
    public String tologin() {

        return "login/login";
    }

    //退出登录
    @RequestMapping("/loginOut")
    public String userLogOut(HttpServletRequest request) {
        request.getSession().invalidate();
        return "login/login";
    }

    //注销登录
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        System.out.println("logout");
        //session失效
        session.removeAttribute("userId");
        session.removeAttribute("userName");
        session.removeAttribute("userImg");
        session.removeAttribute("userAge");
        session.removeAttribute("userSex");
        session.removeAttribute("userPassword");
        session.removeAttribute("userAuthority");
        session.removeAttribute("userProvince");
        return "detail/common/index";
    }

    @RequestMapping("/common/about")
    public String showJs() {
        return "detail/common/message ";
    }

    //跳转到普通用户主页界面
    @RequestMapping("/common/index")//请求地址映射
    public String toCommonIndex() {
        return "detail/common/index";
    }

    //跳转到普通用户影视排名界面
    @RequestMapping("/common/queryPh")//请求地址映射
    public String toPh() {
        return "detail/common/ranking";
    }

    //跳转到普通用户搜索界面
    @RequestMapping("/common/search")//请求地址映射
    public String toSearch() {
        return "detail/common/search";
    }


    //跳转到普通用户搜索界面
    @RequestMapping("/common/updateMes")//请求地址映射
    public String toUpMes() {
        return "detail/common/updateMes";
    }


    //跳转到主页界面
    @RequestMapping("/admin/index")//请求地址映射
    public String toAdminIndex() {
        return "detail/admin/index";
    }


    //跳转到显示用户信息界面
    @RequestMapping("/admin/toUserManage")
    public String toUserManage() {
        return "detail/admin/userManage";
    }

    //跳转到资源管理界面
    @RequestMapping("/admin/menuManage")
    public String toResManage() {
        return "detail/admin/menuManage";
    }

    //跳转到资源管理界面
    @RequestMapping("/admin/FilmTevManage")
    public String toTevManage() {
        return "detail/admin/filmTelevision";
    }

    //跳转到影评管理界面
    @RequestMapping("/admin/FilmReManage")
    public String toReManage() {
        return "detail/admin/filmreviews";
    }

    //跳转到用户信息界面
    @RequestMapping("/admin/showMyUser")
    public String showMyUser() {
        return "detail/admin/myUser";
    }

    //展示可视化界面
    @RequestMapping("/admin/showVisual")
    public String show2() {
        return "detail/admin/showVisual";
    }


    //展示可视化界面
    @RequestMapping("/admin/upPassword")
    public String upPassword() {
        return "detail/admin/upPassword";

    }

    //展示大白界面
    @RequestMapping("/admin/dabai")
    public String showdabai() {
        return "detail/admin/dabai";
    }


}
