// to use a router we need to brinmg express there
const express=require('express');
const router=express.Router();

router.get('/test',(req,res)=>res.json({msg:"Posts Works"}));
module.exports=router;
