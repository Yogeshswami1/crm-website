// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const DomainMailVerificationModal = ({ visible, onCancel, record, fetchData }) => {
//   const [domainMailVerificationStatus, setDomainMailVerificationStatus] = useState(false);
//   const [domainMailVerificationDate, setDomainMailVerificationDate] = useState(null);

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   useEffect(() => {
//     if (record) {
//       setDomainMailVerificationStatus(record.domainMailVerification === 'Done');
//       setDomainMailVerificationDate(record.domainMailVerificationDate ? moment(record.domainMailVerificationDate) : null);
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         domainMailVerification: domainMailVerificationStatus ? 'Done' : 'Not Done',
//         domainMailVerificationDate: domainMailVerificationDate ? domainMailVerificationDate.toISOString() : null,
//       });
//       toast.success('Domain Mail Verification updated successfully');
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error('Failed to update Domain Mail Verification');
//     }
//   };

//   const disabledDate = (current) => {
//     // Can only select yesterday, today, and future dates
//     return current && current < moment().subtract(1, 'days').startOf('day');
//   };

//   return (
//     <Modal
//       title="Domain Mail Verification"
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
//           checked={domainMailVerificationStatus}
//           onChange={(checked) => setDomainMailVerificationStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={domainMailVerificationDate} // Ensure this is a moment object
//         onChange={(date) => setDomainMailVerificationDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//       />
//     </Modal>
//   );
// };

// export default DomainMailVerificationModal;



import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const DomainMailVerificationModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Create a form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        domainMailVerificationStatus: record.domainMailVerification === 'Done', // Convert status to boolean
        domainMailVerificationDate: record.domainMailVerificationDate ? moment(record.domainMailVerificationDate) : null, // Set the date
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        domainMailVerification: values.domainMailVerificationStatus ? 'Done' : 'Not Done',
        domainMailVerificationDate: values.domainMailVerificationDate ? values.domainMailVerificationDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Domain Mail Verification updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Domain Mail Verification');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Domain Mail Verification"
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
          name="domainMailVerificationStatus"
          label="Status"
          valuePropName="checked" // Map the switch to the checked property
        >
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item
          name="domainMailVerificationDate"
          label="Verification Date"
          rules={[{ required: true, message: 'Please select a verification date!' }]}
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

export default DomainMailVerificationModal;
