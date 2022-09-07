import React from "react";
// import {NotificationManager} from 'react-notifications';
import { notification } from 'antd'

const createNotification = (type, message) => {
    switch(type) {
        case 'info':
            notification.info(message);
            break;
        case 'success':
            notification.success(message);
            break;
        case 'warning':
            notification.warning(message);
            break;
        case 'error':
            notification.error(message);
            break;
        default:
    }
}

export default createNotification