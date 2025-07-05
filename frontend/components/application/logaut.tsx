import { useAuth } from "../../contexts/AuthContext";
import { View, Text, TouchableOpacity} from "react-native";

const LogautSelect = () => {
    const {logout} = useAuth();
    return (
        <View className="">
            <Text className="text-center text-lg font-bold dark:text-gray-300">Çıkmak istediğine emin misin?</Text>
           <View className="flex-row w-full justify-center gap-4 mt-4">
                <TouchableOpacity onPress={() => {logout()}} className="bg-red-600 p-2 rounded-lg">
                    <Text className="text-white w-24 text-center">Çıkış yap</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-200 p-2 rounded-lg">
                    <Text className="text-gray-800 w-24 text-center">İptal et</Text>
                </TouchableOpacity>
           </View>
        </View>
    )
}

export default LogautSelect;