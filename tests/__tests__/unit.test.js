import React from 'react';
import { shallow } from 'enzyme';
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