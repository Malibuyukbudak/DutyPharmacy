import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MapsScreen from "./src/screens/MapsScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Maps:MapsScreen
    
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Edirne Nöbetçi Eczane",
    },
  }
);

export default createAppContainer(navigator);
