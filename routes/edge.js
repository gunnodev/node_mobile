const express = require('express');
const router = express.Router();
const getDb = require('../util/database').getDb;

router.get('/get/camera_list', (req, res) => {
    const db = getDb();
    db.collection('engine') 
        .find()
        .toArray()
        .then(data => {
            res.status(200).json({camera_list: data, status: true});
        })
        .catch(err => {
            console.log(error.message());
            res.status(500).json({status: false, message: err.message()});
        });
});

router.get('/get/connection_status', (req, res) => {
    let profile_id = req.query.profile_id
    res.status(200).json({
        "edge": true,
        "center": false
    });
});

router.get('/get/camera_image', (req, res) => {    
    res.status(200).json({
        "success": true,
        "image_path": "http://lprgunno.dyndns-ip.com:9000/vi2/cd8636c1-97d2-47e9-837a-0c6bf27c33e2.png"
    });
});

router.get('/get/camera_status', (req, res) => {
    let profile_id = req.query.profile_id;
    // console.log({"profile_id": profile_id});
    const db = getDb();
    db.collection('engine') 
        .find({"profile_id": parseInt(profile_id)})
        .next()
        .then(data => {
            // console.log(data);
            if(data){
                res.status(200).json({
                    status: true
                });
            }else{
                res.status(200).json({
                    status: false
                });
            }
        })
        .catch(err => {
            res.status(200).json({
                status: false
            });
        });
    
});

router.post('/set/camera_status', (req, res) => {
    let profile_id = req.body.profile_id
    let status = req.body.status
    const db = getDb();
    db.collection("engine").updateOne({"profile_id": parseInt(profile_id)}, {$set: {"status": status}}, function(err) {
        if (err){
            res.status(200).json({
                profile_id: profile_id,
                status: false
            });
        }else{
            res.status(200).json({
                profile_id: profile_id,
                status: true
            });
        }
    });
});

router.get('/get/camera', (req, res) => {   
    let profile_id = req.query.profile_id
    const db = getDb();
    db.collection('engine') 
        .find({"profile_id": parseInt(profile_id)})
        .next()
        .then(data => {
            // console.log(data);
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json();
        });

});

router.get('/get/waiting_data', (req, res) => {
    res.status(200).json({
        number: 0
    });
})

router.post('/set/camera', (req, res) => {   
    let profile_id = req.body.profile_id;
    let camera = req.body.camera;
    let sensor = req.body.sensor;
    const db = getDb();
    db.collection("engine").updateOne({"profile_id": parseInt(profile_id)}, {$set: {"camera": camera, "sensor":sensor}}, { "upsert": true }, function(err) {
        if (err){
            res.status(200).json({
                profile_id: profile_id,
                status: false
            });
        }else{
            res.status(200).json({
                profile_id: profile_id,
                status: true
            });
        }
    });
});

router.post('/set/camera_face', (req, res) => {   
    let profile_id = req.body.profile_id;
    let username = req.body.username;
    let password = req.body.password;
    let rtsp = req.body.rtsp;
    let location_name = req.body.location_name;
    const db = getDb();
    db.collection("engine").updateOne({"profile_id": parseInt(profile_id)}, {$set: {"camera_face": {
        "username": username,
        "password": password,
        "rtsp": rtsp,
        "location_name": location_name
    }}}, { "upsert": true }, function(err) {
        if (err){
            res.status(200).json({
                profile_id: profile_id,
                status: false
            });
        }else{
            res.status(200).json({
                profile_id: profile_id,
                status: true
            });
        }
    });
});

module.exports = router;
