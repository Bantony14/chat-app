import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true,
});

export const sighUp = (data: any) => {
  return API.post("/user-create", data);
};
export const sendOtp = (email: string) => {
  return API.post("/send-otp", { email });
};

export const verifyOtp = (email: string, otp: string) => {
  return API.post("/verify-otp", { email, otp });
};
