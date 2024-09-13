import React, { useState } from 'react';
import { Modal, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const IDCardModal = ({ visible, onCancel, record, fetchData }) => {
  const [idCardStatus, setIdCardStatus] = useState(record.idCard === 'Done');
  const [idCardDate, setIdCardDate] = useState(record.idCardDate ? moment(record.idCardDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Disable dates before yesterday
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        idCard: idCardStatus ? 'Done' : 'Not Done',
        idCardDate: idCardDate ? idCardDate.format('YYYY-MM-DD') : null,
      });
      toast.success("ID card status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update ID card status");
    }
  };

  return (
    <Modal title="ID Card" open={visible} onCancel={onCancel} onOk={handleSave}>
      <div style={{ marginBottom: '16px' }}>
        <span>Status: </span>
        <Switch
          checked={idCardStatus}
          onChange={(checked) => setIdCardStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <span>Date: </span>
        <DatePicker
          value={idCardDate}
          onChange={(date) => setIdCardDate(date)}
          disabledDate={disabledDate} // Disable past dates except yesterday
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default IDCardModal;
