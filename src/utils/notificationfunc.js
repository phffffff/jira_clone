import { notification, } from 'antd';
import React from 'react';

const openNotificationWithIcon = (type, message, description, duration) => {
    notification[type]({
        message,
        description,
        duration,
    });
};

export default openNotificationWithIcon;