package com.example.demo.service;


import com.example.demo.Dao.ResourceMapper;
import com.example.demo.Dao.UserMapper;

import com.example.demo.domain.RegisterNum;
import com.example.demo.domain.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/*
use API for redis
 */
@Transactional
@Service
public class UserService {


    @Autowired
    @Resource
    private UserMapper usermapper; //注入UserMapper

    @Autowired
    @Resource
    private ResourceMapper resourceMapper;

    @Autowired
    private RedisTemplate redisTemplate;
    //注册

    public String queryState(String username) {
        return resourceMapper.queryState(username);
    }

    /*
     * 增加保存用户
     */
    public int insertUser(Users users) {
        return usermapper.insertUser(users);
    }

    public int addUser(int id, String username, String password, int age, String sex, String authority, String province, String imgUrl) {
        return usermapper.addUser(id, username, password, age, sex, authority, province, imgUrl);
    }

    public Map<String, Object> PageShow(int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        List<Users> page = new ArrayList<>();
        //查询用户数量
        List<Users> all = usermapper.userList();
        for (int i = offset; i < offset + limit; i++) {
            if (i < all.size()) {
                page.add(all.get(i));
            }
        }
        map.put("rows", page);
        map.put("total", all.size());
        return map;
    }

    /*
     * 查询所有用户
     */
    public List<Users> userList() {
        return usermapper.userList();
    }

    public int countUser1() {
        return usermapper.findMaleNum();
    }

    public int countUser2() {
        return usermapper.findFemaleNum();
    }

    /*
     *查询注册人数
     */
    public List<RegisterNum> regList() {
        return usermapper.regList();
    }

    public List<Users> queryAgeResult() {
        return usermapper.queryAgeResult();
    }

    //查询各省份人数
    public List<Users> queryProvNum() {
        return usermapper.queryProvNum();
    }

    /*
     * 根据id删除用户
     */
    public int deleteUser(int id) {
        int result = usermapper.delete(id);
        if (result == 1) {
            //删除数据库数据后，再进行redis缓存删除
            redisTemplate.delete("users_" + id);
        }
        return result;
    }

    /*
     * 根据id查找用户
     */
    public Users findUserById(int id) {
        //先从redis缓存中查询数据
        Object object = redisTemplate.opsForValue().get("users_" + id);
        if (object != null)
            return (Users) object;
        else {
            //没有再从数据库中查询数据
            Users users = usermapper.findUserById(id);
            if (users != null) {
                //将查询结果保存到redis缓存中，并设置时效一天
                redisTemplate.opsForValue().set("users_" + id, users,
                        1, TimeUnit.DAYS);
                return users;
            } else {
                return null;
            }
        }
    }

    /*
     * 更改用户信息
     */

    public int updateUser(HashMap<String, Object> map) {
        System.err.println(map);
        return usermapper.updateUser(map);
    }

    //更改密码
    public int updatePw(String username, String password) {
        return usermapper.updatePw(username, password);
    }

    public Users userLogin(String username, String password) {
        return usermapper.userLogin(username, password);

    }

    public String findUserQx(String username) {
        return usermapper.findUserQx(username);
    }

    public Users findUserByUsername(String username) {
        return usermapper.findUserByUsername(username);
    }

    public int updateImg(String username, String ImgUrl) {
        return usermapper.updateImg(username, ImgUrl);
    }

    public int updateUserMes(HashMap<String, Object> map) {
        return usermapper.updateUserMes(map);
    }

    public Users findImg(String username) {
        return usermapper.findImg(username);
    }
}
