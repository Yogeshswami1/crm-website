import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const Stage3CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [stage3CompletionStatus, setStage3CompletionStatus] = useState(false); // Default to "Not Done"
  const [stage3CompletionDate, setStage3CompletionDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setStage3CompletionStatus(record.stage3Completion === 'Done'); // Set switch based on status
      setStage3CompletionDate(record.stage3CompletionDate ? moment(record.stage3CompletionDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage3Completion: stage3CompletionStatus ? 'Done' : 'Not Done',
        stage3CompletionDate: stage3CompletionDate ? stage3CompletionDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Stage 3 Completed successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Stage 3 Completion');
    }
  };

  const disabledDate = (current) => {
    // Can only select yesterday, today, and future dates
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Stage 3 Completion"
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
          checked={stage3CompletionStatus}
          onChange={(checked) => setStage3CompletionStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={stage3CompletionDate} // Ensure this is a moment object
        onChange={(date) => setStage3CompletionDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
        style={{ width: '100%' }}
      />
    </Modal>
  );
};

export default Stage3CompletionModal;
