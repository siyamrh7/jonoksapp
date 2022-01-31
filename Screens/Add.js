import React,{useState} from 'react'
import { SafeAreaView,Text,View ,TouchableOpacity,TextInput,StyleSheet} from 'react-native'

const Add = ({navigation}) => {
    const [singleFile, setSingleFile] = useState(null);

 
    return (
        <SafeAreaView>
<TouchableOpacity style={{backgroundColor:"orange",padding:12,marginBottom:1}} onPress={()=>navigation.navigate("CreatePost")}><Text style={{color:"#fff",fontWeight:"bold",textAlign:"center"}}>Create New Post</Text></TouchableOpacity>
<TouchableOpacity style={{backgroundColor:"orange",padding:12}} onPress={()=>navigation.navigate("CreateJob")}><Text style={{color:"#fff",fontWeight:"bold",textAlign:'center'}}>Post New Job</Text></TouchableOpacity>

<View>
    
</View>
        </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    buttonStyle: {
      backgroundColor: 'orange',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
  });
export default Add
