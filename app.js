const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

// CONNECT DB
mongoose.connect('mongodb://localhost/pcat-test-db', {});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos });
});

app.get('/index.html', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/contact.html', (req, res) => {
  res.render('contact');
});

app.get('/about.html', (req, res) => {
  res.render('about');
});

app.post('/photos', async (req, res) => {
  console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
