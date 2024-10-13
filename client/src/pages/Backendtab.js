import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Backendtab = () => {
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [isAddModalVisible, setIsAddModalVisible] = useState(false);
 const [selectedBackend, setSelectedBackend] = useState(null);
 const [backend, setBackend] = useState([]);
 const [form] = Form.useForm();
 const [addForm] = Form.useForm();


 useEffect(() => {
   fetchBackend();
 }, []);


 const fetchBackend = async () => {
   try {
     const response = await axios.get(`${apiUrl}/api/backend`);
     setBackend(response.data);
   } catch (error) {
     message.error('Failed to fetch backend');
   }
 };


 const columns = [
   {
     title: 'Backend ID',
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
       <Button type="danger" onClick={() => deleteBackend(record.id)}>Delete</Button>
     ),
   },
 ];


 const showPasswordModal = (backend) => {
   setSelectedBackend(backend);
   setIsModalVisible(true);
   form.setFieldsValue({ prevPassword: backend.password });
 };


 const handleCancel = () => {
   setIsModalVisible(false);
   setSelectedBackend(null);
 };


 const handleAddCancel = () => {
   setIsAddModalVisible(false);
 };


 const handleAddBackend = () => {
   setIsAddModalVisible(true);
 };


 const handlePasswordChange = async (values) => {
   try {
     await axios.put(`${apiUrl}/api/backend/${selectedBackend.id}`, { password: values.newPassword });
     message.success('Password updated successfully');
     fetchBackend();
     setIsModalVisible(false);
   } catch (error) {
     message.error('Failed to update password');
   }
 };


 const handleAddNewBackend = async (values) => {
   try {
     await axios.post(`${apiUrl}/api/backend`, values);
     message.success('Backend added successfully');
     fetchBackend();
     setIsAddModalVisible(false);
   } catch (error) {
     message.error('Failed to add backend');
   }
 };


 const deleteBackend = async (id) => {
   try {
     await axios.delete(`${apiUrl}/api/backend/${id}`);
     message.success('Backend deleted successfully');
     fetchBackend();
   } catch (error) {
     message.error('Failed to delete backend');
   }
 };


 return (
   <div>
     <Button type="primary" onClick={handleAddBackend}>
       Add Backend User
     </Button>
     <Table columns={columns} dataSource={backend} rowKey="id" />


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


     <Modal title="Add Backend" open={isAddModalVisible} onCancel={handleAddCancel} footer={null}>
       <Form form={addForm} onFinish={handleAddNewBackend}>
         <Form.Item label="Backend ID" name="id" rules={[{ required: true, message: 'Please select the backend ID!' }]}>
           <select onChange={(e) => addForm.setFieldsValue({ id: e.target.value })}>
             <option value="">Select Backend ID</option>
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



