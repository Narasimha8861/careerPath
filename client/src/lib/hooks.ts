import { useState, useEffect } from 'react';

/**
 * A hook to manage a countdown timer
 * @param initialSeconds The initial number of seconds to count down from
 * @param onComplete Optional callback to run when the timer completes
 * @returns Object containing the current seconds left and functions to control the timer
 */
export const useCountdown = (initialSeconds: number, onComplete?: () => void) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && onComplete) {
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
  };

  return { seconds, isActive, startTimer, pauseTimer, resetTimer };
};

/**
 * A hook to detect if the user is on a mobile device
 * @returns Boolean indicating if the current device is mobile
 */
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

/**
 * A hook to debounce a value change
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * A hook to get the current user from localStorage
 * @returns The current user object or null if not logged in
 */
export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return user;
};
