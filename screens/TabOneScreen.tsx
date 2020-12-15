import * as React from 'react';
import {Button, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Camera } from "expo-camera";
import {useState} from "react";

export default function TabOneScreen() {
  const [cameraPermission, setCameraPermissions ] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setCameraPermissions(status === 'granted');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Status ${cameraPermission}`}</Text>
      <Button color='red' title='Camera' onPress={getCameraPermission} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      {
        cameraPermission && (
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
                    }}>
                  <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
              </View>
            </Camera>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
    color: 'white',
  }
});
