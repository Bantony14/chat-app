import { useRef, useState } from "react";
import {
  UserRound,
  AtSign,
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
import { useToast } from "../context/ToastContext";
import StaticHeader from "../assets/components/header-navbar/StaticHeader";

import { sendOtp, sighUp, verifyOtp } from "../Api/authAxios";
import axios from "axios";
import FullScreenLoader from "../assets/components/FullScreenLoader";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

function Registration() {
  interface formData {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }
  const { setUser, loading } = useUser();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<formData>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [isOtpMode, setIsOtpMode] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  console.log(otp);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtpForEmailVerification = async () => {
    if (!formData.email) {
      showToast("Email is not valid", "error");
      return;
    }

    try {
      setIsEmailLoading(true);
      const response = await sendOtp(formData.email);
      showToast(response.data.message, "success");
      setIsOtpMode(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          error.response?.data?.message || "Something went wrong!",
          "error",
        );
      } else {
        showToast("Something went wrong!", "error");
      }
    } finally {
      setIsEmailLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    if (!otp) {
      return showToast(" Otp Is required", "error");
    }
    if (!otp && !formData.email) {
      return showToast("Otp And Email Is required", "error");
    }
    try {
      setIsOtpLoading(true);

      const response = await verifyOtp(formData.email, otp);

      if (response.data.success) {
        setIsEmailVerified(true);
        setIsOtpMode(false);
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    //  checking all field is required
    for (const key in formData) {
      if (!formData[key]) {
        showToast(`${key.toUpperCase()} is required`, "error");
        return;
      }
    }

    // Sending formdata to server
    try {
      setSubmitLoading(true);
      const response = await sighUp(formData);
      setUser(response?.data?.user);
      showToast(response?.data?.message, "success");
      console.log("end");
      // navigate("/chat-dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          error.response?.data?.message || "Something went wrong!",
          "error",
        );
      } else {
        showToast("Something went wrong!", "error");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-dvh w-full bg-[#FFF9EF] text-black overflow-x-hidden flex flex-col">
      {/* Header */}
      <StaticHeader />

      {/* Main */}
      <main className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto px-4 sm:px-6 md:px-12 py-3 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-center">
        {/* Left Section */}
        <section className="relative hidden lg:block scale-95 origin-center">
          <div className="absolute -top-8 left-16 text-lime-400">
            <Crown size={55} strokeWidth={2.5} />
          </div>

          <div className="absolute top-20 right-8 text-purple-500">
            <Sparkles size={40} />
          </div>

          <h2 className="text-6xl xl:text-8xl font-black leading-[0.95] tracking-tight">
            Join
            <br />
            The Fun!
          </h2>

          <div className="w-64 h-2 bg-black mt-4 -rotate-2 rounded-full" />

          <p className="text-xl xl:text-2xl font-semibold mt-6 max-w-md leading-relaxed">
            Create your account and start connecting with people.
          </p>

          {/* Illustration */}
          <div className="relative mt-5 max-w-lg">
            <div className="absolute top-0 right-10 bg-white border-[3px] border-black rounded-2xl p-3 shadow-[5px_5px_0px_#000] -rotate-6">
              <MessageSquare size={48} />

              <div className="flex gap-2 mt-2 justify-center">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="w-2 h-2 bg-black rounded-full" />
              </div>
            </div>

            <div className="relative bg-[#B69AFF] border-[3px] border-black rounded-[30px] p-5 mt-16 shadow-[8px_8px_0px_#000] max-w-[280px] rotate-2">
              <div className="text-6xl mb-2">👋</div>

              <h3 className="text-3xl font-black leading-tight">
                NEW
                <br />
                FRIENDS.
                <br />
                NEW VIBES.
              </h3>

              <div className="w-32 h-1.5 bg-black mt-3" />
            </div>

            <div className="absolute -bottom-5 right-0 bg-[#C5F46A] border-[3px] border-black rounded-full px-5 py-2 font-black -rotate-6 shadow-[4px_4px_0px_#000]">
              Say Hello!
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="relative w-full max-w-[600px] mx-auto min-h-0">
          <div className="absolute inset-0 bg-[#FF806B] border-[3px] border-black translate-x-2 translate-y-2 rounded-2xl" />

          <div className="relative bg-[#FFF9EF] border-[3px] border-black rounded-2xl p-5 sm:p-6 lg:p-6">
            {/* Title */}
            <div className="mb-4 lg:mb-5">
              <div className="inline-block bg-[#C5F46A] border-[3px] border-black px-6 py-1.5 shadow-[5px_5px_0px_#000] -rotate-2">
                <h2 className="text-3xl sm:text-4xl font-black">
                  Create Account
                </h2>
              </div>

              <p className="text-center text-base sm:text-lg font-medium mt-4">
                Let's get you started!
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">
              {/* Full Name */}
              <div className="relative">
                <UserRound
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  placeholder="Full Name"
                  autoComplete="name"
                  className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-4 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="relative">
                <AtSign
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  name="username"
                  minLength={3}
                  autoComplete="username"
                  className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-4 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Email And Otp verification*/}

              <div className="relative">
                {isOtpMode ? (
                  <>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      autoComplete="one-time-code"
                      maxLength={6}
                      className="w-full h-14 border-2 border-black rounded-xl bg-transparent px-4 pr-28 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                      type="button"
                      disabled={isOtpLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg font-bold border-2 border-black shadow-[3px_3px_0px_#000] transition-all duration-150 cursor-pointer hover:bg-zinc-800 hover:shadow-[1px_1px_0px_#000] active:shadow-none active:translate-y-[calc(-50%+2px)] disabled:opacity-70 disabled:cursor-not-allowed"
                      onClick={verifyOtpHandler}
                    >
                      {isOtpLoading ? (
                        <span className="flex gap-1 items-center">
                          {[0, 1, 2].map((ball) => (
                            <span
                              key={ball}
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: `${ball * 0.15}s` }}
                            />
                          ))}
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Mail
                      size={22}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      name="email"
                      autoComplete="email"
                      readOnly={isEmailVerified}
                      className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-28 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all read-only:opacity-70"
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      disabled={isEmailVerified || isEmailLoading}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-150 ${
                        isEmailVerified
                          ? "bg-green-400 text-black cursor-not-allowed"
                          : "bg-black text-white cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:bg-zinc-800 active:shadow-none active:translate-y-[calc(-50%+2px)]"
                      }`}
                      onClick={sendOtpForEmailVerification}
                    >
                      {isEmailVerified ? (
                        "Verified ✓"
                      ) : isEmailLoading ? (
                        <span className="flex gap-1 items-center">
                          {[0, 1, 2].map((ball) => (
                            <span
                              key={ball}
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: `${ball * 0.15}s` }}
                            />
                          ))}
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </>
                )}
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
                  name="password"
                  value={formData.password}
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-12 text-base sm:text-lg font-medium outline-none shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                  onChange={handleChange}
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

              {/* Register Button */}
              <button
                type="submit"
                disabled={submitLoading || !isEmailVerified}
                className="w-full h-14 bg-[#C5F46A] border-[3px] border-black rounded-xl text-xl sm:text-2xl font-black shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitLoading ? (
                  <>
                    Creating Account
                    <span className="flex gap-1">
                      {[0, 1, 2].map((ball) => (
                        <span
                          key={ball}
                          className="w-2 h-2 bg-black rounded-full animate-bounce"
                          style={{ animationDelay: `${ball * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={25} strokeWidth={3} />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-5 lg:mt-6 font-medium text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-black underline underline-offset-4 hover:text-purple-800"
              >
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Registration;
