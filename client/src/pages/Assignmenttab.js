import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Modal, Form, Select, message, Switch, Input } from "antd";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;
const { Search } = Input;

const AssignManagers = () => {
  const [contacts, setContacts] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedContactKeys, setSelectedContactKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [showAssigned, setShowAssigned] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchContacts();
    fetchManagers();
    fetchAssignments();
  }, [selectedService, showAssigned]);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/contact/get`);
      let filteredContacts = data;
      if (selectedService) {
        filteredContacts = filteredContacts.filter(contact => contact.service === selectedService);
      }
      if (showAssigned) {
        filteredContacts = filteredContacts.filter(contact => contact.managerId);
      } else {
        filteredContacts = filteredContacts.filter(contact => !contact.managerId);
      }
      setContacts(filteredContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      message.error("Failed to load contacts. Please try again.");
    }
  };

  const fetchManagers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/managers/getactive`);
      const activeManagers = data.filter(manager => manager.status === "active");
      setManagers(activeManagers);
    } catch (error) {
      console.error("Error fetching managers:", error);
      message.error("Failed to load managers. Please try again.");
    }
  };

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/contact/manager-assignments`);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching manager assignments:", error);
      message.error("Failed to load manager assignments. Please try again.");
    }
  };

  const handleManagerSelect = async (managerId) => {
    try {
      await axios.put(`${apiUrl}/api/contact/assign-manager`, {
        contactIds: selectedContactKeys,
        managerId,
      });
      message.success("Manager assigned successfully!");
      fetchContacts();
      fetchAssignments();
      setSelectedContactKeys([]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error assigning manager:", error);
      message.error("Failed to assign manager. Please try again.");
    }
  };

  const handleUnassign = async (contactId) => {
    try {
      await axios.put(`${apiUrl}/api/contact/unassign-manager`, { contactId });
      message.success("Manager unassigned successfully!");
      fetchContacts();
      fetchAssignments();
    } catch (error) {
      console.error("Error unassigning manager:", error);
      message.error("Failed to unassign manager. Please try again.");
    }
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };

  const handleToggleChange = (checked) => {
    setShowAssigned(checked);
  };

  const handleManagerFilterChange = (value) => {
    setSelectedManagerId(value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter contacts based on the selected manager and search text
  const filteredContacts = (selectedManagerId
    ? (assignments.find((assignment) => assignment._id === selectedManagerId)?.contacts || [])
    : []
  ).filter(contact =>
    contact.enrollmentId.toLowerCase().includes(searchText.toLowerCase())
  );

  const assignmentColumns = [
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => handleUnassign(record._id)}>
          Unassign
        </Button>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedContactKeys,
    onChange: setSelectedContactKeys,
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            title="Assign Managers"
            extra={
              <>
                <Select
                  placeholder="Filter by service"
                  style={{ width: 200, marginRight: 16 }}
                  onChange={handleServiceChange}
                >
                  <Option value="">All Services</Option>
                  <Option value="AMAZON">AMAZON</Option>
                  <Option value="MEESHO">MEESHO</Option>
                  <Option value="FLIPKART">FLIPKART</Option>
                  <Option value="WEBSITE">WEBSITE</Option>
                  <Option value="EBAY">EBAY</Option>
                  <Option value="FRANCHISE">FRANCHISE</Option>
                </Select>
                <Switch 
                  checkedChildren="Assigned" 
                  unCheckedChildren="Unassigned" 
                  onChange={handleToggleChange} 
                />
                <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginLeft: 16 }}>
                  Assign Manager
                </Button>
              </>
            }
          >
            <Table
              rowSelection={rowSelection}
              columns={[
                {
                  title: "Enrollment ID",
                  dataIndex: "enrollmentId",
                  key: "enrollmentId",
                },
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                  key: "email",
                },
                {
                  title: "Primary Contact",
                  dataIndex: "primaryContact",
                  key: "primaryContact",
                },
                {
                  title: "Service",
                  dataIndex: "service",
                  key: "service",
                },
              ]}
              dataSource={contacts}
              rowKey="_id"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]} style={{ marginTop: 24 }}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            title="Manager Assignments"
            extra={
              <>
                <Select
                  placeholder="Select a manager"
                  style={{ width: 200, marginRight: 16 }}
                  onChange={handleManagerFilterChange}
                  value={selectedManagerId}
                >
                  <Option value="">Select Manager</Option>
                  {managers.map((manager) => (
                    <Option key={manager._id} value={manager._id}>
                      {manager.position} - {manager.name}
                    </Option>
                  ))}
                </Select>
                <Search
                  placeholder="Search by Enrollment ID"
                  onChange={handleSearchChange}
                  style={{ width: 200 }}
                />
              </>
            }
          >
            <Table
              columns={assignmentColumns}
              dataSource={filteredContacts}
              rowKey="_id"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Assign Manager"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={({ managerId }) => handleManagerSelect(managerId)}>
          <Form.Item
            name="managerId"
            label="Select Manager"
            rules={[{ required: true, message: "Please select a manager!" }]}
          >
            <Select placeholder="Select a manager">
              {managers.map((manager) => (
                <Option key={manager._id} value={manager._id}>
                  {manager.position} - {manager.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AssignManagers;
