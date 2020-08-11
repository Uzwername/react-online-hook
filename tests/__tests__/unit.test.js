import React from 'react';
import {
    render,
    act,
    waitFor,
    cleanup
} from '@testing-library/react'
import StatusDisplay from '../__mocks__/Component.jsx'
//
import useOnlineStatus from "react-online-hook";

describe('useOnlineStatus shape', () => {
    it('is a function', () => {
        expect(typeof useOnlineStatus).toBe('function');
    });

    it('accepts no arguments', () => {
        expect(useOnlineStatus.length).toBe(0);
    });
});

describe('useOnlineStatus basic usage', () => {
    it('correctly indicates online status', () => {
        const wrapper = render(<StatusDisplay />);

        expect(window.navigator.onLine).toBe(true);
        expect(
            wrapper.getByText('Online')
        ).toBeTruthy();
    });

    it('correctly updates network status when needed', async () => {
        const wrapper = render(<StatusDisplay />);

        // Go offline
        await act(() => new Promise((resolve) => {
            window.dispatchEvent(new Event('offline'));
            resolve();
        }));
        await waitFor(() => {
            expect(
                wrapper.getByText('Offline')
            ).toBeTruthy();
        });

        // Back online
        await act(() => new Promise((resolve) => {
            window.dispatchEvent(new Event('online'));
            resolve();
        }));
        await waitFor(() => {
            expect(
                wrapper.getByText('Online')
            ).toBeTruthy();
        });
    });

    it('performs a correct clean up', () => {
        // Mock listeners browser API
        const addEventListenerMock = jest.fn();
        window.addEventListener = addEventListenerMock;
        const removeEventListenerMock = jest.fn();
        window.removeEventListener = removeEventListenerMock;

        // Seems like we mock some of @testing-library/react
        // event listeners as well, but it doesn't matter here
        // since this test is needed to assert jest mocks.
        render(<StatusDisplay />);

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