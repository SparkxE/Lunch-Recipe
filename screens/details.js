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



const Details=()=> {
  const route=useRoute();

  const renderItem=({item})=>{
    <View style={styles.listArea}>
      <Text style={styles.itemText}>
        {item}
      </Text>
    </View>
  }

  return (
    <View style={styles.listArea}>
      <Text>
        <Text style={styles.headerText}>
          {route.params.name}
        </Text>
      </Text>
      <FlatList
      data={route.params.steps}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    ></FlatList>
    </View>
  );
}

export default Details;