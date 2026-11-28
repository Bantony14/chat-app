import ChatWindow from "../components/chat-dashboard/desktop/ChatWindow";
import ChatList from "../components/chat-dashboard/desktop/ChatList";
import Sidebar from "../components/chat-dashboard/desktop/Sidebar";
import MobileChatList from "../components/chat-dashboard/mobile/MobileChatList";
import MobileBottomNav from "../components/chat-dashboard/mobile/MobileBottomNav";
import MobileChatWindow from "../components/chat-dashboard/mobile/MobileChatWindow";
import MobileHeader from "../components/chat-dashboard/mobile/MobileHeader";
import { useState } from "react";
import { useUser } from "../context/UserContext";

function ChatDashboard() {
  const { user } = useUser();
  const [chatList, setChatList] = useState("");
  return (
    <main className="h-dvh w-full bg-[#FFF9EF] overflow-hidden">
      {/* ================= DESKTOP + TABLET DASHBOARD ================= */}
      <div className="hidden md:flex h-full w-full">
        {/* Desktop Sidebar */}
        <Sidebar userDetails={user} />
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
