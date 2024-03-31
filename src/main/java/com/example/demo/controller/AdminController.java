package com.example.demo.controller;


import com.example.demo.domain.RegisterNum;
import com.example.demo.domain.Users;
import com.example.demo.service.ResourceService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService; //注入UserService

    @Autowired
    private ResourceService resourceService;


    //展示折线图
    @RequestMapping("/showBar")
    @ResponseBody
    public List<RegisterNum> regmen() {
        List<RegisterNum> register = userService.regList();
        return register;
    }

    //查询年龄
    @RequestMapping("/showAgeResult")
    @ResponseBody
    public List<Users> queryAgeResult() {
        List<Users> users = userService.queryAgeResult();
        System.out.println(users);
        return users;
    }


    @RequestMapping("/showProvNum")
    @ResponseBody
    public List<Users> queryProvNum() {
        List<Users> users = userService.queryProvNum();
        System.out.println(users);
        return users;
    }


    //用户人数
    @RequestMapping("/showData")
    @ResponseBody
    public Map<String, Integer> countUser() {
        int user1 = userService.countUser1();
        int user2 = userService.countUser2();
        int num = resourceService.queryComNum();
        Map<String, Integer> count = new HashMap<String, Integer>();
        count.put("count1", user1);
        count.put("count2", user2);
        count.put("comNum", num);
        return count;
    }


    //用户表
    @RequestMapping(value = "/showTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getTable(@RequestParam(value = "limit") Integer limit,
                                        @RequestParam(value = "offset") Integer offset) {

        return userService.PageShow(limit, offset);
    }


    /*
     * 根据id删除用户
     * */
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    @ResponseBody
    public int deleteStudent(@RequestParam(value = "id") int id) {
        return userService.deleteUser(id);
    }

    //增加用户
    @RequestMapping(value = "/insertUser", method = RequestMethod.POST)
    public int insertUser(@RequestBody Users users) {
        System.out.println(users);
        return userService.insertUser(users);
    }


    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    @ResponseBody
    public int updateUser(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);
        return userService.updateUser(map);
    }

    @RequestMapping("/updateUserPw")
    @ResponseBody
    public Map<String, String> updatePassword(@RequestParam("username") String username,
                                              @RequestParam("password") String password,
                                              @RequestParam("repassword") String repassword) {
        Map<String, String> result = new HashMap<String, String>();
        if (!password.equals(repassword)) {
            result.put("flag", "0");
        } else {
            int users = userService.updatePw(username, password);
            System.out.println(users);
            if (users == 1) {
                result.put("flag", "1");
            } else {
                result.put("flag", "2");
            }
        }
        return result;
    }




    @RequestMapping(value = "/findUserById", method = RequestMethod.POST)
    @ResponseBody
    public Users findUserById(@RequestParam(value = "id") int id) {
        return userService.findUserById(id);
    }


    //登录逻辑实现
    @RequestMapping("/login")
    @ResponseBody
    public Map<String, String> userLogin(@RequestParam("username") String username,
                                         @RequestParam("password") String password,
                                         HttpServletRequest request) {
        Users users = userService.userLogin(username, password);
        Users usr = userService.findUserByUsername(username);
        System.out.println(users);
        Map<String, String> result = new HashMap<String, String>();
        if (usr != null) {
            if (users != null) {
                String qx = userService.findUserQx(username);
                request.getSession().setAttribute("session_user", users);     //将用户信息放入session
                HttpSession session = request.getSession();//获取session并将userName存入session对象
                session.setAttribute("userId", users.getId());
                session.setAttribute("userName", users.getUsername());
                session.setAttribute("userImg", users.getImgUrl());
                session.setAttribute("userAge", users.getAge());
                session.setAttribute("userSex", users.getSex());
                session.setAttribute("userPassword", users.getPassword());
                session.setAttribute("userAuthority", users.getAuthority());
                session.setAttribute("userProvince", users.getProvince());
                if (qx.equals("管理员")) {
                    session.setAttribute("adminId", users.getId());
                    session.setAttribute("adminName", users.getUsername());
                    result.put("flag", "admin");
                } else if (qx.equals("普通用户")) {
                    result.put("flag", "common");
                } else if (qx.equals("超级管理员")) {
                    session.setAttribute("superAdminId", users.getId());
                    result.put("flag", "superAdmin");
                }
            } else {
                result.put("flag", "noPwd");
            }
        } else {
            result.put("flag", "false");
        }
        return result;
    }

    //注册逻辑实现
    @RequestMapping("/register")
    @ResponseBody
    public Map<String, String> userRegister(@RequestParam("id") int id,
                                            @RequestParam("username") String username,
                                            @RequestParam("password") String password,
                                            @RequestParam("age") int age,
                                            @RequestParam("sex") String sex,
                                            @RequestParam("authority") String authority,
                                            @RequestParam("province") String province,
                                            @RequestParam("imgUrl") String imgUrl) {
        Users users = userService.findUserByUsername(username);
        System.out.println(users);//查询到的对象
        Map<String, String> result = new HashMap<String, String>();
        //如果不存在就添加，实现注册
        if (users == null) {
            userService.addUser(id, username, password, age, sex, authority, province, imgUrl);
            result.put("userExist", "true");
        } else {
            result.put("userExist", "false");
        }
        System.out.println(result);  //返回json数据内容
        return result;
    }

    @RequestMapping(value = "/updateUserMes", method = RequestMethod.POST)
    public int updateUserMes(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);
        return userService.updateUserMes(map);
    }

    @RequestMapping("/findImg/{username}")
    @ResponseBody
    public Users queryCont(@PathVariable(value = "username") String username,
                           HttpServletRequest request) {
        Users users = userService.findImg(username);
        if (users != null) {
            request.getSession().setAttribute("session_user", users);     //将用户信息放入session
            HttpSession session = request.getSession();
            session.setAttribute("userImg", users.getImgUrl());
        }
        return users;
    }


}