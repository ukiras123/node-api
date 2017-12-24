'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/walletController');

    app.route('/wallet')
        .get(todoList.get_wallet);
};