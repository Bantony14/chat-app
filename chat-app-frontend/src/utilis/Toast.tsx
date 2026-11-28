import { useEffect } from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const styles = {
  success: {
    icon: Check,
    bg: "bg-[#C6F36B]",
    title: "NICE ONE!",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[#FF8B70]",
    title: "OOPS!",
  },
  info: {
    icon: Info,
    bg: "bg-[#A994F5]",
    title: "FYI!",
  },
};

const Toast = ({
  message,
  type = "error",
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const { icon: Icon, bg, title } = styles[type];

  return (
    <div className="fixed top-5 right-5 z-[9999] animate-toast-in">
      <div
        className={`${bg} relative w-[320px] border-2 border-[#171717]
        rounded-xl p-4 text-[#171717]
        shadow-[5px_5px_0px_#171717]`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#171717] text-[#C6F36B] p-2 rounded-lg">
            <Icon size={21} />
          </div>

          <div className="flex-1">
            <h4 className="font-black text-sm tracking-wide">{title}</h4>
            <p className="text-sm font-semibold mt-1">{message}</p>
          </div>

          <button onClick={onClose}>
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="h-1 bg-[#171717]/20 mt-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#171717] animate-toast-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
