import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';


export default function Search() {
  const [list, setList] = useState([]);

  useEffect(() => {
    //query list and allow data updates
    const subscription = DataStore.observeQuery(Recipes).subscribe((snapshot) => {
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
    <>
      <Text>
        <Text style={styles.headerText}>
          {item.Name}
          {`\t${item.Description}`}
          {`\t${item.Duration}`}
        </Text>
      </Text>

    </>
  );

  return (
<>
   <Text style={styles.titleText}>Quick Recipe Demo</Text>
   <View style={styles.container}>
    <FlatList
      data={list}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    ></FlatList>
   </View>
</>
  );
};
