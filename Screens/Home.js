import { SafeAreaView, Text, View, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity, Alert,ToastAndroid, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
const Home = ({ route, navigation }) => {
    const width = useWindowDimensions().width
    const [state, setState] = useState(null)

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
    useEffect(() => {
        if (user !== null) {
            if (user.coins <= 100) {
                Alert.alert("Low Balance", "Your accounr balance is low, Please creadit your account", [{text:'OK'},{ text: "Buy Now", onPress: () => navigation.navigate("Wallet") }])
            }
        }
    }, [user])
    const getData = async (text) => {
        const token = await AsyncStorage.getItem("token")
        await axios.get(`http://104.131.87.91:2000/posts?search=${text}`, {
            headers: {
                'Authorization': token,
            }
        }).then(res => {setState(res.data.msg)}).catch(err => console.log(err))

    }
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
        })
        getData()
        ToastAndroid.show("This app need to turn on your GPS", ToastAndroid.LONG)
    }, [])
    useFocusEffect(
        React.useCallback(() => {
         getData()
        }, [])
      );
    if (state === null) return null
    return (
        <SafeAreaView style={styles.container}>
        <View>
            <TextInput placeholder='Search here' style={{backgroundColor:'orange',color:'white',paddingHorizontal:20}} onChangeText={(e)=>getData(e)}/>
        </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    state.map((post) => (
                        <View key={post._id} style={{ marginVertical: 15, marginHorizontal: 5, borderWidth: 1, borderColor: '#ccc' }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 10 }}>
                                <Image source={require("../images/logo.png")} style={{ height: 50, width: 50 }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }} >{post.user.name}</Text>
                                    <Text style={{ color: 'gray' }} >{post.createdAt.toString('yyyy-MM-dd')}</Text>
                                </View>
                            </View>
                            <Image source={{uri:`http://104.131.87.91:2000/${post.image.path}`}} style={{ width: width - 12, height: width / 2 }} />
                            <View style={{ marginVertical: 10, marginHorizontal: 5 }}><Text style={{ textAlign: "center", color: "gray" }}>{post.title}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Post", { id: post._id, post })} style={{ backgroundColor: "orange", width: 100, padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 10 }} ><Text style={{ color: "#fff" }}>View Details</Text></TouchableOpacity>
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

export default Home
