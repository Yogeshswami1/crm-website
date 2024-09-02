import React, { useState } from 'react';
import { Radio } from 'antd';
import Dash from './Dash';
import Ecommerce from './Ecommerce';

const MainComponent = () => {
  // Set the initial state to 'ecommerce' to make the FRANCHISE radio button active by default
  const [selectedComponent, setSelectedComponent] = useState('ecommerce');

  const handleRadioChange = (e) => {
    setSelectedComponent(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={handleRadioChange} value={selectedComponent}>
        {/* <Radio.Button value="dash">Dashboard</Radio.Button> */}
        <Radio.Button value="ecommerce">Franchise</Radio.Button>
      </Radio.Group>

      <div style={{ marginTop: 20 }}>
        {selectedComponent === 'dash' && <Dash />}
        {selectedComponent === 'ecommerce' && <Ecommerce />}
      </div>
    </div>
  );
};

export default MainComponent;
