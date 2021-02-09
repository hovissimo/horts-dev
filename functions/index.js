const functions = require('firebase-functions');
const admin = require('firebase-admin');

try {
  admin.initializeApp();
} catch (error) {
  if (error.errorInfo.code === 'app/duplicate-app') {
    // pass, this happens when we use `mocha --watch`
  } else {
    throw error
  }
}

exports.addNewUsersToDatabase = require('./addNewUsersToDatabase')({admin, functions})
