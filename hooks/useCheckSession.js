import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";

export const useCheckSession = () => {
  const navigation = useNavigation();
  const checkSession = useAuthStore((state) => state.checkSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const checkSessionAsync = async () => {
      const isValid = await checkSession();
      setIsAuthenticated(isValid);
    };

    checkSessionAsync();
  }, [checkSession, setIsAuthenticated]);

  useEffect(() => {
    const currentRoute =
      navigation.getState().routes[navigation.getState().index].name;
    if (!isAuthenticated && currentRoute !== "LogIn") {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
    }
  }, [isAuthenticated, navigation]);
};
