import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { supabase } from '../supabaseClient'
import { useRouter } from 'expo-router'

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (mounted) setUser(data?.session?.user ?? null)
      } catch (e) {
        // ignore
      }
    })()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      setLoading(false)
      if (error) {
        console.error('Sign out error', error.message)
        return
      }
      setUser(null)
      router.replace('/')
    } catch (err) {
      setLoading(false)
      console.error('Sign out exception', err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          {user ? `Signed in as ${user.email}` : 'Not signed in'}
        </Text>

        <View style={styles.buttonRow}>
          <Button
            title={user ? `Sign Out (${user.email})` : 'Sign Out'}
            onPress={handleSignOut}
          />
        </View>

        {loading && (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 800,
    padding: 24,
    borderRadius: 12,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    width: '100%',
  },
})
