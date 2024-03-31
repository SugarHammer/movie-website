package com.example.demo.controller;


import com.example.demo.domain.FilmReviews;
import com.example.demo.domain.IndexMenu;
import com.example.demo.domain.Television;
import com.example.demo.service.BgcService;

import com.github.pagehelper.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class BgcController {

    @Autowired
    private BgcService bgcService;

    @RequestMapping(value = "/insertMenu", method = RequestMethod.POST)
    public int insertMenu(@RequestBody IndexMenu indexMenu) {
        int menu = bgcService.insertMenu(indexMenu);
        System.out.println(menu);
        return menu;
    }

    @RequestMapping("/findMenuById")
    @ResponseBody
    public IndexMenu queryMenu(@RequestParam(value = "id") Integer id) {
        IndexMenu indexMenus = bgcService.queryMenu(id);
        System.out.println(indexMenus);
        return indexMenus;
    }

    //用户表
    @RequestMapping(value = "/showMenuTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getTable(@RequestParam(value = "limit") Integer limit,
                                        @RequestParam(value = "offset") Integer offset) {

        return bgcService.PageShow(limit, offset);
    }


    @RequestMapping("/queryPage")
    public Map<String, Object> querystudentbypage(@RequestBody Map<String, String> maps) {
        int pageNum = Integer.parseInt(maps.get("pageNum"));
        int pageSize = Integer.parseInt(maps.get("pageSize"));
        Page<Television> page = bgcService.selectStudents(pageNum, pageSize);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", page);
        map.put("number", page.getTotal());
        return map;
    }

    @RequestMapping(value = "/updateMenu", method = RequestMethod.POST)
    @ResponseBody
    public int updateUser(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);
        return bgcService.updateMenu(map);
    }


    @RequestMapping(value = "/deleteMenu", method = RequestMethod.POST)
    @ResponseBody
    public int deleteMenu(@RequestParam(value = "tid") int id) {
        return bgcService.deleteMenu(id);
    }


    @RequestMapping(value = "/insertFilm", method = RequestMethod.POST)
    public int insertMenu(@RequestBody Television television) {
        int tev = bgcService.insertFilm(television);
        System.out.println(tev);
        return tev;
    }

    @RequestMapping("/findFilmById")
    @ResponseBody
    public Television queryFilm(@RequestParam(value = "tid") Integer tid) {
        Television television = bgcService.queryFilm(tid);
        System.out.println(television);
        return television;
    }

    //用户表
    @RequestMapping(value = "/showFilmTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getsTable(@RequestParam(value = "limit") Integer limit,
                                         @RequestParam(value = "offset") Integer offset) {

        return bgcService.PagesShow(limit, offset);
    }

    @RequestMapping(value = "/updateFilm", method = RequestMethod.POST)
    @ResponseBody
    public int updateFilm(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);
        return bgcService.updateFilm(map);
    }


    @RequestMapping(value = "/deleteFilm", method = RequestMethod.POST)
    @ResponseBody
    public int deleteFilm(@RequestParam(value = "tid") Integer id) {
        return bgcService.deleteFilm(id);
    }


    @RequestMapping(value = "/updateRe", method = RequestMethod.POST)
    @ResponseBody
    public int updateRe(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);
        return bgcService.updateRe(map);
    }


    @RequestMapping("/findReById")
    @ResponseBody
    public FilmReviews queryReId(@RequestParam(value = "id") Integer id) {
        FilmReviews filmReviews = bgcService.getRe(id);
        System.out.println(filmReviews);
        return filmReviews;
    }


    @RequestMapping(value = "/showReTable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getReTable(@RequestParam(value = "limit") Integer limit,
                                          @RequestParam(value = "offset") Integer offset) {

        return bgcService.PageReShow(limit, offset);
    }


    @RequestMapping(value = "/deleteRe", method = RequestMethod.POST)
    @ResponseBody
    public int deleteRe(@RequestParam(value = "id") Integer id) {
        return bgcService.deleteRe(id);
    }

}
