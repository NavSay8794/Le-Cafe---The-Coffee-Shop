const express = require('express');
const router = express.Router()

router.get('/postOrder' , async(req,res,next)=>{
    try{
         setTimeout(()=>{
             res.status(200).json({
                 message: 'Order is Done and Ready for Pickup'
             })
         }, 15000)
    }catch(err){
        res.status(500).json({
            message: 'Something Went Wrong',
            err
        })
    }
})

module.exports = router