// to use a router we need to brinmg express there
const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

router.get('/test',(req,res)=>res.json({msg:"Posts Works"}));
module.exports=router;

// @route   GET api/posts
// @des  Get Post
// @access  Public
router.get('/',(req,res)=>{
  Post.find()
    .sort({date:-1})
    .then(posts=>res.json(posts))
    .catch(err=>res.status(404).json({nopostsfound:'No posts found with that id'}));
});

// @route   GET api/posts:id
// @des  Get Post by id
// @access  Public
router.get('/:id',(req,res)=>{
  Post.findById(req.params.id)
    .then(post=>res.json(post))
    .catch(err=>res.status(404).json({nopostfound:'No posts found with that id'}));
});

// @route   DELETE api/posts:id
// @des   Delete Post with id 
// @access  Private


router.delete('/:id', passport.authenticate('jwt', { session: false }),(req,res)=>{
     Profile.findOne({user:req.user.id})
     .then(profile =>{
          Post.findById(req.params.id)
          .then (post => {
            // check for post owner
            if(post.user.toString()!==req.user.id){
              return res.status(401).json({notauthorzied:'user not authorized'})
            }
            post.remove().then(()=>res.json({success:true}));

          })
          .catch(err=>res.status(404).json({postnotfound:'No Post Found'}));
          
     })
});
// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// @route   POST api/posts
// @des create Post
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log('req.body is',req.body);
  const{errors,isValid}=validatePostInput(req.body);
     if(!isValid){
         return res.status(400).json(errors);
     }
    const newPost=new Post({
      text:req.body.text,
      name:req.body.name,
      avatar:req.body.avatar,
      user:req.user.id
    });
newPost.save().then(post=>res.json(post));
});
