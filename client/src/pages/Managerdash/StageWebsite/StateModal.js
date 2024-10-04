import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const StateModal = ({ visible, onCancel, record, fetchData }) => {
  const [state, setState] = useState(record.state || '');
  const [stateDate, setStateDate] = useState(record.stateDate ? moment(record.stateDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only yesterday, today, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        state,
        stateDate: stateDate ? stateDate.format('YYYY-MM-DD') : null,
      });
      toast.success("State details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update state details");
    }
  };

  return (
    <Modal title="State Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="State">
          <Input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
          />
        </Form.Item>

        <Form.Item label="State Date">
          <DatePicker
            value={stateDate}
            onChange={(date) => setStateDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StateModal;
