const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getAllNotificationController,
  getAllTerrainsController,
  getTerrainByIdController,
  bookAppointmentController,
  userAppointmentsController,
  
} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");



//router onject
const router = express.Router();

//routes


//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);


 //Auth || POST
router.post("/getUserData", authMiddleware, authController);
 
//Notifiaction  Doctor || POST
router.post("/get-all-notification",authMiddleware,getAllNotificationController);
//GET ALL DOC
router.get("/getAllTerrains", authMiddleware, getAllTerrainsController);
//POST  GET SINGLE DOC INFO
router.post("/getTerrainById", authMiddleware,getTerrainByIdController);
//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);
//Appointments List
router.get("/user-appointments", authMiddleware,  userAppointmentsController);

module.exports = router;
