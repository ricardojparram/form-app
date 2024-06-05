import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_SRC } from "@env";
import { urlEncode } from "../utils/urlEncode";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: "123123",
      user: null,
      isAuthenticated: false,

      // setters
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
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
        if (!res.token) {
          return res;
        }
        const { data } = jwtDecode(res.token);
        set({
          token: res.token,
          user: data,
        });
        return true;
      },

      checkSession: async () => {
        const token = get().token;
        if (!token) {
          set({ token: null, user: null, isAuthenticated: false });
          return false;
        }

        try {
          const request = await fetch(API_SRC + "?url=inventario", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const res = await request.json();
          console.log(res);
          if (res.resultado === "error") {
            set({ token: null, user: null });
            return false;
          } else {
            return true;
          }
        } catch (error) {
          console.error("Error checking session:", error);
          set({ token: null, user: null });
          return false;
        }
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
