//Code written by Aaron Anderson, 

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

export default function Search() {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  let time = 60;
  let subscription;

  useEffect(() => {
    //query list and allow data updates
    subscription = DataStore.observeQuery(Recipes).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      setList(items);
    });

    //unsubscribe to updates when component is destroyed to prevent memory leak
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, []);

  async function setComplete(updateValue, list) {
    await DataStore.save(
      Recipes.copyOf(list, updated => {
        updated.isComplete = updateValue
      })
    );
  }

  const renderItem = ({ item }) => (

    //renders items, trims Description value down and adds "..." if over 20 characters
    <SafeAreaView style={styles.listArea}>
      <Pressable onPress={()=> navigation.navigate('Details', {name: item.Name, steps: item.Details})}>
        <Text style={styles.itemText}>
          {'\t'}{item.Name}
          {'\t\t'}{item.Description.length > 20 ? `${item.Description.substring(0, 20)}...` : `${item.Description}`}
          {'\t\t'}{`${item.Duration}`}
        </Text>
      </Pressable>
    </SafeAreaView>
  );

  function updateList() {

    //query list and allow data updates
    subscription = DataStore.observeQuery(Recipes, items => items.Duration("le", time)).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      setList(items);
    });

  }

  return (
    <View>
      <Text style={styles.titleText}>Quick Recipe Demo</Text>
      <View style={styles.mainBox}>
        <Text style={styles.headerText}>How quickly would you like to make food?</Text>
        <TextInput style={styles.input} onChangeText={(val) => time = parseInt(val)} placeholder="Enter Cook Time Here" keyboardType="number-pad" />
        <Button title='Search by Cook Time' color="#9c27b0" onPress={updateList} />
      </View>
      <View>
        <FlatList
          data={list}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </View>
  );
};
