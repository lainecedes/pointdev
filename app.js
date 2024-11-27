const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('base', {
        title: 'Home',
        body: '<%- include("partials/home") %>'
    });
});

app.get('/about', (req, res) => {
    res.render('base', {
        title: 'About',
        body: '<%- include("partials/about") %>'
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
