import React, { useState } from 'react'
import { SafeAreaView, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, View, ToastAndroid, Alert } from 'react-native'
import axios from 'react-native-axios'
const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const submitHandle = () => {
        var data = { email: email }
        axios.post("http://104.131.87.91:2000/resetcode", { ...data }).then(res => {
            if (res.data.status) {
                console.log(res.data.msg)
                navigation.navigate("NewPassword")
                ToastAndroid.show(res.data.msg, ToastAndroid.LONG)
            } else {
                ToastAndroid.show(res.data.msg, ToastAndroid.LONG)
            }
        }).catch(err => console.log(err))
    }
    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView behavior="padding">

                <View>
                    <TextInput onChangeText={text => setEmail(text)}
                        defaultValue={email} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20 ,paddingVertical:15}} placeholder="EMAIL ADDRESS" placeholderTextColor="gray"></TextInput>

                    <TouchableOpacity onPress={submitHandle} style={{ backgroundColor: 'orange', paddingVertical: 15, marginTop: 20, borderRadius: 5 }}><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>Get verification code</Text></TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

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
export default ForgotPassword
