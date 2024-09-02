// import React, { useState } from 'react';
// import { Modal, Button, Input, Select, message, Form } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const QuoraModal = ({ visible, onCancel, contact, onUpdate }) => {
//   const [quoraDetails, setQuoraDetails] = useState({
//     accountOpenQuora: contact.accountOpenQuora || '',
//     quoraId: contact.quoraId || '',
//     quoraPassword: contact.quoraPassword || '',
//     postQuora: contact.postQuora || 'Not Done',
//   });

//   const handleQuoraChange = (field, value) => {
//     setQuoraDetails({ ...quoraDetails, [field]: value });
//   };

//   const handleQuoraSave = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
//         accountOpenQuora: quoraDetails.accountOpenQuora,
//         quoraId: quoraDetails.quoraId,
//         quoraPassword: quoraDetails.quoraPassword,
//         postQuora: quoraDetails.postQuora,
//       });
//       message.success("Quora details updated successfully");
//       onUpdate();  // Call the callback to refresh data
//       onCancel();  // Close the modal
//     } catch (error) {
//       message.error("Failed to update Quora details");
//     }
//   };

//   return (
//     <Modal
//       title="Quora Details"
//       open={visible}
//       onOk={handleQuoraSave}
//       onCancel={onCancel}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Account Open Status">
//           <Select
//             value={quoraDetails.accountOpenQuora}
//             onChange={(value) => handleQuoraChange('accountOpenQuora', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Already Have">Already Have</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Quora ID">
//           <Input
//             placeholder="Enter Quora ID"
//             value={quoraDetails.quoraId}
//             onChange={(e) => handleQuoraChange('quoraId', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Quora Password">
//           <Input.Password
//             placeholder="Enter Quora Password"
//             value={quoraDetails.quoraPassword}
//             onChange={(e) => handleQuoraChange('quoraPassword', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Meta Connection Status">
//           <Select
//             value={quoraDetails.postQuora}
//             onChange={(value) => handleQuoraChange('postQuora', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Not Done">Not Done</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default QuoraModal;


import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

const QuoraModal = ({ visible, onCancel, contact, onUpdate }) => {
  const [quoraDetails, setQuoraDetails] = useState({
    accountOpenQuora: '',
    quoraId: '',
    quoraPassword: '',
    postQuora: '',
  });

  // Update state when contact prop changes
  useEffect(() => {
    if (contact) {
      setQuoraDetails({
        accountOpenQuora: contact.accountOpenQuora || '',
        quoraId: contact.quoraId || '',
        quoraPassword: contact.quoraPassword || '',
        postQuora: contact.postQuora || '',
      });
    }
  }, [contact]);

  const handleQuoraChange = (field, value) => {
    setQuoraDetails({ ...quoraDetails, [field]: value });
  };

  const handleQuoraSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
        accountOpenQuora: quoraDetails.accountOpenQuora,
        quoraId: quoraDetails.quoraId,
        quoraPassword: quoraDetails.quoraPassword,
        postQuora: quoraDetails.postQuora,
      });
      message.success("Quora details updated successfully");
      onUpdate();  // Call the callback to refresh data
      onCancel();  // Close the modal
    } catch (error) {
      message.error("Failed to update Quora details");
    }
  };

  return (
    <Modal
      title="Quora Details"
      open={visible}
      onOk={handleQuoraSave}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select
            value={quoraDetails.accountOpenQuora}
            onChange={(value) => handleQuoraChange('accountOpenQuora', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Already Have">Already Have</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Quora ID">
          <Input
            placeholder="Enter Quora ID"
            value={quoraDetails.quoraId}
            onChange={(e) => handleQuoraChange('quoraId', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Quora Password">
          <Input.Password
            placeholder="Enter Quora Password"
            value={quoraDetails.quoraPassword}
            onChange={(e) => handleQuoraChange('quoraPassword', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Post Status">
          <Select
            value={quoraDetails.postQuora}
            onChange={(value) => handleQuoraChange('postQuora', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuoraModal;
