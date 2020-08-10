import { useState, useEffect } from 'react';

type useOnlineStatusReturn = {
    isOnline: boolean,
};

/**
 * React hook to monitor network status.
 * 
 * @since 1.0.0
 * 
 * @see https://github.com/Uzwername/react-online-hook#readme
 */
const useOnlineStatus = (): useOnlineStatusReturn => {
    const [isOnline, setIsOnline] = useState<boolean>(window.navigator?.onLine);

    useEffect(() => {
        const setOnline = () => setIsOnline(true);

        window.addEventListener('online', setOnline);
        return () => window.removeEventListener('online', setOnline);
    }, []);

    useEffect(() => {
        const setOffline = () => setIsOnline(false);

        window.addEventListener('offline', setOffline);
        return () => window.removeEventListener('offline', setOffline);
    }, []);

    return {
        isOnline
    }
};

export default useOnlineStatus;