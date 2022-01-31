import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet,Alert,ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
const ChangePassword = ({navigation}) => {
  const [password, setpassword] = useState("")
  const [newpassword, setnewpassword] = useState("")
  const uploadImage = async () => {
    
    const token = await AsyncStorage.getItem("token")
    // Check if any file is selected or not
    // If file selected then create FormData
 
    var data={password:password,newpassword:newpassword}

    axios.post("http://10.0.2.2:2000/changepassword",{...data}, {
      headers: {
        'Authorization': token,
      }
    }).then(res=>{
        if(res.data.status){
            ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
            navigation.goBack()
        }else{
            ToastAndroid.show(res.data.msg,ToastAndroid.LONG)
        }
    }).catch(err=>console.log(err))
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30 }}>
        <TextInput placeholderTextColor={'black'} onChangeText={(e) => setpassword(e)} placeholder="Password" multiline={true} style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(e) => setnewpassword(e)} multiline={true} placeholder="New Password" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 20 }} />

        <TouchableOpacity
          style={{ backgroundColor: 'orange', alignItems: "center", marginTop: 30, marginHorizontal: 10, borderRadius: 20 }}
          activeOpacity={0.5}
          onPress={uploadImage}>
          <Text style={styles.buttonTextStyle}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default ChangePassword
