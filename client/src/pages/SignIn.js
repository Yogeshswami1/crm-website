// import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import {
//   Layout,
//   Menu,
//   Button,
//   Row,
//   Col,
//   Typography,
//   Form,
//   Input,
//   Switch,
//   message,
//   Select,
// } from "antd";
// import axios from "axios";
// import signinbg from "../assets/images/img-signin.jpg";
// import { useUser } from "../UserContext";


// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;
// const { Header, Footer, Content } = Layout;

// const SignIn = () => {
//   const history = useHistory();
//   const [form] = Form.useForm();
//   const role = Form.useWatch("role", form);
//   const { setUser } = useUser();

//   const onFinish = async (values) => {
//     try {
//       let response;
//       if (values.role === "admin") {
//         response = await axios.post(`${apiUrl}/api/admin/login`, {
//           email: values.email,
//           password: values.password,
//         });
//       } else if (values.role === "manager") {
//         response = await axios.post(`${apiUrl}/api/managers/login`, {
//           position: values.position,
//           password: values.password,
//         });
//       } else if (values.role === "user") {
//         response = await axios.post(`${apiUrl}/api/contact/login`, {
//           enrollmentId: values.enrollmentId,
//           password: values.password,
//         });
//       }

//       if (response && response.data) {
        
//         message.success("Login successful!");
//         setUser({ ...response.data.user, role: values.role });

//         // Store token and user details in localStorage
//         localStorage.setItem("token", response.data.token);
//         if (response.data.manager) {
//           localStorage.setItem("managerId", response.data.manager._id);
//         } else
//         if (response.data.user){
//           localStorage.setItem("enrollmentId", response.data.user.enrollmentId)
//         }
//         localStorage.setItem("user", JSON.stringify({ ...response.data.user, role: values.role }));

//         if (values.role === "admin") {
//           history.push("/home");
//         } else if (values.role === "manager") {
//           history.push("/managerdashboard");
//         } else if (values.role === "user") {
//           history.push("/userdashboard");
//         }
//       } else {
//         message.error("Login failed! No data returned.");
//       }
//     } catch (error) {
//       message.error("Login failed!");
//       console.log("Failed:", error.response?.data || error.message);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const onChange = (checked) => {
//     console.log(`switch to ${checked}`);
//   };

//   return (
//     <Layout className="layout-default layout-signin">
//       <Header>
//         <div className="header-col header-brand">
          
//           <h5>Saumic Craft CRM</h5>
//         </div>
//         <div className="header-col header-nav">
//           {/* <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            
//             <Menu.Item key="1">
//               <Link to="/sign-up">
//                 <span>Sign Up</span>
//               </Link>
//             </Menu.Item>
//           </Menu> */}
//         </div>
//         <div className="header-col header-btn">
//           <Button type="primary">PROJECT</Button>
//         </div>
//       </Header>
//       <Content className="signin">
//         <Row gutter={[24, 0]} justify="space-around">
//           <Col
//             xs={{ span: 24, offset: 0 }}
//             lg={{ span: 6, offset: 2 }}
//             md={{ span: 12 }}
//           >
//             <Title className="mb-15">Welcome</Title>
//             <Title className="font-regular text-muted" level={5}>
//               Enter your email and password to sign in
//             </Title>
//             <Form
//               form={form}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               layout="vertical"
//               className="row-col"
//             >
//               <Form.Item
//                 name="role"
//                 label="Role"
//                 rules={[{ required: true, message: "Please select your role!" }]}
//               >
//                 <Select placeholder="Select a role">
//                   <Select.Option value="admin">Admin</Select.Option>
//                   <Select.Option value="manager">Manager</Select.Option>
//                   <Select.Option value="user">User</Select.Option>
//                 </Select>
//               </Form.Item>

//               {role === "admin" && (
//                 <Form.Item
//                   className="username"
//                   label="Email"
//                   name="email"
//                   rules={[
//                     { required: true, message: "Please input your email!" },
//                     { type: "email", message: "The input is not valid E-mail!" },
//                   ]}
//                 >
//                   <Input placeholder="Email" />
//                 </Form.Item>
//               )}

//               {role === "manager" && (
//                 <Form.Item
//                   className="username"
//                   label="Position"
//                   name="position"
//                   rules={[{ required: true, message: "Please input your position!" }]}
//                 >
//                   <Input placeholder="Position" />
//                 </Form.Item>
//               )}

//               {role === "user" && (
//                 <Form.Item
//                   className="username"
//                   label="Enrollment ID"
//                   name="enrollmentId"
//                   rules={[{ required: true, message: "Please input your enrollment ID!" }]}
//                 >
//                   <Input placeholder="Enrollment ID" />
//                 </Form.Item>
//               )}

//               <Form.Item
//                 className="username"
//                 label="Password"
//                 name="password"
//                 rules={[
//                   { required: true, message: "Please input your password!" },
//                 ]}
//               >
//                 <Input placeholder="Password" type="password" />
//               </Form.Item>

