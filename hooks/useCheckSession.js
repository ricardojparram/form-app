import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";

export const useCheckSession = () => {
  const navigation = useNavigation();
  const { name: screenName } = useRoute();
  const checkSession = useAuthStore((state) => state.checkSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const token = useAuthStore((state) => state.token);
  const notLockedScreens = ["LogIn", "Recovery"];

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
    if (!notLockedScreens.includes(screenName)) {
      if (!isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: "LogIn" }],
        });
      }
    } else {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    }
  }, [isAuthenticated, navigation]);

  return null;
};
