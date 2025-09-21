import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stats = () => {
  const statsData = [
    {
      label: "Not",
      value: "128",
      icon: "document-text",
      color: "#3b82f6",
      bgColor: "#dbeafe",
      darkBgColor: "#1e3a8a",
    },
    {
      label: "Favori",
      value: "24",
      icon: "heart",
      color: "#ef4444",
      bgColor: "#fee2e2",
      darkBgColor: "#991b1b",
    },
    {
      label: "Planlanan",
      value: "5",
      icon: "calendar",
      color: "#10b981",
      bgColor: "#d1fae5",
      darkBgColor: "#065f46",
    },
  ];

  return (
    <View className="flex-row justify-between w-full mt-6 px-4 mb-8">
      {statsData.map((stat, index) => (
        <View 
          key={stat.label}
          className="flex-1 mx-1 rounded-2xl bg-white dark:bg-gray-800 p-4 items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          {/* Icon Container */}
          <View 
            className="w-12 h-12 rounded-2xl items-center justify-center mb-3"
            style={{
              backgroundColor: stat.bgColor,
            }}
          >
            <Ionicons 
              name={stat.icon as any} 
              size={24} 
              color={stat.color} 
            />
          </View>
          
          {/* Value */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </Text>
          
          {/* Label */}
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {stat.label}
          </Text>
          
          {/* Progress Bar */}
          <View className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
            <View 
              className="h-full rounded-full"
              style={{ 
                backgroundColor: stat.color,
                width: `${Math.min(parseInt(stat.value) / 2, 100)}%`,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default Stats;
