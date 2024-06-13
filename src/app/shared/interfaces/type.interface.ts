import { TypeInput } from "./type-input.interface";

export interface Type {
	id: string;
	boxId: string;
	name: string;
	color: string;
	inputs: TypeInput[];

	count?: number | undefined;
}