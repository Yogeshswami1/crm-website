// import React, { useState } from 'react';
// import { Modal, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const Stage1CompletionModal = ({ visible, onCancel, record, fetchData }) => {
//   const [completionStatus, setCompletionStatus] = useState(record?.stage1Completion === 'Done');
//   const [completionDate, setCompletionDate] = useState(record.stage1CompletionDate ? moment(record.stage1CompletionDate) : null);
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Function to disable all dates before yesterday
//   const disabledDate = (current) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };
//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         stage1Completion: completionStatus ? 'Done' : 'Not Done',
//         stage1CompletionDate: completionDate ? completionDate.format('YYYY-MM-DD') : null,
//       });
//       toast.success("Stage 1 completion updated successfully");
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error("Failed to update Stage 1 completion");
//     }
//   };

//   return (
//     <Modal title="Stage 1 Completion" open={visible} onCancel={onCancel} onOk={handleSave}>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Status: </span>
//         <Switch
//           checked={completionStatus}
//           onChange={(checked) => setCompletionStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Date: </span>
//         <DatePicker
//           value={completionDate}
//           onChange={(date) => setCompletionDate(date)}
//           disabledDate={disabledDate}
//           style={{ width: '100%' }}
//         />
//       </div>
//     </Modal>
//   );
// };

// export default Stage1CompletionModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const Stage1CompletionModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        completionStatus: record.stage1Completion === 'Done',
        completionDate: record.stage1CompletionDate ? moment(record.stage1CompletionDate) : null,
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        stage1Completion: values.completionStatus ? 'Done' : 'Not Done',
        stage1CompletionDate: values.completionDate ? values.completionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Stage 1 completion updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Stage 1 completion");
    }
  };

  return (
    <Modal
      title="Stage 1 Completion"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()} // Trigger form submission
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item name="completionStatus" label="Status">
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
            onChange={(checked) => form.setFieldsValue({ completionStatus: checked })}
          />
        </Form.Item>
        <Form.Item name="completionDate" label="Completion Date">
          <DatePicker
            // disabledDate={(current) => {
            //   const yesterday = moment().subtract(1, 'days').startOf('day');
            //   return current && current < yesterday; // Disable all dates before yesterday
            // }}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Stage1CompletionModal;
