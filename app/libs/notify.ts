import toast from "react-hot-toast";

export default {
  error: (message: string) =>
    toast(message, {
      icon: "🚨",
      className: "text-sm text-gray-400",
    }),
};
