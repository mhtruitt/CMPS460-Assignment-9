import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Team } from '../types';
import { colors } from '../theme';

interface Props {
  team: Team;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export default function TeamCard({ team, favorite, onPress, onToggleFavorite }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{team.name}</Text>
        <Text style={styles.city}>{team.city}</Text>
        <Text
          style={[
            styles.badge,
            { backgroundColor: team.conference === 'AFC' ? colors.afc : colors.nfc },
          ]}
        >
          {team.conference}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.star}
        onPress={onToggleFavorite}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={favorite ? `Remove ${team.name} from favorites` : `Add ${team.name} to favorites`}
      >
        <Text style={[styles.starText, favorite && { color: colors.accent }]}>{favorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '700', color: colors.text },
  city: { fontSize: 15, color: colors.muted, marginTop: 2 },
  badge: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
  },
  star: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  starText: { fontSize: 32, color: colors.muted },
});
