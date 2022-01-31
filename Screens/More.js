import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, SafeAreaView,Text,View ,BackHandler,Image,Alert} from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'react-native-axios'
const More = ({navigation}) => {
    const logout=async()=>{
       await AsyncStorage.removeItem("token")
       BackHandler.exitApp()
    }
    const [user, setUser] = useState(null)
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token")
        await axios.get('http://104.131.87.91:2000/user', {
            headers: {
                'Authorization': token,
            }
        }).then(res => {
            if (res.data.success) {
                return setUser(res.data.msg)
            }
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        AsyncStorage.getItem('token').then(res => {
            if (res !== null) {
                getUser()
            }
        }).catch(err => console.warn(err))
    }, [])
    useFocusEffect(
        React.useCallback(() => {
         getUser()
        }, [])
      );
    if(user===null){
        return null
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <View style={{marginTop:10}}>
            <View style={{flexDirection:"row",alignItems:'center',margin:10}}>
                <Image source={require("../images/logo.png")} style={{height:50,width:50}} />
                <View style={{marginLeft:10}}>
                    <Text style={{fontWeight:'bold',color:'black',fontSize:16}} >{user.name}</Text>
                    <Text style={{color:'gray'}} >{user.email}</Text>
                    </View>
            </View>
           
                <View style={{marginBottom:20}}>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Icon name="add-business" size={26} color="orange" />
                <Text onPress={()=>navigation.navigate("MyPosts",{Posts:user.posts})} style={{fontSize:15,color:'black',marginLeft:20}}>My Posts</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Icon name="add-business" size={26} color="orange" />
                <Text onPress={()=>navigation.navigate("MyJobs",{Jobs:user.jobs})} style={{fontSize:15,color:'black',marginLeft:20}}>My Jobs</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Icon name="privacy-tip" size={26} color="orange" />
                <Text onPress={()=>navigation.navigate("Changepass")} style={{fontSize:15,color:'black',marginLeft:20}}>Change Password</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Icon name="privacy-tip" size={26} color="orange" />
                <Text onPress={()=>navigation.navigate("PrivacyPolicy")} style={{fontSize:15,color:'black',marginLeft:20}}>Privacy Policy</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Ionicons name="md-newspaper-outline" size={24} color="orange" />
                <Text onPress={()=>navigation.navigate("TermsCon")} style={{fontSize:15,color:'black',marginLeft:20}}>Terms & Conditions</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',paddingLeft:20,marginVertical:10}}>
                <Icon name="add-business" size={26} color="orange" />
                <Text onPress={()=>navigation.navigate("About")} style={{fontSize:15,color:'black',marginLeft:20}}>About Jonoks</Text>
                </View>
            </View>
                
<Button onPress={logout} color="orange" title="logout"/>
            </View>
        </SafeAreaView>
        
    )
}

export default More
