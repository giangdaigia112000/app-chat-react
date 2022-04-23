import { useState, useEffect, useRef } from "react";
import { database, ref, push, onValue } from "../firebase";
function Chat({ name }) {
  const [inpMessage, setIptMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const input = useRef();
  useEffect(() => {
    onValue(ref(database, "message"), (data) => {
      let getMsg = [];
      data.forEach((d) => {
        getMsg.push(d.val());
      });
      setMessages(getMsg);
    });
  }, []);
  const handleSendMessage = () => {
    push(ref(database, "message"), {
      name: name,
      message: inpMessage,
    });
    setIptMessage("");
    input.focus();
  };
  return (
    <div>
      <h1>xin chào {name}</h1>
      <ul>
        {messages.map((msg, index) => {
          return (
            <li key={index}>
              <span>{msg.name}: </span>
              <span>{msg.message}</span>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={inpMessage}
        onChange={(e) => {
          setIptMessage(e.target.value);
        }}
        ref={input}
      />
      <button onClick={handleSendMessage}>Gửi</button>
    </div>
  );
}

export default Chat;