//               <Form.Item
//                 name="remember"
//                 className="align-center"
//                 valuePropName="checked"
//               >
//                 <Switch defaultChecked onChange={onChange} />
//                 Remember me
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   style={{ width: "100%" }}
//                 >
//                   SIGN IN
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Col>
//           <Col
//             className="sign-img"
//             style={{ padding: 12 }}
//             xs={{ span: 24 }}
//             lg={{ span: 12 }}
//             md={{ span: 12 }}
//           >
//             <img src={signinbg} alt="" />
//           </Col>
//         </Row>
//       </Content>
//       <Footer>
//         <Menu mode="horizontal">
//           <Menu.Item>Company</Menu.Item>
//           <Menu.Item>About Us</Menu.Item>
//         </Menu>
//         <p className="copyright">
//           {" "}
//           Copyright © 2024 Saumic Craft. All Rights Reserved{" "}
//         </p>
//       </Footer>
//     </Layout>
//   );
// };

// export default SignIn;


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
  message,
} from "antd";
import axios from "axios";
import signinbg from "../assets/images/img-signin.jpg";
import { useUser } from "../UserContext";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';


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
      } else if (/^SM\d+$/.test(identifier)) {
        role = "social";
        response = await axios.post(`${apiUrl}/api/social/login`, {
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
        message.success("Login successful!");
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
          localStorage.setItem("accountantId", response.data.user.accountantId);
        }
        else if (response.data.user) {
          localStorage.setItem("telesalesId", response.data.user.telesalesId);
        }
        else if (response.data.user) {
          localStorage.setItem("rmdId", response.data.user.rmdId);
        }
        else if (response.data.user) {
          localStorage.setItem("socialId", response.data.user.socialId);
        }
        localStorage.setItem("user", JSON.stringify({ ...response.data.user, role }));

        if (role === "admin") {
          history.push("/home");
        } else if (role === "manager") {
          history.push("/managerdashboard");
        } else if (role === "supervisor") {
          history.push("/supervisordashboard");
        } else if (role === "accountant") {
          history.push("/accountantdashboard");
        }  else if (role === "telesales") {
          history.push("/telesalesdashboard");
        }  else if (role === "rmd") {
          history.push("/rmddashboard");
        }   else if (role === "social") {
          history.push("/socialdashboard");
        }   else if (role === "user") {
          history.push("/userdashboard");
        }
      } else {
        message.error("Login failed! No data returned.");
      }
    } catch (error) {
      message.error("Login failed!");
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
        {/* <div className="header-col header-btn">
          <Button type="primary">PROJECT</Button>
        </div> */}
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
        <Menu mode="horizontal">
          <Menu.Item>Company</Menu.Item>
          <Menu.Item>About Us</Menu.Item>
        </Menu>
        <p className="copyright">
          {" "}
          Copyright © 2024 Saumic Craft. All Rights Reserved{" "}
        </p>
      </Footer>
    </Layout>
  );
};

export default SignIn;


// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import {
//   Layout,
//   Menu,
//   Button,
//   Row,
//   Col,
//   Typography,
//   Form,
//   Input,
//   Switch,
//   message,
//   Modal,
//   Spin,
// } from "antd";
// import axios from "axios";
// import signinbg from "../assets/images/img-signin.jpg";
// import { useUser } from "../UserContext";

// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;
// const { Header, Footer, Content } = Layout;

// const SignIn = () => {
//   const history = useHistory();
//   const [form] = Form.useForm();
//   const { setUser } = useUser();
//   const [otpModalVisible, setOtpModalVisible] = useState(false);
//   const [adminId, setAdminId] = useState(null);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAdminId = localStorage.getItem("adminId");

//     if (token && storedAdminId) {
//       setUser({ adminId: storedAdminId, role: "admin" });
//       history.push("/home");
//     } else {
//       setInitialLoading(false);
//     }
//   }, [setUser, history]);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);
//       let response;
//       const identifier = values.identifier;
//       const password = values.password;
//       let role;

//       if (/\S+@\S+\.\S+/.test(identifier)) {
//         role = "admin";
//         response = await axios.post(`${apiUrl}/api/admin/login`, {
//           email: identifier,
//           password: password,
//         });

//         if (response.data.adminId) {
//           setAdminId(response.data.adminId);
//           setOtpModalVisible(true);
//         } else {
//           message.error("Invalid credentials or OTP required!");
//         }
//       } else if (/^TL\d+$/.test(identifier)) {
//         role = "manager";
//         response = await axios.post(`${apiUrl}/api/managers/login`, {
//           position: identifier,
//           password: password,
//         });
//       } else if (/^SP\d+$/.test(identifier)) {
//         role = "supervisor";
//         response = await axios.post(`${apiUrl}/api/supervisors/login`, {
//           id: identifier,
//           password: password,
//         });
//       } else if (/^AT\d+$/.test(identifier)) {
//         role = "accountant";
//         response = await axios.post(`${apiUrl}/api/accountants/login`, {
//           id: identifier,
//           password: password,
//         });
//       } else {
//         role = "user";
//         response = await axios.post(`${apiUrl}/api/contact/login`, {
//           enrollmentId: identifier,
//           password: password,
//         });
//       }

