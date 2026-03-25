import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ConversationsList from "../../components/messages/ConversationsList";
import ChatWindow from "../../components/messages/ChatWindow";
import EmptyChatState from "../../components/messages/EmptyChatState";
import EmptyConversationsState from "../../components/messages/EmptyConversationsState";
import { studentConversations } from "../../constants/studentMessagesData";
import { buddyConversations } from "../../constants/buddyMessagesData";
import "../../styles/messages.css";

function MessagesPage({ userType = "student" }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const isBuddy = userType === "buddy";

  const conversations = isBuddy ? buddyConversations : studentConversations;

  const pageDescription = isBuddy
    ? "Stay connected with your buddies"
    : "Stay connected with your buddies";

  const emptyConversationTitle = isBuddy
    ? "No conversations yet"
    : "No conversations yet";

  const emptyConversationDescription = isBuddy
    ? "Connect with a buddy to start chatting"
    : "Connect with a buddy to start chatting";

  return (
    <DashboardLayout
      title="Messages"
      sidebarType={isBuddy ? "buddy" : "student"}
    >
      <section className="messages-page">
        <div className="messages-page-header">
          <h1>Messages</h1>
          <p>{pageDescription}</p>
        </div>

        <div className="messages-layout">
          {conversations.length > 0 ? (
            <ConversationsList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          ) : (
            <EmptyConversationsState
              title={emptyConversationTitle}
              description={emptyConversationDescription}
            />
          )}

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