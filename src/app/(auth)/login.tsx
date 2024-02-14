import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import { View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("" as string);
  const [password, setPassword] = useState("" as string);

  const { signIn } = useAuth();

  return (
    <View className="justify-center flex-1 gap-3 px-4">
      <Input placeholder="Email" onChangeText={setEmail} />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={() => signIn(email, password)}>
        <Button.Text>Login</Button.Text>
      </Button>
    </View>
  );
}
