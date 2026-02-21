import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHabits } from '../context/HabitContext';
import { IHabit, RootStackParamList } from '../types/habit';
import HabitCard from '../components/HabitCard';
import FloatingAddButton from '../components/FloatingAddButton';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitList'>;

const HabitListScreen: React.FC<Props> = ({ navigation }) => {
  const { habits, loading, error } = useHabits();

  const isHabitCompletedToday = (habit: IHabit): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (!habit.checkIns) return false;
    return habit.checkIns.some(
      checkIn => new Date(checkIn.date).toISOString().split('T')[0] === today,
    );
  };

  const handleAddHabit = () => {
    navigation.navigate('HabitForm', {});
  };

  const handleHabitPress = (habitId: number) => {
    navigation.navigate('HabitDetail', { habitId: String(habitId) });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#40C4FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onPress={() => handleHabitPress(item.id)}
            isCompletedToday={isHabitCompletedToday(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Sem habitos ainda!</Text>
            <Text style={styles.emptySubtext}>
              Clique em + para adicionar um habito
            </Text>
          </View>
        }
      />
      <FloatingAddButton onPress={handleAddHabit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 80,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default HabitListScreen;
