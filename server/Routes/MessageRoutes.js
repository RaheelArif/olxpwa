const express = require('express');
const router = express.Router();
const ensureAuthentication = require('../Controllers/EnsureAuthentication');
const MessageController = require('../Controllers/MessageController');

router.route('/sendMessage')
  .post(
    function (req, res) {
      MessageController.sendMessage(req.body.messageObject)
        .then(resp => {
          res.json(resp.message);
        }).catch(error => {
          res.send(error.message);
        });
    }
  );

router.route('/getMyMessages').get(
  ensureAuthentication.userAuthentication,
  function (req, res) {
    MessageController.getMyMessages(JSON.parse(req.query.userId))
      .then(resp => {
        res.json(resp);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/deleteMessage').post(
  ensureAuthentication.userAuthentication,
  function (req, res) {
    MessageController.deleteMessage(req.body.msgId)
      .then(resp => {
        res.json(resp);
      }).catch(error => {
        res.send(error);
      });
  }
);

module.exports = router;