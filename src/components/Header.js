import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={styles.Texto}>Planificador</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  Texto: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
    paddingTop: 20,
  },
})

export default Header