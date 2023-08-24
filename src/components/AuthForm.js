import React, { useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { StyleSheet } from "react-native";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitBtnText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input autoCapitalize="none" autoCorrect={false} value={email} label="Email" onChangeText={setEmail} />
      <Spacer />
      <Input autoCapitalize="none" autoCorrect={false} value={password} label="Password" onChangeText={setPassword} secureTextEntry />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Spacer>
        <Button title={submitBtnText} onPress={() => onSubmit({ email, password })} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
