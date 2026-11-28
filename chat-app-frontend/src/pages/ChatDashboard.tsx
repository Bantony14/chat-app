import ChatWindow from "../assets/components/chat-dashboard/desktop/ChatWindow";
import ChatList from "../assets/components/chat-dashboard/desktop/ChatList";
import Sidebar from "../assets/components/chat-dashboard/desktop/Sidebar";
import MobileChatList from "../assets/components/chat-dashboard/mobile/MobileChatList";
import MobileBottomNav from "../assets/components/chat-dashboard/mobile/MobileBottomNav";
import MobileChatWindow from "../assets/components/chat-dashboard/mobile/MobileChatWindow";
import MobileHeader from "../assets/components/chat-dashboard/mobile/MobileHeader";
import { useState } from "react";

function ChatDashboard() {
  const [chatList, setChatList] = useState("");
  return (
    <main className="h-dvh w-full bg-[#FFF9EF] overflow-hidden">
      {/* ================= DESKTOP + TABLET DASHBOARD ================= */}
      <div className="hidden md:flex h-full w-full">
        {/* Desktop Sidebar */}
        <Sidebar />
        <ChatList />
        <ChatWindow />
      </div>

      {/* ================= MOBILE DASHBOARD ================= */}
      <div className="flex md:hidden flex-col h-full w-full bg-[#FFF9EF]">
        {chatList ? (
          <>
            <MobileHeader />

            <main className="flex-1 min-h-0 flex flex-col">
              <MobileChatList />
            </main>
          </>
        ) : (
          <main className="flex-1 min-h-0 flex flex-col">
            <MobileChatWindow />
          </main>
        )}
      </div>
    </main>
  );
}

export default ChatDashboard;
