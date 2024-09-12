import React, { useState } from 'react';
import { Modal, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage1CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [completionStatus, setCompletionStatus] = useState(record?.stage1Completion === 'Done');
  const [completionDate, setCompletionDate] = useState(record.stage1CompletionDate ? moment(record.stage1CompletionDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage1Completion: completionStatus ? 'Done' : 'Not Done',
        stage1CompletionDate: completionDate ? completionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Stage 1 completion updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Stage 1 completion");
    }
  };

  return (
    <Modal title="Stage 1 Completion" open={visible} onCancel={onCancel} onOk={handleSave}>
      <div style={{ marginBottom: '16px' }}>
        <span>Status: </span>
        <Switch
          checked={completionStatus}
          onChange={(checked) => setCompletionStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <span>Date: </span>
        <DatePicker
          value={completionDate}
          onChange={(date) => setCompletionDate(date)}
          disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default Stage1CompletionModal;
