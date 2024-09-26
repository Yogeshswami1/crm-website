// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, message } from 'antd';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import './Dashadmin.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashadmin = () => {
//   const [contacts, setContacts] = useState([]);
//   const [totalClients, setTotalClients] = useState(0);
//   const [tlClients, setTlClients] = useState({});
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const apiUrl = process.env.REACT_APP_BACKEND_URL;

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
//       const contactData = response.data;

//       setContacts(contactData);

//       // Calculate total number of clients
//       const total = contactData.length;
//       setTotalClients(total);

//       // Calculate number of clients per TL
//       const clientsByTL = contactData.reduce((acc, contact) => {
//         const tlPosition = contact.managerId?.position || 'Unknown TL';
//         acc[tlPosition] = (acc[tlPosition] || 0) + 1;
//         return acc;
//       }, {});
//       setTlClients(clientsByTL);

//       // Generate chart data based on the API response
//       const stagesCount = contactData.reduce((acc, contact) => {
//         const tl = contact.managerId?.position || 'Unknown TL';
//         if (!acc[tl]) {
//           acc[tl] = { stage1: 0, stage2: 0, stage3: 0 };
//         }

//         acc[tl].stage1 += contact.stage1Completion === 'Done' ? 1 : 0;
//         acc[tl].stage2 += contact.stage2Completion === 'Done' ? 1 : 0;
//         acc[tl].stage3 += contact.stage3Completion === 'Done' ? 1 : 0;

//         return acc;
//       }, {});

//       // Prepare data for the bar chart
//       const labels = Object.keys(stagesCount);
//       const stage1Data = labels.map((tl) => stagesCount[tl].stage1);
//       const stage2Data = labels.map((tl) => stagesCount[tl].stage2);
//       const stage3Data = labels.map((tl) => stagesCount[tl].stage3);

//       setChartData({
//         labels: labels.length ? labels : ['No TLs Available'],
//         datasets: [
//           {
//             label: 'Stage 1 Completed',
//             backgroundColor: '#3e95cd',
//             data: stage1Data.length ? stage1Data : [0],
//           },
//           {
//             label: 'Stage 2 Completed',
//             backgroundColor: '#8e5ea2',
//             data: stage2Data.length ? stage2Data : [0],
//           },
//           {
//             label: 'Stage 3 Completed',
//             backgroundColor: '#3cba9f',
//             data: stage3Data.length ? stage3Data : [0],
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       message.error('Failed to load data. Please try again.');
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <Card className="custom-card" title="Total Clients" bordered={false}>
//             {totalClients}
//           </Card>
//         </Col>
//         {Object.keys(tlClients).map((tl, index) => (
//           <Col span={8} key={index}>
//             <Card className="custom-card" title={`Clients under ${tl}`} bordered={false}>
//               {tlClients[tl]}
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Chart Section */}
//       <div className="chart-container">
//         <h3>Completion Status for Each TL</h3>
//         <Bar
//   data={chartData}
//   options={{
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Stage Completion for Each TL',
//       },
//     },
//   }}
// />
//       </div>
//     </div>
//   );
// };

// export default Dashadmin;


import React, { useState, useEffect } from 'react';
import { Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Dashadmin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashadmin = () => {
  const [contacts, setContacts] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [tlClients, setTlClients] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState([]);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/contact/getcontact`);
      const contactData = response.data;

      setContacts(contactData);

      // Calculate total number of clients
      const total = contactData.length;
      setTotalClients(total);

      // Calculate number of clients per TL
      const clientsByTL = contactData.reduce((acc, contact) => {
        const tlPosition = contact.managerId?.position || 'Unknown TL';
        acc[tlPosition] = (acc[tlPosition] || 0) + 1;
        return acc;
      }, {});
      setTlClients(clientsByTL);

      // Generate chart data based on the API response
      const stagesCount = contactData.reduce((acc, contact) => {
        const tl = contact.managerId?.position || 'Unknown TL';
        if (!acc[tl]) {
          acc[tl] = { stage1: 0, stage2: 0, stage3: 0, fbaDone: 0, fbaNotDone: 0 };
        }

        acc[tl].stage1 += contact.stage1Completion === 'Done' ? 1 : 0;
        acc[tl].stage2 += contact.stage2Completion === 'Done' ? 1 : 0;
        acc[tl].stage3 += contact.stage3Completion === 'Done' ? 1 : 0;
        acc[tl].fbaDone += contact.fbaStatus === 'Done' ? 1 : 0;
        acc[tl].fbaNotDone += contact.fbaStatus === 'Not Done' ? 1 : 0;

        return acc;
      }, {});

      // Prepare data for the bar chart
      const labels = Object.keys(stagesCount);
      const stage1Data = labels.map((tl) => stagesCount[tl].stage1);
      const stage2Data = labels.map((tl) => stagesCount[tl].stage2);
      const stage3Data = labels.map((tl) => stagesCount[tl].stage3);

      setChartData({
        labels: labels.length ? labels : ['No TLs Available'],
        datasets: [
          {
            label: 'Stage 1 Completed',
            backgroundColor: '#3e95cd',
            data: stage1Data.length ? stage1Data : [0],
          },
          {
            label: 'Stage 2 Completed',
            backgroundColor: '#8e5ea2',
            data: stage2Data.length ? stage2Data : [0],
          },
          {
            label: 'Stage 3 Completed',
            backgroundColor: '#3cba9f',
            data: stage3Data.length ? stage3Data : [0],
          },
        ],
      });

      // Prepare data for the pie chart showing the breakdown of each stage for each TL
      const pieData = Object.keys(stagesCount).map((tl) => ({
        tl,
        data: {
          labels: ['Stage 1 Completed', 'Stage 2 Completed', 'Stage 3 Completed'],
          datasets: [
            {
              label: `Completion for ${tl}`,
              backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
              data: [
                stagesCount[tl].stage1,
                stagesCount[tl].stage2,
                stagesCount[tl].stage3,
                
              ],
            },
          ],
        },
      }));

      setPieChartData(pieData);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to load data. Please try again.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
      <Col span={8}>
  <Card className="custom-card" title="Total Clients" bordered={false}>
    <div className="card-content">
      <div className="client-count">
        {totalClients}
      </div>
      {/* Add a placeholder pie chart or an icon */}
      <div className="chart-placeholder">
        <Pie
          data={{
            labels: ['Total Clients'],
            datasets: [
              {
                label: 'Total Clients',
                backgroundColor: ['#36A2EB'],
                data: [totalClients],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  </Card>
</Col>

        {Object.keys(tlClients).map((tl, index) => (
          <Col span={8} key={index}>
            <Card className="custom-card" title={`Clients under ${tl}`} bordered={false}>
              {tlClients[tl]}
              {/* Check if pie chart data exists for the current TL */}
              {pieChartData.length > 0 && pieChartData.find((pie) => pie.tl === tl) && (
                <div className="pie-chart-container">
                  <Pie data={pieChartData.find((pie) => pie.tl === tl).data} />
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bar Chart Section */}
    
    </div>
  );
};

export default Dashadmin;
