import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'

const NuevoPresupuesto = () => {
  const [presupuesto, setPresupuesto] = useState('')

  const handleSubmit = () => {
    if (presupuesto > 0) {
      console.log('Es un presupuesto valido')
    } else {
      Alert.alert('Error', 'Presupuesto no valido')
    }
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Agregar presupuesto</Text>
      <TextInput
        keyboardType='numeric'
        placeholder='Agrega tu presupuesto. ej: 300'
        placeholderTextColor="#bababa"
        value={presupuesto}
        onChangeText={setPresupuesto}
        style={styles.input}
      />
      <Pressable style={styles.boton} onPress={handleSubmit}>
        <Text style={styles.btnTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    label: {
    textAlign: 'center',
    fontSize: 40,
    color: '#3b82f6',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 5,
  },
  btnTexto: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})

export default NuevoPresupuesto