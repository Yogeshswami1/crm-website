import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const Stage2CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [stage2CompletionStatus, setStage2CompletionStatus] = useState(false); // Default to "Not Done"
  const [stage2CompletionDate, setStage2CompletionDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setStage2CompletionStatus(record.stage2Completion === 'Done'); // Set switch based on status
      setStage2CompletionDate(record.stage2CompletionDate ? moment(record.stage2CompletionDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage2Completion: stage2CompletionStatus ? 'Done' : 'Not Done',
        stage2CompletionDate: stage2CompletionDate ? stage2CompletionDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Stage 2 completed successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Stage 2');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Stage 2 Completion"
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
          checked={stage2CompletionStatus}
          onChange={(checked) => setStage2CompletionStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={stage2CompletionDate} // Ensure this is a moment object
        onChange={(date) => setStage2CompletionDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default Stage2CompletionModal;
