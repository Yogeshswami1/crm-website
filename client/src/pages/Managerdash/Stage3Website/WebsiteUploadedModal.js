import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify';

const WebsiteUploadedModal = ({ visible, onCancel, record, fetchData }) => {
  const [websiteUploadedStatus, setWebsiteUploadedStatus] = useState(false); 
  const [websiteUploadedDate, setWebsiteUploadedDate] = useState(null); 

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  
  useEffect(() => {
    if (record) {
      setWebsiteUploadedStatus(record.websiteUploaded === 'Done'); // Set switch based on status
      setWebsiteUploadedDate(record.websiteUploadedDate ? moment(record.websiteUploadedDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        websiteUploaded: websiteUploadedStatus ? 'Done' : 'Not Done',
        websiteUploadedDate: websiteUploadedDate ? websiteUploadedDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Website Uploaded updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update website uploaded');
    }
  };

  const disabledDate = (current) => {
    // Can only select today and future dates
    return current && current < moment().startOf('day');
  };

  return (
    <Modal
      title="Website Uploaded"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span>Status: </span>
        <Switch
          checked={websiteUploadedStatus}
          onChange={(checked) => setWebsiteUploadedStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={websiteUploadedDate} // Ensure this is a moment object
        onChange={(date) => setWebsiteUploadedDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default WebsiteUploadedModal;
