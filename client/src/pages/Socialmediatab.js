import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Socialtab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [social, setSocial] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/social`);
      setSocial(response.data);
    } catch (error) {
      message.error('Failed to fetch social media managers');
    }
  };

  const columns = [
    {
      title: 'Social Media Manager ID',
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
        <Button type="danger" onClick={() => deleteSocial(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (social) => {
    setSelectedSocial(social);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: social.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSocial(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddSocial = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/social/${selectedSocial.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchSocial();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewSocial = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/social`, values);
      message.success('Social Media Manager added successfully');
      fetchSocial();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add social media manager');
    }
  };

  const deleteSocial = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/social/${id}`);
      message.success('Social Media Manager deleted successfully');
      fetchSocial();
    } catch (error) {
      message.error('Failed to delete social media manager');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddSocial}>
        Add Social Media Manager
      </Button>
      <Table columns={columns} dataSource={social} rowKey="id" />

      <Modal title="Change Password" open={isModalVisible} onCancel={handleCancel} footer={null}>
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

      <Modal title="Add Social Media Manager" open={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewSocial}>
          <Form.Item label="Social Media Manager ID" name="id" rules={[{ required: true, message: 'Please select the social media manager ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select Manager ID</option>
              <option value="SM1">SM1</option>
              <option value="SM2">SM2</option>
              <option value="SM3">SM3</option>
              <option value="SM4">SM4</option>
              <option value="SM5">SM5</option>
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

export default Socialtab;
