import React, { useState } from 'react';
import { Modal, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const SocialContentModal = ({ visible, onCancel, record, fetchData }) => {
  const [socialMediaStatus, setSocialMediaStatus] = useState(record.socialMedia1 === 'Completed');
  const [socialMediaCompletionDate, setSocialMediaCompletionDate] = useState(record.socialMediaDate1 ? moment(record.socialMediaDate1) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        socialMedia1: socialMediaStatus ? 'Completed' : 'Not Completed',
        socialMediaDate1: socialMediaCompletionDate ? socialMediaCompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Social Media status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Social Media status");
    }
  };

  return (
    <Modal title="Social Media Completion" open={visible} onCancel={onCancel} onOk={handleSave}>
      <div style={{ marginBottom: '16px' }}>
        <span>Status: </span>
        <Switch
          checked={socialMediaStatus}
          onChange={(checked) => setSocialMediaStatus(checked)}
          checkedChildren="Completed"
          unCheckedChildren="Not Completed"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <span>Completion Date: </span>
        <DatePicker
          value={socialMediaCompletionDate}
          onChange={(date) => setSocialMediaCompletionDate(date)}
          disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default SocialContentModal;
