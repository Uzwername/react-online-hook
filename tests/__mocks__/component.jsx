import React from 'react';
import useOnlineStatus from "react-online-hook";

const BasicMockComponent = () => {
    const { isOnline } = useOnlineStatus();

    return (
        <span>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
};