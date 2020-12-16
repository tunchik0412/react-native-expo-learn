import { useState } from 'react';
import { Camera } from 'expo-camera';

export default function useCamera() {
    const [cameraPermission, setCameraPermissions] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const getCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermissions(status === 'granted');
    };
    return {
        cameraPermission,
        type,
        setType,
        getCameraPermission
    };
}
