import express from "express";
import { addCourse, deleteCourse, editCourse, getAllCourses } from "../controllers/courseControllers.js";


const router = express.Router();

router.route("/addcourses").post( addCourse);
router.route("/courses").get( getAllCourses);
router.route("/editcourses/:id").put(editCourse);
router.route("/deletecourses/:id").delete(deleteCourse);


export default router;
