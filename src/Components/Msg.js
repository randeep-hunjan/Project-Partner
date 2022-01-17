import { Avatar } from "@material-ui/core";
// import React,{useContext,useEffect,useState} from 'react'
import React, { forwardRef,useContext,useEffect,useState} from "react";
// import { selectUser } from "./features/userSlice";
import "./Msg.css";
import {database} from '../firebase';
import { AuthContext } from '../Context/AuthContext'
// import { useSelector } from "react-redux";

const Msg = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    // const user = useSelector(selectUser);
    const {user,logout} = useContext(AuthContext)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
        const unsub = database.users.doc(userData.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return ()=> {unsub()}
    },[user])
    return (
      <div
        ref={ref}
        className={`msg ${user.email === email && "message_sender"}`}
      >
        <Avatar className="message_photo" src={photo} />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);
export default Msg;
