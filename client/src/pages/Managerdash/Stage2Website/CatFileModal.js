import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify';

const CatFileModal = ({ visible, onCancel, record, fetchData }) => {
  const [catFileStatus, setCatFileStatus] = useState(false); // Default to "Not Done"
  const [catDate, setCatDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setCatFileStatus(record.catFile === 'Done'); // Set switch based on status
      setCatDate(record.catDate ? moment(record.catDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        catFile: catFileStatus ? 'Done' : 'Not Done',
        catDate: catDate ? catDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Cat file updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update cat file');
    }
  };

  const disabledDate = (current) => {
    // Disable dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Cat File"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span>Status: </span>
        <Switch
          checked={catFileStatus}
          onChange={(checked) => setCatFileStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={catDate} // Ensure this is a moment object
        onChange={(date) => setCatDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default CatFileModal;
