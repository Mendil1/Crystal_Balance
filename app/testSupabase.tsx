import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../supabaseClient';

export default function TestSupabase() {
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
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Supabase Test</Text>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {profiles.map((p) => (
        <View key={p.id} style={{ marginVertical: 5 }}>
          <Text>ID: {p.id}</Text>
          <Text>Email: {p.email}</Text>
          <Text>Full Name: {p.full_name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
