import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Supervisortab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [supervisors, setSupervisors] = useState([]);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/supervisors`);
      setSupervisors(response.data);
    } catch (error) {
      message.error('Failed to fetch supervisors');
    }
  };

  const columns = [
    {
      title: 'Supervisor ID',
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
        <Button type="danger" onClick={() => deleteSupervisor(record.id)}>Delete</Button>
      ),
    },
  ];

  const showPasswordModal = (supervisor) => {
    setSelectedSupervisor(supervisor);
    setIsModalVisible(true);
    form.setFieldsValue({ prevPassword: supervisor.password });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSupervisor(null);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddSupervisor = () => {
    setIsAddModalVisible(true);
  };

  const handlePasswordChange = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/supervisors/${selectedSupervisor.id}`, { password: values.newPassword });
      message.success('Password updated successfully');
      fetchSupervisors();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  const handleAddNewSupervisor = async (values) => {
    try {
      await axios.post(`${apiUrl}/api/supervisors`, values);
      message.success('Supervisor added successfully');
      fetchSupervisors();
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add supervisor');
    }
  };

  const deleteSupervisor = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/supervisors/${id}`);
      message.success('Supervisor deleted successfully');
      fetchSupervisors();
    } catch (error) {
      message.error('Failed to delete supervisor');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddSupervisor}>
        Add Supervisor
      </Button>
      <Table columns={columns} dataSource={supervisors} rowKey="id" />

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

      <Modal title="Add Supervisor" visible={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
        <Form form={addForm} onFinish={handleAddNewSupervisor}>
          <Form.Item label="Supervisor ID" name="id" rules={[{ required: true, message: 'Please select the supervisor ID!' }]}>
            <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
              <option value="">Select Supervisor ID</option>
              <option value="SP1">SP1</option>
              <option value="SP2">SP2</option>
              <option value="SP3">SP3</option>
              <option value="SP4">SP4</option>
              <option value="SP5">SP5</option>
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

export default Supervisortab;
