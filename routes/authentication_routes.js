
import express from "express";
import passport from "passport";
import { registerUser, checkDuplicateUsername, checkAuthenticated, logout } from "../controllers/authentication_controller.js";

export const authenticationRoute = express.Router();

authenticationRoute.post("/register", checkDuplicateUsername, registerUser);
authenticationRoute.post("/login", passport.authenticate("local"), (req, res) => {

    if (req.user) {
        return res.status(200).json({ meessage: "SUCCESS", user: req.user.first_name });
    }

    return res.status(401).json({ message: "FAILED" });
});
authenticationRoute.get("/check-auth", checkAuthenticated);
authenticationRoute.delete("/logout", logout)