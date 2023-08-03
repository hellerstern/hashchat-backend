const express = require("express");
const _ = require("underscore");

const app = express();
const Chat = require("../models/chat.model");


// =============================================================== Comment CRUD

// ============================
//  CreateNewChat
// ============================

app.post('/chat/new/', (req, res) => {
  let {fromid, toid, content, ischecked} = req.body;


  const newChat = new Chat({
    fromid, toid, content, ischecked
  });

  Chat.updateMany({ fromid: toid, toid: fromid }, {
    $set: {
      ischecked: true
    }
  })

  newChat.save((err, result) => {
    if (err) {
      return res.json({
        ok: false,
        err
      })
    }

    return res.json({
      ok: true,
      result
    })
  }) 
});

app.post('/chat/update/', (req, res) => {
  const {fromid, toid} = req.body;
  Chat.updateMany({ fromid, toid }, {
    $set: {
      ischecked: true
    }
  }, (err, result) => {
    if (err) {
      return res.json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      result
    })
  })
})

app.get('/chat/getall/:nftid', (req, res) => {
  const nftid = req.params.nftid;

  Chat.find({ $or: [
    {
      fromid: nftid,
    },
    {
      to: '0',
    },
    {
      toid: nftid,
    }
  ]}, (err, result) => {
    if (err) {
      return res.json({
        ok: false,
        err
      })
    }

    return res.json({
      ok: true,
      result
    })
  })
})

module.exports = app;
