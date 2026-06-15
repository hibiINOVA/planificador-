import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'

const FormularioGasto = ({ handleGasto }) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')

  const handleSubmit = () => {
    if (nombre.trim() === '' || !cantidad || Number(cantidad) <= 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    handleGasto(nombre, cantidad)
    setNombre('')
    setCantidad('')
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Nuevo Gasto</Text>

      <Text style={styles.inputLabel}>NOMBRE GASTO</Text>
      <TextInput
        placeholder='Ej. Comida, Transporte, Ropa'
        placeholderTextColor="#bcbcbc"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <Text style={styles.inputLabel}>CANTIDAD GASTO</Text>
      <TextInput
        keyboardType='numeric'
        placeholder='Ej. 300'
        placeholderTextColor="#bcbcbc"
        value={cantidad}
        onChangeText={setCantidad}
        style={styles.input}
      />

      <Pressable style={styles.boton} onPress={handleSubmit}>
        <Text style={styles.btnTexto}>AGREGAR GASTO</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  tituloPrincipal: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 8,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  boton: {
    marginTop: 10,
    backgroundColor: '#0A2540',
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnTexto: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})

export default FormularioGasto