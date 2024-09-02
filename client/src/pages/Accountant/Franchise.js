// import React, { useEffect, useState } from 'react';
// import { Card, Table, Input, DatePicker, Typography, message, Modal, Button } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './Franchise.css'; // Import CSS for custom styles

// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const PaymentsReceived = () => {
//   const [paymentsData, setPaymentsData] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/contact/get`)
//       .then((response) => {
//         const franchiseContacts = response.data.filter(
//           (contact) => contact.service === 'FRANCHISE'
//         );

//         const initializedContacts = franchiseContacts.map(contact => ({
//           ...contact,
//           totalInvoiceValue: contact.totalInvoiceValue || '', // Initialize totalInvoiceValue
//           payment1: contact.payment1 || { date: '', amount: 0 },
//           payment2: contact.payment2 || { date: '', amount: 0 },
//           payment3: contact.payment3 || { date: '', amount: 0 },
//           payment4: contact.payment4 || { date: '', amount: 0 },
//         }));

//         setPaymentsData(initializedContacts);
//       })
//       .catch((error) => {
//         console.error('Error fetching contacts data:', error);
//       });
//   }, []);

//   const handleTotalInvoiceChange = (e, recordKey) => {
//     const updatedData = paymentsData.map((item) => {
//       if (item.key === recordKey) {
//         return {
//           ...item,
//           totalInvoiceValue: e.target.value,
//         };
//       }
//       return item;
//     });
//     setPaymentsData(updatedData);
//   };

//   const handleDateChange = (date, recordKey, paymentKey) => {
//     const updatedData = paymentsData.map((item) => {
//       if (item.key === recordKey) {
//         return {
//           ...item,
//           [paymentKey]: {
//             ...item[paymentKey],
//             date: date ? date.format('YYYY-MM-DD') : '',
//           },
//         };
//       }
//       return item;
//     });
//     setPaymentsData(updatedData);
//   };

//   const handleAmountChange = (e, recordKey, paymentKey) => {
//     const updatedData = paymentsData.map((item) => {
//       if (item.key === recordKey) {
//         return {
//           ...item,
//           [paymentKey]: {
//             ...item[paymentKey],
//             amount: parseFloat(e.target.value) || 0,
//           },
//         };
//       }
//       return item;
//     });
//     setPaymentsData(updatedData);
//   };

//   const calculateRemainingAmount = (record) => {
//     const totalPayments = 
//       (record.payment1.amount || 0) +
//       (record.payment2.amount || 0) +
//       (record.payment3.amount || 0) +
//       (record.payment4.amount || 0);
//     return (record.totalInvoiceValue - totalPayments).toFixed(2);
//   };

//   const handlePaymentSave = async (record) => {
//     try {
//       await axios.put(`${apiUrl}/api/contact/${record._id}`, {
//         totalInvoiceValue: record.totalInvoiceValue,
//         payment1: record.payment1,
//         payment2: record.payment2,
//         payment3: record.payment3,
//         payment4: record.payment4,
//       });
//       message.success('Payment details updated successfully');
//     } catch (error) {
//       message.error('Failed to update payment details');
//     }
//   };

//   const showModal = (contact) => {
//     setSelectedContact(contact);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     setSelectedContact(null);
//   };

