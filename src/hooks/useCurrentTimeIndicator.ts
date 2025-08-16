// src/hooks/useCurrentTimeIndicator.tsx
import { useState, useEffect } from 'react';

export const useCurrentTimeIndicator = (date: Date, viewMode: string) => {
  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(null);
  const [currentTimeVisible, setCurrentTimeVisible] = useState<boolean>(false);

  useEffect(() => {
    // Your logic here to calculate currentTimePosition and currentTimeVisible
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    setCurrentTimePosition(diff / (24 * 60 * 60 * 1000)); // Example calculation
    setCurrentTimeVisible(now >= date);
  }, [date, viewMode]);

  return { currentTimePosition, currentTimeVisible };
};