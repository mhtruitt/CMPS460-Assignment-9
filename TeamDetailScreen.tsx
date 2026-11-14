import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { useTeams } from '../TeamsContext';
import { useFavorites } from '../FavoritesContext';
import PlayerRow from '../components/PlayerRow';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TeamDetail'>;

export default function TeamDetailScreen({ route }: Props) {
  const { teamId } = route.params;
  const { teams } = useTeams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const team = teams.find((t) => t.id === teamId);
  if (!team) {
    return (
      <View style={styles.screen}>
        <EmptyState title="Team not found" message="Go back and choose a team from the list." />
      </View>
    );
  }

  const favorite = isFavorite(team.id);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.city}>{team.city}</Text>
        <Text style={styles.name}>{team.name}</Text>
        <Text style={styles.conf}>{team.conference} Conference</Text>
        <TouchableOpacity
          style={[styles.favBtn, favorite && styles.favBtnActive]}
          onPress={() => toggleFavorite(team.id)}
        >
          <Text style={[styles.favText, favorite && { color: '#111827' }]}>
            {favorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Players</Text>
      <FlatList
        data={team.players}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PlayerRow player={item} />}
        ListEmptyComponent={<EmptyState title="No players" message="No roster data for this team." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { backgroundColor: colors.primary, borderRadius: 14, padding: 20, marginBottom: 16 },
  city: { color: '#bfdbfe', fontSize: 15 },
  name: { color: '#fff', fontSize: 30, fontWeight: '800' },
  conf: { color: '#e0e7ff', marginTop: 2, marginBottom: 14 },
  favBtn: { backgroundColor: 'rgba(255,255,255,0.18)', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  favBtnActive: { backgroundColor: colors.accent },
  favText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  section: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 10 },
});