//   const paymentColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//       fixed: 'left',  // Fix this column to the left
//       render: (text, record) => (
//         <Button type="link" onClick={() => showModal(record)}>
//           {text}
//         </Button>
//       ),
//       width: 150,  // Set a fixed width for this column
//     },
//     {
//       title: 'Total Invoice Value',
//       dataIndex: 'totalInvoiceValue',
//       key: 'totalInvoiceValue',
//       render: (text, record) => (
//         <Input
//           type="number"
//           value={record.totalInvoiceValue}
//           onChange={(e) => handleTotalInvoiceChange(e, record.key)}
//           onBlur={() => handlePaymentSave(record)}
//           placeholder="Enter total invoice value"
//         />
//       ),
//       width: 200,  // Set a fixed width for this column
//     },
//     {
//       title: 'Remaining Amount',
//       key: 'remainingAmount',
//       render: (text, record) => <span>{calculateRemainingAmount(record)}</span>,
//       width: 150,  // Set a fixed width for this column
//     },
//     {
//       title: '1st Payment',
//       children: [
//         {
//           title: 'Date',
//           dataIndex: 'payment1',
//           key: 'payment1Date',
//           width: 165,
//           render: (text, record) => (
//             <DatePicker
//               value={record.payment1.date ? moment(record.payment1.date) : null}
//               onChange={(date) => handleDateChange(date, record.key, 'payment1')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//         {
//           title: 'Amount',
//           dataIndex: 'payment1',
//           key: 'payment1Amount',
//           width: 120,
//           render: (text, record) => (
//             <Input
//               type="number"
//               value={record.payment1.amount}
//               onChange={(e) => handleAmountChange(e, record.key, 'payment1')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//       ],
//     },
//     {
//       title: '2nd Payment',
//       children: [
//         {
//           title: 'Date',
//           dataIndex: 'payment2',
//           key: 'payment2Date',
//           width: 165,
//           render: (text, record) => (
//             <DatePicker
//               value={record.payment2.date ? moment(record.payment2.date) : null}
//               onChange={(date) => handleDateChange(date, record.key, 'payment2')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//         {
//           title: 'Amount',
//           dataIndex: 'payment2',
//           key: 'payment2Amount',
//           width: 120,
//           render: (text, record) => (
//             <Input
//               type="number"
//               value={record.payment2.amount}
//               onChange={(e) => handleAmountChange(e, record.key, 'payment2')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//       ],
//     },
//     {
//       title: '3rd Payment',
//       children: [
//         {
//           title: 'Date',
//           dataIndex: 'payment3',
//           key: 'payment3Date',
//           width: 165,
//           render: (text, record) => (
//             <DatePicker
//               value={record.payment3.date ? moment(record.payment3.date) : null}
//               onChange={(date) => handleDateChange(date, record.key, 'payment3')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//         {
//           title: 'Amount',
//           dataIndex: 'payment3',
//           key: 'payment3Amount',
//           width: 120,
//           render: (text, record) => (
//             <Input
//               type="number"
//               value={record.payment3.amount}
//               onChange={(e) => handleAmountChange(e, record.key, 'payment3')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//       ],
//     },
//     {
//       title: '4th Payment',
//       children: [
//         {
//           title: 'Date',
//           dataIndex: 'payment4',
//           key: 'payment4Date',
//           width: 165,
//           render: (text, record) => (
//             <DatePicker
//               value={record.payment4.date ? moment(record.payment4.date) : null}
//               onChange={(date) => handleDateChange(date, record.key, 'payment4')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//         {
//           title: 'Amount',
//           dataIndex: 'payment4',
//           key: 'payment4Amount',
//           width: 120,
//           render: (text, record) => (
//             <Input
//               type="number"
//               value={record.payment4.amount}
//               onChange={(e) => handleAmountChange(e, record.key, 'payment4')}
//               onBlur={() => handlePaymentSave(record)}
//             />
//           ),
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="payments-container">
//       <Card
//         title="Payments Received"
//         className="payments-card"
//       >
//         <Table
//           columns={paymentColumns}
//           dataSource={paymentsData}
//           rowKey="_id"
//           scroll={{ x: 1600, y: 400 }} // Enables horizontal and vertical scroll with fixed height
//         />
//       </Card>

//       <Modal
//         title="Contact Details"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleOk}
//       >
//         {selectedContact && (
//           <div>
//             <p><strong>Name:</strong> {selectedContact.name}</p>
//             <p><strong>Email:</strong> {selectedContact.email}</p>
//             <p><strong>Primary Contact:</strong> {selectedContact.primaryContact}</p>
//             <p><strong>Secondary Contact:</strong> {selectedContact.secondaryContact}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default PaymentsReceived;


