package com.hong.scms.admin.productcontents.content.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hong.scms.admin.common.model.BaseResponse;
import com.hong.scms.admin.productcontents.content.service.ContentService;

@RestController
@RequestMapping("/product-content/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("")
    public BaseResponse getContentList() {
        return new BaseResponse(contentService.getContentList());
    }

}
