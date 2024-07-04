import { create } from "zustand";
import { urlEncode } from "../utils/urlEncode";
import { API_SRC } from "@env";
import { JSEncrypt } from "jsencrypt";
import * as FileSystem from "expo-file-system";

export const useProfileStore = create((set, get) => ({
  user: null,
  token: null,
  // getters

  // setters
  setUser: (user) => set({ user: user }),
  setToken: (token) => set({ token: token }),
  // methods
  createTempImage: async () => {
    const base64Image = "data:image/jpeg;base64,"; // Aquí puedes poner una cadena base64 para una imagen vacía
    const fileUri = FileSystem.documentDirectory + "empty.jpg";

    await FileSystem.writeAsStringAsync(fileUri, base64Image, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;
  },
  updatePersonalData: async (firstname, lastname, email) => {
    // "",
    //   $_POST["nombre"],
    //   $_POST["apellido"],
    //   $_POST["cedula"],
    //   $_POST["email"],
    //   $cedula,
    //   $_POST["borrar"];
    // const data = new FormData();
    // // data.append("foto", {
    // //   uri: "",
    // //   name: "empty.jpg",
    // //   type: "image/jpeg",
    // // });
    // data.append("cedula", get().user.cedula);
    // data.append("nombre", firstname);
    // data.append("apellido", lastname);
    // data.append("email", email);
    // console.log(data);
    // const req = await fetch(API_SRC + "?url=perfil", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + get().token,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: data,
    // });
    // const res = await req.text();
    const localUri = await get().createTempImage();

    const data = new FormData();
    data.append("foto", {
      uri: localUri,
      name: "empty.jpg",
      type: "image/jpeg",
    });
    data.append("cedula", get().user.cedula);
    data.append("nombre", firstname);
    data.append("apellido", lastname);
    data.append("email", email);

    console.log(data);

    const req = await fetch(API_SRC + "?url=perfil", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + get().token,
      },
      body: data,
    });

    const res = await req.text();
    console.log(res);
  },
}));
