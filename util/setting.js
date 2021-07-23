let IP = "127.0.0.1";
exports.localIP = IP;
exports.bucket = "vi2";
exports.engine = "PPA"; // "PPA", "LPR", ""
exports.engineIP = "192.168.1.101";
exports.enginePort = 33313;

exports.connection_string = "mongodb://freeman:abcd1234@" + IP + ":27011/lpr?authSource=admin";
exports.minio_option = {
    endPoint: 'lprgunno.dyndns-ip.com',
    port: 9000,
    useSSL: false,
    accessKey: '6DVY3Pkc4zGh',
    secretKey: 'FAAmZ0Evr7uH'
};

exports.cacheIP = "lprgunno.dyndns-ip.com";
exports.cachePort = "3200";

exports.centreIP = "vi2centre.dyndns-web.com";
exports.syncPort = "7102";