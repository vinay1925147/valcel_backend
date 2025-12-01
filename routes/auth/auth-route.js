import express from "express";
import { register ,login, logout, middleware} from "../../controller/auth/auth-controller.js";

const route = express.Router();

route.post("/register", register)
route.post("/login",login);
route.post("/logout",logout);
route.get("/check-auth",middleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        msg:"User is authenticated",
        success:true,
        user:user
    })
});

export default route;
