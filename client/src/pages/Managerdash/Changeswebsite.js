import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Row, Col, Typography, Select, Modal, Form, Spin, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ManagerChangesTable = ({ apiUrl }) => {
  const [changes, setChanges] = useState([]);
  const [enrollmentIds, setEnrollmentIds] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingChange, setEditingChange] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchEnrollmentIds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/contacts`);
        setEnrollmentIds(response.data);
      } catch (error) {
        console.error('Error fetching enrollment IDs: ', error);
      }
    };

    fetchEnrollmentIds();
  }, [apiUrl]);

  const fetchChanges = async (enrollmentId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/changes/${enrollmentId}`);
      setChanges(response.data.changes);
    } catch (error) {
      console.error('Error fetching changes: ', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChangeStatus = async (changeId, status) => {
    try {
      await axios.put(`${apiUrl}/api/changes/${selectedEnrollment}/${changeId}`, { status });
      setChanges((prevChanges) =>
        prevChanges.map((change) =>
          change._id === changeId ? { ...change, status } : change
        )
      );
      message.success('Change status updated successfully');
    } catch (error) {
      console.error('Error updating change status: ', error);
      message.error('Failed to update change status');
    }
  };

  const openEditModal = (change) => {
    setEditingChange(change);
    setNewDescription(change.description);
  };

  const handleEditChange = async () => {
    try {
      await axios.put(`${apiUrl}/api/changes/${selectedEnrollment}/${editingChange._id}`, {
        description: newDescription,
      });
      setChanges((prevChanges) =>
        prevChanges.map((change) =>
          change._id === editingChange._id ? { ...change, description: newDescription } : change
        )
      );
      setEditingChange(null);
      message.success('Change description updated successfully');
    } catch (error) {
      console.error('Error updating change description: ', error);
      message.error('Failed to update change description');
    }
  };

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'key',
      key: 'key',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Manager Position',
      dataIndex: 'managerPosition',
      key: 'managerPosition',
      render: () => changes.length > 0 ? changes[0].managerPosition : '',
    },
    {
      title: 'Change Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => updateChangeStatus(record._id, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: 'Change Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={4}>List of Changes</Title>
        </Col>
        <Col>
          <Select
            style={{ width: 200 }}
            placeholder="Select User"
            onChange={(value) => {
              setSelectedEnrollment(value);
              fetchChanges(value);
            }}
          >
            {enrollmentIds.map((id) => (
              <Option key={id} value={id}>
                {id}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={changes} columns={columns} rowKey="_id" pagination={false} />
      )}
      <Modal
        visible={!!editingChange}
        title="Edit Change Description"
        onCancel={() => setEditingChange(null)}
        onOk={handleEditChange}
      >
        <Form layout="vertical">
          <Form.Item label="Description">
            <Input.TextArea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerChangesTable;
