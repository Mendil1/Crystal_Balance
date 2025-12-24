import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
// DateTimePicker for native platforms
import DateTimePicker from '@react-native-community/datetimepicker'
// Try to use native Picker where available; fall back to TextInput for simplicity
import { Picker } from '@react-native-picker/picker'
import { Picker } from '@react-native-picker/picker';

export default function TransactionScreen() {
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('expense') // 'income' or 'expense'
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)

  const categories = ['Food', 'Transport', 'Rent', 'Shopping', 'Other']

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transaction Screen</Text>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={String(amount)}
          onChangeText={(t) => {
            const num = Number(t)
            setAmount(isNaN(num) ? 0 : num)
          }}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Type</Text>
        {Platform.OS === 'web' ? (
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={webSelectStyle}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        ) : (
          <View style={styles.pickerWrap}>
            <Picker selectedValue={type} onValueChange={(v) => setType(v)}>
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
          </View>
        )}

        <Text style={styles.label}>Category</Text>
        {Platform.OS === 'web' ? (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={webSelectStyle}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        ) : (
          <View style={styles.pickerWrap}>
            <Picker selectedValue={category} onValueChange={(v) => setCategory(v)}>
              <Picker.Item label="Select category" value="" />
              {categories.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
        )}

        <Text style={styles.label}>Date</Text>
        {Platform.OS === 'web' ? (
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>{date || 'Select date'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date ? new Date(date) : new Date()}
                mode="date"
                display="default"
                onChange={(e, selected) => {
                  setShowDatePicker(false)
                  if (selected) {
                    const iso = selected.toISOString().split('T')[0]
                    setDate(iso)
                  }
                }}
              />
            )}
          </>
        )}

        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Add a note"
        />

        <View style={styles.buttonContainer}>
          <Button title="Add Transaction" onPress={() => {}} />
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </ScrollView>
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
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
})

// Inline style object for web <select> elements (react-native-web will accept)
const webSelectStyle = {
  width: '100%',
  padding: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
  marginBottom: 8,
}
