const express = require("express");
const {applyTerrainController,
  getAllUsersController,
  getAllTerrainsController,
  changeAccountStatusController,
  getAdminByIdController,
 adminAppointmentsController,
 updateStatusController,
} = require("../controllers/adminCtrl");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || TERRAINS
router.get("/getAllTerrains", authMiddleware,  getAllTerrainsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);
//APply TERRAIN|| POST
router.post("/apply-terrain", authMiddleware, applyTerrainController);
// Use the user routes

router.post("/getAdminById", authMiddleware, getAdminByIdController);

//GET Appointments
router.get("/admin-appointments",authMiddleware,adminAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;