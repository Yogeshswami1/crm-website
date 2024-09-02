import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Rmdtab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRmd, setSelectedRmd] = useState(null);
  const [rmd, setRmd] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchRmd();
  }, []);

  const fetchRmd = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/rmd`);
      setRmd(response.data);
    } catch (error) {
      message.error('Failed to fetch rmd');
    }
  };

  const columns = [
    {
      title: 'RMD ID',
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
        <Button type="danger" onClick={() => deleteRmd(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (rmd) => {
    setSelectedRmd(rmd);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: rmd.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRmd(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddRmd = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/rmd/${selectedRmd.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchRmd();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewRmd = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/rmd`, values);
      message.success('RMD added successfully');
      fetchRmd();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add RMD');
    }
  };

  const deleteRmd = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/rmd/${id}`);
      message.success('RMD deleted successfully');
      fetchRmd();
    } catch (error) {
      message.error('Failed to delete RMD');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRmd}>
        Add RMD
      </Button>
      <Table columns={columns} dataSource={rmd} rowKey="id" />

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

      <Modal title="Add RMD" visible={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewRmd}>
          <Form.Item label="RMD ID" name="id" rules={[{ required: true, message: 'Please select the RMD ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select RMD ID</option>
              <option value="RMD1">RMD1</option>
              <option value="RMD2">RMD2</option>
              <option value="RMD3">RMD3</option>
              <option value="RMD4">RMD4</option>
              <option value="RMD5">RMD5</option>
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

export default Rmdtab;
