DROP TABLE IF EXISTS scms_prod_conts_l;
DROP TABLE IF EXISTS scms_prod_conts_lang_l;

CREATE TABLE scms_prod_conts_l (
    prod_conts_id INT AUTO_INCREMENT,
    admn_disp_nm  VARCHAR(150) NOT NULL,
    regr_id       VARCHAR(50)  NOT NULL,
    reg_dt       TIMESTAMP    NOT NULL,
    mdfr_id       VARCHAR(50),
    mdf_dt        TIMESTAMP,
    PRIMARY KEY (prod_conts_id)
);

CREATE TABLE scms_prod_conts_lang_l (
	prod_conts_id INT,
	lang_cd		 VARCHAR(10),
	prod_conts_titl VARCHAR(200),
	prod_conts_desc VARCHAR(200),
	dflt_lang_yn VARCHAR(1),
	regr_id		VARCHAR(50),
	reg_dt       TIMESTAMP    NOT NULL,
    mdfr_id       VARCHAR(50),
    mdf_dt        TIMESTAMP,
    PRIMARY KEY (prod_conts_id, lang_cd),
    FOREIGN KEY (prod_conts_id)
        REFERENCES scms_prod_conts_l(prod_conts_id)
);