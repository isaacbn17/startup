const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('startup-public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/survey', (req, res) => {
    updateSurveyData(req.body);
    res.send(surveyData);
});

apiRouter.get('/publishedSurvey', (req, res) => {
    res.send(surveyData);
});

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