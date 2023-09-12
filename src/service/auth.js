const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const mongoose = require("mongoose")

// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };

// exports.postLogin = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (validator.isEmpty(req.body.password))
//     validationErrors.push({ msg: "Password cannot be blank." });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("/login");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       req.flash("errors", info);
//       return res.redirect("/login");
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       req.flash("success", { msg: "Success! You are logged in." });
//       res.redirect(req.session.returnTo || "/profile");
//     });
//   })(req, res, next);
// };

// exports.logout = (req, res) => {
//   req.logout(() => {
//     console.log('User has logged out.')
//   })
//   req.session.destroy((err) => {
//     if (err)
//       console.log("Error : Failed to destroy the session during logout.", err);
//     req.user = null;
//     res.redirect("/");
//   });
// };

// exports.getSignup = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("signup", {
//     title: "Create Account",
//   });
// };

exports.postSignup = async (req, res, next) => {
  console.log(req.body)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    userName: req.body.userName,
    userEmail: req.body.email,
    passHash: req.body.password,
  });

  let existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
  if (existingUser) {
    req.flash("errors", {
      msg: "Account with that email address or username already exists.",
    });
    return //res.redirect("../signup");
  }
  await user.save()
    
  // (err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   req.logIn(user, (err) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.redirect("/profile");
  //   });
  // };
};
