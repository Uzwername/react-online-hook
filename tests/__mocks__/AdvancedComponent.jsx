import React, { useEffect } from 'react';
import useOnlineStatus from 'react-online-hook';

let effectActionMock;

/**
 * This implementation is needed to test how useOnlineStatus
 * may be consumed in a realistic use case.
 */
const AdvancedComponentMock = () => {
    const { isOnline, isAssumedStatus } = useOnlineStatus();
    
    useEffect(() => {
        // Mock should be function-scoped.
        // Should work exactly as expected though
        // we don't specify effectActionMock in deps
        // array.
        effectActionMock = jest.fn();
    }, []);
    
    useEffect(() => {
        effectActionMock({isOnline});
    }, [isOnline]);

    if (isAssumedStatus) {
        return (
            <span>
                N/D
            </span>
        );
    }

    return (
        <span>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    );
};

export { effectActionMock };
export default AdvancedComponentMock;