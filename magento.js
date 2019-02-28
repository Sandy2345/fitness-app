

var ClientOAuth2 = require('client-oauth2')
var sendAuth2 = (emailAddress, name)=> {
var githubAuth = new ClientOAuth2({
  clientId: '5ffe4a99-49d6-47a5-857a-1df7ce25f92a',
  //clientSecret: '123',
  accessTokenUri: 'https://login.microsoftonline.com/common/oauth2/authorize',
  authorizationUri: 'https://login.microsoftonline.com/common/oauth2/authorize?resource={https://adc-cg-poc.crm4.dynamics.com/'
  //redirectUri: 'http://localhost',
 // scopes: ['notifications', 'gist'],
  //rejectUnauthorized: false
  
})



var token = githubAuth.createToken('access token', 'optional refresh token', 'optional token type', {
   data: 'raw user data'
  
 })
console.log(token);
}
module.exports = {
sendAuth2
};
