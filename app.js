require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

// Session and Flash handling (if needed for other use cases)
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

    app.get('/', (req, res) => {
        res.render('base', {
            title: 'Home',
            content: 'index',
            projects,
        });
    });

    app.get('/about', (req, res) => {
        res.render('base', {
            title: 'About',
            content: 'about',
        });
    });

    app.get('/projects', (req, res) => {
        res.render('base', {
            title: 'Projects',
            content: 'projects',
            projects,
        });
    });

    app.get('/ade-redesign', (req, res) => {
        res.render('base', {
            title: 'ADE Redesign',
            content: 'ade',
        });
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});