import { act, renderHook } from "@testing-library/react-native";
import { useAuthStore } from "../store/authStore";

describe("Login y authstore", () => {
  it("Debería setear y obtener usuario", async () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setUser({ name: "Ricardo Parra" });
    });

    expect(result.current.user).toEqual({ name: "Ricardo Parra" });
  });

  it("Debería manejar inyecciones SQL en el login", async () => {
    const { result } = renderHook(() => useAuthStore());

    const maliciousUsername = "' OR '1'='1";
    const maliciousPassword = "' OR '1'='1";

    await act(async () => {
      await result.current.login(maliciousUsername, maliciousPassword);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("Debería autenticar el usuario", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("1", "V-123123123", "123123123");
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("Debería verificar la sesión", async () => {
    const { result } = renderHook(() => useAuthStore());
    let res;
    await act(async () => {
      res = await result.current.checkSession();
    });
    expect(res).toBe(true);
  });
});
