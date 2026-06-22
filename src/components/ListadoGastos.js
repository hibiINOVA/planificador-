import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

const ListadoGastos = ({ gastos, filtro, prepararEdicion }) => {
  const renderIcon = (categoria) => {
    switch (categoria) {
      case 'ahorro':
        return <FontAwesome5 name="piggy-bank" size={24} color="#fff" />
      case 'comida':
        return <MaterialCommunityIcons name="apple" size={26} color="#fff" />
      case 'casa':
        return <MaterialCommunityIcons name="home" size={26} color="#fff" />
      case 'gastos':
        return <FontAwesome5 name="cash-register" size={22} color="#fff" />
      case 'ocio':
        return <MaterialCommunityIcons name="gamepad-variant" size={26} color="#fff" />
      case 'salud':
        return <FontAwesome5 name="plus" size={24} color="#fff" />
      case 'suscripciones':
        return <MaterialCommunityIcons name="play-circle-outline" size={30} color="#fff" />
      default:
        return <FontAwesome5 name="dollar-sign" size={24} color="#fff" />
    }
  }

  const getBgColor = (categoria) => {
    switch (categoria) {
      case 'ahorro': return '#10B981' // Green
      case 'comida': return '#db2777' // Rose/Magenta
      case 'casa': return '#F59E0B' // Orange
      case 'gastos': return '#64748B' // Slate
      case 'ocio': return '#EAB308' // Yellow
      case 'salud': return '#EF4444' // Red
      case 'suscripciones': return '#8B5CF6' // Purple
      default: return '#6B7280' // Grey
    }
  }

  const getCategoriaLabel = (categoria) => {
    switch (categoria) {
      case 'ahorro': return 'Ahorro'
      case 'comida': return 'Comida'
      case 'casa': return 'Casa'
      case 'gastos': return 'Gastos Varios'
      case 'ocio': return 'Ocio'
      case 'salud': return 'Salud'
      case 'suscripciones': return 'Suscripciones'
      default: return 'Gasto'
    }
  }

  const formatearFecha = (fecha) => {
    const f = new Date(fecha)
    return f.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatearCantidad = (cantidad) => {
    return '$' + Number(cantidad).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  // Filtrar gastos
  const gastosFiltrados = filtro 
    ? gastos.filter(gasto => gasto.categoria === filtro)
    : gastos

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {gastosFiltrados.length === 0 ? (
        <Text style={styles.noGastos}>
          {filtro ? 'No hay gastos en esta categoría' : 'No Hay Gastos'}
        </Text>
      ) : (
        gastosFiltrados.map((gasto) => (
          <Pressable 
            key={gasto.id} 
            style={styles.tarjetaGasto}
            onLongPress={() => prepararEdicion(gasto)}
            delayLongPress={5000}
          >
            <View style={styles.contenidoGasto}>
              {/* Icono circular con color según categoría */}
              <View style={[styles.iconoContenedor, { backgroundColor: getBgColor(gasto.categoria) }]}>
                {renderIcon(gasto.categoria)}
              </View>
              
              {/* Detalles del gasto */}
              <View style={styles.textoContenedor}>
                <Text style={styles.categoria}>{getCategoriaLabel(gasto.categoria)}</Text>
                <Text style={styles.nombre}>{gasto.nombre}</Text>
                <Text style={styles.fecha}>{formatearFecha(gasto.fecha)}</Text>
              </View>
            </View>
            
            {/* Monto del gasto */}
            <Text style={styles.cantidad}>
              {formatearCantidad(gasto.cantidad)}
            </Text>
          </Pressable>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 80, // Space to scroll past FAB
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 20,
    textAlign: 'center',
  },
  noGastos: {
    textAlign: 'center',
    fontSize: 18,
    color: '#94A3B8',
    marginTop: 20,
    fontWeight: 'bold',
  },
  tarjetaGasto: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  contenidoGasto: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconoContenedor: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textoContenedor: {
    flex: 1,
  },
  categoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 14,
    color: '#db2777', // Magenta/pink color for the date
    fontWeight: 'bold',
    marginTop: 2,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
})

export default ListadoGastos
