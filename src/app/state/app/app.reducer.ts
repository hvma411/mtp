import { createReducer, on } from '@ngrx/store';
import { Type } from '../../shared/interfaces/type.interface';
import { addConnection, cancelConnectingBox, finishConnectingBox, saveType, selectType, startConnectingBox } from './app.actions';
import { Connection } from '../../shared/interfaces/connection.interface';

export interface AppState {
	types: Type[],
	selectedTypes: Type[],
	typesBoxesConnections: Connection[];
	connectingTypesBoxesInProgress: boolean;
	activeConnectionBoxId: string | null;
	activeConnectionBoxTypeCount: number | null;
}

export const initialState: AppState = {
	types: [],
	selectedTypes: [],
	typesBoxesConnections: [],
	connectingTypesBoxesInProgress: false,
	activeConnectionBoxId: null,
	activeConnectionBoxTypeCount: null
}

export const appReducer = createReducer<AppState>(
	initialState,
	on(saveType, (state, { newType }) => {
		const existingType = state.types.find(type => type.id === newType.id);
		const count = existingType ? existingType.count : state.types.length + 1;
		const newTypeWithCount = { ...newType, count };

		return {
			...state,
			types: [...state.types, newTypeWithCount]
		};
	}),
	on(selectType, (state, { selectedType }): any => ({
		...state,
		selectedTypes: [...state.selectedTypes, selectedType]
	})),
	on(startConnectingBox, (state, { boxId, count }) => ({
		...state,
		connectingTypesBoxesInProgress: true,
		activeConnectionBoxId: boxId,
		activeConnectionBoxTypeCount: count
	})),
	on(finishConnectingBox, (state, { boxId }) => {
		const newConnection: Connection = {
			fromBoxId: state.activeConnectionBoxId!,
			toBoxId: boxId
		};

		const connectionExists = state.typesBoxesConnections.some((connection) =>
			(connection.fromBoxId === newConnection.fromBoxId && connection.toBoxId === newConnection.toBoxId) ||
			(connection.fromBoxId === newConnection.toBoxId && connection.toBoxId === newConnection.fromBoxId)
		);

		return connectionExists ? state : {
			...state,
			connectingTypesBoxesInProgress: false,
			activeConnectionBoxId: null,
			typesBoxesConnections: [...state.typesBoxesConnections, newConnection]
		};
	}),
	on(cancelConnectingBox, (state) => ({
		...state,
		connectingTypesBoxesInProgress: false,
		activeConnectionBoxId: null,
		activeConnectionBoxTypeCount: null
	})),
	on(addConnection, (state, { connection }) => ({
		...state,
		typesBoxesConnections: [...state.typesBoxesConnections, connection]
	}))
)