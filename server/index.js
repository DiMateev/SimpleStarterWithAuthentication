// Main starting point of our application
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = global.Promise;

const router = require('./router');

const app = express();

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on:', port);
});