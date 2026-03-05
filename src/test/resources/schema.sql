DROP TABLE IF EXISTS scms_prod_conts_l;

CREATE TABLE scms_prod_conts_l (
    prod_conts_id INT AUTO_INCREMENT,
    admn_disp_nm  VARCHAR(150) NOT NULL,
    regr_id       VARCHAR(50)  NOT NULL,
    reg_dt       TIMESTAMP    NOT NULL,
    mdfr_id       VARCHAR(50),
    mdf_dt        TIMESTAMP,
    PRIMARY KEY (PROD_CONTS_ID)
);