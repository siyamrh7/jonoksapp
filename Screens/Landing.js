import React from 'react'
import { SafeAreaView,ScrollView,StyleSheet ,View,useWindowDimensions,Image,Text,TouchableOpacity} from 'react-native'
import { useEffect,useState } from 'react';
import axios from 'react-native-axios'

import AsyncStorage from '@react-native-async-storage/async-storage';
export const Landing = ({navigation}) => {
   const width=useWindowDimensions().width

   const getData=async()=>{
    const token = await AsyncStorage.getItem("token")
    await axios.get('http://104.131.87.91:2000/user', {
        headers: {
          'Authorization': token,
        }
      }).then(res=>{
          if(res.data.success){
            return navigation.navigate("Tabs")
          }
      }).catch(err=>console.log(err))
}

  useEffect(()=>{
AsyncStorage.getItem('token').then(res=>{
    if(res !==null){
     getData()
    }
}).catch(err=>console.warn(err))
  },[])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color:'white',position:'absolute',top:0,width:width,textAlign:'center',backgroundColor:'orange',marginHorizontal:10,padding:15,fontWeight:'bold',fontSize:18}}>JONOKS</Text>
<View style={{ padding:20,justifyContent:'center',alignItems:'center'}}>
    <View style={{...styles.box, width:width-20,height:120}}>
   <Image source={require('../images/workman.png')} style={{height:100,width:100}}/>
   <View >
       <Text style={{color:'gray'}}>Want to join as a Worker ?</Text>
       <TouchableOpacity style={{backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} onPress={()=>navigation.navigate("Signup1")}><Text style={{textAlign:'center',paddingVertical:7,color:'white'}}>Register Here</Text></TouchableOpacity>
       </View>
    </View>
    <View style={{...styles.box, width:width-20,height:120,marginTop:30}}>
   <View >
       <Text style={{color:'gray'}}>Want to join as a Buyer ?</Text>
       <TouchableOpacity style={{backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:10}} onPress={()=>navigation.navigate("Signup2")}><Text style={{textAlign:'center',paddingVertical:7,color:'white'}}>Register Here</Text></TouchableOpacity>
       </View>
       <Image source={require('../images/buyer.png')} style={{height:100,width:100}}/>
    </View>
    <TouchableOpacity style={{justifyContent:'center',width:width,alignItems:'center',marginTop:40}} onPress={()=>navigation.navigate("Signin")}><Text style={{fontWeight:'bold',color:'orange'}}>Already have an Acccount ?</Text></TouchableOpacity>
    </View>

        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
       justifyContent:'center',
       alignItems:'center',
       position:'relative'
    },
    box:{
        borderColor:"#ccc",
        borderWidth:2,
       flexDirection:'row',
       padding:10,
       justifyContent:'space-evenly',
       alignItems:'center',
       
    }

})