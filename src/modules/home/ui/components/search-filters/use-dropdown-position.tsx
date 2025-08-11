import { RefObject } from 'react';

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;
    // Check if the dropdown goes off the right side of the screen
    if (left + dropdownWidth > window.innerWidth) {
        left = rect.right + window.scrollX - dropdownWidth; // 16px for padding
    
    // Check if the dropdown goes off the bottom of the screen
    if (left < 0) { // Assuming dropdown height is 200px
        left = window.innerWidth - dropdownWidth - 16;
    }
}
    if (left < 0) {
left= 16;
    }
return {top,left};

};
return getDropDownPosition;
}