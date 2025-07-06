import { Modal, View, Text, TouchableOpacity, BackHandler } from "react-native";

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean)=> void;
}
const homeExit = ({ showModal, setShowModal }: ModalProps) => {
  const handleYes = () => {
    BackHandler.exitApp();
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <Modal transparent visible={showModal} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg dark:bg-gray-800">
          <Text className="text-lg font-bold mb-4 text-center dark:text-white">Bekleyin!</Text>
          <Text className="text-base text-center mb-6 dark:text-gray-300">
            Uygulamadan çıkmak istediğinize emin misiniz?
          </Text>
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity
              onPress={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-xl"
            >
              <Text className="text-black font-medium">İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleYes}
              className="px-4 py-2 bg-red-500 rounded-xl"
            >
              <Text className="text-white font-medium">Evet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default homeExit;
