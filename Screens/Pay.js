import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View,ToastAndroid } from 'react-native';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Pay({route,navigation}) {
    const {amount,coins,user}=route.params
    const action=async()=>{
        const token = await AsyncStorage.getItem("token")
        await axios.get(`http://104.131.87.91:2000/buycoin?coins=${coins}`, {
            headers: {
              'Authorization': token,
            }
          }).then(res=>{
             if(res.data.status){
                ToastAndroid.show(res.data.msg, ToastAndroid.LONG)

navigation.navigate("Wallet")

             }
          }).catch(err=>console.log(err))
    }
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_live_97abfbe363581feefc3ff9996747c96da90cdd45"
        amount={amount}
        billingEmail="paystackwebiew@something.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
            if(res.data.transactionRef.message === "Approved"){
                action()
            }
        }}
        autoStart={true}
      />
    </View>
  );
}

export default Pay
