import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { storeToken, removeToken } from "../lib/token";

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
}

interface LogInPayload {
  email: string;
  password: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  logIn: (payload: LogInPayload) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      const err = error as AxiosError;
      console.error("checkAuth error:", err.message);
      set({ authUser: null });
      await removeToken(); 
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  signUp: async ({ fullName, email, password }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", {
        fullName,
        email,
        password,
      });

      const { token, user } = res.data.data;
      await storeToken(token);
      set({ authUser: user });
      console.log("Signed up successfully");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Sign up failed:", err.message);
      throw err;
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async ({ email, password }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      const { token, user } = res.data.data;
      await storeToken(token);
      set({ authUser: user });
      console.log("Logged in successfully");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Login failed:", err.message);
      throw err;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/auth/log-out");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Logout failed:", err.message);
      throw err;
    } finally {
      await removeToken();
      set({ authUser: null });
    }
  },
}));