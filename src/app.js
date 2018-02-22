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

const meetingControlller = require('./controllers/meeting');
const issueController = require('./controllers/issue');
// const textController = require('./controllers/text');

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log('MongoDB connection established ' + mongoUrl);
  // console.log(require('./helpers/meeting').addSession('storage.drive.com', 'Welcome to meet-asisst', ['1', '2', '3']));
  // require('./helpers/meeting').addKeywordsTosession('5a8d89b2f5aa1171cc7eb69d', ['issue', 1]);
  // require('./helpers/meeting').addTranscriptTosession('5a8d89b2f5aa1171cc7eb69d', 'Welcome to meet-assist !');
  // require('./helpers/meeting').addActionItem('New action 2', ['sid226']);


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
  // UI-APIs
  router.get('/meeting', meetingControlller.getAll);
  router.get('/meeting/:name', meetingControlller.get);
  router.post('/meeting/populate', meetingControlller.populate);
  router.put('/meeting', meetingControlller.update);
  router.get('/meeting/:name/actionitem/:username', meetingControlller.getActionItemForUser);

  router.get('/issue', issueController.getAll);
  router.get('/issue/:number', issueController.get);
  router.post('/issue', issueController.insert);
  router.put('/issue', issueController.update);

  // MICRO-APIs
  router.post('/meeting/session', meetingControlller.newSession);


  app.use('/api', router);
}

middleWare();
mountRoutes();

module.exports = app;
