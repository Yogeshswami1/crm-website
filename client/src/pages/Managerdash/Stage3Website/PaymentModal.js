// import React from 'react';
// import { Modal, Form, Input, Button, DatePicker, Switch } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const PaymentModal = ({ visible, onCancel, record, fetchData }) => {
//   const [form] = Form.useForm();
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   const handlePaymentSave = async (values) => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         'payment.stage3': {
//           amount: values.amount,
//           paymentMode: values.paymentMode,
//           status: values.status ? "Done" : "Not Done",
//           date: values.date,
//         },
//       });
//       toast.success("Payment details updated successfully");
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error("Failed to update payment details");
//     }
//   };

//   return (
//     <Modal title="Payment Stage 3" open={visible} onCancel={onCancel} footer={null}>
//       <Form
//         form={form}
//         onFinish={handlePaymentSave}
//         initialValues={{
//           amount: record?.payment?.stage3?.amount,
//           paymentMode: record?.payment?.stage3?.paymentMode,
//           status: record?.payment?.stage3?.status === "Done",
//           date: record?.payment?.stage3?.date ? moment(record?.payment?.stage3?.date) : null,
//         }}
//       >
//         <Form.Item name="amount" label="Amount">
//           <Input />
//         </Form.Item>

//         <Form.Item name="paymentMode" label="Payment Mode">
//           <Input />
//         </Form.Item>

//         <Form.Item name="date" label="Date">
//         <DatePicker
//   disabledDate={(current) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday; // Disable all dates before yesterday
//   }}
// />
//         </Form.Item>

//         <Form.Item name="status" label="Status" valuePropName="checked">
//           <Switch checkedChildren="Done" unCheckedChildren="Not Done" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">Save</Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default PaymentModal;


import React from 'react';
import { Modal, Form, Input, Button, DatePicker, Switch } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const PaymentModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handlePaymentSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        'payment.stage3': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          status: values.status ? "Done" : "Not Done",
          date: values.date ? values.date.toISOString() : null, // Convert date to ISO format
        },
      });
      toast.success("Payment details updated successfully");
      fetchData(); // Refresh data
      onCancel(); // Close modal
    } catch (error) {
      toast.error("Failed to update payment details");
    }
  };

  return (
    <Modal title="Payment Stage 3" visible={visible} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical" // Use vertical layout for better spacing
        onFinish={handlePaymentSave}
        initialValues={{
          amount: record?.payment?.stage3?.amount,
          paymentMode: record?.payment?.stage3?.paymentMode,
          status: record?.payment?.stage3?.status === "Done", // Convert status to boolean
          date: record?.payment?.stage3?.date ? moment(record?.payment?.stage3?.date) : null, // Ensure date is a moment object
        }}
      >
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter the amount!' }]} // Validation rule
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="paymentMode"
          label="Payment Mode"
          rules={[{ required: true, message: 'Please enter the payment mode!' }]} // Validation rule
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date!' }]} // Validation rule
        >
          <DatePicker
            // disabledDate={(current) => {
            //   const yesterday = moment().subtract(1, 'days').startOf('day');
            //   return current && current < yesterday; // Disable all dates before yesterday
            // }}
            style={{ width: '100%' }} // Ensure the date picker takes full width
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item>
          <Button key="back" onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentModal;
