const express  = require('express');
const app = express();
const mongoConnect = require('./util/database').mongoConnect;

const intelRoutes = require('./routes/intel');
const edgeRoutes = require('./routes/edge');
const loginRoutes = require('./routes/login');

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
    app.listen(3004, () => {
        console.log("start node port 3004");
    });
});