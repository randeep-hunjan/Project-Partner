import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutLinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
// import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
// import db, { auth } from "./firebase";
import {database} from '../firebase';
import { useHistory } from 'react-router-dom';
import chatlogo from "../Assets/chatlogo.png"
import { Logout } from "@mui/icons-material";

function SideBar({userData}) {
  // const user = useSelector(selectUser);
  const [chats, setChats] = useState([]); // hook -> re-rendet component whenever value of the variable changes
  const history = useHistory();
  // var imageName = require('../Assets/chatlogo.png')

  useEffect(() => {
    database.chats.onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const handleBack = () => {
    history.push('/')
}

  const addChat = () => {
    const chatName = prompt("Please enter a chat name");
    if (chatName) {
      database.chats.add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          //onClick={() => auth.signOut()}
          onClick={handleBack}
          src={userData?.profileUrl}
          className="sidebar_avatar"
        /> 

        {/* <div className="sidebar_input">
          <SearchIcon />
          <input placeholder="Search" />
        </div> */}
        <div className="sidebar_input"><img src={chatlogo} alt="" width="90px" height="30px" /></div>
        <IconButton
          onClick={addChat}
          variant="outlined"
          className="sidebar_inputButton"
        >
          <RateReviewOutLinedIcon />
        </IconButton>
      </div>
      <div className="sidebar_chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
