// import React, { useState } from 'react';
// import { Modal, Button, Input, Select, message, Form } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const PinterestModal = ({ visible, onCancel, contact, onUpdate }) => {
//   const [pinterestDetails, setPinterestDetails] = useState({
//     accountOpenPinterest: contact.accountOpenPinterest || '',
//     pinterestId: contact.pinterestId || '',
//     pinterestPassword: contact.pinterestPassword || '',
//     postPinterest: contact.postPinterest || '',
//   });

//   const handlePinterestChange = (field, value) => {
//     setPinterestDetails({ ...pinterestDetails, [field]: value });
//   };

//   const handlePinterestSave = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
//         accountOpenPinterest: pinterestDetails.accountOpenPinterest,
//         pinterestId: pinterestDetails.pinterestId,
//         pinterestPassword: pinterestDetails.pinterestPassword,
//         postPinterest: pinterestDetails.postPinterest,
//       });
//       message.success("Pinterest details updated successfully");
//       onUpdate();  // Call the callback to refresh data
//       onCancel();  // Close the modal
//     } catch (error) {
//       message.error("Failed to update Pinterest details");
//     }
//   };

//   return (
//     <Modal
//       title="Pinterest Details"
//       open={visible}
//       onOk={handlePinterestSave}
//       onCancel={onCancel}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Account Open Status">
//           <Select
//             value={pinterestDetails.accountOpenPinterest}
//             onChange={(value) => handlePinterestChange('accountOpenPinterest', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Already Have">Already Have</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Pinterest ID">
//           <Input
//             placeholder="Enter Pinterest ID"
//             value={pinterestDetails.pinterestId}
//             onChange={(e) => handlePinterestChange('pinterestId', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Pinterest Password">
//           <Input.Password
//             placeholder="Enter Pinterest Password"
//             value={pinterestDetails.pinterestPassword}
//             onChange={(e) => handlePinterestChange('pinterestPassword', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Meta Connection Status">
//           <Select
//             value={pinterestDetails.postPinterest}
//             onChange={(value) => handlePinterestChange('postPinterest', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Not Done">Not Done</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default PinterestModal;

import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

const PinterestModal = ({ visible, onCancel, contact, onUpdate }) => {
  const [pinterestDetails, setPinterestDetails] = useState({
    accountOpenPinterest: '',
    pinterestId: '',
    pinterestPassword: '',
    postPinterest: '',
  });

  // Update state when contact prop changes
  useEffect(() => {
    if (contact) {
      setPinterestDetails({
        accountOpenPinterest: contact.accountOpenPinterest || '',
        pinterestId: contact.pinterestId || '',
        pinterestPassword: contact.pinterestPassword || '',
        postPinterest: contact.postPinterest || '',
      });
    }
  }, [contact]);

  const handlePinterestChange = (field, value) => {
    setPinterestDetails({ ...pinterestDetails, [field]: value });
  };

  const handlePinterestSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
        accountOpenPinterest: pinterestDetails.accountOpenPinterest,
        pinterestId: pinterestDetails.pinterestId,
        pinterestPassword: pinterestDetails.pinterestPassword,
        postPinterest: pinterestDetails.postPinterest,
      });
      message.success("Pinterest details updated successfully");
      onUpdate();  // Call the callback to refresh data
      onCancel();  // Close the modal
    } catch (error) {
      message.error("Failed to update Pinterest details");
    }
  };

  return (
    <Modal
      title="Pinterest Details"
      open={visible}
      onOk={handlePinterestSave}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select
            value={pinterestDetails.accountOpenPinterest}
            onChange={(value) => handlePinterestChange('accountOpenPinterest', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Already Have">Already Have</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Pinterest ID">
          <Input
            placeholder="Enter Pinterest ID"
            value={pinterestDetails.pinterestId}
            onChange={(e) => handlePinterestChange('pinterestId', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Pinterest Password">
          <Input.Password
            placeholder="Enter Pinterest Password"
            value={pinterestDetails.pinterestPassword}
            onChange={(e) => handlePinterestChange('pinterestPassword', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Post With Date Status">
          <Select
            value={pinterestDetails.postPinterest}
            onChange={(value) => handlePinterestChange('postPinterest', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PinterestModal;
