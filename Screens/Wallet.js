import React,{useEffect, useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet ,ScrollView,Alert} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Wallet = ({navigation}) => {


    const [user,setUser]=useState(null)
    const getUser=async()=>{
        const token = await AsyncStorage.getItem("token")
        await axios.get('http://104.131.87.91:2000/user', {
            headers: {
              'Authorization': token,
            }
          }).then(res=>{
              if(res.data.success){
                return setUser(res.data.msg)
              }
          }).catch(err=>console.log(err))
    }
    
      useEffect(()=>{
    AsyncStorage.getItem('token').then(res=>{
        if(res !==null){
         getUser()
        }
    }).catch(err=>console.warn(err))
      },[])

      useFocusEffect(
        React.useCallback(() => {
         getUser()
        }, [])
      );
     
      
      useEffect(()=>{
          if(user !==null){
              if(user.coins<=100){
              Alert.alert("Low Balance","Your accounr balance is low, Please creadit your account",[{text:"Continue"}])
          }
  }
      },[user])
      if(user===null)return null
    return (
        <SafeAreaView>
            <View style={styles.head}>
                <Text style={styles.head_txt}>Hi, {user.name}</Text>
            </View>
            <View style={styles.flexx}>
                <View style={styles.flex}>
           
                    <Text style={{color:'black',fontWeight:'bold'}}>Your Account</Text>
                    <Text style={{color:'black',fontWeight:'bold'}}>Wallet Ballance</Text>
                </View>
                <View style={styles.flex}>
           
           <Icon name="coins" size={30} color="orange" />
           
                <Text style={styles.bolded}>{user.coins}</Text>
       </View>
            </View>
                <Text style={{color:'black',fontWeight:'bold',paddingTop:20,paddingHorizontal:20}}>Coins Pricing</Text>
            <ScrollView >
<View style={{...styles.flexx,marginTop:10,paddingVertical:10}}><View style={{flexDirection:'row',alignItems:'center'}}><Icon name="coins" size={30} color="orange" /><Text style={{color:'orange',marginLeft:10,color:'black'}}>500 coins</Text></View><View><Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>₦500</Text><Text style={{color:'white',fontWeight:'bold',backgroundColor:'orange',textAlign:'center',padding:5,paddingHorizontal:15,borderRadius:5}} onPress={()=>navigation.navigate('Pay',{amount:'500',coins:500,user:user})} >BUY</Text></View></View>
<View style={{...styles.flexx,marginTop:10,paddingVertical:10}}><View style={{flexDirection:'row',alignItems:'center'}}><Icon name="coins" size={30} color="orange" /><Text style={{color:'orange',marginLeft:10,color:'black'}}>800 coins</Text></View><View><Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>₦750</Text><Text style={{color:'white',fontWeight:'bold',backgroundColor:'orange',textAlign:'center',padding:5,paddingHorizontal:15,borderRadius:5}} onPress={()=>navigation.navigate('Pay',{amount:'750',coins:800,user:user})} >BUY</Text></View></View>
<View style={{...styles.flexx,marginTop:10,paddingVertical:10}}><View style={{flexDirection:'row',alignItems:'center'}}><Icon name="coins" size={30} color="orange" /><Text style={{color:'orange',marginLeft:10,color:'black'}}>1100 coins</Text></View><View><Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>₦1000</Text><Text style={{color:'white',fontWeight:'bold',backgroundColor:'orange',textAlign:'center',padding:5,paddingHorizontal:15,borderRadius:5}} onPress={()=>navigation.navigate('Pay',{amount:'1000',coins:1100,user:user})}>BUY</Text></View></View>
<View style={{...styles.flexx,marginTop:10,paddingVertical:10}}><View style={{flexDirection:'row',alignItems:'center'}}><Icon name="coins" size={30} color="orange" /><Text style={{color:'orange',marginLeft:10,color:'black'}}>1700 coins</Text></View><View><Text style={{color:'black',fontWeight:'bold',textAlign:'center'}}>₦1500</Text><Text style={{color:'white',fontWeight:'bold',backgroundColor:'orange',textAlign:'center',padding:5,paddingHorizontal:15,borderRadius:5}} onPress={()=>navigation.navigate('Pay',{amount:'1500',coins:1700,user:user})}>BUY</Text></View></View>


            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color:'black'
    },
    head: {
        backgroundColor: 'orange',
        textAlign: 'center',
        paddingVertical: 15
    },
    head_txt: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
        textAlign: 'center'
    },
    flex: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexx: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical:20,
        borderColor:'#ccc',
        borderWidth:2,
        color:'black'
    },
    bolded: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'orange'
    }
})
export default Wallet
