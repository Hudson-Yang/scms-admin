import { Alert, Button, Card, Form, Input, Space, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import useAuth from "./useAuth";
import useAppMessage from "../app/useAppMessage";
import type { LoginRequest } from "../types/auth";
import "./LoginPage.css";

const { Title, Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshMe } = useAuth();
  const message = useAppMessage();
  const [form] = Form.useForm<LoginRequest>();

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || "/";

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      try {
        // 로그인 성공 후 현재 사용자 정보를 다시 조회해 전역 인증 상태를 갱신
        await refreshMe();

        // 전역 message 인스턴스를 사용하므로 페이지 이동 후에도 메시지가 유지됨
        message.success("로그인되었습니다.");

        navigate(from, { replace: true });
      } catch (error) {
        console.error("로그인 후 사용자 정보 조회 실패", error);
        message.error("로그인 후 사용자 정보 조회에 실패했습니다.");
      }
    },
    onError: () => {
      message.error("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    },
  });

  const handleSubmit = (values: LoginRequest) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <div className="auth-page__header">
            {/* 로그인/회원가입 화면에서도 홈으로 돌아갈 수 있도록 브랜드 링크 제공 */}
            <Link to="/" className="auth-page__brand">
              Smartphone CMS Admin
            </Link>

            <div className="auth-page__title-wrap">
              <Title level={3} style={{ marginBottom: 8 }}>
                Admin Login
              </Title>
              <Text type="secondary">SCMS Admin CMS 로그인</Text>
            </div>
          </div>

          <Form<LoginRequest>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
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
              rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {loginMutation.isError && (
              <Alert
                type="error"
                showIcon
                message="로그인 실패"
                description="입력한 계정 정보를 다시 확인해주세요."
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item style={{ marginBottom: 12 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loginMutation.isPending}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>

          <div className="auth-page__footer">
            <Text type="secondary">계정이 없으신가요? </Text>
            <Link to="/sign-up" className="auth-page__link">
              회원가입하기
            </Link>
          </div>
        </Space>
      </Card>
    </div>
  );
}
