import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../style.js';
import { DataStore } from 'aws-amplify';
import { Recipes } from '../src/models';

export default function Details(){

    
    const renderItem = ({ item }) => (
        <View style={styles.listArea}>
          <Text>
            <Text style={styles.headerText}>
              {item.Name}
              {`\t${item.Description}`}
              {`\t${item.Duration}`}
            </Text>
          </Text>
    
        </View>
      );
}