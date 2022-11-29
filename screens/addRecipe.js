//code written by Aaron Anderson, Krithik Raja and Derrick Benson

//standard imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';

export default function Add() {

  //ref setting to clear TextInput
  const inputRef = useRef();
  const editText = useCallback(() => {
    inputRef.current.setNativeProps({ text: "" });
  }, []);

  //variable initialization
  let name, describe, time, step;
  let stepList = [];

  //recursive component to add as many steps as necessary to the Recipe object
  function addStep() {
    if(step!=null){
      stepList.push(step);  //push saved string into stepList array
      console.log(step);
      //step = "";
      Alert.alert(
        "Step Added Successfully!",
        `Current Number of Steps: ${stepList.length}`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else{
      Alert.alert(
        "Empty Step",
        "Sorry, you must enter a value before you can add this step!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
  function AddStep() {
    
    return (
      <View>
        <TextInput
          ref={inputRef}
          style={styles.input} onChangeText={(val) => step = (val)} 
          placeholder="Enter Step Details" keyboardType="default"
          value={step}
          onPressOut={editText}
        />
        <Button title='Add Step' color="#ff9b00" onPress={addStep} />
      </View>
    )
  }

  //function for adding recipe details to the Datastore
  async function submitRecipe() {
    if(name!=null && describe!=null && time!=null && stepList!=[]){
      await DataStore.save(new Recipes({ Name: name, Description: describe, Duration: time, Details: stepList }));
      name = "", describe = "", time = 0, step = "", stepList = [];
      Alert.alert(
        "Thank you!",
        "Your recipe has been recorded!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    else{
      Alert.alert(
        "Empty Field",
        "Sorry, all fields must have some value before submitting!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  const renderItem  =({item, index}) =>(
    <View>
      <Text style = {styles.itemText}>{index+1}. {item}</Text>
    </View>
  )

  return (
    <View>
      <Text style={styles.titleText}>Enter Recipe Details Below</Text>
      <View style={styles.mainBox}>
        <TextInput style={styles.input} onChangeText={(val) => name = (val)} placeholder="Enter Recipe Name" keyboardType="default" />
        <TextInput style={styles.input} onChangeText={(val) => describe = (val)} placeholder="Enter Recipe Description" keyboardType="default" />
        <TextInput style={styles.input} onChangeText={(val) => time = parseInt(val)} placeholder="Enter Recipe Duration" keyboardType="number-pad" />
        <Text>Enter Recipe Steps Here</Text>
        <AddStep />
        <Text></Text>
        <Button title='Submit Recipe' color="#ff9b00" onPress={submitRecipe} />
      </View>
    </View>
  );
}
