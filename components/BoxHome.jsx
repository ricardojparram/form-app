import react from "react";
import { View } from 'react-native';
import { Text, IconButton } from "react-native-paper";


const InfoCard = ({ title, iconName, number, subtitle = null }) => {
  return (
    <View className="w-full p-5 rounded-lg bg-white shadow-sm border border-gray-200 mb-5">
      <View className="flex-row justify-start items-center mb-2">
        <Text className="text-2xl font-bold text-start mr-2">{title}</Text>
        <Text className="text-xl font-bold text-gray-400">{subtitle}</Text>
      </View>
      <View className="flex-row justify-start items-center mb-5">
        <View className="bg-theme-primar rounded-full p-0">
          <IconButton icon={iconName} size={40} iconColor="white" />
        </View>
        <Text className="pl-8 text-5xl font-bold">{number}</Text>
      </View>
    </View>
  );
};

export default InfoCard;