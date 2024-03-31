package com.example.demo.Dao;

import com.example.demo.domain.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface ResourceMapper {
    //查询导航菜单
    @Select("select * from index_menu")
    List<IndexMenu> queryMenu();

    //查询轮播图片
    @Select("select * from carousel")
    List<Carousel> queryLunBoImg();

    //查询网站介绍内容
    @Select("select * from introduce where type=#{type}")
    public Introduce queryCont(@Param("type") String type);

    //插入留言
    @Insert("insert into comment values(#{id},#{username},#{com_content},#{created},#{ImgUrl})")
    public int insertCom(Comment comment);

    //查询留言内容
    @Select("select * from comment")
    public List<Comment> queryCom();

    //查询留言数量
    @Select("select count(*) from comment")
    public int queryComNum();

    //删除留言
    @Delete("delete from  comment where id=#{id}")
    public int deleteCom(@Param("id") int id);


    //查询影视tabl栏
    @Select("select * from tabmenu")
    public List<TabMenu> queryTab();

    /*
     *   like '%' || 'classify' || '%'不顶用会把全部查询出来
     * */
    //查询影视排行
    @Select("select * from television where classify like CONCAT('%',#{classify},'%') order by Tgrade desc")
    public List<Television> queryFilm(@Param("classify") String classify);


    //查询影视内容
    @Select("select * from television where Tname = #{tname}")
    public List<Television> queryCon(@Param("tname") String tname);

    @Select("select * from television order by Tgrade desc")
    public List<Television> searchPh();

    @Select("select * from television where Tname like CONCAT('%',#{tname},'%') order by Tgrade desc")
    public List<Television> searchFilm(@Param("tname") String tname);

    //查询影视评论
    @Select("select * from filmreviews where filmName=#{filmName}")
    public List<FilmReviews> queryRe(@Param("filmName") String filmName);

    //查询影视评论
    @Select("select * from filmreviews where id=#{id}")
    public FilmReviews getRe(@Param("id") Integer id);

    //插入影视评论
    @Insert("insert into filmreviews(id,username,reviewCont,filmName,createTime,likes,imgUrl) values(#{id},#{username},#{reviewCont},#{filmName},#{createTime},#{likes},#{imgUrl})")
    public int insertRe(FilmReviews filmReviews);

    //查询影视评论数量
    @Select("select count(*) from filmreviews where filmName=#{filmName}")
    public int queryReNum(@Param("filmName") String filmName);

    //更新影视评论点赞数量
    @Update("update filmreviews  set likes=#{likes} where id=#{id}")
    public int updateFilmLikes(@Param("id") Integer id, @Param("likes") Integer likes);


    //点赞表
    @Insert("insert into likes  values(#{id},#{com_id},#{com_state},#{like_name})")
    public int insertLikes(Likes likes);

    @Select("select * from likes where like_name=#{like_name}")
    public String queryState(@Param("like_name") String like_name);

    //上传头像后更新评论区的头像
    @Update("update filmreviews set imgUrl=#{imgUrl} where username=#{username}")
    int updateImg(@Param("username") String username,@Param("imgUrl") String imgUrl);
}
