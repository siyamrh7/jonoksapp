import React,{useEffect,useState} from 'react'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView ,View,Text,StyleSheet,Image,useWindowDimensions,TouchableOpacity, ScrollView,Alert} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
const Job = ({route,navigation}) => {
    const width=useWindowDimensions().width

const [state,setState]=useState(null)
const {job,id}=route.params
 
const contact=async()=>{
    const token = await AsyncStorage.getItem("token")
    await axios.get('http://104.131.87.91:2000/contact', {
        headers: {
            'Authorization': token,
        }
    }).then(res => { 
        if(res.data.status){
            setState(job.user)
        }else{
Alert.alert('Failed',res.data.msg,[{text:"OK"},{text:'Buy Now',onPress:()=>navigation.navigate("Wallet")}])
        }
     }).catch(err => console.log(err))
}
useEffect(()=>{
if(state!==null){
    Alert.alert('Contact Info',`Name:- ${state.name},

Contact Number :- ${job.number},
    
Additional Number :- ${state.phone},

Email Address :- ${state.phone},

Location :- ${job.address}`,[{text:'OK'},{text:"COPY DETAILS",onPress:()=>{Clipboard.setString(`Name:- ${state.name},

Contact Number :- ${job.number},
    
Additional Number :- ${state.phone},

Email Address :- ${state.phone},

Location :- ${job.address}`)}}])
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
                    <Text style={{fontWeight:'bold',color:'gray',fontSize:16}} >{job.user.name}</Text>
                    <Text style={{color:'gray'}} >{job.createdAt}</Text>
                    </View>
            </View>
            <Image source={{uri:`http://104.131.87.91:2000/${job.image.path}`}} style={{width:width-10,alignSelf:'center',height:width/2,marginVertical:20}} resizeMode='contain' resizeMethod='scale' />
            <View style={{ marginHorizontal: 5 }}><Text style={{ paddingHorizontal:10,textAlign: "center", color: "black" ,fontSize:16}}>{job.title}</Text>
                <Text style={{textAlign:'center',color:'gray',marginVertical:10}}>{job.description}</Text>     
                    </View>
                  
                        <View style={{width:width,flexDirection:"row",justifyContent:'space-between'}}>
                            <View style={{paddingHorizontal:20}}>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Job Category</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Job Experience</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Gender</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Salary</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>City</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Country</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Contact Number</Text>
                                <Text style={{marginVertical:10, fontWeight:'bold',color:'orange',fontSize:16}}>Location</Text>

                            </View>
                            <View style={{paddingHorizontal:20}}>
                                <Text style={{marginVertical:10,color:'black'}}>{job.category}</Text>
                                <Text style={{marginVertical:10,color:'black'}}>{job.experience}</Text>
                                <Text style={{marginVertical:10,color:'black'}}>{job.gender}</Text>
                                <Text style={{marginVertical:10,color:'black'}}>{job.salary} ₦</Text>
                                <Text style={{marginVertical:10,color:'black'}}>{job.city}</Text>
                                <Text style={{marginVertical:10,color:'black'}}>{job.country}</Text>
                                <Text onPress={start} style={{marginVertical:10,color:'orange',fontWeight:'bold'}}>Hidden</Text>
                                <Text onPress={start} style={{marginVertical:10,color:'orange',fontWeight:'bold'}}>Hidden</Text>

                            </View>
                        </View>
                        
                <TouchableOpacity onPress={start} style={{ backgroundColor: "orange", width: 120, padding: 10, borderRadius: 5, alignSelf: 'center', marginVertical: 20 }}><Text style={{ color: "#fff" }}>CONTACT NOW</Text></TouchableOpacity>
                    </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})

export default Job
