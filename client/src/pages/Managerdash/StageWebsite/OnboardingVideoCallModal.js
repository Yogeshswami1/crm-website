import React, { useState } from 'react';
import { Modal, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const OnboardingVideoCallModal = ({ visible, onCancel, record, fetchData }) => {
  const [ovcStatus, setOvcStatus] = useState(record.ovc === 'Done');
  const [ovcDate, setOvcDate] = useState(record.ovcDate ? moment(record.ovcDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Disable all dates before yesterday
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        ovc: ovcStatus ? 'Done' : 'Not Done',
        ovcDate: ovcDate ? ovcDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Onboarding video call status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update onboarding video call status");
    }
  };

  return (
    <Modal title="Onboarding Video Call" open={visible} onCancel={onCancel} onOk={handleSave}>
      <div style={{ marginBottom: '16px' }}>
        <span>Status: </span>
        <Switch
          checked={ovcStatus}
          onChange={(checked) => setOvcStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <span>Date: </span>
        <DatePicker
          value={ovcDate}
          onChange={(date) => setOvcDate(date)}
          disabledDate={disabledDate} // Apply the disabled date logic
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default OnboardingVideoCallModal;
