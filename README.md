# tic-tac-toe

# application installation steps

- download and install Node https://nodejs.org/en
- open terminal run: npm install -g react-cli
- npm run start


## Logic

-  Makes 100% sense to have your AI logic in front end. Your API shoud not have unnecessary functions which will take more time to process, send data back (GET, POST methods). You don't need to have such functions running on your API, otherwise you will spend a lot of money due to many request made to the API. Your API should only handle CRUD operations, front end should be respobsible for handling all functions needed to be performed.
- we try by all means to save our API server resource, therefore run only CRUD functions.