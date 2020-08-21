exports.addNewUsersToDatabase = ({ database, functions }) => {
  // userRecord is a https://firebase.google.com/docs/reference/admin/java/reference/com/google/firebase/auth/UserRecord?hl=en
  functions.auth.user().onCreate(async userRecord => {
    const user = {
      displayName: userRecord.displayName,
      email:       userRecord.email,
      id:          userRecord.uid,
      isAnonymous: userRecord.isAnonymous,
    }
    return await database.ref(`/users/${uid}`).set(user)
  })
}
