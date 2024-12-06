import React, { useState, useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';


const PaypalIntegrationModal = ({ visible, onCancel, record, fetchData }) => {
 const [paypalIntegration, setPaypalIntegration] = useState('');


 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 // Effect to set the initial value when the modal opens
 useEffect(() => {
   if (visible) {
     setPaypalIntegration(record.paypalIntegration || ''); // Set initial value from record
   }
 }, [visible, record]);


 const handleSave = async () => {
   try {
     // Make a PUT request to update the paymentIntegration
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       paypalIntegration,
     });


     toast.success("Paypal Integration updated successfully");
     fetchData(); // Refresh the data
     onCancel();  // Close the modal
   } catch (error) {
     toast.error("Failed to update Paypal Integration");
   }
 };


 return (
   <Modal
     title="Paypal Integration Status"
     open={visible}
     onCancel={onCancel}
     onOk={handleSave}
   >
     <Form layout="vertical">
     <Form.Item label="Select Paypal Integration Status">
  <Select
    value={paypalIntegration}
    onChange={(value) => setPaypalIntegration(value)}
  >
    <Select.Option value="Done">Done</Select.Option>
    <Select.Option value="Not Done">Not Done</Select.Option>
  </Select>
</Form.Item>

     </Form>
   </Modal>
 );
};


export default PaypalIntegrationModal;



