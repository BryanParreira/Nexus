// src/hooks/useEventVisibility.tsx
import { useState, useEffect } from 'react';

export const useEventVisibility = ({ eventHeight, eventGap }: { eventHeight: number; eventGap: number }) => {
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
  const [visibleEventCount, setVisibleEventCount] = useState(0);

  useEffect(() => {
    if (contentRef) {
      const containerHeight = contentRef.clientHeight;
      const totalSpace = containerHeight + eventGap; // Add gap to the height
      const count = Math.floor(totalSpace / (eventHeight + eventGap)); // Calculate number of visible events

      setVisibleEventCount(count);
    }
  }, [eventHeight, eventGap, contentRef]);

  return { contentRef, getVisibleEventCount: () => visibleEventCount };
};