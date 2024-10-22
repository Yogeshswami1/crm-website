import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;


const BounceRateStatistics = () => {
 const [userData, setUserData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [batchData, setBatchData] = useState([]); // For batch filter dropdown
 const [selectedYear, setSelectedYear] = useState(null);
 const [selectedMonth, setSelectedMonth] = useState(null);
 const [selectedBatch, setSelectedBatch] = useState(null); // For batch filter
 const managerId = localStorage.getItem("managerId");


 useEffect(() => {
   if (managerId) {
     // Fetch user data
     axios
       .get(`${apiUrl}/api/contact/getall?managerId=${managerId}`)
       .then((response) => {
         setUserData(response.data);
         setFilteredData(response.data); // Default to all data
       })
       .catch((error) => {
         console.error('Error fetching user data:', error);
       });


     // Fetch batch data for the dropdown
     axios
       .get(`${apiUrl}/api/batches/get`) // Assuming the endpoint to fetch batch data
       .then((response) => {
         setBatchData(response.data); // Set the fetched batch data
       })
       .catch((error) => {
         console.error('Error fetching batch data:', error);
       });
   }
 }, [managerId, apiUrl]);


 const filterUserDataByDateAndBatch = () => {
   return userData.filter((user) => {
     const userDate = moment(user.createdAt);
     const matchesYear = selectedYear ? userDate.year() === selectedYear : true;
     const matchesMonth = selectedMonth !== null ? userDate.month() === selectedMonth : true;
     const matchesBatch = selectedBatch ? user.batch === selectedBatch : true;


     return matchesYear && matchesMonth && matchesBatch;
   });
 };


 const calculateBounceRate = () => {
   const filteredUsers = filterUserDataByDateAndBatch();
   const totalUsers = filteredUsers.length;


   // Count users where stage2 status is 'Not Done' or undefined/null/empty
   const stage2NotDone = filteredUsers.filter(user =>
     user.payment?.stage2?.status === 'Not Done' || !user.payment?.stage2?.status
   ).length;


   if (totalUsers === 0) return 0;


   return ((stage2NotDone / totalUsers) * 100).toFixed(2);
 };


 const calculateHandoverRate = () => {
   const filteredUsers = filterUserDataByDateAndBatch();
   const totalUsers = filteredUsers.length;
   const handoverDone = filteredUsers.filter(user => user.readyToHandover === 'Done').length;


   if (totalUsers === 0) return 0;


   return ((handoverDone / totalUsers) * 100).toFixed(2);
 };


 const handleYearChange = (year) => {
   setSelectedYear(year);
 };


 const handleMonthChange = (month) => {
   setSelectedMonth(month);
 };


 const handleBatchChange = (batch) => {
   setSelectedBatch(batch);
 };


 // Prepare data for graph
 const graphData = [
   {
     name: 'Bounce Rate (Stage 2 Payment)',
     rate: parseFloat(calculateBounceRate()),
   },
   {
     name: 'Bounce Rate (Ready To Handover)',
     rate: parseFloat(calculateHandoverRate()),
   }
 ];


 // Custom Tooltip to add % symbol
 const CustomTooltip = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
     return (
       <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
         <p className="label">{`${label}`}</p>
         <p>{`Rate: ${payload[0].value}%`}</p>
       </div>
     );
   }
   return null;
 };


 return (
   <>
     {/* Filters */}
     <Row gutter={16} style={{ marginTop: '20px' }}>
       <Col xs={24} md={12}>
         <Card title="Filter Both Bounce Rate">
           <Row gutter={16}>
             <Col span={8}>
               <Select
                 placeholder="Select Year"
                 onChange={handleYearChange}
                 value={selectedYear || undefined} // Handle undefined for placeholder
                 style={{ width: '100%' }}
               >
                 <Option value={null}>All Years</Option>
                 {Array.from({ length: 5 }, (_, i) => moment().year() - i).map((year) => (
                   <Option key={year} value={year}>
                     {year}
                   </Option>
                 ))}
               </Select>
             </Col>
             <Col span={8}>
               <Select
                 placeholder="Select Month"
                 onChange={handleMonthChange}
                 value={selectedMonth !== null ? selectedMonth : undefined} // Handle undefined for placeholder
                 style={{ width: '100%' }}
               >
                 <Option value={null}>All Months</Option>
                 {moment.months().map((month, index) => (
                   <Option key={index} value={index}>
                     {month}
                   </Option>
                 ))}
               </Select>
             </Col>
             <Col span={8}>
               <Select
                 placeholder="Select Batch"
                 onChange={handleBatchChange}
                 value={selectedBatch || undefined} // Handle undefined for placeholder
                 style={{ width: '100%' }}
               >
                 <Option value={null}>All Batches</Option>
                 {batchData.map((batch) => (
                   <Option key={batch._id} value={batch.batchName}>
                     {batch.batchName}
                   </Option>
                 ))}
               </Select>
             </Col>
           </Row>
         </Card>
       </Col>
     </Row>


     {/* Bar Chart Section */}
     <Row gutter={16} style={{ marginTop: '20px' }}>
       <Col span={24}>
         <Card title="Bounce Rate Bar Chart">
           <ResponsiveContainer width="100%" height={400}>
             <BarChart
               data={graphData}
               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
             >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip content={<CustomTooltip />} />
               <Legend />
               <Bar dataKey="rate" fill="#8884d8" barSize={50} />
             </BarChart>
           </ResponsiveContainer>
         </Card>
       </Col>
     </Row>
   </>
 );
};


export default BounceRateStatistics;





