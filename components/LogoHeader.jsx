import { View, Image } from "react-native";

export const LogoHeader = () => {
  return (
    <View className="h-[50px]  my-[40px] mx-auto">
      <Image
        resizeMode="contain"
        className="w-[80vw] h-[100%]"
        source={require("../assets/Logo_titulo.png")}
      />
    </View>
  );
};
