import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Table, message } from 'antd';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CodeSelectionModal = ({ visible, onCancel, enrollmentId }) => {
  const [data, setData] = useState([{ key: 1, sku: '', quantity: '' }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      // Fetch existing data when the modal becomes visible
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
          const items = response.data.items || [];
          // Set the data with the fetched items
          setData(
            items.map((item, index) => ({
              key: index + 1,
              sku: item.sku || '',
              quantity: item.quantity || '',
            }))
          );
        } catch (error) {
          message.error('Failed to load existing entries');
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [visible, enrollmentId]);

  const handleAddRow = () => {
    setData((prevData) => [
      ...prevData,
      { key: prevData.length + 1, sku: '', quantity: '' },
    ]);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/api/contact/code/${enrollmentId}`, {
        items: data,
      });
      message.success('Entries saved successfully');
      onCancel(); // Close modal only if save is successful
    } catch (error) {
      message.error('Failed to save entries');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value, key, column) => {
    setData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, [column]: value } : item))
    );
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'sku')}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e.target.value, record.key, 'quantity')}
        />
      ),
    },
  ];

  return (
    <Modal
      open={visible}
      title="Select Code"
      onCancel={onCancel}
      footer={[
        <Button key="add" onClick={handleAddRow}>
          Add Row
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>,
      ]}
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
    </Modal>
  );
};

export default CodeSelectionModal;
