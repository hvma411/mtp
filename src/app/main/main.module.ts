import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddNewTypeDialogComponent } from './components/add-new-type-dialog/add-new-type-dialog.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TypeBoxComponent } from './components/type-box/type-box.component';


@NgModule({
	declarations: [
    MainComponent,
    SidenavComponent,
    AddNewTypeDialogComponent,
    CanvasComponent,
    TypeBoxComponent
  ],
	imports: [
		CommonModule,
		MainRoutingModule,
		SharedModule
	]
})
export class MainModule { }
