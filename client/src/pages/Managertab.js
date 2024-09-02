import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Managertab = () => {
  const [managers, setManagers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editingManager, setEditingManager] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/managers/get`);
      setManagers(data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  // const handleAddManager = async (values) => {
  //   try {
  //     if (editingManager) {
  //       await axios.patch(`${apiUrl}/api/managers/${editingManager._id}`, values);
  //       message.success("Manager updated successfully");
  //     } else {
  //       values.status = 'inactive'; // Default status to inactive
  //       await axios.post(`${apiUrl}/api/managers/create`, values);
  //       message.success("Manager added successfully");
  //     }
  //     fetchManagers();
  //     form.resetFields();
  //     setIsModalVisible(false);
  //     setEditingManager(null);
  //   } catch (error) {
  //     if (error.response && error.response.status === 409) {
  //       message.error("Email already exists. Please use a different email.");
  //     } else {
  //       console.error("Error adding/updating manager:", error);
  //       message.error("Failed to save manager");
  //     }
  //   }
  // };

  const handleAddManager = async (values) => {
    try {
      // Assuming managers is available in the component's state or props
      const positionExists = managers.some(manager => manager.position === values.position);
  
      if (positionExists && (!editingManager || (editingManager && editingManager.position !== values.position))) {
        message.error("Position already exists. Please choose a different position.");
        return;
      }
  
      if (editingManager) {
        await axios.patch(`${apiUrl}/api/managers/${editingManager._id}`, values);
        message.success("Manager updated successfully");
      } else {
        values.status = 'inactive'; // Default status to inactive
        await axios.post(`${apiUrl}/api/managers/create`, values);
        message.success("Manager added successfully");
      }
  
      fetchManagers();
      form.resetFields();
      setIsModalVisible(false);
      setEditingManager(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("Email already exists. Please use a different email.");
      } else {
        console.error("Error adding/updating manager:", error);
        message.error("Failed to save manager");
      }
    }
  };
  

  const handleDeleteManager = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/managers/${id}`);
      message.success("Manager deleted successfully");
      fetchManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
      message.error("Failed to delete manager");
    }
  };

  const handleEditManager = (record) => {
    setEditingManager(record);
    form.setFieldsValue({
      ...record,
      dateOfJoining: record.dateOfJoining ? moment(record.dateOfJoining) : null,
    });
    setIsModalVisible(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.patch(`${apiUrl}/api/managers/${id}`, { status: newStatus });
      message.success(`Manager status updated to ${newStatus}`);
      fetchManagers();
    } catch (error) {
      console.error("Error updating manager status:", error);
      message.error("Failed to update manager status");
    }
  };

  const handleSetPassword = async (values) => {
    try {
      await axios.patch(`${apiUrl}/api/managers/${selectedManager._id}`, { password: values.password });
      message.success("Password set successfully");
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
      setSelectedManager(null);
      fetchManagers();
    } catch (error) {
      console.error("Error setting password:", error);
      message.error("Failed to set password");
    }
  };

  const columns = [
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
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
      render: (dateOfJoining) => dateOfJoining ? moment(dateOfJoining).format('YYYY-MM-DD') : '-',
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Button
          style={{ backgroundColor: status === "active" ? "green" : "red", color: "white" }}
          onClick={() => handleToggleStatus(record._id, status)}
        >
          {status.toUpperCase()}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEditManager(record)} style={{ width: "4rem" }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteManager(record._id)} style={{ width: "4rem" }} />
        </>
      ),
    },
  ];

  const positionColumns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedManager(record);
            setIsPasswordModalVisible(true);
          }}
        >
          Set Password
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            title="Managers"
            extra={
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add Manager
              </Button>
            }
          >
            <Table columns={columns} dataSource={managers} rowKey="_id" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]} style={{ marginTop: "20px" }}>
        <Col xs={24} xl={24}>
          <Card bordered={false} title="Manager ID & PASS">
            <Table columns={positionColumns} dataSource={managers} rowKey="_id" />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingManager ? "Edit Manager" : "Add Manager"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingManager(null);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleAddManager(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position" rules={[{ required: true, message: "Please input the position!" }]}>
            <Select>
              {Array.from({ length: 20 }, (_, i) => (
                <Option key={i} value={`TL${i + 1}`}>{`TL${i + 1}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="dateOfJoining" label="Joining Date" rules={[{ required: true, message: "Please input the joining date!" }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input the address!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "Please input the contact number!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="service" label="Service" rules={[{ required: true, message: "Please select a service!" }]}>
            <Select>
              <Option value="AMAZON">AMAZON</Option>
              <Option value="WEBSITE">WEBSITE</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Set Manager Password"
        open={isPasswordModalVisible}
        onCancel={() => {
          setIsPasswordModalVisible(false);
          setSelectedManager(null);
          passwordForm.resetFields();
        }}
        onOk={() => {
          passwordForm
            .validateFields()
            .then((values) => {
              handleSetPassword(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item label="Position">
            <Input value={selectedManager?.position} readOnly />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input the password!" }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Managertab;
