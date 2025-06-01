const { google } = require('googleapis');
const readline = require('readline');

const oAuth2Client = new google.auth.OAuth2(
  '1002301782784-rrfbccv1llib3rajuvko9b553nlcnqou.apps.googleusercontent.com',
  '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',
  'https://quincy-backend.onrender.com/oauth2callback'
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/drive.file']
});

console.log('\n🔗 Visit this link in your browser to authorize Quincy:');
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n📥 Paste the code from Google here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('❌ Error retrieving token:', err.message);
    console.log('\n✅ USE THIS REFRESH TOKEN IN RENDER:\n');
    console.log(token.refresh_token);
  });
});
