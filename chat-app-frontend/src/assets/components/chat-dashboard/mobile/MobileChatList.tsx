import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  CheckCheck,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react";

import { chatUsers, type ChatUser } from "../desktop/ChatList";

type MobileChatListProps = {
  onSelectChat: (chatId: number) => void;
};

function MobileChatList({ onSelectChat }: MobileChatListProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

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
    <section className="flex flex-col flex-1 min-h-0 w-full bg-[#FFF9EF]">
      {/* HEADER */}
      <div className="px-5 pt-5 pb-4 shrink-0">
        {/* SEARCH */}
        <div className="relative">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-12 bg-white border-2 border-black rounded-xl pl-11 pr-4 text-sm font-medium outline-none shadow-[3px_3px_0px_#000] focus:shadow-[1px_1px_0px_#000] transition-all"
          />
        </div>

        {/* FILTERS */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2 rounded-full border-2 border-black text-sm font-black ${
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
              className={`px-5 py-2 rounded-full border-2 border-black text-sm font-black ${
                activeFilter === "unread"
                  ? "bg-[#B69AFF] shadow-[3px_3px_0px_#000]"
                  : "bg-white"
              }`}
            >
              Unread
            </button>
          </div>

          <SlidersHorizontal size={20} />
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scrollbar px-4 pb-5">
        <div className="flex items-center justify-between px-1 py-3">
          <p className="text-xs font-black uppercase tracking-[2px] text-gray-500">
            Recent Chats
          </p>

          <span className="text-xs font-bold text-gray-500">
            {filteredChats.length} conversations
          </span>
        </div>

        {filteredChats.length > 0 ? (
          <div className="space-y-3">
            {filteredChats.map((chat: ChatUser) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat(chat.id)}
                className="w-full flex items-center gap-3 p-3 bg-white border-2 border-black rounded-xl text-left shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {/* AVATAR */}
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

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-sm truncate">{chat.name}</h3>

                    <span className="text-[10px] font-bold text-gray-500 shrink-0">
                      {chat.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="flex items-center gap-1 text-xs text-gray-600 truncate">
                      {chat.isRead && (
                        <CheckCheck
                          size={15}
                          className="shrink-0 text-blue-600"
                        />
                      )}
                      <span className="truncate">{chat.message}</span>
                    </p>

                    {chat.unread > 0 && (
                      <span className="w-5 h-5 shrink-0 bg-[#FF806B] border border-black rounded-full flex items-center justify-center text-[10px] font-black">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <MessageCircle size={36} className="text-gray-400 mb-3" />
            <p className="font-black">No conversations found</p>
            <p className="text-xs text-gray-500 mt-1">Try another search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MobileChatList;
