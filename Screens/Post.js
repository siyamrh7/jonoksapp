import React,{useEffect,useState} from 'react'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView ,View,Text,StyleSheet,useWindowDimensions,TouchableOpacity, ScrollView,Image,Alert,Modal} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
const Post = ({route,navigation}) => {
    const width=useWindowDimensions().width

  const [state,setState]=useState(null)

const {id,post}=route.params
const contact=async()=>{
    const token = await AsyncStorage.getItem("token")
    await axios.get('http://104.131.87.91:2000/contact', {
        headers: {
            'Authorization': token,
        }
    }).then(res => { 
        if(res.data.status){
            setState(post.user)
        }else{
Alert.alert('Failed',res.data.msg,[{text:"OK"},{text:'Buy Now',onPress:()=>navigation.navigate("Wallet")}])
        }
     }).catch(err => console.log(err))
}
useEffect(()=>{
if(state!==null){
    Alert.alert('Contact Info',`Name:- ${state.name},

Phone Number :- ${state.phone},

Email Address :- ${state.email},

Address :- ${state.address}`,[{text:'OK'},{text:"COPY DETAILS",onPress:()=>{Clipboard.setString(`Name:- ${state.name},

Phone Number :- ${state.phone},

Email Address :- ${state.email},

Address :- ${state.address}`)}}])
}
},[state])
const start=()=>{
    Alert.alert("Balance Deduction","By viewing hidden contact info's 100 coins will be deducted from your account",[{text:"Cancel"},{text:"Continue",onPress:()=>contact()}])
}
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={{flexDirection:"row",paddingHorizontal:10,alignItems:'center',marginTop:10}}>
                <Image source={require("../images/logo.png")} style={{height:50,width:50}} />
                <View style={{marginLeft:10}}>
                    <Text style={{fontWeight:'bold',color:'gray',fontSize:16}} >{post.user.name}</Text>
                    <Text style={{color:'gray'}} >{post.createdAt.toString('yyyy-MM-dd')}</Text>
                    </View>
            </View>
            <Image source={{uri:`http://104.131.87.91:2000/${post.image.path}`}} style={{width:width-10,alignSelf:'center',height:width/2,marginVertical:20}} resizeMode='contain' resizeMethod='scale' />
            <View style={{ marginHorizontal: 5 }}><Text style={{ textAlign: "center", color: "black" ,fontSize:16}}>{post.title}</Text>
                <Text style={{textAlign:'center',color:'gray',marginVertical:10}}>{post.description}</Text>     
                <TouchableOpacity onPress={start} style={{ backgroundColor: "orange", width: 120, padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 10 }}><Text style={{ color: "#fff" }}>CONTACT NOW</Text></TouchableOpacity>
                    </View>
                    </ScrollView>
                   
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative'
    }
})

export default Post
