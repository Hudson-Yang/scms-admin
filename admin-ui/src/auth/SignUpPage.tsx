import { Button, Card, Form, Input, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";
import useAppMessage from "../app/useAppMessage";
import type { SignUpRequest } from "../types/auth";
import "./LoginPage.css";

const { Title, Text } = Typography;

interface SignUpFormValues extends SignUpRequest {
  confirmPassword: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const message = useAppMessage();
  const [form] = Form.useForm<SignUpFormValues>();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      message.success("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login", { replace: true });
    },
    onError: () => {
      message.error(
        "회원가입에 실패했습니다. 중복 아이디 여부를 확인해주세요.",
      );
    },
  });

  const handleSubmit = (values: SignUpFormValues) => {
    const request: SignUpRequest = {
      loginId: values.loginId,
      password: values.password,
      name: values.name,
    };

    signUpMutation.mutate(request);
  };

  return (
    <div className="auth-page">
      <Card className="auth-card" style={{ width: 460 }}>
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <div className="auth-page__header">
            {/* 회원가입 화면에서도 홈으로 쉽게 이동할 수 있도록 브랜드 링크 제공 */}
            <Link to="/" className="auth-page__brand">
              Smartphone CMS Admin
            </Link>

            <div className="auth-page__title-wrap">
              <Title level={3} style={{ marginBottom: 8 }}>
                Admin Sign Up
              </Title>
              <Text type="secondary">SCMS Admin CMS 관리자 계정 생성</Text>
            </div>
          </div>

          <Form<SignUpFormValues>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="이름"
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요." }]}
            >
              <Input placeholder="관리자 이름" />
            </Form.Item>

            <Form.Item
              label="아이디"
              name="loginId"
              rules={[{ required: true, message: "아이디를 입력해주세요." }]}
            >
              <Input placeholder="Login ID" />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[
                { required: true, message: "비밀번호를 입력해주세요." },
                { min: 4, message: "비밀번호는 4자 이상 입력해주세요." },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="비밀번호 확인"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "비밀번호 확인을 입력해주세요." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("비밀번호가 일치하지 않습니다."),
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 12 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={signUpMutation.isPending}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>

          <div className="auth-page__footer">
            <Text type="secondary">이미 계정이 있으신가요? </Text>
            <Link to="/login" className="auth-page__link">
              로그인하기
            </Link>
          </div>
        </Space>
      </Card>
    </div>
  );
}
