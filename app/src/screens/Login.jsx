import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Boto } from '../components/Button'
import { InputInfo } from '../components/PlaceHolder'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { storeData } from '../components/storage'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login ({valorUsuari,setValorUsuari,valorPWD,setValorPWD}) {
  const [usuari,setUsuari] = useState('');
  const [contrasenya, setContrasenya]= useState('');
  const navigation = useNavigation()

  useEffect(()=>{
    getData()
  },[])

  const getData = () => {
    try {
        AsyncStorage.getItem('userToken')
            .then(value => {
                if (value != null) {
                  console.log(value)
                  navigation.navigate('Empreses');
                }
            })
    } catch (error) {
        console.log(error);
    }
}

  const onSignPressed = () => {
    console.warn('Button pressed')
    navigation.navigate('Empreses')
    console.log(usuari)
    const postLogin = {
      "email": usuari,
      "password": contrasenya
    }
    axios.post('http://localhost:3001/api/login',postLogin).then(async response=>{
      console.log(response.data)
      var token = response.data
      storeData('userToken',JSON.stringify(token))

      console.log('Done.')
      console.log('User Registered!');

    }).catch(error => console.log(error))
  }

  return(    
        <View style={styles.container}>
          <Text>Verifain App</Text>
          <StatusBar style='auto' />
          
          <InputInfo 
            placeholder="Usuario"
            value={usuari}
            onChangeText={setUsuari}
            secureTextEntry={false}
          />
          <InputInfo 
            placeholder="Password"
            value={contrasenya}
            onChangeText={setContrasenya}
            secureTextEntry={true}
          />

          <Boto titol="Login" onPress={onSignPressed}></Boto>

        </View>
  )
    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})    