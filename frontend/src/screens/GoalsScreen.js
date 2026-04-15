import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import client from '../api/client';
import PrimaryButton from '../components/PrimaryButton';

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const [duration, setDuration] = useState('30 days');
  const [loading, setLoading] = useState(false);

  const loadGoals = async () => {
    const { data } = await client.get('/goals');
    setGoals(data.goals);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const createGoalFromAI = async () => {
    setLoading(true);
    try {
      const ai = await client.post('/ai/generate-roadmap', { goal: goalInput, duration });
      await client.post('/goals', ai.data.roadmap);
      setGoalInput('');
      await loadGoals();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to create goal');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (goal, week, task) => {
    await client.patch('/goals/task-status', {
      goalId: goal._id,
      week: week.week,
      day: task.day,
      completed: !task.completed,
    });
    await loadGoals();
  };

  return (
    <View style={{ padding: 16, gap: 8, flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Goals</Text>
      <TextInput placeholder="Enter your goal" value={goalInput} onChangeText={setGoalInput} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <TextInput placeholder="Duration (e.g., 30 days)" value={duration} onChangeText={setDuration} style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} />
      <PrimaryButton label={loading ? 'Generating...' : 'Generate AI Plan'} onPress={createGoalFromAI} disabled={loading || !goalInput} />

      <FlatList
        data={goals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 10 }}>
            <Text style={{ fontWeight: '700' }}>{item.goal}</Text>
            <Text>Progress: {item.progressPercent}%</Text>
            {(item.weeks || []).slice(0, 1).map((week) =>
              week.tasks.slice(0, 3).map((task) => (
                <TouchableOpacity key={`${week.week}-${task.day}`} onPress={() => toggleTask(item, week, task)}>
                  <Text>{task.completed ? '✅' : '⬜'} Day {task.day}: {task.title}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      />
    </View>
  );
}
