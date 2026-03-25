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
  Tabs,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "@/auth/useAuth";
import "./NewContentPage.css";

const { Title, Text } = Typography;

const languageOptions = [
  { label: "English (en_US)", value: "en_US" },
  { label: "Korean (ko_KR)", value: "ko_KR" },
  { label: "Japanese (ja_JP)", value: "ja_JP" },
];

const NewContentPage = () => {
  const navigate = useNavigate();
  const { canCreateContent } = useAuth();
  const [form] = Form.useForm();

  /*
    권한 방어
    - 목록에서 버튼을 숨겨도 URL 직접 접근은 가능하므로
      페이지 내부에서도 한 번 더 체크
  */
  if (!canCreateContent) {
    return <div>등록 권한이 없습니다.</div>;
  }

  /*
    임시 저장
    - 지금은 화면 단계이므로 콘솔 출력만 수행
    - 나중에 create API 연결 시 여기서 validate 후 요청
  */
  const handleSave = async () => {
    const values = await form.validateFields();
    console.log("new content form values", values);
  };

  /*
    기본 언어 변경 함수
    - Radio는 한 행만 선택되도록 보여주지만,
      실제 form 값의 dfltLangYn도 함께 맞춰줘야 함
    - 선택한 index만 true, 나머지는 false로 변경
  */
  const handleChangeDefaultLanguage = (selectedIndex: number) => {
    const languageList = form.getFieldValue("languageList") || [];

    const nextLanguageList = languageList.map(
      (item: Record<string, unknown>, index: number) => ({
        ...item,
        dfltLangYn: index === selectedIndex,
      }),
    );

    form.setFieldsValue({
      languageList: nextLanguageList,
    });
  };

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

        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--action">
          Action
        </div>
      </div>

      <Form.List name="languageList">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div className="new-content-page__lang-row" key={field.key}>
                <div className="new-content-page__lang-cell new-content-page__lang-cell--default">
                  {/* Radio.Group 대신 각 행 Radio + onChange 방식으로 처리
                      이유:
                      현재 화면 구조가 행 단위 그리드라서 구현이 단순함 */}
                  <Radio
                    checked={
                      form.getFieldValue([
                        "languageList",
                        index,
                        "dfltLangYn",
                      ]) === true
                    }
                    onChange={() => handleChangeDefaultLanguage(index)}
                  />

                  {/* 실제 form 값과 연결되는 숨김용 필드
                      Radio 표시값과 저장값을 동기화하기 위해 유지 */}
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
                    <Select options={languageOptions} />
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
                  <Button
                    danger
                    onClick={() => {
                      /*
                        마지막 1개 행은 삭제 금지
                        - 언어 행이 0개가 되면 화면/저장 구조가 어색해짐
                      */
                      if (fields.length === 1) {
                        return;
                      }

                      const currentLanguageList =
                        form.getFieldValue("languageList") || [];

                      const removedIsDefault =
                        currentLanguageList[index]?.dfltLangYn === true;

                      remove(field.name);

                      /*
                        기본 언어였던 행을 삭제한 경우
                        - 삭제 후 첫 번째 행을 기본 언어로 다시 지정
                        - setTimeout을 둔 이유:
                          remove 후 form 내부 배열 반영 타이밍 뒤에 맞추기 위해서
                      */
                      if (removedIsDefault) {
                        setTimeout(() => {
                          const nextLanguageList =
                            form.getFieldValue("languageList") || [];

                          const normalized = nextLanguageList.map(
                            (item: Record<string, unknown>, idx: number) => ({
                              ...item,
                              dfltLangYn: idx === 0,
                            }),
                          );

                          form.setFieldsValue({
                            languageList: normalized,
                          });
                        }, 0);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            <div className="new-content-page__lang-add">
              <Button
                onClick={() =>
                  add({
                    dfltLangYn: false,
                    langCd: undefined,
                    prodContsTitl: "",
                    prodContsDesc: "",
                  })
                }
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

                <Button>Cancel</Button>
              </Space>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default NewContentPage;
