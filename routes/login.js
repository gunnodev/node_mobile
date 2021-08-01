const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const axios = require('axios');
const getDb = require('../util/database').getDb;
const setting = require('../util/setting');

router.post('/check_password', (req, res) => {
    let password = req.body.key;
    const db = getDb();
    console.log(password);
    db.collection('setting').find({key: password}).next().then(checkpoint => {
            
        if(checkpoint){
            //Mock user
            const user = {
                key: password
            }

            //send abpve as payload
            jwt.sign({user},'secretkey',(err,token)=>{
                res.json({
                    token: token,
                    checkpoint_name: checkpoint.site_name,
                    status: true
                })
            })
             
        }else{
            axios.post('http://' + setting.centreIP + ':7101/getCheckpoint', {'key': password})
                .then(function (response) {
                    console.log(response.data.response.data);
                    if(response.data.response.data){
                        let checkpoint = response.data.response.data;
                        db.collection('setting').deleteMany({}).then(del => {
                            db.collection('setting').insert(checkpoint).then(result => {
                                console.log("1 document inserted");
                                res.status(200).json({
                                    status: true
                                });
                            })
                        })
                    }else{
                        res.status(200).json({
                            status: false
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                    res.status(200).json({
                        status: false
                    });
                });
        }
    })
});

module.exports = router;
