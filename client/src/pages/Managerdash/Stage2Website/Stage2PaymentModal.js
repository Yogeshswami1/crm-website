// import React from 'react';
// import { Modal, Form, Input, Button, DatePicker, Switch } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const Stage2PaymentModal = ({ visible, onCancel, record, fetchData }) => {
//   const [form] = Form.useForm();
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   const handlePaymentSave = async (values) => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         'payment.stage2': {
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
//     <Modal title="Payment Stage 2" open={visible} onCancel={onCancel} footer={null}>
//       <Form
//         form={form}
//         onFinish={handlePaymentSave}
//         initialValues={{
//           amount: record?.payment?.stage2?.amount,
//           paymentMode: record?.payment?.stage2?.paymentMode,
//           status: record?.payment?.stage2?.status === "Done",
//           date: record?.payment?.stage2?.date ? moment(record?.payment?.stage2?.date) : null,
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

// export default Stage2PaymentModal;


import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Switch } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage2PaymentModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        amount: record.payment?.stage2?.amount,
        paymentMode: record.payment?.stage2?.paymentMode,
        status: record.payment?.stage2?.status === "Done",
        date: record.payment?.stage2?.date ? moment(record.payment?.stage2?.date) : null,
      });
    }
  }, [record, form]);

  const handlePaymentSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        'payment.stage2': {
          amount: values.amount,
          paymentMode: values.paymentMode,
          status: values.status ? "Done" : "Not Done",
          date: values.date ? values.date.format('YYYY-MM-DD') : null,
        },
      });
      toast.success("Payment details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update payment details");
    }
  };

  return (
    <Modal title="Payment Stage 2" open={visible} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handlePaymentSave}
      >
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="paymentMode" label="Payment Mode" rules={[{ required: true, message: 'Please input the payment mode!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
          <DatePicker
            // disabledDate={(current) => {
            //   const yesterday = moment().subtract(1, 'days').startOf('day');
            //   return current && current < yesterday; // Disable all dates before yesterday
            // }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch checkedChildren="Done" unCheckedChildren="Not Done" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage2PaymentModal;
