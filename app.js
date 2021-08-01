const express  = require('express');
const app = express();
const path = require('path');
const axios = require("axios");
const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;
const setting = require('./util/setting');

const intelRoutes = require('./routes/intel');
const edgeRoutes = require('./routes/edge');
const loginRoutes = require('./routes/login');

app.use(express.static('public'));

var checkpoint_data = {};

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/auth", loginRoutes);
app.use("/intel", intelRoutes);
app.use("/edge", verifyToken, edgeRoutes);

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname+'/pages/index.html'));
})

app.get("/getStatTarget", (req, res) => {
    //  getStatTarget
    const db = getDb();
    db.collection('setting').findOne().then(checkpoint => {
        checkpoint_data = checkpoint;
        console.log(checkpoint);
        if(checkpoint){
            axios.get('http://' + setting.centreIP + ':7100/vi2-centre/frontend/web/index.php?r=site/state&checkpoint_id='+checkpoint._id)
                .then(function (response) {
                    console.log(response.data);
                    // let data = JSON.parse(response.data);
                    res.status(200).json({
                        data: response.data,
                        status: true
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(200).json({
                        status: false
                    });
                });
        }
    });
});

//Verify Token
function verifyToken(req,res,next){
    //Auth header value = > send token into header

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){

        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //next middleweare
        next();

    }else{
        //Fobidden
        res.sendStatus(403);
    }

}

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

mongoConnect(() => {
    const db = getDb();
    db.collection('setting').deleteMany({}).then((result)=>{
        app.listen(3004, () => {
            console.log("start node port 3004");
        });
    })
 
});