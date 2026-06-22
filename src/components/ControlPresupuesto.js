import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Circle } from 'react-native-svg'

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0)
    setGastado(totalGastado)
    setDisponible(Number(presupuesto) - totalGastado)
  }, [gastos, presupuesto])

  const porcentaje = Number(presupuesto) > 0 ? Math.min(100, Math.round((gastado / Number(presupuesto)) * 100)) : 0

  const formatearCantidad = (cantidad) => {
    return '$' + Number(cantidad).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  return (
    <View style={styles.tarjeta}>
      {/* Gráfico de Progreso Circular */}
      <View style={styles.contenedorGrafico}>
        <Svg width={180} height={180} viewBox="0 0 180 180">
          <Circle
            cx="90"
            cy="90"
            r="70"
            stroke="#F5F5F5"
            strokeWidth="12"
            fill="transparent"
          />
          <Circle
            cx="90"
            cy="90"
            r="70"
            stroke="#3B82F6"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray="439.8"
            strokeDashoffset={439.8 - (439.8 * porcentaje) / 100}
            strokeLinecap="round"
            rotation="-90"
            origin="90, 90"
          />
        </Svg>
        <View style={styles.porcentajeTextoContenedor}>
          <Text style={styles.porcentajeTexto}>{porcentaje}%</Text>
          <Text style={styles.porcentajeEtiqueta}>Gastado</Text>
        </View>
      </View>

      {/* Botón Reiniciar App */}
      <Pressable style={styles.botonReiniciar} onPress={resetearApp}>
        <Text style={styles.botonReiniciarTexto}>REINICIAR APP</Text>
      </Pressable>

      {/* Lista de Detalles de Presupuesto */}
      <View style={styles.contenedorTexto}>
        <View style={styles.filaTexto}>
          <Text style={styles.labelBlue}>Presupuesto: </Text>
          <Text style={styles.valor}>{formatearCantidad(presupuesto)}</Text>
        </View>

        <View style={styles.filaTexto}>
          <Text style={styles.labelBlue}>Disponible: </Text>
          <Text style={[styles.valor, disponible < 0 && styles.valorNegativo]}>
            {formatearCantidad(disponible)}
          </Text>
        </View>

        <View style={styles.filaTexto}>
          <Text style={styles.labelBlue}>Gastado: </Text>
          <Text style={styles.valor}>{formatearCantidad(gastado)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 30,
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
  contenedorGrafico: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  porcentajeTextoContenedor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  porcentajeTexto: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  porcentajeEtiqueta: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: 'bold',
    marginTop: -2,
  },
  botonReiniciar: {
    backgroundColor: '#db2777',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  botonReiniciarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  contenedorTexto: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  filaTexto: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  labelBlue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    width: 140,
  },
  valor: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#212121',
  },
  valorNegativo: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
})

export default ControlPresupuesto