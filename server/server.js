// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import managerRoutes from './routes/managerRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import dotenv from "dotenv";
// import bodyParser from 'body-parser';
// import contactRoutes from "./routes/contactRoutes.js";
// import servicesRoutes from "./routes/servicesRoutes.js";
// import uploadRoutes from "./routes/uploadRouter.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// import authRoutes from "./routes/authRoutes.js";
// import todoRoutes from './routes/todoRoutes.js';


// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/managers', managerRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/services', servicesRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/task', taskRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/todos', todoRoutes);

// app.use('/api', authRoutes);




// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)

// .then(() => {
//   console.log("DB connected successfully");

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// })
// .catch((error) => {
//   console.log('Error connecting to MongoDB:', error.message);
// });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import managerRoutes from './routes/managerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import supervisorRoutes from './routes/supervisorRoutes.js';
import accountantRoutes from './routes/accountantRoutes.js';
import telesalesRoutes from './routes/telesalesRoutes.js';

import whatsappRoutes from './routes/whatsapp.js';
import changesRoutes from './routes/changesRoutes.js';
import rmdRoutes from './routes/rmdRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import timesheetRoutes from './routes/timesheetRoutes.js';




dotenv.config();

const app = express();



app.use(cors({
  // origin: 'https://website.saumiccraft.com',  // Temporarily allow all origins for debugging
  origin: 'http://webcrm.saumic.com',  // Temporarily allow all origins for debugging

  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/managers', managerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/accountants', accountantRoutes);
app.use('/api/telesales', telesalesRoutes);

app.use('/api/whatsapp', whatsappRoutes);
app.use('/api', changesRoutes);

app.use('/api/rmd', rmdRoutes);
app.use('/api/social', socialRoutes);
app.use('/api', changesRoutes);
app.use('/api/timesheets', timesheetRoutes);




const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`Server Initialized on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
