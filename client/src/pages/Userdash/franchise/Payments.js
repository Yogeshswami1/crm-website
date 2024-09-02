import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Typography } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const PaymentsSummary = () => {
  const [totalInvoiceValue, setTotalInvoiceValue] = useState(0);
  const [payments, setPayments] = useState({});

  useEffect(() => {
    const enrollmentId = localStorage.getItem('enrollmentId');

    if (enrollmentId) {
      fetchPaymentData(enrollmentId);
    }
  }, []);

  const fetchPaymentData = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
      const { totalInvoiceValue, payment1, payment2, payment3, payment4 } = response.data;

      setTotalInvoiceValue(totalInvoiceValue);
      setPayments({ payment1, payment2, payment3, payment4 });
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  // Function to render payment details
  const renderPaymentDetails = (payment, index) => (
    <div key={index}>
      <Title level={5}>{`${index + 1} ${index + 1 === 1 ? 'st' : index + 1 === 2 ? 'nd' : index + 1 === 3 ? 'rd' : 'th'} Payment`}</Title>
      <Text>Date: {payment?.date ? moment(payment.date).format('YYYY-MM-DD') : 'N/A'}</Text>
      <br />
      <Text>Amount: ₹{payment?.amount ? payment.amount.toFixed(2) : '0.00'}</Text>
      <br /><br />
    </div>
  );

  return (
    <div className="payments-summary">
      <Row gutter={16}>
        {/* Card 1: Total Invoice Value */}
        <Col span={8}>
          <Card title="Total Invoice Value" bordered={false}>
            <Title level={4}>{`₹${totalInvoiceValue.toFixed(2)}`}</Title>
          </Card>
        </Col>

        {/* Card 2: Payment Details */}
        <Col span={8}>
          <Card title="Payment Details" bordered={false}>
            {Object.values(payments).map((payment, index) => renderPaymentDetails(payment, index))}
          </Card>
        </Col>

        {/* Card 3: Remaining Amount */}
        <Col span={8}>
          <Card title="Remaining Amount" bordered={false}>
            <Title level={4}>{`₹${(totalInvoiceValue - Object.values(payments).reduce((acc, payment) => acc + (payment.amount || 0), 0)).toFixed(2)}`}</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentsSummary;
