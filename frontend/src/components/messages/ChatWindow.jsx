import { Send } from "lucide-react";

function ChatWindow({ conversation }) {
  return (
    <div className="chat-window-card">
      <div className="chat-header">
        <div className="chat-user">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="chat-user-avatar"
          />

          <div>
            <h3>{conversation.name}</h3>
            <p>{conversation.role}</p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={
              message.sender === "me"
                ? "chat-message-row my-message"
                : "chat-message-row buddy-message"
            }
          >
            <div className="chat-bubble">
              <p>{message.text}</p>
              <span>{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input type="text" placeholder="Type a message..." />
        <button type="button" className="send-button">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;