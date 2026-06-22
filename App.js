import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Alert, ScrollView, Modal, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Filtro from './src/components/Filtro';
import ListadoGastos from './src/components/ListadoGastos';

export default function App() {
  const [presupuesto, setPresupuesto] = useState('')
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [gastoEditar, setGastoEditar] = useState(null)

  const handlePresupuesto = () => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor')
    }
  }

  const handleGasto = (gasto) => {
    const nuevoGasto = {
      ...gasto,
      id: Date.now(),
      fecha: Date.now()
    }
    setGastos([...gastos, nuevoGasto])
  }

  const prepararEdicion = (gasto) => {
    setGastoEditar(gasto)
    setModalVisible(true)
  }

  const guardarGasto = (gastoActualizado) => {
    const gastosActualizados = gastos.map(gastoState => 
      gastoState.id === gastoActualizado.id ? gastoActualizado : gastoState
    )
    setGastos(gastosActualizados)
    setGastoEditar(null)
  }

  const eliminarGasto = (id) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Esta acción no se puede deshacer',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
            setGastos(gastosActualizados)
            setModalVisible(false)
            setGastoEditar(null)
          }
        }
      ]
    )
  }

  const resetearApp = () => {
    Alert.alert(
      '¿Deseas reiniciar la app?',
      'Esto eliminará tu presupuesto y gastos de forma permanente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, reiniciar',
          onPress: () => {
            setPresupuesto('')
            setIsValidPresupuesto(false)
            setGastos([])
            setFiltro('')
            setGastoEditar(null)
          }
        }
      ]
    )
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
              <ControlPresupuesto 
                presupuesto={presupuesto} 
                gastos={gastos} 
                resetearApp={resetearApp}
              />
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                filtro={filtro}
                prepararEdicion={prepararEdicion}
              />
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

      {/* Floating Action Button (FAB) */}
      {isValidPresupuesto && (
        <Pressable 
          style={styles.fab}
          onPress={() => {
            setGastoEditar(null)
            setModalVisible(true)
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      )}

      {/* Expense Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false)
          setGastoEditar(null)
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView>
            <FormularioGasto 
              handleGasto={handleGasto}
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              setModalVisible={setModalVisible}
              guardarGasto={guardarGasto}
              eliminarGasto={eliminarGasto}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
    backgroundColor: '#3B82F6',
    height: 160,
    paddingTop: 20,
    alignItems: 'center',
  },
  contenido: {
    flex: 1,
    marginTop: -20, 
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#38BDF8',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: -4, // Adjust vertical center
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
});