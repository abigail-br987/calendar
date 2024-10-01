import { createContext, useReducer, Dispatch, Reducer } from 'react';


import { mergeInto } from '../utils/objects';
import { DeepPartial } from '../types';


export interface Store {
  selectedDay: string | null;
  notes: [];
  userName:string | null;
}

export const storeReducer: Reducer<Store, DeepPartial<Store>> = (
  state,
  changes
) => {
  const newState = structuredClone(state);
  mergeInto(newState, changes);
  return newState;
};

export const defaultStore = (): Store => ({
  selectedDay: null,
  notes: [],
  userName: null,
});

const GlobalStore = createContext<[Store, Dispatch<DeepPartial<Store>>]>([
  defaultStore(),
  () => {}, 
]);

export default GlobalStore;