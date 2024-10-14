// import React, { useState } from 'react';
// import { Modal, Form, Input, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const GSTModal = ({ visible, onCancel, record, fetchData }) => {
//   const [gst, setGst] = useState(record.gst === 'Done');
//   const [gstNumber, setGstNumber] = useState(record.gstNumber || '');
//   const [gstDate, setGstDate] = useState(record.gstDate ? moment(record.gstDate) : null);
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Function to disable past dates (only yesterday, today, and future are selectable)
//   const disabledDate = (current) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         gst: gst ? 'Done' : 'Not Done',
//         gstNumber,
//         gstDate: gstDate ? gstDate.format('YYYY-MM-DD') : null,
//       });
//       toast.success("GST details updated successfully");
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error("Failed to update GST details");
//     }
//   };

//   return (
//     <Modal title="GST Details" open={visible} onCancel={onCancel} onOk={handleSave}>
//       <Form layout="vertical">
//         <Form.Item label="GST">
//           <Switch
//             checked={gst}
//             onChange={(checked) => setGst(checked)}
//             checkedChildren="Yes"
//             unCheckedChildren="No"
//           />
//         </Form.Item>

//         <Form.Item label="GST Number">
//           <Input
//             value={gstNumber}
//             onChange={(e) => setGstNumber(e.target.value)}
//             placeholder="Enter GST Number"
//           />
//         </Form.Item>

//         {/* <Form.Item label="GST Date">
//           <DatePicker
//             value={gstDate}
//             onChange={(date) => setGstDate(date)}
//             disabledDate={disabledDate}
//           />
//         </Form.Item> */}
//         <Form.Item name="date" label="GST Date">
//           <DatePicker />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default GSTModal;

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const GSTModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Initialize form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal is opened
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        gst: record.gst === 'Done',
        gstNumber: record.gstNumber || '',
        gstDate: record.gstDate ? moment(record.gstDate) : null,
      });
    }
  }, [record, form]);

  // Function to disable past dates (only yesterday, today, and future are selectable)
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        gst: values.gst ? 'Done' : 'Not Done',
        gstNumber: values.gstNumber,
        gstDate: values.gstDate ? values.gstDate.format('YYYY-MM-DD') : null,
      });
      toast.success("GST details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update GST details");
    }
  };

  return (
    <Modal
      title="GST Details"
      open={visible}
      onCancel={onCancel}
      onOk={form.submit} // Submit form when the OK button is clicked
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave} // Trigger handleSave when form is submitted
      >
        <Form.Item label="GST" name="gst" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item label="GST Number" name="gstNumber">
          <Input placeholder="Enter GST Number" />
        </Form.Item>

        <Form.Item name="gstDate" label="GST Date">
          <DatePicker  style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GSTModal;
