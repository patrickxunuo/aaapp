import React, {useState} from "react";
import "./styles.css";
import { motion} from "framer-motion";
import {useLocation, useNavigate} from "react-router";
import {BottomNavigation, BottomNavigationAction, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';
import firebase from "../../firebase";
import {signOut as userSignOut} from "../../redux/actions";
import {useDispatch} from "react-redux";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const pathVariants = {
  initial: {
    opacity: 0,
    pathLength: 0,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    }
  },
  exit: {
    opacity: 0,
    pathLength: 0,
  }
}

// const Footer = () => {
//   const [page, setPage] = useState("home");
//   const navigate = useNavigate();
//
//   return (
//     <div className="footer">
//       <div className="footer-wave-container">
//         <motion.div
//           layout
//           className={
//             page === 'home' ? "footer-wave home" : 'footer-wave group'
//           }
//           style={
//             page === "home"
//               ? {
//                 left: 60,
//               }
//               : {
//                 left: 260,
//               }
//           }
//         >
//           <motion.div
//             className={
//               page === 'home' ?
//                 "footer-wave-top home"
//                 : 'footer-wave-top group'
//             }>
//             <motion.svg width={30} height={30}>
//               {
//                 page === 'home' &&
//                 <motion.path
//                   fill="none"
//                   variants={pathVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   d="M 28.395 15.15 L 16.803 3.564 l -0.777 -0.777 a 0.945 0.945 90 0 0 -1.332 0 L 2.325 15.15 a 1.917 1.917 90 0 0 -0.564 1.38 c 0.012 1.056 0.891 1.899 1.947 1.899 h 1.275 V 28.2 h 20.754 V 18.429 h 1.302 c 0.513 0 0.996 -0.201 1.359 -0.564 a 1.908 1.908 90 0 0 0.561 -1.359 c 0 -0.51 -0.201 -0.993 -0.564 -1.356 z M 17.04 26.04 H 13.68 V 19.92 h 3.36 v 6.12 z m 6.537 -9.771 V 26.04 H 18.96 V 19.2 c 0 -0.663 -0.537 -1.2 -1.2 -1.2 H 12.96 c -0.663 0 -1.2 0.537 -1.2 1.2 v 6.84 H 7.143 V 16.269 h -2.88 l 11.1 -11.091 l 0.693 0.693 L 26.46 16.269 h -2.883 z"
//                 />
//               }
//               {
//                 page === 'group' &&
//                   <motion.path
//                     fill="none"
//                     variants={pathVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     d="M 24.726 20.997 a 9.0465 9.0465 90 0 0 -2.592 -1.812 C 23.493 18.084 24.36 16.404 24.36 14.52 c 0 -3.324 -2.772 -6.051 -6.096 -6 c -3.273 0.051 -5.91 2.718 -5.91 6 c 0 1.884 0.87 3.564 2.226 4.665 a 9.0285 9.0285 90 0 0 -2.592 1.812 C 10.35 22.638 9.42 24.804 9.36 27.114 a 0.24 0.24 90 0 0 0.24 0.246 h 1.68 c 0.129 0 0.237 -0.102 0.24 -0.231 c 0.057 -1.74 0.762 -3.369 2.001 -4.605 A 6.7986 6.7986 90 0 1 18.36 20.52 c 1.827 0 3.546 0.711 4.839 2.004 C 24.435 23.76 25.14 25.389 25.2 27.129 c 0.003 0.129 0.111 0.231 0.24 0.231 h 1.68 a 0.24 0.24 90 0 0 0.24 -0.246 c -0.06 -2.31 -0.99 -4.476 -2.634 -6.117 z M 18.36 18.36 c -1.026 0 -1.992 -0.399 -2.715 -1.125 a 3.8058 3.8058 90 0 1 -1.125 -2.754 c 0.009 -0.984 0.402 -1.935 1.089 -2.64 c 0.72 -0.738 1.683 -1.149 2.712 -1.161 c 1.017 -0.009 2.004 0.387 2.73 1.098 c 0.744 0.729 1.152 1.704 1.152 2.742 c 0 1.026 -0.399 1.989 -1.125 2.715 A 3.819 3.819 90 0 1 18.36 18.36 z M 10.845 15.312 c -0.027 -0.261 -0.042 -0.525 -0.042 -0.792 c 0 -0.477 0.045 -0.942 0.129 -1.395 c 0.021 -0.108 -0.036 -0.219 -0.135 -0.264 c -0.408 -0.183 -0.783 -0.435 -1.107 -0.753 a 3.8262 3.8262 90 0 1 -1.161 -2.862 c 0.027 -0.963 0.414 -1.878 1.089 -2.568 c 0.741 -0.759 1.737 -1.173 2.796 -1.161 c 0.957 0.009 1.881 0.378 2.58 1.032 c 0.237 0.222 0.441 0.468 0.612 0.732 c 0.06 0.093 0.177 0.132 0.279 0.096 c 0.528 -0.183 1.086 -0.312 1.659 -0.372 c 0.168 -0.018 0.264 -0.198 0.189 -0.348 c -0.975 -1.929 -2.967 -3.261 -5.271 -3.297 c -3.327 -0.051 -6.099 2.676 -6.099 5.997 c 0 1.884 0.867 3.564 2.226 4.665 c -0.954 0.441 -1.833 1.05 -2.595 1.812 c -1.644 1.641 -2.574 3.807 -2.634 6.12 a 0.24 0.24 90 0 0 0.24 0.246 h 1.683 c 0.129 0 0.237 -0.102 0.24 -0.231 c 0.057 -1.74 0.762 -3.369 2.001 -4.605 c 0.882 -0.882 1.962 -1.494 3.141 -1.791 c 0.117 -0.03 0.195 -0.141 0.18 -0.261 z"
//                   />
//               }
//             </motion.svg>
//           </motion.div>
//           <motion.div className={
//             page === 'home' ?
//               "footer-wave-bot home"
//               : 'footer-wave-bot group'
//           }
//           >
//           </motion.div>
//         </motion.div>
//       </div>
//       <div className="footer-bottom">
//         <div className="footer-btn" onClick={() => {
//           setPage("home")
//           navigate('/')
//         }} />
//         <div className="footer-btn" onClick={() => {
//           setPage("group")
//           navigate('groups')
//         }}/>
//       </div>
//     </div>
//   );
// };


const Footer = () => {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const navigate = useNavigate();


  const signOut = () => {
    firebase.auth().signOut()
    userSignOut()(dispatch)
  }

  const toHome = () => navigate('/')

  const actions =pathname.includes('groups')? [
    { icon: <LogoutIcon />, name: 'Sign out', onClick: signOut },
    { icon: <PriceCheckIcon />, name: 'Add payment' },
    { icon: <AddTaskIcon />, name: 'Add record' },
    {icon: <HomeIcon/>, name: 'Home', onClick: toHome}
  ]: [
    { icon: <LogoutIcon />, name: 'Sign out', onClick: signOut },
    { icon: <GroupAddIcon />, name: 'Add group' },
    { icon: <PriceCheckIcon />, name: 'Add payment' },
    { icon: <AddTaskIcon />, name: 'Add record'}
  ];

  return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={action.onClick}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
  );
}

export default Footer;
