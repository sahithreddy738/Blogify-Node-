const express=require("express");
const User = require("../models/user");
const bcrypt=require("bcrypt");
const { generateToken } = require("../service/auth");

const router=express.Router();

router.get("/signup",(req,res) =>{
    return res.render("signup");
})
router.get("/login",(req,res) =>{
    return res.render("login");
})
router.post("/signup",async (req,res) =>{
    const user=req.body;
    if(!user || !user.fullName || !user.email || !user.password) {
        return res.redirect("/user/signup");
    }
    const hashedPassword = await bcrypt.hash(user.password,13);
    await User.create({
        ...user,
        password:hashedPassword
    })
    return res.redirect("/");
})
router.post("/login",async (req,res) =>{
      const { email,password} =req.body;
      try {
        const user=await User.findOne({email});
        if(!user) {
          res.redirect("/user/signup")
        }
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid) {
            throw new Error("Incorrect password");
        }
        const token=generateToken(user);
        res.cookie("token",token);
      } catch (error) {
          return res.render("login",{
            errorMsg:error
          })
      }
      return res.redirect("/");
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
  });

module.exports=router;