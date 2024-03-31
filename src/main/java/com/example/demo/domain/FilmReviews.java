package com.example.demo.domain;

import lombok.Data;

import java.util.Date;

@Data
public class FilmReviews {
    private Integer id;
    private String filmName;
    private String username;
    private String reviewCont;
    private String createTime;
    private Integer likes;
    private String imgUrl;

}
