import { createAction, props } from '@ngrx/store';
import { Type } from '../../shared/interfaces/type.interface';
import { Connection } from '../../shared/interfaces/connection.interface';

export const saveType = createAction(
	'[App] Save type',
	props<{ newType: Type }>()
)

export const selectType = createAction(
	'[App] Select type',
	props<{ selectedType: Type }>()
)


export const startConnectingBox = createAction(
	'[App] Start connecting box',
	props<{ boxId: string, count: number }>()
);

export const finishConnectingBox = createAction(
	'[App] Finish connecting box',
	props<{ boxId: string }>()
);

export const cancelConnectingBox = createAction('[App] Cancel connecting box');

export const addConnection = createAction(
	'[App] Add connection',
	props<{ connection: Connection }>()
);