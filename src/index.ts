import { useState, useEffect } from 'react';

type useOnlineStatusReturn = {
    isOnline: boolean,
};

const useOnlineStatus = (): useOnlineStatusReturn => {
    const [isOnline, setIsOnline] = useState<boolean>(window.navigator?.onLine);
    
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    useEffect(() => {
        window.addEventListener('online', setOnline);
        return () => window.removeEventListener('online', setOnline);
    }, []);

    useEffect(() => {
        window.addEventListener('offline', setOffline);
        return () => window.removeEventListener('offline', setOffline);
    }, []);

    return {
        isOnline
    }
};

export default useOnlineStatus;