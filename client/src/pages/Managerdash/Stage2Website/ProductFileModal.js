import React, { useState, useEffect } from 'react';
import { Modal, Button, Switch, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const ProductFileModal = ({ visible, onCancel, record, fetchData }) => {
  const [productFileStatus, setProductFileStatus] = useState(false); // Default to "Not Done"
  const [productDate, setProductDate] = useState(null); // Default to no date

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Effect to set initial values when modal opens
  useEffect(() => {
    if (record) {
      setProductFileStatus(record.productFile === 'Done'); // Set switch based on status
      setProductDate(record.productDate ? moment(record.productDate) : null); // Ensure date is a moment object
    }
  }, [record]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        productFile: productFileStatus ? 'Done' : 'Not Done',
        productDate: productDate ? productDate.toISOString() : null, // Convert moment to ISO format
      });
      toast.success('Product file updated successfully');
      fetchData(); // Refresh the data
      onCancel(); // Close the modal
    } catch (error) {
      toast.error('Failed to update product file');
    }
  };

  const disabledDate = (current) => {
    // Disable dates before yesterday
    const yesterday = moment().subtract(1, 'days').startOf('day');
    return current && current < yesterday;
  };

  return (
    <Modal
      title="Product File"
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
          checked={productFileStatus}
          onChange={(checked) => setProductFileStatus(checked)}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
        />
      </div>

      <DatePicker
        value={productDate} // Ensure this is a moment object
        onChange={(date) => setProductDate(date)}
        disabledDate={disabledDate}
        placeholder="Select Date"
      />
    </Modal>
  );
};

export default ProductFileModal;
