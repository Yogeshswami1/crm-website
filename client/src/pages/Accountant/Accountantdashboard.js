import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import Dash from './Dash';
import Franchise from './Franchise';
import Amazon from './Amazon';

const Accountantdashboard = () => {
  const [view, setView] = useState('website'); // Set default value to 'website'

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Radio.Group 
        onChange={(e) => setView(e.target.value)} 
        value={view} 
        style={{ marginBottom: '20px', display: 'flex' }}
      >      
        <Radio.Button value="website">Website</Radio.Button>            
        <Radio.Button value="franchise">Franchise</Radio.Button>            
        <Radio.Button value="amazon">Amazon</Radio.Button>            
      </Radio.Group>
      {view === 'website' && <Dash />}
      {view === 'franchise' && <Franchise />}
      {view === 'amazon' && <Amazon />}
    </div>
  );
};

export default Accountantdashboard;
