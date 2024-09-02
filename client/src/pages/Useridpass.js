import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form, Input, message, Tag, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Useridpass = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isDocumentsModalVisible, setIsDocumentsModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/get`);
      setContacts(response.data);
      setFilteredContacts(response.data); // Set initial filtered contacts
    } catch (error) {
      console.error('Error fetching contacts:', error);
      message.error('Failed to load contacts.');
    }
  };

  const handleUpdatePassword = async (values) => {
    try {
      await axios.put(`${apiUrl}/api/contact/update-password/${currentContact._id}`, values);
      message.success('Password updated successfully');
      setIsPasswordModalVisible(false);
      form.resetFields();
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error('Error updating password:', error);
      message.error('Failed to update password');
    }
  };

  const showPasswordModal = (contact) => {
    setCurrentContact(contact);
    setIsPasswordModalVisible(true);
    form.setFieldsValue({ enrollmentId: contact.enrollmentId });
  };

  const showDocumentsModal = async (contact) => {
    setCurrentContact(contact);
    setIsDocumentsModalVisible(true);
    await fetchDocuments(contact.enrollmentId);
  };

  const handleCancel = () => {
    setIsPasswordModalVisible(false);
    setIsDocumentsModalVisible(false);
    setCurrentContact(null);
    form.resetFields();
    setFileList([]);
  };

  const fetchDocuments = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/documents/${enrollmentId}`);
      setUploadedFiles(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const deleteDocument = async (filename) => {
    const encodedFilename = encodeURIComponent(filename);
    try {
      await axios.delete(`${apiUrl}/api/contact/documents/${currentContact.enrollmentId}/${encodedFilename}`);
      message.success('Document deleted successfully');
      await fetchDocuments(currentContact.enrollmentId); // Refresh the documents list
    } catch (error) {
      console.error('Error deleting document:', error);
      message.error('Failed to delete document');
    }
  };

  const handleOk = async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('documents', file);
    });

    try {
      await axios.post(`${apiUrl}/api/contact/upload/${currentContact.enrollmentId}`, formData);
      message.success('Files uploaded successfully');
      setIsDocumentsModalVisible(false);
      setFileList([]);
      await fetchDocuments(currentContact.enrollmentId); // Refresh the documents list
    } catch (error) {
      console.error('Error uploading files:', error);
      message.error('Failed to upload files');
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList(fileList.filter(f => f.uid !== file.uid));
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleSearch = (value) => {
    const filteredData = contacts.filter(contact => contact.enrollmentId.includes(value));
    setFilteredContacts(filteredData);
  };

  const contactColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Password Status',
      dataIndex: 'passwordSet',
      key: 'passwordSet',
      render: (passwordSet) => (
        <Tag color={passwordSet ? 'green' : 'red'}>
          {passwordSet ? 'Password Set' : 'Not Set'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showPasswordModal(record)}>Set Password</Button>
          <Button onClick={() => showDocumentsModal(record)} style={{ marginLeft: 8 }}>Documents</Button>
        </>
      ),
    },
  ];

  const documentColumns = [
    {
      title: 'Document Name',
      dataIndex: 'originalName',
      key: 'originalName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EyeOutlined />} href={`${apiUrl}/api/contact/documents/view/${currentContact.enrollmentId}/${encodeURIComponent(record.originalName)}`} target="_blank">View</Button>
          <Button icon={<DownloadOutlined />} href={`${apiUrl}/api/contact/documents/download/${currentContact.enrollmentId}/${encodeURIComponent(record.originalName)}`} download>Download</Button>
          <Button icon={<DeleteOutlined />} onClick={() => deleteDocument(record.originalName)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="User ID & PASS">
            <Input.Search
              placeholder="Search by Enrollment ID"
              onSearch={handleSearch}
              style={{ marginBottom: 16, width:'14rem' }}
            />
            <Table
              columns={contactColumns}
              dataSource={filteredContacts}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
      </Row>
      
      <Modal
        title="Set Password"
        open={isPasswordModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdatePassword}>
          <Form.Item label="Enrollment ID" name="enrollmentId">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Password
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Documents"
        open={isDocumentsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
        <Table
          columns={documentColumns}
          dataSource={uploadedFiles}
          rowKey="originalName"
          pagination={{ pageSize: 10 }}
          style={{ marginTop: '20px' }}
        />
      </Modal>
    </>
  );
};

export default Useridpass;
