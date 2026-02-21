import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IHabit } from '../types/habit';

interface HabitCalendarProps {
  habit: IHabit;
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ habit }) => {
  const getCurrentMonth = () => {
    const today = new Date();
    return {
      month: today.getMonth(),
      year: today.getFullYear(),
    };
  };

  const getDaysOfMonth = () => {
    const { month, year } = getCurrentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getCheckInDates = () => {
    const { month, year } = getCurrentMonth();
    const checkInSet = new Set<number>();

    habit.checkIns.forEach(checkIn => {
      const date = new Date(checkIn.date);
      if (date.getMonth() === month && date.getFullYear() === year) {
        checkInSet.add(date.getDate());
      }
    });

    return checkInSet;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysOfMonth();
  const checkInDates = getCheckInDates();
  const { month, year } = getCurrentMonth();

  const monthName = new Date(year, month).toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const days = [];

  // Add empty cells for days before the 1st
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{monthName}</Text>

      {/* Day labels */}
      <View style={styles.weekLabels}>
        {dayLabels.map(label => (
          <Text key={label} style={styles.dayLabel}>
            {label}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day && (
              <View
                style={[
                  styles.dayBox,
                  checkInDates.has(day) && styles.completedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    checkInDates.has(day) && styles.completedDayText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  weekLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
    fontSize: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  dayBox: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  completedDay: {
    backgroundColor: '#4CAF50',
  },
  completedDayText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default HabitCalendar;
