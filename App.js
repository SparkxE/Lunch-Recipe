import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import {styles} from './style.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <Text style={styles.titleText}>Quick-Recipe Demo Interface</Text>
        <View style={styles.inputBox}>
          <Text>Enter Text Here: </Text>
          <TextInput style={styles.input}/>
        </View>
        <Button title="Button Press Test" style={styles.buttonBox} color="#9c27b0"/>
      </View>
    </View>
  );
}