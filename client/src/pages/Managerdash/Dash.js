import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Input, Typography, Modal, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Dash.css'; // Assuming you're using a CSS file named Dash.css


const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;






const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Dash = () => {
 const [userData, setUserData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [modalVisible, setModalVisible] = useState(false);
 const [selectedStageTitle, setSelectedStageTitle] = useState(''); // New state for selected stage title
 const [selectedUser, setSelectedUser] = useState(null);
 const [selectedStage, setSelectedStage] = useState('stage1');
 const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false); // New state for enrollment ID modal
 const [enrollmentIds, setEnrollmentIds] = useState([]); // State to hold enrollment IDs for the modal
 const managerId = localStorage.getItem("managerId");


 const [year, setYear] = useState(null); // Year state
const [month, setMonth] = useState(null); // Month state




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




 const handleStageChange = (e) => {
   setSelectedStage(e.target.value);
 };


 const handleModalClose = () => {
   setModalVisible(false);
   setSelectedUser(null);
   setSelectedStage('stage1');
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


 const filterUserDataByDate = () => {
   if (!year || month === null) return userData; // If no year or month is selected, return all data
    return userData.filter(user => {
     const userDate = moment(user.date); // Assuming user.date is stored as a Date type
     return userDate.year() === year && userDate.month() === month;
   });
 };
 


 const calculateBounceRate = () => {
   const filteredUsers = filterUserDataByDate();
   const totalUsers = filteredUsers.length;


   // Count users where stage2 status is 'Not Done' or undefined/null/empty
   const stage2NotDone = filteredUsers.filter(user =>
     user.payment?.stage2?.status === 'Not Done' || !user.payment?.stage2?.status
   ).length;


   if (totalUsers === 0) return 0;


   return ((stage2NotDone / totalUsers) * 100).toFixed(2);
 };




 const handleYearChange = (value) => {
   setYear(value);
 };
  const handleMonthChange = (value) => {
   setMonth(value);
 };


 const calculateHandoverRate = () => {
  const filteredUsers = filterUserDataByDate();
 
  // Filter users who have stage 2 payment done
  const stage3PaymentDone = filteredUsers.filter(user => user.payment?.stage3?.status === 'Done').length;
 
  // Filter users who have both stage 2 payment and handover done
  const handoverDone = filteredUsers.filter(user =>
    user.readyToHandover === 'Done').length;
   if (stage3PaymentDone === 0) return 0;
   return ((handoverDone / stage3PaymentDone) * 100).toFixed(2);
};








 return (
   <div style={{ padding: '20px' }}>
   <Row gutter={16}>
     {/* Cards for Statistics */}
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
     {/* Bounce Rates and Filters */}
     <Col xs={24} md={12}>
       <Card>
         <Statistic title="Bounce Rate (Stage 2 Payment)" value={`${calculateBounceRate()}%`} />
       </Card>
     </Col>


     <Col xs={24} md={12}>
       <Card>
         <Statistic title="Bounce Rate (Ready To Handover)" value={`${calculateHandoverRate()}%`} />
       </Card>
     </Col>
   </Row>


   {/* <Row gutter={16} style={{ marginTop: '20px' }}>
     <Col xs={24} md={12}
    
     >
       <Card
       title="Filter Both Bounce Rate"
       >
         <Row gutter={16}>
           <Col span={12}>
             <Select
               placeholder="Select Year"
               onChange={handleYearChange}
               style={{ width: '100%' }}
             >
               {Array.from({ length: 5 }, (_, i) => moment().year() - i).map((year) => (
                 <Option key={year} value={year}>
                   {year}
                 </Option>
               ))}
             </Select>
           </Col>
           <Col span={12}>
             <Select
               placeholder="Select Month"
               onChange={handleMonthChange}
               style={{ width: '100%' }}
             >
               {moment.months().map((month, index) => (
                 <Option key={index} value={index}>
                   {month}
                 </Option>
               ))}
             </Select>
           </Col>
         </Row>
       </Card>
     </Col>
   </Row> */}


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
   
   
   </div>
 );
};


export default Dash;



