import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView,Platform, ToastAndroid, Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation'
import { request,PERMISSIONS } from 'react-native-permissions';
import axios from 'react-native-axios';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { useFocusEffect } from '@react-navigation/native';
const CreateJob = ({ navigation }) => {
  const [singleFile, setSingleFile] = useState(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("")
  const [lat,setLat]=useState(null)
  const [lan,setLan]=useState(null)

  const [salary, setSalary] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [category, setCategory] = useState(null)
  const [experience, setExperience] = useState(null)
  const [gender, setGender] = useState(null)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Actor', value: 'Actor' },
    { label: 'Ac Repair', value: 'Ac Repair' },
    { label: 'Actress', value: 'Actress' },
    { label: 'Architect', value: 'Architect' },
    { label: 'Artist', value: 'Artist' },
    { label: 'Barber', value: 'Barber' },
    { label: 'Bartender', value: 'Bartender' },
    { label: 'Backend Developer', value: 'Backend Developer' },
    { label: 'Blogger', value: 'Blogger' },
    { label: 'Bouncer/Security', value: 'Bouncer/Security' },
    { label: 'Body Peircing/Tatoo', value: 'Body Peircing/Tatoo' },
    { label: 'Branding/Printing', value: 'Branding/Printing' },
    { label: 'Brick Layer', value: 'Brick Layer' },
    { label: 'Cake Designer', value: 'Cake Designer' },
    { label: 'Car Electrician', value: 'Car Electrician' },
    { label: 'Car Wash', value: 'Car Wash' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'Chef/Caterer', value: 'Chef/Caterer' },
    { label: 'Cleaner', value: 'Cleaner' },
    { label: 'Content Creator', value: 'Content Creator' },
    { label: 'Content Writer', value: 'Content Writer' },
    { label: 'Dancer', value: 'Dancer' },
    { label: 'Digital Marketer', value: 'Digital Marketer' },
    { label: 'Dispatch Rider', value: 'Dispatch Rider' },
    { label: 'DJ', value: 'DJ' },
    { label: 'Driver', value: 'Driver' },
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Dentist', value: 'Dentist' },
    { label: 'Drum Player', value: 'Drum Player' },
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Event Planner', value: 'Event Planner' },
    { label: 'Fashion Stylist', value: 'Fashion Stylist' },
    { label: 'Film Director', value: 'Film Director' },
    { label: 'FrontEnd Developer', value: 'FrontEnd Developer' },
    { label: 'Gate Man', value: 'Gate Man' },
    { label: 'Graphic Designer', value: 'Graphic Designer' },
    { label: 'Gym Intructator', value: 'Gym Intructator' },
    { label: 'Guitarist', value: 'Guitarist' },
    { label: 'Teacher', value: 'Teacher' },

    { label: 'Hair Stylist', value: 'Hair Stylist' },
    { label: 'House Keeper', value: 'House Keeper' },
    { label: 'Interior Decorator', value: 'Interior Decorator' },
    { label: 'Iron Bender', value: 'Iron Bender' },
    { label: 'Keyboardist', value: 'Keyboardist' },
    { label: 'Laundry/Dry Cleaner', value: 'Laundry/Dry Cleaner' },
    { label: 'Make Up Artist', value: 'Make Up Artist' },
    { label: 'Marketer', value: 'Marketer' },
    { label: 'Mechanic', value: 'Mechanic' },
    { label: 'Mobile App Developer', value: 'Mobile App Developer' },
    { label: 'Mobile Servicer', value: 'Mobile Servicer' },
    { label: 'Comedian', value: 'Comedian' },
    { label: 'Model', value: 'Model' },
    { label: 'Motivational Speaker', value: 'Motivational Speaker' },
    { label: 'Music Artist', value: 'Music Artist' },
    { label: 'Painter', value: 'Painter' },
    { label: 'Photographer', value: 'Photographer' },
    { label: 'Photo Editor', value: 'Photo Editor' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Tailor', value: 'Tailor' },
    { label: 'Sales Boy', value: 'Sales Boy' },
    { label: 'Sales Girl', value: 'Sales Girl' },
    { label: 'Sales Marketer', value: 'Sales Marketer' },
    { label: 'Shoe Maker', value: 'Shoe Maker' },
    { label: 'Social Media Influencer', value: 'Social Media Influencer' },
    { label: 'Social Media Marketer', value: 'Social Media Marketer' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Technician', value: 'Technician' },
    { label: 'UX/UI Designer', value: 'UX/UI Designer' },
    { label: 'Youtuber', value: 'Youtuber' },
    { label: 'Video Editor', value: 'Video Editor' },
    { label: 'Videographer', value: 'Video Grapher' },
    { label: 'Waiter', value: 'Waiter' },
    { label: 'Web Designer', value: 'Web Designer' },
    { label: 'Wedding Planner', value: 'Wedding Planner' },
    { label: 'Writer', value: 'Writer' },
    { label: 'Wordpress Designer', value: 'Wordpress Designer' },
    { label: 'Other', value: 'Other' },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: 'Any', value: 'Any' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Expert', value: 'Expert' }

  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: 'Any', value: 'Any' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]);


  const uploadImage = async () => {
    const token = await AsyncStorage.getItem("token")
    // Check if any file is selected or not
    // If file selected then create FormData
    var coordinates=[lan,lat]
  
    const data = new FormData();
    data.append('coordinates',JSON.stringify(coordinates))
    data.append('image', singleFile);
    data.append("title", title)
    data.append("description", description)
    data.append("category", category)
    data.append("country", country)
    data.append("experience", experience)
    data.append("gender", gender)
    data.append("salary", salary)
    data.append("address", address)
    data.append("city", city)
    data.append("number", contact)
    // Please change file upload URL
    axios.post("http://104.131.87.91:2000/jobs", data, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if (res.data.status) {
        Alert.alert("Success", res.data.msg + " by 100 coins from your balance", [{
          text: "ok", onPress: () => {
            ToastAndroid.show("Congratulations your Job is posted successfully", ToastAndroid.LONG)
            navigation.goBack()
          }
        }])
      } else {
        Alert.alert('', res.data.msg)
      }
    }).catch(err => console.log(err))

  };

  const selectFile = async () => {

    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    setSingleFile(res);
  };

const getPermissions=async()=>{
  if(Platform.OS==='ios'){
   const response=await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
   if(response==='granted'){
     Geolocation.getCurrentPosition(position=>{setLat(position.coords.latitude)
      setLan(position.coords.longitude)})
   }
  }else{
    const response=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  
    if(response==='granted'){
      Geolocation.getCurrentPosition(position=>{setLat(position.coords.latitude)
      setLan(position.coords.longitude)},error=>console.log(error),{ enableHighAccuracy: true, timeout: 15000,maximumAge:600000})
    }
  }

}
useEffect(()=>{
  getPermissions()
  if(Platform.OS === 'android')
LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
          message: "<h2>Use Location?</h2> \
                      JONOKS Wants to turn on your GPS settings:<br/>\
                      Use GPS for location<br/><br/>", 
          ok: "YES", 
          cancel: "NO" 
      }).then(() => { 
          // locationTracking(dispatch, getState, geolocationSettings)
          getPermissions()

      })
},[])
useFocusEffect(
  React.useCallback(() => {
    getPermissions()
  }, []))




  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setTitle(value)} placeholder="JOB TITLE" multiline={true} style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setDescription(value)} multiline={true} placeholder="JOB DESCRIPTION" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />


        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(value) => setCategory(value)}
          placeholder="Select job category"
          style={{ borderWidth: 1, borderColor: "orange", marginTop: 10, zIndex: 11 }}
          placeholderStyle={{ color: "gray" }}
          searchable
        />



        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          onChangeValue={(value) => setExperience(value)}
          setItems={setItems2}
          placeholder="Experience"
          style={{ borderWidth: 1, borderColor: "orange", marginTop: 10, zIndex: 10 }}
          placeholderStyle={{ color: "gray" }}
        />



        <DropDownPicker
          open={open3}
          value={value3}
          items={items3}
          setOpen={setOpen3}
          setValue={setValue3}
          setItems={setItems3}
          onChangeValue={(value) => setGender(value)}
          placeholder="Gender"
          style={{ borderWidth: 1, borderColor: "orange", marginTop: 10, zIndex: 9 }}
          placeholderStyle={{ color: "gray" }}
        />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setSalary(value)} multiline={true} keyboardType="numeric" placeholder="SALARY" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setAddress(value)} placeholder="ADDRESS" multiline={true} style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setCity(value)} multiline={true} placeholder="CITY" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setCountry(value)} placeholder="COUNTRY" multiline={true} style={{ color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />
        <TextInput placeholderTextColor={'black'} onChangeText={(value) => setContact(value)} keyboardType='numeric' multiline={true} placeholder="CONTACT NUMBER" style={{color:'black', borderBottomWidth: 1, borderBottomColor: 'orange', paddingHorizontal: 10, marginTop: 10 }} />



        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text style={styles.buttonTextStyle}>SELECT BANNER IMAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonStyle, marginBottom: 30 }}
          activeOpacity={0.5}
          onPress={uploadImage}>
          <Text style={styles.buttonTextStyle}>POST JOB</Text>
        </TouchableOpacity>
      </ScrollView>
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
export default CreateJob
