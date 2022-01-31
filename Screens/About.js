import React from 'react'
import {View,Text} from 'react-native'
const About = () => {
    return (
        <View style={{flex:1,padding:20,marginBottom:20}}>
            <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>ABOUT US</Text>
            <Text style={{color:'black',lineHeight:20}}>We are an online company that is passionate about helping skilled individuals build their skills and helping them secure their livelihoods by connecting them to clients who need their services.</Text>
        </View>
    )
}

export default About
