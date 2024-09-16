import React, { useState } from 'react';
import { Modal, Select, DatePicker, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Onboarding = ({ visible, onClose, record }) => {
  const [status, setStatus] = useState(record?.ovc || 'Not Done');
  const [date, setDate] = useState(record?.date ? moment(record.date) : null);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        ovc: `${status} (updated on ${date ? date.format('DD-MM-YYYY') : ''})`,
      });
      toast.success('Onboarding status updated successfully');
      onClose(); // Close the modal after saving
    } catch (error) {
      toast.error('Failed to update onboarding status');
    }
  };

  return (
    <Modal
      title="Select Onboarding Status"
      visible={visible}
      onOk={handleSave}
      onCancel={onClose}
    >
      <div style={{ marginBottom: 16 }}>
        <label>Status: </label>
        <Select
          value={status}
          onChange={setStatus}
          style={{ width: '100%' }}
        >
          <Option value="Done">Done</Option>
          <Option value="Not Done">Not Done</Option>
        </Select>
      </div>
      <div>
        <label>Select Date: </label>
        <DatePicker
          value={date}
          onChange={setDate}
          format="DD-MM-YYYY"
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default Onboarding;
