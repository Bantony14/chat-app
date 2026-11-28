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

function MobileChatWindow() {
  return (
    <section className="flex flex-col flex-1 min-w-0 h-full bg-[#FFF9EF]">
      {/* ================= CHAT HEADER ================= */}

      <header className="h-[76px] shrink-0 flex items-center justify-between px-4 md:px-6 bg-white border-b-[3px] border-black">
        {/* User Info */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <button
            type="button"
            aria-label="Back to chats"
            className="md:hidden w-9 h-9 shrink-0 flex items-center justify-center border-2 border-black rounded-lg hover:bg-[#C5F46A] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="relative shrink-0">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Olivia Smith"
              className="w-11 h-11 rounded-full border-2 border-black object-cover"
            />

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#C5F46A] border-2 border-black" />
          </div>

          <div className="min-w-0">
            <h2 className="font-black text-sm md:text-base truncate">
              Olivia Smith
            </h2>

            <p className="text-xs text-green-600 font-semibold">Online</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Voice call"
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg border-2 border-black bg-[#C5F46A] hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            <Phone size={18} />
          </button>

          <button
            type="button"
            aria-label="Video call"
            className="w-9 h-9 md:w-10 md:h-10 hidden sm:flex items-center justify-center rounded-lg border-2 border-black bg-[#B69AFF] hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            <Video size={18} />
          </button>

          <button
            type="button"
            aria-label="More options"
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg border-2 border-black hover:bg-[#FFF9EF] transition-colors"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* ================= MESSAGE AREA ================= */}

      <main className="flex-1 min-h-0 overflow-y-auto chat-scrollbar px-4 md:px-8 py-6">
        {/* Date Separator */}
        <div className="flex items-center justify-center mb-7">
          <span className="px-4 py-1.5 bg-white border-2 border-black rounded-full text-[10px] font-black tracking-wider">
            TODAY
          </span>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {/* Incoming Message */}
          <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="w-7 h-7 rounded-full border-2 border-black object-cover shrink-0"
            />

            <div>
              <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-[3px_3px_0px_#000]">
                <p className="text-sm font-medium leading-relaxed">
                  Hey! How are you doing today? 😊
                </p>
              </div>

              <p className="text-[10px] font-semibold text-gray-500 mt-2 ml-1">
                10:30 AM
              </p>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] md:max-w-[70%]">
              <div className="bg-[#C5F46A] border-2 border-black rounded-2xl rounded-br-sm px-4 py-3 shadow-[3px_3px_0px_#000]">
                <p className="text-sm font-semibold leading-relaxed">
                  Hey Olivia! I'm doing great. What about you?
                </p>
              </div>

              <div className="flex items-center justify-end gap-1 mt-2 mr-1">
                <span className="text-[10px] font-semibold text-gray-500">
                  10:32 AM
                </span>
                <CheckCheck size={14} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Incoming Message */}
          <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="w-7 h-7 rounded-full border-2 border-black object-cover shrink-0"
            />

            <div>
              <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-[3px_3px_0px_#000]">
                <p className="text-sm font-medium leading-relaxed">
                  I'm good too! Actually, I wanted to discuss something with
                  you.
                </p>
              </div>

              <p className="text-[10px] font-semibold text-gray-500 mt-2 ml-1">
                10:34 AM
              </p>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] md:max-w-[70%]">
              <div className="bg-[#C5F46A] border-2 border-black rounded-2xl rounded-br-sm px-4 py-3 shadow-[3px_3px_0px_#000]">
                <p className="text-sm font-semibold leading-relaxed">
                  Sure! Tell me, I'm listening.
                </p>
              </div>

              <div className="flex items-center justify-end gap-1 mt-2 mr-1">
                <span className="text-[10px] font-semibold text-gray-500">
                  10:35 AM
                </span>
                <CheckCheck size={14} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Incoming Message */}
          <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt=""
              className="w-7 h-7 rounded-full border-2 border-black object-cover shrink-0"
            />

            <div>
              <div className="bg-white border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-[3px_3px_0px_#000]">
                <p className="text-sm font-medium leading-relaxed">
                  That sounds like a great idea! Let's plan it together.
                </p>
              </div>

              <p className="text-[10px] font-semibold text-gray-500 mt-2 ml-1">
                10:36 AM
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MESSAGE COMPOSER ================= */}

      <footer className="shrink-0 bg-white border-t-[3px] border-black px-3 md:px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 md:gap-3">
          {/* Attachment */}
          <button
            type="button"
            aria-label="Attach file"
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border-2 border-black hover:bg-[#B69AFF] transition-colors"
          >
            <Paperclip size={19} />
          </button>

          {/* Message Input */}
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 bg-[#FFF9EF] border-2 border-black rounded-xl h-11">
            <input
              type="text"
              placeholder="Write a message..."
              className="w-full min-w-0 bg-transparent outline-none text-sm font-medium placeholder:text-gray-500"
            />

            <button
              type="button"
              aria-label="Emoji"
              className="shrink-0 text-gray-500 hover:text-black"
            >
              <Smile size={20} />
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            aria-label="Send message"
            className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#C5F46A] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <Send size={19} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </section>
  );
}

export default MobileChatWindow;