import React, { useEffect, useState } from 'react';
import { Card, Table, Input, DatePicker, Typography, message, Modal, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Franchise.css'; // Import CSS for custom styles

const { Title } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const PaymentsReceived = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/contact/get`)
      .then((response) => {
        const franchiseContacts = response.data.filter(
          (contact) => contact.service === 'FRANCHISE'
        );

        const initializedContacts = franchiseContacts.map(contact => ({
          ...contact,
          totalInvoiceValue: contact.totalInvoiceValue || '', // Initialize totalInvoiceValue
          payment1: contact.payment1 || { date: '', amount: 0 },
          payment2: contact.payment2 || { date: '', amount: 0 },
          payment3: contact.payment3 || { date: '', amount: 0 },
          payment4: contact.payment4 || { date: '', amount: 0 },
        }));

        setPaymentsData(initializedContacts);
        setFilteredData(initializedContacts); // Initialize filteredData with all contacts
      })
      .catch((error) => {
        console.error('Error fetching contacts data:', error);
      });
  }, []);

  const handleTotalInvoiceChange = (e, recordKey) => {
    const updatedData = paymentsData.map((item) => {
      if (item.key === recordKey) {
        return {
          ...item,
          totalInvoiceValue: e.target.value,
        };
      }
      return item;
    });
    setPaymentsData(updatedData);
    setFilteredData(updatedData);
  };

  const handleDateChange = (date, recordKey, paymentKey) => {
    const updatedData = paymentsData.map((item) => {
      if (item.key === recordKey) {
        return {
          ...item,
          [paymentKey]: {
            ...item[paymentKey],
            date: date ? date.format('YYYY-MM-DD') : '',
          },
        };
      }
      return item;
    });
    setPaymentsData(updatedData);
    setFilteredData(updatedData);
  };

  const handleAmountChange = (e, recordKey, paymentKey) => {
    const updatedData = paymentsData.map((item) => {
      if (item.key === recordKey) {
        return {
          ...item,
          [paymentKey]: {
            ...item[paymentKey],
            amount: parseFloat(e.target.value) || 0,
          },
        };
      }
      return item;
    });
    setPaymentsData(updatedData);
    setFilteredData(updatedData);
  };

  const calculateRemainingAmount = (record) => {
    const totalPayments = 
      (record.payment1.amount || 0) +
      (record.payment2.amount || 0) +
      (record.payment3.amount || 0) +
      (record.payment4.amount || 0);
    return (record.totalInvoiceValue - totalPayments).toFixed(2);
  };

  const handlePaymentSave = async (record) => {
    try {
      await axios.put(`${apiUrl}/api/contact/${record._id}`, {
        totalInvoiceValue: record.totalInvoiceValue,
        payment1: record.payment1,
        payment2: record.payment2,
        payment3: record.payment3,
        payment4: record.payment4,
      });
      message.success('Payment details updated successfully');
    } catch (error) {
      message.error('Failed to update payment details');
    }
  };

  const showModal = (contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedContact(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = paymentsData.filter((item) => {
      return (
        item.enrollmentId.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.primaryContact.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const paymentColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
      fixed: 'left',  // Fix this column to the left
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
      width: 150,  // Set a fixed width for this column
    },
    {
      title: 'Total Invoice Value',
      dataIndex: 'totalInvoiceValue',
      key: 'totalInvoiceValue',
      render: (text, record) => (
        <Input
          type="number"
          value={record.totalInvoiceValue}
          onChange={(e) => handleTotalInvoiceChange(e, record.key)}
          onBlur={() => handlePaymentSave(record)}
          placeholder="Enter total invoice value"
        />
      ),
      width: 200,  // Set a fixed width for this column
    },
    {
      title: 'Remaining Amount',
      key: 'remainingAmount',
      render: (text, record) => <span>{calculateRemainingAmount(record)}</span>,
      width: 150,  // Set a fixed width for this column
    },
    {
      title: '1st Payment',
      children: [
        {
          title: 'Date',
          dataIndex: 'payment1',
          key: 'payment1Date',
          width: 165,
          render: (text, record) => (
            <DatePicker
              value={record.payment1.date ? moment(record.payment1.date) : null}
              onChange={(date) => handleDateChange(date, record.key, 'payment1')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'payment1',
          key: 'payment1Amount',
          width: 120,
          render: (text, record) => (
            <Input
              type="number"
              value={record.payment1.amount}
              onChange={(e) => handleAmountChange(e, record.key, 'payment1')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
      ],
    },
    {
      title: '2nd Payment',
      children: [
        {
          title: 'Date',
          dataIndex: 'payment2',
          key: 'payment2Date',
          width: 165,
          render: (text, record) => (
            <DatePicker
              value={record.payment2.date ? moment(record.payment2.date) : null}
              onChange={(date) => handleDateChange(date, record.key, 'payment2')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'payment2',
          key: 'payment2Amount',
          width: 120,
          render: (text, record) => (
            <Input
              type="number"
              value={record.payment2.amount}
              onChange={(e) => handleAmountChange(e, record.key, 'payment2')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
      ],
    },
    {
      title: '3rd Payment',
      children: [
        {
          title: 'Date',
          dataIndex: 'payment3',
          key: 'payment3Date',
          width: 165,
          render: (text, record) => (
            <DatePicker
              value={record.payment3.date ? moment(record.payment3.date) : null}
              onChange={(date) => handleDateChange(date, record.key, 'payment3')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'payment3',
          key: 'payment3Amount',
          width: 120,
          render: (text, record) => (
            <Input
              type="number"
              value={record.payment3.amount}
              onChange={(e) => handleAmountChange(e, record.key, 'payment3')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
      ],
    },
    {
      title: '4th Payment',
      children: [
        {
          title: 'Date',
          dataIndex: 'payment4',
          key: 'payment4Date',
          width: 165,
          render: (text, record) => (
            <DatePicker
              value={record.payment4.date ? moment(record.payment4.date) : null}
              onChange={(date) => handleDateChange(date, record.key, 'payment4')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
        {
          title: 'Amount',
          dataIndex: 'payment4',
          key: 'payment4Amount',
          width: 120,
          render: (text, record) => (
            <Input
              type="number"
              value={record.payment4.amount}
              onChange={(e) => handleAmountChange(e, record.key, 'payment4')}
              onBlur={() => handlePaymentSave(record)}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Card>
      <Title level={4}>Payments Received</Title>

      <Input.Search
        placeholder="Search by Enrollment ID, Name, Email, or Primary Contact"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: '50%' }}
      />

      <Table
        columns={paymentColumns}
        dataSource={filteredData}
        scroll={{ x: 'max-content' }}  // Enable horizontal scrolling if needed
      />

      <Modal
        title="Franchise Contact Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        {selectedContact && (
          <div>
            <p><strong>Enrollment ID:</strong> {selectedContact.enrollmentId}</p>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Primary Contact:</strong> {selectedContact.primaryContact}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default PaymentsReceived;
