import React from "react";
import { Modal, Form, Input, Select, Button, DatePicker } from "antd";
import moment from "moment";  // Required to work with dates

const { Option } = Select;

const Stage1Payment = ({ 
  isPaymentModalVisible, 
  handleCancel, 
  handlePaymentSave, 
  currentRecord, 
  form 
}) => {
  
  // Disable dates before today
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day');
  };

  return (
    <Modal
      title="Payment Stage 1"
      open={isPaymentModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form 
        form={form} 
        onFinish={handlePaymentSave} 
        initialValues={{
          amount: currentRecord?.payment?.stage1?.amount,
          paymentMode: currentRecord?.payment?.stage1?.paymentMode,
          document: currentRecord?.payment?.stage1?.document,
          status: currentRecord?.payment?.stage1?.status,
          date: currentRecord?.payment?.stage1?.date ? moment(currentRecord?.payment?.stage1?.date) : null, // Initialize with existing date or null
        }}
      >
        <Form.Item name="amount" label="Amount">
          <Input />
        </Form.Item>
        <Form.Item name="paymentMode" label="Payment Mode">
          <Select>
            <Option value="Cash">Cash</Option>
            <Option value="Bank Transfer">Bank Transfer</Option>
            <Option value="Online">Online</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        {/* Date Picker for Payment Date */}
        <Form.Item name="date" label="Payment Date">
          <DatePicker 
            disabledDate={disabledDate}  // Disable past dates
            format="YYYY-MM-DD"  // Define the date format
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage1Payment;
