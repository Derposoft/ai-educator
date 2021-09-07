var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var path = require('path')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
var TOKEN_PATH = TOKEN_DIR + 'youtube-secret-token.json'
var CLIENT_SECRET_FILE = '../secrets/youtube_secret.json'
var auth;

// initialize the mongodb connection
const mongosecret = require('../secrets/mongodb_secret.json')
const uri = mongosecret.URI
const { MongoClient } = require('mongodb')
const mongodb = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const userdb = mongodb.db(mongosecret.db).collection(mongosecret.users)
const coursedb = mongodb.db(mongosecret.db).collection(mongosecret.courses)
async function initializeMongoDB() {
  await mongodb.connect()
  //db = mongodb.db(mongosecret.db).collection(mongosecret.collection)
  return true
}
function stopMongoDB() {
  mongodb.close()
  return true
}

// initialize the authorization for the API
function initializeYoutubeApi() {
  // Load client secrets from a local file.
  fs.readFile(path.resolve(__dirname, CLIENT_SECRET_FILE), function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content));//, callback);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {//}, callback) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  auth = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken();//, callback);
    } else {
      auth.credentials = JSON.parse(token);
      google.options({auth: auth});
      //callback(auth);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken() {//}, callback) {
  var authUrl = auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  /*var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.credentials = token;
      storeToken(token);
      //callback(oauth2Client);
      google.options({auth: oauth2Client})
    });
  });*/
}

function authYouTubeApi(code) {
  console.log(code)
  auth.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    auth.credentials = token;
    storeToken(token);
    //callback(oauth2Client);
    google.options({auth: auth})
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

module.exports = {
  initializeMongoDB: initializeMongoDB,
  stopMongoDB: stopMongoDB,
  mongodb: mongodb,
  userdb: userdb,
  coursedb: coursedb,
  initializeYoutubeApi: initializeYoutubeApi,
  authYouTubeApi: authYouTubeApi
}
