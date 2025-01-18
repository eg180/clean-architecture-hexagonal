import { Money } from "../valueObjects/Money";

export interface Item {
	id: number;
	name: string;
	price: Money;
}
