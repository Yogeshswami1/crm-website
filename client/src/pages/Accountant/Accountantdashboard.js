import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Modal, message,Switch  } from 'antd';
import axios from 'axios';
import './Dash.css';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons'; // Import Ant Design icons

const { Search } = Input;
const { Title } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dash = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/contact/get`)
      .then(response => {
        const websiteServiceData = response.data.filter(item => item.service === 'WEBSITE');
        setUserData(websiteServiceData);
        setFilteredData(websiteServiceData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };

  const handleSearch = (value) => {
    const filteredUserData = userData.filter(item => {
      const enrollmentIdMatch = item.enrollmentId.toLowerCase().includes(value.toLowerCase());
      const nameMatch = item.name.toLowerCase().includes(value.toLowerCase());
      const emailMatch = item.email.toLowerCase().includes(value.toLowerCase());
      const primaryContactMatch = item.primaryContact.toLowerCase().includes(value.toLowerCase());

      return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
    });

    const filteredContactData = contacts.filter(contact => {
      const enrollmentIdMatch = contact.enrollmentId.toLowerCase().includes(value.toLowerCase());
      const nameMatch = contact.name.toLowerCase().includes(value.toLowerCase());
      const emailMatch = contact.email.toLowerCase().includes(value.toLowerCase());
      const primaryContactMatch = contact.primaryContact.toLowerCase().includes(value.toLowerCase());

      return enrollmentIdMatch || nameMatch || emailMatch || primaryContactMatch;
    });

    setFilteredData(filteredUserData); // For Payment Table
    setFilteredContacts(filteredContactData); // For Contact Table
  };

  const handleEnrollmentClick = (record) => {
    setSelectedContact(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedContact(null);
  };

  const handleBillsToggle = async (record, checked) => {
    const updatedStatus = checked ? 'Sent' : 'Not Sent';
    try {
      await axios.put(`${apiUrl}/api/contact/updatebills/${record._id}`, {
        billsSent: checked
      });
      message.success(`Bills status updated to ${updatedStatus} for ${record.name}`);
      fetchContacts();  // Refresh the data
    } catch (error) {
      console.error("Error updating bills status:", error);
      message.error("Failed to update bills status. Please try again.");
    }
  };
  const paymentColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
      render: (text, record) => <a onClick={() => handleEnrollmentClick(record)}>{text}</a>,
    },
    {
      title: 'Stage 1 Payment',
      children: [
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
  const downloadFile = async (url) => {
    try {
      // Fetch the file as a Blob (binary data)
      const response = await axios.get(url, {
        responseType: 'blob', // This tells axios to expect a binary response
      });
  
      // Create a temporary link element to download the Blob
      const link = document.createElement('a');
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      link.href = fileURL;
  
      // Extract the file name from the URL or use a default name
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      link.setAttribute('download', fileName);
  
      // Trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up the temporary link element
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  const contactColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'primaryContact',
      key: 'primaryContact',
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      key: 'gst',
      render: (text) => (text ? text : 'N/A'),
    },
    {
      title: 'GST Number',
      dataIndex: 'gstNumber',
      key: 'gstNumber',
      render: (text) => (text ? text : 'N/A'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (text) => (text ? text : 'Not Provided'),
    },
    {
      title: 'Legality',
      dataIndex: 'legality',
      key: 'legality',
      render: (text) => (text && text !== 'Not Done' ? text : 'Not Done'),
    },
    {
      title: 'Legality Link',  // Column for both download and view buttons
      dataIndex: 'legalityLink',
      key: 'legalityLink',
      render: (text, record) => (
        text ? (
          <div>
            {/* View Document button with Eye icon */}
            <a href={text} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
              <EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} title="View Document" />
            </a>
  
            {/* Download Document button with Download icon */}
            <a 
              href={text} 
              download // The download attribute forces the browser to download the file
              target="_blank" // Adding this ensures it opens in a new tab in case download fails
              rel="noopener noreferrer"
            >
              <DownloadOutlined style={{ fontSize: '18px', color: '#52c41a' }} title="Download Document" />
            </a>
          </div>
        ) : 'No Link Available'
      ),
    },
    {
      title: 'Bills',
      key: 'billsSent',
      render: (text, record) => (
        <Switch
          checked={record.billsSent}  // Toggle based on billsSent status
          onChange={(checked) => handleBillsToggle(record, checked)}
          checkedChildren="Sent"
          unCheckedChildren="Not Sent"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
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
        <Table
          columns={paymentColumns}
          dataSource={filteredData}  // Payment Table filtered data
          rowKey="enrollmentId"
          className="custom-table"
        />
        <Title level={4} style={{ textAlign: 'center', marginTop: '40px' }}>Contact Details</Title>
        <Table
          columns={contactColumns}
          dataSource={filteredContacts}  // Contact Table filtered data
          rowKey="_id"
          className="custom-table"
        />
        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} title="Contact Details">
          {selectedContact && (
            <div>
              <p><strong>Enrollment ID:</strong> {selectedContact.enrollmentId}</p>
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Primary Contact:</strong> {selectedContact.primaryContact}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>GST:</strong> {selectedContact.gst || 'N/A'}</p>
              <p><strong>GST Number:</strong> {selectedContact.gstNumber || 'N/A'}</p>
              <p><strong>State:</strong> {selectedContact.state || 'Not Provided'}</p>
              <p><strong>Legality:</strong> {selectedContact.legality || 'Not Done'}</p>
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default Dash;
