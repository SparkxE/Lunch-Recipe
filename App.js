//standard imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { styles } from './style.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withAuthenticator } from 'aws-amplify-react-native';
//amplify imports & setup
import { Amplify, Auth } from 'aws-amplify';
import config from "./src/aws-exports";
import { DataStore } from 'aws-amplify';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

//screen imports
import Search from './screens/search.js';
import Details from './screens/details.js';

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
  await DataStore.clear();
}


export function App() {   //main display, uses NavigationContainer to use screens
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} style={styles.mainBox} />
        <Stack.Screen name="Search" component={SearchScreen} style={styles.mainBox} />
        <Stack.Screen name="Details" component={DetailsScreen} style={styles.mainBox}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();   //Stack object for having screens

function HomeScreen({ navigation }) {    //main landing page screen
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <Text style={styles.titleText}>Quick-Lunch Demo Interface</Text>
      </View>
      <View style={styles.mainBox}>
        <Button title="Press for Search Page" color="#9c27b0" onPress={() => navigation.navigate("Search")}></Button>
        <Text> {/*this text area is used to space out the buttons, should probably find a better way*/}</Text>
        <Button title="Press to LogOut" color="#9c27b0" style={{ marginTop: 20 }} onPress={signOut}></Button>
      </View>
    </View>
  );
}

function SearchScreen() {  //
  return (
    <View style={styles.container}>
      <Search />
    </View>

  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Details />
    </View>
  )
}

export default withAuthenticator(App);