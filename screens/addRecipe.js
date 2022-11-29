//code written by Aaron Anderson, Krithik Raja and Derrick Benson

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

export default function Add() {
  //variable initialization
  let name, describe, time, step;
  let stepList = [];

  //recursive component to add as many steps as necessary to the Recipe object
  function addStep() {
    stepList.push(step);  //push saved string into stepList array
    console.log(step);
    step = "";
  }
  function AddStep() {
    
    return (
      <View>
        <TextInput
          style={styles.input} onChangeText={(val) => step = (val)} 
          placeholder="Enter Step Details" keyboardType="default"
          value={step}
        />
        <Button title='Add Step' color="#ff9b00" onPress={addStep} />
      </View>
    )
  }

  //function for adding recipe details to the Datastore
  async function submitRecipe() {
    await DataStore.save(new Recipes({ name, describe, time, stepList }));
    name = "", describe = "", time = 0, step = "", stepList = [];
    return (
      <View>
        <Text>Thank you for adding your recipe! Feel free to go back to the Search menu to see how it turned out!</Text>
      </View>
    )
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
        <Text>Current Steps:</Text>
        <FlatList
          data={stepList}
          keyExtractor={(item, index)=>item.id}
          renderItem={renderItem}
        ></FlatList>
        <AddStep />
        <Text></Text>
        <Button title='Submit Recipe' color="#ff9b00" onPress={submitRecipe} />
      </View>
    </View>
  );
}
