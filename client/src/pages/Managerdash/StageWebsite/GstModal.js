



import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const GSTModal = ({ visible, onCancel, record, fetchData }) => {
 const [form] = Form.useForm();
 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 // Populate form fields when the modal is opened
 useEffect(() => {
   if (record) {
     form.setFieldsValue({
       gst: record.gst === 'Done',
       gstNumber: record.gstNumber || '',
       gstDate: record.gstDate ? moment(record.gstDate) : null,
       reverseGst: record.gst === 'Not Done', // Opposite of the 'gst' field
     });
   }
 }, [record, form]);


 const handleSave = async (values) => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       gst: values.gst ? 'Done' : 'Not Done',
       gstNumber: values.gstNumber,
       gstDate: values.gstDate ? values.gstDate.format('YYYY-MM-DD') : null,
     });
     toast.success("GST details updated successfully");
     fetchData();
     onCancel();
   } catch (error) {
     toast.error("Failed to update GST details");
   }
 };


 const handleReverseToggleChange = (checked) => {
   form.setFieldsValue({
     gst: !checked, // When reverse toggle is changed, update the main gst field
   });
 };


 return (
   <Modal
     title="GST Details"
     open={visible}
     onCancel={onCancel}
     onOk={form.submit} // Submit form when the OK button is clicked
   >
     <Form
       form={form}
       layout="vertical"
       onFinish={handleSave} // Trigger handleSave when form is submitted
     >
       <Form.Item label="GST YES" name="gst" valuePropName="checked">
         <Switch checkedChildren="Yes" unCheckedChildren="No" />
       </Form.Item>


       <Form.Item label="GST NO" name="reverseGst" valuePropName="checked">
         <Switch
           checkedChildren="No"
           unCheckedChildren="Yes"
           onChange={handleReverseToggleChange}
         />
       </Form.Item>


       <Form.Item label="GST Number" name="gstNumber">
         <Input placeholder="Enter GST Number" />
       </Form.Item>


       <Form.Item name="gstDate" label="GST Date">
         <DatePicker style={{ width: '100%' }} />
       </Form.Item>
     </Form>
   </Modal>
 );
};


export default GSTModal;



