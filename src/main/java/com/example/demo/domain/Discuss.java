package com.example.demo.domain;

import lombok.Data;

@Data
public class Discuss {
    private Integer id;
    private Integer dis_id;
    private String dis_name;
    private String reply_name;
    private String content;
    private String createTime;
    private String imgUrl;
}
