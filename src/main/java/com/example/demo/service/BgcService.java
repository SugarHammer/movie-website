package com.example.demo.service;


import com.example.demo.Dao.AdminMapper;
import com.example.demo.Dao.ResourceMapper;
import com.example.demo.domain.FilmReviews;
import com.example.demo.domain.IndexMenu;
import com.example.demo.domain.Television;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BgcService {

    @Autowired
    @Resource
    private AdminMapper adminMapper; //注入UserMapper

    @Autowired
    @Resource
    private ResourceMapper resourceMapper; //注入UserMapper


    @Resource
    private RedisTemplate redisTemplate;


    public int insertMenu(IndexMenu indexMenu) {
        return adminMapper.insertMenu(indexMenu);
    }

    public IndexMenu queryMenu(Integer id) {
        return adminMapper.queryMenu(id);
    }

    public Map<String, Object> PageShow(int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        List<IndexMenu> page = new ArrayList<>();
        //查询导航数量
        List<IndexMenu> all = resourceMapper.queryMenu();
        for (int i = offset; i < offset + limit; i++) {
            if (i < all.size()) {
                page.add(all.get(i));
            }
        }
        map.put("rows", page);
        map.put("total", all.size());
        return map;
    }

    public int updateMenu(HashMap<String, Object> map) {
        System.err.println(map);
        return adminMapper.updateMenu(map);
    }

    public int deleteMenu(Integer id) {
        return adminMapper.deleteMenu(id);
    }

    public int insertFilm(Television television) {
        return adminMapper.insertFilm(television);
    }

    public Television queryFilm(Integer tid) {
        return adminMapper.queryFilm(tid);
    }

    public Map<String, Object> PagesShow(int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        List<Television> page = new ArrayList<>();
        //查询导航数量
        List<Television> all = adminMapper.queryTev();
        for (int i = offset; i < offset + limit; i++) {
            if (i < all.size()) {
                page.add(all.get(i));
            }
        }
        map.put("rows", page);
        map.put("total", all.size());
        return map;
    }

    public int updateFilm(HashMap<String, Object> map) {
        System.err.println(map);
        return adminMapper.updateFilm(map);
    }

    public int deleteFilm(Integer tid) {
        return adminMapper.deleteFilm(tid);
    }


    public int updateRe(HashMap<String, Object> map) {
        System.err.println(map);
        return adminMapper.updateRe(map);
    }

    public List<Television> findAllByPage(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return adminMapper.queryTev();
    }

    public Page<Television> selectStudents(int pageNum, int pageSize) {
        Page<Television> page = PageHelper.startPage(pageNum, pageSize);
        adminMapper.queryTev();
        return page;
    }

    public FilmReviews getRe(Integer id) {
        return resourceMapper.getRe(id);
    }

    public Map<String, Object> PageReShow(int limit, int offset) {
        Map<String, Object> map = new HashMap<>();
        List<FilmReviews> page = new ArrayList<>();
        //查询导航数量
        List<FilmReviews> all = adminMapper.queryRe();
        for (int i = offset; i < offset + limit; i++) {
            if (i < all.size()) {
                page.add(all.get(i));
            }
        }
        map.put("rows", page);
        map.put("total", all.size());
        return map;
    }

    public int deleteRe(Integer id) {
        return adminMapper.deleteRev(id);
    }


}
