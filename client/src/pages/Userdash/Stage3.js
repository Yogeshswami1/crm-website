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

// const Stage3 = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const id = localStorage.getItem('enrollmentId');
//     if (id) {
//       fetchUserData(id);
//       fetchTasks(id);
//     }
//   }, []);

//   const fetchTasks = async (id) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`);
//       const contactData = response.data;
//       const additionalTasksData = getAdditionalTasks(contactData);

//       setTasks(additionalTasksData);
//     } catch (error) {
//       console.error('Error fetching tasks: ', error);
//     }
//   };

//   const fetchUserData = async (enrollmentId) => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
//       const userData = response.data;
//     } catch (error) {
//       console.error('Error fetching user data: ', error);
//     }
//   };

//   const getAdditionalTasks = (contactData) => {
//     const fields = [
//       { key: 'stage3Completion', label: 'Stage 3 Completion' },
//       { key: 'readyToHandover', label: 'Ready To Handover' },
//       { key: 'paymentGateway', label: 'Payment Gateway' },
//       { key: 'websiteUploaded', label: 'Website Uploaded' },
//       { key: 'domainMailVerification', label: 'Domain Mail Verification' },
//       { key: 'domainClaim', label: 'Domain Claim' },
//       { key: 'serverPurchase', label: 'Server Purchase' },
//     ];

//     return fields.map(field => {
//       const fieldValue = contactData[field.key];
//       let status = 'Pending';
//       let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

//       if (field.key === 'domainClaim') {
//         status = fieldValue && fieldValue !== 'N/A' ? 'Done' : 'Pending';
//       } else if (field.key === 'paymentGateway') {
//         status = fieldValue && fieldValue !== 'N/A' ? 'Done' : 'Pending';
//       } else if (fieldValue && fieldValue.includes('(updated on')) {
//         const [actualValue, datePart] = fieldValue.split(' (updated on ');
//         status = actualValue === 'Done' ? 'Done' : 'Pending';

//         if (datePart) {
//           const date = datePart.replace(')', ''); // Remove the closing parenthesis
//           const formattedDate = moment(date).format('DD-MM-YYYY');
//           formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
//         }
//       }

//       return {
//         comment: formattedComment,
//         status,
//       };
//     });
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
//         {tasks.slice().reverse().map((task, index) => (
//           <VerticalTimelineElement
//             key={index}
//             date={`Status: ${task.status}`}
//             icon={getIcon(task.status)}
//             iconStyle={{
//               background: 'white',
//               color: '#fff',
//               boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
//             }}
//             contentStyle={getContentStyle(task.status)}
//             contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
//             dateStyle={{
//               color: '#999',
//               fontSize: '14px',
//             }}
//           >
//             <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment}</Title>
//           </VerticalTimelineElement>
//         ))}
//       </VerticalTimeline>
//     </div>
//   );
// };

// export default Stage3;


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

