import React from 'react';
import { Text, View, Button } from 'react-native';
import useNotifications from "../hooks/useNotifications";

export default function NotificationView() {
    const notificationHandler = {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }
    const { token, pushNotification: _pushNotification, notification } = useNotifications({notificationHandler});

    const pushNotification = async () => {
        await _pushNotification({
            content: {
                title: 'title',
                body: 'body'
            },
            trigger: {
                seconds: 2
            }
        })
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {token}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to schedule a notification"
                onPress={pushNotification}
            />
        </View>
    );
}
