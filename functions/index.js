const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.sendNotificationToTopic = functions.firestore.document('messages/{uid}').onWrite(async (event) => {
//     //let docID = event.after.id;
//     let title = event.after.get('title');
//     let content = event.after.get('content');
//     var message = {
//         notification: {
//             title: title,
//             body: content,
//         },
//         topic: 'namelesscoder',
//     };

//     let response = await admin.messaging().send(message);
//     console.log(response);
// });


// exports.sendNotificationToFCMToken = functions.firestore.document('messages/{mUid}').onWrite(async (event) => {
//     const uid = event.after.get('uid');
//     const title = event.after.get('title');
//     const content = event.after.get('content');
//     let userDoc = await admin.firestore().doc(`FCM_tokens/${uid}`).get();
//     let fcmToken = userDoc.get('token'); 
//     console.log("token", fcmToken);

//     var message = {
//         notification: {
//             title: title,
//             body: content,
//         },
//         token: fcmToken,
//     }

//     let response = await admin.messaging().send(message);
//     console.log(response);
// });

exports.onCollectionUpdate = functions.firestore
  .document('messages/{documentId}')
  .onUpdate(async (change, context) => {
    // Get the updated document data
    const updatedData = change.after.data();

    // Perform the desired actions
    // For example, send a notification, update another document, etc.

    // Log the updated data for testing purposes
    console.log('Updated Data:', updatedData);
  });
