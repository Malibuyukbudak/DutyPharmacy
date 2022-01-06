import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from "expo-linking";
import * as Location from "expo-location";



const MapsScreen = ({ navigation }) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  let dutyLocataion = navigation.state.params.items.loc.split(",")
  let phoneNumber = navigation.state.params.items.phone;

  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(dutyLocataion[0]),
    longitude: parseFloat(dutyLocataion[1]),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
console.log(location);
//try branch 
//// try 


  return <View >
    <Button
      color="black"
      title="Yol Tarifi İçin Tıkla"
      onPress={() =>
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${mapRegion.latitude},${mapRegion.longitude}&origin=${location.coords.latitude},${location.coords.longitude}`)}
    />

    <Button
      title="Aramak için tıklayınız"
      onPress={() =>
        Linking.openURL(`tel:${phoneNumber}`)}
    />

    <MapView
      region={mapRegion}
      style={styles.map}
    >

      <Marker
        coordinate={mapRegion}
        title={navigation.state.params.items.name}
        description={navigation.state.params.items.address}
      />
    </MapView>

  </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default MapsScreen;