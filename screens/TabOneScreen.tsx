import * as React from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import useCamera from '../hooks/useCamera';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    button: {
        width: 400
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
});

export default function TabOneScreen() {
    const {
        cameraPermission,
        getCameraPermission,
        type,
        setType
    } = useCamera();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Status ${cameraPermission}`}</Text>
            <Button color="red" title="Camera" onPress={getCameraPermission} />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
            {cameraPermission && (
                <Camera type={type} style={styles.camera}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
}
