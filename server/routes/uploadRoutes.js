// // import express from 'express';
// // import multer from 'multer';
// // import { uploadContacts } from '../controllers/uploadController.js'; 

// // const router = express.Router();

// // // Set up multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads/');
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${Date.now()}-${file.originalname}`);
// //   }
// // });

// // const upload = multer({ storage });

// // // Create the route for uploading contacts
// // router.post('/upload', upload.single('file'), uploadContacts);

// // export default router;


// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { uploadContacts } from '../controllers/uploadController.js';
// import Busboy from 'busboy';

// const router = express.Router();

// // Create the route for uploading contacts
// router.post('/upload', (req, res) => {
//   const busboy = Busboy({ headers: req.headers });
//   const uploadDir = path.join('uploads');

//   // Ensure the upload directory exists
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }

//   let filePath = '';

//   busboy.on('file', (fieldname, file, filename) => {
//     filePath = path.join(uploadDir, `${Date.now()}-${filename}`);
//     file.pipe(fs.createWriteStream(filePath));
//   });

//   busboy.on('finish', () => {
//     if (filePath) {
//       req.file = { path: filePath };
//       uploadContacts(req, res);
//     } else {
//       res.status(400).send('No file uploaded.');
//     }
//   });

//   req.pipe(busboy);
// });

// export default router;


import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import Busboy from 'busboy';
import { uploadContacts } from '../controllers/uploadController.js';

const router = express.Router();

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the route for uploading contacts
router.post('/upload', (req, res) => {
  console.log('Received upload request');
  console.log('Request Headers:', req.headers);

  const busboy = Busboy({ headers: req.headers });
  const uploadDir = path.join(__dirname, 'uploads');

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    console.log('Creating upload directory:', uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let filePath = '';

  busboy.on('file', (fieldname, file, filename) => {
    console.log('File object:', { fieldname, filename });

    // Extract filename if it's an object
    if (typeof filename === 'object' && filename.filename) {
      filename = filename.filename;
    } else if (typeof filename !== 'string') {
      console.error('Filename is not a string or object:', filename);
      return res.status(400).send('Invalid file format.');
    }

    filePath = path.join(uploadDir, `${Date.now()}-${filename}`);
    console.log('Creating file at path:', filePath);

    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('error', (err) => {
      console.error('Error writing file:', err);
    });
    file.pipe(writeStream);
  });

  busboy.on('finish', () => {
    console.log('Upload finished');
    if (filePath) {
      console.log('File saved to:', filePath);
      req.file = { path: filePath };
      uploadContacts(req, res);
    } else {
      console.log('No file uploaded');
      res.status(400).send('No file uploaded.');
    }
  });

  req.pipe(busboy);
});

export default router;
