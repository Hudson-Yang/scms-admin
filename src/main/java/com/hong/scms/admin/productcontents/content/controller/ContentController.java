package com.hong.scms.admin.productcontents.content.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hong.scms.admin.common.model.BaseResponse;
import com.hong.scms.admin.productcontents.content.model.ContentModel;
import com.hong.scms.admin.productcontents.content.service.ContentService;

@RestController
@RequestMapping("/admin/product-content/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("")
    public BaseResponse getContentList() {
        return new BaseResponse(contentService.getContentList());
    }

    @PostMapping("")
    public BaseResponse createContent(@RequestBody ContentModel contentModel,
            Authentication authentication) {
        String loginId = authentication.getName();

        contentModel.setRegrId(loginId);
        contentService.createContent(contentModel);
        return new BaseResponse();
    }

    @GetMapping("/{prodContsId}")
    public BaseResponse getContent(@PathVariable Integer prodContsId) {
        return new BaseResponse(contentService.getContent(prodContsId));
    }

    @PutMapping("/{prodContsId}")
    public BaseResponse updateContent(@PathVariable Integer prodContsId,
            @RequestBody ContentModel contentModel, Authentication authentication) {
        String loginId = authentication.getName();

        contentModel.setProdContsId(prodContsId);
        contentModel.setMdfrId(loginId);

        contentService.updateContent(contentModel);
        return new BaseResponse();
    }

    @DeleteMapping("/{prodContsId}")
    public BaseResponse deleteContent(@PathVariable Integer prodContsId) {
        contentService.deleteContent(prodContsId);
        return new BaseResponse();
    }

}
