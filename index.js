const express = require('express)');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/results', (_req, res) => {
    res.send(results);
});

apiRouter.post('/result', (req, res) => {
    results = displayResults(req.body, results);
    res.send(results);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let results = [];
function updateResults(newResult, results) {
    //
}