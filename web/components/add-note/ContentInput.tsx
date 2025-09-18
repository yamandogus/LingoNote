import { Text, TextInput, View} from "react-native";
import AddImage from "./AddImage";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ContentInputProps {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
  content: string;
  setContent: (content: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: { title: boolean; content: boolean }) => void;
  selectedColor: string;
  isDark: boolean;
}

export default function ContentInput({
  content,
  setContent,
  isFocused,
  setIsFocused,
  selectedColor,
  isDark,
  imageUri,
  setImageUri,
}: ContentInputProps) {

  return (
    <View className="mb-6">
      {/* Modern Content Input Container */}
      <View className={`relative rounded-2xl border-2 transition-all duration-200 ${
        isFocused
          ? `border-[${selectedColor}] shadow-lg`
          : isDark
            ? "border-gray-700"
            : "border-gray-200"
      } ${isDark ? "bg-gray-800" : "bg-white"}`}
        style={{
          shadowColor: isFocused ? selectedColor : "transparent",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isFocused ? 0.15 : 0,
          shadowRadius: 12,
          elevation: isFocused ? 8 : 0,
        }}
      >
        {/* Input Header */}
        <View className="flex-row items-center px-4 pt-4 pb-2">
          <Ionicons 
            name="document-text-outline" 
            size={18} 
            color={isDark ? "#9CA3AF" : "#6B7280"} 
          />
          <Text className={`ml-2 text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Not hakkında ne yazmak istersin?
          </Text>
        </View>

        {/* Text Input */}
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          className={`px-4 pb-4 text-base leading-6 min-h-[120px] rounded-2xl ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          style={{
            textAlignVertical: "top",
          }}
          placeholder="Şimdi notunuzu yazın..."
          placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
          onFocus={() => setIsFocused({ title: false, content: true })}
          onBlur={() => setIsFocused({ title: false, content: false })}
          selectionColor={selectedColor}
        />

        {/* Bottom Actions */}
        <View className={`border-t  ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}>
          <AddImage imageUri={imageUri} setImageUri={setImageUri} />
        </View>
      </View>
    </View>
  );
}
