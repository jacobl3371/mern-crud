import { create } from "zustand";
import axios from "axios";

const AUTH_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/auth"
    : "/api/auth";

const NOTES_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/notes"
    : "/api/notes";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${AUTH_API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${AUTH_API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${AUTH_API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/reset-password/${token}`,
        {
          password,
        },
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },

  createNote: async (title, content) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${NOTES_API_URL}`, {
        title,
        content,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error creating note",
      });
      throw error;
    }
  },

  getAllNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${NOTES_API_URL}`);
      set({ message: response.data.message, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error fetching notes",
      });
      throw error;
    }
  },

  getNoteByID: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${NOTES_API_URL}/${id}`);
      set({ message: response.data.message, isLoading: false });
      return response;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error fetching note",
      });
      throw error;
    }
  },

  updateNote: async (id, title, content) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${NOTES_API_URL}/${id}`, {
        title,
        content,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error updating note",
      });
      throw error;
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${NOTES_API_URL}/${id}`);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error deleting note",
      });
      throw error;
    }
  },
}));
