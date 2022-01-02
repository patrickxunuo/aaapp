import React from 'react';
import {Button, Space} from "antd";
import Title from "antd/es/typography/Title";
import firebase from '../../firebase'

const Home = () => {
  const signOut = () => {
    firebase.auth().signOut()
  }

  return(
    <Space>
      <Title>Home</Title>
      <Button onClick={signOut}>
        Sign Out
      </Button>
    </Space>
  )
}

export default Home
