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
    권한 방어 - 나중에 리다이렉션 구현하기
  */
  if (!canCreateContent) {
    return <div>등록 권한이 없습니다.</div>;
  }

  /*
    임시 저장 핸들러
    - 지금은 화면 뼈대 단계이므로 console로만 확인
    - 나중에 API 연결 시 form.validateFields() -> create API 호출로 확장
  */
  const handleSave = async () => {
    const values = await form.validateFields();
    console.log("new content form values", values);
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
          Title
        </div>
        <div className="new-content-page__lang-header-cell new-content-page__lang-header-cell--description">
          Description
        </div>
      </div>

      <div className="new-content-page__lang-row">
        <div className="new-content-page__lang-cell new-content-page__lang-cell--default">
          <Form.Item
            name={["languageList", 0, "dfltLangYn"]}
            initialValue={true}
            valuePropName="checked"
            className="new-content-page__form-item"
          >
            <Radio />
          </Form.Item>
        </div>

        <div className="new-content-page__lang-cell new-content-page__lang-cell--language">
          <Form.Item
            name={["languageList", 0, "langCd"]}
            initialValue="en_US"
            rules={[{ required: true, message: "언어를 선택해주세요." }]}
            className="new-content-page__form-item"
          >
            <Select options={languageOptions} />
          </Form.Item>
        </div>

        <div className="new-content-page__lang-cell new-content-page__lang-cell--title">
          <Form.Item
            name={["languageList", 0, "prodContsTitl"]}
            rules={[{ required: true, message: "제목을 입력해주세요." }]}
            className="new-content-page__form-item"
          >
            <Input placeholder="Title" />
          </Form.Item>
        </div>

        <div className="new-content-page__lang-cell new-content-page__lang-cell--description">
          <Form.Item
            name={["languageList", 0, "prodContsDesc"]}
            className="new-content-page__form-item"
          >
            <Input placeholder="Description" />
          </Form.Item>
        </div>
      </div>
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
            <Space>
              <Button onClick={() => navigate("/product-content/content")}>
                List
              </Button>

              <Button>Cancel</Button>

              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default NewContentPage;
