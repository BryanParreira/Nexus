// src/hooks/useEventVisibility.tsx
import { useRef, useState, useEffect } from 'react';

export const useEventVisibility = ({ 
  eventHeight, 
  eventGap 
}: { 
  eventHeight: number; 
  eventGap: number; 
}) => {
  // ✅ Use useRef instead of useState for the DOM reference
  const contentRef = useRef<HTMLDivElement>(null);
  const [visibleEventCount, setVisibleEventCount] = useState(0);

  useEffect(() => {
    // ✅ Access the current property of the ref
    if (contentRef.current) {
      const containerHeight = contentRef.current.clientHeight;
      const totalSpace = containerHeight + eventGap; // Add gap to the height
      const count = Math.floor(totalSpace / (eventHeight + eventGap)); // Calculate number of visible events

      setVisibleEventCount(count);
    }
  }, [eventHeight, eventGap]);

  // ✅ Add a resize observer to recalculate when container size changes
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerHeight = entry.contentRect.height;
        const totalSpace = containerHeight + eventGap;
        const count = Math.floor(totalSpace / (eventHeight + eventGap));
        setVisibleEventCount(count);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [eventHeight, eventGap]);

  return { 
    contentRef, 
    getVisibleEventCount: (length: number) => Math.min(visibleEventCount, length)
  };
};