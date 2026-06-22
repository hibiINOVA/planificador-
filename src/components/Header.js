import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={styles.Texto}>Planificador de Gastos</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  Texto: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
})

export default Header