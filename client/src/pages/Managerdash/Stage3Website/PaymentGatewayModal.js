import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const PaymentGatewayModal = ({ visible, onCancel, record, fetchData }) => {
  const [paymentGatewayStatus, setPaymentGatewayStatus] = useState('');
  const [paymentGatewayDate, setPaymentGatewayDate] = useState(null);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (record) {
      setPaymentGatewayStatus(record.paymentGateway || ''); // Set the status if it exists
      setPaymentGatewayDate(record.paymentGatewayDate ? moment(record.paymentGatewayDate) : null); // Set the date
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        paymentGateway: paymentGatewayStatus,
        paymentGatewayDate: paymentGatewayDate ? paymentGatewayDate.toISOString() : null,
      });
      toast.success('Payment Gateway updated successfully');
      fetchData();
      onCancel();
    } catch (error) {
      toast.error('Failed to update Payment Gateway');
    }
  };

  const disabledDate = (current) => {
    // Can only select yesterday, today, and future dates
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Payment Gateway"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span>Status: </span>
        <Input
          value={paymentGatewayStatus}
          onChange={(e) => setPaymentGatewayStatus(e.target.value)}
          placeholder="Enter Values"
        />
      </div>

      <DatePicker
        value={paymentGatewayDate} // Ensure this is a moment object
        onChange={(date) => setPaymentGatewayDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
        style={{ width: '100%' }}
      />
    </Modal>
  );
};

export default PaymentGatewayModal;
