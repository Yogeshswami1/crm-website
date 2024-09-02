import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Accountanttab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedAccountant, setSelectedAccountant] = useState(null);
  const [accountants, setAccountants] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchAccountants();
  }, []);

  const fetchAccountants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/accountants`);
      setAccountants(response.data);
    } catch (error) {
      message.error('Failed to fetch accountants');
    }
  };

  const columns = [
    {
      title: 'Accountant ID',
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
        <Button type="danger" onClick={() => deleteAccountant(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (accountant) => {
    setSelectedAccountant(accountant);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: accountant.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAccountant(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddAccountant = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/accountants/${selectedAccountant.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchAccountants();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewAccountant = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/accountants`, values);
      message.success('Accountant added successfully');
      fetchAccountants();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add accountant');
    }
  };

  const deleteAccountant = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/accountants/${id}`);
      message.success('Accountant deleted successfully');
      fetchAccountants();
    } catch (error) {
      message.error('Failed to delete accountant');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddAccountant}>
        Add Accountant
      </Button>
      <Table columns={columns} dataSource={accountants} rowKey="id" />

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

      <Modal title="Add Accountant" visible={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewAccountant}>
          <Form.Item label="Accountant ID" name="id" rules={[{ required: true, message: 'Please select the accountant ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select Accountant ID</option>
              <option value="AT1">AT1</option>
              <option value="AT2">AT2</option>
              <option value="AT3">AT3</option>
              <option value="AT4">AT4</option>
              <option value="AT5">AT5</option>
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

export default Accountanttab;
