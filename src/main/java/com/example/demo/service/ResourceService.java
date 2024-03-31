package com.example.demo.service;


import com.example.demo.Dao.DiscussMapper;
import com.example.demo.Dao.ResourceMapper;
import com.example.demo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class ResourceService {
    @Autowired
    @Resource
    private ResourceMapper resourceMapper; //注入UserMapper

    @Autowired
    @Resource
    private DiscussMapper discussMapper; //注入UserMapper

    @Autowired
    private RedisTemplate redisTemplate;


    public List<IndexMenu> queryMenu() {
        return resourceMapper.queryMenu();
    }

    public List<Carousel> queryLunBoImg() {
        return resourceMapper.queryLunBoImg();
    }

    public Introduce queryCont(String type) {
        Introduce introduce = resourceMapper.queryCont(type);
        if (introduce != null) {
            redisTemplate.opsForValue().set("introduce_" + type, introduce);
        }
        return introduce;
    }

    public int insertCom(Comment comment) {
        return resourceMapper.insertCom(comment);
    }

    public List<Comment> queryCom() {
        return resourceMapper.queryCom();
    }

    public int queryComNum() {
        return resourceMapper.queryComNum();
    }

    public List<TabMenu> queryTab() {
        List<TabMenu> tabMenus = resourceMapper.queryTab();
        if (tabMenus != null) {
            redisTemplate.opsForValue().set("TabMenus", tabMenus);
        }
        return tabMenus;
    }

    public List<Television> searchFilm(String tname) {
        List<Television> televisions = resourceMapper.searchFilm(tname);
        return televisions;
    }

    public List<Television> queryFilm(String classify) {
        Television t = new Television();
        List<Television> televisions = resourceMapper.queryFilm(classify);
        if (televisions != null) {
            redisTemplate.opsForValue().set("Television_" + classify, televisions);
        }
        return televisions;
    }

    public List<Television> queryCon(String tname) {
        List<Television> televisions = resourceMapper.queryCon(tname);
        if (televisions != null) {
            //保存在redis
            redisTemplate.opsForValue().set("Television_" + tname, televisions);
        }
        return televisions;
    }

    public List<FilmReviews> queryRe(String filmName) {
        List<FilmReviews> filmReviews = resourceMapper.queryRe(filmName);
        if (filmReviews != null) {
            //保存在redis
            redisTemplate.opsForValue().set("filmReviews_" + filmName, filmReviews);
        }
        return filmReviews;
    }

    public int insertRe(FilmReviews filmReviews) {
        return resourceMapper.insertRe(filmReviews);
    }

    public int queryReNum(String filmName) {
        return resourceMapper.queryReNum(filmName);
    }

    public int updateFilmLikes(Integer id, Integer likes) {
        return resourceMapper.updateFilmLikes(id, likes);
    }

    public int insertLikes(Likes likes) {
        return resourceMapper.insertLikes(likes);
    }

    public List<Television> searchPh() {
        return resourceMapper.searchPh();
    }

    public int insertDis(Discuss discuss) {
        return discussMapper.insertDis(discuss);
    }

    public List<Discuss> queryDis(Integer id) {
        return discussMapper.queryDis(id);
    }

    public  int getMaxId(){
        return discussMapper.getMaxId();
    }

    public int updateImg(String username,String imgUrl){ return resourceMapper.updateImg(username,imgUrl);}
}
