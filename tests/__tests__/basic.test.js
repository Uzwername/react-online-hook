import React from 'react';
import {
    render,
    waitFor,
    cleanup
} from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import StatusDisplay from '../__mocks__/BasicComponent.jsx'
import { fireWindowEvent } from '../utils';
//
import useOnlineStatus from "react-online-hook";

/**
 * This file is for testing base functionality
 */
describe('useOnlineStatus shape', () => {
    it('is a function', () => {
        expect(typeof useOnlineStatus).toBe('function');
    });

    it('accepts no arguments', () => {
        expect(useOnlineStatus.length).toBe(0);
    });

    it('returns an object with "isOnline" & "isAssumedStatus" boolean props', () => {
        const { result } = renderHook(() => useOnlineStatus());

        expect(typeof result.current).toBe('object');
        expect(typeof result.current.isOnline).toBe('boolean');
        expect(typeof result.current.isAssumedStatus).toBe('boolean');
    });
});

describe('useOnlineStatus basic functionality', () => {
    it('correctly indicates online status', async () => {
        const { getByText } = render(<StatusDisplay />);

        expect(window.navigator.onLine).toBe(true);
        expect(
            getByText('Online')
        ).toBeTruthy();
    });

    it('correctly updates network status when needed', async () => {
        const { getByText } = render(<StatusDisplay />);

        // Go offline
        await fireWindowEvent('offline')
        await waitFor(() => {
            expect(
                getByText('Offline')
            ).toBeTruthy();
        });

        // Back online
        await fireWindowEvent('online')
        await waitFor(() => {
            expect(
                getByText('Online')
            ).toBeTruthy();
        });
    });

    it('performs a correct clean up', async () => {
        // Mock listeners browser API
        const addEventListenerMock = jest.fn();
        window.addEventListener = addEventListenerMock;
        const removeEventListenerMock = jest.fn();
        window.removeEventListener = removeEventListenerMock;

        // Seems like we mock some of @testing-library/react
        // event listeners as well, but it doesn't matter here
        // since this test is needed to assert jest mocks exclusively.
        render(<StatusDisplay />);

        // Simulate several network changes
        await fireWindowEvent('offline');
        await fireWindowEvent('online');

        // Filter out all arguments pairs that were
        // not added by the hook
        const addedNetworkListeners = addEventListenerMock.mock.calls.filter(
            ([event]) => (event === 'online' || event === 'offline')
        );
        // Some event listeners added
        expect(addedNetworkListeners).toHaveLength(2);

        
        const getRemovedListeners = () => removeEventListenerMock.mock.calls.filter(
            ([event]) => (event === 'online' || event === 'offline')
        );
        // Event listeners not yet removed
        expect(getRemovedListeners()).toHaveLength(0);

        // Unmount component
        cleanup();

        // 2 listeners are removed
        const removedNetworkListeners = getRemovedListeners();
        expect(removedNetworkListeners).toHaveLength(2)
        
        // Makes sure that added & removed
        // callbacks are the same functions.
        const findOnlineListener = ([event]) => event === 'online';
        const findOfflineListener = ([event]) => event === 'offline';
        expect(
            addedNetworkListeners.find(findOnlineListener)[1]
        ).toBe(removedNetworkListeners.find(findOnlineListener)[1]);
        expect(
            addedNetworkListeners.find(findOfflineListener)[1]
        ).toBe(removedNetworkListeners.find(findOfflineListener)[1]);
    });
});