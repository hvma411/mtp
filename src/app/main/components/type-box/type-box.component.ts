import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Type } from '../../../shared/interfaces/type.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../state/app.state';
import { selectActiveConnectionBoxId, selectActiveConnectionBoxTypeCount, selectConnectingTypesBoxesInProgress } from '../../../state/app/app.selectors';
import { cancelConnectingBox, finishConnectingBox, startConnectingBox } from '../../../state/app/app.actions';

@Component({
	selector: 'app-type-box',
	templateUrl: './type-box.component.html',
	styleUrl: './type-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeBoxComponent implements OnInit, OnDestroy {
	@Input({ required: true }) type!: Type;
	@Input({ required: true }) typeCount: number | undefined;

	private subscription: Subscription = new Subscription();
	
	typeFormGroup!: FormGroup;
	textColor: string = 'white';
	connectingTypesBoxesInProgress: boolean = false;
	activeConnectionBoxId: string | null = null;
	activeConnectionBoxTypeCount: number | null = null;

	constructor(
		private fb: FormBuilder,
		private store: Store<State>,
		private cdr: ChangeDetectorRef,
	) { }

	ngOnInit(): void {
		this.initFormGroup();
		this.listenForBoxesConnectionDetails();
		this.setTextColorByBackground(this.type.color);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	get inputControls(): FormArray {
		return this.typeFormGroup.get('inputs') as FormArray;
	}

	onConnectClick = (boxId: string, count: number): void => {
		if (this.connectingTypesBoxesInProgress) {
			this.store.dispatch(finishConnectingBox({ boxId }));
		} else {
			this.store.dispatch(startConnectingBox({ boxId, count }));
		}
	}

	onCancelConnectClick = (): void => {
		this.store.dispatch(cancelConnectingBox())
	}

	private setTextColorByBackground = (backgroundColor: string): void => {
		if (backgroundColor.startsWith('#')) {
			backgroundColor = backgroundColor.slice(1);
		}

		const r = parseInt(backgroundColor.substring(0, 2), 16);
		const g = parseInt(backgroundColor.substring(2, 4), 16);
		const b = parseInt(backgroundColor.substring(4, 6), 16);

		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		this.textColor = brightness > 125 ? 'black' : 'white';
		this.cdr.detectChanges();
	}

	private listenForBoxesConnectionDetails = (): void => {
		this.subscription.add(
			this.store.select((state) => selectConnectingTypesBoxesInProgress(state)).subscribe(connecting => {
				this.connectingTypesBoxesInProgress = connecting;
				this.cdr.detectChanges()
			})
		);
		this.subscription.add(
			this.store.select((state) => selectActiveConnectionBoxId(state)).subscribe(boxId => {
				this.activeConnectionBoxId = boxId;
				this.cdr.detectChanges()
			})
		);
		this.subscription.add(
			this.store.select((state) => selectActiveConnectionBoxTypeCount(state)).subscribe(count => {
				this.activeConnectionBoxTypeCount = count;
				this.cdr.detectChanges()
			})
		);
	}

	private initFormGroup = (): void => {
		this.typeFormGroup = this.fb.group({
			name: [this.type.name],
			inputs: this.fb.array(this.type.inputs.map(input => this.fb.control('')))
		});
	}
}
