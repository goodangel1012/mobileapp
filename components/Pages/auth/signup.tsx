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
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import PasswordInput from "@/components/Auth/PasswordInput";
import { getItem, setItem } from "@/components/Utils/AsyncStorage";

export default function SignUp({
  setStage,
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setStage: React.Dispatch<
    React.SetStateAction<
      "audio" | "image" | "signup" | "login" | "verification"
    >
  >;
}) {
  const [firstName, setFirstName] = useState("Fritz");
  const [lastName, setLastName] = useState("Lamour");
  const [userName, setUserName] = useState("EsDHENRY123");
  const [email, setEmail] = useState("testlims1019@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [disabled, setDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    userName: false,
  });
  useEffect(() => {
    const newShowSuccess = {
      firstName: firstName !== "",
      lastName: lastName !== "",
      userName: userName.length >= 6,
      email: email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null,
      password: password.length >= 8 && password === confirmPassword,
    };

    setShowSuccess(newShowSuccess);

    const isFormValid = Object.values(newShowSuccess).every(Boolean);

    setDisabled(!isFormValid);
  }, [firstName, lastName, userName, email, password, confirmPassword]);

  // get parameters from url
  useEffect(() => {
    if (error) {
      const fetchData = async () => {
        let user_details = await getItem("user");

        setFirstName(user_details.firstName);
        setLastName(user_details.lastName);
        setUserName(user_details.userName);
        setEmail(user_details.email);
        setPassword(user_details.password);
        setConfirmPassword(user_details.password);
      };
      fetchData();
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
      <TextInput
        label="First Name"
        onChangeText={setFirstName}
        value={firstName}
        showCheck={showSuccess.firstName}
      />
      <TextInput
        label="Last Name"
        onChangeText={setLastName}
        value={lastName}
        showCheck={showSuccess.lastName}
      />
      <PasswordInput
        label="Password"
        onChangeText={setPassword}
        value={password}
        showCheck={showSuccess.password}
      />
      <PasswordInput
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        showCheck={showSuccess.password}
      />
      <TextInput
        label="Username"
        showCheck={showSuccess.userName}
        onChangeText={setUserName}
        value={userName}
      />
      <TextInput
        label="Email"
        showCheck={showSuccess.email}
        onChangeText={setEmail}
        value={email}
      />

      {/* <TouchableOpacity style={styles.imageContainer}>
        <Pressable style={styles.imagePressable}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/auth/profile_1.png")}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.imagePressable}>
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
      </TouchableOpacity> */}
      <Button
        disabled={disabled}
        title="Sign Up"
        onPress={async () => {
          setStage("audio");
          await setItem("user", {
            firstName,
            lastName,
            userName,
            email,
            password,
          });
        }}
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
