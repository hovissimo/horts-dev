// See https://firebase.google.com/docs/functions/unit-testing

const expect = require('chai').expect
const admin = require('firebase-admin')
const projectConfig = {
  projectId: 'horts-d8d2a',
  databaseURL: 'https://horts-d8d2a.firebaseio.com',
}

const test = require('firebase-functions-test')(
  projectConfig,
  'horts-d8d2a-139c8e88c797_service_credentials.json',
)


// mock functions.config() config values here, must happen before requiring functions

describe("Cloud Functions", () => {
  let myFunctions;

  before(() => {
    myFunctions = require('../index')
  });

  after(() => {
    test.cleanup()
    admin.database().ref('messages').remove()
  });
  
});
const myFunctions = require('../index.js')


// Example from above

// invokes makeUppercase:
//   both positional arguments are optional, but will be mapped to the positional arguments of
//   the tested function.  The second positional argument here will be used to overwrite parts of
//   the automatically generated second positional argument passed to the tested function.
//
//   For making test snapshot data see:https://firebase.google.com/docs/reference/functions/test/test.database#.exampleDataSnapshot
//   test.exampleDataSnapshot() makes a snapshot with pre-populated data
//   test.exampleDataSnapshotChange() makes an example Change snapshot with pre-populated data
//   test.example.makeDataSnapshot(val, refPath) makes a snapshot
//
// > const wrappedMakeUppercase = test.wrap(myFunctions.makeUppercase)
// > wrappedMakeUppercase(
//     test.exampleDataSnapshot(),
//     {
//       auth: { uid: 'jckSW20' },
//       authType: 'USER',
//       eventId: 'abc',
//       params: { pushId: '234234' },
//       timestamp: '2018-03-23T17:17:17.177Z',
//     }
//   )

describe("makeUppercase", () => {
  const wrapped = test.wrap(myFunctions.makeUppercase)
  it("writes the uppered snapshot value to ref.parent.uppercase", () => {
    const snapshot = test.database.makeDataSnapshot('fooBar', '/messages/12345/original')

    return wrapped(snapshot).then(() => {
      return admin.database().ref('/messages/12345/uppercase').once('value').then((snap) => {
        expect(snap.val()).to.equal('FOOBAR')
      }).catch(e => {console.error(e); throw e})
    })
  });
});
