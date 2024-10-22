import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm } from 'antd';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const BatchTable = () => {
 const [dataSource, setDataSource] = useState([]);
 const [loading, setLoading] = useState(false);
 const [editingRecord, setEditingRecord] = useState(null);
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [form] = Form.useForm();


 useEffect(() => {
   fetchBatches();
 }, []);


 const fetchBatches = async () => {
   setLoading(true);
   try {
     const response = await axios.get(`${apiUrl}/api/batches/get`);
     setDataSource(response.data);
   } catch (error) {
     console.error("Error fetching batches:", error);
   } finally {
     setLoading(false);
   }
 };


 const handleAdd = () => {
   form.resetFields();
   setEditingRecord(null);
   setIsModalVisible(true);
 };


 const handleEdit = (record) => {
   setEditingRecord(record);
   form.setFieldsValue(record);
   setIsModalVisible(true);
 };


 const handleDelete = async (id) => {
   try {
     await axios.delete(`${apiUrl}/api/batches/${id}`);
     fetchBatches();
   } catch (error) {
     console.error("Error deleting batch:", error);
   }
 };


 const handleSave = async (values) => {
   if (editingRecord) {
     // Update existing batch
     try {
       await axios.put(`${apiUrl}/api/batches/${editingRecord._id}`, values);
       fetchBatches();
     } catch (error) {
       console.error("Error updating batch:", error);
     }
   } else {
     // Add new batch
     try {
       await axios.post(`${apiUrl}/api/batches`, values);
       fetchBatches();
     } catch (error) {
       console.error("Error adding batch:", error);
     }
   }
   setIsModalVisible(false);
 };


 const columns = [
   {
     title: 'Sr No.',
     render: (_, __, index) => index + 1,
     key: 'srNo',
   },
   {
     title: 'Batch',
     dataIndex: 'batchName',
     key: 'batchName',
   },
   {
     title: 'Actions',
     key: 'actions',
     render: (record) => (
       <>
         <Button onClick={() => handleEdit(record)} type="primary">Edit</Button>
         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
           <Button danger>Delete</Button>
         </Popconfirm>
       </>
     ),
   },
 ];


 return (
   <div>
     <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
       Add Batch
     </Button>
     <Table
       dataSource={dataSource}
       columns={columns}
       rowKey="_id"
       loading={loading}
       pagination={false}
     />
     <Modal
       title={editingRecord ? "Edit Batch" : "Add Batch"}
       visible={isModalVisible}
       onCancel={() => setIsModalVisible(false)}
       onOk={() => form.submit()}
     >
       <Form form={form} onFinish={handleSave}>
         <Form.Item
           name="batchName"
           label="Batch Name"
           rules={[{ required: true, message: 'Please enter batch name' }]}
         >
           <Input />
         </Form.Item>
       </Form>
     </Modal>
   </div>
 );
};


export default BatchTable;





