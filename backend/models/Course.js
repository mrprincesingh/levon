import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Please enter the image"]
    },
  title: {
    type: String,
  
  },
  description: {
    type: String,
  
  },
 
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
