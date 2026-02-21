import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  CheckIn,
  HabitFormData,
  ICheckIn,
  IDashboard,
  IHabit,
} from '../types/habit';
import { habitApi } from '../services/api';

interface HabitContextType {
  habits: IHabit[];
  loading: boolean;
  error: string | null;
  dashboardInfo: IDashboard | null;
  refreshHabits: () => Promise<void>;
  addHabit: (data: HabitFormData) => Promise<IHabit>;
  updateHabit: (id: number, data: HabitFormData) => Promise<IHabit>;
  deleteHabit: (id: number) => Promise<void>;
  checkInHabit: (habitId: number, date: CheckIn) => Promise<ICheckIn>;
  getCheckinByHabit: (habitId: number) => Promise<void>;
  getHabit: (id: number) => IHabit | undefined;
  refreshDashboard: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardInfo, setDashboardInfo] = useState<IDashboard | null>(null);

  const refreshHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedHabits = await habitApi.getHabits();
      fetchedHabits.forEach(async h => {
        const checkin = await habitApi.getCheckInsByHabits(h.id);
        h.checkIns = checkin;
      });
      console.log(fetchedHabits);
      setHabits(fetchedHabits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error refreshing habits:', err);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (data: HabitFormData): Promise<IHabit> => {
    try {
      const newHabit = await habitApi.createHabit(data);
      setHabits([...habits, newHabit]);
      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateHabit = async (
    id: number,
    data: HabitFormData,
  ): Promise<IHabit> => {
    try {
      const updated = await habitApi.updateHabit(id, data);
      setHabits(habits.map(h => (h.id === id ? updated : h)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      await habitApi.deleteHabit(id);
      setHabits(habits.filter(h => h.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const checkInHabit = async (
    habitId: number,
    data: CheckIn,
  ): Promise<ICheckIn> => {
    try {
      const checkIn = await habitApi.makeCheckInHabit(habitId, data);
      setHabits(
        habits.map(h =>
          h.id === habitId ? { ...h, checkIns: [checkIn] as ICheckIn[] } : h,
        ),
      );
      return checkIn;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const getCheckinByHabit = async (habitId: number) => {
    try {
      setLoading(true);
      const checkin = await habitApi.getCheckInsByHabits(habitId);
      setHabits(
        habits.map(h => (h.id === habitId ? { ...h, checkIns: checkin } : h)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getHabit = (id: number): IHabit | undefined => {
    return habits.find(h => h.id === id);
  };

  const refreshDashboard = async () => {
    try {
      setLoading(true);
      const fetchedHabits = await habitApi.getDashboard();
      setDashboardInfo(fetchedHabits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error refreshing dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshHabits();
  }, []);

  const value: HabitContextType = {
    habits,
    loading,
    error,
    dashboardInfo,
    refreshHabits,
    refreshDashboard,
    addHabit,
    updateHabit,
    deleteHabit,
    checkInHabit,
    getCheckinByHabit,
    getHabit,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
