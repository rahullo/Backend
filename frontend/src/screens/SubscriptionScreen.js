import React, { useState } from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import client from '../api/client';
import PrimaryButton from '../components/PrimaryButton';

export default function SubscriptionScreen() {
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await client.post('/subscriptions/checkout');
      if (data.checkoutUrl) {
        await Linking.openURL(data.checkoutUrl);
      }
    } catch (err) {
      Alert.alert('Checkout failed', err?.response?.data?.message || 'Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>GoalPilot Pro</Text>
      <Text>$13 / month</Text>
      <Text>- Unlimited goals</Text>
      <Text>- Priority AI generation</Text>
      <Text>- Advanced analytics</Text>
      <PrimaryButton label={loading ? 'Loading...' : 'Upgrade to Pro'} onPress={startCheckout} disabled={loading} />
    </View>
  );
}
