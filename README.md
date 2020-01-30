RUN APPLICATION
Use Json server --a simple Node.js server that allows you to create fully working REST APIs

Install on you environment in terms to be able to run full Rest API
1. get an app "git@github.com:beckiDev/urlshertmer.git"
2. install all dependencies 'npm run get_all_depp'
3. at global directory run 'npm install -g json-server'
4. run 'npm run dev'

I have created a simple app that with a json-server that can function as real RESTApi that app is the best for mocking full app.
- for Short Url I used 'https://www.npmjs.com/package/short-id' package, this is very convenient. I used the default configuration :
ids.configure({
    length: 8,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});
But it is isselly could be changed.
As React.js I ussed a new hooks implementation
and decided to not use redux because there is not that much actions.

WHY:
* App not using any 3rd party state managment libs like Redux or MobX 
  (not many states to manage, using react hooks for state managment)
* App has not match css styling yet one of the best mockig REST API apps



TODO:
- Front-End:
  * Add nice Css Styling
  * Add function checking if expired and render proper message
  * Add Valid-url- URI validation functions
  * Add check to DB for id to prevent colission
  * Add better error hendeling
  

- Back-End
  * Add Server real server app
  * Move URL Shortnerlogic from Front-End to Back-End
  * Add mongoDB: (easy to scale)
        Data Capacity Model: 
        Long URL(customers url) - 2048 chars(2kb)
        Short URL(app) - id token is 8 chars (if app domain will be like: https://short_us.com) => 12 + 8 chars/bytes
        Created at 7 bytes
        Expired at 7 chars
  * Add check against db that shortUrlid is not exist in db

- Initial Security
  * Add ModSecurity to server
  * Save cookies on users browser
  * Prevent more than 10 request from same origin in period of 60 secconds
  * Prevent request from browsers without coockies