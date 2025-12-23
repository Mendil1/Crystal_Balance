import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient'; // Adjust path if needed

export default function App() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) setError(error.message);
      else setProfiles(data || []);
    }

    fetchProfiles();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Supabase Test</Text>
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {profiles.map((p) => (
        <View key={p.id} style={styles.profile}>
          <Text>ID: {p.id}</Text>
          <Text>Email: {p.email}</Text>
          <Text>Full Name: {p.full_name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
  profile: { marginBottom: 15, padding: 10, borderWidth: 1, borderRadius: 8 },
});
