import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Button, Modal, Select, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Waba = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templates, setTemplates] = useState([]);
  const [primaryContact, setPrimaryContact] = useState('');
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    if (managerId) {
      axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
        .then(response => {
          setUserData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [managerId]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/whatsapp/get-templates`)
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });
  }, []);

  const handleOpenModal = (contact) => {
    setPrimaryContact(contact.primaryContact);
    setIsModalVisible(true);
  };

  const handleSendTemplate = () => {
    let to = primaryContact;
    if (to.length === 10) {
      to = `+91${to}`;
    }

    axios.post(`${apiUrl}/api/whatsapp/send-template-message`, {
      to,
      language: 'en',
      templateName: selectedTemplate
    })
      .then(response => {
        console.log(response.data);
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('Error sending template message:', error);
      });
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleOpenModal(record)}>Send Template</Button>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Total Users" value={filteredData.length} />
          </Card>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} rowKey="enrollmentId" />
      <Modal
        title="Send Template"
        open={isModalVisible}
        onOk={handleSendTemplate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Select a template"
          onChange={value => setSelectedTemplate(value)}
        >
          {templates.map(template => (
            <Option key={template.name} value={template.name}>
              {template.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default Waba;
