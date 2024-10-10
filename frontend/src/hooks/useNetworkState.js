import { useState, useEffect } from 'react';

function useNetworkState() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateState = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);

    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);

  return isOnline;
}

export default useNetworkState;
