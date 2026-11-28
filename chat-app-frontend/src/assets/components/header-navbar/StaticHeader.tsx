import { MessageCircle } from "lucide-react";

function StaticHeader() {
  return (
    <>
      <header className="flex items-center justify-between px-5 md:px-12 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#C5F46A] border-[3px] border-black rounded-xl p-1.5 shadow-[3px_3px_0px_#000]">
            <MessageCircle size={25} strokeWidth={3} />
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Chatly
          </h1>
        </div>

        <span className="hidden md:block font-medium">
          Chat. Connect. Belong.
        </span>
      </header>
    </>
  );
}

export default StaticHeader;
