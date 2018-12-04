const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      db.User.findOne({ 'username': req.user.username }).then(user => {
        console.log(user)
        res.json({ user })
      }).catch(err => console.log('whoops something messed up', err))
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { 
      // firstName, 
      // lastName, 
      emailAddress,
      username, 
      password, 
      userType
    } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'emailAddress': emailAddress }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the email: ${emailAddress}`
        });
      }
      const newUser = new db.User({
        // 'firstName': firstName,
        // 'lastName': lastName,
        'emailAddress': emailAddress,
        'username': username,
        'password': password,
        'userType' : userType
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};