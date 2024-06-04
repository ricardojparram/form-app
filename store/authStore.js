import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_SRC } from "@env";
import { urlEncode } from "../utils/urlEncode";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      // setters
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      //methods

      login: async (sede, cedula, password) => {
        const request = await fetch(API_SRC + "?url=login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncode({
            login: "app",
            sede: sede,
            cedula: cedula,
            password: password,
          }),
        });
        const res = await request.json();
        const { data } = jwtDecode(res.token);
        set({
          token: res.token,
          user: data,
        });
      },

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
