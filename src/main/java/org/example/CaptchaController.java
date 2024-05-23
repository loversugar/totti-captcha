package org.example;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import cloud.tianai.captcha.common.constant.CaptchaTypeConstant;
import cloud.tianai.captcha.common.response.ApiResponse;
import cloud.tianai.captcha.spring.application.ImageCaptchaApplication;
import cloud.tianai.captcha.spring.request.CaptchaRequest;
import cloud.tianai.captcha.spring.vo.CaptchaResponse;
import cloud.tianai.captcha.spring.vo.ImageCaptchaVO;

@Controller
public class CaptchaController {
    private final ImageCaptchaApplication imageCaptchaApplication;

    public CaptchaController(ImageCaptchaApplication imageCaptchaApplication) {
        this.imageCaptchaApplication = imageCaptchaApplication;
    }

    @RequestMapping("/get")
    @CrossOrigin
    public ResponseEntity<CaptchaResponse<ImageCaptchaVO>> getCaptcha(HttpServletResponse response) {
        CaptchaResponse<ImageCaptchaVO> resp = imageCaptchaApplication.generateCaptcha(CaptchaTypeConstant.SLIDER);

        return ResponseEntity.ok(resp);

    }

    @PostMapping("/check")
    @CrossOrigin
    public ResponseEntity check(@RequestBody CaptchaRequest<Map> request) {
        ApiResponse matching = imageCaptchaApplication.matching(request.getId(), request.getCaptchaTrack());
        // boolean match = imageCaptchaApplication.matching(request.getId(), request.getCaptchaTrack());
        if (matching.getCode() == 200) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

}
