import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Header />
      <NuevoPresupuesto />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 10,
    width: '100%',
  },
});
