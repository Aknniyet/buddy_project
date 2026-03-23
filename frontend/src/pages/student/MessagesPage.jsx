import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ConversationsList from "../../components/messages/ConversationsList";
import ChatWindow from "../../components/messages/ChatWindow";
import EmptyChatState from "../../components/messages/EmptyChatState";
import { conversations } from "../../constants/messagesData";
import "../../styles/messages.css";

function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <DashboardLayout title="Messages">
      <section className="messages-page">
        <div className="messages-page-header">
          <h1>Messages</h1>
          <p>Stay connected with your buddies</p>
        </div>

        <div className="messages-layout">
          <ConversationsList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />

          {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} />
          ) : (
            <EmptyChatState />
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default MessagesPage;