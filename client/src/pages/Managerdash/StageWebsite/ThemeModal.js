import React, { useState } from 'react';
import { Modal, Radio, DatePicker, Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const ThemeModal = ({ visible, onCancel, record, fetchData }) => {
  const [selectedTheme, setSelectedTheme] = useState(record?.theme || 'Theme 1');
  const [themeDate, setThemeDate] = useState(record.themeDate ? moment(record.themeDate) : null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleThemeChange = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        theme: selectedTheme,
        themeDate: themeDate ? themeDate.format('YYYY-MM-DD') : null,
      });
      toast.success("Theme updated successfully");
      fetchData();
      onCancel();
    } catch (error) {
      toast.error("Failed to update theme");
    }
  };

  return (
    <Modal title="Theme" open={visible} onCancel={onCancel} onOk={handleThemeChange}>
      <div style={{ marginBottom: '16px' }}>
        <span>Select Theme: </span>
        <Radio.Group 
          onChange={(e) => setSelectedTheme(e.target.value)} 
          value={selectedTheme}
          style={{ display: 'block', marginTop: '10px' }}
        >
          <Radio value="Theme 1">Theme 1</Radio>
          <Radio value="Theme 2">Theme 2</Radio>
          <Radio value="Theme 3">Theme 3</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <span>Date: </span>
        <DatePicker
  value={themeDate}
  onChange={(date) => setThemeDate(date)}
  disabledDate={(current) => {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday; // Disable all dates before yesterday
  }}
  style={{ width: '100%' }}
/>

      </div>
    </Modal>
  );
};

export default ThemeModal;
