const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const User = require("../models/user.model");

const app = express();



// ============================
//  Get specified user
// ============================
app.get(
  "/nft/getall",
  function (req, res) {
    User.find({}, (err, result) => {
      if (err) {
        return res.json({
          ok: false,
          err,
        })
      }


      res.json({
        ok: true,
        result
      })
    })
  }
);

// ============================
// Create New User: All users will use this api to register
// ============================
app.post("/user", function (req, res) {
  let { nftid } = req.body;
  //   first verify if user already exists or not
  User.findOne({ nftid: nftid }, (err, foundUserDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (foundUserDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User already exists in db",
        },
      });
    }

    // Here we create a new user with the params given in the request body
    let user = new User({
      nftid: nftid,
      isusing: true,
    });
    // Now we save it in to the bbdd
    user.save((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        nfts: userDB,
      });
    });
  });
});

// ============================
// Update an existing user
// ============================
app.post(
  "/nft/update/",
  function (req, res) {
    let { nftid, isusing } = req.body;

    User.findOneAndUpdate({nftid: nftid}, {
      nftid,
      isusing
    }, {}, (err, nftdb) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        })
      }


      res.json({
        ok: true,
        result: nftdb
      })
    })
  }
);

module.exports = app;
