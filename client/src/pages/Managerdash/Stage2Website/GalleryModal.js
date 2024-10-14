// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Switch, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import { toast } from 'react-toastify';

// const GalleryModal = ({ visible, onCancel, record, fetchData }) => {
//   const [galleryStatus, setGalleryStatus] = useState(false); // Default to "Not Done"
//   const [galleryDate, setGalleryDate] = useState(null); // Default to no date

//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Effect to set initial values when modal opens
//   useEffect(() => {
//     if (record) {
//       setGalleryStatus(record.gallery === 'Done'); // Set switch based on status
//       setGalleryDate(record.galleryDate ? moment(record.galleryDate) : null); // Ensure date is a moment object
//     }
//   }, [record]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         gallery: galleryStatus ? 'Done' : 'Not Done',
//         galleryDate: galleryDate ? galleryDate.toISOString() : null, // Convert moment to ISO format
//       });
//       toast.success('Gallery updated successfully');
//       fetchData(); // Refresh the data
//       onCancel(); // Close the modal
//     } catch (error) {
//       toast.error('Failed to update Gallery');
//     }
//   };

//   const disabledDate = (current) => {
//     // Disable all dates before yesterday
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };

//   return (
//     <Modal
//       title="Gallery"
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
//           checked={galleryStatus}
//           onChange={(checked) => setGalleryStatus(checked)}
//           checkedChildren="Done"
//           unCheckedChildren="Not Done"
//         />
//       </div>

//       <DatePicker
//         value={galleryDate} // Ensure this is a moment object
//         onChange={(date) => setGalleryDate(date)}
//         disabledDate={disabledDate}
//         placeholder="Select Date"
//       />
//     </Modal>
//   );
// };

// export default GalleryModal;


import React, { useEffect } from 'react';
import { Modal, Form, Switch, DatePicker, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const GalleryModal = ({ visible, onCancel, record, fetchData }) => {
  const [form] = Form.useForm();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Populate form fields when the modal opens
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        galleryStatus: record.gallery === 'Done', // Set switch based on status
        galleryDate: record.galleryDate ? moment(record.galleryDate) : null, // Ensure date is a moment object
      });
    }
  }, [record, form]);

  const handleSave = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        gallery: values.galleryStatus ? 'Done' : 'Not Done',
        galleryDate: values.galleryDate ? values.galleryDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Gallery updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update Gallery');
    }
  };

  const disabledDate = (current) => {
    // Disable all dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Gallery"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Set footer to null to customize it with the form
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item name="galleryStatus" label="Status" valuePropName="checked">
          <Switch
            checkedChildren="Done"
            unCheckedChildren="Not Done"
          />
        </Form.Item>

        <Form.Item 
          name="galleryDate" 
          label="Gallery Date" 
          rules={[{ required: true, message: 'Please select a gallery date!' }]}
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

export default GalleryModal;
