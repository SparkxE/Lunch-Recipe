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


  useEffect(() => {
    //query list and allow data updates
    const subscription = DataStore.observeQuery(Recipes, items => items.id("eq", route.params.id)).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      setSteps(items[0].Details);
    });

    //unsubscribe to updates when component is destroyed to prevent memory leak
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, []);

  const renderItem = ({ item, index }) => (
    <View>
      <Text style={styles.itemText}>{index + 1}. {item}</Text>
    </View>
  )

  for (let i = 0; i < steps.length; i++) {
    console.log(steps[i]);
  }

  return (
    <View style={styles.listArea}>
      <Text style={styles.titleText}>Quick-Lunch Recipe Details</Text>
      <Text></Text>
      <Text style={styles.headerText}>
        {route.params.name}{'\n\n'}
      </Text>
      <FlatList
        data={steps}
        keyExtractor={({id})=>id}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
}
