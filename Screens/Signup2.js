import React,{useState,useEffect} from 'react'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView, KeyboardAvoidingView, TextInput,ScrollView, Text, TouchableOpacity, StyleSheet, View, useWindowDimensions ,Alert} from 'react-native'
const Signup2 = ({ navigation }) => {
    const width = useWindowDimensions().width
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [phone,setPhone]=useState("")
const [address,setAddress]=useState("")
const [password,setPassword]=useState("")

const submitHandle=async()=>{
    var data={name:name,email:email,phone:phone,address:address,password:password,role:"buyer"}
    await axios.post('http://104.131.87.91:2000/signup',{...data}).then(res=>{
         if(res.data.success){
AsyncStorage.setItem('token',res.data.data).then(res=> navigation.navigate("Tabs")).catch(err=>console.warn(err))

}else{
    Alert.alert('',res.data.data)
}
     }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
    
 
}


    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView behavior="padding">
<ScrollView>

                <View>
                    <TextInput   onChangeText={text => setName(text)}
        defaultValue={name} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="FULL NAME" placeholderTextColor="gray"></TextInput>
                    <TextInput  onChangeText={text => setEmail(text)}
        defaultValue={email} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="EMAIL ADDRESS" placeholderTextColor="gray"></TextInput>
                    <TextInput  onChangeText={text => setPhone(text)}
        defaultValue={phone} keyboardType='numeric' style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="PHONE NUMBER" placeholderTextColor="gray"></TextInput>
                    <TextInput  onChangeText={text => setAddress(text)}
        defaultValue={address} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="ADDRESS" placeholderTextColor="gray"></TextInput>
                    <TextInput  onChangeText={text => setPassword(text)}
        defaultValue={password} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="PASSWORD" placeholderTextColor="gray"></TextInput>
                    <TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 15, marginTop: 20, borderRadius: 5 }} onPress={submitHandle}><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>REGISTER</Text></TouchableOpacity>
                </View>
                </ScrollView>

            </KeyboardAvoidingView>
            <Text style={{ color: "orange", fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>Already have an Account ?</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        position: 'relative'
    },
})
export default Signup2
