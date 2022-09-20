
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Boto } from '../components/Button'
import { InputInfo } from '../components/PlaceHolder';
import { useState } from 'react';


export default function Home () {
  const [idLocal,setIdLocal] = useState('');
  const navigation = useNavigation();

  const onSignPressed = () => {
    console.warn('Button pressed onSignedPressed')
    console.log(idLocal)
    navigation.navigate('Empreses')
  }
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <InputInfo
        placeholder="Añadir ID"
        value={idLocal}
        onChangeText={setIdLocal}
        secureTextEntry={false}
      />   
      <Boto titol="Return" onPress={onSignPressed}></Boto>

    </View>
  );
}



/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})    
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})   