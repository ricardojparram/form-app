import { create } from "zustand";
import { urlEncode } from "../utils/urlEncode";
import { API_SRC, token } from "@env";
import { JSEncrypt } from "jsencrypt";

export const useProfileStore = create((set, get) => ({
  user: null,

  // setters
  setUser: (user) => set({ user: user }),

  // methods

  updatePersonalData: async (firstname, lastname, email) => {
    // set({ user: useAuthStore.getState().user });
    // console.log(user);
    // "",
    //   $_POST["nombre"],
    //   $_POST["apellido"],
    //   $_POST["cedula"],
    //   $_POST["email"],
    //   $cedula,
    //   $_POST["borrar"];
    // const data = new FormData();
    // data.append("foto", {
    //   uri: "",
    //   type: "image/jpeg",
    // });
    // const request = await fetch(get().API_SRC + "?url=login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: data,
    // });
    // console.log(await request.text());
  },
}));
