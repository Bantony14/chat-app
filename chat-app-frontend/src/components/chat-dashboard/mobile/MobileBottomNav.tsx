import { useState } from "react";
import { MessageCircle, Users, Settings } from "lucide-react";

type NavItem = "chats" | "friends" | "settings";

function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState<NavItem>("chats");

  const navItems = [
    {
      id: "chats" as NavItem,
      label: "Chats",
      icon: MessageCircle,
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
    <nav className="shrink-0 bg-[#FFF9EF] px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] border-t-2 border-black/10">
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 transition-all duration-150 active:scale-95 ${
                isActive
                  ? "bg-[#C5F46A] border-black shadow-[2px_2px_0px_#000] -translate-y-0.5"
                  : "bg-white border-transparent text-gray-500 hover:bg-[#FFF9EF] hover:text-black"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.8 : 2.2} />

              <span
                className={`text-xs ${
                  isActive ? "font-black text-black" : "font-semibold"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-black" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
