import { create } from "zustand";
import { urlEncode } from "../utils/urlEncode";
import { API_SRC, PUBLIC_KEY } from "../env";
import { JSEncrypt } from "jsencrypt";
import { useAuthStore } from "./authStore";

export const useProfileStore = create((set, get) => ({
  user: null,
  token: null,
  // getters

  // setters
  setUser: (user) => set({ user: user }),
  setToken: (token) => set({ token: token }),
  // methods

  updatePersonalData: async (firstname, lastname, email) => {
    const data = new FormData();
    data.append("app", "");
    data.append("cedula", get().user.cedula);
    data.append("nombre", firstname);
    data.append("apellido", lastname);
    data.append("email", email);

    const req = await fetch(API_SRC + "?url=perfil", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + get().token,
      },
      body: data,
    });

    const res = await req.json();

    if (res.edit.token) {
      const setUserFromToken = useAuthStore.getState().setUserFromToken;
      setUserFromToken(res.edit.token);
      return true;
    }
    return false;
  },

  updatePassword: async (actPassword, newPassword) => {
    const json = JSON.stringify({
      actPassword: actPassword,
      newPassword: newPassword,
    });
    const encrypt = new JSEncrypt({ default_key_size: 2048 });
    encrypt.setPublicKey(PUBLIC_KEY);
    const encrypted = encrypt.encrypt(json);
    const request = await fetch(API_SRC + "?url=perfil", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + get().token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncode({
        changePassword: "app",
        data: encrypted,
      }),
    });
    const res = await request.json();

    return res;
  },

  changeProfilePicture: async (img) => {
    const data = new FormData();
    data.append("foto", {
      uri: img,
      name: "foto.png",
      filename: "foto.png",
      type: "image/png",
    });
    console.log(get().user);
    data.append("cedula", get().user.cedula);
    data.append("nombre", get().user.nombre);
    data.append("apellido", get().user.apellido);
    data.append("email", get().user.correo);
    const req = await fetch(API_SRC + "?url=perfil", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + get().token,
      },
      body: data,
    });

    const res = await req.json();
    console.log(res);
    if (res.edit.token) {
      const setUserFromToken = useAuthStore.getState().setUserFromToken;
      setUserFromToken(res.edit.token);
      return API_SRC + res.foto.url;
    }
    return false;
  },
}));
