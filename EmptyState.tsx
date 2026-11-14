import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', padding: 32 },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  message: { color: colors.muted, marginTop: 6, textAlign: 'center', fontSize: 15 },
});
