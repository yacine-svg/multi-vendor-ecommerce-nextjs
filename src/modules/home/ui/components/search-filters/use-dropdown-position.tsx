import { RefObject, useCallback, useEffect, useState } from 'react';

interface DropdownPosition {
  top: number;
  left: number;
  maxHeight?: number;
  placement: 'bottom' | 'top';
}

interface UseDropdownPositionOptions {
  dropdownWidth?: number;
  dropdownHeight?: number;
  offset?: number;
  padding?: number;
}

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
  options: UseDropdownPositionOptions = {}
) => {
  const {
    dropdownWidth = 240,
    dropdownHeight = 200,
    offset = 8,
    padding = 16
  } = options;

  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    placement: 'bottom'
  });

  const calculatePosition = useCallback((): DropdownPosition => {
    if (!ref.current) {
      return { top: 0, left: 0, placement: 'bottom' };
    }

    const rect = ref.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Calculate initial positions
    let left = rect.left + scrollX;
    let top = rect.bottom + scrollY + offset;
    let placement: 'bottom' | 'top' = 'bottom';

    // Horizontal positioning
    // Try to center the dropdown under the trigger
    left = rect.left + scrollX + (rect.width / 2) - (dropdownWidth / 2);

    // Check if dropdown goes off the right edge
    if (left + dropdownWidth > viewportWidth - padding) {
      left = viewportWidth - dropdownWidth - padding;
    }

    // Check if dropdown goes off the left edge
    if (left < padding) {
      left = padding;
    }

    // Vertical positioning
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If not enough space below and more space above, place above
    if (spaceBelow < dropdownHeight + offset && spaceAbove > spaceBelow) {
      top = rect.top + scrollY - dropdownHeight - offset;
      placement = 'top';
    }

    // Calculate max height based on available space
    const maxHeight = placement === 'bottom' 
      ? Math.min(spaceBelow - offset - padding, dropdownHeight)
      : Math.min(spaceAbove - offset - padding, dropdownHeight);

    return {
      top: Math.round(top),
      left: Math.round(left),
      maxHeight: Math.max(100, maxHeight), // Minimum height of 100px
      placement
    };
  }, [ref, dropdownWidth, dropdownHeight, offset, padding]);

  const updatePosition = useCallback(() => {
    const newPosition = calculatePosition();
    setPosition(newPosition);
  }, [calculatePosition]);

  // Update position on mount and when dependencies change
  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  // Update position on scroll and resize
  useEffect(() => {
    const handleUpdate = () => {
      updatePosition();
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [updatePosition]);

  return {
    position,
    updatePosition,
    isReady: ref.current !== null
  };
};