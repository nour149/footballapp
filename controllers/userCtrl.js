const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const terrainModel = require("../models/terrainModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const adminModel = require("../models/adminModel");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200).send({ message: "user not found", success: false });
    }


  
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    console.log('req.body.userId', req.body.userId);
    const user = await userModel.findOne({ _id: req.body.userId });

    // Filter unread notifications and mark them as seen
    const unreadNotifications = user.notification.filter(notification => {
      if (notification.status === 'NOTREAD') {
        user.seennotification.push(notification); 
        return false; 
      }
      return true; 
    });

    unreadNotifications.forEach(notification => {
      notification.status = 'READ';
    });

    user.notification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Unread notifications marked as read and seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};
//GET ALl terr 
const getAllTerrainsController = async (req, res) => {
  try {
    const terrains = await terrainModel.find({  });;
    res.status(200).send({
      success: true,
      message: "Terrains Lists Fetched Successfully",
      data: terrains,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching ",
    });
  }
};




//get single terrain
const getTerrainByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const terrains = await terrainModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Single terrain Info Fetched",
      data: terrains,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single terrain info",
    });
  }
};


//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  try {
   
   
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

  const all =  await userModel.find({isAdmin:true})
console.log('alll',all)

try {
  const useradminnotfi = await userModel.updateMany({isAdmin:true}, {$push: { notification: {
    type: "New-appointment-request",
    message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
    status:'NOTREAD',
    onCLickPath: "/user/appointments",
  }}});
console.log(useradminnotfi)
} catch (error) {
  console.error('Error updating documents:', error);
}
  
 
    res.status(200).send({
      success: true,
      message: "Appointment Book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};






const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    }).sort({ _id: -1 });

  
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};



const CheckAppointmentController = async (req, res) => {
  try {
   
    
    console.log( req.body.Id)
   console.log( req.body.time)
   console.log( req.body.date)
   const all = await appointmentModel.find({
    Id:req.body.Id,

    
  });
 console.log(all)
 const filteredArray = all.filter(item => {
  return item.date === req.body.date && item.time === req.body.time;
});
console.log(filteredArray.length)
  if (filteredArray.length == 0){
    res.status(200).send({
      success: true,
      message: "You Can Booking ",
   });
  }else{
    res.status(200).send({
      success: false,
      message: "This terrain is unavailable",
     
   });
  }
  
 
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
   }
};


module.exports = {
  loginController,
  registerController,
  userAppointmentsController,
  authController,
  getAllNotificationController,
  getAllTerrainsController,
  getTerrainByIdController,
  bookAppointmentController,
  CheckAppointmentController
  
};
