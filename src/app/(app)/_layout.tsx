import { Slot } from "expo-router";

import { Text } from "react-native";
import { useAuth } from "@/src/context/AuthContext";

export default function AppLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Slot />;
}
