# QuizDeck-Client

[![Build Status](https://travis-ci.org/bcroden/QuizDeck-Client.svg?branch=master)](https://travis-ci.org/bcroden/QuizDeck-Client)
[![Coverage Status](https://coveralls.io/repos/github/bcroden/QuizDeck-Client/badge.svg?branch=master)](https://coveralls.io/github/bcroden/QuizDeck-Client?branch=master)

The client for QuizDeck

https://quizdeck.herokuapp.com/

# Set Up Your Dev Environment

- This site runs on [nodejs](https://nodejs.org). You will need to download and install it before proceding.
  - [Travis](https://travis-ci.org/bcroden/QuizDeck-Client) uses nodejs 4.x to test against, consider using the latest 4.x version.

- Check that node and npm are properly installed.
  - open a command line and run: `$ node --version` and `$ npm --version`. You should see version numbers listed.

- Clone the repository
  - run:

    ```
    $ git clone https://github.com/bcroden/QuizDeck-Client.git
    $ cd QuizDeck-Client
    $ npm install
    ```
  
  - this should download and install all dependencies for our server, build system and front end, then build our project from source.

# During Development

Open a command line and type `$ npm run gulp`

This will start our build tool, compile our project, run unit tests and watch for file changes. When you save any file it is watching, it will re-run all relevent tasks and live-update your browser if things have changed.
