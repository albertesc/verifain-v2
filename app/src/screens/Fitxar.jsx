
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Boto } from '../components/Button'


export default function Home () {
  const navigation = useNavigation()
  const toQRmode = () => {
    console.warn('Button pressed')
    navigation.navigate('FitxatgeQR')
  }
  const toManualMode = () => {
    console.warn('Button pressed')
    navigation.navigate('FitxatgeManual')
  }
  const goBack = () => {
    console.warn('Button pressed')
    navigation.navigate('Empreses')
  }
  return (
    <View style={styles.container}>
      <Text>Vas a hacer un fichaje route.params.accioSel</Text>
      <Text>Escoge un método de fichaje</Text>
      <Boto titol="CÓDIGO QR" onPress={toQRmode}></Boto>
      <Boto titol="MANUAL" onPress={toManualMode}></Boto>
      <Boto titol="ATRÁS" onPress={goBack}></Boto>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})    