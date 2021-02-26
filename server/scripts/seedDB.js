const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user accounts to add news ones for testing

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/glammobile");

const userSeed = [
  {
    username: "client1",
    password: "password123",
    emailAddress: "client1@email.com",
    userType: "client"
    //date: new Date(Date.now())
  },
  {
    username: "client2",
    password: "password123",
    emailAddress: "client2@email.com",
    userType: "client"
  },
  {
    username: "stylist1",
    password: "password123",
    emailAddress: "stylist1@email.com",
    userType: "stylist"
  },
  {
    username: "stylist2",
    password: "password123",
    emailAddress: "stylist2@email.com",
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
