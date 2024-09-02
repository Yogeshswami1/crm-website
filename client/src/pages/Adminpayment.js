import React, { useState } from 'react';
import { Radio, Layout } from 'antd';
import WEBSITE from './Accountant/Dash';
import AMAZON from './Accountant/Amazon';
// import BankTransferPayment from './BankTransferPayment';

const { Header, Content } = Layout;

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState('creditCard');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderPaymentComponent = () => {
    switch (selectedOption) {
      case '1':
        return <WEBSITE />;
      case '2':
        return <AMAZON />;
    //   case 'bankTransfer':
    //     return <BankTransferPayment />;
      default:
        return null;
    }
  };

  return (
    <Layout className="payment-layout">
      <Header className="payment-header">
        <h1>Payment Page</h1>
        <Radio.Group 
          onChange={handleOptionChange} 
          value={selectedOption}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value="1">WEBSITE</Radio.Button>
          <Radio.Button value="2">AMAZON</Radio.Button>
          {/* <Radio.Button value="bankTransfer">Bank Transfer</Radio.Button> */}
        </Radio.Group>
      </Header>
      <Content className="payment-content">
        {renderPaymentComponent()}
      </Content>
    </Layout>
  );
};

export default PaymentPage;
