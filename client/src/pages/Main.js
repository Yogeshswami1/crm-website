import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch contacts from the API
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      setContacts(response.data); // Assuming response.data is an array of contacts
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId', // Make sure this matches your API response
      key: 'enrollmentId',
    },
    {
        title: 'Manager Position',
        dataIndex: ['managerId', 'position'], // Nested object path to access manager position
        key: 'managerPosition',
      },
  ];

  return (
    <div>
      <h1>Main Page</h1>
      <Table
        columns={columns}
        dataSource={contacts}
        rowKey={(record) => record.enrollmentId} // Use a unique key for each row, e.g., enrollmentId
      />
    </div>
  );
};

export default Main;
