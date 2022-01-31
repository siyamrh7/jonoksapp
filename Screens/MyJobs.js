import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity, Alert,ToastAndroid, TextInput } from 'react-native'
import React from 'react'
import axios from 'react-native-axios'

const MyJobs = ({ route, navigation }) => {
    const width = useWindowDimensions().width
    const {Jobs}=route.params
const delHandle=(id)=>{

    axios.delete(`http://104.131.87.91:2000/job/${id}`).then(res=>navigation.goBack()).catch(err=>console.log(err))
}
    const deleteHandle=async(id)=>{
        Alert.alert("Warning","Are you sure you want to delet this job?",[{text:"Cancel"},{text:"Continue",onPress:()=>delHandle(id)}])

    }

    if (!Jobs) return null
    return (
        <SafeAreaView style={styles.container}>
     
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    Jobs.map((post) => (
                        <View key={post._id} style={{ marginVertical: 15, marginHorizontal: 5, borderWidth: 1, borderColor: '#ccc' }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 10 }}>
                                <Image source={require("../images/logo.png")} style={{ height: 50, width: 50 }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }} >Job created at</Text>
                                    <Text style={{ color: 'gray' }} >{post.createdAt.toString('yyyy-MM-dd')}</Text>
                                </View>
                            </View>
                            <Image source={{uri:`http://104.131.87.91:2000/${post.image.path}`}} style={{ width: width - 12, height: width / 2 }} />
                            <View style={{ marginVertical: 10, marginHorizontal: 5 }}><Text style={{ textAlign: "center", color: "gray" }}>{post.title}</Text>
                                <TouchableOpacity onPress={()=>deleteHandle(post._id)}  style={{ backgroundColor: "orange", width: 100, padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 10 }} ><Text style={{ color: "#fff" ,textAlign:'center'}}>Delete</Text></TouchableOpacity>
                            </View>
                        </View>
                    ))
                }



            </ScrollView>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})

export default MyJobs
