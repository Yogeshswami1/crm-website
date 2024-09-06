// PaymentModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const PaymentModal = ({ visible, onCancel, record, apiUrl, fetchData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        amount: record?.payment?.stage3?.amount || '',
        paymentMode: record?.payment?.stage3?.paymentMode || '',
        status: record?.payment?.stage3?.status || '',
      });
    }
  }, [record]);

  const handlePaymentSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        'payment.stage3': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          status: values.status,
        },
      });
      message.success('Payment details updated successfully');
      fetchData();
      onCancel();
    } catch (error) {
      message.error('Failed to update payment details');
    }
  };

  return (
    <Modal
      title="Stage 3 Payment"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handlePaymentSave}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please input the amount' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="paymentMode"
          label="Payment Mode"
          rules={[{ required: true, message: 'Please select the payment mode' }]}
        >
          <Select>
            <Option value="Cash">Cash</Option>
            <Option value="PhonePay">PhonePay</Option>
            <Option value="Paytm">Paytm</Option>
            <Option value="Google Pay">Google Pay</Option>
            <Option value="Credit Card">Credit Card</Option>
            <Option value="Debit Card">Debit Card</Option>
            <Option value="Bank Transfer">Bank Transfer</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the status' }]}
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

export default PaymentModal;
