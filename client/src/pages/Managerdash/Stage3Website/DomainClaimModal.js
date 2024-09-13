import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const DomainClaimModal = ({ visible, onCancel, record, fetchData }) => {
  const [domainClaimStatus, setDomainClaimStatus] = useState('');
  const [domainClaimDate, setDomainClaimDate] = useState(null);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (record) {
      setDomainClaimStatus(record.domainClaim || ''); // Set the status if it exists
      setDomainClaimDate(record.domainClaimDate ? moment(record.domainClaimDate) : null); // Set the date
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        domainClaim: domainClaimStatus,
        domainClaimDate: domainClaimDate ? domainClaimDate.toISOString() : null,
      });
      toast.success('Domain Claim updated successfully');
      fetchData();
      onCancel();
    } catch (error) {
      toast.error('Failed to update Domain Claim');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Domain Claim"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span>Status: </span>
        <Input
          value={domainClaimStatus}
          onChange={(e) => setDomainClaimStatus(e.target.value)}
          placeholder="Enter Values"
        />
      </div>

      <DatePicker
        value={domainClaimDate} // Ensure this is a moment object
        onChange={(date) => setDomainClaimDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
        style={{ width: '100%' }}
      />
    </Modal>
  );
};

export default DomainClaimModal;
