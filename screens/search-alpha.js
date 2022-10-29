import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, FlatList, SafeAreaView} from 'react-native';
import { useState, useEffect } from 'react';
import {styles} from '../style.js';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("../recipe.db");    //opens SQLite Database

    
    const Search = () => {
        const [flatListItems, setFlatListItems] = useState([]);
       
        useEffect(() => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM RECIPES',
              [],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                setFlatListItems(temp);
              }
            );
          });
        }, []);
       
        let listViewItemSeparator = () => {
          return (
            <View
              style={{
                height: 0.2,
                width: '100%',
                backgroundColor: '#808080'
              }}
            />
          );
        };
       
        let listItemView = (item) => {
          return (
            <View
              style={{ backgroundColor: 'white', padding: 20 }}>
		<Text>Test Text</Text>
              <Text>Name: {item.NAME}</Text>
              <Text>Description: {item.DESCRIPTION}</Text>
              <Text>Duration: {item.DURATION}</Text>
            </View>
          );
        };
    

    return(
	<SafeAreaView>
        <View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.titleText}>Quick-Recipe Demo Interface</Text>
                <View>
                    <Text style={styles.itemText}>Here are the recipes we currently have in our database: </Text>
                </View>
                <FlatList
                    data={flatListItems}
                    ItemSeparatorComponent={listViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
        </View>
	</SafeAreaView>
    );
};
export default Search;



