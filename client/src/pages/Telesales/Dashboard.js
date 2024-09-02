import React, { useState, useEffect } from 'react';
import { Radio, Table, message, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [service, setService] = useState('AMAZON');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [prefix, setPrefix] = useState('AZ');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts(service);
  }, [contacts, service]);

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
    const filtered = contacts.filter(contact => contact.service === service);
    setFilteredContacts(filtered);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const maskContactNumber = (contactNumber) => {
    if (contactNumber.length >= 3) {
      return contactNumber.slice(0, -3).replace(/./g, '*') + contactNumber.slice(-3);
    }
    return contactNumber;
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

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleFilterOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleSearch(values);
        setIsFilterModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
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

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleSearch = (values) => {
    let filtered = [...contacts];

    if (values.enrollmentId) {
      filtered = filtered.filter(contact => contact.enrollmentId === values.enrollmentId);
    }

    if (values.primaryContact) {
      filtered = filtered.filter(contact => contact.primaryContact.includes(values.primaryContact));
    }

    if (values.name) {
      filtered = filtered.filter(contact => contact.name.toLowerCase().includes(values.name.toLowerCase()));
    }

    setFilteredContacts(filtered);
  };

  const handleReset = () => {
    form.resetFields();
    fetchContacts();
  };

  const handleServiceSelectChange = (value) => {
    const prefix = value === 'AMAZON' ? 'AZ' : 'WB';
    setPrefix(prefix);
    addForm.setFieldsValue({ enrollmentId: '' }); // Reset the enrollment ID input
  };

  return (
    <div>
      <Radio.Group value={service} onChange={handleServiceChange} style={{ marginBottom: 16 }}>
        <Radio.Button value="AMAZON">AMAZON</Radio.Button>
        <Radio.Button value="WEBSITE">WEBSITE</Radio.Button>
      </Radio.Group>
      <Button type="primary" onClick={showFilterModal} style={{ marginBottom: 16, marginRight: 8 }}>
        Filter
      </Button>
      <Button onClick={handleReset} style={{ marginBottom: 16 }}>
        Reset
      </Button>
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16, marginRight: 8 }}>
        Add Contact
      </Button>
     
      <Table
        columns={columns}
        dataSource={filteredContacts}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      <Modal title="Filter Contacts" visible={isFilterModalVisible} onOk={handleFilterOk} onCancel={handleFilterCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="enrollmentId" label="Search by Enrollment ID">
            <Input placeholder="Enter Enrollment ID" />
          </Form.Item>
          <Form.Item name="primaryContact" label="Search by Primary Contact">
            <Input placeholder="Enter Primary Contact" />
          </Form.Item>
          <Form.Item name="name" label="Search by Name">
            <Input placeholder="Enter Name" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Add Contact" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select the service!" }]}
          >
            <Select placeholder="Select Service" onChange={handleServiceSelectChange}>
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
          <Form.Item name="secondaryContact" label="Secondary Contact">
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
