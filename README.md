# React online hook
[![npm](https://img.shields.io/npm/v/react-online-hook)](https://www.npmjs.com/package/react-online-hook)
[![npm bundle minified size](https://img.shields.io/bundlephobia/min/react-online-hook)](https://www.npmjs.com/package/react-online-hook)
[![npm type definitions](https://img.shields.io/npm/types/react-online-hook)](https://www.npmjs.com/package/react-online-hook)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/Uzwername/react-online-hook)](https://www.npmjs.com/package/react-online-hook)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Uzwername/react-online-hook/blob/master/LICENSE)

Lightweight, easy to use [React](https://reactjs.org/) hook to detect if user is online or offline with [TypeScript](https://www.typescriptlang.org/) / [Flow](https://flow.org/) support & progressive enhancement capabilities.

## Use cases

+ Offline banners/warnings
+ Online status indicators
+ Offline-aware form submissions
+ Offline-aware network actions
+ Component-level offline handling

## Installation

Using npm:

```bash
npm install react-online-hook
```

Using yarn:

```bash
yarn add react-online-hook
```

## Usage

`useOnlineStatus` monitors whether the user is online or offline & returns an up to date status.

Here is an example of how it could be used:

```JSX
import React from 'react';
import useOnlineStatus from 'react-online-hook';
// or
const useOnlineStatus = require('react-online-hook');

const OnlineIndicator = () => {
    const { isOnline } = useOnlineStatus();

    return (
        <span>
            { isOnline ? 'Online' : 'Offline' }
        </span>
    );
};

export default OnlineIndicator;
```

## Callback on status change

If you want to perform an action when online status changes, you can use [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) specifying `isOnline` in the dependency array like this:

```JSX
import React, {useEffect} from 'react';
import useOnlineStatus from 'react-online-hook';

const OnlineIndicator = () => {
    const { isOnline } = useOnlineStatus();

    useEffect(() => {
        if (isOnline) {
            alert('You are online! 🚀');
        } else {
            alert('You are offline 😿');
        }
    }, [isOnline]);

    return (
        <span>
            { isOnline ? 'Online' : 'Offline' }
        </span>
    );
};

export default OnlineIndicator;
```

## Progressive enhancement

Internally `useOnlineStatus` uses [`window.navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) to get initial status when you first call it.
<br>
According to [Can I use](https://caniuse.com/#search=navigator.onLine), this property is supported by around 98% of the browsers.

If your project supports legacy browsers, you could use a utility provided by `useOnlineStatus` to easily implement [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

`useOnlineStatus` is aware that `window.navigator.onLine` might not be present.
<br>
In that case, it _assumes_ that when it first called (which happens on initial mount of your component), the browser is online.

`useOnlineStatus` indicates when the status is assumed & you could use this information like this to implement progressive enhancement:

```JSX
import React from 'react';
import useOnlineStatus from 'react-online-hook';

const LegacyBrowserOnlineIndicator = () => {
    const { isOnline, isAssumedStatus } = useOnlineStatus();

    if (isAssumedStatus) {
        return null;
    }

    return (
        <span>
            { isOnline ? 'Online' : 'Offline' }
        </span>
    );
};

export default LegacyBrowserOnlineIndicator;
```

Additional things to consider:

+ When status is assumed, `isOnline` is true. You could just use this assumption if it is reasonable in your case.

+ `isAssumedStatus` might change to `false` if browser does not have `window.navigator.onLine` but correctly dispatches [online](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) or [offline](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) events.

+ `useOnlineStatus` internally uses [`addEventListener`](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener) & [`removeEventListener`](https://developer.mozilla.org/es/docs/Web/API/EventTarget/removeEventListener).

## License

This project is licensed under the terms of the [MIT license](https://github.com/Uzwername/react-online-hook/blob/master/LICENSE).