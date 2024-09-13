import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const BannerModal = ({ visible, onCancel, record, fetchData }) => {
  const [bannerStatus, setBannerStatus] = useState(false); // Default to "Not Done"
  const [bannerDate, setBannerDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setBannerStatus(record.banner === 'Done'); // Set switch based on status
      setBannerDate(record.bannerDate ? moment(record.bannerDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        banner: bannerStatus ? 'Done' : 'Not Done',
        bannerDate: bannerDate ? bannerDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Banner updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Banner');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Banner"
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
          checked={bannerStatus}
          onChange={(checked) => setBannerStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={bannerDate} // Ensure this is a moment object
        onChange={(date) => setBannerDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default BannerModal;
