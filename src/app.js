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
const projectController = require('./controllers/project');
const queryController = require('./controllers/query');
const sentenceController = require('./controllers/sentence');

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log('MongoDB connection established ' + mongoUrl);
  // console.log(require('./helpers/meeting').addSession('day1', 'storage.drive.com', 'Welcome to meet-asisst', ['1', '2', '3']));
  // require('./helpers/meeting').addKeywordsTosession('day1', '5a8fafd73c31758908d65873', ['issue', 1]);
  // require('./helpers/meeting').addTranscriptTosession('day1','5a8d89b2f5aa1171cc7eb69d', 'Welcome to meet-assist !');
  // require('./helpers/meeting').addActionItem('day1','New action 1', ['subhodi']);
  // require('./helpers/meeting').addActionItem('day1','New action 2', ['sid226']);
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
}

mountRoutes = () => {
  // UI-APIs
  router.get('/project', projectController.getAll);
  router.get('/project/:name', projectController.get);

  router.get('/meeting', meetingControlller.getAll);
  router.get('/meeting/:name', meetingControlller.get);
  router.post('/meeting/populate', meetingControlller.populate);
  router.put('/meeting/summary', meetingControlller.summary);
  router.delete('/meeting/:name', meetingControlller.remove);
  router.post('/meeting/:name', meetingControlller.remove);
  router.put('/meeting/:name/dialog', meetingControlller.insertDailog);

  router.get('/meeting/:name/actionitems/:username', queryController.getActionItemsForUser);
  router.get('/meeting/:name/issues/:username', queryController.getIssuesForUser);

  router.get('/issue', issueController.getAll);
  router.get('/issue/:number', issueController.get);
  router.post('/issue', issueController.insert);
  router.put('/issue', issueController.update);

  router.get('/sentence', sentenceController.getAll);
  router.get('/sentence/:name', sentenceController.get);

  app.use('/api', router);
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.toString());
  });
}

middleWare();
mountRoutes();

module.exports = app;
