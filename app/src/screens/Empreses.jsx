
import { React, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Boto } from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getData } from '../components/storage';
//https://www.youtube.com/watch?v=CmQIMrGnBDs
export default function Home () {
  const navigation = useNavigation()
  const [empresa, setEmpresa] = useState('')

  useEffect(()=>{
    getData()
  },[])
  const getData = () => {
    try {
        AsyncStorage.getItem('userToken')
            .then(value => {
                if (value != null) {
                  let jsonValue= JSON.parse(value)
                  console.log(jsonValue.companyName)
                  setEmpresa(jsonValue.companyName)
                  
                }
            })
    } catch (error) {
        console.log(error);
    }
  }
  


  const newEmpresaPressed = () => {
    console.warn('Button pressed')
    navigation.navigate('NovaEmpresa')
  }
  const EmpresaPressed = () => {
    console.warn('Button pressed')
    navigation.navigate('Fitxar')
    var hola=getData('userToken')
    //console.log(hola)

    /*
    async()=>{
           await getData('userToken')
           console.log('useEffect',await getData('userToken'))
    };
    
    const getUser = async () => {
      try {
        const userData = JSON.parse(await AsynStorage.getItem("@user_Token"))
        console.log("hola")
        console.log(userData)
        console.log("fet")
      } catch (error) {
       console.log("error"); 
      }
    }
    console.log(getUser)
    console.log(userData())
    */
  }
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Boto titol={empresa} onPress={EmpresaPressed}></Boto>
      <Boto titol="Nova Empresa" onPress={newEmpresaPressed}></Boto>

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