require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const projectPath = path.join(__dirname, 'public/data/projects.json');
const stackPath = path.join(__dirname, 'public/data/stack.json');

// Routing start
// Read files and parse data once
fs.readFile(projectPath, 'utf8', (err, projectData) => {
    if (err) {
        console.error('Error reading the projects file:', err);
        return;
    }

    fs.readFile(stackPath, 'utf8', (err, stackData) => {
        if (err) {
            console.error('Error reading the stack file:', err);
            return;
        }

        const projects = JSON.parse(projectData).projects;
        const stack = JSON.parse(stackData).stack;

        // Set up routes after data is loaded
        app.get('/', (req, res) => {
            res.render('base', {
                title: 'Elaine Wilberforce - Creative Front-end Developer',
                content: 'index',
                projects,
                stack,
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
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});