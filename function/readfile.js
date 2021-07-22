var fs = require('fs');

exports.readFileText = (cb) => {
    fs.readFile(__dirname+'/key.txt', "utf8", (error, data) => {
        if(error) {
            cb(error);
        }else{
            cb(null, data.toString());
        }
    });
}