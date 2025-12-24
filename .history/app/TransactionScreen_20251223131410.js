import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TransactionScreen() {
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('expense') // 'income' or 'expense'
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transaction Screen</Text>
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
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
})
