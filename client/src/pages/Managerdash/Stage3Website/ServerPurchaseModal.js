import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const ServerPurchaseModal = ({ visible, onCancel, record, fetchData }) => {
  const [serverPurchaseStatus, setServerPurchaseStatus] = useState(false);
  const [serverPurchaseDate, setServerPurchaseDate] = useState(null);
  const [serverId, setServerId] = useState('');
  const [serverPassword, setServerPassword] = useState('');

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (record) {
      setServerPurchaseStatus(record.serverPurchase === 'Done');
      setServerPurchaseDate(record.serverPurchaseDate ? moment(record.serverPurchaseDate) : null);
      setServerId(record.serverId || '');
      setServerPassword(record.serverPassword || '');
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        serverPurchase: serverPurchaseStatus ? 'Done' : 'Not Done',
        serverPurchaseDate: serverPurchaseDate ? serverPurchaseDate.toISOString() : null,
        serverId,
        serverPassword,
      });
      toast.success('Server Purchase updated successfully');
      fetchData(); 
      onCancel();
    } catch (error) {
      toast.error('Failed to update Server Purchase');
    }
  };

  const disabledDate = (current) => {
    // Can only select yesterday, today, and future dates
    return current && current < moment().subtract(1, 'days').startOf('day');
  };

  return (
    <Modal
      title="Server Purchase"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span>Status: </span>
        <Switch
          checked={serverPurchaseStatus}
          onChange={(checked) => setServerPurchaseStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={serverPurchaseDate}
        onChange={(date) => setServerPurchaseDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
        style={{ marginBottom: 16 }}
      />

      <Input
        placeholder="Server ID"
        value={serverId}
        onChange={(e) => setServerId(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Input.Password
        placeholder="Server Password"
        value={serverPassword}
        onChange={(e) => setServerPassword(e.target.value)}
        style={{ marginBottom: 16 }}
      />
    </Modal>
  );
};

export default ServerPurchaseModal;
