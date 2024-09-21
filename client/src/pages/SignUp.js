// import React from "react";
// import {
//   Layout,
//   Menu,
//   Button,
//   Typography,
//   Card,
//   Form,
//   Input,
//   Checkbox,
//   message,
// } from "antd";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;
// const { Header, Content } = Layout;

// const SignUp = () => {
//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post(`${apiUrl}/api/admin/sign-up`, {
//         name: values.Name,
//         email: values.email,
//         password: values.password,
//       });
//       message.success("Registration successful!");
//       console.log("Success:", response.data);
//     } catch (error) {
//       message.error("Registration failed!");
//       console.log("Failed:", error.response.data);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="layout-default ant-layout layout-sign-up">
//       <Header>
//         <div className="header-col header-nav">
//           <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
//             <Menu.Item key="1">
//               <Link to="/sign-in">
//                 <span>Sign In</span>
//               </Link>
//             </Menu.Item>
//           </Menu>
//         </div>
//       </Header>

//       <Content className="p-0">
//         <div className="sign-up-header">
//           <div className="content">
//             <Title>Sign Up</Title>
//           </div>
//         </div>

//         <Card
//           className="card-signup header-solid h-full ant-card pt-0"
//           title={<h5>Register With</h5>}
//           bordered={false}
//         >
//           <Form
//             name="basic"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             className="row-col"
//           >
//             <Form.Item
//               name="Name"
//               rules={[
//                 { required: true, message: "Please input your username!" },
//               ]}
//             >
//               <Input placeholder="Name" />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               rules={[
//                 { required: true, message: "Please input your email!" },
//                 { type: "email", message: "The input is not valid E-mail!" },
//               ]}
//             >
//               <Input placeholder="Email" />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//                 {
//                   min: 6,
//                   message: "Password must be at least 6 characters long!",
//                 },
//               ]}
//             >
//               <Input placeholder="Password" type="password" />
//             </Form.Item>

//             <Form.Item name="remember" valuePropName="checked">
//               <Checkbox>
//                 I agree to the{" "}
//                 <a href="#pablo" className="font-bold text-dark">
//                   Terms and Conditions
//                 </a>
//               </Checkbox>
//             </Form.Item>

//             <Form.Item>
//               <Button style={{ width: "100%" }} type="primary" htmlType="submit">
//                 SIGN UP
//               </Button>
//             </Form.Item>
//           </Form>
//           <p className="font-semibold text-muted text-center">
//             Already have an account?{" "}
//             <Link to="/sign-in" className="font-bold text-dark">
//               Sign In
//             </Link>
//           </p>
//         </Card>
//       </Content>
//     </div>
//   );
// };

// export default SignUp;
