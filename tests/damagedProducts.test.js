import { act, renderHook } from "@testing-library/react-native";
import { useAuthStore } from "../store/authStore";
import { API_SRC } from "../env";

const session = {
  token: "",
};

describe("Productos dañados", () => {
  it("Debería autenticar el usuario", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("1", "V-123123123", "123123123");
    });
    expect(result.current.isAuthenticated).toBe(true);
    session.token = result.current.token;
  });
  it("Debería retornar los productos dañados de la sede", async () => {
    await act(async () => {
      const res = await fetch(
        API_SRC + "?url=productoDanado&mostrar=&bitacora=",
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      const res_json = await res.json();
      expect(Array.isArray(res_json)).toBe(true);
    });
  });
  it("Debería retornar detalles del producto dañado", async () => {
    await act(async () => {
      const id = "1";
      const res = await fetch(
        API_SRC + "?url=productoDanado&detalle=&id=" + id,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      ).then((res) => res.json());
      expect(Array.isArray(res)).toBe(true);
    });
  });
});
