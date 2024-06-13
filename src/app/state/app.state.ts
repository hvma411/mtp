import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromApp from './app/app.reducer';

export interface State {
	appState: fromApp.AppState
}

export const reducers: ActionReducerMap<State> = {
	appState: fromApp.appReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
	return (state, action) => {
		const result = reducer(state, action);

		console.groupCollapsed(action.type);
		console.log(`Prev state:`, state);
		console.log(`Action:`, action);
		console.log(`Next state:`, result);
		console.groupEnd();

		return result;
	};
}


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logger] : [];
