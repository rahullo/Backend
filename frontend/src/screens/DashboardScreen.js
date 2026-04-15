import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';

export default function DashboardScreen() {
  const [summary, setSummary] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await client.get('/dashboard/summary');
      setSummary(data);
    })();
  }, []);

  return (
    <View style={{ padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Dashboard</Text>
      <Text>Active goals: {summary?.activeGoals ?? 0}</Text>
      <Text>Completed tasks: {summary?.completedTasks ?? 0}</Text>
      <Text>Average progress: {summary?.avgProgress ?? 0}%</Text>
      <Text>Streak: {summary?.streakCount ?? 0} days</Text>
      <PrimaryButton label="Logout" onPress={logout} />
    </View>
  );
}
