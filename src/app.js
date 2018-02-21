const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');




let app = express();
let router = express.Router();

// Load enviromnet variables to process.env from .env file
dotenv.config({ path: '.env' });

const userControlller = require('./controllers/user');
const meetingControlller = require('./controllers/meeting');
const textController = require('./controllers/text');
const issueController = require('./controllers/issue');
const textProcessController = require('./controllers/textprocess');

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log('MongoDB connection established ' + mongoUrl);
}).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
});


middleWare = () => {
  const options = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false
  };

  router.use(cors(options));
  router.options('*', cors(options));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((err, req, res, next) => {
    res.status(500).send(err.toString());
  })
}

mountRoutes = () => {
  router.get('/user', userControlller.get);
  router.get('/user/:name', userControlller.get);
  router.post('/user', userControlller.insert);

  router.get('/meeting', meetingControlller.getAll);
  router.get('/meeting/:name', meetingControlller.get);
  router.post('/meeting', meetingControlller.insert);
  router.put('/meeting', meetingControlller.update);

  router.get('/issue', issueController.getAll);
  router.get('/issue/:number', issueController.get);
  router.post('/issue', issueController.insert);
  router.put('/issue', issueController.update);

  app.use('/api', router);
}

middleWare();
mountRoutes();

module.exports = app;