//       if (response && response.data && role !== "admin") {
//         message.success("Login successful!");
//         setUser({ ...response.data.user, role });

//         localStorage.setItem("token", response.data.token);
//         if (response.data.manager) {
//           localStorage.setItem("managerId", response.data.manager._id);
//         } else if (response.data.user) {
//           localStorage.setItem("enrollmentId", response.data.user.enrollmentId);
//         } else if (response.data.supervisor) {
//           localStorage.setItem("supervisorId", response.data.supervisor._id);
//         } else if (response.data.accountant) {
//           localStorage.setItem("accountantId", response.data.accountant._id);
//         }
//         localStorage.setItem("user", JSON.stringify({ ...response.data.user, role }));

//         if (role === "manager") {
//           history.push("/managerdashboard");
//         } else if (role === "supervisor") {
//           history.push("/supervisordashboard");
//         } else if (role === "accountant") {
//           history.push("/accountantdashboard");
//         } else if (role === "user") {
//           history.push("/userdashboard");
//         }
//       } 
//     } catch (error) {
//       message.error("Login failed!");
//       console.log("Failed:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleOtpSubmit = async () => {
//     try {
//       const response = await axios.post(`${apiUrl}/api/admin/verify-otp`, {
//         adminId,
//         otp,
//         deviceInfo: navigator.userAgent, // Example of deviceInfo
//       });

//       if (response.data.token) {
//         message.success("OTP verified, login successful!");
//         setUser({ adminId, role: "admin" });

//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("adminId", adminId);

//         history.push("/home");
//       } else {
//         message.error("Invalid OTP!");
//       }
//     } catch (error) {
//       message.error("OTP verification failed!");
//       console.log("Failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Layout className="layout-default layout-signin">
//       <Header>
//         <div className="header-col header-brand">
//           <h5>Saumic Craft CRM</h5>
//         </div>
//         <div className="header-col header-nav"></div>
//         <div className="header-col header-btn">
//           <Button type="primary">PROJECT</Button>
//         </div>
//       </Header>
//       <Content className="signin">
//         <Spin spinning={loading || initialLoading} tip="Please Wait...">
//           <Row gutter={[24, 0]} justify="space-around">
//             <Col
//               xs={{ span: 24, offset: 0 }}
//               lg={{ span: 6, offset: 2 }}
//               md={{ span: 12 }}
//             >
//               <Title className="mb-15">Sign In</Title>
//               <Title className="font-regular text-muted" level={5}>
//                 Enter your identifier and password to sign in
//               </Title>
//               <Form
//                 layout="vertical"
//                 className="row-col"
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 form={form}
//               >
//                 <Form.Item
//                   className="username"
//                   label="Email / Position / Enrollment ID / Supervisor ID / Accountant ID"
//                   name="identifier"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your identifier!",
//                     },
//                   ]}
//                 >
//                   <Input placeholder="Email / Position / Enrollment ID / Supervisor ID / Accountant ID" />
//                 </Form.Item>

//                 <Form.Item
//                   className="username"
//                   label="Password"
//                   name="password"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your password!",
//                     },
//                   ]}
//                 >
//                   <Input type="password" placeholder="Password" />
//                 </Form.Item>

//                 <Form.Item name="remember" className="align-center">
//                   <Switch defaultChecked />
//                   Remember me
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     style={{ width: "100%" }}
//                   >
//                     SIGN IN
//                   </Button>
//                 </Form.Item>
//                 <p className="font-semibold text-muted">
//                   Don&apos;t have an account?{" "}
//                   <Link to="/sign-up" className="text-dark font-bold">
//                     Sign Up
//                   </Link>
//                 </p>
//               </Form>
//             </Col>
//             <Col
//               className="sign-img"
//               style={{ padding: 12 }}
//               xs={{ span: 24 }}
//               lg={{ span: 12 }}
//               md={{ span: 12 }}
//             >
//               <img src={signinbg} alt="" />
//             </Col>
//           </Row>
//         </Spin>
//       </Content>
//       <Footer>
//         <Menu mode="horizontal">
//           <Menu.Item>Company</Menu.Item>
//           <Menu.Item>About Us</Menu.Item>
//           <Menu.Item>Team</Menu.Item>
//           <Menu.Item>Products</Menu.Item>
//         </Menu>
//         <Menu mode="horizontal" className="menu-nav-social">
//           <Menu.Item>
//             <Link to="#">
//               <i className="fab fa-facebook-f" />
//             </Link>
//           </Menu.Item>
//           <Menu.Item>
//             <Link to="#">
//               <i className="fab fa-twitter" />
//             </Link>
//           </Menu.Item>
//           <Menu.Item>
//             <Link to="#">
//               <i className="fab fa-instagram" />
//             </Link>
//           </Menu.Item>
//         </Menu>
//       </Footer>

//       <Modal
//         title="Enter OTP"
//         open={otpModalVisible}
//         onOk={handleOtpSubmit}
//         onCancel={() => setOtpModalVisible(false)}
//       >
//         <Form.Item label="OTP">
//           <Input
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//           />
//         </Form.Item>
//       </Modal>
//     </Layout>
//   );
// };

// export default SignIn;

