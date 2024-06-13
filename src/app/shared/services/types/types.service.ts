import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Type } from '../../interfaces/type.interface';
import { Store } from '@ngrx/store';
import { State } from '../../../state/app.state';
import { saveType, selectType } from '../../../state/app/app.actions';

@Injectable({
	providedIn: 'root'
})
export class TypesService {
	constructor(
		private store: Store<State>
	) { }

	saveType = (type: Omit<Type, 'id' | 'boxId' | 'color'>): void => {
		this.store.dispatch(saveType({ newType: { ...type, id: this.generateId(), color: this.generateTypeColor(), boxId: '' } }))
	}

	selectType = (selectedType: Type): void => {
		this.store.dispatch(selectType({ selectedType: { ...selectedType, boxId: this.generateId() } }))
	}

	private generateId = (): string => {
		return uuidv4();
	}

	private generateTypeColor = (): string => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
}
