import { useState } from "react";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Crown,
  MessageSquare,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import StaticHeader from "../assets/components/header-navbar/StaticHeader";
import { Link } from "react-router-dom";

function Login() {
  const { user, setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-dvh w-full bg-[#FFF9EF] text-black overflow-hidden flex flex-col">
      {/* Header */}
      <StaticHeader />

      {/* Main Content */}
      <main className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-12 py-3 md:py-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 items-center">
        {/* Left Section */}
        <section className="relative hidden lg:block">
          <div className="absolute -top-8 left-16 text-lime-400">
            <Crown size={55} strokeWidth={2.5} />
          </div>

          <div className="absolute top-20 right-8 text-purple-500">
            <Sparkles size={40} />
          </div>

          <h2 className="text-6xl xl:text-8xl font-black leading-[0.95] tracking-tight">
            Welcome
            <br />
            Back!
          </h2>

          <div className="w-64 h-2 bg-black mt-4 -rotate-2 rounded-full" />

          <p className="text-xl xl:text-2xl font-semibold mt-6 max-w-md leading-relaxed">
            Login to continue your conversations journey.
          </p>

          {/* Illustration */}
          <div className="relative mt-6 max-w-lg">
            <div className="absolute top-0 right-10 bg-white border-[3px] border-black rounded-2xl p-3 shadow-[5px_5px_0px_#000] -rotate-6">
              <MessageSquare size={48} />

              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="w-2 h-2 bg-black rounded-full" />
              </div>
            </div>

            <div className="relative bg-[#C5F46A] border-[3px] border-black rounded-[30px] p-6 mt-16 shadow-[8px_8px_0px_#000] max-w-[300px] -rotate-2">
              <div className="text-6xl mb-3">😎</div>

              <h3 className="text-3xl font-black leading-tight">
                GOOD
                <br />
                VIBES ONLY.
              </h3>

              <div className="w-32 h-1.5 bg-black mt-3" />
            </div>

            <div className="absolute -bottom-5 right-0 bg-[#B69AFF] border-[3px] border-black rounded-full px-5 py-2 font-black rotate-6 shadow-[4px_4px_0px_#000]">
              Let's Talk!
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="relative w-full max-w-[600px] mx-auto min-h-0">
          <div className="absolute inset-0 bg-[#FF806B] border-[3px] border-black translate-x-2 translate-y-2 rounded-2xl" />

          <div className="relative bg-[#FFF9EF] border-[3px] border-black rounded-2xl p-5 sm:p-7 lg:p-8">
            {/* Title */}
            <div className="mb-5 lg:mb-7">
              <div className="inline-block bg-[#C5F46A] border-[3px] border-black px-7 py-2 shadow-[5px_5px_0px_#000] -rotate-2">
                <h2 className="text-3xl sm:text-4xl font-black">Login</h2>
              </div>

              <p className="text-center text-base sm:text-lg font-medium mt-5">
                Enter your details to get started
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 lg:space-y-5">
              {/* Email */}
              <div className="relative">
                <Mail
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  autoComplete="email"
                  className="w-full h-14 sm:h-16 border-2 border-black rounded-xl bg-transparent pl-12 pr-4 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <LockKeyhole
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full h-14 sm:h-16 border-2 border-black rounded-xl bg-transparent pl-12 pr-12 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* Remember & Forgot */}
              <div className="flex flex-wrap justify-between items-center gap-3 text-sm sm:text-base">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 accent-[#A9E64C] cursor-pointer"
                  />
                  Remember me
                </label>

                <a
                  href="/forgot-password"
                  className="text-purple-600 font-bold underline underline-offset-4 hover:text-purple-800"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-14 sm:h-16 bg-[#C5F46A] border-[3px] border-black rounded-xl text-xl sm:text-2xl font-black shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all flex items-center justify-center gap-4"
              >
                Login
                <ArrowRight size={25} strokeWidth={3} />
              </button>
            </form>

            {/* Signup */}
            <div className="text-center mt-6 lg:mt-8 font-medium text-sm sm:text-base">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 font-black underline underline-offset-4 hover:text-purple-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
