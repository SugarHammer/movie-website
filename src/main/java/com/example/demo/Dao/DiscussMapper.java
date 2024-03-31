package com.example.demo.Dao;


import com.example.demo.domain.Discuss;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface DiscussMapper {

    @Select("select * from discuss where dis_id=#{id}")
    List<Discuss> queryDis(@Param("id") Integer id);

    @Insert("insert into discuss values(#{id},#{dis_id},#{dis_name},#{reply_name},#{content},#{createTime},#{imgUrl})")
    int insertDis(Discuss discuss);

    @Select("select id from comment order by id desc limit 0,1")
    int getMaxId();

}
