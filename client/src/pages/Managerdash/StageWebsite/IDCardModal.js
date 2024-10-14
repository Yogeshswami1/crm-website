// import React, { useState } from 'react';
// import { Modal, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const IDCardModal = ({ visible, onCancel, record, fetchData }) => {
//   const [idCardStatus, setIdCardStatus] = useState(record.idCard === 'Done');
//   const [idCardDate, setIdCardDate] = useState(record.idCardDate ? moment(record.idCardDate) : null);
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Disable dates before yesterday
//   const disabledDate = (current) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         idCard: idCardStatus ? 'Done' : 'Not Done',
//         idCardDate: idCardDate ? idCardDate.format('YYYY-MM-DD') : null,
//       });
//       toast.success("ID card status updated successfully");
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error("Failed to update ID card status");
//     }
//   };

//   return (
//     <Modal title="ID Card" open={visible} onCancel={onCancel} onOk={handleSave}>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Status: </span>
//         <Switch
//           checked={idCardStatus}
//           onChange={(checked) => setIdCardStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>
//       <div style={{ marginBottom: '16px' }}>
//         <span>Date: </span>
//         <DatePicker
//           value={idCardDate}
//           onChange={(date) => setIdCardDate(date)}
//           disabledDate={disabledDate} // Disable past dates except yesterday
//           style={{ width: '100%' }}
//         />
//       </div>
//     </Modal>
//   );
// };

// export default IDCardModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const IDCardModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm(); // Initialize Ant Design form instance
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        idCardStatus: record.idCard === 'Done',
        idCardDate: record.idCardDate ? moment(record.idCardDate) : null,
      });
    }
  }, [record, form]);

  // Disable past dates except for yesterday
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        idCard: values.idCardStatus ? 'Done' : 'Not Done',
        idCardDate: values.idCardDate ? values.idCardDate.format('YYYY-MM-DD') : null,
      });
      toast.success('ID card status updated successfully');
      fetchData();
      onCancel();
    } catch (error) {
      toast.error('Failed to update ID card status');
    }
  };

  return (
    <Modal
      title="ID Card"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()} // Trigger form submission
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item name="idCardStatus" label="Status" valuePropName="checked">
          <Switch checkedChildren="Done" unCheckedChildren="Not Done" />
        </Form.Item>

        <Form.Item name="idCardDate" label="Date">
          <DatePicker
            // disabledDate={disabledDate} // Disable past dates except yesterday
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IDCardModal;
