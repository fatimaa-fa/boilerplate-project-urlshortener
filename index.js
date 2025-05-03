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

//first instruction
fetch('https://example.com/api/shorturl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ original_url: url })
})
  .then(response => response.json())
  .then(data => {
    console.log('Original URL:', data.original_url);
    console.log('Shortened URL:', data.short_url);
  })
  .catch(error => console.error('Error:', error));

//second one

fetch(`https://example.com/api/shorturl/${shortUrl}`)
  .then(response => {
    if (response.redirected) {
      console.log('Redirecting to:', response.url);
      window.location.href = response.url; // This will actually redirect the user
    }
  })
  .catch(error => console.error('Error:', error));

  //third one

fetch('https://example.com/api/shorturl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ original_url: url })
})
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.log('Error:', data.error); // Will print: 'invalid url'
    } else {
      console.log('Original URL:', data.original_url);
      console.log('Shortened URL:', data.short_url);
    }
  })
  .catch(error => console.error('Error:', error));
