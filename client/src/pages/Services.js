import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from "antd";
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

function Services() {
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch initial service data
    axios.get(`${apiUrl}/api/services/get`)
      .then(response => {
        // Assign _id to key for each service
        const services = response.data.map(service => ({
          ...service,
          key: service._id,
        }));
        setServiceData(services);
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const showServiceModal = () => {
    setIsServiceModalVisible(true);
  };

  const handleServiceCancel = () => {
    setIsServiceModalVisible(false);
    form.resetFields();
  };

  const handleAddService = async (values) => {
    try {
      const response = await axios.post(`${apiUrl}/api/services/create`, {
        serviceName: values.serviceName,
        prefix: values.prefix,
        platform: values.platform,
        tasks: values.tasks ? values.tasks.map(task => task.task) : [],
      });

      const newService = {
        key: response.data._id,
        serviceName: values.serviceName,
        prefix: values.prefix,
        platform: values.platform,
        tasks: response.data.tasks,
      };
      setServiceData([...serviceData, newService]);

      setIsServiceModalVisible(false);
      form.resetFields();
      message.success("Service and tasks added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      message.error("Failed to add service. Please try again.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${apiUrl}/api/services/delete/${_id}`);
      setServiceData(serviceData.filter(service => service._id !== _id));
      message.success("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error("Failed to delete service. Please try again.");
    }
  };

  const serviceColumns = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this service?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Services Table"
              extra={
                <Button
                  type="dashed"
                  onClick={showServiceModal}
                  icon={<PlusOutlined />}
                >
                  Add Service
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={serviceColumns}
                  dataSource={serviceData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Add New Service"
        open={isServiceModalVisible}
        onCancel={handleServiceCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddService}>
          <Form.Item
            name="serviceName"
            label="Service Name"
            rules={[{ required: true, message: "Please input the service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="prefix"
            label="Prefix"
            rules={[{ required: true, message: "Please input the prefix!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: "Please select the platform!" }]}
          >
            <Select>
              <Option value="NONE">None</Option>
              <Option value="IN">IN</Option>
              <Option value="COM">COM</Option>
            </Select>
          </Form.Item>

          <Form.List name="tasks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'task']}
                      fieldKey={[fieldKey, 'task']}
                      label="Task"
                      rules={[{ required: true, message: 'Please input the task!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Task
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Services;
