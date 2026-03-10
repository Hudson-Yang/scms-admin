INSERT INTO scms_prod_conts_l (
	prod_conts_id, admn_disp_nm, regr_id, reg_dt, mdfr_id, mdf_dt	
) VALUES (101, 'TEST_0', 'TESTER', NOW(), 'TESTER', NOW())
		 ,(102, 'TEST_1', 'TESTER', NOW(), 'TESTER', NOW())
		 ,(103, 'TEST_2', 'TESTER', NOW(), 'TESTER', NOW());
		 
INSERT INTO scms_prod_conts_lang_l (
		prod_conts_id, lang_cd, prod_conts_titl, prod_conts_desc, dflt_lang_yn, regr_id, reg_dt
) VALUES (102, 'KO_KR', '테스트 언어 제목', '테스트 언어 설명.', 'Y', 'TESTER', NOW())
		,(102, 'EN_US', 'Test Language Title', 'Test Language Description.', 'N', 'TESTER', NOW())
		,(103, 'KO_KR', '테스트 언어 제목', '테스트 언어 설명.', 'Y', 'TESTER', NOW())
		,(103, 'EN_US', 'Test Language Title', 'Test Language Description.', 'N', 'TESTER', NOW());