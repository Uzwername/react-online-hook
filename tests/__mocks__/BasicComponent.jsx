import React from 'react';
import useOnlineStatus from 'react-online-hook';

/**
 * This implementation is needed to test useOnlineStatus
 * behavior in a realistic use case. 
 */
const BasicComponentMock = () => {
    const { isOnline } = useOnlineStatus();

    return (
        <span>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
};

export default BasicComponentMock;