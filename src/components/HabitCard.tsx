import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { IHabit } from '../types/habit';

interface HabitCardProps {
  habit: IHabit;
  onPress: () => void;
  isCompletedToday: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onPress,
  isCompletedToday,
}) => {
  const currentStreak = calculateStreak(habit);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{habit.title}</Text>
          <View
            style={[
              styles.statusIndicator,
              isCompletedToday && styles.completedIndicator,
            ]}
          >
            <Text style={styles.statusText}>
              {isCompletedToday ? '✓' : '○'}
            </Text>
          </View>
        </View>

        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}

        <View style={styles.footer}>
          {habit.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{habit.category}</Text>
            </View>
          )}
          <Text style={styles.streak}>Streak: {currentStreak}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const calculateStreak = (habit: IHabit): number => {
  if (!habit.checkIns || habit.checkIns.length === 0) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  const checkInDates = new Set(
    habit.checkIns.map(ci => new Date(ci.date).toISOString().split('T')[0]),
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

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  statusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  completedIndicator: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  streak: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff9800',
  },
});

export default HabitCard;
