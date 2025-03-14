import { System } from "../models/system.js";


export const getUserAttendance = async(req, res) => {

    try {
        
        console.log(req.user.user_id);
        
        const attendance = await System.getUserAttendance(req.user.user_id);

        res.status(200).json(attendance);

        
    } catch (error) {
        
        console.log(error.message);
    }
}

export const addAttendance = async(req, res) => {

    try{

        const userID = req.user.user_id;
        const date = req.body["date"];
        const timeIn = req.body["time_in"];
        const timeOut = req.body["time_out"];
        const totalHours = req.body["total_time"];

        const addAttendanceRecord = await System.addAttendance(userID, date, timeIn, timeOut, totalHours);

        addAttendanceRecord ? res.status(200).send(): res.status(400).send();

    }catch(error){

        console.log(error.message);

        res.status(500).send();
    }
}