
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Boto } from '../components/Button'

//https://www.npmjs.com/package/react-native-qrcode-scanner

export default function Home () {
  const navigation = useNavigation()
  const onSignPressed = () => {
    console.warn('Button pressed')
    navigation.navigate('Empreses')
  }
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Boto titol="Return" onPress={onSignPressed}></Boto>

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