import React from "react";
import NoProfile from "../assets/img/no-profile.png"
import ToraHack from "../assets/img/torahack.png"

const Chat =  (props) => {
  const isQuestion = (props.type === 'question')
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__revers';
  return (
    <div className={classes}>
      {isQuestion ? (
        <img src={ToraHack} className="mr-4 w-12 h-12 rounded-full"/>
      ) : (
        <img src={NoProfile} className="mr-4 w-12 h-12 rounded-full"/>
      )}
      <div className="p-chat__bubble">{props.text}</div>
    </div>
  )
}

export default Chat