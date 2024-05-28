import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label: string;
  error?: string;
  onChangeText: (text: string) => void;
  showCheck?: boolean;
}

const PasswordInput: React.FC<Props> = ({
  label,
  error,
  showCheck,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <RNTextInput
          secureTextEntry={true}
          style={[styles.input, error ? styles.inputError : null]}
          {...props}
        />
        {showCheck && (
          <FontAwesome6 name="check-circle" size={24} color="green" />
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    width: "90%",
    // remove border
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#red",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
