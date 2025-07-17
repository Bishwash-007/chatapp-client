import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

interface ChatStoreState {
  messages: any[];
  users: any[];
  onlineUser: any[];
  selectedUser: any | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: any) => Promise<void>;
  setSelectedUser: (user: any) => void;
}

export const useChatStore = create<ChatStoreState>()((set, get) => ({
  messages: [],
  users: [],
  onlineUser: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ users: res.data.data });
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching users:", err);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/messages/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching messages:", err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: any) => {
    set({ isMessagesLoading: true });
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error sending message:", err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (user: any) => set({ selectedUser: user }),
}));
