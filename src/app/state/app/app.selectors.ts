import { State } from "../app.state";
import { createSelector } from '@ngrx/store';
import { AppState } from "./app.reducer";

export const selectAppState = (state: State) => state.appState;

export const selectTypes = createSelector(
	selectAppState,
	(state: AppState) => state.types
);

export const selectSelectedTypes = createSelector(
	selectAppState,
	(state: AppState) => state.selectedTypes
);

export const selectTypesBoxesConnections = createSelector(
	selectAppState,
	(state: AppState) => state.typesBoxesConnections
);

export const selectConnectingTypesBoxesInProgress = createSelector(
	selectAppState,
	(state: AppState) => state.connectingTypesBoxesInProgress
);

export const selectActiveConnectionBoxId = createSelector(
	selectAppState,
	(state: AppState) => state.activeConnectionBoxId
);

export const selectActiveConnectionBoxTypeCount = createSelector(
	selectAppState,
	(state: AppState) => state.activeConnectionBoxTypeCount
);