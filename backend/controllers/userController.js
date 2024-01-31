import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password,role,city,mobile } = req.body;
    const file = req.file;
    if (!email || !password || !name || !role || !city || !mobile)
      return next(new ErrorHandler("please enter all the required fields", 400));
  
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User is already registered", 409));
  

    user = await User.create({ name, email, password,role,city,mobile
   
  });
  sendToken(res , user , "Registered Successfully" , 201);
  });
  
  export const login = catchAsyncError(async (req, res, next) => {
    const {  email, password , role } = req.body;
  
    if (!email || !password || !role )
      return next(new ErrorHandler("please enter all the required fields", 400));
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("incorrect email or password", 401));
    
    if(role !== user.role)
    return next(new ErrorHandler("Invaild Role" ,400))
    
  
   const isMatch = await user.comparePassword(password)
   if (!isMatch) return next(new ErrorHandler("incorrect email or password", 401));
  
  sendToken(res , user , `welcome  ${user.name}` , 200);
  });
  
  
  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });
  
  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    if (!req.user || !req.user._id) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
  
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.name || "";
    const users = await User.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    
    });
  
    res.status(200).json({
      success: true,
      users,
    });
  });