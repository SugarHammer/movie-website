package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.example.demo.service.UserService;
import com.example.demo.until.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;

@Controller
public class UploadAvatarController {

    @Autowired
    private UserService userService;

    @RequestMapping("/imageUpload")
    @ResponseBody
    public Map imageUpload(@RequestParam("fileName") MultipartFile file,
                           @RequestParam("username") String username) {
        System.out.println(file);
        String result_msg = "";//上传结果信息
        Map<String, Object> root = new HashMap<String, Object>();

        if (file.getSize() / 1000 > 200) {
            result_msg = "图片大小不能超过200KB";
        } else {
            //判断上传文件格式
            String fileType = file.getContentType();
            if (fileType.equals("image/jpeg") || fileType.equals("image/png") || fileType.equals("image/jpeg")) {
                // 要上传的目标文件存放的绝对路径
                //用src为保存绝对路径不能改名只能用原名，不用原名会导致ajax上传图片后在前端显示时出现404错误-->原因未知
//                final String localPath = "F:\\springboot\\television\\src\\main\\resources\\static\\images\\avatar\\";
                final String localPath = "E:\\uploadImg\\";
                //上传后保存的文件名(需要防止图片重名导致的文件覆盖)
                //获取文件名
                String fileName = file.getOriginalFilename();
                //获取文件后缀名
                String suffixName = fileName.substring(fileName.lastIndexOf("."));
                //重新生成文件名
                String uid = UUID.randomUUID().toString();

                fileName = uid.replace("-", "") + suffixName;
                if (FileUtils.upload(file, localPath, fileName)) {
                    //文件存放的相对路径(一般存放在数据库用于img标签的src)
                    String relativePath = "/uploadImg/" + fileName;

                    int img = userService.updateImg(username, relativePath);
                    root.put("relativePath", relativePath);//前端根据是否存在该字段来判断上传是否成功
                    result_msg = "图片上传成功";
                } else {
                    result_msg = "图片上传失败";
                }
            } else {
                result_msg = "图片格式不正确";
            }
        }

        root.put("result_msg", result_msg);
//        JSON.toJSONString(root,SerializerFeature.DisableCircularReferenceDetect);
        String root_json = JSON.toJSONString(root);
        System.out.println(root_json);
        return root;
    }
}