const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

const projectFilePath = path.join(__dirname, 'public/data/projects.json');

app.get('/', (req, res) => {
    fs.readFile(projectFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the projects file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const projects = JSON.parse(data).projects;
      res.render('base', { 
        title: 'Home', 
        content: 'index',  // home.ejs
        projects
      });
    });
  });
  
  app.get('/about', (req, res) => {
    res.render('base', {
      title: 'About',
      content: 'about',  // about.ejs
    });
  });

  app.get('/archive', (req, res) => {
    res.render('base', {
      title: 'The Archive',
      content: 'archive',  // archive.ejs
    });
  });

  app.get('/ade-redesign', (req, res) => {
    res.render('base', {
      title: 'ADE Redesign',
      content: 'ade',  // ade.ejs
    });
  });
  

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
