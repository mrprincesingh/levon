import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Course from "../models/Course.js";

export const addCourse = catchAsyncError(async (req, res, next) => {
  const { image , title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Please enter all the required fields", 400));
  }

  // Assuming the instructor is the currently authenticated user


  const course = await Course.create({
    image,
    title,
    description,
    
  });

  res.status(201).json({
    success: true,
    course,
  });
});

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.title || "";

    const courses = await Course.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    
    });
  
    res.status(200).json({
      success: true,
      courses,
    });
  });

  export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  
    const course = await Course.findById(id);
  
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
  
    await Course.deleteOne({ _id: id });
  
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  });
  
  export const editCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const course = await Course.findById(id);
  
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
  
    // Update the fields only if they are provided in the request
    if (title) {
      course.title = title;
    }
  
    if (description) {
      course.description = description;
    }
  
    await course.save();
  
    res.status(200).json({
      success: true,
      course,
    });
  });
  