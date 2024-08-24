var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*' }));
app.set("view engine", "ejs");
const { URL } = require('url');
// Set the views directory (optional if it's in the root "views" directory)
app.set('views', path.join(__dirname, 'views'));

function renderNotFoundPage(req, res, title, desc) {

  //console.log('123456789');
  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render("pages/Error/NotFound", { canurl: canonicalUrl, cfoPageUrl: '/pages/Error/NotFound', title: '', Desc: '' });
  //return res.render("pages/Error/NotFound", {canurl : canonicalUrl , cfoPageUrl:"pages/Error/NotFound" });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const axios = require('axios');


// Custom middleware to serve static files
app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.url);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return next();
    }

    res.sendFile(filePath);
  });
});


app.get('/', (req, res) => {
  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.render("pages/Home/Index", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: 'Rising Advisory | Expert Financial Consulting & Business Advisory Services', Desc: 'Unlock your business potential with Rising Advisory. Our expert financial consulting, business advisory, and strategic planning services drive sustainable growth and success.' });
});

app.get("/Services/Virtual/CFO", async (req, res) => {

  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  return res.render("pages/Services/CFO", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: 'Virtual CFO Services Provider', Desc: 'As the Chief Financial Officer (CFO), I oversee a range of crucial compliance services essential for our clients&#39; financial health and regulatory adherence.' });
});

app.get("/Services/Virtual/CHRO", async (req, res) => {
  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.render("pages/Services/CHRO", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: 'Virtual CHRO Services Provider', Desc: 'Our Virtual CHRO stands at the forefront, offering a comprehensive platform to seamlessly integrate and optimize these essential functions.' });
});

app.get("/Services/Virtual/CTO", async (req, res) => {
  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.render("pages/Services/CTO", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: 'Virtual CTO Services Provider', Desc: 'Chief Technology Officer (CTO) spearheads a range of innovative services tailored to meet diverse technological needs.' });
});

app.get("/Services/Virtual/CMO", async (req, res) => {
  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.render("pages/Services/CMO", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: 'Virtual CMO Services Provider', Desc: 'As the Virtual Chief Marketing Officer (CMO), I oversee an array of strategic marketing services tailored to elevate our clients&#39; online presence and drive impactful results.' });
});
app.post('/handle-route', (req, res) => {
  const variable = req.body.variable;
  //console.log('Received variable:', variable);

  if (variable && variable.startsWith('#Contact') && variable.length > 8) {

    return renderNotFoundPage(req, res, 'Page Not Found', 'Page Not Found');

  } else {
    res.status(400).send('Invalid variable');
  }
});

app.use((req, res) => {

  const canonicalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return res.render("pages/Error/NotFound", { canurl: canonicalUrl, cfoPageUrl: 'pages/Error/NotFound', title: '', Desc: '' });

});





// Start the server
app.listen(3000, "localhost", function () {
  console.log("Server has started on http://localhost:3000");
});