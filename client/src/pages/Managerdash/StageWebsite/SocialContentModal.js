// import React, { useState } from 'react';
// import { Modal, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const SocialContentModal = ({ visible, onCancel, record, fetchData }) => {
//   const [socialMediaStatus, setSocialMediaStatus] = useState(record.socialMedia === 'Completed');
//   const [socialMediaCompletionDate, setSocialMediaCompletionDate] = useState(record.socialMediaDate ? moment(record.socialMediaDate) : null);
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         socialMedia: socialMediaStatus ? 'Completed' : 'Not Completed',
//         socialMediaDate: socialMediaCompletionDate ? socialMediaCompletionDate.format('YYYY-MM-DD') : null,
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
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const SocialContentModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        socialMediaStatus: record.socialMedia === 'Completed',
        socialMediaCompletionDate: record.socialMediaDate ? moment(record.socialMediaDate) : null,
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        socialMedia: values.socialMediaStatus ? 'Completed' : 'Not Completed',
        socialMediaDate: values.socialMediaCompletionDate ? values.socialMediaCompletionDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Social Media status updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update Social Media status");
    }
  };

  return (
    <Modal
      title="Social Media Completion"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()} // Trigger form submission
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item name="socialMediaStatus" label="Status" valuePropName="checked">
          <Switch checkedChildren="Completed" unCheckedChildren="Not Completed" />
        </Form.Item>

        <Form.Item name="socialMediaCompletionDate" label="Completion Date">
          <DatePicker
            // disabledDate={(current) => current && current < moment().startOf('day')} // Disable past dates
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SocialContentModal;
