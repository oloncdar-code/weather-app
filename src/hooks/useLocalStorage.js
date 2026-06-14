import { useState, useEffect, useCallback } from 'react';

// Глобальный объект для хранения слушателей по ключам
const listeners = new Map();

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Функция для оповещения всех заинтересованных компонентов
  const notify = useCallback((newValue) => {
    const callbacks = listeners.get(key);
    if (callbacks) {
      callbacks.forEach(cb => cb(newValue));
    }

    window.dispatchEvent(new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(newValue),
    }));
  }, [key]);

  useEffect(() => {

    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }
    const setter = (newVal) => setStoredValue(newVal);
    listeners.get(key).add(setter);

    return () => {
      listeners.get(key).delete(setter);
      if (listeners.get(key).size === 0) {
        listeners.delete(key);
      }
    };
  }, [key]);

  const setValue = useCallback((value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    notify(newValue);
  }, [key, storedValue, notify]);

  // Слушаем изменения из других вкладок
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key && e.newValue) {
        const newValue = JSON.parse(e.newValue);
        setStoredValue(newValue);
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  return [storedValue, setValue];
}