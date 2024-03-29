const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const surveyCollection = db.collection('survey');


(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

function postSurvey(survey) {
    surveyCollection.insertOne(survey);
}

async function getMostRecentSurvey() {
    const cursor = surveyCollection.find().sort({ _id: -1 }).limit(1);
    const survey = await cursor.toArray();
    return survey[0];
}

async function getAllSurveys() {
    const cursor = surveyCollection.find().sort({ _id: -1});
    const surveys = await cursor.toArray();
    return surveys;
}

async function updateResultsCount(surveyID, survey) {
    const filter = { _id: surveyID }
    const updateOperation = {
        $set: survey
    };
    const result = await surveyCollection.updateOne(filter, updateOperation);
    return result; 
}   

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    postSurvey,
    getMostRecentSurvey,
    getAllSurveys,
    updateResultsCount
};