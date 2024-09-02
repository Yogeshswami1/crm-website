import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography } from 'antd';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import './Userdashboard.css';
import moment from 'moment';
import HorizontalTimeline from './Horizontaltimeline';

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const { Title } = Typography;

const Timeline1 = () => {
  const [tasks, setTasks] = useState([]);
  const [userCreatedDate, setUserCreatedDate] = useState('');
  const [projectStatus, setProjectStatus] = useState('Pending');
  const [completionDate, setCompletionDate] = useState('Pending');

  useEffect(() => {
    const id = localStorage.getItem('enrollmentId');
    if (id) {
      fetchUserData(id);
      fetchTasks(id);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      checkProjectStatus(tasks);
    }
  }, [tasks]);

  const fetchTasks = async (id) => {
    try {
      const [tasksResponse, additionalTasksResponse] = await Promise.all([
        axios.get(`${apiUrl}/api/contact/${id}/tasks`),
        axios.get(`${apiUrl}/api/contact/enrollmentId/${id}`)
      ]);

      const tasksData = tasksResponse.data;
      const contactData = additionalTasksResponse.data;
      const additionalTasksData = getAdditionalTasks(contactData);

      setTasks([...tasksData, ...additionalTasksData]);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const fetchUserData = async (enrollmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/enrollmentId/${enrollmentId}`);
      const userData = response.data;
      setUserCreatedDate(userData.date);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const getAdditionalTasks = (contactData) => {
    const fields = [
      { key: 'idCard', label: 'ID Card' },
      { key: 'training', label: 'Training' },
      { key: 'ebook', label: 'Ebook' },
      { key: 'supportPortal', label: 'Support Portal' },
      { key: 'walletPortal', label: 'Wallet Portal' },
      { key: 'gallery', label: 'Gallery' },
      { key: 'legality', label: 'Legality' },
    ];

    return fields.map(field => {
      const fieldValue = contactData[field.key];
      let status = 'Pending';
      let formattedComment = `${field.label}: ${fieldValue || 'N/A'}`;

      if (fieldValue && fieldValue.includes('(updated on')) {
        const [actualValue, datePart] = fieldValue.split(' (updated on ');
        status = actualValue === 'Done' ? 'Done' : 'Pending';

        if (datePart) {
          const date = datePart.replace(')', ''); // Remove the closing parenthesis
          const formattedDate = moment(date).format('DD-MM-YYYY');
          formattedComment = `${field.label}: ${actualValue} (updated on ${formattedDate})`;
        }
      }

      return {
        comment: formattedComment,
        status,
      };
    });
  };

  const checkProjectStatus = (tasks) => {
    const allDone = tasks.every(task => task.status === 'Done');
    setProjectStatus(allDone ? 'Completed' : 'Pending');
    setCompletionDate(allDone ? moment().format('DD-MM-YYYY') : 'Pending');
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
      <HorizontalTimeline userCreatedDate={userCreatedDate} projectStatus={projectStatus} completionDate={completionDate} />

      <VerticalTimeline>
        {tasks.slice().reverse().map((task, index) => (
          <VerticalTimelineElement
            key={index}
            date={`Status: ${task.status}`}
            icon={getIcon(task.status)}
            iconStyle={{
              background: 'white',
              color: '#fff',
              boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
            }}
            contentStyle={getContentStyle(task.status)}
            contentArrowStyle={{ borderRight: '7px solid  #f9f9f9' }}
            dateStyle={{
              color: '#999',
              fontSize: '14px',
            }}
          >
            <Title level={5} style={{ fontWeight: 'bold', color: '#333' }}>{task.comment}</Title>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline1;
