import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./SidebarChat.css";
import { setChat } from "../features/chatSlice";
// import database from "./firebase";
import * as timeago from "timeago.js";
import { database } from "../firebase";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    database.chats
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className="sidebarChat"
    >
      <div className="sidebar-chat-image">
        {chatName?.substring(0, 1).toUpperCase()}
      </div>
      <div className="sidebarChat_info">
        <h3>{chatName}</h3>
        <p style={{ display: "flex", alignItems: "center" }}>
          {chatInfo[0]?.dispayName && (
            <>
              <b className="ellipsis">{chatInfo[0]?.dispayName}</b>:
            </>
          )}
          <span className="ellipsis">{chatInfo[0]?.message}</span>
        </p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
