import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../screens/Login'
import Modificacions from '../screens/Modificacions'
import NovaEmpresa from '../screens/NovaEmpresa'
import PwdEliminar from '../screens/PwdEliminarEmpresa'
import EliminarEmpresa from '../screens/EliminarEmpresa'
import Empreses from '../screens/Empreses'
import Home from '../screens/Home'
import Fitxar from '../screens/Fitxar'
import FitxatgeManual from '../screens/FitxatgeManual'
import FitxatgeQR from '../screens/FitxatgeQR'


const Stack= createNativeStackNavigator();

const Navigation = () => {
      return(
            <NavigationContainer>
                  {/*<Stack.Navigator screenOptions={{headerShown:false}}>*/}
                  <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Modificacions" component={Modificacions}/>
                        <Stack.Screen name="NovaEmpresa" component={NovaEmpresa}/>
                        <Stack.Screen name="PwdEliminar" component={PwdEliminar}/>
                        <Stack.Screen name="EliminarEmpresa" component={EliminarEmpresa}/>
                        <Stack.Screen name="Empreses" component={Empreses}/>
                        <Stack.Screen name="Home" component={Home}/>
                        <Stack.Screen name="Fitxar" component={Fitxar}/>
                        <Stack.Screen name="FitxatgeManual" component={FitxatgeManual}/>
                        <Stack.Screen name="FitxatgeQR" component={FitxatgeQR}/>
                  </Stack.Navigator>
            </NavigationContainer>
      )
}

export default Navigation