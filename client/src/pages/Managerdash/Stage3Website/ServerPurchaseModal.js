// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker, Input } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const ServerPurchaseModal = ({ visible, onCancel, record, fetchData }) => {
//   const [serverPurchaseStatus, setServerPurchaseStatus] = useState(false);
//   const [serverPurchaseDate, setServerPurchaseDate] = useState(null);
//   const [serverId, setServerId] = useState('');
//   const [serverPassword, setServerPassword] = useState('');

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   useEffect(() => {
//     if (record) {
//       setServerPurchaseStatus(record.serverPurchase === 'Done');
//       setServerPurchaseDate(record.serverPurchaseDate ? moment(record.serverPurchaseDate) : null);
//       setServerId(record.serverId || '');
//       setServerPassword(record.serverPassword || '');
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         serverPurchase: serverPurchaseStatus ? 'Done' : 'Not Done',
//         serverPurchaseDate: serverPurchaseDate ? serverPurchaseDate.toISOString() : null,
//         serverId,
//         serverPassword,
//       });
//       toast.success('Server Purchase updated successfully');
//       fetchData(); 
//       onCancel();
//     } catch (error) {
//       toast.error('Failed to update Server Purchase');
//     }
//   };

//   const disabledDate = (current) => {
//     // Can only select yesterday, today, and future dates
//     return current && current < moment().subtract(1, 'days').startOf('day');
//   };

//   return (
//     <Modal
//       title="Server Purchase"
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
//           checked={serverPurchaseStatus}
//           onChange={(checked) => setServerPurchaseStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={serverPurchaseDate}
//         onChange={(date) => setServerPurchaseDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//         style={{ marginBottom: 16 }}
//       />

//       <Input
//         placeholder="Server ID"
//         value={serverId}
//         onChange={(e) => setServerId(e.target.value)}
//         style={{ marginBottom: 16 }}
//       />

//       <Input.Password
//         placeholder="Server Password"
//         value={serverPassword}
//         onChange={(e) => setServerPassword(e.target.value)}
//         style={{ marginBottom: 16 }}
//       />
//     </Modal>
//   );
// };

// export default ServerPurchaseModal;



import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Input, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const ServerPurchaseModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Create a form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        serverPurchaseStatus: record.serverPurchase === 'Done', // Set switch based on status
        serverPurchaseDate: record.serverPurchaseDate ? moment(record.serverPurchaseDate) : null, // Ensure date is a moment object
        serverId: record.serverId || '', // Default to empty if not provided
        serverPassword: record.serverPassword || '', // Default to empty if not provided
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        serverPurchase: values.serverPurchaseStatus ? 'Done' : 'Not Done',
        serverPurchaseDate: values.serverPurchaseDate ? values.serverPurchaseDate.toISOString() : null, // Convert moment to ISO format
        serverId: values.serverId,
        serverPassword: values.serverPassword,
      });
      toast.success('Server Purchase updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Server Purchase');
    }
  };

  const disabledDate = (current) => {
    // Can only select yesterday, today, and future dates
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Server Purchase"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Set footer to null to customize it with the form
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item name="serverPurchaseStatus" label="Status" valuePropName="checked">
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item 
          name="serverPurchaseDate" 
          label="Purchase Date" 
          rules={[{ required: true, message: 'Please select a purchase date!' }]}
        >
          <DatePicker
            // disabledDate={disabledDate}
            style={{ width: '100%' }} // Ensure the date picker takes full width
          />
        </Form.Item>

        <Form.Item 
          name="serverId" 
          label="Server ID" 
          rules={[{ required: true, message: 'Please enter the server ID!' }]}
        >
          <Input placeholder="Server ID" />
        </Form.Item>

        <Form.Item 
          name="serverPassword" 
          label="Server Password" 
          rules={[{ required: true, message: 'Please enter the server password!' }]}
        >
          <Input.Password placeholder="Server Password" />
        </Form.Item>

        <Form.Item>
          <Button key="back" onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServerPurchaseModal;
