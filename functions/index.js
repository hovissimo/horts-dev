const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



// // Take the text parameter passed to this HTTP endpoint and insert it into 
// // Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection('messages').add({original: original});
//   // Send back a message that we've succesfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });
exports.addMessage = functions.https.onRequest((req, res) => {
  const original = req.query.text;
  const timestamp = Date.now()
  const snapshot = database.ref('/messages').push({original})
  res.json({result: `Message with ID: ${snapshot.ref} added.`});
});

exports.addMessageRedir = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const snapshot = await database.ref('/messages').push({original})
  res.redirect(303, snapshot.ref.toString())
})

// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Cloud Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
      
//       const uppercase = original.toUpperCase();
      
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Cloud Firestore.
//       // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    const original = snapshot.val()
    console.log('Uppercasing', context.params.pushId, original)
    const uppercase = original.toUpperCase()
    // Required to return a Promise when performing asynchronous actions like writing to the
    // database
    return snapshot.ref.parent.child('uppercase').set(uppercase)
  })
