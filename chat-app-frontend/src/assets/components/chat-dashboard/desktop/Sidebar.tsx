import { useState } from "react";
import {
  MessageCircle,
  Users,
  Settings,
  UserRound,
  Sparkles,
  ChevronRight,
} from "lucide-react";

type NavItem = "chats" | "friends" | "settings";

function Sidebar() {
  const [activeTab, setActiveTab] = useState<NavItem>("chats");

  // Fake profile data for UI preview
  const profile = {
    name: "Alex Morgan",
    username: "@alexmorgan",
    status: "Online",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  // Sidebar navigation items
  const navigation = [
    {
      id: "chats" as NavItem,
      label: "Chats",
      icon: MessageCircle,
      count: 4,
    },
    {
      id: "friends" as NavItem,
      label: "Friends",
      icon: Users,
    },
    {
      id: "settings" as NavItem,
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-[250px] h-dvh shrink-0 bg-[#FFF9EF] border-r-[3px] border-black flex flex-col p-5">
      {/* ================= LOGO ================= */}
      <div className="flex items-center gap-3 mb-12 px-1">
        <div className="bg-[#C5F46A] border-[3px] border-black rounded-xl p-2 shadow-[3px_3px_0px_#000]">
          <MessageCircle size={25} strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-black tracking-tight">Chatly</h1>

        <Sparkles size={19} className="text-purple-600" />
      </div>

      {/* ================= NAVIGATION ================= */}
      <div>
        <p className="text-xs font-black uppercase tracking-[2px] text-gray-500 mb-4 px-2">
          Menu
        </p>

        <nav className="space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-[2px] border-black transition-all ${
                  isActive
                    ? "bg-[#C5F46A] shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-transparent border-transparent hover:bg-white hover:border-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={21} strokeWidth={2.5} />

                  <span className="font-bold text-base">{item.label}</span>
                </div>

                {item.count && (
                  <span className="bg-[#FF806B] border-2 border-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">
                    {item.count}
                  </span>
                )}

                {isActive && !item.count && (
                  <ChevronRight size={18} strokeWidth={3} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= BOTTOM PROFILE ================= */}
      <div className="mt-auto pt-5 border-t-[2px] border-black">
        <p className="text-xs font-black uppercase tracking-[2px] text-gray-500 mb-4 px-2">
          My Account
        </p>

        <button
          type="button"
          className="w-full flex items-center gap-3 bg-white border-[2px] border-black rounded-xl p-3 shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all text-left"
        >
          {/* Profile Avatar */}
          <div className="relative shrink-0">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-11 h-11 rounded-full border-2 border-black object-cover"
            />

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#C5F46A] border-2 border-black rounded-full" />
          </div>

          {/* Profile Details */}
          <div className="min-w-0 flex-1">
            <h3 className="font-black text-sm truncate">{profile.name}</h3>

            <p className="text-xs text-gray-600 truncate">{profile.username}</p>
          </div>

          <UserRound size={18} strokeWidth={2.5} />
        </button>

        <p className="text-[11px] text-gray-500 font-medium text-center mt-4">
          Made for better conversations ✦
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
