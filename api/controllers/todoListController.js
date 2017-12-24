'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.get_wallet = function (req, res) {
    console.log("in wallet");

    var crypto = require('crypto');
    var request = require('request');
    var apiKey = 'xxx';
    var apiSecret = 'xxx';
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
    request(options, function (err, response) {
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


exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function (req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function (req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};
