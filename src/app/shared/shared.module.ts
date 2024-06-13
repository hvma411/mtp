import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';


@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatDialogModule,
		MatInputModule,
		DragDropModule,
		MatCardModule
	]
})
export class SharedModule { }
