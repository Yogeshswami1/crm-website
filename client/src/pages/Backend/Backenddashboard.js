import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, message, Select } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const BackendDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

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
    const filteredData = contacts.filter(contact => {
      const enrollmentIdMatch = contact.enrollmentId?.toLowerCase().includes(value.toLowerCase());
      const contactNoMatch = contact.primaryContact?.toLowerCase().includes(value.toLowerCase());
      const managerMatch = contact.managerId?.position?.toLowerCase().includes(value.toLowerCase()) || false;
      const gstMatch = contact.gst?.toLowerCase().includes(value.toLowerCase()) || false;
      const gstNumberMatch = contact.gstNumber?.toLowerCase().includes(value.toLowerCase()) || false;
  
      return enrollmentIdMatch || contactNoMatch || managerMatch || gstMatch || gstNumberMatch;
    });
  
    setFilteredContacts(filteredData);
  };
  

  const pgMediumOptions = ['Instamojo', 'Razorpay', 'Cvenue'];
  const pgIntegrationOptions = ['Approved', 'Applied', 'Rejected'];
  const paypalIntegrationOptions = ['Approved', 'Applied', 'Rejected'];

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Contact No.',
      dataIndex: 'primaryContact',
      key: 'primaryContact',
    },
    {
      title: 'Manager Position',
      dataIndex: 'managerId',
      key: 'managerPosition',
      render: (managerId) => (managerId && managerId.position ? managerId.position : 'N/A'),
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
        title: 'PG Medium',
        dataIndex: 'pgMedium',
        key: 'pgMedium',
        render: (value, record) => (
          <Select
            defaultValue={value}
            style={{ width: 120 }}
            onChange={(selectedValue) => handleUpdateChange(record._id, 'pgMedium', selectedValue)}
          >
            {pgMediumOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        ),
      },
      {
        title: 'PG Integration',
        dataIndex: 'pgIntegration',
        key: 'pgIntegration',
        render: (value, record) => (
          <Select
            defaultValue={value}
            style={{ width: 120 }}
            onChange={(selectedValue) => handleUpdateChange(record._id, 'pgIntegration', selectedValue)}
          >
            {pgIntegrationOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        ),
      },
      {
        title: 'PayPal Integration',
        dataIndex: 'paypalIntegration',
        key: 'paypalIntegration',
        render: (value, record) => (
          <Select
            defaultValue={value}
            style={{ width: 120 }}
            onChange={(selectedValue) => handleUpdateChange(record._id, 'paypalIntegration', selectedValue)}
          >
            {paypalIntegrationOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        ),
      },
      
    {
        title: 'Update 1',
        dataIndex: 'update1',
        key: 'update1',
        render: (text, record) => (
          <Input 
            defaultValue={text} 
            onBlur={(e) => handleUpdateChange(record._id, 'update1', e.target.value)} // Use onBlur to trigger the API update after user finishes editing
          />
        ),
      },
      {
        title: 'Update 2',
        dataIndex: 'update2',
        key: 'update2',
        render: (text, record) => (
          <Input 
            defaultValue={text} 
            onBlur={(e) => handleUpdateChange(record._id, 'update2', e.target.value)} 
          />
        ),
      },
      {
        title: 'Update 3',
        dataIndex: 'update3',
        key: 'update3',
        render: (text, record) => (
          <Input 
            defaultValue={text} 
            onBlur={(e) => handleUpdateChange(record._id, 'update3', e.target.value)} 
          />
        ),
      },
      
  ];

  const handleUpdateChange = async (key, column, value) => {
    const newContacts = [...filteredContacts];
    const index = newContacts.findIndex((contact) => contact._id === key); // Use _id for unique identification
      
    if (index !== -1) {
      newContacts[index][column] = value; // Update the respective column value
      setFilteredContacts(newContacts); // Update the state with the new contacts array
  
      try {
        // Send the updated data to the backend
        await axios.put(`${apiUrl}/api/contact/update/${key}`, {
          [column]: value // Send the specific updated field to the backend
        });
        message.success("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
        message.error("Failed to update data.");
      }
    }
  };
  
  

  return (
    <div className="backend-dashboard-container">
      <Title level={2}>Backend Dashboard</Title>
      <Search placeholder="Search..." onSearch={handleSearch} enterButton style={{ marginBottom: '20px' }} />
      <Card>
        <Table
          columns={columns}
          dataSource={filteredContacts}
          pagination={false}
          rowKey="_id"
        />
      </Card>
    </div>
  );
};

export default BackendDashboard;
