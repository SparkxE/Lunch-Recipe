import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';


export default function Search() {
  const [list, setList] = useState([]);
  const [time, setTime]=useState();

  useEffect(() => {
    //query list and allow data updates
    const subscription = DataStore.observeQuery(Recipes, (items)=>items.Duration("le", 60)).subscribe(({items}) => {
      setList(items[0]);
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

  function setData(){
    setList(DataStore.query(Recipes, items=>items.Duration("le", time)));
  }

  const renderItem = ({ item }) => (
    
    //renders items, trims Description value down and adds ... if over 20 characters
    <View style={styles.listArea}>
      <Text style={styles.itemText}>
        {'\t'}{item.Name}
        {'\t\t'}{item.Description.length>20 ? `${item.Description.substring(0,20)}...`: `${item.Description}`}
        {'\t\t'}{`${item.Duration}`}
      </Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.titleText}>Quick Recipe Demo</Text>
      <View>
        <Text style={styles.headerText}>How quickly would you like to make food?</Text> 
        <TextInput style={styles.input} onChange={setTime} value={time} placeholder="Enter Cook Time Here" keyboardType='numeric'/>
        <Button title='Search by Cook Time' color="#9c27b0" onPress={setData}/>
      </View>
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </View>
  );
};
