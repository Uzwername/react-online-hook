import { useState, useEffect } from 'react';

type useOnlineStatusReturn = {
    isOnline: boolean,
    isAssumedStatus: boolean,
};

/**
 * React hook to monitor network status.
 * 
 * @since 1.0.0
 * 
 * @see https://github.com/Uzwername/react-online-hook#readme
 */
const useOnlineStatus = (): useOnlineStatusReturn => {
    // Check if required functionality is present
    const isNavigatorOnLinePresent: boolean = (typeof window.navigator.onLine === 'boolean');

    const [isAssumedStatus, setIsAssumedStatus] = useState<boolean>(!isNavigatorOnLinePresent);
    // If no navigator.onLine, assume true
    const [isOnline, setIsOnline] = useState<boolean>(isNavigatorOnLinePresent ? window.navigator.onLine : true);

    useEffect(() => {
        const handOnline = () => {
            setIsAssumedStatus(false);
            setIsOnline(true);
        };

        window.addEventListener('online', handOnline);
        return () => window.removeEventListener('online', handOnline);
    }, []);

    useEffect(() => {
        const handleOffline = () => {
            setIsAssumedStatus(false);
            setIsOnline(false);
        };

        window.addEventListener('offline', handleOffline);
        return () => window.removeEventListener('offline', handleOffline);
    }, []);

    return {
        isOnline,
        isAssumedStatus
    }
};

export default useOnlineStatus;