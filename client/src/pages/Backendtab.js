import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Backendtab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedBackendUser, setSelectedBackendUser] = useState(null);
  const [backendUsers, setBackendUsers] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchBackendUsers();
  }, []);

  const fetchBackendUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/backend`);
      setBackendUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch backend users');
    }
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text, record) => (
        <Button onClick={() => showPasswordModal(record)}>Change Password</Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="danger" onClick={() => deleteBackendUser(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (backendUser) => {
    setSelectedBackendUser(backendUser);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: backendUser.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBackendUser(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddBackendUser = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/backend/${selectedBackendUser.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchBackendUsers();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewBackendUser = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/backend`, values);
      message.success('Backend user added successfully');
      fetchBackendUsers();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add backend user');
    }
  };

  const deleteBackendUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/backend/${id}`);
      message.success('Backend user deleted successfully');
      fetchBackendUsers();
    } catch (error) {
      message.error('Failed to delete backend user');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddBackendUser}>
        Add Backend User
      </Button>
      <Table columns={columns} dataSource={backendUsers} rowKey="id" />

      <Modal title="Change Password" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handlePasswordChange}>
          <Form.Item label="Previous Password" name="prevPassword">
            <Input disabled />
          </Form.Item>
          <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please input the new password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Add Backend User" visible={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewBackendUser}>
          <Form.Item label="User ID" name="id" rules={[{ required: true, message: 'Please select the user ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select User ID</option>
              <option value="BU1">BU1</option>
              <option value="BU2">BU2</option>
              <option value="BU3">BU3</option>
              <option value="BU4">BU4</option>
              <option value="BU5">BU5</option>
            </select>
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input the password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Backendtab;
