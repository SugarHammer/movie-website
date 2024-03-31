package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.example.demo.domain.*;
import com.example.demo.service.ResourceService;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/common")
public class ResourceController {
    @Autowired
    private ResourceService resourceService;


    @RequestMapping("/queryMenu")
    @ResponseBody
    public List<IndexMenu> queryMenu() {
        List<IndexMenu> menu = resourceService.queryMenu();
        System.out.println(menu);
        return menu;
    }

    @RequestMapping("/queryImg")
    @ResponseBody
    public List<Carousel> queryLunBoImg() {
        List<Carousel> img = resourceService.queryLunBoImg();
        System.out.println(img);
        return img;
    }

    @RequestMapping("/queryJs/{type}")
    @ResponseBody
    public Introduce queryCont(@PathVariable(value = "type") String type) {
        Introduce introduces = resourceService.queryCont(type);
        System.out.println(introduces);
        return introduces;
    }

    @RequestMapping(value = "/insertPl", method = RequestMethod.POST)
    public int insertCom(@RequestBody Comment comment) {
        int com = resourceService.insertCom(comment);
        System.out.println(com);
        return com;
    }

    @RequestMapping("/queryCom")
    @ResponseBody
    public List<Comment> queryCom() {
        List<Comment> com = resourceService.queryCom();
        System.out.println(com);
        return com;
    }

    @RequestMapping("/queryComNum")
    @ResponseBody
    public Map<String, Integer> queryComNum() {
        int num = resourceService.queryComNum();
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("comNum", num);
        return map;
    }

    @RequestMapping("/queryFilm/{classify}")
    @ResponseBody
    public List<Television> queryFilm(@PathVariable(value = "classify") String classify) {
        List<Television> televisions = resourceService.queryFilm(classify);
        System.out.println(televisions);
        return televisions;
    }

    @RequestMapping("/queryYsTab")
    @ResponseBody
    public List<TabMenu> queryTab() {
        List<TabMenu> tabMenus = resourceService.queryTab();
        System.out.println(tabMenus);
        return tabMenus;
    }

    @RequestMapping("/queryRe")
    @ResponseBody
    public List<FilmReviews> queryRe(@RequestParam(value = "filmName") String filmName) {
        List<FilmReviews> filmReviews = resourceService.queryRe(filmName);
        System.out.println(filmReviews);
        return filmReviews;
    }

    @RequestMapping(value = "/insertRe", method = RequestMethod.POST)
    public int insertCom(@RequestBody FilmReviews filmReviews) {
        int re = resourceService.insertRe(filmReviews);
        System.out.println(re);
        return re;
    }

    @RequestMapping("/queryReNum")
    @ResponseBody
    public Map<String, Integer> queryReNum(@RequestParam(value = "filmName") String filmName) {
        int num = resourceService.queryReNum(filmName);
        Map<String, Integer> map = new HashMap<String, Integer>();
        System.out.println(num);
        map.put("ReNum", num);
        return map;
    }

    @RequestMapping("/updateLikes")
    @ResponseBody
    public int updateFilmLikes(@RequestParam(value = "id") Integer id,
                               @RequestParam(value = "likes") Integer likes) {
        int dz = resourceService.updateFilmLikes(id, likes);
        System.out.println(dz);
        return dz;
    }

    @RequestMapping(value = "/insertLikes", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public int insertCom(@RequestBody Likes likes) {
        int like = resourceService.insertLikes(likes);
        return like;
    }

    @RequestMapping("/searchFilm/{tname}")
    @ResponseBody
    public List<Television> searchFilm(@PathVariable(value = "tname") String tname) {
        List<Television> televisions = resourceService.searchFilm(tname);
        System.out.println(televisions);
        return televisions;
    }

    @RequestMapping("/searchPh")
    @ResponseBody
    public List<Television> searchPh() {
        List<Television> televisions = resourceService.searchPh();
        System.out.println(televisions);
        return televisions;
    }

    @RequestMapping(value = "/insertDis", method = RequestMethod.POST)
    public int insertCom(@RequestBody Discuss discuss) {
        int dis = resourceService.insertDis(discuss);
        System.out.println(dis);
        return dis;
    }


    @RequestMapping("/queryDis/{id}")
    @ResponseBody
    public List<Discuss> searchPh(@PathVariable(value = "id") Integer id) {
        List<Discuss> discusses = resourceService.queryDis(id);
        System.out.println(discusses);
        return discusses;
    }

    //查询id
    @RequestMapping("/getMaxId")
    @ResponseBody
    public int getMaxId(){
        return resourceService.getMaxId();
    }


    //上传头像后更新评论区的头像
    @RequestMapping(value="/updateFImg")
    @ResponseBody
    public int updateImg(@RequestParam(value = "username") String username,
                         @RequestParam(value = "imgUrl") String imgUrl){
        return resourceService.updateImg(username,imgUrl);
    }
}
