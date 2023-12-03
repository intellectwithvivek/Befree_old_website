import { applyMiddleware, createStore } from 'redux';
import thunk , {ThunkAction} from 'redux-thunk';
// ...
import rootReducer from '../reducer/rootReducer';

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'


// Use throughout your app instead of plain `useDispatch` and `useSelector`

    
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

