const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user accounts to add news ones for testing

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist-auth");

const userSeed = [
  {
    username: "mike",
    password: "password123",
    emailAddress: "mike@email.com",
    userType: "client"
    //date: new Date(Date.now())
  },
  {
    username: "hardin",
    password: "password123",
    emailAddress: "hardin@email.com",
    userType: "client"
  },
  {
    username: "alyssa",
    password: "password123",
    emailAddress: "alyssa@email.com",
    userType: "stylist"
  },
  {
    username: "lacey",
    password: "password123",
    emailAddress: "lacey@email.com",
    userType: "stylist"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
