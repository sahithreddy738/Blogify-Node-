const express=require("express");
const Blog = require("../models/blog");

const staticRouter=express.Router();

staticRouter.get("/",async (req,res) =>{
    const allBlogs=await Blog.find({});
    return res.render("home",{
        user:req.user,
        blogs:allBlogs
    });
} )

module.exports=staticRouter;