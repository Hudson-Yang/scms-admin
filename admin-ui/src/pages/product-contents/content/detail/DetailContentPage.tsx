import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Tabs,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getContentDetail } from "../api/contentApi";
import "./DetailContentPage.css";

const { Title, Text } = Typography;

const DetailContentPage = () => {
  const navigate = useNavigate();
  const { prodContsId } = useParams();
  const [form] = Form.useForm();
  const { data, isLoading, error } = useQuery({
    queryKey: ["content", prodContsId],
    queryFn: () => getContentDetail(prodContsId!),
    enabled: !!prodContsId,
  });

  useEffect(() => {
    if (!data?.data) return;
    const content = data.data;
    form.setFieldsValue({
      admnDispNm: content.admnDispNm,
      languageList: content.languageList,
    });
  }, [data, form]);

  const handleGoList = () => {
    navigate("/product-content/content");
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("update values:", values);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (!data?.data) return;

    form.setFieldsValue({
      admnDispNm: data.data.admnDispNm,
      languageList: data.data.languageList,
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
    Language 탭

    현재는 조회 화면 확인용

    다음 단계에서
    수정 / 삭제 기능 추가 예정
  */
  const languageTab = (
    <div>
      {(data?.data.languageList || []).map((language, index) => (
        <Card
          key={`${language.langCd}-${index}`}
          size="small"
          style={{ marginBottom: 12 }}
        >
          <p>
            <strong>Default:</strong> {language.dfltLangYn ? "Y" : "N"}
          </p>

          <p>
            <strong>Language:</strong> {language.langCd}
          </p>

          <p>
            <strong>Title:</strong> {language.prodContsTitl}
          </p>

          <p>
            <strong>Description:</strong> {language.prodContsDesc}
          </p>
        </Card>
      ))}
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
                <Input placeholder="Display Name" />
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
          <Space>
            {/*
              다음 단계

              DELETE 이상 권한일 때만
              Delete 버튼 표시 예정
            */}

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

export default DetailContentPage;
