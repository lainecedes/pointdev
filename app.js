require('dotenv').config();

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const authEnabled = process.env.NODE_ENV === 'development';

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: false }));

if (authEnabled) {
    console.log('Authentication is enabled');
    app.use(passport.initialize());
    app.use(passport.session());

    // Pass user info to views
    app.use((req, res, next) => {
        res.locals.user = req.isAuthenticated() ? req.user : null;
        next();
    });
} else {
    console.log('Authentication is disabled');
}

// Error handling w/ Flash:
app.use(flash());

if (authEnabled) {
    // Configure Passport with local strategy
    passport.use(new LocalStrategy((username, password, done) => {
        console.log('Authenticating username:', username);
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {
            return done(null, { username: process.env.USERNAME });
        } else {
            return done(null, false, { message: 'Invalid credentials' });
        }
    }));

    passport.serializeUser((user, done) => {
        console.log('Serializing user:', user);
        done(null, user.username); // Serialize by username
    });

    passport.deserializeUser((username, done) => {
        console.log('Deserializing user with username:', username);
        done(null, { username: username }); // Deserialize user object
    });
}

// PROTECT ROUTES HERE:
function ensureAuthenticated(req, res, next) {
    if (authEnabled) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
    next(); // skip auth when disabled
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const projectPath = path.join(__dirname, 'public/data/projects.json');

// Routing start
fs.readFile(projectPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the projects file:', err);
        return;
    }
    const projects = JSON.parse(data).projects;

    app.get('/', ensureAuthenticated, (req, res) => {
        res.render('base', {
            title: 'Home',
            content: 'index',
            projects,
        });
    });

    app.get('/about', ensureAuthenticated, (req, res) => {
        res.render('base', {
            title: 'About',
            content: 'about',
        });
    });

    app.get('/projects', ensureAuthenticated, (req, res) => {
        res.render('base', {
            title: 'Projects',
            content: 'projects',
            projects,
        });
    });

    app.get('/ade-redesign', ensureAuthenticated, (req, res) => {
        res.render('base', {
            title: 'ADE Redesign',
            content: 'ade',
        });
    });

    // Log in/out route start, authentication
    if (authEnabled) {
        app.get('/login', (req, res) => {
            res.render('login', { message: req.flash('error') });
        });

        app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

        app.get('/logout', (req, res, next) => {
            req.logout((err) => {
                if (err) {
                    console.error('Error during logout:', err);
                    return next(err);
                }
                res.redirect('/login'); // Redirect to login after logout
            });
        });
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Authentication enabled:', authEnabled);
});