import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify';

const { Option } = Select;

const Stage2PaymentModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        'payment.stage2': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          date: values.date,
          status: values.status,
        },
      });
      toast.success('Payment details updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update payment details');
    }
  };

  return (
    <Modal
      title="Stage 2 Payment"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>Save</Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          amount: record?.payment?.stage2?.amount || '',
          paymentMode: record?.payment?.stage2?.paymentMode || '',
          date: record?.payment?.stage2?.date ? moment(record.payment.stage2.date) : null,
          status: record?.payment?.stage2?.status || '',
        }}
        onFinish={handleSave}
      >
        <Form.Item
          name="amount"
          label="Amount"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="paymentMode"
          label="Payment Mode"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Payment Date"
        >
          <DatePicker
            disabledDate={(current) => current && current < moment().startOf('day')}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
        >
          <Select>
            <Option value="Done">Done</Option>
            <Option value="Not Done">Not Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage2PaymentModal;
