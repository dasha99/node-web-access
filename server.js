const express=require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.PORT || 8004;

var app = express();

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
  //return 'test';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err){
        console.log('Error occured');
      }
    });
    next();
    console.log(log);
});

  // app.use((req,res, next) => {
  //   res.render('maintenance.hbs');
  // });
app.get('/', (req, res) => {
  //  res.send('<h1>Hello I got u r message: EXPRESS</h1>');
  res.render('home.hbs', {
    title: 'Home Page',
    welcome: 'Welcome to Express, Lets get started'
  })
});
app.get('/about', (req, res) => {
    // res.send('About Page')
    res.render('about.hbs', {
      title: 'About'
    });
});
app.get('/projects', (req, res) => {
    // res.send('About Page')
    res.render('projects.hbs', {
      title: 'Projects'
    });
});
app.use(express.static(__dirname+ '/public'));

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
