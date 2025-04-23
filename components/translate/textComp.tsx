import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import Sections from "../notes/sections";
import { translateText } from "../../hooks/translate";

// Dil tipini tanımlayalım
type LanguageCode = "en" | "tr" | "fr" | "de" | "es" | "it" | "ru";

// Desteklenen diller
const LANGUAGES: Record<LanguageCode, string> = {
  en: "İngilizce",
  tr: "Türkçe",
  fr: "Fransızca",
  de: "Almanca",
  es: "İspanyolca",
  it: "İtalyanca",
  ru: "Rusça",
};

const textComp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Genel Notlarım");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");
  const [fromLang, setFromLang] = useState<LanguageCode>("tr");
  const [toLang, setToLang] = useState<LanguageCode>("en");

  // Dilleri değiştir
  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  const handleTranslate = async () => {
    if (!text.trim()) {
      Alert.alert("Uyarı", "Lütfen çevrilecek bir metin girin.");
      return;
    }

    setIsTranslating(true);
    setError("");

    try {
      const result = await translateText(text, fromLang, toLang);
      
      if (result) {
        setTranslatedText(result);
      } else {
        setError("Çeviri yapılamadı.");
      }
    } catch (err) {
      console.error("Çeviri hatası:", err);
      setError("Çeviri sırasında bir hata oluştu.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 bg-white dark:bg-gray-800 flex-col gap-4 p-4">
        {/* Dil seçim butonları */}
        <View className="flex-row justify-between mb-2">
          <TouchableOpacity 
            className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex-1 mr-2"
            onPress={() => {
              // Dil seçimi modalı eklenebilir
              Alert.alert("Bilgi", "Dil seçimi yakında eklenecek");
            }}
          >
            <Text className="text-center font-medium dark:text-gray-100">
              {LANGUAGES[fromLang]}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg"
            onPress={swapLanguages}
          >
            <Text className="text-blue-500 dark:text-blue-300 font-bold">⇄</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex-1 ml-2"
            onPress={() => {
              // Dil seçimi modalı eklenebilir
              Alert.alert("Bilgi", "Dil seçimi yakında eklenecek");
            }}
          >
            <Text className="text-center font-medium dark:text-gray-100">
              {LANGUAGES[toLang]}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="bg-gray-50 p-4 min-h-60 rounded-xl mb-2 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:border-blue-500 shadow-lg"
          placeholder={`${LANGUAGES[fromLang]} metin girin...`}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          numberOfLines={8}
          value={text}
          onChangeText={(value) => {
            setText(value);
            setError("");
          }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          spellCheck={false}
          allowFontScaling={true}
          maxFontSizeMultiplier={2}
        />
        
        <TouchableOpacity
          onPress={handleTranslate}
          disabled={isTranslating}
          className={`${isTranslating ? 'bg-blue-400' : 'bg-blue-500'} dark:bg-blue-600 p-4 rounded-xl mb-2`}
          activeOpacity={0.7}
        >
          {isTranslating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="font-medium text-white text-center text-lg">
              {`${LANGUAGES[fromLang]} → ${LANGUAGES[toLang]} Çevir`}
            </Text>
          )}
        </TouchableOpacity>
        
        {error ? (
          <Text className="text-red-500 text-center mb-2">{error}</Text>
        ) : null}
        
        <TextInput
          className="bg-gray-50 p-4 min-h-60 rounded-xl mb-2 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:border-blue-500 shadow-lg"
          placeholder={`${LANGUAGES[toLang]} çeviri burada görünecek...`}
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          numberOfLines={8}
          value={translatedText}
          editable={false}
          selectTextOnFocus
        />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 w-full items-center justify-center bg-black/50">
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[92%] h-[80%] shadow-lg">
              <Text className="text-gray-800 mb-2 text-lg font-medium dark:text-gray-100">
                Notunuzu kaydedin
              </Text>
              <View className="shadow-lg">
                <TextInput
                  className="bg-gray-50 p-4 min-h-48 rounded-xl mb-4 border border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Notunuzu giriniz..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="top"
                  numberOfLines={6}
                  value={translatedText || text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                />
              </View>
              <Sections category={category} setCategory={setCategory} />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mt-4 absolute bottom-3 left-0 right-0 mx-4"
              >
                <Text className="font-medium text-white text-center text-lg">
                  Notlarıma Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mt-2"
          activeOpacity={0.7}
        >
          <Text className="font-medium text-white text-center text-lg">
            Notlarıma Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default textComp;
