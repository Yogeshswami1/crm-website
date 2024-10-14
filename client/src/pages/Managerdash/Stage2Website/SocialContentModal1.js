// import React, { useState } from 'react';
// import { Modal, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const SocialContentModal = ({ visible, onCancel, record, fetchData }) => {
//   const [socialMediaStatus, setSocialMediaStatus] = useState(record.socialMedia1 === 'Completed');
//   const [socialMediaCompletionDate, setSocialMediaCompletionDate] = useState(record.socialMediaDate1 ? moment(record.socialMediaDate1) : null);
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         socialMedia1: socialMediaStatus ? 'Completed' : 'Not Completed',
//         socialMediaDate1: socialMediaCompletionDate ? socialMediaCompletionDate.format('YYYY-MM-DD') : null,
//       });
//       toast.success("Social Media status updated successfully");
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error("Failed to update Social Media status");
//     }
//   };

//   return (
//     <Modal title="Social Media Completion" open={visible} onCancel={onCancel} onOk={handleSave}>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Status: </span>
//         <Switch
//           checked={socialMediaStatus}
//           onChange={(checked) => setSocialMediaStatus(checked)}
//           checkedChildren="Completed"
//           unCheckedChildren="Not Completed"
//         />
//       </div>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Completion Date: </span>
//         <DatePicker
//           value={socialMediaCompletionDate}
//           onChange={(date) => setSocialMediaCompletionDate(date)}
//           disabledDate={(current) => current && current < moment().startOf('day')}
//           style={{ width: '100%' }}
//         />
//       </div>
//     </Modal>
//   );
// };

// export default SocialContentModal;



import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const SocialContentModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        socialMediaStatus: record.socialMedia1 === 'Completed', // Set switch based on status
        socialMediaCompletionDate: record.socialMediaDate1 ? moment(record.socialMediaDate1) : null, // Ensure date is a moment object
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        socialMedia1: values.socialMediaStatus ? 'Completed' : 'Not Completed',
        socialMediaDate1: values.socialMediaCompletionDate ? values.socialMediaCompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Social Media status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Social Media status");
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before today
    return current && current < moment().startOf('day');
  };

  return (
    <Modal
      title="Social Media Completion"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Set footer to null to customize it with the form
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item name="socialMediaStatus" label="Status" valuePropName="checked">
          <Switch
            checkedChildren="Completed"
            unCheckedChildren="Not Completed"
          />
        </Form.Item>

        <Form.Item 
          name="socialMediaCompletionDate" 
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

export default SocialContentModal;
