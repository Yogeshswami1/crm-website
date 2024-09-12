import React, { useState, useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const CallModal = ({ visible, onCancel, record }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setTimer(0);
  };

  const handleCallConnect = () => {
    const token = 'OvqvFY2H91BAz6Q45EC2W3rWlXofB74Ah7YmW4vk4i2gnlTB77f1LpOKeS1ddJcI';
    // const prefixedPrimaryContact = `${record.primaryContact}`;

    const requestBody = new URLSearchParams({
      vnm: "7938326123",
      agent: "368",
      caller: record.primaryContact,
      token: token,
      reqId: uuidv4(), // Generate a unique request ID
    });

    axios.post('https://airphone.in/api/c2c', requestBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      if (response.data.status === 'success') {
        message.success('Call connected successfully');
        setIsCalling(true);
        startTimer();
      } else {
        message.error(`Failed to connect call: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.error('API Error:', error);
      message.error('Error connecting call');
    });
  };


  const handleCallDisconnect = () => {
    setIsCalling(false);
    stopTimer();
    message.info('Call disconnected');
  };

  useEffect(() => {
    if (!visible) {
      stopTimer();
    }
  }, [visible]);

  const maskContact = (contact) => {
    if (!contact) return 'N/A';
    if (contact.length > 3) {
      return `****${contact.slice(-3)}`;
    }
    return contact;
  };
  

  return (
    <Modal
      title="Contact Details"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      {record && (
        <>
          <p><strong>Name:</strong> {record.name || 'N/A'}</p>
          <p><strong>Email:</strong> {record.email || 'N/A'}</p>
          <p><strong>Primary Contact:</strong> {maskContact(record.primaryContact || 'N/A')}</p>
          <p><strong>Secondary Contact:</strong> {record.secondaryContact || 'N/A'}</p>
          <div style={{ marginTop: '20px' }}>
            <Button 
              type="primary" 
              onClick={handleCallConnect} 
              disabled={isCalling}
            >
              Connect Call
            </Button>
            <Button 
              type="danger" 
              onClick={handleCallDisconnect} 
              disabled={!isCalling} 
              style={{ marginLeft: '10px' }}
            >
              Disconnect Call
            </Button>
            {isCalling && (
              <div style={{ marginTop: '10px' }}>
                <strong>Call Timer:</strong> {timer} seconds
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default CallModal;
