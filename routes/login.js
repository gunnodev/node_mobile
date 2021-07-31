const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fn = require('../function/readfile');

router.post('/check_password', (req, res) => {
    let password = req.body.key;
    fn.readFileText((error, data)=>{
        console.log(data);
        if(!error){
            
            if(data == password){
                //Mock user
                const user = {
                    key:data
                }

                //send abpve as payload
                jwt.sign({user},'secretkey',(err,token)=>{
                    res.json({
                        token: token,
                        checkpoint_name: "ด่านตรวจเฉพาะกิจ",
                        status: true
                    })
                })
            } else {
                res.status(200).json({status: false});
            }  
        }else{
            res.status(404);
        }
    })
});

module.exports = router;
