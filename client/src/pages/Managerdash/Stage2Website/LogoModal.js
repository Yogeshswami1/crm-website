import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const LogoModal = ({ visible, onCancel, record, fetchData }) => {
  const [logoStatus, setLogoStatus] = useState(false); // Default to "Not Done"
  const [logoDate, setLogoDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setLogoStatus(record.logo === 'Done'); // Set switch based on status
      setLogoDate(record.logoDate ? moment(record.logoDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        logo: logoStatus ? 'Done' : 'Not Done',
        logoDate: logoDate ? logoDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Logo updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Logo');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Logo"
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
          checked={logoStatus}
          onChange={(checked) => setLogoStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={logoDate} // Ensure this is a moment object
        onChange={(date) => setLogoDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default LogoModal;
