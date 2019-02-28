var ClientOAuth2 = require('client-oauth2')
var sendAuth2 = (emailAddress, name)=> {
  //console.log('sendAuth2')
var githubAuth = new ClientOAuth2({
  console.log('githubAuth')
  clientId: '2a030831-e8d7-4090-9696-e8a335e85ef0',
  clientSecret: 'ACXa69WrS3@iZn_yW=6=6W[ruaIgMQvHK22X4vMFKRY',
  accessTokenUri: 'https://login.microsoftonline.com/common/oauth2/authorize',
  authorizationUri: 'https://login.microsoftonline.com/common/oauth2/authorize?resource=https://adc-cg-poc.crm4.dynamics.com/',
  redirect_uri: 'http://localhost/callback',
  scopes: ['notifications', 'gist'],
  rejectUnauthorized: false
  
})

var token = githubAuth.createToken('access token', 'optional refresh token', 'optional token type', {
   data: 'raw user data'
  
 })
console.log(token);
}
module.exports = {
sendAuth2
};
