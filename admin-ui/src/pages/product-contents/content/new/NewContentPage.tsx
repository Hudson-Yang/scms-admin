import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "@/auth/useAuth";
import { saveContent } from "../api/contentApi";
import "./NewContentPage.css";

import type { LanguageRow } from "../types/ContentType";

const { Title, Text } = Typography;

// 나중에 api에서 메타데이터 받아서 쓰기
const languageOptions = [
  { label: "English (en_US)", value: "en_US" },
  { label: "Korean (ko_KR)", value: "ko_KR" },
  { label: "Japanese (ja_JP)", value: "ja_JP" },
];

const NewContentPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { canCreateContent } = useAuth();
  const [form] = Form.useForm();
  const watchedLanguageList = Form.useWatch("languageList", form) || [];

  if (!canCreateContent) {
    navigate("/product-content/content");
  }

  const save = useMutation({
    mutationFn: saveContent,
    onSuccess: () => {
      message.success("저장 성공하였습니다.");

      queryClient.invalidateQueries({ queryKey: ["contents"] });

      navigate("/product-content/content");
    },
    onError: () => {
      message.error("저장에 실패했습니다.");
    },
  });

  const handleSave = async () => {
    const values = await form.validateFields();
    values.languageList.forEach(
      (lang) => (lang.dfltLangYn = lang.dfltLangYn ? "Y" : "N"),
    );
    save.mutate(values);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  /*
    기본 언어 변경
    - 선택한 index만 true
    - 나머지 행은 false
    - 즉, 기본 언어는 항상 한 행만 유지
  */
  const handleChangeDefaultLanguage = (selectedIndex: number) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];

    const nextLanguageList = languageList.map((item, index) => ({
      ...item,
      dfltLangYn: index === selectedIndex,
    }));

    form.setFieldsValue({
      languageList: nextLanguageList,
    });
  };

  /*
    현재 행에서 선택 가능한 언어 옵션 계산
    - 다른 행에서 이미 선택한 언어는 숨김
    - 단, "현재 행에 이미 선택된 값"은 유지해야 하므로 예외 허용
  */
  const getAvailableLanguageOptions = (currentIndex: number) => {
    const languageList: LanguageRow[] =
      form.getFieldValue("languageList") || [];
    const currentValue = languageList[currentIndex]?.langCd;

    const selectedValues = languageList
      .map((item) => item?.langCd)
      .filter(Boolean);

    return languageOptions.filter((option) => {
      // 현재 행의 현재 선택값은 보여줘야 함
      if (option.value === currentValue) {
        return true;
      }

      // 다른 행에서 이미 선택한 언어면 제외
      return !selectedValues.includes(option.value);
    });
  };

  /*
    새 행 추가 시 기본값 계산
    - 이미 선택된 언어를 제외한 "첫 번째 가능한 언어"를 자동 선택
    - 예:
      en_US 사용 중이면 ko_KR
      en_US, ko_KR 사용 중이면 ja_JP
  */
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

  const hasRemainingLanguageOption = languageOptions.some((option) => {
    return !watchedLanguageList.some(
      (item: { langCd?: string }) => item?.langCd === option.value,
    );
  });

  const languageTab = (
    <div className="new-content-page__tab-panel">
      <div className="new-content-page__lang-header">
        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--default">
          Default
        </div>

        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--language">
          Language
        </div>

        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--title">
          Title <span className="required">*</span>
        </div>

        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--description">
          Description
        </div>

        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--action" />
      </div>

      <Form.List name="languageList">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              const currentRow: LanguageRow =
                form.getFieldValue(["languageList", index]) || {};

              const availableOptions = getAvailableLanguageOptions(index);
              const isDefaultRow = currentRow?.dfltLangYn === true;

              return (
                <div className="new-content-page__lang-row" key={field.key}>
                  <div className="new-content-page__lang-cell new-content-page__lang-cell--default">
                    <Radio
                      checked={isDefaultRow}
                      onChange={() => handleChangeDefaultLanguage(index)}
                    />

                    {/* 실제 form 값과 연결되는 숨김 필드 */}
                    <Form.Item name={[field.name, "dfltLangYn"]} hidden>
                      <Input />
                    </Form.Item>
                  </div>

                  <div className="new-content-page__lang-cell new-content-page__lang-cell--language">
                    <Form.Item
                      name={[field.name, "langCd"]}
                      rules={[
                        { required: true, message: "언어를 선택해주세요." },
                      ]}
                      className="new-content-page__form-item"
                    >
                      <Select
                        options={availableOptions}
                        placeholder="Language"
                      />
                    </Form.Item>
                  </div>

                  <div className="new-content-page__lang-cell new-content-page__lang-cell--title">
                    <Form.Item
                      name={[field.name, "prodContsTitl"]}
                      rules={[
                        { required: true, message: "제목을 입력해주세요." },
                      ]}
                      className="new-content-page__form-item"
                    >
                      <Input placeholder="Title" />
                    </Form.Item>
                  </div>

                  <div className="new-content-page__lang-cell new-content-page__lang-cell--description">
                    <Form.Item
                      name={[field.name, "prodContsDesc"]}
                      className="new-content-page__form-item"
                    >
                      <Input placeholder="Description" />
                    </Form.Item>
                  </div>

                  <div className="new-content-page__lang-cell new-content-page__lang-cell--action">
                    {!isDefaultRow && (
                      <Button
                        type="text"
                        danger
                        icon={<CloseCircleOutlined />}
                        onClick={() => {
                          if (fields.length === 1) {
                            return;
                          }
                          remove(field.name);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div className="new-content-page__lang-add">
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
                  });
                }}
                disabled={!hasRemainingLanguageOption}
              >
                Add Language
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </div>
  );

  return (
    <div className="new-content-page">
      <div className="new-content-page__header">
        <div>
          <Title level={2} className="new-content-page__title">
            New Content
          </Title>
          <Text type="secondary">콘텐츠 등록 화면</Text>
        </div>
      </div>

      <Card className="new-content-page__card">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            admnDispNm: "",
            languageList: [
              {
                dfltLangYn: true,
                langCd: "en_US",
                prodContsTitl: "",
                prodContsDesc: "",
              },
            ],
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Display Name"
                name="admnDispNm"
                rules={[
                  { required: true, message: "Display Name을 입력해주세요." },
                ]}
              >
                <Input placeholder="Display Name" />
              </Form.Item>
            </Col>
          </Row>

          <Tabs
            className="new-content-page__tabs"
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
      <div className="new-content-page__actions">
        <div className="new-content-page__actions-left">
          <Button onClick={() => navigate("/product-content/content")}>
            List
          </Button>
        </div>

        <div className="new-content-page__actions-right">
          <Space>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>

            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default NewContentPage;
