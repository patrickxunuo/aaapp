import firebase from "../../firebase";

const db = firebase.firestore()

export const queryNotifications = async (uid) => {
  let notifications = []
  await db.collection('notifications').where('to','==',uid).get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
      notifications.push({
       ...doc.data(),
        id: doc.id,
      })
    })
  })
  return notifications
}

export const readNotifications =  async (id) => {
  return db.collection('notifications').doc(id).update({
    read: true,
  })
}
