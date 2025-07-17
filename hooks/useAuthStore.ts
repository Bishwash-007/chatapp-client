import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { storeToken, removeToken } from "../lib/token";

type Credentials = {
  email: string;
  password: string;
};

type SignUpPayload = Credentials & { fullName: string };
type LogInPayload = Credentials;
type UpdateProfilePayload = { imageUri: string };

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: [];

  checkAuth: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  logIn: (payload: LogInPayload) => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

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
      console.log(user);
      console.log(token);

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

  updateProfile: async ({ imageUri }) => {
    set({ isUpdatingProfile: true });

    try {
      const formData = new FormData();
      const filename = imageUri.split("/").pop() || `profile.jpg`;
      const fileType = filename.split(".").pop();

      formData.append("avatar", {
        uri: imageUri,
        name: filename,
        type: `image/${fileType}`,
      } as any);

      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.data.user;
      set({ authUser: updatedUser });

      console.log("Profile Updated Successfully");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error updating profile:", err.message);
      throw err;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
