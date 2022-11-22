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

const Details = () => {
  const route = useRoute();
  //const [steps, setSteps] = useState([]);
  //let subscription;
  // useEffect(() => {
  //   //query list and allow data updates
  //   subscription = DataStore.observeQuery(Recipes, items.id("eq", route.params.id)).subscribe((snapshot) => {
  //     const { items, isSynced } = snapshot;
  //     console.log(items.id);
  //     // setSteps();
  //   });

  //   //unsubscribe to updates when component is destroyed to prevent memory leak
  //   return function cleanup() {
  //     subscription.unsubscribe();
  //   }
  // }, []);

  const renderItem = ({ item }) => {

    <View style={styles.listArea}>
      <Text>{item}</Text>
    </View>
  }

  return (
    <View style={styles.listArea}>
      <Text>
        <Text style={styles.headerText}>
          {route.params.name}
        </Text>
      </Text>
      <Text>{""}</Text>
      <FlatList
        data={route.params.steps}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
}

export default Details;