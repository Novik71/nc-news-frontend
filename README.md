# NC News React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Follow these instructions to get the app up and running on your local machine.

## Prerequisites
For the program to run you will need to have the lastest version of Node.js installed on your computer.

Node installation instructions for Mac: https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew

Node installation instructions for Ubuntu: 
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

It is recommended to also install the latest version of [VS Code](https://code.visualstudio.com) and VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

## Installation and Setup
Below is a list of the Node.js modules used in the development of this project, and the minimum versions required:

* React / React-Dom (version 16.5.2)
* React-Router-Dom (version 4.3.1)
* React-Scripts (version 2.0.3)
* Axios (version 0.18.0)
* Cors (version 2.8.4)
* Moment (version 2.22.2)

To install all the modules in one go, go to your root directory and run the following command in your terminal install them locally.

```http
$ npm install
```
$ npm install will download all the dependencies listed in the package.json file, alternatively each module can be installed individually using the command:
```http
$ npm install <node_module> 
```

## Available Node Scripts

In the project directory, you can run:
```https
$ npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```https
$ npm test
```

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

```https
$ npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Heroku (https://www.heroku.com/)

You can deploy a live version of the app using the [Heroku Buildpack for Create React App](https://github.com/mars/create-react-app-buildpack).<br>
You can find instructions in [Deploying React with Zero Configuration](https://blog.heroku.com/deploying-react-with-zero-configuration).

## Production Version

A live heroku-hosted version of the app is viewable at https://herokuapp.com
