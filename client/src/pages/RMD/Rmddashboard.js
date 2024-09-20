import React, { useState, useEffect } from 'react';
import { Table, Spin, message, Button } from 'antd';
import axios from 'axios';
import moment from 'moment'; // Import moment for date manipulation


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const Rmddashboard = () => {
 // State to store fetched data and loading state
 const [data, setData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [loading, setLoading] = useState(true);


 // Fetch data without filtering on initial load
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
       setData(response.data); // Set full data
       setFilteredData(response.data); // Initially, display full data
     } catch (error) {
       message.error('Error fetching data');
     } finally {
       setLoading(false);
     }
   };


   fetchData();
 }, []);


 // Filter the data based on Stage 1 button click
 const filterStep1Data = () => {
   const filtered = data.filter(record => {
     const stage1Date = record?.date ? moment(record.date) : null;
     return stage1Date && moment().diff(stage1Date, 'days') >= 7 &&
       (!record.stage1Completion || record.stage1Completion === 'Not Done');
   });
   setFilteredData(filtered); // Set the filtered data
 };


 // Filter the data based on Stage 2 button click
 const filterStep2Data = () => {
   const filtered = data.filter(record => {
     const stage2Date = record?.payment?.stage2?.date ? moment(record.payment.stage2.date) : null;
     return stage2Date && moment().diff(stage2Date, 'days') >= 7 &&
       (!record.stage2Completion || record.stage2Completion === 'Not Done');
   });
   setFilteredData(filtered); // Set the filtered data
 };


 // Filter the data based on Stage 3 button click
 const filterStep3Data = () => {
   const filtered = data.filter(record => {
     const stage3Date = record?.payment?.stage3?.date ? moment(record.payment.stage3.date) : null;
     return stage3Date && moment().diff(stage3Date, 'days') >= 7 &&
       (!record.stage3Completion || record.stage3Completion === 'Not Done');
   });
   setFilteredData(filtered); // Set the filtered data
 };


 // Define columns for the Ant Design table
 const columns = [
   {
     title: 'Enrollment ID',
     dataIndex: 'enrollmentId',
     key: 'enrollmentId',
   },
   {
     title: 'Manager',
     dataIndex: ['managerId', 'position'],
     key: 'manager',
     render: (manager) => (manager ? manager : 'No Manager'),
   },
   {
     title: 'Stage 1 Completion',
     dataIndex: 'stage1Completion',
     key: 'stage1Completion',
   },
   {
     title: 'Stage 2 Completion',
     dataIndex: 'stage2Completion',
     key: 'stage2Completion',
   },
   {
     title: 'Stage 3 Completion',
     dataIndex: 'stage3Completion',
     key: 'stage3Completion',
   },
 ];


 return (
   <div>
     {/* Buttons to filter data for Step 1, Step 2, and Step 3 */}
     <Button type="primary" onClick={filterStep1Data} style={{ marginBottom: 16, marginRight: 8 }}>
       Filter Stage 1 (7 days, Not Done)
     </Button>
     <Button type="primary" onClick={filterStep2Data} style={{ marginBottom: 16, marginRight: 8 }}>
       Filter Stage 2 (7 days, Not Done)
     </Button>
     <Button type="primary" onClick={filterStep3Data} style={{ marginBottom: 16 }}>
       Filter Stage 3 (7 days, Not Done)
     </Button>


     {loading ? (
       <Spin tip="Loading data..." />
     ) : (
       <Table columns={columns} dataSource={filteredData} rowKey="enrollmentId" />
     )}
   </div>
 );
};


export default Rmddashboard;



