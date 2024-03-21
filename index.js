const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt =  require('bcrypt');
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('startup-public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create authentication token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'User already exists' });
    } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({
        id: user._id,
    });
    }
});

// Gets authentication token for the user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Incorrect Password' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
        const token = req?.cookies.token;
        res.send({ email: user.email, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unkown' });
});

// secureApiRouter verifies endpoint credentials
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Incorrect Password' });
    }
});

// Creates a new survey
secureApiRouter.post('/survey', async (req, res) => {
    const survey = { ...req.body };
    await DB.postSurvey(survey);
    // const surveyData = await DB.getSurveyData();
    res.send(survey);
});

// Old version of creating a survey
// apiRouter.post('/survey', (req, res) => {
//     updateSurveyData(req.body);
//     res.send(surveyData);
// });

// Returns published survey
secureApiRouter.get('/publishedSurvey', async (req, res) => {
    const survey = await DB.getMostRecentSurvey();
    res.send(survey);
})

// Old version of getting a survey
// apiRouter.get('/publishedSurvey', (req, res) => {
//     res.send(surveyData);
// });

// Returns surveys with results
secureApiRouter.get('/results', async (_req, res) => {
    const surveys = await DB.getAllSurveys();
    res.send(surveys);
})
// apiRouter.get('/results', (_req, res) => {
//     res.send(surveyData);
//   });

// apiRouter.post('/results', (req, res) => {
//     editSurveyData(req.body);
//     console.log(surveyData);
//     res.send(surveyData);
// });

// let surveyData = [];
// function updateSurveyData(newSurvey) {
//     surveyData.push(newSurvey);
// };

// function editSurveyData(surveys) {
//     surveyData.pop();
//     surveyData = surveys;
// }


// Default error handler (grabbed from simon)
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'startup-public'});
});

// sets cookie
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
