// import React, { useState } from 'react';
// import { Modal, Button, Input, Select, message, Form } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const MediumModal = ({ visible, onCancel, contact, onUpdate }) => {
//   const [mediumDetails, setMediumDetails] = useState({
//     accountOpenMedium: contact.accountOpenMedium || '',
//     mediumId: contact.mediumId || '',
//     mediumPassword: contact.mediumPassword || '',
//     postMedium: contact.postMedium || 'Not Done',
//   });

//   const handleMediumChange = (field, value) => {
//     setMediumDetails({ ...mediumDetails, [field]: value });
//   };

//   const handleMediumSave = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
//         accountOpenMedium: mediumDetails.accountOpenMedium,
//         mediumId: mediumDetails.mediumId,
//         mediumPassword: mediumDetails.mediumPassword,
//         postMedium: mediumDetails.postMedium,
//       });
//       message.success("Medium details updated successfully");
//       onUpdate();  // Call the callback to refresh data
//       onCancel();  // Close the modal
//     } catch (error) {
//       message.error("Failed to update Medium details");
//     }
//   };

//   return (
//     <Modal
//       title="Medium Details"
//       open={visible}
//       onOk={handleMediumSave}
//       onCancel={onCancel}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Account Open Status">
//           <Select
//             value={mediumDetails.accountOpenMedium}
//             onChange={(value) => handleMediumChange('accountOpenMedium', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Already Have">Already Have</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Medium ID">
//           <Input
//             placeholder="Enter Medium ID"
//             value={mediumDetails.mediumId}
//             onChange={(e) => handleMediumChange('mediumId', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Medium Password">
//           <Input.Password
//             placeholder="Enter Medium Password"
//             value={mediumDetails.mediumPassword}
//             onChange={(e) => handleMediumChange('mediumPassword', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Meta Connection Status">
//           <Select
//             value={mediumDetails.postMedium}
//             onChange={(value) => handleMediumChange('postMedium', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Not Done">Not Done</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default MediumModal;


import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

const MediumModal = ({ visible, onCancel, contact, onUpdate }) => {
  const [mediumDetails, setMediumDetails] = useState({
    accountOpenMedium: '',
    mediumId: '',
    mediumPassword: '',
    postMedium: '',
  });

  // Update state when contact prop changes
  useEffect(() => {
    if (contact) {
      setMediumDetails({
        accountOpenMedium: contact.accountOpenMedium || '',
        mediumId: contact.mediumId || '',
        mediumPassword: contact.mediumPassword || '',
        postMedium: contact.postMedium || '',
      });
    }
  }, [contact]);

  const handleMediumChange = (field, value) => {
    setMediumDetails({ ...mediumDetails, [field]: value });
  };

  const handleMediumSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
        accountOpenMedium: mediumDetails.accountOpenMedium,
        mediumId: mediumDetails.mediumId,
        mediumPassword: mediumDetails.mediumPassword,
        postMedium: mediumDetails.postMedium,
      });
      message.success("Medium details updated successfully");
      onUpdate();  // Call the callback to refresh data
      onCancel();  // Close the modal
    } catch (error) {
      message.error("Failed to update Medium details");
    }
  };

  return (
    <Modal
      title="Medium Details"
      open={visible}
      onOk={handleMediumSave}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select
            value={mediumDetails.accountOpenMedium}
            onChange={(value) => handleMediumChange('accountOpenMedium', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Already Have">Already Have</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Medium ID">
          <Input
            placeholder="Enter Medium ID"
            value={mediumDetails.mediumId}
            onChange={(e) => handleMediumChange('mediumId', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Medium Password">
          <Input.Password
            placeholder="Enter Medium Password"
            value={mediumDetails.mediumPassword}
            onChange={(e) => handleMediumChange('mediumPassword', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Post Status">
          <Select
            value={mediumDetails.postMedium}
            onChange={(value) => handleMediumChange('postMedium', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MediumModal;
