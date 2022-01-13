import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'
import * as Location from "expo-location";
import getDistanceFromLatLonInKm from '../utils/calculator';

const HomeScreen = ({ navigation }) => {

  const [resultDataList, setResults] = useState([]);
  const [locations, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    const dutyPharmacyApiResponse = async () => {

      const response = await axios.get("https://api.collectapi.com/health/dutyPharmacy?il=Edirne", {
        headers: {
          "authorization": "apikey 3TU5uepu4kkUG1ygzghuwW:43MfWiTPCkdmo5BABeyZBv",
          "content-type": "application/json"
        }
      });

      setResults(response.data.result);
      
    }
    dutyPharmacyApiResponse();
  }, [])
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

      return <View style={styles.views} >
    <Image
      style={
        {
          width: 412,
          height: 150,

        }
      }
      source={require('../../assets/eczane.png')}
      resizeMode='contain'
    />

    <FlatList
      data={resultDataList}
      keyExtractor={resultDataList => resultDataList.phone}
      renderItem={({ item }) => {
        return <TouchableOpacity
          onPress={() => {
            navigation.navigate('Maps', {
              items: item,
              location:locations
            });
          }}>
          <Text style={styles.pharmacy}>İlçe : {item.dist}</Text>
          <Text style={styles.pharmacy}>Eczane : {item.name}</Text>
          <Text style={styles.pharmacy}>Adres : {item.address}</Text>
          <Text style={styles.pharmacy}>İletişim : {item.phone}</Text>
          <Text style={styles.pharmacy}>Mesafe : {Math.round(getDistanceFromLatLonInKm(item.loc.split(",")[0],item.loc.split(",")[1],locations.coords.latitude,locations.coords.longitude))} KM</Text>

          <Text> </Text>

        </TouchableOpacity>

      }}

    ></FlatList>

  </View>
  }

const styles = StyleSheet.create({
  views: {
    backgroundColor: "#E0E0E0",
  },
  pharmacy: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: "white",
    marginHorizontal: 15
  },
});


export default HomeScreen;