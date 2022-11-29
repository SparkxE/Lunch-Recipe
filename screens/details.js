//Code Written by Aaron Anderson, 
//standard imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';
import { useRoute } from '@react-navigation/native';

//let steps=[];

export default function Details() {
  const route = useRoute();
  const [steps, setSteps] = useState([]);
  const test = [
    {id: 1, text: "one"},
    {id: 2, text: "two"}
  ];
  //let steps=[];

  useEffect(() => {
    //query list and allow data updates
    const subscription = DataStore.observeQuery(Recipes, items => items.id("eq", route.params.id)).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      //steps.push(items[0].Details);
      setSteps(items[0].Details);
      // for(let i = 0; i<items[0].Details.length; i++){
      //   steps.push(items[0].Details[i]);
      // }
    });

    //unsubscribe to updates when component is destroyed to prevent memory leak
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, []);

  const renderItem  =({item, index}) =>(
    <View>
      <Text style = {styles.itemText}>{index+1}. {item}</Text>
    </View>
  )

  for(let i = 0; i<steps.length; i++){
    console.log(steps[i]);
  }

  return (
    <View style={styles.listArea}>
      <Text>
        <Text style={styles.headerText}>
          {route.params.name}{'\n\n'}
        </Text>
      </Text>
      <View></View>
      <FlatList
          data={steps}
          keyExtractor={(item, index)=>item.id}
          renderItem={renderItem}
          style={{flex: 1}}
        ></FlatList>
    </View>
  );
}
