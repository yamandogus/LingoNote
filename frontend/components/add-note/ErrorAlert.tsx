import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-animatable";

interface ErrorAlertProps {
  isVisible?: boolean;
  onClose?: () => void;
}


const ErrorAlert = ({ isVisible = true, onClose }: ErrorAlertProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl mx-4 w-[85%] max-w-sm border-l-4 border-red-500"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Header with emoji */}
          <View className="items-center mb-4">
            <Text className="text-lg font-bold text-gray-800 dark:text-white text-center">
              Uyarı
            </Text>
          </View>

          {/* Error message */}
          <View className="mb-6">
            <Text className="text-gray-600 dark:text-gray-300 text-center text-base leading-5">
              Lütfen tüm gerekli alanları doldurun ve bir kategori seçin.
            </Text>
          </View>

          {/* Action button */}
          <TouchableOpacity 
            onPress={onClose} 
            className="bg-red-500 p-2 rounded-xl active:bg-red-600"
            style={{
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text className="text-white text-center font-semibold text-base">
              Tamam
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorAlert;
