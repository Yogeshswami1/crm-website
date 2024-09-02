// import React, { useEffect, useState } from 'react';
// import { Card, Statistic, Row, Col, Table, Input, Typography } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './Dash.css'; // Assuming you're using a CSS file named Dash.css

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const managerId = localStorage.getItem("managerId");

//   useEffect(() => {
//     if (managerId) {
//       axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
//         .then(response => {
//           setUserData(response.data);
//           setFilteredData(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, [managerId]);

//   const handleSearch = value => {
//     const filtered = userData.filter(item => item.enrollmentId.includes(value));
//     setFilteredData(filtered);
//   };

//   const formatCompletionData = (data) => {
//     if (!data) return '';
//     return data.replace(/updated on (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/, (_, dateStr) => {
//       return `(${moment(dateStr).format('DD-MM-YYYY')})`;
//     });
//   };

//   const paymentColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Stage 1 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage1', 'amount'],
//           key: 'stage1PaymentAmount',
//           className: 'stage1Column',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage1', 'status'],
//           key: 'stage1PaymentStatus',
//           className: 'stage1Column',
//         },
//       ],
//     },
//     {
//       title: 'Stage 2 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage2', 'amount'],
//           key: 'stage2PaymentAmount',
//           className: 'stage2Column',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage2', 'status'],
//           key: 'stage2PaymentStatus',
//           className: 'stage2Column',
//         },
//       ],
//     },
//     {
//       title: 'Stage 3 Payment',
//       children: [
//         {
//           title: 'Amount',
//           dataIndex: ['payment', 'stage3', 'amount'],
//           key: 'stage3PaymentAmount',
//           className: 'stage3Column',
//         },
//         {
//           title: 'Status',
//           dataIndex: ['payment', 'stage3', 'status'],
//           key: 'stage3PaymentStatus',
//           className: 'stage3Column',
//         },
//       ],
//     },
//   ];

//   const completionColumns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Stage 1 Completion',
//       dataIndex: 'stage1Completion',
//       key: 'stage1Completion',
//       render: text => formatCompletionData(text),
//     },
//     {
//       title: 'Stage 2 Completion',
//       dataIndex: 'stage2Completion',
//       key: 'stage2Completion',
//       render: text => formatCompletionData(text),
//     },
//     {
//       title: 'Stage 3 Completion',
//       dataIndex: 'stage3Completion',
//       key: 'stage3Completion',
//       render: text => formatCompletionData(text),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col xs={24} sm={12} md={8}>
//           <Card>
//             <Statistic title="Total Users" value={filteredData.length} />
//           </Card>
//         </Col>
//       </Row>
//       <Row gutter={16} style={{ marginTop: '20px' }}>
//         <Col span={24}>
//           <Card title="User Data Overview" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//             <Row gutter={16}>
//               <Col span={24} style={{ marginBottom: '20px' }}>
//                 <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
//                 <Card>
//                   <Search
//                     placeholder="Search by Enrollment ID"
//                     onSearch={handleSearch}
//                     enterButton
//                     style={{ width: "15rem" }}
//                   />
//                   <Table
//                     columns={paymentColumns}
//                     dataSource={filteredData}
//                     rowKey="enrollmentId"
//                     pagination={{ pageSize: 10 }}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Title level={4} style={{ textAlign: 'center' }}>Stage Completion Table</Title>
//                 <Card>
//                   <Table
//                     columns={completionColumns}
//                     dataSource={filteredData}
//                     rowKey="enrollmentId"
//                     pagination={{ pageSize: 10 }}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dash;


import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Input, Typography, Modal, Radio, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Dash.css'; // Assuming you're using a CSS file named Dash.css

