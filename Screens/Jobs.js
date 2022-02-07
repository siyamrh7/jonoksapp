import React,{useEffect,useState} from 'react'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from '@react-native-community/geolocation'
import { request,PERMISSIONS } from 'react-native-permissions';
import {  Text, TouchableOpacity, View, StyleSheet, ScrollView,Platform, Image, useWindowDimensions, TextInput ,SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MapView from 'react-native-maps'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { useFocusEffect } from '@react-navigation/native';

const Jobs = ({navigation}) => {
    const [state,setState]=useState(null)
    const [lat,setLat]=useState(null)
    const [lan,setLan]=useState(null)

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Actor', value: 'Actor'},
    {label: 'Ac Repair', value: 'Ac Repair'},
    {label: 'Actress', value: 'Actress'},
    {label: 'Architect', value: 'Architect'},
    {label: 'Artist', value: 'Artist'},
    {label: 'Barber', value: 'Barber'},
    {label: 'Bartender', value: 'Bartender'},
    {label: 'Backend Developer', value: 'Backend Developer'},
    {label: 'Blogger', value: 'Blogger'},
    {label: 'Bouncer/Security', value: 'Bouncer/Security'},
    {label: 'Body Peircing/Tatoo', value: 'Body Peircing/Tatoo'},
    {label: 'Branding/Printing', value: 'Branding/Printing'},
    {label: 'Brick Layer', value: 'Brick Layer'},
    {label: 'Cake Designer', value: 'Cake Designer'},
    {label: 'Car Electrician', value: 'Car Electrician'},
    {label: 'Car Wash', value: 'Car Wash'},    
    {label: 'Carpenter', value: 'Carpenter'},
    {label: 'Chef/Caterer', value: 'Chef/Caterer'},
    {label: 'Cleaner', value: 'Cleaner'},
    {label: 'Content Creator', value: 'Content Creator'},
    {label: 'Content Writer', value: 'Content Writer'},
    {label: 'Dancer', value: 'Dancer'},
    {label: 'Digital Marketer', value: 'Digital Marketer'},
    {label: 'Dispatch Rider', value: 'Dispatch Rider'},
    {label: 'DJ', value: 'DJ'},
    {label: 'Driver', value: 'Driver'},
    {label: 'Doctor', value: 'Doctor'},
    {label: 'Dentist', value: 'Dentist'},
    {label: 'Drum Player', value: 'Drum Player'},
    {label: 'Electrician', value: 'Electrician'},
    {label: 'Event Planner', value: 'Event Planner'},
    {label: 'Fashion Stylist', value: 'Fashion Stylist'},
    {label: 'Film Director', value: 'Film Director'},
    {label: 'FrontEnd Developer', value: 'FrontEnd Developer'},
    {label: 'Gate Man', value: 'Gate Man'},
    {label: 'Graphic Designer', value: 'Graphic Designer'},    
    {label: 'Gym Intructator', value: 'Gym Intructator'},
    {label: 'Guitarist', value: 'Guitarist'},
    {label: 'Teacher', value: 'Teacher'},
    {label: 'Hair Stylist', value: 'Hair Stylist'},
    {label: 'House Keeper', value: 'House Keeper'},
    {label: 'Interior Decorator', value: 'Interior Decorator'},
    {label: 'Iron Bender', value: 'Iron Bender'},
    {label: 'Keyboardist', value: 'Keyboardist'},
    {label: 'Laundry/Dry Cleaner', value: 'Laundry/Dry Cleaner'},
    {label: 'Make Up Artist', value: 'Make Up Artist'},
    {label: 'Marketer', value: 'Marketer'},
    {label: 'Mechanic', value: 'Mechanic'},
    {label: 'Mobile App Developer', value: 'Mobile App Developer'},
    {label: 'Mobile Servicer', value: 'Mobile Servicer'},
    {label: 'Comedian', value: 'Comedian'},
    {label: 'Model', value: 'Model'},
    {label: 'Motivational Speaker', value: 'Motivational Speaker'},
    {label: 'Music Artist', value: 'Music Artist'},
    {label: 'Painter', value: 'Painter'},    
    {label: 'Photographer', value: 'Photographer'},
    {label: 'Photo Editor', value: 'Photo Editor'},
    {label: 'Plumber', value: 'Plumber'},
    {label: 'Tailor', value: 'Tailor'},
    {label: 'Sales Boy', value: 'Sales Boy'},
    {label: 'Sales Girl', value: 'Sales Girl'},
    {label: 'Sales Marketer', value: 'Sales Marketer'},
    {label: 'Shoe Maker', value: 'Shoe Maker'},
    {label: 'Social Media Influencer', value: 'Social Media Influencer'},
    {label: 'Social Media Marketer', value: 'Social Media Marketer'},
    {label: 'Spa', value: 'Spa'},
    {label: 'Technician', value: 'Technician'},
    {label: 'UX/UI Designer', value: 'UX/UI Designer'},
    {label: 'Youtuber', value: 'Youtuber'},
    {label: 'Video Editor', value: 'Video Editor'},
    {label: 'Videographer', value: 'Video Grapher'},
    {label: 'Waiter', value: 'Waiter'},
    {label: 'Web Designer', value: 'Web Designer'},
    {label: 'Wedding Planner', value: 'Wedding Planner'},
    {label: 'Writer', value: 'Writer'},    
    {label: 'Wordpress Designer', value: 'Wordpress Designer'},
    {label: 'Other', value: 'Other'},
  ]);
  const [save,setSave]=useState("")
    const getData=async(value)=>{
        const token = await AsyncStorage.getItem("token")
        await axios.get(`http://104.131.87.91:2000/jobs?category=${value}&coordinates=[${lan},${lat}]`, {
            headers: {
              'Authorization': token,
            }
          }).then(res=>{
              if(res.data.status){
                navigation.navigate("Map",{jobs:res.data.msg})
                
              }
          }).catch(err=>console.log(err))
    }
    const setCategory=(value)=>{
        getData(value)
        setSave(value)
    }
    const getPermissions=async()=>{
        if(Platform.OS==='ios'){
         const response=await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
         if(response==='granted'){
           Geolocation.getCurrentPosition(position=>{setLat(position.coords.latitude)
            setLan(position.coords.longitude)},error=>console.log(error),{ enableHighAccuracy: true, timeout: 15000,maximumAge:100000})
         }
        }else{
          const response=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        
          if(response==='granted'){
            Geolocation.getCurrentPosition(position=>{setLat(position.coords.latitude)
            setLan(position.coords.longitude)},error=>console.log(error),{ enableHighAccuracy: true, timeout: 15000,maximumAge:100000})
          }
        }
      
      }
      useEffect(()=>{
        getPermissions()
        if(Platform.OS === 'android')
LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
                message: "<h2>Use Location ?</h2> \
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

      const width = useWindowDimensions().width
const search=()=>{
  getData(save)
}
    return (
        <SafeAreaView style={styles.container}>
          <View style={{position: "relative", right: 0, top: 0,zIndex:20}}>
<DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value)=>setCategory(value)}
      
      placeholder="Find nearest jobs by choosing categories..."
      style={{borderWidth:1,borderColor:"orange",marginTop:0,Index:1,background:"none"}}
      placeholderStyle={{color:"gray"}}
      containerStyle={{zIndex:1}}
      searchable
    />
            <Icon onPress={search}  style={{ position: "absolute", right: 40, top: 14,zIndex:10 }} name="search" size={24} color="gray" />
    </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Photographer")}><Text style={styles.txt}>Photographers</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Plumber")}><Text style={styles.txt}>Plumbers</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Carpenter")}><Text style={styles.txt}>Carpenters</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Shoemaker")}><Text style={styles.txt}>Shoemakers</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Fashion designer")}><Text style={styles.txt}>Fashion designers</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Mechanic")}><Text style={styles.txt}>Mechanics</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Cleaner")}><Text style={styles.txt}>Cleaners</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Electrician")}><Text style={styles.txt}>Electricians</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Teacher")}><Text style={styles.txt}>Teachers</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Waiter")}><Text style={styles.txt}>Waiter</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Laundry/Dry Cleaner")}><Text style={styles.txt}>Dry Cleaning & Laundry</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Interior Decorator")}><Text style={styles.txt}>Interior Decorator</Text></TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={ ()=> setCategory("Other")}><Text style={styles.txt}>Other jobs</Text></TouchableOpacity>

            </View>
           
              {
                lat && lan && (

                  <MapView
              style={{...styles.map,width:width,height:width}}
              zoomEnabled={true}
              zoomControlEnabled={true}
              showsUserLocation={true}
              zoomTapEnabled={true}
              scrollDuringRotateOrZoomEnabled={true}
              initialRegion={{
                latitude: lat,
                longitude: lan,
                latitudeDelta: 0.015,
                longitudeDelta: 0.00121,
              }}
            />
                )
              }


           
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
position:'relative'
    },
    box: {
        backgroundColor: 'orange',
        padding: 8,
        margin: 10
    },
    txt: {
        fontWeight: 'bold',
        color: "white"
    },
    map:{
marginTop:5,
borderTopColor:'orange',
zIndex:100,
    }
})

export default Jobs
