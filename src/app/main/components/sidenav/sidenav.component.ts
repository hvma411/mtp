import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTypeDialogComponent } from '../add-new-type-dialog/add-new-type-dialog.component';
import { Observable } from 'rxjs';
import { Type } from '../../../shared/interfaces/type.interface';
import { State } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { selectTypes } from '../../../state/app/app.selectors';
import { TypesService } from '../../../shared/services/types/types.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
	types$: Observable<Type[]>;

	constructor(
		private dialog: MatDialog,
		private store: Store<State>,
		private typesService: TypesService
	) {
		this.types$ = this.store.select((state) => selectTypes(state));
	}

	openAddNewTypeDialog = (): void => {
		this.dialog.open(AddNewTypeDialogComponent, {
			width: '400px',
		});
	}

	selectType = (type: Type): void => {
		this.typesService.selectType(type);
	}
}
