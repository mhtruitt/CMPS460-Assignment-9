import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../types';
import { colors } from '../theme';

export default function PlayerRow({ player }: { player: Player }) {
  return (
    <View style={styles.row}>
      <View style={styles.numberCircle}>
        <Text style={styles.number}>{player.number}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.position}>{player.position}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  numberCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  number: { color: '#fff', fontWeight: '700', fontSize: 17 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  position: { fontSize: 14, color: colors.muted, marginTop: 2 },
});
