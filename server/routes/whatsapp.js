import express from 'express';
import doubletick from '@api/doubletick';
import Contact from '../models/contactModel.js';

const router = express.Router();

// Authenticate with doubletick
doubletick.auth('key_49uMaEQ635');


// router.post('/send-template-message', async (req, res) => {
//   const { to, language, templateName, contactId } = req.body;

//   try {
//     // Simulate sending the message and receive a response (replace with actual code)
//     const response = await doubletick.outgoingMessagesWhatsappTemplate({
//       messages: [
//         {
//           content: { language, templateName },
//           to
//         }
//       ]
//     });

//     let updateField = {};
//     if (templateName === 'new_whatsapp_update') {
//       updateField = { template1Sent: true };
//     } else if (templateName === '1_message') {
//       updateField = { template2Sent: true };
//     } else if (templateName === 'performa_invoice') {
//       updateField = { template3Sent: true };
//     } else if (templateName === 'theme_t1') {
//       updateField = { template4Sent: true };
//     } 

//     if (contactId) {
//       // Update the contact based on contactId
//       await Contact.findByIdAndUpdate(contactId, updateField);
//     }

//     res.status(200).json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


router.post('/send-template-message', async (req, res) => {
  const { to, language, templateName, contactId, placeholders = [] } = req.body;

  try {
    // Create the content object dynamically based on whether placeholders are provided
    const content = {
      language,
      templateName,
    };

    // If placeholders are provided, add them to the content
    if (placeholders.length > 0) {
      content.templateData = { body: { placeholders } };
    }

    // Call the doubletick API with the constructed message
    const response = await doubletick.outgoingMessagesWhatsappTemplate({
      messages: [
        {
          content,
          to,
        }
      ]
    });

    // Define which field to update based on the templateName
    let updateField = {};
    switch (templateName) {
      case '1_message':
        updateField = { template1Sent: true };
        break;
      case 'client_information_form':
        updateField = { template2Sent: true };
        break;
      case 'id_card':
        updateField = { template3Sent: true };
        break;
        case 'performa_invoice_1':
        updateField = { template4Sent: true };
        break;
      case 'theme':
        updateField = { template5Sent: true };
        break;
        case 'theme1':
        updateField = { template6Sent: true };
        break;
        case 'theme_2_new':
        updateField = { template7Sent: true };
        break;
        case 'theme_3_new':
        updateField = { template8Sent: true };
        break;
        case 'finalize_the_theme':
        updateField = { template9Sent: true };
        break;
        case 'pending':
        updateField = { template10Sent: true };
        break;
        case '1stage_to_2stage':
        updateField = { template11Sent: true };
        break;
        case 'payment_pending':
        updateField = { template12Sent: true };
        break;
        case 'gallery_access':
        updateField = { template13Sent: true };
        break;
        case 'category_selection_new':
        updateField = { template14Sent: true };
        break;
        case 'logo_file_v2':
        updateField = { template15Sent: true };
        break;
        case 'banners_v2':
        updateField = { template16Sent: true };
        break;
        case 'domain_and_server':
        updateField = { template17Sent: true };
        break;
        case 'website_is_live':
        updateField = { template18Sent: true };
        break;
        case 'handover_new':
        updateField = { template19Sent: true };
        break;
        case 'cc_avenue':
        updateField = { template20Sent: true };
        break;
        case 'payment_gateway_active':
        updateField = { template21Sent: true };
        break;
        case 'ccavenue':
        updateField = { template22Sent: true };
        break;
      default:
        updateField = {};
    }

    // Update the contact in the database based on the contactId
    if (contactId) {
      await Contact.findByIdAndUpdate(contactId, updateField);
    }

    // Send the success response back to the client
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Route to get available templates
router.get('/get-templates', (req, res) => {
  doubletick.getTemplates()
    .then(({ data }) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

export default router;
