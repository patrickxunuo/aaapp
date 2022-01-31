import firebase from "../../firebase";

const db = firebase.firestore()

export const queryGroupUsers = async (groupId) => {
  let group
  await db.collection('groups').doc(groupId).get().then(snapshot=>{
    group = snapshot.data()?.users
  })
  return group
}

export const addEvent = async (groupId, totalAmount, array) => {
  
}
