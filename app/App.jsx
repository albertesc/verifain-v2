import React from 'react'
import { StyleSheet,ImageBackground,SafeAreaView, View } from 'react-native'
import Navigation from './src/navigation'
import Backg from './assets/background.png'

export default function App () {

    return(
      <SafeAreaView style={styles.root}>
        <ImageBackground 
          source={Backg}>
            
          <View style={styles.body}>
            <Navigation style={styles.root}/>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  

}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 50,
    backgroundColor:'rgba(0,0,0,0)'
  },
  body:{
    paddingHorizontal:50,
    minHeight:'100vh',
    backgroundColor:'rgba(0,0,0,0)'
  }
})  

