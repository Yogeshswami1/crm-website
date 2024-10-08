
import React, { useState } from 'react';
import { Modal, Form, Input, Switch, DatePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const LegalityModal = ({ visible, onCancel, record, fetchData }) => {
  const [legalityLink, setLegalityLink] = useState(record.legalityLink || '');
  const [legalityStatus, setLegalityStatus] = useState(record.simpleStatus?.legality === 'Done');
  const [legalityDate, setLegalityDate] = useState(record.legalityDate ? moment(record.legalityDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to disable all dates before yesterday
  const disabledDate = (current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  const handleLegalitySave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        legality: legalityStatus ? 'Done' : 'Not Done',
        legalityLink,
        legalityDate: legalityDate ? legalityDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Legality details updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update legality details");
    }
  };

  return (
    <Modal title="Legality Details" open={visible} onCancel={onCancel} onOk={handleLegalitySave}>
      <Form layout="vertical">
        <Form.Item label="Legality Status">
          <Switch 
            checked={legalityStatus} 
            onChange={(checked) => setLegalityStatus(checked)} 
            checkedChildren="Done" 
            unCheckedChildren="Not Done"
          />
        </Form.Item>
        <Form.Item label="Legality Date">
          <DatePicker
            value={legalityDate}
            onChange={(date) => setLegalityDate(date)}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item label="Legality Link">
          <Input 
            value={legalityLink} 
            onChange={(e) => setLegalityLink(e.target.value)} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LegalityModal;


// import React, { useState } from 'react';
// import { Modal, Form, Input, Switch, DatePicker, Upload, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import moment from 'moment';

// const LegalityModal = ({ visible, onCancel, record, fetchData }) => {
//   const [legalityLink, setLegalityLink] = useState(record.legalityLink || '');
//   const [legalityStatus, setLegalityStatus] = useState(record.simpleStatus?.legality === 'Done');
//   const [legalityDate, setLegalityDate] = useState(record.legalityDate ? moment(record.legalityDate) : null);
//   const [file, setFile] = useState(null); // For storing selected file
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   // Disable all dates before yesterday
//   const disabledDate = (current) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     return current && current < yesterday;
//   };

//   const handleFileChange = (info) => {
//     setFile(info.file.originFileObj);  // Set the selected file
//   };

//   const handleLegalitySave = async () => {
//     try {
//       let uploadedFileUrl = legalityLink;

//       if (file) {
//         // If a file is selected, upload it
//         const formData = new FormData();
//         formData.append('file', file);

//         const { data } = await axios.post(`${apiUrl}/api/upload`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         uploadedFileUrl = data.fileUrl; // Assuming the backend returns the S3 URL
//         setLegalityLink(uploadedFileUrl);
//       }

//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         legality: legalityStatus ? 'Done' : 'Not Done',
//         legalityLink: uploadedFileUrl,
//         legalityDate: legalityDate ? legalityDate.format('YYYY-MM-DD') : null,
//       });

//       toast.success('Legality details updated successfully');
//       fetchData();
//       onCancel();
//     } catch (error) {
//       toast.error('Failed to update legality details');
//     }
//   };

//   return (
//     <Modal title="Legality Details" open={visible} onCancel={onCancel} onOk={handleLegalitySave}>
//       <Form layout="vertical">
//         <Form.Item label="Legality Status">
//           <Switch 
//             checked={legalityStatus} 
//             onChange={(checked) => setLegalityStatus(checked)} 
//             checkedChildren="Done" 
//             unCheckedChildren="Not Done"
//           />
//         </Form.Item>
//         <Form.Item label="Legality Date">
//           <DatePicker
//             value={legalityDate}
//             onChange={(date) => setLegalityDate(date)}
//             disabledDate={disabledDate}
//           />
//         </Form.Item>
//         <Form.Item label="Legality Link">
//           <Input value={legalityLink} onChange={(e) => setLegalityLink(e.target.value)} />
//         </Form.Item>
//         <Form.Item label="Upload Legality Document">
//           <Upload beforeUpload={() => false} onChange={handleFileChange}>
//             <Button icon={<UploadOutlined />}>Select File</Button>
//           </Upload>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default LegalityModal;
