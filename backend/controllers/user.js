import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "../models/user.js";
import cookieParser from "cookie-parser";
const jwt = await import("jsonwebtoken");
import TokenMaker from "../token.js";
import { TokenExtractInfo } from "../token.js";

const User = mongoose.model("user", UserSchema);

async function RegisterUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ Message: "Email Already Registered" });
    }
    const NewUser = await User.create({
      email,
      name,
      password,
    });
    if (!NewUser) {
      throw new Error();
    }
    return res.status(201).json(NewUser);
  } catch (err) {
    return res.status(500).json({ Message: "Error Registering User" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      const userInfo = await bcrypt.compare(
        password,
        checkExistingUser.password
      );
      if (userInfo) {
        const token = TokenMaker(checkExistingUser);
        res.cookie("token", token, {
          httpOnly: true, // Hides the cookie from JavaScript (prevents XSS)
          secure: true, // Set to true in production with HTTPS
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
        });

        return res.status(200).json(checkExistingUser);
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(500).json({ Message: "Error Logging In" });
  }
}

async function getUserProfile(req, res) {
  try {
    const { token } = req.cookies;
    if (token) {
      const user = TokenExtractInfo(token);
      return res.status(200).json(user);
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(500).json({ Message: "Please Log In" });
  }
}

function logOut(req, res) {
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "Lax",
      expires: new Date(0),
    })
    .json("Logged Out");
}

export default RegisterUser;
export { loginUser, getUserProfile, logOut };
