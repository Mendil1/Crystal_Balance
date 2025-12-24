import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = () => setIsLogin(prev => !prev)

  const handleSubmit = () => {
    // Placeholder: no auth logic yet
    console.log(isLogin ? 'Login' : 'Sign Up', { email, password })
  }

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
})
