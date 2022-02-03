import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet,Alert,ToastAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
const CreatePost = ({navigation}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [singleFile, setSingleFile] = useState(null)
  const uploadImage = async () => {
    
    const token = await AsyncStorage.getItem("token")
    // Check if any file is selected or not
    // If file selected then create FormData
    const data = new FormData();
    data.append('image', singleFile);
    data.append("title", title)
    data.append("description", description)
    // Please change file upload URL
    axios.post("http://104.131.87.91:2000/posts", data, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{
      if(res.data.status){
          Alert.alert("Success",res.data.msg + " by 100 coins from balance",[{text:"ok",onPress:()=>{
          ToastAndroid.show("Congratulations your ads is posted successfully",ToastAndroid.LONG)
          navigation.goBack()}}] )
      }else{
        Alert.alert('',res.data.msg)
    }
    }).catch(err=>console.log(err))
  };

  const selectFile = async () => {

    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    setSingleFile(res);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: 30 }}>
        <TextInput placeholderTextColor={'black'} onChangeText={(e) => setTitle(e)} placeholder="POST TITLE" multiline={true} style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10 ,paddingVertical:15}} />
        <TextInput placeholderTextColor={'black'} onChangeText={(e) => setDescription(e)} multiline={true} placeholder="POST DESCRIPTION" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10,paddingVertical:15, marginTop: 20 }} />

        <TouchableOpacity
          style={{ ...styles.buttonStyle, backgroundColor: 'gray' }}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text style={styles.buttonTextStyle}>Select Banner Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'orange', alignItems: "center", marginTop: 30, marginHorizontal: 10, borderRadius: 20 }}
          activeOpacity={0.5}
          onPress={uploadImage}>
          <Text style={styles.buttonTextStyle}>Create Post</Text>
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
export default CreatePost
