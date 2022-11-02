import React from "react";
import { StyleSheet, Text, View, Image} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        alignContent: 'center',
        marginTop: 75,
    },

    titleBox:{
        width: '80%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        paddingBottom: 40,
        shadowColor: '#000',
        shadowRadius: 4,
        elevation: 5,
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

    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },

    headerText:{
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },

    itemText:{
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
        flex: 1,
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

    listArea: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingTop: 16,
        margin: 10
    },

    sectionContainer: {
    	marginBottom: 16,
    	marginHorizontal: 16,
    },
    
});
