import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// ---------- TYPES ----------
export interface User {
  _id: string;
  fullName: string;
  email: string;
  image: string;
}

export interface Message {
  _id: string;
  text: string;
  senderId: User;
  receiverId?: User;
  groupId?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  readBy: string[];
}

export interface Group {
  _id: string;
  name: string;
  avatar?: string;
  members: User[];
}

interface ChatStoreState {
  messages: Message[];
  users: User[];
  groups: Group[];
  onlineUser: User[];
  selectedUser: User | null;
  selectedGroup: Group | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getGroups: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  getGroupMessages: (groupId: string) => Promise<void>;
  sendMessage: (formData: FormData) => Promise<void>;
  sendGroupMessage: (formData: FormData) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setSelectedGroup: (group: Group | null) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  lastMessages: Record<string, Message>; // keyed by userId
  getLastMessages: () => Promise<void>;
}

// ---------- STORE ----------
export const useChatStore = create<ChatStoreState>()((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  onlineUser: [],
  selectedUser: null,
  selectedGroup: null,
  isUserLoading: false,
  isMessagesLoading: false,
  lastMessages: {},

  getLastMessages: async () => {
    const { users } = get();
    try {
      const data = await Promise.all(
        users.map((u) =>
          axiosInstance.get<{ data: Message }>(
            `/message/messages/last/${u._id}`
          )
        )
      );
      const lastMsgs: Record<string, Message> = {};
      data.forEach((res, i) => {
        if (res.data.data) {
          lastMsgs[users[i]._id] = res.data.data;
        }
      });
      set({ lastMessages: lastMsgs });
    } catch (err) {
      console.error("Failed getting last messages", err);
    }
  },

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get<{ data: User[] }>(
        "/message/contacts"
      );
      set({ users: res.data.data });
    } catch (error) {
      console.error("Failed to fetch users:", (error as AxiosError).message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getGroups: async () => {
    try {
      const res = await axiosInstance.get<{ data: Group[] }>(
        "/messages/groups"
      );
      set({ groups: res.data.data });
    } catch (error) {
      console.error("Failed to fetch groups:", (error as AxiosError).message);
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<{ data: Message[] }>(
        `/message/messages/${userId}`
      );
      set({ messages: res.data.data });
    } catch (error) {
      console.error("Failed to fetch messages:", (error as AxiosError).message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getGroupMessages: async (groupId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<{ data: Message[] }>(
        `/messages/groups/send/${groupId}/messages`
      );
      set({ messages: res.data.data });
    } catch (error) {
      console.error(
        "Failed to fetch group messages:",
        (error as AxiosError).message
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (formData: FormData) => {
    const { selectedUser } = get();
    if (!selectedUser?._id) {
      console.warn("No selected user to send message to.");
      return;
    }

    try {
      const res = await axiosInstance.post<Message>(
        `/message/messages/send/${selectedUser._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "Send message failed:",
        err.response?.data || err.message || "Unknown error"
      );
    }
  },

  sendGroupMessage: async (formData: FormData) => {
    const { selectedGroup } = get();
    if (!selectedGroup?._id) return;

    try {
      const res = await axiosInstance.post<Message>(
        `/messages/groups/${selectedGroup._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      console.error(
        "Send group message failed:",
        (error as AxiosError).message
      );
    }
  },

  markMessageAsRead: async (messageId: string) => {
    try {
      await axiosInstance.post(`/message/messages/${messageId}/read`);
    } catch (error) {
      console.error(
        "Error marking message as read:",
        (error as AxiosError).message
      );
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId._id === useAuthStore.getState().authUser?._id;
      if (!isMessageSentFromSelectedUser) {
        return;
      }
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });

    socket.on("newGroupMessage", (newMessage: Message) => {
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });

    socket.on(
      "messageRead",
      ({ messageId, readBy }: { messageId: string; readBy: string }) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg._id === messageId
              ? {
                  ...msg,
                  readBy: msg.readBy.includes(readBy)
                    ? msg.readBy
                    : [...msg.readBy, readBy],
                }
              : msg
          ),
        }));
      }
    );
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("newGroupMessage");
    socket.off("messageRead");
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user, selectedGroup: null, messages: [] });
  },

  setSelectedGroup: (group) => {
    set({ selectedGroup: group, selectedUser: null, messages: [] });
  },
}));
