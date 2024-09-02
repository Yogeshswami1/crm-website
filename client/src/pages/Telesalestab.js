import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Telesalestab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTelesales, setSelectedTelesales] = useState(null);
  const [telesales, setTelesales] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchTelesales();
  }, []);

  const fetchTelesales = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/telesales`);
      setTelesales(response.data);
    } catch (error) {
      message.error('Failed to fetch telesales');
    }
  };

  const columns = [
    {
      title: 'Telesales ID',
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
        <Button type="danger" onClick={() => deleteTelesales(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (telesales) => {
    setSelectedTelesales(telesales);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: telesales.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTelesales(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddTelesales = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/telesales/${selectedTelesales.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchTelesales();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewTelesales = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/telesales`, values);
      message.success('Telesales added successfully');
      fetchTelesales();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add telesales');
    }
  };

  const deleteTelesales = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/telesales/${id}`);
      message.success('Telesales deleted successfully');
      fetchTelesales();
    } catch (error) {
      message.error('Failed to delete telesales');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddTelesales}>
        Add Telesales
      </Button>
      <Table columns={columns} dataSource={telesales} rowKey="id" />

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

      <Modal title="Add Telesales" open={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewTelesales}>
          <Form.Item label="Telesales ID" name="id" rules={[{ required: true, message: 'Please select the telesales ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select Telesales ID</option>
              <option value="TS1">TS1</option>
              <option value="TS2">TS2</option>
              <option value="TS3">TS3</option>
              <option value="TS4">TS4</option>
              <option value="TS5">TS5</option>
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

export default Telesalestab;
