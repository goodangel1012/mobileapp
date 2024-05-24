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

export default function SignUp({
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
  const [disabled, setDisabled] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        error={error}
        label="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        label="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput label="Password" onChangeText={setPassword} value={password} />
      <TextInput
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <TextInput label="Username" onChangeText={setEmail} value={email} />
      <TextInput label="Email" onChangeText={setEmail} value={email} />

      <TouchableOpacity
        style={styles.imageContainer}
        // onPress={() => navigation.navigate("ProfileModal")}
      >
        <Pressable
          style={styles.imagePressable}
          // onPress={() => setStage("audio")}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/auth/profile_1.png")}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.imagePressable}
          // onPress={() => setStage("image")}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/auth/profile_2.png")}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.imagePressable}
          onPress={() => setStage("verification")}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/auth/profile_3.png")}
            resizeMode="contain"
          />
        </Pressable>
      </TouchableOpacity>
      <Button
        disabled={disabled}
        title="Sign Up"
        onPress={() => setStage("audio")}
      />
      <Text style={styles.login}>
        Already have an account?
        <Link
          style={{ fontWeight: "bold", color: "blue" }}
          href={"/auth/login"}
          onPress={() => setStage("login")}
        >
          {" "}
          Login
        </Link>
      </Text>
    </View>
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
  image: { width: "100%", height: 130 },
  imagePressable: {
    width: "33%",
    height: 130,
  },
  imageContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
