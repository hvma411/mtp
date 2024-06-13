import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBoxComponent } from './type-box.component';

describe('TypeBoxComponent', () => {
	let component: TypeBoxComponent;
	let fixture: ComponentFixture<TypeBoxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TypeBoxComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(TypeBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
