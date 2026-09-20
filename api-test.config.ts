const processENV = process.env.Test_ENV
const env = processENV || 'dev'
console.log(`Running tests in ${env} environment`)
const config = {
    apiUrl : "https://conduit-api.bondaracademy.com/api",
    email : "pwapiuser@test.com",
    password : "Welcome",

}

if (env === 'qa'){
    config.apiUrl = "https://conduit-api-qa.bondaracademy.com/api"
    config.email = "qa-user@test.com"
    config.password = "QAPassword"
}   

if (env === 'staging'){
    config.apiUrl = "https://conduit-api-staging.bondaracademy.com/api"
    config.email = "staging-user@test.com"
    config.password = "StagingPassword"
}
export{ config }