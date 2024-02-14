import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function Root() {
  return (
    <AuthProvider>
      <SafeAreaView className='flex-1 bg-slate-700'>
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  )
}