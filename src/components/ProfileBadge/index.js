import React, {useEffect, useState} from 'react';
import {Avatar, Badge} from "antd";
import {useDispatch, useSelector} from "react-redux";
import firebase from '../../firebase'
import {showNoti} from "../../redux/actions";
import './styles.css'

const ProfileBadge = () => {
  const userInfo = useSelector(s=>s.userReducer)
  const db = firebase.firestore()
  const [unread, setUnread] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userInfo && Object.keys(userInfo).length!==0){
      db.collection('notifications').where('to','==',userInfo.uid).where('read','==',false).get().then(snapshot=>{
        setUnread(snapshot.docs?.length)
      })
    }
  },[userInfo])

  return(
    <div className="profile-wrap">
      <Badge count={unread}>
        <Avatar src={userInfo?.photoURL} size="large" onClick={()=>showNoti()(dispatch)}/>
      </Badge>
    </div>
  )


}

export default ProfileBadge
