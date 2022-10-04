import React from "react";
import { StyleSheet, Text, View, Image} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        marginTop: 75,
    },
    mainBox: {
        width: '80%',
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowRadius: 4,
        elevation: 5,
    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'top',
    },

    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
      },

    inputBox: {
        marginTop: 50,
    },
    
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    
});