import { create } from "zustand";
import { urlEncode } from "../utils/urlEncode";
import { API_SRC } from "@env";
import { JSEncrypt } from "jsencrypt";
import { useAuthStore } from "./authStore";
// import RNFetchBlob from "react-native-fetch-blob";

export const useProfileStore = create((set, get) => ({
  user: null,
  token: null,
  // getters

  // setters
  setUser: (user) => set({ user: user }),
  // methods

  updatePersonalData: async (firstname, lastname, email) => {
    // "",
    //   $_POST["nombre"],
    //   $_POST["apellido"],
    //   $_POST["cedula"],
    //   $_POST["email"],
    //   $cedula,
    //   $_POST["borrar"];
    const data = new FormData();
    // data.append("foto", {
    //   uri: "asdasd",
    //   name: "photo.png",
    //   filename: "imageName.png",
    //   type: "image/png",
    // });
    // body.append("Content-Type", "image/png");
    data.append("cedula", get().user.cedula);
    data.append("nombre", firstname);
    data.append("apellido", lastname);
    data.append("email", email);
    console.log(data);
    // const request = await RNFetchBlob.fetch(
    //   "POST",
    //   API_SRC + "?url=perfil",
    //   {
    //     Authorization: "Bearer " + useAuthStore.getState().token,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   [
    //     {
    //       name: "avatar-foo",
    //       filename: "avatar-foo.png",
    //       type: "image/png",
    //       data: RNFetchBlob.wrap(get().user.fotoPerfil),
    //     },
    //     { name: "cedula", data: get().user.cedula },
    //     { name: "nombre", data: firstname },
    //     { name: "apellido", data: lastname },
    //     { name: "email", data: email },
    //   ]
    // );
    console.log(await request.text());
  },
}));
