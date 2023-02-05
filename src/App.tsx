import React, {useState} from 'react';
import {ActivityIndicator, Button, SafeAreaView, TextInput} from 'react-native';
import {useCognito} from './cognito';
import {FormField} from './FormField';

export const App = () => {
  const cognito = useCognito();
  const [waiting, setWaiting] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
    code: '',
  });

  const handleFormValueChange = (key: string, value: string) => {
    setValues((existing: any) => ({
      ...existing,
      [key]: value,
    }));
  };

  const onRegister = async () => {
    try {
      setWaiting(true);
      const result = await cognito.register(values.email, values.password);
      console.log('result:', JSON.stringify(result));
    } catch (err) {
      console.error('Error:', err);
    }
    setWaiting(false);
  };

  const onVerifyCode = async () => {
    setWaiting(true);
    try {
      const result = await cognito.confirmCode(values.email, values.code);
      console.log('result:', JSON.stringify(result));
    } catch (err) {}
    setWaiting(false);
  };

  const onResend = async () => {
    setWaiting(true);
    try {
      const result = await cognito.resendCode(values.email);
      console.log('result:', JSON.stringify(result));
    } catch (err) {
      console.error('Error:', err);
    }
    setWaiting(false);
  };

  return (
    <SafeAreaView>
      {waiting && <ActivityIndicator />}
      <FormField
        label="Email"
        formKey="email"
        placeholder="myemail@example.com"
        textInputProps={{
          autoCapitalize: 'none',
          keyboardType: 'phone-pad',
        }}
        handleFormValueChange={handleFormValueChange}
      />
      <FormField
        label="Password"
        formKey="password"
        placeholder="your password"
        handleFormValueChange={handleFormValueChange}
        textInputProps={{
          secureTextEntry: true,
        }}
      />
      <TextInput keyboardType="email-address" />
      <Button title="Register" onPress={onRegister} />
      <Button title="Resend" onPress={onResend} />
      <FormField
        label="Verification Code"
        formKey="code"
        placeholder="Verification Code"
        handleFormValueChange={handleFormValueChange}
      />
      <Button title="Verify Code" onPress={onVerifyCode} />
    </SafeAreaView>
  );
};
