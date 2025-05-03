require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const validUrl = require('valid-url');
const shortid = require('shortid');

let urlDatabase = {};  // In-memory storage for URL mappings

// POST: /api/shorturl to shorten URL
app.post('/api/shorturl', express.json(), (req, res) => {
  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    return res.json({ error: 'invalid url' });
  }

  const shortUrl = shortid.generate();
  urlDatabase[shortUrl] = url;

  res.json({
    original_url: url,
    short_url: shortUrl,
  });
});

// GET: /api/shorturl/<short_url> to redirect to original URL
app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (urlDatabase[shortUrl]) {
    return res.redirect(urlDatabase[shortUrl]);
  } else {
    return res.json({ error: 'No short URL found for given input' });
  }
});
