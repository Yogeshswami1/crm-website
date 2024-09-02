import React, { useState } from 'react';
import { Radio } from 'antd';
import Admindashboard from './Admindashboard';


const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('1');

  const handleChange = e => {
    setSelectedComponent(e.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case '1':
        // return <Admin1 />;
      case '2':
        // return <Reports />;
      case '3':
        // return <Admindashboard />;
      case '4':
        // return <Adminpayment />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Radio.Group onChange={handleChange} value={selectedComponent}>
        <Radio value="1">Dashboard</Radio>
        <Radio value="2">Reports</Radio>
        <Radio value="3">Managers</Radio>
        <Radio value="4">Payments</Radio>
      </Radio.Group>
      <div style={{ marginTop: 20 }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
