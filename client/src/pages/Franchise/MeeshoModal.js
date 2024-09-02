import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, message, List } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const MeeshoModal = ({ visible, onCancel, enrollmentId }) => {
  const [accountOpenMeesho, setAccountOpenMeesho] = useState('');
  const [meeshoId, setMeeshoId] = useState('');
  const [meeshoPass, setMeeshoPass] = useState('');
  const [isRemarksModalVisible, setIsRemarksModalVisible] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');

  useEffect(() => {
    if (visible) {
      // Fetch existing Meesho details
      axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`)
        .then(response => {
          const data = response.data;
          setAccountOpenMeesho(data.accountOpenMeesho);
          setMeeshoId(data.meeshoId);
          setMeeshoPass(data.meeshoPass);
          setRemarks(data.remarks || []);
        })
        .catch(() => message.error('Failed to fetch Meesho details'));
    }
  }, [visible, enrollmentId]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/code/${enrollmentId}`, {
        accountOpenMeesho,
        meeshoId,
        meeshoPass,
      });
      message.success('Meesho details updated successfully');
      onCancel();
    } catch (error) {
      message.error('Failed to update Meesho details');
    }
  };

  const handleOpenRemarksModal = () => {
    setIsRemarksModalVisible(true);
  };

  const handleAddRemark = async () => {
    if (!newRemark.trim()) {
      message.error('Remark cannot be empty');
      return;
    }
    try {
      const updatedRemarks = [...remarks, { text: newRemark, date: new Date() }];
      await axios.put(`${apiUrl}/api/contact/remark/byenroll/${enrollmentId}`, { remarks: updatedRemarks });
      message.success('Remark added successfully');
      setRemarks(updatedRemarks);
      setNewRemark('');
    } catch (error) {
      message.error('Failed to add remark');
    }
  };

  const handleDeleteRemark = async (index) => {
    const updatedRemarks = remarks.filter((_, i) => i !== index);
    try {
      await axios.put(`${apiUrl}/api/contact/remark/byenroll/${enrollmentId}`, { remarks: updatedRemarks });
      message.success('Remark deleted successfully');
      setRemarks(updatedRemarks);
    } catch (error) {
      message.error('Failed to delete remark');
    }
  };

  return (
    <>
      <Modal
        open={visible}
        title="Meesho Details"
        onCancel={onCancel}
        onOk={handleSave}
      >
        <div>
          <label>Account Status: </label>
          <Select
            value={accountOpenMeesho}
            onChange={(value) => setAccountOpenMeesho(value)}
            style={{ width: '100%', marginTop: 8 }}
          >
            <Option value="Opened">Opened</Option>
            <Option value="Not Opened">Not Opened</Option>
          </Select>
        </div>
        <div style={{ marginTop: 16 }}>
          <label>User ID: </label>
          <Input value={meeshoId} onChange={(e) => setMeeshoId(e.target.value)} />
        </div>
        <div style={{ marginTop: 16 }}>
          <label>Password: </label>
          <Input.Password value={meeshoPass} onChange={(e) => setMeeshoPass(e.target.value)} />
        </div>
        <Button type="link" onClick={handleOpenRemarksModal} style={{ marginTop: 16 }}>
          View/Edit Remarks
        </Button>
      </Modal>

      <Modal
        title="Remarks"
        open={isRemarksModalVisible}
        onCancel={() => setIsRemarksModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={remarks}
          renderItem={(item, index) => (
            <List.Item
              actions={[<Button onClick={() => handleDeleteRemark(index)}>Delete</Button>]}
            >
              <List.Item.Meta
                title={moment(item.date).format('DD-MM-YYYY')}
                description={item.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={4}
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          placeholder="Add new remark"
        />
        <Button type="primary" onClick={handleAddRemark} style={{ marginTop: 16 }}>
          Add Remark
        </Button>
      </Modal>
    </>
  );
};

export default MeeshoModal;
