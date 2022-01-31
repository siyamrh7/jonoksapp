import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import MapView, { Polyline, Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
const Map = ({ route, navigation }) => {

  const { jobs } = route.params

  const [lat, setLat] = useState(null)
  const [lan, setLan] = useState(null)
  const sliderWidth = useWindowDimensions().width
  const itemWidth = useWindowDimensions().width
 var [_map,setMap]=useState()
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity onPress={()=>navigation.navigate("Job",{job:item})}>
        <Image   source={{ uri: `http://104.131.87.91:2000/${item.image.path}` }} style={{ height: 150, width: 250 }} />

        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  const getPermissions = async () => {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      if (response === 'granted') {
        Geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude)
          setLan(position.coords.longitude)
        })
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      if (response === 'granted') {
        Geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude)
          setLan(position.coords.longitude)
        },error=>console.log(error),{ enableHighAccuracy: true, timeout: 15000,maximumAge:600000})
      }
    }

  }
 
  const ItemChange=(index)=>{
    let location=jobs[index]
    _map.animateToRegion({
      latitude: location.location.coordinates[1],
      longitude: location.location.coordinates[0],
      latitudeDelta: 0.015,
      longitudeDelta: 0.00121,
    })
  }
  useEffect(() => {
    getPermissions()
  }, [])
  if (!lat || !lan) { return null }
  if (jobs.length === 0) { return null }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={map=>setMap(map)}
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
      >
        {
          jobs.map((job) => (
            <Marker key={job._id} coordinate={{
              latitude: job.location.coordinates[1],
              longitude: job.location.coordinates[0]
            }} title={job.user.name}>
              <Callout onPress={() => console.log(job.image.path)}>
                <Text>{job.user.name}</Text>
              </Callout>
            </Marker>
          ))
        }
      </MapView>


      <Carousel
        ref={(c) => { }}
        data={jobs}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth - 150}
        containerCustomStyle={styles.courasel}
        onSnapToItem={(index)=>ItemChange(index)}
        
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  courasel: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    right: 45
  },
  slide: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 200, width: 250
  },
  title: {
    color: 'white',
    padding: 5,
    textAlign: 'center',

  }
});
export default Map
