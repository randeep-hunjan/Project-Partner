import { IconButton } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Msg from "./Msg";
// import { selectUser } from "./features/userSlice";
import { selectChatName, selectChatId } from "../features/chatSlice";
// import db from "./firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";
import {database} from '../firebase';
import { AuthContext } from '../Context/AuthContext'

function Chat() {
  // const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const {user,logout} = useContext(AuthContext)
    const [userData,setUserData] = useState('')
    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return ()=> {unsub()}
    },[user])

  useEffect(() => {
    if (chatId) {
      database.chats
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      database.chats.doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: userData.userId,
        photo: userData.profileUrl,
        email: userData.email,
        dispayName: userData.fullname,
      });
      setInput("");
    }
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <h4>
          To: <span className="chat_name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chat_messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Msg key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      <div className="chat_input">
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Message"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat_mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
