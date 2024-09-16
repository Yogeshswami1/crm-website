import React, { useState } from 'react';
import { Radio } from 'antd';
import Main from './Main';
import Template from './Template';
const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('1');

  const handleChange = e => {
    setSelectedComponent(e.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case '1':
        return <Main />;
      case '2':
        return <Template />;
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
        <Radio value="1">Main</Radio>
        <Radio value="2">Template</Radio>
        {/* <Radio value="3">Managers</Radio>
        <Radio value="4">Payments</Radio> */}
      </Radio.Group>
      <div style={{ marginTop: 20 }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
