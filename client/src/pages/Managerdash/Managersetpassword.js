// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message, Tag } from 'antd';
// import axios from 'axios';

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Managersetpassword = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [form] = Form.useForm();
//   const managerId = localStorage.getItem("managerId");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
//       setUsers(response.data);
//       setFilteredUsers(response.data); // Initialize filtered users with the full list
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       message.error('Failed to load users.');
//     }
//   };

//   const showPasswordModal = (user) => {
//     setCurrentUser(user);
//     setIsPasswordModalVisible(true);
//     form.setFieldsValue({ enrollmentId: user.enrollmentId });
//   };

//   const handleUpdatePassword = async (values) => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/update-password/${currentUser._id}`, values);
//       message.success('Password updated successfully');
//       setIsPasswordModalVisible(false);
//       form.resetFields();
//       fetchUsers(); // Refresh the user list
//     } catch (error) {
//       console.error('Error updating password:', error);
//       message.error('Failed to update password');
//     }
//   };

//   const handleCancel = () => {
//     setIsPasswordModalVisible(false);
//     setCurrentUser(null);
//     form.resetFields();
//   };

//   const handleSearch = (value) => {
//     const filteredData = users.filter(user => user.enrollmentId.includes(value));
//     setFilteredUsers(filteredData);
//   };

//   const userColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Password Status',
//       dataIndex: 'passwordSet',
//       key: 'passwordSet',
//       render: (passwordSet) => (
//         <Tag color={passwordSet ? 'green' : 'red'}>
//           {passwordSet ? 'Password Set' : 'Not Set'}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Button onClick={() => showPasswordModal(record)}>Set Password</Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Input.Search
//         placeholder="Search by Enrollment ID"
//         onSearch={handleSearch}
//         style={{ marginBottom: 16, width: '14rem' }}
//       />
//       <Table
//         columns={userColumns}
//         dataSource={filteredUsers}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//       />
      
//       <Modal
//         title="Set Password"
//         open={isPasswordModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleUpdatePassword}>
//           <Form.Item label="Enrollment ID" name="enrollmentId">
//             <Input disabled />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please input the new password!' }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Set Password
//             </Button>
//             <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
//               Cancel
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Managersetpassword;


import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Tag, Radio } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Managersetpassword = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [managerService, setManagerService] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [form] = Form.useForm();
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    fetchManagerService();
  }, []);

  useEffect(() => {
    if (managerService) {
      fetchUsers();
    }
  }, [managerService, selectedService]);

  const fetchManagerService = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/managers/${managerId}`);
      const service = response.data.service;
      setManagerService(service);
      if (service === 'AMAZON') {
        setSelectedService('AMAZON');
      } else if (service === 'WEBSITE') {
        setSelectedService('WEBSITE');
      }
    } catch (error) {
      console.error('Error fetching manager service:', error);
      message.error('Failed to load manager service.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      const usersData = response.data;
      filterUsers(usersData, selectedService);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to load users.');
    }
  };

  const filterUsers = (users, service) => {
    const filteredData = users.filter(user => user.service === service);
    setFilteredUsers(filteredData);
  };

  const showPasswordModal = (user) => {
    setCurrentUser(user);
    setIsPasswordModalVisible(true);
    form.setFieldsValue({ enrollmentId: user.enrollmentId });
  };

  const handleUpdatePassword = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/update-password/${currentUser._id}`, values);
      message.success('Password updated successfully');
      setIsPasswordModalVisible(false);
      form.resetFields();
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error updating password:', error);
      message.error('Failed to update password');
    }
  };

  const handleCancel = () => {
    setIsPasswordModalVisible(false);
    setCurrentUser(null);
    form.resetFields();
  };

  const handleSearch = (value) => {
    const filteredData = users.filter(user => user.enrollmentId.includes(value));
    setFilteredUsers(filteredData);
  };

  const handleServiceChange = (e) => {
    const newService = e.target.value;
    setSelectedService(newService);
    filterUsers(users, newService);
  };

  const userColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Password Status',
      dataIndex: 'passwordSet',
      key: 'passwordSet',
      render: (passwordSet) => (
        <Tag color={passwordSet ? 'green' : 'red'}>
          {passwordSet ? 'Password Set' : 'Not Set'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => showPasswordModal(record)}>Set Password</Button>
      ),
    },
  ];

  return (
    <>
      {managerService === 'AMAZON' && (
        <Radio.Group onChange={handleServiceChange} value={selectedService} style={{ marginBottom: 16 }}>
          <Radio.Button value="AMAZON">AMAZON</Radio.Button>
          <Radio.Button value="FRANCHISE">FRANCHISE</Radio.Button>
        </Radio.Group>
      )}

      {managerService === 'WEBSITE' && (
        <Radio.Group value="WEBSITE" style={{ marginBottom: 16 }} disabled>
          <Radio.Button value="WEBSITE">WEBSITE</Radio.Button>
        </Radio.Group>
      )}

      <Input.Search
        placeholder="Search by Enrollment ID"
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: '14rem' }}
      />
      <Table
        columns={userColumns}
        dataSource={filteredUsers}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Set Password"
        open={isPasswordModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdatePassword}>
          <Form.Item label="Enrollment ID" name="enrollmentId">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Password
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Managersetpassword;
