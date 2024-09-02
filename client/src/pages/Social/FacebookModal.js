// import React, { useState } from 'react';
// import { Modal, Button, Input, Select, message, Form } from 'antd';
// import axios from 'axios';

// const { Option } = Select;

// const FacebookModal = ({ visible, onCancel, contact, onUpdate }) => {
//   const [facebookDetails, setFacebookDetails] = useState({
//     accountOpenFacebook: contact.accountOpenFacebook || '',
//     facebookId: contact.facebookId || '',
//     facebookPassword: contact.facebookPassword || '',
//     metaConnectedFacebook: contact.metaConnectedFacebook || '',
//   });

//   const handleFacebookChange = (field, value) => {
//     setFacebookDetails({ ...facebookDetails, [field]: value });
//   };

//   const handleFacebookSave = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
//         accountOpenFacebook: facebookDetails.accountOpenFacebook,
//         facebookId: facebookDetails.facebookId,
//         facebookPassword: facebookDetails.facebookPassword,
//         metaConnectedFacebook: facebookDetails.metaConnectedFacebook,
//       });
//       message.success("Facebook details updated successfully");
//       onUpdate();  // Call the callback to refresh data
//       onCancel();  // Close the modal
//     } catch (error) {
//       message.error("Failed to update Facebook details");
//     }
//   };

//   return (
//     <Modal
//       title="Facebook Details"
//       open={visible}
//       onOk={handleFacebookSave}
//       onCancel={onCancel}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Account Open Status">
//           <Select
//             value={facebookDetails.accountOpenFacebook}
//             onChange={(value) => handleFacebookChange('accountOpenFacebook', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Already Have">Already Have</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Facebook ID">
//           <Input
//             placeholder="Enter Facebook ID"
//             value={facebookDetails.facebookId}
//             onChange={(e) => handleFacebookChange('facebookId', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Facebook Password">
//           <Input.Password
//             placeholder="Enter Facebook Password"
//             value={facebookDetails.facebookPassword}
//             onChange={(e) => handleFacebookChange('facebookPassword', e.target.value)}
//           />
//         </Form.Item>

//         <Form.Item label="Meta Connection Status">
//           <Select
//             value={facebookDetails.metaConnectedFacebook}
//             onChange={(value) => handleFacebookChange('metaConnectedFacebook', value)}
//           >
//             <Option value="Done">Done</Option>
//             <Option value="Not Done">Not Done</Option>
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default FacebookModal;


import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

const FacebookModal = ({ visible, onCancel, contact, onUpdate }) => {
  const [facebookDetails, setFacebookDetails] = useState({
    accountOpenFacebook: '',
    facebookId: '',
    facebookPassword: '',
    metaConnectedFacebook: '',
  });

  // Update state when contact prop changes
  useEffect(() => {
    if (contact) {
      setFacebookDetails({
        accountOpenFacebook: contact.accountOpenFacebook || '',
        facebookId: contact.facebookId || '',
        facebookPassword: contact.facebookPassword || '',
        metaConnectedFacebook: contact.metaConnectedFacebook || '',
      });
    }
  }, [contact]);

  const handleFacebookChange = (field, value) => {
    setFacebookDetails({ ...facebookDetails, [field]: value });
  };

  const handleFacebookSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
        accountOpenFacebook: facebookDetails.accountOpenFacebook,
        facebookId: facebookDetails.facebookId,
        facebookPassword: facebookDetails.facebookPassword,
        metaConnectedFacebook: facebookDetails.metaConnectedFacebook,
      });
      message.success("Facebook details updated successfully");
      onUpdate();  // Call the callback to refresh data
      onCancel();  // Close the modal
    } catch (error) {
      message.error("Failed to update Facebook details");
    }
  };

  return (
    <Modal
      title="Facebook Details"
      open={visible}
      onOk={handleFacebookSave}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select
            value={facebookDetails.accountOpenFacebook}
            onChange={(value) => handleFacebookChange('accountOpenFacebook', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Already Have">Already Have</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Facebook ID">
          <Input
            placeholder="Enter Facebook ID"
            value={facebookDetails.facebookId}
            onChange={(e) => handleFacebookChange('facebookId', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Facebook Password">
          <Input.Password
            placeholder="Enter Facebook Password"
            value={facebookDetails.facebookPassword}
            onChange={(e) => handleFacebookChange('facebookPassword', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Meta Connection Status">
          <Select
            value={facebookDetails.metaConnectedFacebook}
            onChange={(value) => handleFacebookChange('metaConnectedFacebook', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FacebookModal;
