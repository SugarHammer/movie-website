package com.example.demo.Dao;


import com.example.demo.domain.RegisterNum;
import com.example.demo.domain.Users;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
@Mapper
public interface UserMapper {
    /*
     * 查询所有用户
     */
    @Select("select * from users order by id")
    List<Users> userList();

    /*
     * 查询注册人数
     */
    @Select("select * from register_user")
    List<RegisterNum> regList();

    //查询年龄
    @Select("select province as prov,\n" +
            " sum(case when age <=20 then 1 else 0 end) as age_one,\n" +
            " sum(case when age between 21 and 40 then 1 else 0 end) as age_two,\n" +
            " sum(case when age between 41 and 60 then 1 else 0 end) as age_three,\n" +
            " sum(case when age >=61 then 1 else 0 end) as age_four \n" +
            " from users\n" +
            "  s \n" +
            " group by province")
    List<Users> queryAgeResult();

    //查询各身份人数
    @Select("select province,count(*) num from users  group by province")
    List<Users> queryProvNum();

    //查找女生人数
    @Select("select count(*) from Users u where u.sex='女'")
    int findFemaleNum();

    //查找男生人数
    @Select("select count(*) from Users u where u.sex='男'")
    int findMaleNum();

    /*
     * 增加保存用户
     */
    @Insert("insert into users(id, username,password,age,sex,authority) values(#{id},#{username},#{password},#{age},#{sex},#{authority})")
    public int insertUser(Users users);

    /*
     * 根据id删除用户
     */
    @Delete("delete from users where id=#{id}")
    int delete(int id);

    /*
     * 根据id查找用户
     */
    @Select("select * from users where id = #{id}")
    public Users findUserById(int id);

    //查询用户权限
    @Select("select authority from users where username = #{username}")
    String findUserQx(@Param("username") String username);

    //查询用户是否存在
    @Select("select * from users where username = #{username}")
    Users findUserByUsername(@Param("username") String username);

    /*int
     * 更改用户信息
     */
    @Update("update users set id=#{id},username=#{username},sex=#{sex},age=#{age},authority=#{authority} where id=#{oldid}")
    public int updateUser(HashMap<String, Object> map);

    //更改密码
    @Update("update users set password=#{password} where username=#{username}")
    int updatePw(@Param("username") String username, @Param("password") String password);

    @Insert("insert into users(id, username,password,age,sex,authority,province,ImgUrl) values(#{id},#{username},#{password},#{age},#{sex},#{authority},#{province},#{imgUrl})")
    int addUser(@Param("id") int id,
                @Param("username") String username,
                @Param("password") String password,
                @Param("age") int age,
                @Param("sex") String sex,
                @Param("authority") String authority,
                @Param("province") String province,
                @Param("imgUrl") String imgUrl);

    @Select("select * from users where username=#{username} and password=#{password}")
    Users userLogin(@Param("username") String username, @Param("password") String password);


    @Update("update users set ImgUrl=#{ImgUrl} where username=#{username}")
    public int updateImg(@Param("username") String username, @Param("ImgUrl") String ImgUrl);

    @Update("update users set username=#{username},password=#{password},sex=#{sex},age=#{age},province=#{province} where username=#{username}")
    public int updateUserMes(HashMap<String, Object> map);

    @Select("select ImgUrl from users where username=#{username}")
    public Users findImg(@Param("username") String username);
}
