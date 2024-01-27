import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      if(response.ok) {
        const {user} = data;
        sessionStorage.setItem("user", JSON.stringify(user));

        if (user.role_id === 1) {
          navigate('/semester');
        }
        if (user.role_id === 2) {
          navigate('/teacher/calendar');
        }
        if(user.role_id === 3) {
          navigate('/student/dashboard');
        }
      }
      else {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
}

  return (
    <Layout>
      <Content className="flex items-center justify-center h-screen">
        <div className="w-80 p-6 bg-white rounded-lg shadow-md">
          <Title level={2} className="mb-4">
            Login
          </Title>
          <Text className="mb-4 block text-gray-500">
            Please enter your login details to sign in
          </Text>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
             
            </Form.Item>
            <Text type="danger" className="block">
                Forgot Password?
              </Text>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-500"
                onClick={onFinish}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Text className="block mt-4 mb-2 text-center">
            Don’t have an account? <a href="#">Create an account</a>
          </Text>
          <Text className="text-center mt-4 block">or continue with</Text>
          <div className="flex justify-center mt-4 mb-4">
            <Button type="link" className="mr-2 text-gray-500 text-3xl">
              <GoogleOutlined />
            </Button>
            <Button type="link" className="mr-2 text-gray-500 text-3xl">
              <FacebookOutlined />
            </Button>
            <Button type="link" className="text-gray-500 text-3xl">
              <TwitterOutlined />
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;