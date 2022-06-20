import { StyleSheet, TouchableOpacity, StyleProp, Text, ViewStyle } from 'react-native';
import React from 'react';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BlackButton = ( { onPress, title, style = {} }: Props ) => {
    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ onPress }
            style={ {
                ...style as any,
                ...styles.blackButton
            } }
        >
            <Text style={ styles.buttonText } >{ title }</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    blackButton: {
        height: 45,
        width: 175,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
} );