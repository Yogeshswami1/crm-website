// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const WebsiteUploadedModal = ({ visible, onCancel, record, fetchData }) => {
//   const [websiteUploadedStatus, setWebsiteUploadedStatus] = useState(false);
//   const [websiteUploadedDate, setWebsiteUploadedDate] = useState(null);

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   useEffect(() => {
//     if (record) {
//       setWebsiteUploadedStatus(record.websiteUploaded === 'Done');
//       setWebsiteUploadedDate(record.websiteUploadedDate ? moment(record.websiteUploadedDate) : null);
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         websiteUploaded: websiteUploadedStatus ? 'Done' : 'Not Done',
//         websiteUploadedDate: websiteUploadedDate ? websiteUploadedDate.toISOString() : null,
//       });
//       toast.success('Website Uploaded updated successfully');
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error('Failed to update website uploaded');
//     }
//   };

//   const disabledDate = (current) => {
//     // Can only select yesterday, today, and future dates
//     return current && current < moment().subtract(1, 'days').startOf('day');
//   };

//   return (
//     <Modal
//       title="Website Uploaded"
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
//           checked={websiteUploadedStatus}
//           onChange={(checked) => setWebsiteUploadedStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={websiteUploadedDate} // Ensure this is a moment object
//         onChange={(date) => setWebsiteUploadedDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//         style={{ width: '100%' }}
//       />
//     </Modal>
//   );
// };

// export default WebsiteUploadedModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const WebsiteUploadedModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Create a form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        websiteUploadedStatus: record.websiteUploaded === 'Done', // Convert status to boolean
        websiteUploadedDate: record.websiteUploadedDate ? moment(record.websiteUploadedDate) : null, // Set the date
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        websiteUploaded: values.websiteUploadedStatus ? 'Done' : 'Not Done',
        websiteUploadedDate: values.websiteUploadedDate ? values.websiteUploadedDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Website Uploaded updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update website uploaded');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Website Uploaded"
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
          name="websiteUploadedStatus"
          label="Status"
          valuePropName="checked" // Map the switch to the checked property
        >
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item
          name="websiteUploadedDate"
          label="Upload Date"
          rules={[{ required: true, message: 'Please select an upload date!' }]}
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

export default WebsiteUploadedModal;
