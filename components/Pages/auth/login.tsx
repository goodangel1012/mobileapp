import {
  Image,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import TextInput from "@/components/Auth/TextInput";
import Button from "@/components/Auth/Button";
import { useState } from "react";
import { Link } from "expo-router";
import LoadingScreen from "@/components/Utils/LoadingScreen";

export default function Login({
  setStage,
}: {
  setStage: React.Dispatch<
    React.SetStateAction<
      "audio" | "image" | "signup" | "login" | "verification"
    >
  >;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [done, setDone] = useState(false);

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <TextInput label="Email" onChangeText={setEmail} value={email} />

        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
        />

        <Button
          disabled={disabled}
          title="Login"
          onPress={() => {
            setDone(true);
          }}
        />
        <Text style={styles.login}>
          Don't have an account?
          <Link
            style={{ fontWeight: "bold", color: "blue" }}
            onPress={() => setStage("signup")}
            href="/auth/signup"
          >
            {" "}
            Sign Up
          </Link>
        </Text>
      </View>
      {done && <LoadingScreen redirect="/app" />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "92%",
    marginHorizontal: "5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  login: {
    width: "100%",
    textAlign: "center",
  },
  image: {
    width: "33%", // Adjust width according to your needs
    height: 130,
  },
  imageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
