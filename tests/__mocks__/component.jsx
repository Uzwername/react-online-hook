import React from 'react';
import useOnlineStatus from "react-online-hook";

const BasicMockComponent = () => {
    const { isOnline } = useOnlineStatus();

    return (
        <span id="status">
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
};

export default BasicMockComponent;