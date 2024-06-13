import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";

export const useCheckSession = () => {
  const navigation = useNavigation();
  const { name: screenName } = useRoute();
  const [checkSession, isAuthenticated, setIsAuthenticated, token] =
    useAuthStore((state) => [
      state.checkSession,
      state.isAuthenticated,
      state.setIsAuthenticated,
    ]);
  const notLockedScreens = ["LogIn", "Recovery"];
  console.log(screenName);
  useEffect(() => {
    const checkSessionAsync = async () => {
      const isValid = await checkSession();
      setIsAuthenticated(isValid);
    };
    checkSessionAsync();
  }, [token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
            routes: [{ name: "Dashboard" }],
          });
        }
      }
    });

    return unsubscribe;
  }, [isAuthenticated, navigation]);

  return null;
};
