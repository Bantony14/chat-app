import { useState, type FormEvent } from "react";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import StaticHeader from "../assets/components/header-navbar/StaticHeader";

function ForgotPassword() {
  // UI states only (no API integration)
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-dvh w-full bg-[#FFF9EF] text-black flex flex-col overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <StaticHeader />
      {/* ================= MAIN SECTION ================= */}
      <main className="flex-1 flex items-center justify-center px-4 py-3 lg:py-1">
        {/* ================= FORM CARD ================= */}
        <section className="relative w-full max-w-[520px]">
          {/* Card Shadow */}
          <div className="absolute inset-0 bg-[#FF806B] border-[3px] border-black rounded-2xl translate-x-2 translate-y-2" />

          {/* Card Content */}
          <div className="relative bg-[#FFF9EF] border-[3px] border-black rounded-2xl p-5 sm:p-8 lg:p-5">
            {/* ================= TITLE ================= */}
            <div className="text-center mb-7 lg:mb-3">
              <div className="inline-flex items-center justify-center bg-[#B69AFF] border-[3px] border-black rounded-2xl p-3 shadow-[4px_4px_0px_#000] mb-5 lg:mb-2">
                <KeyRound size={30} strokeWidth={2.5} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black">
                Forgot Password?
              </h2>

              <p className="mt-3 text-sm sm:text-base font-medium text-gray-700">
                Let's get you back into your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ================= EMAIL SECTION ================= */}
              <div>
                <label className="block font-bold mb-2">Email Address</label>

                <div className="relative">
                  <Mail
                    size={21}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={emailVerified}
                    className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-28 text-base font-medium outline-none shadow-[4px_4px_0px_#000] disabled:bg-gray-100"
                  />

                  {/* Email Verify Button */}
                  {!emailVerified ? (
                    <button
                      type="button"
                      onClick={() => setEmailVerified(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C5F46A] border-2 border-black rounded-lg px-3 py-2 text-sm font-black hover:bg-lime-300"
                    >
                      Verify
                    </button>
                  ) : (
                    <CheckCircle2
                      size={23}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                    />
                  )}
                </div>

                {/* Email Verified Status */}
                {emailVerified && (
                  <p className="text-sm font-bold text-green-700 mt-2 flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    Email verified
                  </p>
                )}
              </div>

              {/* ================= OTP SECTION ================= */}
              {emailVerified && !otpVerified && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block font-bold mb-2">
                    Email Verification Code
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={21}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter OTP"
                      maxLength={6}
                      required
                      className="w-full h-14 border-2 border-black rounded-xl bg-transparent pl-12 pr-32 text-base font-medium tracking-widest outline-none shadow-[4px_4px_0px_#000]"
                    />

                    {/* OTP Verify Button */}
                    <button
                      type="button"
                      onClick={() => setOtpVerified(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#B69AFF] border-2 border-black rounded-lg px-3 py-2 text-sm font-black hover:bg-purple-300"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {/* ================= PASSWORD SECTION ================= */}
              {otpVerified && (
                <div className="space-y-4 lg:space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* New Password */}
                  <div>
                    <label className="block font-bold mb-2">New Password</label>

                    <div className="relative">
                      <LockKeyhole
                        size={21}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        required
                        minLength={8}
                        className="w-full h-14  lg:h-11 border-2 border-black rounded-xl bg-transparent pl-12 pr-12 text-base font-medium outline-none shadow-[4px_4px_0px_#000]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff size={21} />
                        ) : (
                          <Eye size={21} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block font-bold mb-2">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={21}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                      />

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        required
                        minLength={8}
                        className="w-full h-14 lg:h-11 border-2 border-black rounded-xl bg-transparent pl-12 pr-12 text-base font-medium outline-none shadow-[4px_4px_0px_#000]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        aria-label="Toggle confirm password visibility"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={21} />
                        ) : (
                          <Eye size={21} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Reset Password Button */}
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#C5F46A] border-[3px] border-black rounded-xl text-xl font-black shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-3 mt-5"
                  >
                    Reset Password
                    <ArrowRight size={23} strokeWidth={3} />
                  </button>
                </div>
              )}
            </form>

            {/* ================= BACK TO LOGIN ================= */}
            <div className="text-center mt-5 font-medium text-sm sm:text-base">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-purple-600 font-black underline underline-offset-4"
              >
                Back to Login
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
