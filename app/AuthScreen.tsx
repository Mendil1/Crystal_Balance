import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { supabase } from '../supabaseClient'
import { useRouter } from 'expo-router'

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()

  const toggleMode = () => setIsLogin(prev => !prev)

  const handleSubmit = async () => {
    setLoading(true)
    setMessage(null)
    setMessageType(null)

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        if (error) {
          setMessage(error.message)
          setMessageType('error')
        } else {
          setMessage('Login successful!')
          setMessageType('success')
          console.log('Login data', data)
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
          if (!sessionError) setUser(sessionData?.session?.user ?? null)
          if (!sessionError) router.replace('/dashboard')
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        setLoading(false)
        if (error) {
          setMessage(error.message)
          setMessageType('error')
        } else {
          setMessage('Sign up successful!')
          setMessageType('success')
          console.log('Sign up data', data)
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
          if (!sessionError) setUser(sessionData?.session?.user ?? null)
          if (!sessionError) router.replace('/dashboard')
        }
      }
    } catch (err: any) {
      setLoading(false)
      const text = err?.message ? err.message : String(err)
      setMessage(text)
      setMessageType('error')
    }
  }

  useEffect(() => {
    // Get current session on mount
    let mounted = true
    ;(async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        if (mounted) setUser(sessionData?.session?.user ?? null)
      } catch (e) {
        // ignore
      }
    })()

    // Subscribe to auth changes to keep session in sync
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user])

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleSubmit} />
        </View>

        {loading && (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator size="small" />
          </View>
        )}

        {message ? (
          <Text
            style={[
              styles.message,
              messageType === 'error' ? styles.messageError : styles.messageSuccess,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <TouchableOpacity onPress={toggleMode} style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
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
    maxWidth: 480,
    padding: 24,
    borderRadius: 12,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 12,
  },
  toggleContainer: {
    marginTop: 16,
  },
  toggleText: {
    color: 'blue',
    textAlign: 'center',
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
  messageSuccess: {
    color: 'green',
  },
  messageError: {
    color: 'red',
  },
})
