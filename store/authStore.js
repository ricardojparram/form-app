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
        if (!API_SRC) {
          console.error("API_SRC no está definido.");
          return;
        }
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
          isAuthenticated: true,
        });
        console.log("tokenlogin: " + get().token);
        return true;
      },

      checkSession: async function (token) {
        console.log("tokenCheck:" + token);
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
          token: null,
          user: null,
        }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log("Error al hidratar el store:", error);
          } else {
            console.log("Store hidratado correctamente");
            console.log("Token después de hidratar:", state.token);
          }
        };
      },
    }
  )
);
