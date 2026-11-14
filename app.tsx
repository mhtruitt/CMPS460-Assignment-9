import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackParamList } from './src/types';
import { TeamsProvider } from './src/TeamsContext';
import { FavoritesProvider } from './src/FavoritesContext';
import TeamListScreen from './src/screens/TeamListScreen';
import TeamDetailScreen from './src/screens/TeamDetailScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TeamsProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: '700' },
                contentStyle: { backgroundColor: colors.background },
              }}
            >
              <Stack.Screen name="TeamList" component={TeamListScreen} options={{ title: '🏈 NFL Teams' }} />
              <Stack.Screen name="TeamDetail" component={TeamDetailScreen} options={{ title: 'Team' }} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="light" />
        </FavoritesProvider>
      </TeamsProvider>
    </SafeAreaProvider>
  );
}
