import { View, Text } from "react-native";

const Stats = () => {
  return (
    <View className="flex-row justify-between w-full mt-8 mb-6">
      <View className="items-center  px-8 py-2 rounded-xl bg-white dark:bg-gray-800">
        <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
          Not
        </Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          128
        </Text>
      </View>
      <View className="items-center  px-8 py-2 rounded-xl bg-white dark:bg-gray-800">
        <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
          Favori
        </Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          24
        </Text>
      </View>
      <View className="items-center  px-8 py-2 rounded-xl bg-white dark:bg-gray-800">
        <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
          Planlanan
        </Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          5
        </Text>
      </View>
    </View>
  );
};

export default Stats;
