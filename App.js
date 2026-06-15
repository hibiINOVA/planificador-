import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';

export default function App() {
  const [presupuesto, setPresupuesto] = useState('')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])

  const handlePresupuesto = () => {
    if (presupuesto > 0) {
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'Presupuesto no válido')
    }
  }

  const handleGasto = (nombre, cantidad) => {
    const nuevoGasto = { id: Date.now(), nombre, cantidad: Number(cantidad) }
    setGastos([...gastos, nuevoGasto])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        
        <View style={styles.header}>
          <Header />
        </View>

        <View style={styles.contenido}>
          {isValidPresupuesto ? (
            <>
              <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
              <FormularioGasto handleGasto={handleGasto} />
            </>
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handlePresupuesto={handlePresupuesto}
            />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#1E3A8A',
    height: 160,
    paddingTop: 20,
    alignItems: 'center',
  },
  contenido: {
    flex: 1,
    marginTop: -20, 
  },
});