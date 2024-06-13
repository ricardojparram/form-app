import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_SRC } from "@env";
import { urlEncode } from "../utils/urlEncode";
import { RSA } from "react-native-rsa-native";
// import {CryptoES}

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,
        isAuthenticated: false,
        API_SRC: API_SRC,
        public_key: null,

        // setters
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        setPublicKey: (public_key) => set({ public_key }),

        //methods

        fetchPublicKey: async () => {
          try {
            const request = await fetch(
              get().API_SRC + "?url=login&getPublicKey="
            );
            const res = await request.json();
            if (!res.key) {
              throw new Error("No public key");
            }
            const key = atob(res?.key);
            set({ public_key: key });
          } catch (error) {
            console.error("Error fetching public key: " + error);
            set({ public_key: null });
          }
        },

        login: async (sede, cedula, password) => {
          // const json = JSON.stringify({
          //   login: "app",
          //   sede: sede,
          //   cedula: cedula,
          //   password: password,
          // });
          // console.log(RSA);
          // const encryptedData = await RSA.encrypt(json, get().public_key);
          // console.log(RSA);

          // return;
          // const base64data = btoa(encryptedData);
          // console.log(base64data);
          const request = await fetch(get().API_SRC + "?url=login", {
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
            isAuthenticated: true,
          });
          return true;
        },

        checkSession: async function () {
          const token = get().token;
          console.log("CheckSession: " + token);
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
