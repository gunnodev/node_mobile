const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

app.use(express.urlencoded({
    extended: true
  }))

app.get('/', (req, res) => {
  console.log('Got body:', req.body)
  res.json({text:'Hello World'})
})

app.post('/register', jsonParser, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log('Got body:', req.body)

    if(username=='witthaya_p') res.json({success : true , username : username})
    else res.json({success : false , username : username})

})

app.post('/register_otp', jsonParser , (req, res) => {
    
    var otp = req.body.otp;
    
    console.log(req.body);
    res.json({success : true , auth_code : between(100000 , 900000) , otp : otp})
})

app.post('/register_device_token', jsonParser , (req, res) => {
    var device_token = req.body.device_token;
    res.json({success : true , device_token : device_token})

})

app.post('/is_login', jsonParser , (req, res) => {
    //res.json({success : true , device_token : '123456789'})
    var authen_code = req.body.authen_code;
    if(authen_code=='123456') res.json({is_login : 'yes'})
    else res.json({is_login : 'no'})
})

app.post('/next_login', jsonParser , (req, res) => {
    // res.json({success : true , device_token : '123456789'}) 
    res.json({success : true})
})

app.listen(8100, () => {
  console.log('Start server at port 8100.')
})


function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}