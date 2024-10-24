import React from 'react';
import { Table } from 'antd';

const PaymentTable = ({ filteredData, handleEnrollmentClick }) => {
  const paymentColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
      render: (text, record) => <a onClick={() => handleEnrollmentClick(record)}>{text}</a>,
    },
    {
      title: 'Stage 1 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage1', 'amount'],
          key: 'stage1PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage1', 'status'],
          key: 'stage1PaymentStatus',
        },
        {
          title: 'Payment Date',
          dataIndex: ['payment', 'stage1', 'date'],
          key: 'stage1PaymentDate',
          render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Payment Mode',
          dataIndex: ['payment', 'stage1', 'paymentMode'],
          key: 'stage1PaymentMode',
        },
      ],
    },
    {
      title: 'Stage 2 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage2', 'amount'],
          key: 'stage2PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage2', 'status'],
          key: 'stage2PaymentStatus',
        },
        {
          title: 'Payment Date',
          dataIndex: ['payment', 'stage2', 'date'],
          key: 'stage2PaymentDate',
          render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Payment Mode',
          dataIndex: ['payment', 'stage2', 'paymentMode'],
          key: 'stage2PaymentMode',
        },
      ],
    },
    {
      title: 'Stage 3 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage3', 'amount'],
          key: 'stage3PaymentAmount',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage3', 'status'],
          key: 'stage3PaymentStatus',
        },
        {
          title: 'Payment Date',
          dataIndex: ['payment', 'stage3', 'date'],
          key: 'stage3PaymentDate',
          render: (text) => (text ? new Date(text).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Payment Mode',
          dataIndex: ['payment', 'stage3', 'paymentMode'],
          key: 'stage3PaymentMode',
        },
      ],
    },
  ];

  return (
    <Table
      columns={paymentColumns}
      dataSource={filteredData}
      pagination={false}
      rowKey="enrollmentId"
      scroll={{ x: 1500 }} // Adjust scrolling width
    />
  );
};

export default PaymentTable;
