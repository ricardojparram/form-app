import react from "react";
import { View } from 'react-native';
import { Text, IconButton } from "react-native-paper";


const InfoCard = ({ title, iconName, number, subtitle = null }) => {
  return (
    <View className="w-9/12 p-5 rounded-lg bg-white shadow-lg mb-5">
      <View className="flex-row justify-start items-center mb-2">
        <Text className="text-2xl font-bold text-start mr-2">{title}</Text>
        <Text className="text-xl font-bold text-gray-400">{subtitle}</Text>
      </View>
      <View className="flex-row justify-start items-center mb-5">
        <IconButton className="mr-5 px-2 pt-2 pb-3 bg-theme-primar rounded-full" icon={iconName} size={50} iconColor="white" />
        <Text className="text-5xl font-bold ml-2">{number}</Text>
      </View>
    </View>
  );
};

export default InfoCard;