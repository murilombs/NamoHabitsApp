import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitProvider } from './src/context/HabitContext';
import { RootStackParamList } from './src/types/habit';
import HabitListScreen from './src/screens/HabitListScreen';
import HabitFormScreen from './src/screens/HabitFormScreen';
import HabitDetailScreen from './src/screens/HabitDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1a1a1a',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="HabitList"
        component={HabitListScreen}
        options={{
          title: 'Meus Habitos',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="HabitForm"
        component={HabitFormScreen}
        options={{
          title: 'Adicionar Habito',
          headerTitleAlign: 'left',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{
          title: 'Detalhes do Jabito',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#ffffff"
      />
      <HabitProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </HabitProvider>
    </SafeAreaProvider>
  );
}

export default App;
