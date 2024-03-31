package com.example.demo.domain;

import lombok.Data;

@Data
public class Likes {
    private Integer id;
    /**
     * 留言id
     */
    private String com_id;
    /**
     * 评论id
     */
    private String rev_id;
    /**
     * 点赞状态
     */
    private String com_state;
    /**
     * 点赞人
     */
    private String like_name;

}
