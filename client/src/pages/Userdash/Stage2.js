// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import { Typography } from 'antd';
// import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
// import './Userdashboard.css';
// import moment from 'moment';


// const apiUrl = process.env.REACT_APP_BACKEND_URL;
// const { Title } = Typography;


// const Stage1 = () => {
//   const [userData, setUserData] = useState(null);
//   const [userCreatedDate, setUserCreatedDate] = useState('');
//   const [projectStatus, setProjectStatus] = useState('Pending');
//   const [completionDate, setCompletionDate] = useState('Pending');


//   useEffect(() => {
//     const id = localStorage.getItem('enrollmentId');
//     if (id) {
//       fetchUserData(id);
//     }
//   }, []);


//   const fetchUserData = async (enrollmentId) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
//       const userData = response.data;
//       setUserCreatedDate(userData.date);
//       setUserData(userData);
//       checkProjectStatus(userData);
//     } catch (error) {
//       console.error('Error fetching user data: ', error);
//     }
//   };


//   const checkProjectStatus = (userData) => {
//     const stage2Completion = userData?.stage2Completion === 'Done';
//     setProjectStatus(stage2Completion ? 'Completed' : 'Pending');
//     setCompletionDate(stage2Completion ? moment().format('DD-MM-YYYY') : 'Pending');
//   };


//   const getIcon = (status) => {
//     switch (status) {
//       case 'Done':
//         return <FaCheckCircle style={{ color: 'green' }} />;
//       case 'Pending':
//         return <FaClock style={{ color: 'blue' }} />;
//       default:
//         return <FaExclamationCircle style={{ color: 'red' }} />;
//     }
//   };


//   const getContentStyle = (status) => {
//     switch (status) {
//       case 'Done':
//         return {
//           background: '#c8e6c9', // Light green background for Done tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       case 'Pending':
//         return {
//           background: '#bbdefb', // Light blue background for Pending tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//       default:
//         return {
//           background: '#ffcdd2', // Light red background for Error tasks
//           borderRadius: '8px',
//           boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
//           padding: '20px',
//           border: '1px solid #ddd'
//         };
//     }
//   };


//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
   


//       <VerticalTimeline>
//         {/* Payment Stage 2 Card */}
//         {userData && (
//           <VerticalTimelineElement
//             date={`Payment Stage 2 Status: ${userData?.payment?.stage2?.status || 'Pending'}`}
//             icon={getIcon(userData?.payment?.stage2?.status)}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.payment?.stage2?.status)}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Payment Stage 2</Title>
//             <p><strong>Amount:</strong> {userData?.payment?.stage2?.amount}</p>
//             <p><strong>Payment Mode:</strong> {userData?.payment?.stage2?.paymentMode}</p>
//             <p><strong>Status:</strong> {userData?.payment?.stage2?.status}</p>
//             <p><strong>Date:</strong> {userData?.payment?.stage2?.date ? moment(userData?.payment?.stage2?.date).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* CAT File Card */}
//         {userData?.catFile && (
//           <VerticalTimelineElement
//             date={`CAT File Status: ${userData?.catFile ? 'Available' : 'Not Available'}`}
//             icon={getIcon(userData?.catFile ? 'Done' : 'Pending')}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.catFile ? 'Done' : 'Pending')}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>CAT File</Title>
//             <p><strong>File:</strong> {userData?.catFile}</p>
//             <p><strong>Date:</strong> {userData?.catDate ? moment(userData?.catDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* Product File Card */}
//         {userData?.productFile && (
//           <VerticalTimelineElement
//             date={`Product File Status: ${userData?.productFile ? 'Available' : 'Not Available'}`}
//             icon={getIcon(userData?.productFile ? 'Done' : 'Pending')}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.productFile ? 'Done' : 'Pending')}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Product File</Title>
//             <p><strong>File:</strong> {userData?.productFile}</p>
//             <p><strong>Date:</strong> {userData?.productDate ? moment(userData?.productDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* Logo Card */}
//         {userData?.logo && (
//           <VerticalTimelineElement
//             date={`Logo Status: ${userData?.logo ? 'Available' : 'Not Available'}`}
//             icon={getIcon(userData?.logo ? 'Done' : 'Pending')}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.logo ? 'Done' : 'Pending')}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Logo</Title>
//             <p><strong>File:</strong> {userData?.logo}</p>
//             <p><strong>Date:</strong> {userData?.logoDate ? moment(userData?.logoDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* Banner Card */}
//         {userData?.banner && (
//           <VerticalTimelineElement
//             date={`Banner Status: ${userData?.banner ? 'Available' : 'Not Available'}`}
//             icon={getIcon(userData?.banner ? 'Done' : 'Pending')}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.banner ? 'Done' : 'Pending')}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Banner</Title>
//             <p><strong>File:</strong> {userData?.banner}</p>
//             <p><strong>Date:</strong> {userData?.bannerDate ? moment(userData?.bannerDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* Gallery Card */}
//         {userData?.gallery && (
//           <VerticalTimelineElement
//             date={`Gallery Status: ${userData?.gallery ? 'Available' : 'Not Available'}`}
//             icon={getIcon(userData?.gallery ? 'Done' : 'Pending')}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.gallery ? 'Done' : 'Pending')}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Gallery</Title>
//             <p><strong>File:</strong> {userData?.gallery}</p>
//             <p><strong>Date:</strong> {userData?.galleryDate ? moment(userData?.galleryDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}


