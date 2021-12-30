import React from 'react';
import { Text, StyleSheet, View,Button } from 'react-native';


const MapsScreen = ({route,navigation }) => {
    console.log(route);

    return <View  >
    <Text>This is Maps's profile  </Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

 

  </View>
}
const styles = StyleSheet.create({
 
});


export default MapsScreen;