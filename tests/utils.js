import {
    act
} from '@testing-library/react'

/**
 * Fires event on window object.
 * 
 * @param {string} eventName 
 */
export const fireWindowEvent = async (eventName) => act(async () => {
    window.dispatchEvent(new Event(eventName));
});

/**
 * Sets navigator.onLine to undefined
 */
export const removeNavigatorOnLine = () => {
    Object.defineProperty(window.navigator, 'onLine', {value: undefined});
};