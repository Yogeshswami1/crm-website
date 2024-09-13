
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
 Input,
  Switch,
} from "antd";
import axios from "axios";
import signinbg from "../../assets/images/img-signin.jpg";
import { useUser } from "../../UserContext";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { setUser } = useUser();

  const onFinish = async (values) => {
    try {
      let response;
      let role;

      const identifier = values.identifier;
      const password = values.password;

      if (/\S+@\S+\.\S+/.test(identifier)) {
        role = "admin";
        response = await axios.post(`${apiUrl}/api/admin/login`, {
          email: identifier,
          password: password,
        });
      } else if (/^TL\d+$/.test(identifier)) {
        role = "manager";
        response = await axios.post(`${apiUrl}/api/managers/login`, {
          position: identifier,
          password: password,
        });
      } else if (/^SP\d+$/.test(identifier)) {
        role = "supervisor";
        response = await axios.post(`${apiUrl}/api/supervisors/login`, {
          id: identifier,
          password: password,
        });
      } else if (/^AT\d+$/.test(identifier)) {
        role = "accountant";
        response = await axios.post(`${apiUrl}/api/accountants/login`, {
          id: identifier,
          password: password,
        });
      } else if (/^TS\d+$/.test(identifier)) {
        role = "telesales";
        response = await axios.post(`${apiUrl}/api/telesales/login`, {
          id: identifier,
          password: password,
        });
      } else if (/^RMD\d+$/.test(identifier)) {
        role = "rmd";
        response = await axios.post(`${apiUrl}/api/rmd/login`, {
          id: identifier,
          password: password,
        });
      } else {
        role = "user";
        response = await axios.post(`${apiUrl}/api/contact/login`, {
          enrollmentId: identifier,
          password: password,
        });
      }

      if (response && response.data) {
        toast.success("Login successful!");
        setUser({ ...response.data.user, role });

        // Store token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        if (response.data.manager) {
          localStorage.setItem("managerId", response.data.manager._id);
        } else if (response.data.user) {
          localStorage.setItem("enrollmentId", response.data.user.enrollmentId);
        }
        else if (response.data.user) {
          localStorage.setItem("supervisorId", response.data.user.supervisorId);
        }
        else if (response.data.user) {
          localStorage.setItem("rmdId", response.data.user.rmdId);
        }
        else if (response.data.user) {
          localStorage.setItem("accountantId", response.data.user.accountantId);
        }
        else if (response.data.user) {
          localStorage.setItem("telesalesId", response.data.user.telesalesId);
        }
        localStorage.setItem("user", JSON.stringify({ ...response.data.user, role }));

        if (role === "admin") {
          history.push("/home");
        } else if (role === "manager") {
          history.push("/managerdashboard");
        } else if (role === "supervisor") {
          history.push("/supervisordashboard");
        } else if (role === "rmd") {
          history.push("/rmddashboard");
        } else if (role === "accountant") {
          history.push("/accountantdashboard");
        }  else if (role === "telesales") {
          history.push("/telesalesdashboard");
        }  else if (role === "user") {
          history.push("/userdashboard");
        }
      } else {
        toast.error("Login failed! No data returned.");
      }
    } catch (error) {
      toast.error("Login failed!");
      console.log("Failed:", error.response?.data || error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-brand">
          <h5>Saumic Craft CRM</h5>
        </div>
        <div className="header-col header-nav"></div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Welcome</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your details to sign in
            </Title>
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Login ID"
                name="identifier"
                rules={[
                  { required: true, message: "Please input your identifier!" },
                ]}
              >
                <Input placeholder="Email / Position / Enrollment ID / Supervisor ID / Accountant ID / RMD ID / SOCIAL MEDIA MANAGER ID" />
              </Form.Item>

              <Form.Item
      className="username"
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password
        placeholder="Password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Form.Item>

              <Form.Item
                name="remember"
                className="align-center"
                valuePropName="checked"
              >
                <Switch defaultChecked onChange={onChange} />
                Remember me
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
      <Footer>
        {/* <Menu mode="horizontal">
          <Menu.Item>Company</Menu.Item>
          <Menu.Item>About Us</Menu.Item>
        </Menu> */}
        <p className="copyright">
          {" "}
          Copyright © 2024 Saumic Craft. All Rights Reserved{" "}
        </p>
      </Footer>
    </Layout>
  );
};

export default SignIn;