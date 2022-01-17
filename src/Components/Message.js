import React,{useContext,useEffect,useState} from 'react'
import SideBar from "./SideBar";
import Chat from "./Chat";
import "./Message.css";
import {database} from "../firebase"
import { AuthContext } from '../Context/AuthContext'

function Message() {
const {user,logout} = useContext(AuthContext)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return ()=> {unsub()}
    },[user])
  return (
    <div className="message">
      <SideBar userData={userData}/>
      <Chat userData={userData}/>
      {console.log({userData})}
    </div>
  );
}

export default Message;
