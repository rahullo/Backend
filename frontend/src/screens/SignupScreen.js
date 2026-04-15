import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = async () => {
    try {
      await signup(name, email, password);
    } catch (err) {
      Alert.alert('Signup failed', err?.response?.data?.message || 'Try again');
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <PrimaryButton label="Sign up" onPress={onSignup} />
    </View>
  );
}
