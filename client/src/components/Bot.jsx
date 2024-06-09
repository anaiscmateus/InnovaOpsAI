// Bot.jsx
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

function Bot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Optimus! How can I help you?",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]); // change name of bot from ChatGPT
  
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    try {
      const response = await fetch("/api/chat", {
        // Update the URL here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response

      setMessages([
        ...chatMessages,
        {
          message: data.message,
          sender: "ChatGPT",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="Bot py-10">
      <h2 className="text-center py-5 text-2xl font-semibold">
        OptimOps.ai Bot
      </h2>
      <div
        style={{ position: "relative", height: "500px" }}
        className="lg:px-24"
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Optimus is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleSend}
              role="textbox"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Bot;
