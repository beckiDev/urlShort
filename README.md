Using full application:
Use Json server --a simple Node.js server that allows you to create fully working REST APIs

Install on you environment in terms to be able to run full Rest API
1. get an app "git@github.com:beckiDev/urlshertmer.git"
2. cd client 'npm install'
3. cd .. (to upper directory and run 'npm install' as well
4. at global directory run 'npm install -g json-server'
5. run 'npm run dev'

I have created a simple app that with a json-server that can function as real RESTApi that app is the best for mocking full app.
- for Short Url I used 'https://www.npmjs.com/package/short-id' package, this is very convenient. I used the default configuration :
ids.configure({
    length: 6,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});
But it is isselly could be changed.
As React.js I ussed a new hooks implementation
and decided to not use redux because there is not that much actions.
