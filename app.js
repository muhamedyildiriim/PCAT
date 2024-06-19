const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const Photo = require('./models/Photo')

const app = express();

// CONNECT DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
})

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {photos});
});

app.get('/index.html', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {photos});
});

app.get('/photo.html', (req, res) => {
  res.render('photo');
});

app.get('/contact.html', (req, res) => {
  res.render('contact');
});

app.get('/about.html', (req, res) => {
  res.render('about');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  console.log(req.body)
  res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
