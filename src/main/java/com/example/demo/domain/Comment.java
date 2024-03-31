package com.example.demo.domain;

import lombok.Data;

import java.util.Date;


@Data
public class Comment {
    private Integer id;
    private String username;
    private String com_content;
    private String created;
    private String ImgUrl;
}
