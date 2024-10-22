import { act, renderHook } from "@testing-library/react-native";
import { useAuthStore } from "../store/authStore";
import { API_SRC } from "../env";

const session = {
  token: "",
};

describe("Login y authstore", () => {
  it("Debería manejar inyecciones SQL en el login", async () => {
    const { result } = renderHook(() => useAuthStore());

    const injectionID = "'1; DROP TABLE usuarios; --";
    const injectionPassword = "'1; SELECT * FROM usuarios; --";

    await act(async () => {
      await result.current.login("1", injectionID, injectionPassword);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("Debería autenticar el usuario", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login("1", "V-123123123", "123123123");
    });
    expect(result.current.isAuthenticated).toBe(true);
    session.token = result.current.token;
  });
});
