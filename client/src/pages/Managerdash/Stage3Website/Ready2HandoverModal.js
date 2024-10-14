// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const Ready2HandoverModal = ({ visible, onCancel, record, fetchData }) => {
//   const [readyToHandoverStatus, setReadyToHandoverStatus] = useState(false); // Default to "Not Done"
//   const [readyToHandoverDate, setReadyToHandoverDate] = useState(null); // Default to no date

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Effect to set initial values when modal opens
//   useEffect(() => {
//     if (record) {
//       setReadyToHandoverStatus(record.readyToHandover === 'Done'); // Set switch based on status
//       setReadyToHandoverDate(record.readyToHandoverDate ? moment(record.readyToHandoverDate) : null); // Ensure date is a moment object
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         readyToHandover: readyToHandoverStatus ? 'Done' : 'Not Done',
//         readyToHandoverDate: readyToHandoverDate ? readyToHandoverDate.toISOString() : null, // Convert moment to ISO format
//       });
//       toast.success('Ready To Handover updated successfully');
//       fetchData(); // Refresh the data
//       onCancel(); // Close the modal
//     } catch (error) {
//       toast.error('Failed to update Ready To Handover');
//     }
//   };

//   const disabledDate = (current) => {
//     // Can only select yesterday, today, and future dates
//     return current && current < moment().subtract(1, 'days').startOf('day');
//   };

//   return (
//     <Modal
//       title="Ready To Handover"
//       open={visible}
//       onCancel={onCancel}
//       footer={[
//         <Button key="back" onClick={onCancel}>Cancel</Button>,
//         <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
//       ]}
//     >
//       <div style={{ marginBottom: 16 }}>
//         <span>Status: </span>
//         <Switch
//           checked={readyToHandoverStatus}
//           onChange={(checked) => setReadyToHandoverStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={readyToHandoverDate} // Ensure this is a moment object
//         onChange={(date) => setReadyToHandoverDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//       />
//     </Modal>
//   );
// };

// export default Ready2HandoverModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const Ready2HandoverModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Create a form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        readyToHandoverStatus: record.readyToHandover === 'Done', // Convert status to boolean
        readyToHandoverDate: record.readyToHandoverDate ? moment(record.readyToHandoverDate) : null, // Set the date
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        readyToHandover: values.readyToHandoverStatus ? 'Done' : 'Not Done',
        readyToHandoverDate: values.readyToHandoverDate ? values.readyToHandoverDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Ready To Handover updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Ready To Handover');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before today
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Ready To Handover"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Set footer to null to customize it with the form
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item
          name="readyToHandoverStatus"
          label="Status"
          valuePropName="checked" // Map the switch to the checked property
        >
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item
          name="readyToHandoverDate"
          label="Handover Date"
          rules={[{ required: true, message: 'Please select a handover date!' }]} // Validation rule
        >
          <DatePicker
            // disabledDate={disabledDate}
            style={{ width: '100%' }} // Ensure the date picker takes full width
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

export default Ready2HandoverModal;
