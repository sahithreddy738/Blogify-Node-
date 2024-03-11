const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment=require("../models/comment");

const blogRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });


blogRouter.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

blogRouter.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  console.log(req.file);
  console.log(req.user);
  const blog = await Blog.create({
    body,
    title,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy:req.user.id
  });
  console.log(blog);
  return res.redirect(`/`);
});

blogRouter.get("/:id", async (req,res) =>{ 
    const id=req.params.id;
   const blog=await Blog.findById(req.params.id).populate("createdBy");
   const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
   console.log(blog);
   return res.render("blog",{
     blog,
     comments,
     user:req.user
   })
})
blogRouter.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user.id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  });

module.exports = blogRouter;
