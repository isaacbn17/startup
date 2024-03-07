const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4500;

app.use(express.json());

app.use(express.static('startup-public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/survey', (req, res) => {
    updateSurveyData(JSON.parse(req.body));
    res.send(JSON.stringify(surveyData));
});

apiRouter.get('/results', (_req, res) => {
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