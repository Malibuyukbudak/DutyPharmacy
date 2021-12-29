import React,{useState} from 'react';
import { Text, StyleSheet } from 'react-native';

import axios from 'axios'

const[result,setResults] = useState([]);

axios.get("https://api.collectapi.com/health/dutyPharmacy?il=Edirne" ,{
  headers:{
    "authorization":"apikey 09Erq76IT2T7OZEKzWWtOM:37wKkCNdmJxnHAgn2Y0PxN",
    "content-type":"application/json"
  }
}).then(data =>data.data.result)
.then(this.setResults(data));

const {DutyPharmacyResult} = this.result;
const HomeScreen = () => {
  return <Text style={styles.text}>{DutyPharmacyResult}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
