import {
  CheckIn,
  HabitFormData,
  ICheckIn,
  IDashboard,
  IHabit,
} from '../types/habit';

const API_BASE_URL = 'http://10.0.2.2:3000';

export const habitApi = {
  async getHabits(): Promise<IHabit[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  },

  async getHabit(id: number): Promise<IHabit> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching habit:', error);
      throw error;
    }
  },

  async createHabit(data: HabitFormData): Promise<IHabit> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: new Date().toISOString(),
          checkIns: [],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
  },

  async updateHabit(id: number, data: HabitFormData): Promise<IHabit> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  },

  async deleteHabit(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  },

  async getCheckInsByHabits(habitId: number): Promise<ICheckIn[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/habits/${habitId}/checkins`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in checking by habit:', error);
      throw error;
    }
  },

  async makeCheckInHabit(habitId: number, data: CheckIn): Promise<ICheckIn> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/habits/${habitId}/checkins`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking in habit:', error);
      throw error;
    }
  },

  async getDashboard(): Promise<IDashboard> {
    try {
      const response = await fetch(`${API_BASE_URL}/habits/dashboard/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  },
};
