import { useEffect, useState } from "react";
import api from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = "user1"; // depois vamos trocar por login real

  useEffect(() => {
    api.get(`/chat/${user}`).then(res => setMessages(res.data));
  }, []);

  const send = async () => {
    const msg = {
      from: user,
      to: "user2",
      text
    };

    await api.post("/chat", msg);
    setMessages([...messages, msg]);
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>

      <div style={{
        height: 300,
        overflow: "auto",
        border: "1px solid #ccc",
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.from}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={send}>Enviar</button>
    </div>
  );
}
