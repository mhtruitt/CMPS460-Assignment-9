import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { useTeams } from '../TeamsContext';
import { useFavorites } from '../FavoritesContext';
import TeamCard from '../components/TeamCard';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TeamList'>;

export default function TeamListScreen({ navigation }: Props) {
  const { teams, status, error, reload } = useTeams();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const visibleTeams = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams.filter((t) => {
      if (onlyFavorites && !favorites.includes(t.id)) return false;
      if (!q) return true;
      return t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q);
    });
  }, [teams, query, onlyFavorites, favorites]);

  if (status === 'loading') {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading teams…</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.errorTitle}>Could not load teams</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={reload}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const emptyMessage =
    query.trim() !== ''
      ? `No teams match "${query.trim()}". Try a different name or city.`
      : onlyFavorites
      ? 'You have no favorites yet. Tap the ☆ on a team to add it.'
      : 'No teams available.';

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.search}
        placeholder="Search by team name or city"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggle, !onlyFavorites && styles.toggleActive]}
          onPress={() => setOnlyFavorites(false)}
        >
          <Text style={[styles.toggleText, !onlyFavorites && styles.toggleTextActive]}>
            All Teams ({teams.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggle, onlyFavorites && styles.toggleActive]}
          onPress={() => setOnlyFavorites(true)}
        >
          <Text style={[styles.toggleText, onlyFavorites && styles.toggleTextActive]}>
            ★ Favorites ({favorites.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visibleTeams}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={visibleTeams.length === 0 ? styles.emptyContainer : { paddingBottom: 24 }}
        ListEmptyComponent={<EmptyState title="Nothing to show" message={emptyMessage} />}
        renderItem={({ item }) => (
          <TeamCard
            team={item}
            favorite={isFavorite(item.id)}
            onPress={() => navigation.navigate('TeamDetail', { teamId: item.id })}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 16 },
  center: { alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, color: colors.muted },
  errorTitle: { fontSize: 18, fontWeight: '700', color: colors.danger },
  errorText: { color: colors.muted, marginTop: 6, textAlign: 'center' },
  retryBtn: { marginTop: 16, backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryText: { color: '#fff', fontWeight: '700' },
  search: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  toggleRow: { flexDirection: 'row', marginBottom: 12 },
  toggle: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  toggleActive: { backgroundColor: colors.primary },
  toggleText: { color: colors.text, fontWeight: '600' },
  toggleTextActive: { color: '#fff' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
});
