import { useEffect, useState } from 'react';
import { Notification } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import { NotificationBehavior } from 'expo-notifications/src/Notifications.types';
import { NotificationRequestInput } from 'expo-notifications/build/Notifications.types';

interface IUseNotificationsProps {
    notificationHandler: NotificationBehavior;
}

const useNotifications = (props?: IUseNotificationsProps) => {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
    const [notification, setNotification] = useState<Notification>();

    if (props?.notificationHandler) {
        const { notificationHandler } = props;
        Notifications.setNotificationHandler({
            handleNotification: async () => notificationHandler
        });
    }

    const schedulePushNotification = async (
        request?: NotificationRequestInput
    ) => {
        await Notifications.scheduleNotificationAsync(
            request || {
                content: {
                    title: "You've got mail! 📬",
                    body: 'Here is the notification body',
                    data: { data: 'goes here' }
                },
                trigger: { seconds: 2 }
            }
        );
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C'
            });
        }

        // eslint-disable-next-line consistent-return
        return token;
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        const data = Notifications.addNotificationReceivedListener(
            (notificationEvent) => {
                setNotification(notificationEvent);
            }
        );

        const responseListener = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(data);
            Notifications.removeNotificationSubscription(responseListener);
        };
    });

    return {
        token: expoPushToken,
        notification,
        pushNotification: schedulePushNotification
    };
};

export default useNotifications;
