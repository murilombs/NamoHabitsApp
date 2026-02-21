export enum IFrequency {
  DAILY = 'diário',
  WEEKLY = 'semanal',
}
export enum ICategory {
  HEALTH = 'saúde',
  EXERCISE = 'exercício',
  FOOD = 'alimentação',
  MENTAL = 'mental',
}

export interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: IFrequency;
  category: ICategory;
  created_at: string;
  deleted_at: Date | null;
}

export interface IHabit extends Habit {
  created_at: string;
  deleted_at: Date | null;
  color?: string;
  checkIns: CheckIn[];
}

export interface CheckIn {
  habit_id: number;
  date: string;
  notes?: string;
}

export interface ICheckIn extends CheckIn {
  id: number;
}

export interface Streak {
  habit_id: number;
  habit_title: string;
  checkins_counter: number;
}

export interface WeekCounter {
  habit_id: number;
  habit_title: string;
  adherence_percentage: string;
}

export interface IDashboard {
  activeHabitsWithCheckins: IHabit[];
  streakCounter: Streak[];
  weekCounter: WeekCounter[];
}

export interface HabitFormData {
  title: string;
  description?: string;
  category: string;
  color?: string;
  frequency?: string;
}

export type RootStackParamList = {
  HabitList: undefined;
  HabitForm: { habitId?: string };
  HabitDetail: { habitId: string };
};
