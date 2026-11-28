import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  CheckCheck,
  MessageCircle,
} from "lucide-react";

// ================= TYPES =================

export type ChatUser = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  message: string;
  time: string;
  unread: number;
  online: boolean;
  isRead: boolean;
};

// ================= FAKE CHAT DATA =================

export const chatUsers: ChatUser[] = [
  {
    id: 1,
    name: "Olivia Smith",
    username: "@oliviasmith",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: "That sounds like a great idea!",
    time: "2:45 PM",
    unread: 3,
    online: true,
    isRead: false,
  },
  {
    id: 2,
    name: "Noah Williams",
    username: "@noahw",
    avatar: "https://i.pravatar.cc/150?img=12",
    message: "Are we meeting tomorrow?",
    time: "1:30 PM",
    unread: 0,
    online: true,
    isRead: true,
  },
  {
    id: 3,
    name: "Emma Johnson",
    username: "@emmaj",
    avatar: "https://i.pravatar.cc/150?img=44",
    message: "Sent you the photos 📸",
    time: "12:15 PM",
    unread: 2,
    online: false,
    isRead: false,
  },
  {
    id: 4,
    name: "Liam Brown",
    username: "@liambrown",
    avatar: "https://i.pravatar.cc/150?img=13",
    message: "Haha that's funny 😂",
    time: "11:20 AM",
    unread: 0,
    online: false,
    isRead: true,
  },
  {
    id: 5,
    name: "Sophia Davis",
    username: "@sophiad",
    avatar: "https://i.pravatar.cc/150?img=45",
    message: "Thank you so much!",
    time: "Yesterday",
    unread: 0,
    online: true,
    isRead: true,
  },
  {
    id: 6,
    name: "James Wilson",
    username: "@jamesw",
    avatar: "https://i.pravatar.cc/150?img=14",
    message: "Let's catch up soon.",
    time: "Yesterday",
    unread: 1,
    online: false,
    isRead: false,
  },
  {
    id: 1,
    name: "Olivia Smith",
    username: "@oliviasmith",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: "That sounds like a great idea!",
    time: "2:45 PM",
    unread: 3,
    online: true,
    isRead: false,
  },
  {
    id: 1,
    name: "Olivia Smith",
    username: "@oliviasmith",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: "That sounds like a great idea!",
    time: "2:45 PM",
    unread: 3,
    online: true,
    isRead: false,
  },
];

// ================= CHAT LIST COMPONENT =================

function ChatList() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  const [selectedChat, setSelectedChat] = useState<number>(0);

  // Search and filter conversations
  const filteredChats = useMemo(() => {
    return chatUsers.filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(search.toLowerCase()) ||
        chat.username.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = activeFilter === "all" || chat.unread > 0;

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <section className="w-full md:w-[320px] lg:w-[350px] h-full shrink-0 bg-[#FFF9EF] border-r-[3px] border-black flex flex-col">
      {/* ================= HEADER ================= */}

      <div className="px-5 pt-6 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Messages</h2>

            <p className="text-sm text-gray-600 font-medium mt-1">
              Your conversations
            </p>
          </div>

          {/* New Message Button */}
          <button
            type="button"
            aria-label="New message"
            className="w-11 h-11 bg-[#C5F46A] border-[2px] border-black rounded-xl shadow-[3px_3px_0px_#000] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] transition-all"
          >
            <Plus size={23} strokeWidth={3} />
          </button>
        </div>

        {/* ================= SEARCH ================= */}

        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-12 bg-white border-2 border-black rounded-xl pl-11 pr-4 font-medium text-sm outline-none shadow-[3px_3px_0px_#000] focus:shadow-[1px_1px_0px_#000] transition-all"
          />
        </div>

        {/* ================= FILTERS ================= */}

        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full border-2 border-black text-sm font-black transition-all ${
              activeFilter === "all"
                ? "bg-[#C5F46A] shadow-[3px_3px_0px_#000]"
                : "bg-white"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("unread")}
            className={`px-5 py-2 rounded-full border-2 border-black text-sm font-black transition-all ${
              activeFilter === "unread"
                ? "bg-[#B69AFF] shadow-[3px_3px_0px_#000]"
                : "bg-white"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* ================= CONVERSATION LIST ================= */}

      <div className="flex-1 min-h-0 overflow-y-auto chat-scrollbar px-3 pb-4">
        <div className="flex items-center justify-between px-2 py-3">
          <p className="text-xs font-black uppercase tracking-[2px] text-gray-500">
            Recent Chats
          </p>

          <button
            type="button"
            aria-label="More chat options"
            className="text-gray-500 hover:text-black"
          >
            <MoreHorizontal size={22} />
          </button>
        </div>

        {filteredChats.length > 0 ? (
          <div className="space-y-2">
            {filteredChats.map((chat) => {
              const isActive = selectedChat === chat.id;

              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    isActive
                      ? "bg-[#C5F46A] border-black shadow-[4px_4px_0px_#000]"
                      : "border-transparent hover:bg-white hover:border-black"
                  }`}
                >
                  {/* ================= AVATAR ================= */}

                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full border-2 border-black object-cover"
                    />

                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#C5F46A] border-2 border-black rounded-full" />
                    )}
                  </div>

                  {/* ================= CHAT DETAILS ================= */}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-black text-sm truncate">
                        {chat.name}
                      </h3>

                      <span className="text-[10px] font-bold text-gray-600 shrink-0">
                        {chat.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-xs text-gray-700 truncate flex items-center gap-1">
                        {chat.isRead && (
                          <CheckCheck
                            size={15}
                            className="shrink-0 text-blue-600"
                          />
                        )}

                        {chat.message}
                      </p>

                      {chat.unread > 0 && (
                        <span className="w-5 h-5 shrink-0 bg-[#FF806B] border border-black rounded-full flex items-center justify-center text-[10px] font-black">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY SEARCH STATE ================= */

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle size={35} className="text-gray-400 mb-3" />

            <p className="font-black">No conversations found</p>

            <p className="text-xs text-gray-500 mt-1">Try another search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ChatList;
