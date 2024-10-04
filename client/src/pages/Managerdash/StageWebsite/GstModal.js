import React, { useState } from 'react';
import { Modal, Form, Input, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const GSTModal = ({ visible, onCancel, record, fetchData }) => {
  const [gst, setGst] = useState(record.gst === 'Done');
  const [gstNumber, setGstNumber] = useState(record.gstNumber || '');
  const [gstDate, setGstDate] = useState(record.gstDate ? moment(record.gstDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable past dates (only yesterday, today, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        gst: gst ? 'Done' : 'Not Done',
        gstNumber,
        gstDate: gstDate ? gstDate.format('YYYY-MM-DD') : null,
      });
      toast.success("GST details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update GST details");
    }
  };

  return (
    <Modal title="GST Details" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form layout="vertical">
        <Form.Item label="GST">
          <Switch
            checked={gst}
            onChange={(checked) => setGst(checked)}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Form.Item>

        <Form.Item label="GST Number">
          <Input
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            placeholder="Enter GST Number"
          />
        </Form.Item>

        <Form.Item label="GST Date">
          <DatePicker
            value={gstDate}
            onChange={(date) => setGstDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GSTModal;
