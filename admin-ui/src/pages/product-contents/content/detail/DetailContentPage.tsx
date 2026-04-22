import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  message,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CloseCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { getContentDetail, updateContent } from "../api/contentApi";
import "./DetailContentPage.css";

import type { LanguageRow, Content } from "../types/ContentType";
import useAuth from "@/auth/useAuth";

const { Title, Text } = Typography;

// 나중에 api에서 메타데이터 받아서 쓰기
const languageOptions = [
  { label: "English (en_US)", value: "en_US" },
  { label: "Korean (ko_KR)", value: "ko_KR" },
  { label: "Japanese (ja_JP)", value: "ja_JP" },
];

const DetailContentPage = () => {
  const navigate = useNavigate();
  const { prodContsId } = useParams();
  const { user, isSuperAdmin } = useAuth();
  const [form] = Form.useForm();
  const watchedLanguageList = Form.useWatch("languageList", form) || [];

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", prodContsId],
    queryFn: () => getContentDetail(prodContsId!),
    enabled: !!prodContsId,
  });

  const isOwner = user?.loginId === data?.data?.regrId;

  const canWrite = isSuperAdmin || isOwner;

  const saveContentMutation = useMutation({
    mutationFn: updateContent,
    onSuccess: () => {
      message.success("저장되었습니다.");
      navigate("/product-content/content");
    },
    onError: () => {
      message.error("저장에 실패했습니다.");
    },
  });

  useEffect(() => {
    if (!data?.data) return;
    const content = data.data;
    form.setFieldsValue({
      admnDispNm: content.admnDispNm,
      languageList: content.languageList.map((item) => ({
        ...item,
        saveFlag: "N",
        dfltLangYn: item.dfltLangYn == "Y",
      })),
    });
  }, [data, form]);

  const handleGoList = () => {
    navigate("/product-content/content");
  };

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue(true);
      const languageList: LanguageRow[] = values.languageList || [];

      const changedLanguageList = languageList.filter(
        (item) => item.saveFlag !== "N",
      );

      const validationTarget = changedLanguageList.filter(
        (item) => item.saveFlag !== "D",
      );

      for (const item of validationTarget) {
        if (!item.langCd) {
          message.error("언어를 선택해주세요.");
          return;
        }

        if (!item.prodContsTitl?.trim()) {
          message.error("Title을 입력해주세요.");
          return;
        }
      }

      const payload: Content = {
        prodContsId,
        admnDispNm: values.admnDispNm,
        languageList: changedLanguageList.map((item) => ({
          langCd: item.langCd,
          prodContsTitl: item.prodContsTitl,
          prodContsDesc: item.prodContsDesc,
          dfltLangYn: item.dfltLangYn ? "Y" : "N",
          saveFlag: item.saveFlag,
        })),
      };

      console.log("save payload:", payload);

      /*
      실제 API 호출
    */
      saveContentMutation.mutate(payload);
    } catch (error) {
      console.error(error);
      message.error("입력값을 확인해주세요.");
    }
  };

  const handleCancel = () => {
    if (!data?.data) return;

    form.setFieldsValue({
      admnDispNm: data.data.admnDispNm,
      languageList: data.data.languageList.map((item) => ({
        ...item,
        saveFlag: "N",
        dfltLangYn: item.dfltLangYn == "Y",
      })),
    });
  };

  const handleLanguageFieldChange = (
    index: number,
    fieldName: string,
    value: unknown,
  ) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const currentRow = languageList[index];

    if (!currentRow) return;

    const nextSaveFlag =
      currentRow.saveFlag === "N" ? "U" : currentRow.saveFlag;

    const nextLanguageList = [...languageList];

    nextLanguageList[index] = {
      ...currentRow,
      [fieldName]: value,
      saveFlag: nextSaveFlag,
    };

    form.setFieldsValue({
      languageList: nextLanguageList,
    });
  };

  if (isLoading) {
    return (
      <div style={{ padding: 40 }}>
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: 40 }}>상세 정보를 불러오지 못했습니다.</div>;
  }

  /*
  삭제 예정(D) row 복구

  규칙
  N → D → N
  U → D → U

  즉,
  삭제 직전 상태로 복구
  */
  const handleRestoreLanguage = (index: number) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const nextLanguageList = [...languageList];

    const targetRow = nextLanguageList[index];

    nextLanguageList[index] = {
      ...targetRow,
      saveFlag: targetRow.previousSaveFlag || "N",
      previousSaveFlag: undefined,
    };

    form.setFieldsValue({
      languageList: nextLanguageList,
    });
  };

  /*
  선택 가능한 Language 옵션 계산
  규칙
  - 현재 row의 값은 유지
  - 다른 row에서 이미 선택한 언어는 제외
  - 단, saveFlag = D (삭제 예정)은 제외
    → 다시 선택 가능해야 함
  */
  const getAvailableLanguageOptions = (currentIndex: number) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const currentValue = languageList[currentIndex]?.langCd;

    /*
    삭제 예정(D)는
    선택 점유에서 제외
  */
    const selectedValues = languageList
      .filter((item) => item?.saveFlag !== "D")
      .map((item) => item?.langCd)
      .filter(Boolean);

    return languageOptions.filter((option) => {
      /*
      현재 row의 현재 값은
      항상 보여줘야 함
      */
      if (option.value === currentValue) {
        return true;
      }

      return !selectedValues.includes(option.value);
    });
  };

  /*
  Default Language 변경
  규칙
  - 선택된 row만 dfltLangYn = true
  - 나머지는 false
  + 기존 row(N)였다면
    saveFlag → U 로 변경
  + 신규 row(I)는
    그대로 I 유지
  */
  const handleChangeDefaultLanguage = (selectedIndex: number) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const nextLanguageList = languageList.map((item, index) => {
      /*
        기존 N이면
        수정 발생 → U

        I는 그대로 유지
        D는 건드리지 않음
      */
      let nextSaveFlag = item.saveFlag;

      const changed = item.dfltLangYn !== (index === selectedIndex);

      if (changed && item.saveFlag === "N") {
        nextSaveFlag = "U";
      }

      return {
        ...item,
        dfltLangYn: index === selectedIndex,
        saveFlag: nextSaveFlag,
      };
    });

    form.setFieldsValue({
      languageList: nextLanguageList,
    });
  };

  const getNextDefaultLanguageValue = () => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const selectedValues = languageList
      .map((item) => item?.langCd)
      .filter(Boolean);

    const firstAvailableOption = languageOptions.find(
      (option) => !selectedValues.includes(option.value),
    );

    return firstAvailableOption?.value;
  };

  /*
  Add Language 버튼 활성화 여부

  삭제 예정(D)는
  점유에서 제외
  */
  const hasRemainingLanguageOption = languageOptions.some((option) => {
    return !watchedLanguageList
      .filter((item: LanguageRow) => item?.saveFlag !== "D")
      .some((item: LanguageRow) => item?.langCd === option.value);
  });

  const languageTab = (
    <div className="detail-content-page__tab-panel">
      <div className="detail-content-page__lang-header">
        <div className="detail-content-page__lang-header-cell detail-content-page__lang-header-cell--default">
          Default
        </div>

        <div className="detail-content-page__lang-header-cell detail-content-page__lang-header-cell--language">
          Language
        </div>

        <div className="detail-content-page__lang-header-cell detail-content-page__lang-header-cell--title">
          Title <span className="required">*</span>
        </div>

        <div className="detail-content-page__lang-header-cell detail-content-page__lang-header-cell--description">
          Description
        </div>

        <div className="detail-content-page__lang-header-cell detail-content-page__lang-header-cell--action" />
      </div>

      <Form.List name="languageList">
        {(fields, { add, remove }) => (
          <div className="detail-content-page__tab-panel">
            {fields.map((field, index) => {
              const currentRow =
                form.getFieldValue(["languageList", index]) || {};

              const availableOptions = getAvailableLanguageOptions(index);
              const isDefaultRow = currentRow?.dfltLangYn === true;

              return (
                <div
                  key={field.key}
                  className={`
                detail-content-page__lang-row
                detail-content-page__lang-row--${(
                  currentRow.saveFlag || "N"
                ).toLowerCase()}
              `}
                >
                  {/* Default */}
                  <div className="detail-content-page__lang-cell">
                    <Radio
                      checked={isDefaultRow}
                      onChange={() => handleChangeDefaultLanguage(index)}
                      disabled={!canWrite || currentRow.saveFlag == "D"}
                    />
                    <Form.Item
                      name={[field.name, "dfltLangYn"]}
                      // valuePropName="checked"
                      className="detail-content-page__form-item"
                      hidden
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  {/* Language */}
                  <div className="detail-content-page__lang-cell">
                    <Form.Item
                      name={[field.name, "langCd"]}
                      rules={[
                        { required: true, message: "언어를 선택해주세요." },
                      ]}
                      className="detail-content-page__form-item"
                    >
                      <Select
                        options={availableOptions}
                        placeholder="Language"
                        onChange={(value) =>
                          handleLanguageFieldChange(index, "langCd", value)
                        }
                        disabled={!canWrite || currentRow.saveFlag == "D"}
                      />
                    </Form.Item>
                  </div>

                  {/* Title */}
                  <div className="detail-content-page__lang-cell">
                    <Form.Item
                      name={[field.name, "prodContsTitl"]}
                      rules={[
                        { required: true, message: "제목을 입력해주세요." },
                      ]}
                      className="detail-content-page__form-item"
                    >
                      <Input
                        placeholder="Title"
                        onChange={(e) =>
                          handleLanguageFieldChange(
                            index,
                            "prodContsTitl",
                            e.target.value,
                          )
                        }
                        disabled={!canWrite || currentRow.saveFlag == "D"}
                      />
                    </Form.Item>
                  </div>

                  {/* Description */}
                  <div className="detail-content-page__lang-cell">
                    <Form.Item
                      name={[field.name, "prodContsDesc"]}
                      className="detail-content-page__form-item"
                    >
                      <Input
                        placeholder="Description"
                        onChange={(e) =>
                          handleLanguageFieldChange(
                            index,
                            "prodContsDesc",
                            e.target.value,
                          )
                        }
                        disabled={!canWrite || currentRow.saveFlag == "D"}
                      />
                    </Form.Item>
                  </div>

                  <div className="detail-content-page__lang-cell detail-content-page__lang-cell--action">
                    {/* 삭제 예정 상태면 Restore 버튼 노출 */}
                    {currentRow.saveFlag === "D" ? (
                      <Button
                        type="text"
                        icon={<UndoOutlined />}
                        onClick={() => handleRestoreLanguage(index)}
                      />
                    ) : (
                      canWrite &&
                      !isDefaultRow && (
                        <Button
                          type="text"
                          danger
                          icon={<CloseCircleOutlined />}
                          onClick={() => {
                            /* 최소 1개 language 유지 */
                            if (fields.length === 1) {
                              return;
                            }

                            const languageList: LanguageRow[] =
                              form.getFieldValue("languageList") || [];

                            const targetRow = languageList[index];
                            /* 
                            신규 추가 row
                              I → remove()
                            */
                            if (targetRow.saveFlag === "I") {
                              remove(field.name);
                              return;
                            }

                            /*
                              기존 row
                              N / U → D
                            */
                            const nextLanguageList = [...languageList];

                            nextLanguageList[index] = {
                              ...targetRow,
                              saveFlag: "D",
                              /*
                                Restore를 위해
                                삭제 직전 상태 저장
                              */
                              previousSaveFlag: targetRow.saveFlag || "N",
                            };

                            form.setFieldsValue({
                              languageList: nextLanguageList,
                            });
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
            {canWrite && (
              <div className="detail-content-page__lang-add">
                <Button
                  onClick={() => {
                    const nextLangCd = getNextDefaultLanguageValue();

                    if (!nextLangCd) {
                      return;
                    }

                    add({
                      dfltLangYn: false,
                      langCd: nextLangCd,
                      prodContsTitl: "",
                      prodContsDesc: "",
                      saveFlag: "I",
                    });
                  }}
                  disabled={!hasRemainingLanguageOption}
                >
                  Add Language
                </Button>
              </div>
            )}
          </div>
        )}
      </Form.List>
    </div>
  );

  return (
    <div className="detail-content-page">
      <div className="detail-content-page__header">
        <div>
          <Title level={2} className="detail-content-page__title">
            Content Detail
          </Title>

          <Text type="secondary">콘텐츠 상세 / 수정 화면</Text>
        </div>
      </div>

      <Card className="detail-content-page__card">
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Display Name"
                name="admnDispNm"
                rules={[
                  {
                    required: true,
                    message: "Display Name을 입력해주세요.",
                  },
                ]}
              >
                <Input placeholder="Display Name" disabled={!canWrite} />
              </Form.Item>
            </Col>
          </Row>

          <Tabs
            className="detail-content-page__tabs"
            items={[
              {
                key: "language",
                label: "Language",
                children: languageTab,
              },
            ]}
          />
        </Form>
      </Card>

      <div className="detail-content-page__actions">
        <div className="detail-content-page__actions-left">
          <Button onClick={handleGoList}>List</Button>
        </div>

        <div className="detail-content-page__actions-right">
          {canWrite && (
            <Space>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>

              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailContentPage;
