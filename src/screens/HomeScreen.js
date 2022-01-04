import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'

const HomeScreen = ({ navigation }) => {

  const [resultDataList, setResults] = useState([]);

  useEffect(() => {
    const dutyPharmacyApiResponse = async () => {

      const response = await axios.get("https://api.collectapi.com/health/dutyPharmacy?il=Edirne", {
        headers: {
          "authorization": "apikey 6uDiQeEWNAi5ImendwJ5um:6iuMfC9qLbc9w2yKnOmWg1",
          "content-type": "application/json"
        }
      });
      setResults(response.data.result);
    }
    dutyPharmacyApiResponse();
  }, [])


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
              items: item
            });
          }}>
          <Text style={styles.pharmacy}>Eczane : {item.name}</Text>
          <Text style={styles.pharmacy}>İlçe : {item.dist}</Text>
          <Text style={styles.pharmacy}>Adres : {item.address}</Text>
          <Text style={styles.pharmacy}>İletişim : {item.phone}</Text>
          <Text style={styles.pharmacy}>Loc : {item.loc}</Text>
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