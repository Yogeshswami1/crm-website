// import express from 'express';
// import doubletick from '@api/doubletick';

// const router = express.Router();

// // Authenticate with doubletick
// doubletick.auth('key_49uMaEQ635');

// // Route to send WhatsApp template message
// router.post('/send-template-message', (req, res) => {
//   const { to, language, templateName } = req.body;

//   doubletick.outgoingMessagesWhatsappTemplate({
//     messages: [
//       {
//         content: { language, templateName },
//         to
//       }
//     ]
//   })
//   .then(({ data }) => {
//     console.log(data);
//     res.status(200).json(data);
//   })
//   .catch(err => {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   });
// });

// export default router;


import express from 'express';
import doubletick from '@api/doubletick';
import Contact from '../models/contactModel.js';

const router = express.Router();

// Authenticate with doubletick
doubletick.auth('key_49uMaEQ635');


router.post('/send-template-message', async (req, res) => {
  const { to, language, templateName, contactId } = req.body;

  try {
    // Simulate sending the message and receive a response (replace with actual code)
    const response = await doubletick.outgoingMessagesWhatsappTemplate({
      messages: [
        {
          content: { language, templateName },
          to
        }
      ]
    });

    // console.log(response.data);

    // Update the contact's templateSent status based on templateName
    let updateField = {};
    if (templateName === 'new_whatsapp_update') {
      updateField = { template1Sent: true };
    } else if (templateName === 'id_card') {
      updateField = { template2Sent: true };
    } else if (templateName === 'performa_invoice') {
      updateField = { template3Sent: true };
    } else if (templateName === 'theme_t1') {
      updateField = { template4Sent: true };
    } else if (templateName === 'theme_t2') {
      updateField = { template5Sent: true };
    } else if (templateName === 'theme_t3') {
      updateField = { template6Sent: true };
    } else if (templateName === 'theme_selections') {
      updateField = { template7Sent: true };
    } else if (templateName === 'time_schedule_schedule') {
      updateField = { template8Sent: true };
    } else if (templateName === 'calling_issue') {
      updateField = { template9Sent: true };
    } else if (templateName === 'manager_is_on_leave') {
      updateField = { template10Sent: true };
    } else if (templateName === 'rank') {
      updateField = { template11Sent: true };
    } else if (templateName === 'wp_optimizer') {
      updateField = { template12Sent: true };
    } else if (templateName === 'moving_to_stage_second') {
      updateField = { template13Sent: true };
    } else if (templateName === '2nd_installment_reminder') {
      updateField = { template14Sent: true };
    } else if (templateName === 'payment_due') {
      updateField = { template15Sent: true };
    } else if (templateName === 'banners') {
      updateField = { template16Sent: true };
    } else if (templateName === 'logo_file') {
      updateField = { template17Sent: true };
    } else if (templateName === 'forgalleryaccess') {
      updateField = { template18Sent: true };
    } else if (templateName === 'categor_selection') {
      updateField = { template19Sent: true };
    } else if (templateName === 'websitelearning') {
      updateField = { template20Sent: true };
    } else if (templateName === 'calling_status') {
      updateField = { template21Sent: true };
    } else if (templateName === 'week_off') {
      updateField = { template22Sent: true };
    } else if (templateName === 'manager_is_on_leave') {
      updateField = { template23Sent: true };
    } else if (templateName === 'moving_on_third_stage') {
      updateField = { template24Sent: true };
    } else if (templateName === 'domain_not_sended') {
      updateField = { template25Sent: true };
    } else if (templateName === 'payment_reminder') {
      updateField = { template26Sent: true };
    } else if (templateName === 'domain_and_server') {
      updateField = { template27Sent: true };
    } else if (templateName === 'website_is_live') {
      updateField = { template28Sent: true };
    } else if (templateName === 'handover_new') {
      updateField = { template29Sent: true };
    } else if (templateName === 'maxmind') {
      updateField = { template30Sent: true };
    } else if (templateName === 'changes') {
      updateField = { template31Sent: true };
    } else if (templateName === 'changes_done') {
      updateField = { template32Sent: true };
    } else if (templateName === 'calling_issue_v2') {
      updateField = { template33Sent: true };
    } else if (templateName === 'dispatch_manager') {
      updateField = { template34Sent: true };
    } else if (templateName === 'manager_is_on_leave') {
      updateField = { template35Sent: true };
    } else if (templateName === 'letter_of_completion') {
      updateField = { template36Sent: true };
    } else if (templateName === 'feedback_form') {
      updateField = { template37Sent: true };
    } else if (templateName === 'cc_avenue') {
      updateField = { template38Sent: true };
    } else if (templateName === 'payment_gateway_active') {
      updateField = { template39Sent: true };
    } else if (templateName === 'ccavenue') {
      updateField = { template40Sent: true };
    } else if (templateName === '_video_1') {
      updateField = { template41Sent: true };
    } 

    if (contactId) {
      // Update the contact based on contactId
      await Contact.findByIdAndUpdate(contactId, updateField);
    }

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
