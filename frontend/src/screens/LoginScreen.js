import React, { useState } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert('Login failed', err?.response?.data?.message || 'Check credentials');
    }
  };

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>GoalPilot AI</Text>
      <TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <PrimaryButton label="Login" onPress={onLogin} />
      <PrimaryButton label="Create account" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}