const { Search } = Input;
const { Title } = Typography;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dash = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStage, setSelectedStage] = useState('stage1');
  const [remarks, setRemarks] = useState([]);
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    if (managerId) {
      axios.get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
        .then(response => {
          setUserData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [managerId]);

  const handleSearch = value => {
    const filtered = userData.filter(item => item.enrollmentId.includes(value));
    setFilteredData(filtered);
  };

  const formatCompletionData = (data) => {
    if (!data) return '';
    return data.replace(/updated on (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/, (_, dateStr) => {
      return `(${moment(dateStr).format('DD-MM-YYYY')})`;
    });
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUser(null);
    setSelectedStage('stage1');
  };

  const handleViewRemarks = (user) => {
    setRemarks(user.remarks || []);
    message.info(`Remarks: ${user.remarks.map(r => r.text).join(', ')}`);
  };

  const paymentColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Stage 1 Payment',
      children: [
        {
          title: 'Amount',
          dataIndex: ['payment', 'stage1', 'amount'],
          key: 'stage1PaymentAmount',
          className: 'stage1Column',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage1', 'status'],
          key: 'stage1PaymentStatus',
          className: 'stage1Column',
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
          className: 'stage2Column',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage2', 'status'],
          key: 'stage2PaymentStatus',
          className: 'stage2Column',
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
          className: 'stage3Column',
        },
        {
          title: 'Status',
          dataIndex: ['payment', 'stage3', 'status'],
          key: 'stage3PaymentStatus',
          className: 'stage3Column',
        },
      ],
    },
  ];

  const completionColumns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Completion Stages',
      key: 'completionStages',
      render: (_, record) => (
        <>
          <div>{`Stage 1: ${formatCompletionData(record.stage1Completion)}`}</div>
          <div>{`Stage 2: ${formatCompletionData(record.stage2Completion)}`}</div>
          <div>{`Stage 3: ${formatCompletionData(record.stage3Completion)}`}</div>
        </>
      ),
    },
    {
      title: 'User Details',
      key: 'userDetails',
      render: (_, record) => (
        <a onClick={() => handleViewDetails(record)}>View Details</a>
      ),
    },
    {
      title: 'Remarks',
      key: 'remarks',
      render: (_, record) => (
        <a onClick={() => handleViewRemarks(record)}>View Remarks</a>
      ),
    },
  ];

  const countIncomplete = (stage) => {
    return userData.filter(user => !user[`${stage}Completion`]).length;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Users" value={filteredData.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Stage 1 Not Done" value={countIncomplete('stage1')} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Stage 2 Not Done" value={countIncomplete('stage2')} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Stage 3 Not Done" value={countIncomplete('stage3')} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="User Data Overview" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Row gutter={16}>
              <Col span={24} style={{ marginBottom: '20px' }}>
                <Title level={4} style={{ textAlign: 'center' }}>Payment Table</Title>
                <Card>
                  <Search
                    placeholder="Search by Enrollment ID"
                    onSearch={handleSearch}
                    enterButton
                    style={{ width: "15rem" }}
                  />
                  <Table
                    columns={paymentColumns}
                    dataSource={filteredData}
                    rowKey="enrollmentId"
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Title level={4} style={{ textAlign: 'center' }}>Stage Completion Table</Title>
                <Card>
                  <Table
                    columns={completionColumns}
                    dataSource={filteredData}
                    rowKey="enrollmentId"
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal
  open={modalVisible}
  title="User Details"
  onCancel={handleModalClose}
  footer={null}
>
  {selectedUser && (
    <>
      <Radio.Group onChange={handleStageChange} value={selectedStage}>
        <Radio value="stage1">Stage 1</Radio>
        <Radio value="stage2">Stage 2</Radio>
        <Radio value="stage3">Stage 3</Radio>
      </Radio.Group>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Enrollment ID:</strong> {selectedUser.enrollmentId}</p>
        {selectedStage === 'stage1' && (
          <div>
            <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage1.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage1.status)}</p>
            <p><strong>Legality:</strong> {formatCompletionData(selectedUser.legality)}</p>
            <p><strong>OVC:</strong> {formatCompletionData(selectedUser.ovc)}</p>
            <p><strong>ID Card:</strong> {formatCompletionData(selectedUser.idCard)}</p>
            <p><strong>Theme:</strong> {formatCompletionData(selectedUser.theme)}</p>
            {/* Add more details related to Stage 1 */}
          </div>
        )}
        {selectedStage === 'stage2' && (
          <div>
            <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage2.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage2.status)}</p>
            <p><strong>CAT File:</strong> {formatCompletionData(selectedUser.catFile)}</p>
            <p><strong>Product File:</strong> {formatCompletionData(selectedUser.productFile)}</p>
            <p><strong>Logo:</strong> {formatCompletionData(selectedUser.logo)}</p>
            <p><strong>Banner:</strong> {formatCompletionData(selectedUser.banner)}</p>
            <p><strong>Gallery:</strong> {formatCompletionData(selectedUser.gallery)}</p>
            {/* Add more details related to Stage 2 */}
          </div>
        )}
        {selectedStage === 'stage3' && (
          <div>
            <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage3.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage3.status)}</p>
            <p><strong>Server Purchase:</strong> {formatCompletionData(selectedUser.serverPurchase)}</p>
            <p><strong>Domain Claim:</strong> {formatCompletionData(selectedUser.domainClaim)}</p>
            <p><strong>Domain Mail Verification:</strong> {formatCompletionData(selectedUser.domainMailVerification)}</p>
            <p><strong>Website Uploaded:</strong> {formatCompletionData(selectedUser.websiteUploaded)}</p>
            <p><strong>Payment Gateway:</strong> {formatCompletionData(selectedUser.paymentGateway)}</p>
            <p><strong>Ready To Handover:</strong> {formatCompletionData(selectedUser.readyToHandover)}</p>
            {/* Add more details related to Stage 3 */}
          </div>
        )}
      </div>
    </>
  )}
</Modal>

    </div>
  );
};

export default Dash;