const Stage1 = () => {
  const [userData, setUserData] = useState(null);

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
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
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
          background: '#c8e6c9', // Light green for Done
        };
      case 'Pending':
        return {
          background: '#bbdefb', // Light blue for Pending
        };
      default:
        return {
          background: '#ffcdd2', // Light red for Error
        };
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <VerticalTimeline>
        {/* Payment Stage 3 */}
        {userData?.payment?.stage3 && (
          <VerticalTimelineElement
            date={`Payment Stage 3 Status: ${userData?.payment?.stage3?.status || 'Pending'}`}
            icon={getIcon(userData?.payment?.stage3?.status)}
            contentStyle={getContentStyle(userData?.payment?.stage3?.status)}
          >
            <Title level={5}>Payment Stage 3</Title>
            <p><strong>Amount:</strong> {userData?.payment?.stage3?.amount}</p>
            <p><strong>Payment Mode:</strong> {userData?.payment?.stage3?.paymentMode}</p>
            <p><strong>Status:</strong> {userData?.payment?.stage3?.status}</p>
            <p><strong>Date:</strong> {userData?.payment?.stage3?.date ? moment(userData?.payment?.stage3?.date).format('DD-MM-YYYY') : 'N/A'}</p>
          </VerticalTimelineElement>
        )}

        {/* Server Purchase */}
        {userData?.serverPurchase && (
          <VerticalTimelineElement
            date={`Server Purchase Date: ${userData?.serverPurchaseDate || 'N/A'}`}
            icon={getIcon(userData?.serverPurchase ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.serverPurchase)}
          >
            <Title level={5}>Server Purchase</Title>
            <p><strong>Server Purchase:</strong> {userData?.serverPurchase}</p>
            <p><strong>Server ID:</strong> {userData?.serverId}</p>
            <p><strong>Server Password:</strong> {userData?.serverPassword}</p>
          </VerticalTimelineElement>
        )}

        {/* Domain Claim */}
        {userData?.domainClaim && (
          <VerticalTimelineElement
            date={`Domain Claim Date: ${userData?.domainClaimDate || 'N/A'}`}
            icon={getIcon(userData?.domainClaim ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.domainClaim)}
          >
            <Title level={5}>Domain Claim</Title>
            <p><strong>Domain Claim:</strong> {userData?.domainClaim}</p>
          </VerticalTimelineElement>
        )}

        {/* Domain Mail Verification */}
        {userData?.domainMailVerification && (
          <VerticalTimelineElement
            date={`Domain Mail Verification Date: ${userData?.domainMailVerificationDate || 'N/A'}`}
            icon={getIcon(userData?.domainMailVerification ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.domainMailVerification)}
          >
            <Title level={5}>Domain Mail Verification</Title>
            <p><strong>Verification:</strong> {userData?.domainMailVerification}</p>
          </VerticalTimelineElement>
        )}

        {/* Website Uploaded */}
        {userData?.websiteUploaded && (
          <VerticalTimelineElement
            date={`Website Uploaded Date: ${userData?.websiteUploadedDate || 'N/A'}`}
            icon={getIcon(userData?.websiteUploaded ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.websiteUploaded)}
          >
            <Title level={5}>Website Uploaded</Title>
            <p><strong>Website:</strong> {userData?.websiteUploaded}</p>
          </VerticalTimelineElement>
        )}

        {/* ID and PASS */}
        {userData?.idAndPassWebsite?.id && (
          <VerticalTimelineElement
            date={`ID and PASS Provided`}
            icon={getIcon('Done')}
            contentStyle={getContentStyle('Done')}
          >
            <Title level={5}>ID and PASS</Title>
            <p><strong>ID:</strong> {userData?.idAndPassWebsite?.id}</p>
            <p><strong>Pass:</strong> {userData?.idAndPassWebsite?.pass}</p>
          </VerticalTimelineElement>
        )}

        {/* Payment Gateway */}
        {userData?.paymentGateway && (
          <VerticalTimelineElement
            date={`Payment Gateway Date: ${userData?.paymentGatewayDate || 'N/A'}`}
            icon={getIcon(userData?.paymentGateway ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.paymentGateway)}
          >
            <Title level={5}>Payment Gateway</Title>
            <p><strong>Gateway:</strong> {userData?.paymentGateway}</p>
          </VerticalTimelineElement>
        )}

        {/* Ready to Handover */}
        {userData?.readyToHandover && (
          <VerticalTimelineElement
            date={`Ready to Handover Date: ${userData?.readyToHandoverDate || 'N/A'}`}
            icon={getIcon(userData?.readyToHandover ? 'Done' : 'Pending')}
            contentStyle={getContentStyle(userData?.readyToHandover)}
          >
            <Title level={5}>Ready to Handover</Title>
            <p><strong>Status:</strong> {userData?.readyToHandover}</p>
          </VerticalTimelineElement>
        )}

        {/* Stage 3 Completion */}
        {userData?.stage3Completion && (
          <VerticalTimelineElement
            date={`Stage 3 Completion Date: ${userData?.stage3CompletionDate || 'N/A'}`}
            icon={getIcon(userData?.stage3Completion)}
            contentStyle={getContentStyle(userData?.stage3Completion)}
          >
            <Title level={5}>Stage 3 Completion</Title>
            <p><strong>Status:</strong> {userData?.stage3Completion}</p>
          </VerticalTimelineElement>
        )}
      </VerticalTimeline>
    </div>
  );
};

export default Stage1;
