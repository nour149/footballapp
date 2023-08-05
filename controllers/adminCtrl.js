const AdminModel = require("../models/adminModel");
const terrainModel = require("../models/terrainModel");
const userModel = require("../models/userModels");
const adminModel = require("../models/adminModel");
const appointmentModel = require("../models/appointmentModel");

// APpply Rerrain CTRL
const applyTerrainController = async (req, res) => {
    try {
      const newTerrain = await terrainModel({ ...req.body, status: "pending" });
      await newTerrain.save();
      // Optionally, you can send a success response back to the client with relevant data.
    res.status(200).json({
      success: true,
      message: "Terrain application successful.",
      data: newTerrain, // or any other relevant data
    });


    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Applying For Terrain",
      });
    }
  };
  const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "users data list",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "erorr while fetching users",
        error,
      });
    }
  };
  
  const getAllTerrainsController = async (req, res) => {
    try {
      const terrains = await terrainModel.find({});
      res.status(200).send({
        success: true,
        message: "Terrains Data list",
        data: terrains,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while getting terrain data",
        error,
      });
    }
  };
  
  // doctor account status
  const changeAccountStatusController = async (req, res) => {
    try {
      const { Id, status } = req.body;
      const terrain = await terrainModel.findByIdAndUpdate(Id, { status });
      const user = await userModel.findOne({ _id: terrain.userId });
      const notifcation = user.notifcation;
      notifcation.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isTerrain = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: terrain,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };
 //get single docotor
const getAdminByIdController = async (req, res) => {
  try {
    const admins = await AdminModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Single admin Info Fetched",
      data: admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
}; 

const adminAppointmentsController = async (req, res) => {
  try {

     // Create a new entry in the adminModel
    // const newAdmin = new adminModel({
     // userId: "1", // Assuming userId is a number (e.g., 1)
    //  status: "pending", // Assuming status is a string (e.g., "pending")
    //  time: "10.45", // Assuming time is a number (e.g., 45)
   // });

    //await newAdmin.save();
    const admin = await adminModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "admin Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin Appointments",
    });
  }
};  


const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/admin-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};
  module.exports = {
    adminAppointmentsController,
    applyTerrainController,
     getAllTerrainsController,
    getAllUsersController,
    changeAccountStatusController,
    getAdminByIdController ,
    updateStatusController,
  };