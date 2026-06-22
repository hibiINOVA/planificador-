import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'

const FormularioGasto = ({ 
  handleGasto, 
  gastoEditar, 
  setGastoEditar, 
  setModalVisible, 
  guardarGasto, 
  eliminarGasto 
}) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')

  useEffect(() => {
    if (gastoEditar) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad.toString())
      setCategoria(gastoEditar.categoria)
    } else {
      setNombre('')
      setCantidad('')
      setCategoria('')
    }
  }, [gastoEditar])

  const handleSubmit = () => {
    if (nombre.trim() === '' || !cantidad || Number(cantidad) <= 0 || !categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    const datosGasto = { nombre, cantidad: Number(cantidad), categoria }

    if (gastoEditar) {
      // Edit Mode
      guardarGasto({
        ...datosGasto,
        id: gastoEditar.id,
        fecha: gastoEditar.fecha
      })
    } else {
      // Create Mode
      handleGasto(datosGasto)
    }

    setNombre('')
    setCantidad('')
    setCategoria('')
    setModalVisible(false)
    setGastoEditar(null)
  }

  const handleCancelar = () => {
    setNombre('')
    setCantidad('')
    setCategoria('')
    setModalVisible(false)
    setGastoEditar(null)
  }

  return (
    <View style={styles.formulario}>
      {/* Botones de acción arriba */}
      {gastoEditar ? (
        <View style={styles.contenedorBotones}>
          <Pressable style={[styles.botonHeader, styles.botonCancelar]} onPress={handleCancelar}>
            <Text style={styles.botonTextoHeader}>CANCELAR</Text>
          </Pressable>
          <Pressable style={[styles.botonHeader, styles.botonEliminar]} onPress={() => eliminarGasto(gastoEditar.id)}>
            <Text style={styles.botonTextoHeader}>ELIMINAR</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.botonCancelarFull} onPress={handleCancelar}>
          <Text style={styles.botonCancelarTextoFull}>CANCELAR</Text>
        </Pressable>
      )}

      {/* Tarjeta del Formulario */}
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>
          {gastoEditar ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>

        <Text style={styles.inputLabel}>NOMBRE GASTO</Text>
        <TextInput
          placeholder='Nombre del gasto. ej. Comida'
          placeholderTextColor="#bcbcbc"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />

        <Text style={styles.inputLabel}>CANTIDAD GASTO</Text>
        <TextInput
          keyboardType='numeric'
          placeholder='Cantidad del gasto. ej. 300'
          placeholderTextColor="#bcbcbc"
          value={cantidad}
          onChangeText={setCantidad}
          style={styles.input}
        />

        <Text style={styles.inputLabel}>CATEGORÍA GASTO</Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(valor) => setCategoria(valor)}
          style={styles.picker}
        >
          <Picker.Item label="-- Seleccione --" value="" />
          <Picker.Item label="Ahorro" value="ahorro" />
          <Picker.Item label="Comida" value="comida" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Gastos Varios" value="gastos" />
          <Picker.Item label="Ocio" value="ocio" />
          <Picker.Item label="Salud" value="salud" />
          <Picker.Item label="Suscripciones" value="suscripciones" />
        </Picker>

        <Pressable style={styles.botonAgregar} onPress={handleSubmit}>
          <Text style={styles.botonAgregarTexto}>
            {gastoEditar ? 'GUARDAR CAMBIOS GASTO' : 'AGREGAR GASTO'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formulario: {
    paddingBottom: 40,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
  },
  botonHeader: {
    paddingVertical: 14,
    borderRadius: 4,
    width: '48%',
  },
  botonCancelar: {
    backgroundColor: '#db2777',
  },
  botonEliminar: {
    backgroundColor: '#EF4444',
  },
  botonTextoHeader: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonCancelarFull: {
    backgroundColor: '#db2777',
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 4,
  },
  botonCancelarTextoFull: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contenedor: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 35,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    color: '#64748B',
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 8,
    paddingLeft: 4,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  botonAgregar: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  botonAgregarTexto: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})

export default FormularioGasto