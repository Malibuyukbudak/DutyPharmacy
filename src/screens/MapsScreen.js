import React,{ useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from "expo-linking";


const MapsScreen = ({ navigation }) => {

 
  let dutyLocataion=navigation.state.params.items.loc.split(",")
  let phoneNumber=navigation.state.params.items.phone;
  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(dutyLocataion[0]),
    longitude: parseFloat(dutyLocataion[1]),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return <View  >
    <Button title="Aramak için tıklayanız"  onPress={() => Linking.openURL(`tel:${phoneNumber}`)} />
    <MapView region={mapRegion} style={styles.map}>
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