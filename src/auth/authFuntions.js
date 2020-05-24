const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { uploadFile } = require('../utils/driveFunctions')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts',
  'https://www.googleapis.com/auth/admin.reports.audit.readonly'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './src/auth/token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize (credentials, req, callback) {
    return new Promise((resolve, reject) => {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, async (err, token) => {
            if (err){
                const fileID = await getAccessToken(oAuth2Client, req, callback)
                return resolve(fileID)
            }
            oAuth2Client.setCredentials(JSON.parse(token));
            const fileID = await callback(oAuth2Client, req);
            resolve(fileID)
        });
    })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, req, callback) {
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
          });
          console.log('Authorize this app by visiting this url:', authUrl);
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, async(err, token) => {
              if (err){
                console.error('Error retrieving access token', err);
                return reject(err)
              }
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err){
                    console.error(err);
                    return reject(err)
                }
                console.log('Token stored to', TOKEN_PATH);
              });
            const fileID = await callback(oAuth2Client, req);
            resolve(fileID)
            })
          })
    })
}

const fileUploadToDrive = (req) => {
    return new Promise((resolve, reject) => {
        // Load client secrets from a local file.
        fs.readFile('./src/auth/credentials.json', async(err, content) => {
            if (err){
                return reject(`Error loading client secret file: ${err}`)
            }
            // Authorize a client with credentials, then call the Google Drive API.
            const fileID = await authorize(JSON.parse(content), req, uploadFile);
            resolve(fileID)
        });
    })
    
}

module.exports = {
    fileUploadToDrive
}