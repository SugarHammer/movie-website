package com.example.demo.controller;

import com.example.demo.domain.Television;
import com.example.demo.service.BgcService;
import com.example.demo.service.ResourceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class ContentController {
    @Autowired
    private ResourceService resourceService;

    @Autowired
    private BgcService bgcService;

    @RequestMapping(value = "/common/content/{tname}", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ModelAndView queryCon(@PathVariable("tname") String tname) {
        List<Television> televisions = resourceService.queryCon(tname);
        System.out.println(televisions);
        String viewName = "detail/common/content";//跳转页面
        ModelAndView modelAndView = new ModelAndView(viewName);
        modelAndView.addObject("list", televisions);
        return modelAndView;
    }


}
