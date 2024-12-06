import React, { useState, useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';


const PaymentIntegrationModal = ({ visible, onCancel, record, fetchData }) => {
 const [paymentIntegration, setPaymentIntegration] = useState('');


 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 // Effect to set the initial value when the modal opens
 useEffect(() => {
   if (visible) {
     setPaymentIntegration(record.paymentIntegration || ''); // Set initial value from record
   }
 }, [visible, record]);


 const handleSave = async () => {
   try {
     // Make a PUT request to update the paymentIntegration
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       paymentIntegration,
     });


     toast.success("Payment Integration updated successfully");
     fetchData(); // Refresh the data
     onCancel();  // Close the modal
   } catch (error) {
     toast.error("Failed to update Payment Integration");
   }
 };


 return (
   <Modal
     title="Payment Integration Status"
     open={visible}
     onCancel={onCancel}
     onOk={handleSave}
   >
     <Form layout="vertical">
     <Form.Item label="Select Payment Integration Status">
  <Select
    value={paymentIntegration}
    onChange={(value) => setPaymentIntegration(value)}
  >
    <Select.Option value="Done">Done</Select.Option>
    <Select.Option value="Not Done">Not Done</Select.Option>
  </Select>
</Form.Item>

     </Form>
   </Modal>
 );
};


export default PaymentIntegrationModal;





