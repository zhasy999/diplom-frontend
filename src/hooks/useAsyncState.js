import { useState } from 'react';

export function useAsyncState(defaultState) {
    const [state, setState] = useState(defaultState);

    function asyncSetState(newState) {
        return new Promise(resolve => {
            setState(newState);
            resolve(newState);
        });
    }

    return [state, asyncSetState];
}
