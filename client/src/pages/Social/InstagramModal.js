import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

const InstagramModal = ({ visible, onCancel, contact, onUpdate }) => {
  const [instagramDetails, setInstagramDetails] = useState({
    accountOpenInsta: '',
    instagramId: '',
    instagramPassword: '',
    metaConnectedInsta: '',
  });

  useEffect(() => {
    // Reset form fields whenever contact changes
    if (contact) {
      setInstagramDetails({
        accountOpenInsta: contact.accountOpenInsta || '',
        instagramId: contact.instagramId || '',
        instagramPassword: contact.instagramPassword || '',
        metaConnectedInsta: contact.metaConnectedInsta || '',
      });
    }
  }, [contact]);

  const handleInstagramChange = (field, value) => {
    setInstagramDetails({ ...instagramDetails, [field]: value });
  };

  const handleInstagramSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/contact/${contact._id}`, {
        accountOpenInsta: instagramDetails.accountOpenInsta,
        instagramId: instagramDetails.instagramId,
        instagramPassword: instagramDetails.instagramPassword,
        metaConnectedInsta: instagramDetails.metaConnectedInsta,
      });
      message.success("Instagram details updated successfully");
      onUpdate();  // Call the callback to refresh data
      onCancel();  // Close the modal
    } catch (error) {
      message.error("Failed to update Instagram details");
    }
  };

  return (
    <Modal
      title="Instagram Details"
      visible={visible}
      onOk={handleInstagramSave}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Account Open Status">
          <Select
            value={instagramDetails.accountOpenInsta}
            onChange={(value) => handleInstagramChange('accountOpenInsta', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Already Have">Already Have</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Instagram ID">
          <Input
            placeholder="Enter Instagram ID"
            value={instagramDetails.instagramId}
            onChange={(e) => handleInstagramChange('instagramId', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Instagram Password">
          <Input.Password
            placeholder="Enter Instagram Password"
            value={instagramDetails.instagramPassword}
            onChange={(e) => handleInstagramChange('instagramPassword', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Meta Connection Status">
          <Select
            value={instagramDetails.metaConnectedInsta}
            onChange={(value) => handleInstagramChange('metaConnectedInsta', value)}
          >
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InstagramModal;
