import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_SRC, PUBLIC_KEY } from "../env";
import { urlEncode } from "../utils/urlEncode";
import JSEncrypt from "jsencrypt";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,
        isAuthenticated: false,
        API_SRC: API_SRC,
        PUBLIC_KEY: PUBLIC_KEY,

        // setters
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        setPublicKey: (public_key) => set({ public_key }),
        setUserFromToken: (token) => {
          const { data } = jwtDecode(token);
          set({
            token: token,
            user: data,
          });
          return true;
        },

        //methods

        login: async (sede, cedula, password) => {
          const json = JSON.stringify({
            sede: sede,
            cedula: cedula,
            password: password,
          });
          const encrypt = new JSEncrypt({ default_key_size: 2048 });
          encrypt.setPublicKey(PUBLIC_KEY);
          const encrypted = encrypt.encrypt(json);
          if (!API_SRC) {
            console.error("API_SRC no está definido.");
            return;
          }
          const request = await fetch(get().API_SRC + "?url=login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlEncode({
              login: "app",
              data: encrypted,
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
            isAuthenticated: true,
          });
          return true;
        },

        checkSession: async function () {
          const token = get().token;
          if (!token) {
            set({ token: null, user: null, isAuthenticated: false });
            return false;
          }

          try {
            const request = await fetch(API_SRC + "?url=sessionCheck", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const res = await request.json();

            switch (res.resultado) {
              case "error":
                set({ token: null, user: null });
                return false;
              case "ok":
                set({ isAuthenticated: true });
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
            isAuthenticated: false,
            token: null,
            user: null,
          }),
      }),
      {
        name: "authStore",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
