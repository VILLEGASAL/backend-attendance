import bcrypt from "bcrypt";
import { System } from "../models/system.js";

export const registerUser = async(req, res) => {

    try {

        const firstname = req.body["firstName"];
        const lastname = req.body["lastName"];
        const username = req.body["username"];
        const password = req.body["password"];

        const hashPassword = await bcrypt.hash(password, 10);
        
        const result = await System.registerUser(firstname, lastname, username, hashPassword);

        res.status(200).send()
        
        
    } catch (error) {

        console.log(error.message);

        res.status(500).send();
    }
}

export const checkDuplicateUsername = async(req, res, next) => {

    try {

        const username = await System.checkDuplicateUsername(req.body["username"]);
        
        return username.length <= 0 ? next() :  res.status(401).json({

            message: "Username already taken"
        });
        
    } catch (error) {
        
        console.log(error.message);
    }
}

export const checkAuthenticated = (req, res) => {

    if(req.isAuthenticated()){

        res.status(200).json({

            user: req.user.first_name + " " + req.user.last_name,
            total_hours: req.user.total_hours,
            remaining_hours: req.user.remaining_hours
        });
        
    }else{

        res.status(401).send();
    }
} 

export const logout = (req, res) => {

    req.logout(() => {

        req.session.destroy(() => {

            res.status(401).json({ message: "Logged out" });
        });
    });
}