import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TypesService } from '../../../shared/services/types/types.service';

@Component({
	selector: 'app-add-new-type-dialog',
	templateUrl: './add-new-type-dialog.component.html',
	styleUrl: './add-new-type-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewTypeDialogComponent {
	typeFormGroup: FormGroup;

	constructor(
		private fb: FormBuilder,
		private typesService: TypesService,
		public dialogRef: MatDialogRef<AddNewTypeDialogComponent>
	) {
		this.typeFormGroup = this.fb.group({
			typeName: ['', Validators.required],
			inputs: this.fb.array([])
		});
	}

	get inputControls() {
		return this.typeFormGroup.get('inputs') as FormArray;
	}

	addInput = (): void => {
		const inputGroup = this.fb.group({
			placeholder: ['', Validators.required]
		});
		this.inputControls.push(inputGroup);
	}

	onSubmit = (): void => {
		if (this.typeFormGroup.valid && this.inputControls.valid) {
			const formValue = this.typeFormGroup.value;
			const typeData = {
				name: formValue.typeName,
				inputs: formValue.inputs
			};
			this.typesService.saveType(typeData);
			this.dialogRef.close(this.typeFormGroup.value);
		}
	}

	removeInput = (index: number): void => {
		this.inputControls.removeAt(index);
	}

	onCancel = (): void => {
		this.dialogRef.close();
	}
}
