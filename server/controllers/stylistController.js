const db = require("../models");

// Defining methods for the stylistController
module.exports = {
  findAll: function(req, res) {
    console.log('stylistController.findAll');
    db.User.find({ "userType": "stylist" })
      .then(users => res.json(users))
      //error handling
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .then(singleUser => res.json(singleUser))
      //error handling
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    let data = req.body;
    console.log(data);
    db.User.findOneAndUpdate({ _id: data._id }, {$set: {firstName: data.firstName, lastName: data.lastName, username: data.username, emailAddress: data.emailAddress, licNum: data.licNum}}, {new: true})
      .then(dbModel => res.json(dbModel))
      //error handling
      .catch(err => res.status(422).json(err));
  },
  updateRates: function(req, res) {
    let data = req.body;
    console.log(data);
    db.User.findOneAndUpdate({ _id: data._id }, {$set: {hair: data.hair, makeup: data.makeup, nails: data.nails}}, {new: true})
      .then(dbModel => res.json(dbModel))
      //error handling
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create(req.body)
      .then(newUser => res.json(newUser))
      //error handling
      .catch(err => res.status(422).json(err));
  },
  // remove: function(req, res) {
  //   db.User.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     //error handling
  //     .catch(err => res.status(422).json(err));
  // }
};
