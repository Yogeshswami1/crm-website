import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const DomainMailVerificationModal = ({ visible, onCancel, record, fetchData }) => {
  const [domainMailVerificationStatus, setDomainMailVerificationStatus] = useState(false);
  const [domainMailVerificationDate, setDomainMailVerificationDate] = useState(null);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (record) {
      setDomainMailVerificationStatus(record.domainMailVerification === 'Done');
      setDomainMailVerificationDate(record.domainMailVerificationDate ? moment(record.domainMailVerificationDate) : null);
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        domainMailVerification: domainMailVerificationStatus ? 'Done' : 'Not Done',
        domainMailVerificationDate: domainMailVerificationDate ? domainMailVerificationDate.toISOString() : null,
      });
      toast.success('Domain Mail Verification updated successfully');
      fetchData();
      onCancel();
    } catch (error) {
      toast.error('Failed to update Domain Mail Verification');
    }
  };

  const disabledDate = (current) => {
    // Can only select yesterday, today, and future dates
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Domain Mail Verification"
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
          checked={domainMailVerificationStatus}
          onChange={(checked) => setDomainMailVerificationStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={domainMailVerificationDate} // Ensure this is a moment object
        onChange={(date) => setDomainMailVerificationDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default DomainMailVerificationModal;
