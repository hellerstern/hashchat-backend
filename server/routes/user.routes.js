const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const User = require("../models/user.model");

const {
  verificateToken,
  verificateAdmin_Role,
} = require("../middlewares/authentication.middleware");
const app = express();

// ============================
// Get Active Users: Only Admin available to get users
// ============================
app.get("/user", [verificateToken, verificateAdmin_Role], (req, res) => {
  let from = req.body.from || 0;
  from = Number(from);

  // get currently enabled users: represented by status field value true
  User.find({ status: true })
    .skip(from)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      // The count condition must be the same as the find({})
      User.count({ status: true }, (err, quantity) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        res.json({
          ok: true,
          users,
          quantity,
        });
      });
    });
});

// ============================
//  Get specified user
// ============================
app.get(
  "/user/:id",
  [verificateToken, verificateAdmin_Role],
  function (req, res) {
    let id = req.params.id;
    User.findById(id)
      .where("status")
      .equals(true)
      .exec((err, userDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        if (!userDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "User with ID doesn't exist",
            },
          });
        }
        res.json({
          ok: true,
          user: userDB,
        });
      });
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
