// to use a router we need to brinmg express there
const express=require('express');
const router=express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
//const validateExperienceInput = require('../../validation/experience');
//const validateEducationInput = require('../../validation/education');

const Profile =require('../../models/Profile');// load profile model
const User=require('../../models/User');// load user model
//this is GET api/Profile/test
// description : tests profile routes
// access: Public route
router.get('/test',(req,res)=>res.json({msg:"Profile Works"}));

//this is GET api/profile
// description : Get current users profile
// access: Private route
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const errors={};
  // look at models where we used ids
  Profile.findOne({user:req.user.id})
  .then(profile=>{
    if(!profile){
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    else{
      res.json(profile);
    }
  })
  .catch(err=>res.status(404).json(err));
})
//this is   POST api/profile
// description : Create  users profile
// access: Private route
// Check your profile Schema once as you read this
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
 const {errors,invalid}= validateProfileInput(req.body);
 // Check Validation
   if (!isValid) {
     // Return any errors with 400 status
     return res.status(400).json(errors);
   }
  // get fields
  const profilefields={};
  profilefields.user=req.user.id;
  if(req.body.handle) profilefields.handle=req.body.handle;
  if(req.body.compnay) profilefields.compnay=req.body.compnay;
  if(req.body.website) profilefields.website=req.body.webiste;
  if(req.body.location) profilefields.location=req.body.location;
  if(req.body.bio) profilefields.bio=req.body.bio;
  if(req.body.githubusername) profilefields.githubusername=req.body.githubusername;
  // Skills - Spilt into array
     if (typeof req.body.skills !== 'undefined') {
       profilefields.skills = req.body.skills.split(',');
     }

// social
profilefields.socail={};
if(req.body.youtube) profilefields.socail.youtube=req.body.youtube;
if(req.body.twitter) profilefields.socail.twitter=req.body.twitter;
if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

Profile.findOne({user:req.user.id}).then(profile=>{
  if(profile){
    Profile.findOneAndUpdate(
      {user:req.user.id},
      {$set:profilefields},
      {new:true}
    ).then(profile=>res.json(profile));

  new Profile(profilefields).save().then(profile=>res.json(profile));
   }
});
});
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});
module.exports=router;
