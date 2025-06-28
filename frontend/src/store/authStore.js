
import { create } from "zustand";

import axios from "axios";
const baseURL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const useAuthStore = create((set)=>({
    user: null,
    isAuthenticated: false,
    error: null,
    isloading: false,
    ischeckingAuth: false,

signup: async (email, password, fullName, username) => {
  console.log("Sending to server:", { email, password, fullName, username });

  set({ isloading: true, error: null });

  try {
    const res = await axios.post(`${baseURL}/signup`, {
      email,
      password,
      name: fullName,  
      username
    });

    set({
      user: res.data.user,
      isAuthenticated: true,
      isloading: false,
      error: null
    });

  } catch (error) {
    console.error("Signup error:", error.response?.data?.message || error.message);
set({ error: error.response?.data?.message || "Signup failed", isloading: false });
throw new Error(error.response?.data?.message || "Signup failed"); // ✅ نرمي الخطأ هنا
  }
},
verifyEmailfunction : async(code)=>{
    set({isloading: true, error: null});
    try {
        const res = await axios.post(`${baseURL}/verify-email `, { code });
        set({
            user: res.data.user,
            isAuthenticated: true,
            isloading: false,
            error: null
        });
        return res.data;
    }
    catch (error) {
        set({
            error: error.response?.data?.message || "Email verification failed",
            isloading: false });
        throw new Error(error.response?.data?.message || "Email verification failed");

    }
},

checkAuthfront: async () => {

    set({ ischeckingAuth: true, error: null });
  try {
    const res = await axios.get(`${baseURL}/check-auth`);
    set({
      user: res.data.user,
      isAuthenticated: true,
      ischeckingAuth: false,
      error: null
    });
  } catch (error) {
    set({
      user: null,
      isAuthenticated: false,
      ischeckingAuth: false,
      error: error.response?.data?.message || "Authentication check failed"
    });
  }
},

login: async (email,password)=>{
    set({isloading: true, error: null});
    try{
        const res = await axios.post(`${baseURL}/login`, { email, password });
        set({
            user: res.data.user,
            isAuthenticated: true,
            isloading: false,
            error: false
        });
    }catch(error){
        set({
            error: error.response?.data?.message || "Login failed",     
            isloading: false
        });
        throw new Error(error.response?.data?.message || "Login failed");  
    }
}
,

logout: async () => {
    set({ isloading: true, error: null });
  try {
    await axios.post(`${baseURL}/logout`);  
    set({
      user: null,
      isAuthenticated: false,
        isloading: false,
        error: null
    });
  } catch (error) {
    set({
      error: error.response?.data?.message || "Logout failed",
      isloading: false
    });
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

}))