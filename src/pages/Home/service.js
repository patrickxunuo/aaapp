import firebase from "../../firebase";

const db = firebase.firestore()

export const queryStatus = async (uid) => {
  const status = []
  await db.collection('status').where('user','==',uid).get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
      status.push({
        ...doc.data(),
        id: doc.id,
      })
    })
  })
  return status
}
