package com.example.demo.Dao;


import com.example.demo.domain.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface AdminMapper {

    @Insert("insert into index_menu values(#{id},#{pname},#{pid},#{url})")
    public int insertMenu(IndexMenu indexMenu);

    @Select("select * from index_menu where id=#{id}")
    public IndexMenu queryMenu(@Param("id") Integer id);

    @Delete("delete from index_menu where id=#{id}")
    public int deleteMenu(@Param("id") Integer id);

    @Update("update index_menu set pname=#{pname},pid=#{pid},url=#{url} where id=#{id}")
    public int updateMenu(HashMap<String, Object> map);


    @Select("select * from television")
    public List<Television> queryTev();

    @Insert("insert into television values(#{Tid},#{Tname},#{Tgrade},#{Tyear},#{imgurl},#{about},#{classify})")
    public int insertFilm(Television television);

    @Select("select * from television where Tid=#{tid}")
    public Television queryFilm(@Param("tid") Integer tid);


    @Delete("delete from television where Tid=#{tid}")
    public int deleteFilm(@Param("tid") Integer tid);

    @Update("update television set Tname=#{tname},Tyear=#{tyear},Tgrade=#{tgrade},about=#{about},imgurl=#{imgurl},classify=#{classify} where Tid=#{tid}")
    public int updateFilm(HashMap<String, Object> map);

    @Select("select * from filmreviews")
    public List<FilmReviews> queryRe();

    @Update("update filmreviews set username=#{username},filmName=#{filmName},reviewCont=#{reviewCont},createTime=#{createTime},likes=#{likes} where id=#{id}")
    public int updateRe(HashMap<String, Object> map);

    //删除评论
    @Delete("delete from  filmreviews where id=#{id}")
    public int deleteRev(@Param("id") int id);


}


