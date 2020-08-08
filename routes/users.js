const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
const User = require('../models/User');

//blog model

const UsersModel = require('../models/Blog');

const {render} = require('ejs');

//blogs
router.get('/blogs', (req, res) => {
  UsersModel.find(function (err, bdata) {
    if (err) {
      console.log(err);
    } else {
      res.render('blogs', {newblog: bdata});
      console.log(bdata);
    }
  });
});

//add blogs

router.get('/addblog', (req, res) => res.render('addblog'));

// write a blog

router.get('/writeblog', (req, res) => res.render('writeblog', {bmessage: ''}));

// login Page
router.get('/login', (req, res) => res.render('login'));

//register

router.get('/register', (req, res) => res.render('register'));

//welcome

router.get('/welcome', (req, res) => res.render('welcome'));

//dashboard

router.get('/dashboard', (req, res) => res.render('dashboard'));

//show blog

router.get('/showblog', (req, res) => {
  UsersModel.find(function (err, disp) {
    if (err) {
      console.log(err);
    } else {
      res.render('showblog', {sblog: disp});
      console.log(disp);
    }
  });
});

//details

router.get('/details/:id', (req, res) => {
  console.log(req.params.id);

  UsersModel.findById(req.params.id, function (err, disp) {
    if (err) {
      console.log(err);
    } else {
      console.log(disp);

      res.render('details', {allblog: disp});
    }
  });
});

//delete
router.get('/delete/:id', function (req, res) {
  UsersModel.findByIdAndRemove(req.params.id, function (err, project) {
    if (err) {
      req.flash('error_msg', 'Record Not Deleted');
      res.redirect('../showblog');
    } else {
      req.flash('success_msg', 'Record Deleted');
      res.redirect('../showblog');
    }
  });
});

//register handler
router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please enter all fields'});
  }

  if (password != password2) {
    errors.push({msg: 'Passwords do not match'});
  }

  if (password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation

    User.findOne({email: email}).then((user) => {
      if (user) {
        //user exist

        errors.push({msg: 'Email already exists'});
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed
            newUser.password = hash;

            // save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

//write blog

router.post('/writeblog', function (req, res, next) {
  console.log(req.body);

  const mybodydata = {
    username: req.body.username,
    rollno: req.body.rollno,
    topic: req.body.topic,
    content: req.body.content,
  };
  var data = UsersModel(mybodydata);
  //var data = UsersModel(req.body);
  data.save(function (err) {
    if (err) {
      res.render('writeblog', {bmessage: ' Try again Not Submitted !!'});
    } else {
      res.render('writeblog', {bmessage: 'Successfuly Submitted '});
    }
  });
});

module.exports = router;
