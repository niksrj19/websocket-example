import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. Create a local WebSocket instance instead of relying on the async state
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      // 2. Use functional state updates to avoid stale closures
      setMessages((prev) => [...prev, "Connected to server"]);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = () => {
      setMessages((prev) => [...prev, "WebSocket error"]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send("Hello from React!");
    }
  };

  return (
    <>
      <h2>WebSocket Demo</h2>
      <button onClick={sendMessage}>
        Send Message
      </button>

      <ul>
        {/* 3. Use index or unique values since messages are strings */}
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
}

export default App;