function MobileHeader() {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b-[3px] border-black shrink-0 bg-[#FFF9EF]">
      <div className="flex items-center gap-3">
        <div className="bg-[#C5F46A] border-[3px] border-black rounded-xl p-2 shadow-[3px_3px_0px_#000]">
          <span className="text-xl">💬</span>
        </div>

        <h1 className="text-2xl font-black">Chatly</h1>
      </div>

      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="w-11 h-11 rounded-full border-[2px] border-black object-cover"
      />
    </header>
  );
}

export default MobileHeader;
