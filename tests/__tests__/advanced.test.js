import React from 'react';
import { render } from '@testing-library/react'
import BasicStatusDisplay from '../__mocks__/BasicComponent.jsx'
import ProgressiveStatusDisplay, { effectActionMock } from '../__mocks__/AdvancedComponent.jsx'
import { fireWindowEvent, removeNavigatorOnLine } from '../utils';

/**
 * This file is for testing advanced functionality.
 */
describe('useOnlineStatus advanced functionality', () => {
    it('assists in progressive enhancement', () => {
        // Simulate a browser without navigator.onLine
        removeNavigatorOnLine();
        const { getByText } = render(<ProgressiveStatusDisplay />);

        expect(
            getByText('N/D')
        ).toBeTruthy();
    });

    it('assumes online when navigator.onLine is not present', () => {
        removeNavigatorOnLine();
        const { getByText } = render(<BasicStatusDisplay />);

        expect(
            getByText('Online')
        ).toBeTruthy();
    });

    it('correctly indicates that status is not assumed anymore if browser dispatches network events', async () => {
        removeNavigatorOnLine();
        const { getByText } = render(<ProgressiveStatusDisplay />);

        // Status is assumed
        expect(
            getByText('N/D')
        ).toBeTruthy();

        // Dispatch event
        await fireWindowEvent('offline');
        
        // Status is not assumed anymore, it is definitely "offline"
        expect(
            getByText('Offline')
        ).toBeTruthy();
    });

    it('makes possible to run effects on "isOnline" change', async () => {
        render(<ProgressiveStatusDisplay />);

        // Called once with {isOnline: true}
        expect(effectActionMock.mock.calls.length).toBe(1);
        expect(effectActionMock.mock.calls[0][0].isOnline).toBe(true);

        // Dispatch event
        await fireWindowEvent('online');

        // Still called just once
        expect(effectActionMock.mock.calls.length).toBe(1);

        await fireWindowEvent('offline');

        // Called 2 times
        expect(effectActionMock.mock.calls.length).toBe(2);
        // Second call argument was {isOnline: false}
        expect(effectActionMock.mock.calls[1][0].isOnline).toBe(false);
    });
});