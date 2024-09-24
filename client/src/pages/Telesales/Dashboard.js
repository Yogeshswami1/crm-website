import React, { useState, useEffect } from 'react';
import { Radio, Table, message, Button, Modal, Form, Input, Select, Upload } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {toast} from 'react-toastify';
import {
 UploadOutlined,
 DownloadOutlined,
} from "@ant-design/icons";
import Sample from '../Sample.csv';


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;
const initialContactData = [];




const Dashboard = () => {
 const [contacts, setContacts] = useState([]);
 const [filteredContacts, setFilteredContacts] = useState([]);
 const [service, setService] = useState('WEBSITE'); // Set default to WEBSITE
 const [isAddModalVisible, setIsAddModalVisible] = useState(false);
 const [addForm] = Form.useForm();
 const [prefix, setPrefix] = useState('WB'); // Set default prefix to WB for WEBSITE
 const [searchTerm, setSearchTerm] = useState(''); // Search term state
 const [uploading, setUploading] = useState(false);
 const [originalContacts, setOriginalContacts] = useState(initialContactData);




 useEffect(() => {
   fetchContacts();
 }, []);


 useEffect(() => {
   filterContacts(service);
 }, [contacts, service, searchTerm]);


 const fetchContacts = async () => {
   try {
     const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
     setContacts(response.data);
     setFilteredContacts(response.data);
   } catch (error) {
     console.error('Error fetching data:', error);
     message.error('Failed to load data. Please try again.');
   }
 };


 const filterContacts = (service) => {
   const filtered = contacts
     .filter(contact => contact.service === service)
     .filter(contact => {
       const term = searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
       return (
         contact.enrollmentId.toLowerCase().includes(term) ||
         contact.name.toLowerCase().includes(term) ||
         contact.email.toLowerCase().includes(term) ||
         contact.primaryContact.toLowerCase().includes(term) ||
         (contact.managerId?.position || '').toLowerCase().includes(term) // Check for manager position
       );
     })
     .sort((a, b) => b.enrollmentId.localeCompare(a.enrollmentId)); // Sort by enrollmentId in descending order
   setFilteredContacts(filtered);
 };


 const handleServiceChange = (e) => {
   setService(e.target.value);
 };


 const handleSearchInput = (e) => {
   setSearchTerm(e.target.value); // Update the search term when the user types
 };


 const maskContactNumber = (contactNumber) => {
   if (contactNumber.length >= 3) {
     return contactNumber.slice(0, -3).replace(/./g, '*') + contactNumber.slice(-3);
   }
   return contactNumber;
 };




 const handleUpload = async (file) => {
   const formData = new FormData();
   formData.append("file", file);
    try {
     setUploading(true);
     const response = await axios.post(
       `${apiUrl}/api/upload/upload`,
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       }
     );
     setUploading(false);
    
     // Sort the contacts in descending order before updating the state
     const sortedContacts = response.data.contacts.sort((a, b) => b._id.localeCompare(a._id));
    
     setOriginalContacts([...sortedContacts, ...originalContacts]);
     setContacts([...sortedContacts, ...originalContacts]);
    
     toast.success(
       `File uploaded and contacts imported successfully! ${response.data.skippedEntriesCount} entries were skipped.`
     );
   } catch (error) {
     console.error("Error uploading file:", error);
     setUploading(false);
     toast.error("Failed to upload file and import contacts. Please try again.");
   }
 };
 
  const uploadProps = {
    name: "file",
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isCSV) {
        toast.error("You can only upload CSV files!");
      }
      return isCSV;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        toast.success(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: ({ file }) => {
      handleUpload(file);
    },
  };


 const managerPositions = Array.from({ length: 20 }, (_, index) => `TL${index + 1}`);


 const columns = [
   {
     title: 'Enrollment ID',
     dataIndex: 'enrollmentId',
     key: 'enrollmentId',
   },
   {
     title: 'Date',
     dataIndex: 'date',
     key: 'date',
     render: (text) => moment(text).format('DD/MM/YYYY'),
   },
   {
     title: 'Name',
     dataIndex: 'name',
     key: 'name',
   },
   {
     title: 'Email',
     dataIndex: 'email',
     key: 'email',
   },
   {
     title: 'Primary Contact',
     dataIndex: 'primaryContact',
     key: 'primaryContact',
     render: (text) => maskContactNumber(text),
   },
   {
     title: 'Manager Position',
     dataIndex: ['managerId', 'position'],
     key: 'managerPosition',
   },
 ];


 const showAddModal = () => {
   setIsAddModalVisible(true);
 };


 const handleAddOk = () => {
   addForm
     .validateFields()
     .then(async (values) => {
       const enrollmentIdWithPrefix = `${prefix}${values.enrollmentId}`;
       const valuesWithPrefix = { ...values, enrollmentId: enrollmentIdWithPrefix };
        const isUnique = (field, value) => {
         return !contacts.some(
           (contact) => contact.service === values.service && contact[field] === value
         );
       };
        if (!isUnique('enrollmentId', enrollmentIdWithPrefix)) {
         message.error('Enrollment ID must be unique for the selected service!');
         return;
       }
        if (!isUnique('primaryContact', values.primaryContact)) {
         message.error('Primary Contact must be unique for the selected service!');
         return;
       }
        try {
         await axios.post(`${apiUrl}/api/contact/add`, valuesWithPrefix);
         message.success('Contact added successfully!');
         fetchContacts(); // Refresh the contacts list
         setIsAddModalVisible(false);
         addForm.resetFields();
       } catch (error) {
         console.error('Error adding contact:', error);
         message.error('Failed to add contact. Please try again.');
       }
     })
     .catch((info) => {
       console.log('Validate Failed:', info);
     });
 };


 const handleAddCancel = () => {
   setIsAddModalVisible(false);
 };


 return (
   <div>
     <Radio.Group value={service} onChange={handleServiceChange} style={{ marginBottom: 16 }}>
       <Radio.Button value="WEBSITE">WEBSITE</Radio.Button>
     </Radio.Group>


     <Input
       placeholder="Search by name, email, manager position, contact, or enrollment ID"
       value={searchTerm}
       onChange={handleSearchInput}
       style={{ marginBottom: 16, width: 400 }}
     />


     <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
       Add Contact
     </Button>


     <Upload {...uploadProps} showUploadList={false}>
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    loading={uploading}
                    style={{ marginLeft: 8 }}
                  >
                    Upload CSV
                  </Button>
                </Upload>


                <a href={Sample} download>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    style={{ marginLeft: 8 }}
                  >
                    Sample CSV
                  </Button>
                </a>
   
     <Table
       columns={columns}
       dataSource={filteredContacts}
       rowKey="_id"
       pagination={{ pageSize: 10 }}
     />
     <Modal title="Add Contact" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
       <Form form={addForm} layout="vertical">
         <Form.Item
           name="service"
           label="Service"
           rules={[{ required: true, message: "Please select the service!" }]}
         >
           <Select placeholder="Select Service" onChange={(value) => setPrefix(value === 'AMAZON' ? 'AZ' : 'WB')}>
             <Option value="AMAZON">AMAZON</Option>
             <Option value="WEBSITE">WEBSITE</Option>
           </Select>
         </Form.Item>
         <Form.Item label="Enrollment ID" required>
           <Input.Group compact>
             <Input style={{ width: '20%' }} value={prefix} disabled />
             <Form.Item
               name="enrollmentId"
               noStyle
               rules={[{ required: true, message: 'Please input the Enrollment ID!' }]}
             >
               <Input style={{ width: '80%' }} placeholder="Enter ID" />
             </Form.Item>
           </Input.Group>
         </Form.Item>
         <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
           <Input type="date" />
         </Form.Item>
         <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
           <Input />
         </Form.Item>
         <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
           <Input />
         </Form.Item>
         <Form.Item name="primaryContact" label="Primary Contact" rules={[{ required: true, message: 'Please input the primary contact!' }]}>
           <Input />
         </Form.Item>
         <Form.Item
           name="managerPosition"
           label="Manager's Position"
           rules={[{ required: true, message: "Please select the manager's position!" }]}
         >
           <Select placeholder="Select Manager's Position">
             {managerPositions.map((position) => (
               <Option key={position} value={position}>
                 {position}
               </Option>
             ))}
           </Select>
         </Form.Item>


       </Form>
     </Modal>
   </div>
 );
};


export default Dashboard;




