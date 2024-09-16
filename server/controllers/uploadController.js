// import Contact from "../models/contactModel.js";
// import Manager from "../models/managerModel.js";
// import csv from 'csv-parser';
// import fs from 'fs';

// export const uploadContacts = (req, res) => {
//   const results = [];
//   let skippedEntriesCount = 0;

//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (data) => {
//       const formattedData = {
//         enrollmentId: data['Enrollment ID'],
//         date: data['Date'],
//         name: data['Name'],
//         email: data['Email'],
//         primaryContact: data['Primary Contact'],
//         secondaryContact: data['Secondary Contact'],
//         service: data['Service'],
//         managerPosition: data['Manager Position']
//       };

//       if (formattedData.enrollmentId && formattedData.date && formattedData.name &&
//           formattedData.email && formattedData.primaryContact && formattedData.service &&
//           formattedData.managerPosition) {
//         results.push(formattedData);
//       } else {
//         skippedEntriesCount++;
//       }
//     })
//     .on('end', async () => {
//       try {
//         const uniqueResults = [];
//         for (const contact of results) {
//           const existingEnrollment = await Contact.findOne({ enrollmentId: contact.enrollmentId });
//           if (existingEnrollment) {
//             skippedEntriesCount++;
//             continue;
//           }

//           const existingContactForService = await Contact.findOne({ primaryContact: contact.primaryContact, service: contact.service });
//           if (existingContactForService) {
//             skippedEntriesCount++;
//             continue;
//           }

//           const manager = await Manager.findOne({ position: contact.managerPosition });
//           if (!manager) {
//             skippedEntriesCount++;
//             continue;
//           }

//           uniqueResults.push({ ...contact, managerId: manager._id });
//         }

//         if (uniqueResults.length > 0) {
//           const contacts = await Contact.insertMany(uniqueResults);
//           res.status(200).json({ contacts, skippedEntriesCount });
//         } else {
//           res.status(200).json({ message: 'No new contacts added.', skippedEntriesCount });
//         }
//       } catch (error) {
//         console.error('Error inserting contacts:', error);
//         res.status(500).json({ error: 'Error importing contacts' });
//       } finally {
//         fs.unlinkSync(req.file.path);
//       }
//     })
//     .on('error', (error) => {
//       console.error('Error reading CSV file:', error);
//       res.status(500).json({ error: 'Error reading CSV file' });
//       fs.unlinkSync(req.file.path);
//     });
// };


import Contact from "../models/contactModel.js";
import Manager from "../models/managerModel.js";
import csv from 'csv-parser';
import fs from 'fs';

export const uploadContacts = (req, res) => {
  const results = [];
  let skippedEntriesCount = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      const formattedData = {
        enrollmentId: data['Enrollment ID'],
        date: data['Date'],
        name: data['Name'],
        email: data['Email'],
        primaryContact: data['Primary Contact'],
        secondaryContact: data['Secondary Contact'],
        service: data['Service'],
        managerPosition: data['Manager Position']
      };

      if (formattedData.enrollmentId && formattedData.date && formattedData.name &&
          formattedData.email && formattedData.primaryContact && formattedData.service &&
          formattedData.managerPosition) {
        results.push(formattedData);
      } else {
        skippedEntriesCount++;
      }
    })
    .on('end', async () => {
      try {
        const uniqueResults = [];
        for (const contact of results) {
          const existingEnrollment = await Contact.findOne({ enrollmentId: contact.enrollmentId });
          if (existingEnrollment) {
            skippedEntriesCount++;
            continue;
          }

          const existingContactForService = await Contact.findOne({ primaryContact: contact.primaryContact, service: contact.service });
          if (existingContactForService) {
            skippedEntriesCount++;
            continue;
          }

          const manager = await Manager.findOne({ position: contact.managerPosition });
          if (!manager) {
            skippedEntriesCount++;
            continue;
          }

          uniqueResults.push({ ...contact, managerId: manager._id });
        }

        if (uniqueResults.length > 0) {
          const contacts = await Contact.insertMany(uniqueResults);
          res.status(200).json({ contacts, skippedEntriesCount });
        } else {
          res.status(200).json({ message: 'No new contacts added.', skippedEntriesCount });
        }
      } catch (error) {
        console.error('Error inserting contacts:', error);
        res.status(500).json({ error: 'Error importing contacts' });
      } finally {
        fs.unlinkSync(req.file.path);
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ error: 'Error reading CSV file' });
      fs.unlinkSync(req.file.path);
    });
};
