

// import React, { useEffect, useState } from 'react';
// import { Card, Statistic, Row, Col, Table, Input, Typography, Modal, Radio, message } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './Dash.css'; // Assuming you're using a CSS file named Dash.css

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//     const [selectedStageData, setSelectedStageData] = useState([]); // New state for selected stage data
//   const [selectedStageTitle, setSelectedStageTitle] = useState(''); // New state for selected stage title
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedStage, setSelectedStage] = useState('stage1');
//   const [remarks, setRemarks] = useState([]);
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

//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//     setModalVisible(true);
//   };

//   const handleStageChange = (e) => {
//     setSelectedStage(e.target.value);
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//     setSelectedUser(null);
//     setSelectedStage('stage1');
//   };

//   const handleViewRemarks = (user) => {
//     setRemarks(user.remarks || []);
//     message.info(`Remarks: ${user.remarks.map(r => r.text).join(', ')}`);
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
//       title: 'Completion Stages',
//       key: 'completionStages',
//       render: (_, record) => (
//         <>
//           <div>{`Stage 1: ${formatCompletionData(record.stage1Completion)}`}</div>
//           <div>{`Stage 2: ${formatCompletionData(record.stage2Completion)}`}</div>
//           <div>{`Stage 3: ${formatCompletionData(record.stage3Completion)}`}</div>
//         </>
//       ),
//     },
//     {
//       title: 'User Details',
//       key: 'userDetails',
//       render: (_, record) => (
//         <a onClick={() => handleViewDetails(record)}>View Details</a>
//       ),
//     },
//     {
//       title: 'Remarks',
//       key: 'remarks',
//       render: (_, record) => (
//         <a onClick={() => handleViewRemarks(record)}>View Remarks</a>
//       ),
//     },
//   ];

//   const countIncomplete = (stage) => {
//     return userData.filter(user => !user[`${stage}Completion`]).length;
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <Statistic title="Total Users" value={filteredData.length} />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <Statistic title="Stage 1 Not Done" value={countIncomplete('stage1')} />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <Statistic title="Stage 2 Not Done" value={countIncomplete('stage2')} />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card>
//             <Statistic title="Stage 3 Not Done" value={countIncomplete('stage3')} />
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
//             {/* <Row gutter={16}>
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
//             </Row> */}
//           </Card>
//         </Col>
//       </Row>

//       <Modal
//   open={modalVisible}
//   title="User Details"
//   onCancel={handleModalClose}
//   footer={null}
// >
//   {selectedUser && (
//     <>
//       <Radio.Group onChange={handleStageChange} value={selectedStage}>
//         <Radio value="stage1">Stage 1</Radio>
//         <Radio value="stage2">Stage 2</Radio>
//         <Radio value="stage3">Stage 3</Radio>
//       </Radio.Group>
//       <div style={{ marginTop: '20px' }}>
//         <p><strong>Enrollment ID:</strong> {selectedUser.enrollmentId}</p>
//         {selectedStage === 'stage1' && (
//           <div>
//             <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage1.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage1.status)}</p>
//             <p><strong>Legality:</strong> {formatCompletionData(selectedUser.legality)}</p>
//             <p><strong>OVC:</strong> {formatCompletionData(selectedUser.ovc)}</p>
//             <p><strong>ID Card:</strong> {formatCompletionData(selectedUser.idCard)}</p>
//             <p><strong>Theme:</strong> {formatCompletionData(selectedUser.theme)}</p>
//             {/* Add more details related to Stage 1 */}
//           </div>
//         )}
//         {selectedStage === 'stage2' && (
//           <div>
//             <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage2.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage2.status)}</p>
//             <p><strong>CAT File:</strong> {formatCompletionData(selectedUser.catFile)}</p>
//             <p><strong>Product File:</strong> {formatCompletionData(selectedUser.productFile)}</p>
//             <p><strong>Logo:</strong> {formatCompletionData(selectedUser.logo)}</p>
//             <p><strong>Banner:</strong> {formatCompletionData(selectedUser.banner)}</p>
//             <p><strong>Gallery:</strong> {formatCompletionData(selectedUser.gallery)}</p>
//             {/* Add more details related to Stage 2 */}
//           </div>
//         )}
//         {selectedStage === 'stage3' && (
//           <div>
//             <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage3.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage3.status)}</p>
//             <p><strong>Server Purchase:</strong> {formatCompletionData(selectedUser.serverPurchase)}</p>
//             <p><strong>Domain Claim:</strong> {formatCompletionData(selectedUser.domainClaim)}</p>
//             <p><strong>Domain Mail Verification:</strong> {formatCompletionData(selectedUser.domainMailVerification)}</p>
//             <p><strong>Website Uploaded:</strong> {formatCompletionData(selectedUser.websiteUploaded)}</p>
//             <p><strong>Payment Gateway:</strong> {formatCompletionData(selectedUser.paymentGateway)}</p>
//             <p><strong>Ready To Handover:</strong> {formatCompletionData(selectedUser.readyToHandover)}</p>
//             {/* Add more details related to Stage 3 */}
//           </div>
//         )}
//       </div>
//     </>
//   )}
// </Modal>

//     </div>
//   );
// };

// export default Dash;


// import React, { useEffect, useState } from 'react';
// import { Card, Statistic, Row, Col, Table, Input, Typography, Modal } from 'antd';
// import axios from 'axios';
// import './Dash.css'; // Assuming you're using a CSS file named Dash.css

// const { Search } = Input;
// const { Title } = Typography;

// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dash = () => {
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalData, setModalData] = useState([]); // To store the filtered data for the modal
//   const [selectedStage, setSelectedStage] = useState('stage1');
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

//   const countIncomplete = (stage) => {
//     return userData.filter(user => user[`${stage}Completion`] !== 'Done').length;
//   };

//   const handleCardClick = (stage) => {
//     const incompleteUsers = userData.filter(user => user[`${stage}Completion`] !== 'Done');
//     setModalData(incompleteUsers); // Set the filtered data for the modal
//     setSelectedStage(stage);
//     setModalVisible(true); // Show modal with filtered users
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//   };

//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Completion Status',
//       dataIndex: `${selectedStage}Completion`,
//       key: 'completionStatus',
//       render: (text) => text || 'Not Done',
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Row gutter={16}>
//         <Col xs={24} sm={12} md={6}>
//           <Card onClick={() => handleCardClick('stage1')}>
//             <Statistic title="Stage 1 Not Done" value={countIncomplete('stage1')} />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card onClick={() => handleCardClick('stage2')}>
//             <Statistic title="Stage 2 Not Done" value={countIncomplete('stage2')} />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card onClick={() => handleCardClick('stage3')}>
//             <Statistic title="Stage 3 Not Done" value={countIncomplete('stage3')} />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={16} style={{ marginTop: '20px' }}>
//         <Col span={24}>
//           <Card title="Payment Table">
//             <Row gutter={16}>
//               <Col span={24} style={{ marginBottom: '20px' }}>
//                 <Title level={4}>Payment Table</Title>
//                 <Search
//                   placeholder="Search by Enrollment ID"
//                   onSearch={handleSearch}
//                   enterButton
//                   style={{ width: "15rem" }}
//                 />
//                 <Table
//                   columns={columns}
//                   dataSource={filteredData}
//                   rowKey="enrollmentId"
//                   pagination={{ pageSize: 10 }}
//                 />
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       <Modal
//         open={modalVisible}
//         title={`${selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)} Not Done`}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         <Table
//           columns={columns}
//           dataSource={modalData}
//           rowKey="enrollmentId"
//           pagination={{ pageSize: 10 }}
//         />
//       </Modal>
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
  const [selectedStageData, setSelectedStageData] = useState([]); // New state for selected stage data
  const [selectedStageTitle, setSelectedStageTitle] = useState(''); // New state for selected stage title
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStage, setSelectedStage] = useState('stage1');
  const [remarks, setRemarks] = useState([]);
  const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false); // New state for enrollment ID modal
  const [enrollmentIds, setEnrollmentIds] = useState([]); // State to hold enrollment IDs for the modal
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

  const countIncomplete = (stage) => {
    return userData.filter(user => user[`${stage}Completion`] !== 'Done').length;
  };

  const handleCardClick = (stage) => {
    let filteredUsers;
  
    if (stage === 'total') {
      // Show all users for the 'Total Users' card
      filteredUsers = userData;
      setSelectedStageTitle('All Enrollment IDs');
    } else {
      // Filter users where the selected stage is not completed
      filteredUsers = userData.filter(user => user[`${stage}Completion`] !== 'Done');
      setSelectedStageTitle(`Enrollment IDs for ${stage.charAt(0).toUpperCase() + stage.slice(1)} Not Done`);
    }
  
    const enrollmentIds = filteredUsers.map(user => user.enrollmentId);
    setEnrollmentIds(enrollmentIds);
    setEnrollmentModalVisible(true);
  };
  
  const handleEnrollmentModalClose = () => {
    setEnrollmentModalVisible(false);
    setEnrollmentIds([]);
  };

  return (
    <div style={{ padding: '20px' }}>
    <Row gutter={16}>
  <Col xs={24} sm={12} md={6}>
    <Card onClick={() => handleCardClick('total')} style={{ cursor: 'pointer' }}>
      <Statistic title="Total Users" value={filteredData.length} />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Card onClick={() => handleCardClick('stage1')} style={{ cursor: 'pointer' }}>
      <Statistic title="Stage 1 Not Done" value={countIncomplete('stage1')} />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Card onClick={() => handleCardClick('stage2')} style={{ cursor: 'pointer' }}>
      <Statistic title="Stage 2 Not Done" value={countIncomplete('stage2')} />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={6}>
    <Card onClick={() => handleCardClick('stage3')} style={{ cursor: 'pointer' }}>
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
          </Card>
        </Col>
      </Row>

      <Modal
        open={enrollmentModalVisible}
        title={selectedStageTitle}
        onCancel={handleEnrollmentModalClose}
        footer={null}
      >
        <ul>
          {enrollmentIds.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </Modal>

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
                </div>
              )}
              {selectedStage === 'stage2' && (
                <div>
                  <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage2.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage2.status)}</p>
                  <p><strong>Gallery:</strong> {formatCompletionData(selectedUser.gallery)}</p>
                  <p><strong>Social Media Content:</strong> {formatCompletionData(selectedUser.socialMediaContent)}</p>
                  <p><strong>Document:</strong> {formatCompletionData(selectedUser.document)}</p>
                </div>
              )}
              {selectedStage === 'stage3' && (
                <div>
                  <p><strong>Payment:</strong> {formatCompletionData(selectedUser.payment.stage3.amount)} &nbsp;<strong>Status:</strong>{formatCompletionData(selectedUser.payment.stage3.status)}</p>
                  <p><strong>Report:</strong> {formatCompletionData(selectedUser.report)}</p>
                  <p><strong>Feedback:</strong> {formatCompletionData(selectedUser.feedback)}</p>
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
