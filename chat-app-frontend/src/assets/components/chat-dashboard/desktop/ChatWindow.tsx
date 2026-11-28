import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  ArrowLeft,
  CheckCheck,
} from "lucide-react";

// ================= TYPES =================

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "friend";
};

// ================= FAKE USER DATA =================

const friend = {
  name: "Olivia Smith",
  username: "@oliviasmith",
  avatar: "https://i.pravatar.cc/150?img=47",
  status: "Online",
};

// ================= FAKE MESSAGES =================

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hey! How are you doing?",
    time: "10:30 AM",
    sender: "friend",
  },
  {
    id: 2,
    text: "I'm doing great! What about you?",
    time: "10:32 AM",
    sender: "me",
  },
  {
    id: 3,
    text: "Pretty good. Are you free this weekend?",
    time: "10:34 AM",
    sender: "friend",
  },
  {
    id: 4,
    text: "Yes! What's the plan?",
    time: "10:35 AM",
    sender: "me",
  },
  {
    id: 5,
    text: "I was thinking we could go somewhere and hang out.",
    time: "10:36 AM",
    sender: "friend",
  },
  {
    id: 6,
    text: "That sounds like a great idea! 😄",
    time: "10:38 AM",
    sender: "me",
  },
];

// ================= CHAT WINDOW =================

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message (UI demo only)
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage: Message = {
      id: Date.now(),
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <section className="flex-1 min-w-0 h-full bg-[#FFF9EF] flex flex-col">
      {/* ================= CHAT HEADER ================= */}

      <header className="h-[76px] shrink-0 px-4 md:px-6 flex items-center justify-between border-b-[3px] border-black bg-white">
        {/* Friend Details */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <button
            type="button"
            aria-label="Back to chats"
            className="md:hidden shrink-0 p-2 hover:bg-[#FFF9EF] rounded-lg"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>

          <div className="relative shrink-0">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-11 h-11 rounded-full border-2 border-black object-cover"
            />

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#C5F46A] border-2 border-black rounded-full" />
          </div>

          <div className="min-w-0">
            <h2 className="font-black text-base md:text-lg truncate">
              {friend.name}
            </h2>

            <p className="text-xs font-semibold text-green-700">
              {friend.status}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            aria-label="Voice call"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#C5F46A] transition-colors"
          >
            <Phone size={20} />
          </button>

          <button
            type="button"
            aria-label="Video call"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#B69AFF] transition-colors"
          >
            <Video size={21} />
          </button>

          <button
            type="button"
            aria-label="More options"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={21} />
          </button>
        </div>
      </header>

      {/* ================= MESSAGE AREA ================= */}

      <div className="flex-1 min-h-0 overflow-y-auto chat-scrollbar px-4 md:px-8 py-6">
        {/* Date Separator */}
        <div className="flex items-center justify-center mb-7">
          <span className="bg-white border-2 border-black rounded-full px-4 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
            TODAY
          </span>
        </div>

        {/* Messages */}
        <div className="max-w-4xl mx-auto space-y-5">
          {messages.map((msg) => {
            const isMine = msg.sender === "me";

            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${
                    isMine ? "items-end" : "items-start"
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 border-2 border-black rounded-2xl text-sm sm:text-base font-medium leading-relaxed break-words ${
                      isMine
                        ? "bg-[#C5F46A] rounded-br-sm shadow-[3px_3px_0px_#000]"
                        : "bg-white rounded-bl-sm shadow-[3px_3px_0px_#000]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Message Time */}
                  <div className="flex items-center gap-1 mt-2 px-1">
                    <span className="text-[11px] font-semibold text-gray-500">
                      {msg.time}
                    </span>

                    {isMine && (
                      <CheckCheck size={15} className="text-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ================= MESSAGE INPUT ================= */}

      <footer className="shrink-0 border-t-[3px] border-black bg-white px-3 md:px-6 py-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3"
        >
          {/* Attachment - UI only */}
          <div
            className="hidden sm:flex w-11 h-11 shrink-0 items-center justify-center rounded-xl hover:bg-gray-100"
            aria-label="Attachment"
          >
            <Paperclip size={21} />
          </div>

          {/* Message Input */}
          <div className="flex-1 min-w-0 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="w-full h-12 sm:h-14 bg-[#FFF9EF] border-2 border-black rounded-xl px-4 pr-11 text-sm sm:text-base font-medium outline-none shadow-[3px_3px_0px_#000] focus:shadow-[1px_1px_0px_#000] transition-all"
            />

            <Smile
              size={21}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim()}
            aria-label="Send message"
            className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center bg-[#C5F46A] border-[2px] border-black rounded-xl shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={21} strokeWidth={2.5} />
          </button>
        </form>
      </footer>
    </section>
  );
}

export default ChatWindow;
