import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHabits } from '../context/HabitContext';
import { RootStackParamList } from '../types/habit';
import HabitCalendar from '../components/HabitCalendar';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitDetail'>;

const HabitDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { habitId } = route.params;
  const { getHabit, deleteHabit, checkInHabit, getCheckinByHabit } =
    useHabits();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');

  const habit = getHabit(Number(habitId));

  if (!habit) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Habit not found</Text>
      </View>
    );
  }

  const currentStreak = calculateStreak(habit);
  const isCompletedToday = isHabitCompletedToday(habit);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const today = new Date().toLocaleDateString('en-CA');
      const newCheckIn = {
        habit_id: habit.id,
        date: today,
        notes: notes.trim() || '',
      };
      await checkInHabit(Number(habitId), newCheckIn);
      await getCheckinByHabit(Number(habitId));
      Alert.alert('Success', 'Check-in Registrado!');
      setNotes('');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to check in',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('HabitForm', { habitId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Remover Habito',
      'Tem certeza que deseja apagar esse habito?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              await deleteHabit(Number(habitId));
              Alert.alert('Success', 'Habito Removido');
              navigation.goBack();
            } catch (error) {
              Alert.alert(
                'Error',
                error instanceof Error ? error.message : 'Falha ao Remover',
              );
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{habit.title}</Text>
            {habit.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{habit.category}</Text>
              </View>
            )}
          </View>
        </View>

        {habit.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{habit.description}</Text>
          </View>
        )}

        <View style={styles.streakContainer}>
          <View style={styles.streakCard}>
            <Text style={styles.streakLabel}>Streak Atual</Text>
            <Text style={styles.streakNumber}>{currentStreak}</Text>
            <Text style={styles.streakUnit}>Dias</Text>
          </View>
          <View style={styles.streakCard}>
            <Text style={styles.streakLabel}>Total Check-ins</Text>
            <Text style={styles.streakNumber}>{habit.checkIns.length}</Text>
            <Text style={styles.streakUnit}>Vezes</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              isCompletedToday && styles.statusCompleted,
            ]}
          >
            <Text style={styles.statusText}>
              {isCompletedToday ? '✓ Completado hoje' : '○ Não Completado hoje'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Check-ins no Més</Text>
          <HabitCalendar habit={habit} />
        </View>

        {!isCompletedToday && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas (Opcional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Adicione uma nota sobre este check-in..."
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              editable={!loading}
            />
          </View>
        )}

        {!isCompletedToday && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.checkInButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleCheckIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.checkInButtonText}>✓ Feito</Text>
            )}
          </TouchableOpacity>
        )}

        {habit.checkIns && habit.checkIns.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Histórico de Check-ins</Text>
            <View style={styles.checkInsList}>
              {habit.checkIns
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((checkIn, index) => (
                  <View key={index} style={styles.checkInItem}>
                    <View style={styles.checkInHeader}>
                      <Text style={styles.checkInDate}>
                        {formatDate(checkIn.date)}
                      </Text>
                      <View style={styles.checkInDot} />
                    </View>
                    {checkIn.notes && (
                      <Text style={styles.checkInNotes}>{checkIn.notes}</Text>
                    )}
                  </View>
                ))}
            </View>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.editButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleEdit}
            disabled={loading}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.deleteButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleDelete}
            disabled={loading}
          >
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem';
  } else {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

const calculateStreak = (habit: any): number => {
  if (!habit.checkIns || habit.checkIns.length === 0) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  const checkInDates = new Set(
    habit.checkIns.map(
      (ci: any) => new Date(ci.date).toISOString().split('T')[0],
    ),
  );

  while (true) {
    const dateString = currentDate.toISOString().split('T')[0];
    if (checkInDates.has(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

const isHabitCompletedToday = (habit: any): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return habit.checkIns.some(
    (checkIn: any) =>
      new Date(checkIn.date).toISOString().split('T')[0] === today,
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
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
  },
  header: {
    marginBottom: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  streakContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  streakCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#40C4FF',
  },
  streakUnit: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statusContainer: {
    marginBottom: 24,
  },
  statusBadge: {
    backgroundColor: '#fff3cd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    borderLeftColor: '#28a745',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
  },
  checkInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#40C4FF',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  checkInsList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkInItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkInDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  checkInDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  checkInNotes: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlignVertical: 'top',
  },
});

export default HabitDetailScreen;
