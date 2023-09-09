const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const router = express.Router();

// Replace these with your actual OAuth 2.0 credentials from the provider
const clientID = 'your-client-id';
const clientSecret = 'your-client-secret';
const authorizationURL = 'https://example.com/auth/oauth2/authorize';
const tokenURL = 'https://example.com/auth/oauth2/token';
const callbackURL = 'http://localhost:3000/auth/callback'; // Update this with your callback URL

// Define the OAuth 2.0 strategy
passport.use(
  'oauth2',
  new OAuth2Strategy(
    {
      authorizationURL,
      tokenURL,
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can perform actions after a successful authentication,
      // like fetching user data and saving it to a database.
      // 'profile' may contain user information returned by the OAuth provider.
      return done(null, profile);
    }
  )
);

// OAuth 2.0 authentication route
router.get('/auth', passport.authenticate('oauth2'));

// OAuth 2.0 callback route
router.get(
  '/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication; redirect or respond as needed
    res.redirect('/profile'); // You can replace this with your desired route
  }
);

// Protected route example
router.get('/profile', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    res.send('Welcome to the Profile Page');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
