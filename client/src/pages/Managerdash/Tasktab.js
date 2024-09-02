import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message, DatePicker } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import moment from 'moment';
import FloatingButton from '../Float/Floatingbutton';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;

const Tasktab = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();
  const [enrollmentIds, setEnrollmentIds] = useState([]);

  const managerId = localStorage.getItem("managerId");

  const fetchEnrollmentIds = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
      const enrollmentIdsData = response.data.map(contact => contact.enrollmentId);
      setEnrollmentIds(enrollmentIdsData);
    } catch (error) {
      console.error('Error fetching enrollment IDs:', error);
    }
  }, [managerId]);

  const debouncedFetchTasks = useCallback(
    debounce(async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`);
        const tasksData = response.data.flatMap(contact =>
          contact.tasks.map(task => ({
            enrollmentId: contact.enrollmentId,
            status: task.status,
            comment: task.comment,
            startDate: task.startDate,
            endDate: task.endDate,
            _id: task._id,
          }))
        );
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }, 300),
    [managerId]
  );

  useEffect(() => {
    fetchEnrollmentIds();
    debouncedFetchTasks();
  }, [fetchEnrollmentIds, debouncedFetchTasks]);

  const handleAddTask = () => {
    setIsModalVisible(true);
    setCurrentTask(null);
    form.resetFields();
  };

  const handleEditTask = (task) => {
    setIsModalVisible(true);
    setCurrentTask(task);
    form.setFieldsValue({
      ...task,
      startDate: task.startDate ? moment(task.startDate) : null,
      endDate: task.endDate ? moment(task.endDate) : null,
    });
  };

  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`${apiUrl}/api/contact/${task.enrollmentId}/tasks/${task._id}`);
      debouncedFetchTasks();
      message.success("Task Deleted Successfully!");
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleFinish = async (values) => {
    try {
      const taskData = {
        status: values.status,
        comment: values.comment,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
      };

      if (currentTask) {
        // Update task
        await axios.put(`${apiUrl}/api/contact/${values.enrollmentId}/tasks/${currentTask._id}`, {
          enrollmentId: values.enrollmentId,
          newStatus: values.status,
          newComment: values.comment,
          newStartDate: values.startDate ? values.startDate.toISOString() : null,
          newEndDate: values.endDate ? values.endDate.toISOString() : null,
        });
        message.success("Task Updated Successfully!");
      } else {
        // Add new task
        await axios.post(`${apiUrl}/api/contact/${values.enrollmentId}/tasks`, {
          enrollmentId: values.enrollmentId,
          tasks: [taskData], // Wrap single task in an array
        });
        message.success("New Task Added!");
      }

      debouncedFetchTasks();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleStatusChange = async (newStatus, record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record.enrollmentId}/tasks/${record._id}`, {
        newStatus: newStatus,
        newComment: record.comment,
        newStartDate: record.startDate,
        newEndDate: record.endDate,
      });
      debouncedFetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Done">Done</Option>
          <Option value="Error">Error</Option>
        </Select>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => startDate ? moment(startDate).format('YYYY-MM-DD') : '',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditTask(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteTask(record)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddTask} style={{ marginBottom: 16 }}>
        Add Task
      </Button>
      <div style={{ overflowX: 'auto' }}>
        <Table columns={columns} dataSource={tasks} rowKey="_id" />
      </div>
      <Modal
        title={currentTask ? 'Edit Task' : 'Add Task'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item name="enrollmentId" label="Enrollment ID" rules={[{ required: true }]}>
            <Select placeholder="Select enrollment ID">
              {enrollmentIds.map(id => (
                <Option key={id} value={id}>{id}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
              <Option value="Error">Error</Option>
            </Select>
          </Form.Item>
          <Form.Item name="comment" label="Comment">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="endDate" label="End Date">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentTask ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <FloatingButton/>
    </div>
  );
};

export default Tasktab;
