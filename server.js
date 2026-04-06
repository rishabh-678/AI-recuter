const express = require('express');
const path    = require('path');

const app  = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/',         (_req, res) => res.render('index',    { page: 'home' }));
app.get('/platform', (_req, res) => res.render('platform', { page: 'platform' }));
app.get('/pricing',  (_req, res) => res.render('pricing',  { page: 'pricing' }));
app.get('/about',    (_req, res) => res.render('about',    { page: 'about' }));
app.get('/contact',  (_req, res) => res.render('contact',  { page: 'contact' }));

app.post('/contact', (_req, res) => {
  // In production: send email / save to DB
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`AnytimeHire running → http://localhost:${PORT}`);
});
