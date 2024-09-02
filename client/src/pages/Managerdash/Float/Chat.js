import React, { useState, useEffect } from 'react';
import { Input, Button, List, Layout, message as antdMessage, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Chat.css';

const { Sider, Content } = Layout;
const { Title } = Typography;

const Chat = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    // Fetch the list of managers
    const fetchManagers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/managers/get`);
        const otherManagers = response.data.filter(manager => manager._id !== managerId);
        setManagers(otherManagers);
      } catch (error) {
        console.error('Error fetching managers:', error);
        antdMessage.error('Error fetching managers.');
      }
    };

    fetchManagers();
  }, [managerId]);

  const sendMessage = async () => {
    if (input.trim() && selectedManager) {
      const messageData = {
        senderId: managerId,
        receiverId: selectedManager._id,
        text: input,
      };

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-message`, messageData);
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setInput('');
      } catch (error) {
        antdMessage.error('Message not sent!');
        console.error('Error sending message:', error);
      }
    }
  };

  const handleManagerSelect = (manager) => {
    setSelectedManager(manager);

    // Fetch chat history with the selected manager
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/chat/history`,
          { params: { managerId, otherManagerId: manager._id } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        antdMessage.error('Error fetching chat history.');
      }
    };

    fetchChatHistory();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedManager) {
        // Fetch chat history with the selected manager
        const fetchChatHistory = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/chat/history`,
              { params: { managerId, otherManagerId: selectedManager._id } }
            );
            setMessages(response.data);
          } catch (error) {
            console.error('Error fetching chat history:', error);
            antdMessage.error('Error fetching chat history.');
          }
        };

        fetchChatHistory();
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [selectedManager, managerId]);

  return (
    <Layout className="chat-layout">
      <Sider width={200} className="chat-sider">
        <Title level={4}>Managers</Title>
        <List
          dataSource={managers}
          renderItem={(manager) => (
            <List.Item
              onClick={() => handleManagerSelect(manager)}
              className={selectedManager?._id === manager._id ? 'selected-manager' : ''}
            >
              {manager.name}
            </List.Item>
          )}
        />
      </Sider>
      <Content className="chat-content">
        {selectedManager ? (
          <>
            <Title level={4}>{selectedManager.name}</Title>
            <List
              className="message-list"
              dataSource={messages}
              renderItem={(msg) => (
                <List.Item className={msg.senderId === managerId ? 'my-message' : 'other-message'}>
                  <List.Item.Meta
                    title={msg.senderId === managerId ? 'You' : msg.managerName}
                    description={msg.text}
                  />
                </List.Item>
              )}
            />
            <Input
              value={input}
              onChange={handleInputChange}
              onPressEnter={sendMessage}
              placeholder="Type a message..."
              addonAfter={
                <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
                  Send
                </Button>
              }
            />
          </>
        ) : (
          <div className="no-manager-selected">Select a manager to start chatting</div>
        )}
      </Content>
    </Layout>
  );
};

export default Chat;
