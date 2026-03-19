-- SCMS 초기 스키마
-- MySQL 8 / InnoDB / utf8mb4 기준

-- admin 유저관리 
CREATE TABLE scms_adm_user_m (
    adm_user_id BIGINT AUTO_INCREMENT,
    login_id VARCHAR(50) NOT NULL,
    hash_pw VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role_cd VARCHAR(20) NOT NULL,
    user_stat_cd VARCHAR(20) NOT NULL,
    reg_dt DATETIME NOT NULL,
    mdf_dt DATETIME NULL,
    PRIMARY KEY (adm_user_id),
    UNIQUE KEY uk_scms_adm_user_login_id (login_id),
    KEY idx_scms_adm_user_role (role_cd)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;


-- 국가 메타데이터목록
CREATE TABLE scms_cntr_m (
    cntr_cd VARCHAR(2) NOT NULL,
    cntr_nm VARCHAR(100) NOT NULL,
    reg_dt DATETIME NOT NULL,
    mdf_dt DATETIME NULL,
    PRIMARY KEY (cntr_cd)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 언어 메타데이터목록
CREATE TABLE scms_lang_m (
    lang_cd VARCHAR(10) NOT NULL,
    lang_nm VARCHAR(100) NOT NULL,
    reg_dt DATETIME NOT NULL,
    mdf_dt DATETIME NULL,
    PRIMARY KEY (lang_cd)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 제품 메타데이터목록
CREATE TABLE scms_prod_m (
    prod_id BIGINT AUTO_INCREMENT,
    mkr_nm VARCHAR(100) NOT NULL,
    mdl_cd VARCHAR(50) NOT NULL,
    mdl_nm VARCHAR(100) NOT NULL,
    reg_dt DATETIME NOT NULL,
    mdf_dt DATETIME NULL,
    PRIMARY KEY (prod_id),
    UNIQUE KEY uk_scms_prod_m_mdl_cd (mdl_cd),
    KEY idx_scms_prod_m_mkr_nm (mkr_nm)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 콘텐츠 목록
CREATE TABLE scms_prod_conts_l (
    prod_conts_id BIGINT AUTO_INCREMENT,
    admn_disp_nm VARCHAR(150) NOT NULL,
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 콘텐츠 다국어
CREATE TABLE scms_prod_conts_lang_l (
    prod_conts_id BIGINT NOT NULL,
    lang_cd VARCHAR(10) NOT NULL,
    prod_conts_titl VARCHAR(200),
    prod_conts_desc TEXT,
    dflt_lang_yn CHAR(1),
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_id, lang_cd),
    KEY idx_scms_prod_conts_lang_lang_cd (lang_cd)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 콘텐츠 미디어
CREATE TABLE scms_prod_conts_media_l (
    prod_conts_id BIGINT NOT NULL,
    scrn_disp_ordr INT NOT NULL,
    file_frmt_cd VARCHAR(20),
    media_url_addr VARCHAR(500),
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_id, scrn_disp_ordr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 국가 그룹
CREATE TABLE scms_prod_conts_cntr_grp_l (
    prod_conts_cntr_grp_id BIGINT AUTO_INCREMENT,
    admn_disp_nm VARCHAR(100),
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_cntr_grp_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 국가 그룹 - 국가 매핑
CREATE TABLE scms_prod_conts_cntr_by_grp_l (
    prod_conts_cntr_grp_id BIGINT NOT NULL,
    cntr_cd VARCHAR(2) NOT NULL,
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_cntr_grp_id, cntr_cd),
    KEY idx_scms_cntr_cd (cntr_cd)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 콘텐츠 - 국가 그룹 매핑
CREATE TABLE scms_prod_conts_mdl_cntr_l (
    prod_conts_id BIGINT NOT NULL,
    prod_conts_cntr_grp_id BIGINT NOT NULL,
    use_yn CHAR(1),
    reg_id VARCHAR(50),
    reg_dt DATETIME NOT NULL,
    mdf_id VARCHAR(50),
    mdf_dt DATETIME,
    PRIMARY KEY (prod_conts_id, prod_conts_cntr_grp_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;