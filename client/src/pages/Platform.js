import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";




const { Option } = Select;





const project = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];

const dataproject = [
  // Existing project entries
];

const taskColumns = [
  {
    title: "TASK DATE",
    dataIndex: "taskDate",
    key: "taskDate",
  },
  {
    title: "ENROLLMENT ID",
    dataIndex: "enrollmentId",
    key: "enrollmentId",
  },
  {
    title: "TASK",
    dataIndex: "task",
    key: "task",
  },
  {
    title: "TASK STATUS",
    dataIndex: "taskStatus",
    key: "taskStatus",
  },
];

const initialTaskData = [
  {
    key: "1",
    taskDate: "2024-07-01",
    enrollmentId: "123456",
    task: "Create React Component",
    taskStatus: "IN",
  },
];

function Platform() {
  const [currentTab, setCurrentTab] = useState("IN");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskData, setTaskData] = useState(initialTaskData);

  useEffect(() => {
    // Fetch initial data or perform any necessary setup
  }, []);

  const onChangeTab = (e) => {
    setCurrentTab(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTask = async (values) => {
    try {
      // Make POST request to add task
      const response = await axios.post("https://your-api-endpoint/tasks", values);
      const newTask = {
        key: response.data.id,
        taskDate: values.taskDate.format("YYYY-MM-DD"),
        enrollmentId: values.enrollmentId,
        task: values.task,
        taskStatus: values.taskStatus,
      };
      setTaskData([...taskData, newTask]);
      setIsModalVisible(false);
      message.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
              extra={
                <Radio.Group onChange={onChangeTab} defaultValue="IN">
                  <Radio.Button value="IN">IN</Radio.Button>
                  <Radio.Button value="COM">COM</Radio.Button>
                </Radio.Group>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={taskColumns}
                  dataSource={taskData.filter((task) => task.taskStatus === currentTab)}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <Button
                type="dashed"
                onClick={showModal}
                icon={<PlusOutlined />}
                style={{ marginTop: 16 }}
              >
                Add Task
              </Button>
            </Card>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group onChange={onChangeTab} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddTask}>
          <Form.Item
            name="taskDate"
            label="Task Date"
            rules={[{ required: true, message: "Please select a task date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="enrollmentId"
            label="Enrollment ID"
            rules={[
              { required: true, message: "Please input the enrollment ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="task"
            label="Task"
            rules={[{ required: true, message: "Please input the task!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="taskStatus"
            label="Task Status"
            rules={[
              { required: true, message: "Please select the task status!" },
            ]}
          >
            <Select>
              <Option value="IN">IN</Option>
              <Option value="COM">COM</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Platform;
