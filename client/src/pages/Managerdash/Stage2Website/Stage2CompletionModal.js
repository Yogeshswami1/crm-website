// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const Stage2CompletionModal = ({ visible, onCancel, record, fetchData }) => {
//   const [stage2CompletionStatus, setStage2CompletionStatus] = useState(false); // Default to "Not Done"
//   const [stage2CompletionDate, setStage2CompletionDate] = useState(null); // Default to no date

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Effect to set initial values when modal opens
//   useEffect(() => {
//     if (record) {
//       setStage2CompletionStatus(record.stage2Completion === 'Done'); // Set switch based on status
//       setStage2CompletionDate(record.stage2CompletionDate ? moment(record.stage2CompletionDate) : null); // Ensure date is a moment object
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         stage2Completion: stage2CompletionStatus ? 'Done' : 'Not Done',
//         stage2CompletionDate: stage2CompletionDate ? stage2CompletionDate.toISOString() : null, // Convert moment to ISO format
//       });
//       toast.success('Stage 2 completed successfully');
//       fetchData(); // Refresh the data
//       onCancel(); // Close the modal
//     } catch (error) {
//       toast.error('Failed to update Stage 2');
//     }
//   };

//   const disabledDate = (current) => {
//     // Disable all dates before yesterday
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };

//   return (
//     <Modal
//       title="Stage 2 Completion"
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
//           checked={stage2CompletionStatus}
//           onChange={(checked) => setStage2CompletionStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={stage2CompletionDate} // Ensure this is a moment object
//         onChange={(date) => setStage2CompletionDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//       />
//     </Modal>
//   );
// };

// export default Stage2CompletionModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const Stage2CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Create a form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        stage2CompletionStatus: record.stage2Completion === 'Done', // Set switch based on status
        stage2CompletionDate: record.stage2CompletionDate ? moment(record.stage2CompletionDate) : null, // Ensure date is a moment object
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage2Completion: values.stage2CompletionStatus ? 'Done' : 'Not Done',
        stage2CompletionDate: values.stage2CompletionDate ? values.stage2CompletionDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Stage 2 completed successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Stage 2');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Stage 2 Completion"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Set footer to null to customize it with the form
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item name="stage2CompletionStatus" label="Status" valuePropName="checked">
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item 
          name="stage2CompletionDate" 
          label="Completion Date" 
          rules={[{ required: true, message: 'Please select a completion date!' }]}
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

export default Stage2CompletionModal;
