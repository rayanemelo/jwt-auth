import { Button } from "@/src/components/button";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <View className="justify-center flex-1 gap-3 px-4">
      <Text className="text-white">Welcome to the Home Screen</Text>
      <Button onPress={signOut}>
        <Button.Text>sign out</Button.Text>
      </Button>
    </View>
  );
}
