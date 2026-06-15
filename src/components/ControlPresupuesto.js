import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0)
    setGastado(totalGastado)
    setDisponible(Number(presupuesto) - totalGastado)
  }, [gastos, presupuesto])

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.subtitulo}>Progreso de Gastos (Próximamente)</Text>
      
      <View style={styles.filaTexto}>
        <Text style={styles.labelBlue}>Presupuesto: </Text>
        <Text style={styles.valor}>${presupuesto}</Text>
      </View>

      <View style={styles.filaTexto}>
        <Text style={styles.labelBlue}>Disponible: </Text>
        <Text style={styles.valor}>${disponible}</Text>
      </View>

      <View style={styles.filaTexto}>
        <Text style={styles.labelBlue}>Gastado: </Text>
        <Text style={styles.valor}>${gastado}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 35,
    paddingHorizontal: 25,
    marginHorizontal: 16,
    marginTop: -40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  subtitulo: {
    color: '#708090',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
  },
  filaTexto: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  labelBlue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  valor: {
    fontSize: 20,
    fontWeight: '500',
    color: '#212121',
  },
})

export default ControlPresupuesto