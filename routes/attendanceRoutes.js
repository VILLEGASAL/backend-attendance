import express from "express";
import { getUserAttendance, addAttendance } from "../controllers/attendance_controller.js";

export const attendanceRoutes = express.Router();

attendanceRoutes.get("/", (req, res, next) => {

    if(req.isAuthenticated()){

        return next();
    }else{

        res.status(401).send();
    }
}, getUserAttendance);

attendanceRoutes.post("/add", addAttendance);