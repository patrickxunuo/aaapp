// import emailjs, {init} from 'emailjs-com'
//
// init("user_Onrh0ZtrXCqhljdWu3iqJ")
//
// export const inviteToGroup = (params) => {
//   emailjs.send('service_zv4dlw3', 'template_wzgpv9z', params)
//     .then(function() {
//       console.log('SUCCESS!');
//     }, function(error) {
//       console.log('FAILED...', error);
//     });
// }

import firebase from "../../firebase";

const db = firebase.firestore()

export const queryGroupEvents = async (groupId) => {
  const record = []
  await db.collection('events').where('groupId','==',groupId).get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
      record.push({
        ...doc.data(),
        id: doc.id,
      })
    })
  })
  return record
}

export const queryGroup= async (groupId) => {
  let group
  await db.collection('groups').doc(groupId).get().then(snapshot=>{
    group = snapshot.data()
  })
  return group
}
