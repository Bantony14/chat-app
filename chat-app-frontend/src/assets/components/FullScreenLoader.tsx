import { MessageCircle } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F4E8] px-4">
      <div className="w-full max-w-sm rounded-2xl border-[3px] border-[#171717] bg-white p-8 text-center shadow-[8px_8px_0px_#171717]">
        {/* Logo */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border-[3px] border-[#171717] bg-[#C6F36B] shadow-[4px_4px_0px_#171717]">
          <MessageCircle size={32} strokeWidth={2.8} />
        </div>

        {/* Loader */}
        <div className="relative mx-auto mb-6 h-12 w-12">
          <div className="absolute inset-0 rounded-full border-[5px] border-[#E5E5E5]" />
          <div className="absolute inset-0 animate-spin rounded-full border-[5px] border-transparent border-t-[#171717] border-r-[#C6F36B]" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-black tracking-tight text-[#171717]">
          HOLD ON!
        </h2>

        <p className="mt-2 text-sm font-semibold text-[#555]">
          Getting your chats ready...
        </p>

        {/* Bottom label */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-[#171717] bg-[#C6F36B] px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#171717]" />
          <span className="text-xs font-black tracking-wider text-[#171717]">
            CONNECTING
          </span>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
