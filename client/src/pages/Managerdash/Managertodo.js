import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Tag, message, Row, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

import './Managertodo.css'; // Custom CSS for responsiveness
import FloatingButton from '../Float/Floatingbutton';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Managertodo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    axios.get(`${apiUrl}/api/todos/${managerId}`)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [managerId]);

  const handleSubmit = () => {
    const newTodo = { title, description };

    axios.post(`${apiUrl}/api/todos/${managerId}`, newTodo)
      .then(response => {
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
        setIsModalVisible(false);
        message.success("Successfully Submitted the TODO");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEditSubmit = () => {
    axios.put(`${apiUrl}/api/todos/${managerId}/${editingTodo._id}`, { title, description })
      .then(response => {
        setTodos(todos.map(todo => (todo._id === editingTodo._id ? response.data : todo)));
        setEditingTodo(null);
        setIsModalVisible(false);
        setTitle('');
        setDescription('');
        message.success("Successfully Edited the TODO");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/api/todos/${managerId}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
        message.success("The TODO is Deleted Successfully!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleToggleCompleted = (todo) => {
    axios.put(`${apiUrl}/api/todos/${managerId}/${todo._id}`, { completed: !todo.completed })
      .then(response => {
        setTodos(todos.map(t => (t._id === todo._id ? response.data : t)));
        message.success("Status Changed Successfully!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed, todo) => (
        <Tag
          color={completed ? 'green' : 'volcano'}
          onClick={() => handleToggleCompleted(todo)}
          style={{ cursor: 'pointer' }}
        >
          {completed ? 'Completed' : 'Not Completed'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, todo) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingTodo(todo);
              setTitle(todo.title);
              setDescription(todo.description);
              setIsModalVisible(true);
            }}
            style={{ marginRight: 8, width: "4rem" }}
          />
          <Popconfirm
            title="Are you sure you want to delete this TODO?"
            onConfirm={() => handleDelete(todo._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{ width: "4rem" }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="header">To-Do List</h1>
      <Row justify="end" className="button-row">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add To-Do
        </Button>
      </Row>
      <Table columns={columns} dataSource={todos} rowKey="_id" />

      <Modal
        title={editingTodo ? 'Edit To-Do' : 'Add To-Do'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTodo(null);
          setTitle('');
          setDescription('');
        }}
        onOk={editingTodo ? handleEditSubmit : handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <FloatingButton/>
    </div>
  );
};

export default Managertodo;
