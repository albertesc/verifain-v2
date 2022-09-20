import { StyleSheet, Text,Pressable} from 'react-native'

export function Boto({titol,onPress,...props}){
      return(
            <Pressable onPress={onPress} style={styles.tipusBoto}>
                  <Text style={styles.tipusText} {...props}>{titol}</Text>
            </Pressable>
      )
      
}


const styles = StyleSheet.create({
      tipusBoto:{
            backgroundColor:'orange',
            width:'100%',
            padding:15,
            marginVertical:5,
            alignItems:'center',
            borderRadius:5,
            marginHorizontal:20


      },
      tipusText:{
            fontWeight:'bold',
            color:'white'
      }
    })   