import { StyleSheet, View, TextInput} from 'react-native'

export function InputInfo({valor,setValor,secureTextEntry,...props}){
      return(
            
            <View style={styles.llocText}>
                  <TextInput  placeholder='placeholder'
                              value={valor}
                              onChangeText={setValor}
                              secureTextEntry={secureTextEntry}
                              style={styles.input}
                              {...props}>
                        
                  </TextInput>
            </View>

      )
}

const styles = StyleSheet.create({
      llocText:{
        width:'100%',
        paddingHorizontal:20
      },
      input:{backgroundColor:'white',
        width:'100%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:5
        }
    })   