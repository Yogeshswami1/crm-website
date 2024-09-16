import express from "express";
import {
  getAllContacts,
  getAll,
  addContact,
  getContactById,
  updateContactById,
  deleteContactById,
  deleteMultipleContacts,
  assignManager,
  getManagerAssignments,
  unassignManager,
  checkEnrollmentId,
  checkPrimaryContact,
  updateContactPassword,
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getContactByEnrollmentId,
  getServiceTypeByEnrollmentId,
  updateRemarkContactById,
  getContacts,
  updateContactByEnrollmentId,
  updateRemarkContactByEnrollmentId
} from "../controllers/contactController.js";



const router = express.Router();




// Routes for contacts
router.get("/manager-assignments", getManagerAssignments);
router.put("/unassign-manager", unassignManager);

router.get("/get", getAllContacts);
router.get("/getall", getAll);
router.get("/getcontact", getContacts);
router.post("/add", addContact);
router.put("/assign-manager", assignManager);
router.delete("/delete-multiple", deleteMultipleContacts);

// New routes for checking existing enrollmentId and primaryContact
router.get('/service/:enrollmentId', getServiceTypeByEnrollmentId);
router.get("/check-enrollment/:enrollmentId", checkEnrollmentId);
router.get("/check-primary-contact", checkPrimaryContact);

//update password
router.put("/update-password/:id", updateContactPassword);
router.put("/remark/:id", updateRemarkContactById);
router.put("/remark/byenroll/:enrollmentId", updateRemarkContactByEnrollmentId);


// Task routes
router.get("/:enrollmentId/tasks", getTasks);
router.post('/:enrollmentId/tasks', addTask);
router.put("/:enrollmentId/tasks/:taskId", updateTask); // Removed taskId from the route
router.delete("/:enrollmentId/tasks/:taskId", deleteTask);

// Routes that use ID should be placed after the more specific routes
router.get("/:id", getContactById);
router.get("/enrollmentId/:enrollmentId", getContactByEnrollmentId);
router.put("/:id", updateContactById);
router.put("/code/:id", updateContactByEnrollmentId);
router.delete("/:id", deleteContactById);

export default router;
