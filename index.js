// const { MongoClient } = require('mongodb')
// const config = require('./dbConfig.json');

// const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
// const client = new MongoClient(url);

// (async function testConnection() {
//     await client.connect();
//     await db.command({ ping: 1 });
//   })().catch((ex) => {
//     console.log(`Unable to connect to database with ${url} because ${ex.message}`);
//     process.exit(1);
//   });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt =  require('bcrypt');
const DB = require('/database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('startup-public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Creates a new survey
apiRouter.post('/survey', (req, res) => {
    updateSurveyData(req.body);
    res.send(surveyData);
});

// Returns published survey
apiRouter.get('/publishedSurvey', (req, res) => {
    res.send(surveyData);
});

// Returns surveys with results
apiRouter.get('/results', (_req, res) => {
    res.send(surveyData);
  });

apiRouter.post('/results', (req, res) => {
    editSurveyData(req.body);
    console.log(surveyData);
    res.send(surveyData);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'startup-public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let surveyData = [];
function updateSurveyData(newSurvey) {
    surveyData.push(newSurvey);
};

function editSurveyData(surveys) {
    surveyData.pop();
    surveyData = surveys;
}