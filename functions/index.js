const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

function getProjects() {
    const ref = firebaseApp.database().ref().child('projects');
    return ref.once('value').then(snap => snap.val());
}

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    getProjects().then(projects => {
        console.log(projects);
        res.render('index', {projects});
    });
});

exports.app = functions.https.onRequest(app);