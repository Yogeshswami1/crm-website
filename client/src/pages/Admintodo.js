import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, Select } from 'antd';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { TextArea } = Input;
const { Option } = Select;

const Admintodo = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    axios.get('${apiUrl}/api/managers/get')
      .then(response => {
        setManagers(response.data);
        if (response.data.length > 0) {
          setSelectedManager(response.data[0]._id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedManager) {
      axios.get(`${apiUrl}/api/todos/${selectedManager}`)
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedManager]);

  const handleManagerChange = (managerId) => {
    setSelectedManager(managerId);
  };

  const handleEdit = (todo) => {
    setEditing(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
    setIsEditModalVisible(true);
  };

  const handleUpdate = () => {
    axios.put(`${apiUrl}/api/todos/${selectedManager}/${editing}`, { title, description })
      .then(response => {
        setTodos(todos.map(todo => (todo._id === editing ? response.data : todo)));
        setEditing(null);
        setTitle('');
        setDescription('');
        setIsEditModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/api/todos/${selectedManager}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAdd = () => {
    axios.post(`${apiUrl}/api/todos/${selectedManager}`, { title, description })
      .then(response => {
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
        setIsAddModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
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
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select a manager"
        onChange={handleManagerChange}
        value={selectedManager}
      >
        {managers.map(manager => (
          <Option key={manager._id} value={manager._id}>{manager.name}</Option>
        ))}
      </Select>
      <Button type="primary" onClick={() => setIsAddModalVisible(true)} style={{ marginBottom: 16 }}>
        Add Todo
      </Button>
      <Table dataSource={todos} columns={columns} rowKey="_id" />

      <Modal
        title="Edit Todo"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-2"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
        />
      </Modal>

      <Modal
        title="Add Todo"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-2"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default Admintodo;
