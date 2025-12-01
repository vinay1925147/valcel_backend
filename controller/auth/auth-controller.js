import bcrypt from "bcryptjs";
import { genrateToken, verifyToken } from "../../config/token.js";
import User from "../../models/user.js";
// register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists then try again with diffrent email",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newuser.save();
    res.status(200).json({
      msg: "Registration successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "some error occurred",
      success: false,
    });
  }
};
// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "User is not found",
        success: false,
      });
    }
 
    const isMatch = await bcrypt.compare(password, user.password); //t or f
    
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: "Please enter your Correct password", success: false });
    }
    // token generate
    const token = genrateToken(user);
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({
      msg: "Loged in successful",
      success: true,
      user:user
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "some error occurred",
      success: false,
    });
  }
};
// logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token").json({
      msg: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Error accur during logout",
      success: false,
    });
  }
};
// middleware
export const middleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized user",
        success: false,
      });
    }
    const verifyUser = verifyToken(token);
    req.user = verifyUser;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "some error occurred",
      success: false,
    });
  }
};
