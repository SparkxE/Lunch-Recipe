//code written by Krithik Raja and Derrick Benson

//standard imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Text, 
  View, 
  TextInput, 
  Button,
  FlatList, 
  SafeAreaView, 
  Pressable
 } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';
import { Details } from './details';
import { useNavigation } from '@react-navigation/native';

//give text fields for input & store input in variables

export default function Add(){
    const navigation = useNavigation();
    const [list, setList] = useState([]);
    let time = 60;
    let subscription;

return (
    <View>
      <Text style={styles.titleText}>Enter Recipe Details Down Below</Text>
      <View style={styles.mainBox}>
        <TextInput style={styles.input} onChangeText={(val) => string = parseString(val)} placeholder="Enter Recipe Name" keyboardType="default" />
        <TextInput style={styles.input} onChangeText={(val) => string = parseString(val)} placeholder="Enter Recipe Description" keyboardType="default" />
        <TextInput style={styles.input} onChangeText={(val) => time = parseInt(val)} placeholder="Enter Recipe Duration" keyboardType="number-pad" />
        <TextInput style={styles.input} onChangeText={(val) => string = parseString(val)} placeholder="Enter Recipe Details" keyboardType="default" />
      </View>
      </View>
)
//push the variables into the recipe collection
}
