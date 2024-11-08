import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Modal, Switch, message, Select, Button } from 'antd';
import axios from 'axios';
import Papa from 'papaparse';
import moment from 'moment';
import './Dash.css';


const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Dash = () => {
const [userData, setUserData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedContact, setSelectedContact] = useState(null);
const [legalityStatus, setLegalityStatus] = useState(selectedContact?.legalityStatus || 'false');
const [billSent, setBillSent] = useState(selectedContact?.billSent || 'false');
const [legalityFilter, setLegalityFilter] = useState("all");




const fetchContacts = () => {
  axios.get(`${apiUrl}/api/contact/getcontact`)
    .then(response => {
      const websiteServiceData = response.data.filter(item => item.service === 'WEBSITE');
      const sortedData = websiteServiceData.sort((a, b) => {
        const aId = parseInt(a.enrollmentId.replace(/[^\d]/g, ''), 10);
        const bId = parseInt(b.enrollmentId.replace(/[^\d]/g, ''), 10);
        return bId - aId;
      });
      setUserData(sortedData);
      setFilteredData(sortedData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
};


useEffect(() => {
 if (selectedContact) {
   setBillSent(selectedContact.billsSent === 'true' ? 'true' : 'false');
   setLegalityStatus(selectedContact.legalityStatus === 'true' ? 'true' : 'false');
 }
}, [selectedContact]);


useEffect(() => {
 fetchContacts();
}, []); 




const handleSearch = (value) => {
  const filtered = userData.filter(item => {
    const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
    const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
    const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
    const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());
    return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
  });
  setFilteredData(filtered);
};


const handleEnrollmentClick = (record) => {
  setSelectedContact(record);
  setIsModalVisible(true);
};


const handleCancel = () => {
  setIsModalVisible(false);
  setSelectedContact(null);
};


const handleLegalityStatusChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';
  // Update local state for live UI feedback
 setLegalityStatus(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     legalityStatus: updatedStatus, // Send updated status to backend
   });
   message.success(`Legality status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts(); // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating legality status:", error);
   message.error("Failed to update legality status. Please try again.");
 }
};


const handleBillSentChange = async (record, checked) => {
 const updatedStatus = checked ? 'true' : 'false';


 // Update local state for live UI feedback
 setBillSent(updatedStatus);


 try {
   await axios.put(`${apiUrl}/api/contact/${record._id}`, {
     billsSent: updatedStatus, // Send updated status to backend
   });
   message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
   fetchContacts();  // Optionally refresh the data from the server
 } catch (error) {
   console.error("Error updating bills status:", error);
   message.error("Failed to update bills status. Please try again.");
 }
};




const handleLegalityFilterChange = (value) => {
 setLegalityFilter(value);
 const filtered = userData.filter(item =>
   value === "all" ||
   (value === "true" && item.legalityStatus === 'true') ||
   (value === "false" && (item.legalityStatus === 'false' || !item.legalityStatus))
 );
 setFilteredData(filtered);
};


const downloadCSV = () => {
 const dataToExport = filteredData.map(({ date, enrollmentId, name, primaryContact }) => ({
   date: moment(date).isValid() ? moment(date).format("DD-MM-YYYY") : 'N/A', // Format date to DD-MM-YYYY or show 'N/A' if invalid
   enrollmentId,
   name,
   primaryContact,
 }));


 const csv = Papa.unparse(dataToExport);
 const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.setAttribute("href", url);
 link.setAttribute("download", "filtered_data.csv");
 link.click();
};




const paymentColumns = [
 {
   title: 'Enrollment ID',
   dataIndex: 'enrollmentId',
   key: 'enrollmentId',
   width: 130,
   render: (text, record) => {
     let backgroundColor = '';
      // Check conditions for legalityStatus and billsSent
     if (record.legalityStatus === 'true' && record.billsSent === 'true') {
       // Both statuses true, split background (half yellow, half green)
       backgroundColor = 'linear-gradient(90deg, yellow 70%, lightgreen 30%)';
     } else if (record.legalityStatus === 'true') {
       // Only legalityStatus true, full yellow background
       backgroundColor = 'yellow';
     } else if (record.billsSent === 'true') {
       // Only billsSent true, full green background
       backgroundColor = 'lightgreen';
     }
      // Apply the background color (gradient or solid)
     return (
       <a
         onClick={() => handleEnrollmentClick(record)}
         style={{ background: backgroundColor, padding: '5px', borderRadius: '4px', display: 'inline-block', width: '100%' }} // Apply the gradient and other styles
       >
         {text}
       </a>
     );
   },
 },
   {
    title: 'Stage 1 Payment',
    children: [
     {
       title: 'Date',
       dataIndex: ['payment', 'stage1', 'date'],
       key: 'stage1PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },     
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage1', 'paymentMode'],
       key: 'stage1PaymentAmount',
     },
      {
        title: 'Amount',
        dataIndex: ['payment', 'stage1', 'amount'],
        key: 'stage1PaymentAmount',
      },
      {
        title: 'Status',
        dataIndex: ['payment', 'stage1', 'status'],
        key: 'stage1PaymentStatus',
      },
    ],
  },
  {
    title: 'Stage 2 Payment',
    children: [
     {
       title: 'Date',
       dataIndex: ['payment', 'stage2', 'date'],
       key: 'stage2PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },
    
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage2', 'paymentMode'],
       key: 'stage2PaymentAmount',
     },
      {
        title: 'Amount',
        dataIndex: ['payment', 'stage2', 'amount'],
        key: 'stage2PaymentAmount',
      },
      {
        title: 'Status',
        dataIndex: ['payment', 'stage2', 'status'],
        key: 'stage2PaymentStatus',
      },
    ],
  },
  {
    title: 'Stage 3 Payment',
    children: [
     {
       title: 'Date',
       dataIndex: ['payment', 'stage3', 'date'],
       key: 'stage3PaymentDate',
       render: (date) => date ? moment(date).format('DD-MM-YYYY') : 'N/A',
     },
    
     {
       title: 'Mode',
       dataIndex: ['payment', 'stage3', 'paymentMode'],
       key: 'stage3PaymentAmount',
     },
      {
        title: 'Amount',
        dataIndex: ['payment', 'stage3', 'amount'],
        key: 'stage3PaymentAmount',
      },
      {
        title: 'Status',
        dataIndex: ['payment', 'stage3', 'status'],
        key: 'stage3PaymentStatus',
      },
    ],
  },
];








const dataSource = [
  {
    key: '1',
    label: 'Date',
    value: selectedContact?.date ? moment(selectedContact.date).format('DD-MM-YYYY') : 'N/A',
  },
  {
    key: '2',
    label: 'Enrollment ID',
    value: selectedContact?.enrollmentId || 'N/A',
  },
  {
    key: '3',
    label: 'Name',
    value: selectedContact?.name || 'N/A',
  },
  {
    key: '4',
    label: 'Primary Contact',
    value: selectedContact?.primaryContact || 'N/A',
  },
  {
    key: '5',
    label: 'Email',
    value: selectedContact?.email || 'N/A',
  },
  {
    key: '6',
    label: 'GST',
    value: selectedContact?.gst || 'N/A',
  },
  {
    key: '7',
    label: 'GST Number',
    value: selectedContact?.gstNumber || 'N/A',
  },
  {
    key: '8',
    label: 'State',
    value: selectedContact?.state || 'N/A',
  },
  {
    key: '9',
    label: 'Manager',
    value: selectedContact?.managerId?.position || 'N/A', // Safely access nested property
  },
  {
    key: '10',
    label: 'Legality',
    value: selectedContact?.legality || 'N/A',
  },
  {
    key: '11',
    label: 'Legality Link',
    value: selectedContact?.legalityLink ? (
      <a href={selectedContact.legalityLink} target="_blank" rel="noopener noreferrer">Open Legality Link</a>
    ) : 'N/A',
  },
  {
   key: '12',
   label: 'Legality Status',
   value: (
     <Switch
       checked={legalityStatus === 'true'}
       onChange={(checked) => handleLegalityStatusChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },
 {
   key: '13',
   label: 'Bill Sent',
   value: (
     <Switch
       checked={billSent === 'true'}
       onChange={(checked) => handleBillSentChange(selectedContact, checked)}
       checkedChildren="true"
       unCheckedChildren="false"
     />
   ),
 },
];


const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];
return (
  <div style={{ maxHeight: '1000px', overflowY: 'auto',padding: '20px' }}>
    <Card title="Welcome Accountant" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Search
          placeholder="Search by Enrollment ID, Name, Email, or Primary Contact"
          onSearch={handleSearch}
          enterButton
          style={{ width: "30rem" }}
        />
      </div>
      <Select defaultValue="all" onChange={handleLegalityFilterChange}  style={{ width: "9rem" }}>
           <Option value="all">Legality Status</Option>
           <Option value="true">Done</Option>
           <Option value="false">Not Done</Option>
         </Select>
         <Button onClick={downloadCSV}>Download CSV</Button>
      <Table
        columns={paymentColumns}
        dataSource={filteredData}
        rowKey="enrollmentId"
        className="custom-table"
      />
      {selectedContact && (
       <Modal
       title="Contact Details"
       open={isModalVisible}
       onCancel={handleCancel}
       footer={null}
     >
       <Table
         dataSource={dataSource}
         columns={columns}
         pagination={false} // Disable pagination
         showHeader={false} // Hide the header
       />
     </Modal>
   
      )}
    </Card>
  </div>
);
};








export default Dash;

































