import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";

export const useCheckSession = () => {
  const navigation = useNavigation();
  const checkSession = useAuthStore((state) => state.checkSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const checkSessionAsync = async () => {
      if (token) {
        const isValid = await checkSession(token);
        console.log("isValid:", isValid);
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkSessionAsync();
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: "LogIn" }],
        });
      }
    });

    return unsubscribe;
  }, [isAuthenticated, navigation]);

  return null;
};