//         {/* Stage 2 Completion Card */}
//         {userData?.stage2Completion && (
//           <VerticalTimelineElement
//             date={`Stage 2 Completion Status: ${userData?.stage2Completion || 'Pending'}`}
//             icon={getIcon(userData?.stage2Completion)}
//             iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
//             contentStyle={getContentStyle(userData?.stage2Completion)}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{ color: '#999', fontSize: '14px' }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Stage 2 Completion</Title>
//             <p><strong>Status:</strong> {userData?.stage2Completion}</p>
//             <p><strong>Date:</strong> {userData?.stage2CompletionDate ? moment(userData?.stage2CompletionDate).format('DD-MM-YYYY') : 'N/A'}</p>
//           </VerticalTimelineElement>
//         )}
//       </VerticalTimeline>
//     </div>
//   );
// };


// export default Stage1;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './Userdashboard.css';
import moment from 'moment';


const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;


const Stage2 = () => {
 const [userData, setUserData] = useState(null);
 const [userCreatedDate, setUserCreatedDate] = useState('');
 const [projectStatus, setProjectStatus] = useState('Pending');
 const [completionDate, setCompletionDate] = useState('Pending');


 useEffect(() => {
   const id = localStorage.getItem('enrollmentId');
   if (id) {
     fetchUserData(id);
   }
 }, []);


 const fetchUserData = async (enrollmentId) => {
   try {
     const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
     const userData = response.data;
     setUserCreatedDate(userData.date);
     setUserData(userData);
     checkProjectStatus(userData);
   } catch (error) {
     console.error('Error fetching user data: ', error);
   }
 };


 const checkProjectStatus = (userData) => {
   const stage2Completion = userData?.stage2Completion === 'Done';
   setProjectStatus(stage2Completion ? 'Completed' : 'Pending');
   setCompletionDate(stage2Completion ? moment().format('DD-MM-YYYY') : 'Pending');
 };


 const getIcon = (status) => {
   switch (status) {
     case 'Done':
       return <FaCheckCircle style={{ color: 'green' }} />;
     case 'Pending':
       return <FaClock style={{ color: 'blue' }} />;
     default:
       return <FaExclamationCircle style={{ color: 'red' }} />;
   }
 };


 const getContentStyle = (status) => {
   switch (status) {
     case 'Done':
       return {
         background: '#c8e6c9', // Light green background for Done tasks
         borderRadius: '8px',
         boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
         padding: '20px',
         border: '1px solid #ddd'
       };
     case 'Pending':
       return {
         background: '#bbdefb', // Light blue background for Pending tasks
         borderRadius: '8px',
         boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
         padding: '20px',
         border: '1px solid #ddd'
       };
     default:
       return {
         background: '#ffcdd2', // Light red background for Error tasks
         borderRadius: '8px',
         boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
         padding: '20px',
         border: '1px solid #ddd'
       };
   }
 };


 return (
   <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
     <VerticalTimeline>
       {/* Payment Stage 2 Card */}
       {userData && (
         <VerticalTimelineElement
           date={`Payment Stage 2 Status: ${userData?.payment?.stage2?.status || 'Pending'}`}
           icon={getIcon(userData?.payment?.stage2?.status || 'Pending')}
           iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
           contentStyle={getContentStyle(userData?.payment?.stage2?.status || 'Pending')}
           contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
           dateStyle={{ color: '#999', fontSize: '14px' }}
         >
           <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Payment Stage 2</Title>
           <p><strong>Amount:</strong> {userData?.payment?.stage2?.amount || 'Pending'}</p>
           <p><strong>Payment Mode:</strong> {userData?.payment?.stage2?.paymentMode || 'Pending'}</p>
           <p><strong>Status:</strong> {userData?.payment?.stage2?.status || 'Pending'}</p>
           <p><strong>Date:</strong> {userData?.payment?.stage2?.date ? moment(userData?.payment?.stage2?.date).format('DD-MM-YYYY') : 'N/A'}</p>
         </VerticalTimelineElement>
       )}


       {/* CAT File Card */}
       <VerticalTimelineElement
         date={`CAT File Status: ${userData?.catFile ? 'Available' : 'Not Available'}`}
         icon={getIcon(userData?.catFile ? 'Done' : 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.catFile ? 'Done' : 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>CAT File</Title>
         <p><strong>File:</strong> {userData?.catFile || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.catDate ? moment(userData?.catDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>


       {/* Product File Card */}
       <VerticalTimelineElement
         date={`Product File Status: ${userData?.productFile ? 'Available' : 'Not Available'}`}
         icon={getIcon(userData?.productFile ? 'Done' : 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.productFile ? 'Done' : 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Product File</Title>
         <p><strong>File:</strong> {userData?.productFile || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.productDate ? moment(userData?.productDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>


       {/* Logo Card */}
       <VerticalTimelineElement
         date={`Logo Status: ${userData?.logo ? 'Available' : 'Not Available'}`}
         icon={getIcon(userData?.logo ? 'Done' : 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.logo ? 'Done' : 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Logo</Title>
         <p><strong>File:</strong> {userData?.logo || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.logoDate ? moment(userData?.logoDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>


       {/* Banner Card */}
       <VerticalTimelineElement
         date={`Banner Status: ${userData?.banner ? 'Available' : 'Not Available'}`}
         icon={getIcon(userData?.banner ? 'Done' : 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.banner ? 'Done' : 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Banner</Title>
         <p><strong>File:</strong> {userData?.banner || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.bannerDate ? moment(userData?.bannerDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>


       {/* Gallery Card */}
       <VerticalTimelineElement
         date={`Gallery Status: ${userData?.gallery ? 'Available' : 'Not Available'}`}
         icon={getIcon(userData?.gallery ? 'Done' : 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.gallery ? 'Done' : 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Gallery</Title>
         <p><strong>File:</strong> {userData?.gallery || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.galleryDate ? moment(userData?.galleryDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>


       {/* Stage 2 Completion Card */}
       <VerticalTimelineElement
         date={`Stage 2 Completion Status: ${userData?.stage2Completion || 'Pending'}`}
         icon={getIcon(userData?.stage2Completion || 'Pending')}
         iconStyle={{ background: 'white', color: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}
         contentStyle={getContentStyle(userData?.stage2Completion || 'Pending')}
         contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
         dateStyle={{ color: '#999', fontSize: '14px' }}
       >
         <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>Stage 2 Completed</Title>
         <p><strong>Status:</strong> {userData?.stage2Completion || 'Pending'}</p>
         <p><strong>Date:</strong> {userData?.stage2CompletionDate ? moment(userData?.stage2CompletionDate).format('DD-MM-YYYY') : 'N/A'}</p>
       </VerticalTimelineElement>
     </VerticalTimeline>
   </div>
 );
};


export default Stage2;



