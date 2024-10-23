// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Select } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const PaymentGatewayMediumModal = ({ visible, onCancel, record, fetchData }) => {
//   const [paymentGatewayMedium, setPaymentGatewayMedium] = useState('');


//   const apiUrl = process.env.REACT_APP_BACKEND_URL;


//   // Effect to set the initial value when the modal opens
//   useEffect(() => {
//     if (visible) {
//       setPaymentGatewayMedium(record.paymentGatewayMedium || '');
//     }
//   }, [visible, record]);


//   const handleSave = async () => {
//     try {
//       // Make a PUT request to update the paymentGatewayMedium
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         paymentGatewayMedium,
//       });


//       toast.success("Payment Gateway Medium updated successfully");
//       fetchData(); // Refresh the data
//       onCancel();  // Close the modal
//     } catch (error) {
//       toast.error("Failed to update Payment Gateway Medium");
//     }
//   };


//   return (
//     <Modal
//       title="Payment Gateway Medium"
//       open={visible}
//       onCancel={onCancel}
//       onOk={handleSave}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Select Payment Gateway Medium">
//           <Select
//             value={paymentGatewayMedium}
//             onChange={(value) => setPaymentGatewayMedium(value)}
//           >
//             <Select.Option value="Instamojo">Instamojo</Select.Option>
//             <Select.Option value="Razor Pay">Razor Pay</Select.Option>
//             <Select.Option value="CC Avenue">CC Avenue</Select.Option>
//             <Select.Option value="Cash Free">Cash Free</Select.Option>
//             <Select.Option value="Custom">Custom</Select.Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };


// export default PaymentGatewayMediumModal;




import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';


const PaymentGatewayMediumModal = ({ visible, onCancel, record, fetchData }) => {
 const [paymentGatewayMedium, setPaymentGatewayMedium] = useState('');
 const [isCustom, setIsCustom] = useState(false);
 const [customValue, setCustomValue] = useState('');


 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 // Effect to set the initial value when the modal opens
 useEffect(() => {
   if (visible) {
     const initialMedium = record.paymentGatewayMedium || '';
     setPaymentGatewayMedium(initialMedium);
     setIsCustom(initialMedium === 'Custom');
     setCustomValue(initialMedium === 'Custom' ? record.customPaymentGateway || '' : '');
   }
 }, [visible, record]);


 const handleSave = async () => {
   try {
     // Make a PUT request to update the paymentGatewayMedium
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       paymentGatewayMedium: isCustom ? customValue : paymentGatewayMedium,
     });


     toast.success("Payment Gateway Medium updated successfully");
     fetchData(); // Refresh the data
     onCancel();  // Close the modal
   } catch (error) {
     toast.error("Failed to update Payment Gateway Medium");
   }
 };


 const handleSelectChange = (value) => {
   setPaymentGatewayMedium(value);
   setIsCustom(value === 'Custom');
 };


 return (
   <Modal
     title="Payment Gateway Medium"
     open={visible}
     onCancel={onCancel}
     onOk={handleSave}
   >
     <Form layout="vertical">
       <Form.Item label="Select Payment Gateway Medium">
         <Select
           value={paymentGatewayMedium}
           onChange={handleSelectChange}
         >
           <Select.Option value="Instamojo">Instamojo</Select.Option>
           <Select.Option value="Razor Pay">Razor Pay</Select.Option>
           <Select.Option value="CC Avenue">CC Avenue</Select.Option>
           <Select.Option value="Cash Free">Cash Free</Select.Option>
           <Select.Option value="Custom">Custom</Select.Option>
         </Select>
       </Form.Item>


       {isCustom && (
         <Form.Item label="Custom Payment Gateway Medium">
           <Input
             value={customValue}
             onChange={(e) => setCustomValue(e.target.value)}
             placeholder="Enter custom payment gateway medium"
           />
         </Form.Item>
       )}
     </Form>
   </Modal>
 );
};


export default PaymentGatewayMediumModal;





