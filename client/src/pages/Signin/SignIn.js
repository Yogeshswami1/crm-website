import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Switch } from "antd";
import axios from "axios";
import { useUser } from "../../UserContext";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import HeaderComponent from "./Header/Header";
import FooterComponent from "./Footer/Footer";
import "./SignIn.css";
import good from "../../assets/good.mp4";
import { toast } from 'react-toastify'; // Import react-toastify

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { setUser } = useUser();

  const onFinish = async (values) => {
    try {
      let response;
      let role;
      const { identifier, password } = values;

      if (/\S+@\S+\.\S+/.test(identifier)) {
        role = "admin";
        response = await axios.post(`${apiUrl}/api/admin/login`, { email: identifier, password });
      } else if (/^TL\d+$/.test(identifier)) {
        role = "manager";
        response = await axios.post(`${apiUrl}/api/managers/login`, { position: identifier, password });
      } else if (/^AT\d+$/.test(identifier)) {
        role = "accountant";
        response = await axios.post(`${apiUrl}/api/accountants/login`, { id: identifier, password });
      } else if (/^TS\d+$/.test(identifier)) {
        role = "telesales";
        response = await axios.post(`${apiUrl}/api/telesales/login`, { id: identifier, password });
      } else {
        role = "user";
        response = await axios.post(`${apiUrl}/api/contact/login`, { enrollmentId: identifier, password });
      }

      if (response && response.data) {
        toast.success("Login successful!"); // Use toast for success
        setUser({ ...response.data.user, role });


        localStorage.setItem("token", response.data.token);
        if (response.data.manager) {
          localStorage.setItem("managerId", response.data.manager._id);
        } else if (response.data.user) {
          localStorage.setItem("enrollmentId", response.data.user.enrollmentId);
        } else if (response.data.supervisor) {
          localStorage.setItem("supervisorId", response.data.supervisor._id);
        } else if (response.data.accountant) {
          localStorage.setItem("accountantId", response.data.accountant._id);
        }
        else if (response.data.telesales) {
          localStorage.setItem("telesalesId", response.data.telesales._id);
        }
        else if (response.data.social) {
          localStorage.setItem("socialId", response.data.social._id);
        }
        localStorage.setItem("user", JSON.stringify({ ...response.data.user, role }));

        const rolePath = {
          admin: "/home",
          manager: "/managerdashboard",
          accountant: "/accountantdashboard",
          telesales: "/telesalesdashboard",
          user: "/userdashboard"
        };
        history.push(rolePath[role] || "/");
      } else {
        toast.error("Login failed! No data returned."); // Use toast for errors
      }
    } catch (error) {
      toast.error("Login failed!"); // Use toast for errors
      console.error("Failed:", error.response?.data || error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const onChange = (checked) => {
    console.log(`Switch to ${checked}`);
  };

  return (
    <Layout className="layout-default layout-signin">
      <HeaderComponent />
      <Content className="signin">
        <div className="video-background">
          <video autoPlay loop muted>
            <source src={good} type="video/mp4" />
          </video>
        </div>
        <Row
          gutter={[24, 0]}
          justify="center"
          align="middle"
          className="signin-content"
        >
          <Col xs={24} lg={8} md={12}>
            <div className="signin-form-container">
              <Title className="mb-15" level={2}>Welcome</Title>
              <Title className="font-regular text-muted" level={5}>Enter your details</Title>
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  label="Login ID"
                  name="identifier"
                  rules={[{ required: true, message: "Please input your identifier!" }]}
                >
                  <Input placeholder="Login ID" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password
                    placeholder="Password"
                    iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Switch defaultChecked onChange={onChange} /> Remember me
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default SignIn;
