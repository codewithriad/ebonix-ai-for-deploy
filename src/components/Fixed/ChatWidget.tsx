import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! Ask me anything you want 😎" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: "🤖 This is a placeholder reply..." },
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-4 right-4 w-[95%] sm:w-[400px] bg-grayBackground text-foreground rounded-xl shadow-lg border border-grayBackground z-50 flex flex-col max-h-[90vh]">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-grayBackground shadow-md">
            <h2 className="text-lg font-semibold">Chat with Ebonix AI</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-grayBackground text-para"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center bg-grayBackground rounded-b-xl overflow-hidden px-2 py-2">
            {/* Attach */}
            <label
              htmlFor="file"
              className="cursor-pointer p-2 hover:bg-grayBackground/15 rounded"
            >
              <PaperClipIcon className="w-5 h-5 text-gray-400" />
              <input type="file" id="file" className="hidden" />
            </label>

            {/* Input */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none"
            />

            {/* Send */}
            <button
              onClick={sendMessage}
              className="bg-green-500 p-3 hover:bg-green-600 transition rounded-lg"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
