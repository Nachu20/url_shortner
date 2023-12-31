const express=require('express');
const mongoose=require('mongoose');
const ShortUrl=require('./model');
const { log } = require('console');
const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/Project2",{useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });
app.set('view engine', 'ejs')
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl})
  
    res.redirect('/') 
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    console.log('Short URL:', req.params.shortUrl);
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
app.listen(3000);