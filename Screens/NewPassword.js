import React, { useState } from 'react'
import { SafeAreaView, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid, View, useWindowDimensions, Alert } from 'react-native'
import axios from 'react-native-axios'
const NewPassword = ({ navigation }) => {
    const [code, setCode] = useState(null)
    const [newpassword, setNewpassword] = useState(null)

    const submitHandle = () => {
        var data = { code: code, newpassword: newpassword }
        axios.post("http://104.131.87.91:2000/verifycode", { ...data }).then(res => {
            if (res.data.status) {
                navigation.navigate("Signin")
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
                    <TextInput onChangeText={text => setCode(text)}
                        keyboardType='numeric'
                        defaultValue={code} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="ENTER 6 DIGIT CODE" placeholderTextColor="gray"></TextInput>

                    <TextInput onChangeText={text => setNewpassword(text)}
                        defaultValue={newpassword} style={{ borderColor: 'orange', borderWidth: 2, marginVertical: 10, color: 'black', paddingHorizontal: 20,paddingVertical:15 }} placeholder="ENTER NEW PASSWORD" placeholderTextColor="gray"></TextInput>
                    <TouchableOpacity onPress={submitHandle} style={{ backgroundColor: 'orange', paddingVertical: 15, marginTop: 20, borderRadius: 5 }}><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 16 }}>RESET PASSWORD</Text></TouchableOpacity>
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
export default NewPassword
