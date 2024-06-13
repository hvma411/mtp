import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Type } from '../../../shared/interfaces/type.interface';
import { Store } from '@ngrx/store';
import { State } from '../../../state/app.state';
import { selectConnectingTypesBoxesInProgress, selectSelectedTypes, selectTypesBoxesConnections } from '../../../state/app/app.selectors';
import { Connection } from '../../../shared/interfaces/connection.interface';
import { finishConnectingBox, startConnectingBox } from '../../../state/app/app.actions';
import 'leader-line';

declare let LeaderLine: any;

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	private lines: Map<string, typeof LeaderLine> = new Map();

	selectedTypes$: Observable<Type[]>;
	typesBoxesConnections$: Observable<Connection[]>;

	constructor(
		private store: Store<State>
	) {
		this.selectedTypes$ = this.store.select(selectSelectedTypes);
		this.typesBoxesConnections$ = this.store.select(selectTypesBoxesConnections);
	}

	ngOnInit(): void {
		this.drawConnections();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateLinesPosition = (): void => {
		this.lines.forEach((line) => {
			line.position();
		});
	}

	private drawConnections = (): void => {
		this.subscription.add(
			this.typesBoxesConnections$.subscribe(connections => {
				this.lines.forEach(line => line.remove());
				this.lines.clear();

				connections.forEach(connection => {
					const fromBoxElement = document.getElementById(`box-${connection.fromBoxId}`);
					const toBoxElement = document.getElementById(`box-${connection.toBoxId}`);
					if (fromBoxElement && toBoxElement) {
						const line = new LeaderLine(fromBoxElement, toBoxElement, {
							color: 'pink',
							size: 2,
							path: 'magnet'
						});
						this.lines.set(`${connection.fromBoxId}-${connection.toBoxId}`, line);
					}
				});
			})
		)
	}
}
