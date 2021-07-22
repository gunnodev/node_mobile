const express = require('express');
const router = express.Router();
const fn = require('../function/between');

router.get('/', (req, res) => {
    console.log('Got body:', req.body)
    res.status(200).json({text:'Hello World'})
})

router.post('/register', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log('Got body:', req.body)

    if(username=='witthaya_p') res.status(200).json({success : true , username : username})
    else res.status(200).json({success : false , username : username})

})

router.post('/register_otp', (req, res) => {
    var otp = req.body.otp;
    console.log(req.body);
    res.status(200).json({success : true , auth_code : fn.between(100000 , 900000) , otp : otp})
})

router.post('/register_device_token', (req, res) => {
    var device_token = req.body.device_token;
    res.status(200).json({success : true , device_token : device_token})

})

router.post('/is_login', (req, res) => {
    //res.json({success : true , device_token : '123456789'})
    var authen_code = req.body.authen_code;
    if(authen_code=='123456') res.status(200).json({is_login : 'yes'})
    else res.status(200).json({is_login : 'no'})
})

router.post('/next_login', (req, res) => {
    // res.json({success : true , device_token : '123456789'}) 
    res.status(200).json({success : true})
})

module.exports = router;