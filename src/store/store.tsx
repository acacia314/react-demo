import React, {createContext, useReducer} from 'react';
import initialData from './intial-data'
import { GFStore} from './store.types';
import actions from './actions/actions'
import { AvailableActions } from './actions/action.types';

interface GFContext {
    state: GFStore,
    dispatch : React.Dispatch<AvailableActions>
}

const store = createContext<GFContext>({
    state: initialData,
    dispatch: () => null
});
const { Provider } = store;

const StateProvider : React.FunctionComponent = ( { children } ) => {
  const [state, dispatch] = useReducer((store: GFStore, action: AvailableActions) => {
        if (actions[action.type]) {
            return actions[action.type](store, action)
        }
        throw new Error("There's no action of this type " + action.type)
    }, initialData);
  return (
      <Provider value={{state, dispatch}}>{children}</Provider>
  );
};

export { store, StateProvider }