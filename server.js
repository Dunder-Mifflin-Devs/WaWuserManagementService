const express = require('express');
const app = express();
const yn = require('yn');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const routes = require('./src/routes/routes.js');

require('dotenv').config({ path: './config/.env' });

// Configure Express session
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport and use session for persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user sessions
passport.serializeUser((user, done) => {
    // Serialize user data to store in the session (e.g., user.id)
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // Deserialize user data from the session (e.g., retrieve user by user.id)
    done(null, user);
  });

  app.use('/', routes);

// Check if in a local environment
const isMockEnvironment = yn(process.env.ENVIRONMENT === 'local');

let dbUrl;
if (isMockEnvironment) {
    // If in mock env, use mock DB
    dbUrl = process.env.MOCK_DB_URL;
} else {
    // Else use live DB
    dbUrl = process.env.LIVE_DB_URL;
}

app.listen(port, () => {
    console.log(`Server is running in ${port}.`);
    console.log(`Database is on ${dbUrl}`)
});