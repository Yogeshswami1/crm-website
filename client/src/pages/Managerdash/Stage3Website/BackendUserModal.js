import React, { useState, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';


const { Option } = Select;


const BackendUserModal = ({ visible, onCancel, record, fetchData }) => {
 const [backendUsers, setBackendUsers] = useState([]);
 const [selectedBackendUser, setSelectedBackendUser] = useState(null);


 const apiUrl = process.env.REACT_APP_BACKEND_URL;


 useEffect(() => {
   // Fetch backend users
   const fetchBackendUsers = async () => {
     try {
       const response = await axios.get(`${apiUrl}/api/backend`);
       setBackendUsers(response.data);
     } catch (error) {
       toast.error('Failed to fetch backend users');
     }
   };


   if (visible) {
     fetchBackendUsers();
   }
 }, [visible]);


 useEffect(() => {
   if (record && record.backendUser) {
     setSelectedBackendUser(record.backendUser);
   }
 }, [record]);


 const handleSave = async () => {
   try {
     await axios.put(`${apiUrl}/api/contact/${record._id}`, {
       backendUser: selectedBackendUser,
     });
     toast.success('Backend User updated successfully');
     fetchData();
     onCancel();
   } catch (error) {
     toast.error('Failed to update backend user');
   }
 };


 return (
   <Modal
     title="Select Backend User"
     open={visible}
     onCancel={onCancel}
     footer={[
       <Button key="back" onClick={onCancel}>Cancel</Button>,
       <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
     ]}
   >
     <Select
       value={selectedBackendUser}
       onChange={(value) => setSelectedBackendUser(value)}
       placeholder="Select Backend User"
       style={{ width: '100%' }}
     >
       {backendUsers.map((user) => (
         <Option key={user.id} value={user.id}>
           {user.id}
         </Option>
       ))}
     </Select>
   </Modal>
 );
};


export default BackendUserModal;



