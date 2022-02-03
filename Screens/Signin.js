import React, { useState } from 'react'
import { SafeAreaView, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, View, useWindowDimensions ,Alert} from 'react-native'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Signin = ({ navigation }) => {
    const width = useWindowDimensions().width
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandle = () => {
        var data = { email: email, password: password }
        axios.post('http://104.131.87.91:2000/signin', { ...data }).then(res => {
            if (res.data.success) {
                AsyncStorage.setItem('token', res.data.data).then(res => navigation.navigate("Tabs")).catch(err => console.warn(err))
            }else{
                Alert.alert('',res.data.data)
            }
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }
    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView behavior="padding">

                <View>
                    <TextInput onChangeText={text => setEmail(text)}
                        defaultValue={email} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="EMAIL ADDRESS" placeholderTextColor="gray"></TextInput>
                    <TextInput onChangeText={text => setPassword(text)}
                        defaultValue={password} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="PASSWORD" placeholderTextColor="gray"></TextInput>
                    <TouchableOpacity onPress={submitHandle} style={{ backgroundColor: 'orange', paddingVertical: 15, marginTop: 20, borderRadius: 5 }}><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>LOGIN</Text></TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            <Text style={{ color: "orange", fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }} onPress={()=>navigation.navigate('Forgotpass')}>Forgot your password?</Text>

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
export default Signin
