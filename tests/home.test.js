import { act, renderHook } from "@testing-library/react-native";
import { useAuthStore } from "../store/authStore";
import { API_SRC } from "../env";

const session = {
  token: "",
};

describe("Home", () => {
  it("Debería autenticar el usuario", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("1", "V-123123123", "123123123");
    });
    expect(result.current.isAuthenticated).toBe(true);
    session.token = result.current.token;
  });

  it(`Debería retornar el total de 
      proveedores, donaciones, usuarios y productos de la sede`, async () => {
    await act(async () => {
      const res = await fetch(API_SRC + "?url=home&cliente", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      const res_json = await res.json();
      expect(Object.keys(res_json)).toContain("proveedor");
      expect(Object.keys(res_json)).toContain("personal");
      expect(Object.keys(res_json)).toContain("producto");
      expect(Object.keys(res_json)).toContain("usuario");
    });
  });
  it("Debería retornar el total de ventas del día en la sede", async () => {
    await act(async () => {
      const res = await fetch(API_SRC + "?url=home&resumen=venta&fecha=dia", {
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const res_json = await res.json();

      expect(Object.keys(res_json)).toContain("resultado");
      expect(res_json.resultado).not.toBe("error");
    });
  });
  it("Debería retornar el total de compras del día en la sede", async () => {
    await act(async () => {
      const res = await fetch(API_SRC + "?url=home&resumen=compra&fecha=dia", {
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        compras: "lalo",
        opcionC: "hoy",
      });
      const res_json = await res.json();

      expect(Object.keys(res_json)).toContain("resultado");
      expect(res_json.resultado).not.toBe("error");
    });
  });
});
