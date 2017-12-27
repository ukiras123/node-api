'use strict';

exports.get_wallet = function(req, res) {
    console.log("in wallet");
    var crypto = require('crypto');
    var request = require('request');
    var apiKey = 'xx';
    var apiSecret = 'xx';
    var timestamp = Math.floor(Date.now() / 1000);
    var req = {
        method: 'GET',
        path: '/v2/accounts/db282668-e160-58fe-a9d1-4c9a2a4ab165',
        body: ''
    };

    var message = timestamp + req.method + req.path + req.body;
    console.log(message);
    var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

    var options = {
        baseUrl: 'https://api.coinbase.com/',
        url: req.path,
        method: req.method,
        headers: {
            'CB-ACCESS-SIGN': signature,
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-KEY': apiKey,
            'CB-VERSION': '2015-07-22'
        }
    };
    request(options, function(err, response) {
        if (err) {
            console.log(err);
            res.status(404);
            res.send("error");
        } else {
            console.log(response.body);
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.json(JSON.parse(response.body));
        }
    });
};


exports.get_token = function(req, res) {
    console.log("in token");
    var jwt = require('jsonwebtoken');

    var payload = {
        iss: "_7aGxkI0QSyWjIBgN5JEYw",
        exp: ((new Date()).getTime() + 50000)
    };

    //Automatically creates header, and returns JWT
    var token = jwt.sign(payload, "Tx57j2ZIOWfC2EqvRE5TMYELdnvVWS1YIVhY");
    console.log("Zoom token created: "+ token);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json({"token": token});

};